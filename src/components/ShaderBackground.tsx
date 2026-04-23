import { useEffect, useRef } from "react";

/**
 * Dark ambient shader background.
 * - Pure black base.
 * - Slow-drifting, soft colored nebula blobs (deep violet / blue / cyan).
 * - Cursor adds a subtle pull on the nearest blob (very gentle).
 */

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
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse; // 0..1, smoothed

// soft round blob
float blob(vec2 uv, vec2 c, float r) {
  float d = length(uv - c);
  return smoothstep(r, 0.0, d);
}

void main() {
  vec2 uv = v_uv;
  // correct aspect for distance math
  float aspect = u_res.x / u_res.y;
  vec2 p = uv;
  p.x *= aspect;

  float t = u_time * 0.06;

  // Three drifting blob centers (in aspect-corrected space)
  vec2 c1 = vec2(0.35 * aspect + 0.25 * sin(t * 1.1),       0.55 + 0.18 * cos(t * 0.9));
  vec2 c2 = vec2(0.75 * aspect + 0.30 * cos(t * 0.8 + 1.2), 0.30 + 0.22 * sin(t * 1.3 + 0.5));
  vec2 c3 = vec2(0.55 * aspect + 0.28 * sin(t * 0.7 + 2.4), 0.75 + 0.20 * cos(t * 1.0 + 1.8));

  // Mouse pulls c1 a bit toward cursor
  vec2 mp = u_mouse;
  mp.x *= aspect;
  c1 = mix(c1, mp, 0.25);

  float b1 = blob(p, c1, 0.55);
  float b2 = blob(p, c2, 0.65);
  float b3 = blob(p, c3, 0.50);

  // Deep, dark colors — they show only as a faint glow on black
  vec3 col1 = vec3(0.35, 0.18, 0.55); // violet
  vec3 col2 = vec3(0.10, 0.22, 0.55); // blue
  vec3 col3 = vec3(0.15, 0.40, 0.55); // teal

  vec3 col = vec3(0.0);
  col += col1 * b1 * 0.55;
  col += col2 * b2 * 0.50;
  col += col3 * b3 * 0.40;

  // Vignette to keep edges dark
  vec2 vg = uv - 0.5;
  float vig = smoothstep(0.95, 0.25, length(vg));
  col *= 0.4 + 0.6 * vig;

  // Subtle film grain
  float n = fract(sin(dot(uv * u_res, vec2(12.9898, 78.233))) * 43758.5453 + u_time);
  col += (n - 0.5) * 0.02;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s));
  }
  return s;
}

export function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: false, antialias: false }) as WebGLRenderingContext | null;
    if (!gl) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    let w = 0, h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = Math.floor(window.innerWidth * dpr);
      h = Math.floor(window.innerHeight * dpr);
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      gl.viewport(0, 0, w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse with smoothing
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove);

    const start = performance.now();
    let raf = 0;
    const loop = () => {
      const t = (performance.now() - start) / 1000;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="block h-full w-full" />;
}
