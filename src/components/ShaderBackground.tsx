import { useEffect, useRef } from "react";

/**
 * Fluid simulation background.
 * - Warm orange base that slowly oscillates with cool blue.
 * - Cursor leaves a soft, delicate ribbon trail (opposite tint of background).
 * - Velocity is injected slightly ahead of motion to "push the water".
 */

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const ADVECT_FRAG = `
precision highp float;
varying vec2 v_uv;
uniform sampler2D u_velocity;
uniform sampler2D u_source;
uniform vec2 u_texel;
uniform float u_dt;
uniform float u_dissipation;
void main() {
  vec2 vel = texture2D(u_velocity, v_uv).xy;
  vec2 coord = v_uv - u_dt * vel * u_texel;
  vec4 c = texture2D(u_source, coord);
  gl_FragColor = c * u_dissipation;
}
`;

const SPLAT_FRAG = `
precision highp float;
varying vec2 v_uv;
uniform sampler2D u_target;
uniform vec2 u_point;
uniform vec3 u_color;
uniform float u_radius;
uniform float u_aspect;
void main() {
  vec2 p = v_uv - u_point;
  p.x *= u_aspect;
  float g = exp(-dot(p, p) / u_radius);
  vec3 base = texture2D(u_target, v_uv).xyz;
  gl_FragColor = vec4(base + g * u_color, 1.0);
}
`;

const DAMP_FRAG = `
precision highp float;
varying vec2 v_uv;
uniform sampler2D u_velocity;
uniform float u_damp;
void main() {
  vec2 v = texture2D(u_velocity, v_uv).xy;
  gl_FragColor = vec4(v * u_damp, 0.0, 1.0);
}
`;

