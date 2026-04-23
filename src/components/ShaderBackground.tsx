import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

// Smooth liquid background inspired by shaders.com Swirl + ChromaFlow.
// Uses domain-warped FBM for slow flowing patterns and a soft cursor displacement.
const FRAG = `
precision highp float;
varying vec2 v_uv;
uniform vec2 u_resolution;
uniform vec2 u_mouse;       // smoothed pointer in 0..1 (uv space, y-up)
uniform vec2 u_mouseVel;    // smoothed pointer velocity
uniform float u_time;

// Hash without artifacts
float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// Value noise with smooth interpolation
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 6; i++) {
    v += a * vnoise(p);
    p = rot * p * 2.02;
    a *= 0.5;
  }
  return v;
}

// sRGB conversion for nice color blending
vec3 toLinear(vec3 c) { return pow(c, vec3(2.2)); }
vec3 toSRGB(vec3 c)   { return pow(c, vec3(1.0/2.2)); }

void main() {
  // Aspect-correct UV centered at 0
  vec2 uv = v_uv;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (uv - 0.5);
  p.x *= aspect;

  // Pointer in same aspect-corrected space
  vec2 m = u_mouse - 0.5;
  m.x *= aspect;

  // Slow flowing time
  float t = u_time * 0.08;

  // --- Domain warp: build a flow field from FBM ---
  vec2 q = vec2(
    fbm(p * 1.4 + vec2(0.0, t)),
    fbm(p * 1.4 + vec2(5.2, -t))
  );
  vec2 r = vec2(
    fbm(p * 2.0 + 1.7 * q + vec2(1.7, 9.2) + 0.15 * t),
    fbm(p * 2.0 + 1.7 * q + vec2(8.3, 2.8) - 0.13 * t)
  );

  // Cursor influence — push the field smoothly away from the cursor
  vec2 d = p - m;
  float dist = length(d);
  float influence = exp(-dist * 2.6);
  // Add velocity-driven directional flow (chroma-flow feel)
  vec2 push = normalize(d + 1e-4) * influence * 0.35
            + u_mouseVel * influence * 1.8;
  r += push;

  float n = fbm(p * 1.6 + 1.4 * r);

  // --- Color palette in linear space ---
  vec3 cBlueDeep = toLinear(vec3(0.04, 0.18, 0.55));   // deep blue
  vec3 cBlue     = toLinear(vec3(0.07, 0.46, 0.85));   // primary blue
  vec3 cOrange   = toLinear(vec3(0.88, 0.57, 0.21));   // accent orange
  vec3 cPale     = toLinear(vec3(0.86, 0.84, 0.82));   // pale highlight
  vec3 cInk      = toLinear(vec3(0.04, 0.04, 0.07));   // near-black

  // Base swirl: blue -> orange band driven by warped noise
  float band = smoothstep(0.30, 0.78, n);
  vec3 col = mix(cBlueDeep, cBlue, smoothstep(0.10, 0.55, n));
  col = mix(col, cOrange, band * 0.85);

  // Pale crests on high-frequency detail
  float crest = smoothstep(0.62, 0.95, fbm(p * 3.4 + r * 0.6 + t));
  col = mix(col, cPale, crest * 0.35);

  // Subtle ink in deep valleys for depth
  float deep = smoothstep(0.35, 0.0, n);
  col = mix(col, cInk, deep * 0.35);

  // Soft cursor halo in linear space
  col += toLinear(vec3(0.10, 0.14, 0.22)) * influence * 0.6;

  // Vignette
  float vig = smoothstep(1.15, 0.25, length(uv - 0.5));
  col *= 0.78 + 0.28 * vig;

  gl_FragColor = vec4(toSRGB(col), 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function createProgram(gl: WebGLRenderingContext, vsSrc: string, fsSrc: string) {
  const vs = compile(gl, gl.VERTEX_SHADER, vsSrc);
  const fs = compile(gl, gl.FRAGMENT_SHADER, fsSrc);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(prog));
    gl.deleteProgram(prog);
    return null;
  }
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  return prog;
}

export function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: true,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    const prog = createProgram(gl, VERT, FRAG);
    if (!prog) return;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const aPos = gl.getAttribLocation(prog, "a_pos");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uMouseVel = gl.getUniformLocation(prog, "u_mouseVel");

    const ptr = {
      x: 0.5, y: 0.5,
      tx: 0.5, ty: 0.5,
      vx: 0, vy: 0,
      px: 0.5, py: 0.5,
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      gl.viewport(0, 0, w, h);
    };

    const onMove = (e: PointerEvent) => {
      ptr.tx = e.clientX / window.innerWidth;
      ptr.ty = 1 - e.clientY / window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });

    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    let raf = 0;
    const start = performance.now();

    const render = () => {
      // Smooth pointer + velocity for chroma-flow-like push
      ptr.x += (ptr.tx - ptr.x) * 0.10;
      ptr.y += (ptr.ty - ptr.y) * 0.10;
      const dx = ptr.x - ptr.px;
      const dy = ptr.y - ptr.py;
      ptr.vx = ptr.vx * 0.85 + dx * 0.15;
      ptr.vy = ptr.vy * 0.85 + dy * 0.15;
      ptr.px = ptr.x;
      ptr.py = ptr.y;

      gl.useProgram(prog);
      gl.uniform1f(uTime, (performance.now() - start) * 0.001);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, ptr.x, ptr.y);
      gl.uniform2f(uMouseVel, ptr.vx, ptr.vy);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, []);

  return <canvas ref={canvasRef} className="block h-full w-full" />;
}
