import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
varying vec2 v_uv;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amp * noise(p);
    p *= 2.0;
    amp *= 0.5;
  }
  return value;
}

vec2 flow(vec2 uv, vec2 mouse) {
  vec2 p = uv;
  vec2 m = mouse - 0.5;
  p += 0.08 * vec2(
    sin(p.y * 3.2 + u_time * 0.22),
    cos(p.x * 2.6 - u_time * 0.18)
  );

  vec2 d = uv - mouse;
  float dist = length(vec2(d.x * 1.2, d.y));
  float influence = exp(-dist * 7.0);
  p -= d * influence * 0.24;

  float n1 = fbm(p * 2.0 + vec2(u_time * 0.08, -u_time * 0.04));
  float n2 = fbm(p * 3.4 - vec2(u_time * 0.05, u_time * 0.07));
  p += 0.08 * vec2(n1 - 0.5, n2 - 0.5);
  p += 0.04 * m;
  return p;
}

void main() {
  vec2 uv = v_uv;
  vec2 mouse = u_mouse;
  vec2 p = flow(uv, mouse);

  vec3 blue = vec3(0.07, 0.46, 0.85);
  vec3 orange = vec3(0.88, 0.57, 0.21);
  vec3 pale = vec3(0.86, 0.84, 0.82);
  vec3 deep = vec3(0.19, 0.16, 0.32);

  float baseWave = 0.5 + 0.5 * sin((p.x * 3.1 - p.y * 2.4) + u_time * 0.24);
  float sw = fbm(p * 1.8 + vec2(0.0, u_time * 0.05));
  float band = smoothstep(0.18, 0.82, mix(baseWave, sw, 0.65));

  vec3 col = mix(deep, orange, smoothstep(0.08, 0.92, band));
  col = mix(col, blue, smoothstep(0.28, 0.9, fbm(p * 2.5 - vec2(u_time * 0.03, 0.0))) * 0.75);
  col = mix(col, pale, smoothstep(0.58, 0.98, fbm(p * 3.2 + vec2(u_time * 0.02, u_time * 0.01))) * 0.42);

  vec2 d = uv - mouse;
  float dist = length(vec2(d.x * (u_resolution.x / max(u_resolution.y, 1.0)), d.y));
  float rim = exp(-dist * 10.0);
  col += vec3(0.05, 0.07, 0.1) * rim;

  float vignette = smoothstep(1.1, 0.22, length(uv - 0.5));
  col *= 0.82 + 0.25 * vignette;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
  const vs = compile(gl, gl.VERTEX_SHADER, vsSource);
  const fs = compile(gl, gl.FRAGMENT_SHADER, fsSource);
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
    });

    if (!gl) return;

    const prog = createProgram(gl, VERT, FRAG);
    if (!prog) return;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const posLoc = gl.getAttribLocation(prog, "a_pos");
    const timeLoc = gl.getUniformLocation(prog, "u_time");
    const resLoc = gl.getUniformLocation(prog, "u_resolution");
    const mouseLoc = gl.getUniformLocation(prog, "u_mouse");

    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      gl.viewport(0, 0, w, h);
    };

    const onMove = (e: PointerEvent) => {
      pointer.tx = e.clientX / window.innerWidth;
      pointer.ty = 1 - e.clientY / window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);

    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    let raf = 0;
    const start = performance.now();

    const render = () => {
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;

      gl.useProgram(prog);
      gl.uniform1f(timeLoc, (performance.now() - start) * 0.001);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform2f(mouseLoc, pointer.x, pointer.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(prog);
    };
  }, []);

  return <canvas ref={canvasRef} className="block h-full w-full" />;
}
