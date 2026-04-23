import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;

// Smooth noise based on hashing
vec3 hash3(vec2 p) {
  vec3 q = vec3(dot(p, vec2(127.1, 311.7)),
                dot(p, vec2(269.5, 183.3)),
                dot(p, vec2(419.2, 371.9)));
  return fract(sin(q) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash3(i).x;
  float b = hash3(i + vec2(1.0, 0.0)).x;
  float c = hash3(i + vec2(0.0, 1.0)).x;
  float d = hash3(i + vec2(1.0, 1.0)).x;
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= u_resolution.x / u_resolution.y;

  float t = u_time * 0.08;

  // Layered flowing noise
  vec2 q = vec2(fbm(p + vec2(t, -t)), fbm(p + vec2(-t, t) + 3.0));
  vec2 r = vec2(fbm(p + q + vec2(1.7, 9.2) + t * 0.5),
                fbm(p + q + vec2(8.3, 2.8) - t * 0.5));
  float f = fbm(p + r);

  // Color palette — deep blues / purples / teals
  vec3 c1 = vec3(0.05, 0.07, 0.18);   // deep navy
  vec3 c2 = vec3(0.20, 0.10, 0.35);   // violet
  vec3 c3 = vec3(0.10, 0.30, 0.45);   // teal
  vec3 c4 = vec3(0.35, 0.15, 0.40);   // magenta-violet

  vec3 col = mix(c1, c2, clamp(f * 1.4, 0.0, 1.0));
  col = mix(col, c3, clamp(length(q) * 0.7, 0.0, 1.0));
  col = mix(col, c4, clamp(r.x * 0.6, 0.0, 1.0));

  // Vignette
  float vig = smoothstep(1.4, 0.2, length(p) * 0.7);
  col *= 0.4 + 0.6 * vig;

  // Darken overall to keep text readable
  col *= 0.85;

  gl_FragColor = vec4(col, 1.0);
}
`;

export function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;
    const glc = gl as WebGLRenderingContext;

    const compile = (type: number, src: string) => {
      const s = glc.createShader(type)!;
      glc.shaderSource(s, src);
      glc.compileShader(s);
      return s;
    };
    const vs = compile(glc.VERTEX_SHADER, VERT);
    const fs = compile(glc.FRAGMENT_SHADER, FRAG);
    const prog = glc.createProgram()!;
    glc.attachShader(prog, vs);
    glc.attachShader(prog, fs);
    glc.linkProgram(prog);
    glc.useProgram(prog);

    const buf = glc.createBuffer();
    glc.bindBuffer(glc.ARRAY_BUFFER, buf);
    glc.bufferData(
      glc.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      glc.STATIC_DRAW
    );
    const loc = glc.getAttribLocation(prog, "a_position");
    glc.enableVertexAttribArray(loc);
    glc.vertexAttribPointer(loc, 2, glc.FLOAT, false, 0, 0);

    const uRes = glc.getUniformLocation(prog, "u_resolution");
    const uTime = glc.getUniformLocation(prog, "u_time");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      glc.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const start = performance.now();
    let raf = 0;
    const render = () => {
      const t = (performance.now() - start) / 1000;
      glc.uniform2f(uRes, canvas.width, canvas.height);
      glc.uniform1f(uTime, t);
      glc.drawArrays(glc.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="block h-full w-full" />;
}