const DISPLAY_FRAG = `
precision highp float;
varying vec2 v_uv;
uniform sampler2D u_dye;
uniform float u_phase;
void main() {
  vec3 orange = vec3(0.78, 0.46, 0.20);
  vec3 blue   = vec3(0.25, 0.32, 0.70);
  float t = 0.5 + 0.5 * sin(u_phase);
  vec3 base = mix(orange, blue, t);

  vec3 dye = texture2D(u_dye, v_uv).rgb;
  vec3 col = base + dye;

  vec2 p = v_uv - 0.5;
  float vig = smoothstep(0.95, 0.25, length(p));
  col *= 0.55 + 0.55 * vig;
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
  return s;
}
function program(gl: WebGLRenderingContext, vsSrc: string, fsSrc: string) {
  const p = gl.createProgram()!;
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, vsSrc));
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, fsSrc));
  gl.linkProgram(p);
  return p;
}
function makeFBO(gl: WebGLRenderingContext, w: number, h: number, type: number) {
  const tex = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, type, null);
  const fbo = gl.createFramebuffer()!;
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  gl.viewport(0, 0, w, h);
  gl.clear(gl.COLOR_BUFFER_BIT);
  return { tex, fbo, w, h };
}
type FBO = ReturnType<typeof makeFBO>;
function makeDouble(gl: WebGLRenderingContext, w: number, h: number, type: number) {
  let a = makeFBO(gl, w, h, type);
  let b = makeFBO(gl, w, h, type);
  return { read: () => a, write: () => b, swap: () => { const t = a; a = b; b = t; } };
}

export function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: false, premultipliedAlpha: false }) as WebGLRenderingContext | null;
    if (!gl) return;

    const halfFloatExt = gl.getExtension("OES_texture_half_float");
    gl.getExtension("OES_texture_half_float_linear");
    gl.getExtension("OES_texture_float");
    gl.getExtension("OES_texture_float_linear");
    const HALF_FLOAT = halfFloatExt ? halfFloatExt.HALF_FLOAT_OES : gl.UNSIGNED_BYTE;

    const advectProg = program(gl, VERT, ADVECT_FRAG);
    const splatProg = program(gl, VERT, SPLAT_FRAG);
    const dampProg = program(gl, VERT, DAMP_FRAG);
    const displayProg = program(gl, VERT, DISPLAY_FRAG);

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const bindQuad = (prog: WebGLProgram) => {
      const loc = gl.getAttribLocation(prog, "a_pos");
      gl.bindBuffer(gl.ARRAY_BUFFER, quad);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    };

    const SIM_RES = 192;
    let dW = 0, dH = 0, sW = 0, sH = 0;
    let velocity: ReturnType<typeof makeDouble>;
    let dye: ReturnType<typeof makeDouble>;

    const setupFBOs = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      dW = Math.floor(window.innerWidth * dpr);
      dH = Math.floor(window.innerHeight * dpr);
      canvas.width = dW;
      canvas.height = dH;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";

      const ar = dW / dH;
      sW = SIM_RES;
      sH = Math.round(SIM_RES / ar);
      velocity = makeDouble(gl, sW, sH, HALF_FLOAT);
      dye = makeDouble(gl, sW, sH, HALF_FLOAT);
    };
    setupFBOs();
    const onResize = () => setupFBOs();
    window.addEventListener("resize", onResize);

    const pointer = { x: 0.5, y: 0.5, dx: 0, dy: 0, moved: false };
    const onMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = 1.0 - e.clientY / window.innerHeight;
      pointer.dx = x - pointer.x;
      pointer.dy = y - pointer.y;
      pointer.x = x;
      pointer.y = y;
      pointer.moved = true;
    };
    window.addEventListener("pointermove", onMove);

    const blit = (target: FBO | null) => {
      if (target) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
        gl.viewport(0, 0, target.w, target.h);
      } else {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, dW, dH);
      }
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const splat = (
      target: ReturnType<typeof makeDouble>,
      x: number, y: number,
      cr: number, cg: number, cb: number,
      radius: number,
    ) => {
      gl.useProgram(splatProg);
      bindQuad(splatProg);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, target.read().tex);
      gl.uniform1i(gl.getUniformLocation(splatProg, "u_target"), 0);
      gl.uniform2f(gl.getUniformLocation(splatProg, "u_point"), x, y);
      gl.uniform3f(gl.getUniformLocation(splatProg, "u_color"), cr, cg, cb);
      gl.uniform1f(gl.getUniformLocation(splatProg, "u_radius"), radius);
      gl.uniform1f(gl.getUniformLocation(splatProg, "u_aspect"), sW / sH);
      blit(target.write());
      target.swap();
    };

    const advect = (
      target: ReturnType<typeof makeDouble>,
      dt: number, dissipation: number,
    ) => {
      gl.useProgram(advectProg);
      bindQuad(advectProg);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read().tex);
      gl.uniform1i(gl.getUniformLocation(advectProg, "u_velocity"), 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, target.read().tex);
      gl.uniform1i(gl.getUniformLocation(advectProg, "u_source"), 1);
      gl.uniform2f(gl.getUniformLocation(advectProg, "u_texel"), 1 / sW, 1 / sH);
      gl.uniform1f(gl.getUniformLocation(advectProg, "u_dt"), dt);
      gl.uniform1f(gl.getUniformLocation(advectProg, "u_dissipation"), dissipation);
      blit(target.write());
      target.swap();
    };

    const damp = (factor: number) => {
      gl.useProgram(dampProg);
      bindQuad(dampProg);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read().tex);
      gl.uniform1i(gl.getUniformLocation(dampProg, "u_velocity"), 0);
      gl.uniform1f(gl.getUniformLocation(dampProg, "u_damp"), factor);
      blit(velocity.write());
      velocity.swap();
    };

    const start = performance.now();
    let last = start;
    let raf = 0;

    const loop = () => {
      const now = performance.now();
      const dt = Math.min(0.016, (now - last) / 1000);
      last = now;
      const elapsed = (now - start) / 1000;

      const phase = elapsed * 0.25;
      const currentBlend = 0.5 + 0.5 * Math.sin(phase);

      if (pointer.moved) {
        const orangeTint: [number, number, number] = [0.55, 0.22, -0.15];
        const blueTint:   [number, number, number] = [-0.18, -0.05, 0.65];
        const mixT = currentBlend;
        const cr = blueTint[0] * (1 - mixT) + orangeTint[0] * mixT;
        const cg = blueTint[1] * (1 - mixT) + orangeTint[1] * mixT;
        const cb = blueTint[2] * (1 - mixT) + orangeTint[2] * mixT;

        const speed = Math.hypot(pointer.dx, pointer.dy);
        // Delicate ribbon — small radius, soft intensity
        const intensity = Math.min(0.55, 0.2 + speed * 5);
        const dyeRadius = 0.0035;
        splat(dye, pointer.x, pointer.y, cr * intensity, cg * intensity, cb * intensity, dyeRadius);

        // Push velocity slightly ahead of motion
        const vScale = 500;
        const ahead = 0.3;
        const aheadX = pointer.x + pointer.dx * ahead;
        const aheadY = pointer.y + pointer.dy * ahead;
        splat(
          velocity,
          aheadX, aheadY,
          pointer.dx * vScale, pointer.dy * vScale, 0,
          0.003,
        );

        pointer.moved = false;
        pointer.dx *= 0.6;
        pointer.dy *= 0.6;
      }

      advect(velocity, dt * 60, 0.992);
      damp(0.992);
      advect(dye, dt * 60, 0.998);

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, dW, dH);
      gl.useProgram(displayProg);
      bindQuad(displayProg);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, dye.read().tex);
      gl.uniform1i(gl.getUniformLocation(displayProg, "u_dye"), 0);
      gl.uniform1f(gl.getUniformLocation(displayProg, "u_phase"), phase);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="block h-full w-full" />;
}
