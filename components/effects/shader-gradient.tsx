'use client';

import { useEffect, useRef, useCallback } from 'react';

// ═══════════════════════════════════════════════════════════════════
// WebGL Animated Gradient Background
// Extracted from Framer's native gradient component, adapted for
// Next.js/React. Renders a full-screen-quad shader with noise-based
// animated gradients on a <canvas>.
// ═══════════════════════════════════════════════════════════════════

const VERTEX_SHADER = `#version 300 es
layout(location = 0) in vec4 a_position;
void main() {
  gl_Position = a_position;
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform float u_time;
uniform float u_pixelRatio;
uniform vec2 u_resolution;
uniform float u_scale;
uniform float u_rotation;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
uniform float u_proportion;
uniform float u_softness;
uniform float u_shape;
uniform float u_shapeScale;
uniform float u_distortion;
uniform float u_swirl;
uniform float u_swirlIterations;

out vec4 fragColor;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

vec4 blend_colors(vec4 c1, vec4 c2, vec4 c3, float mixer, float edgesWidth, float edge_blur) {
  vec3 color1 = c1.rgb * c1.a;
  vec3 color2 = c2.rgb * c2.a;
  vec3 color3 = c3.rgb * c3.a;
  float r1 = smoothstep(.0 + .35 * edgesWidth, .7 - .35 * edgesWidth + .5 * edge_blur, mixer);
  float r2 = smoothstep(.3 + .35 * edgesWidth, 1. - .35 * edgesWidth + edge_blur, mixer);
  vec3 blended_color_2 = mix(color1, color2, r1);
  float blended_opacity_2 = mix(c1.a, c2.a, r1);
  vec3 c = mix(blended_color_2, color3, r2);
  float o = mix(blended_opacity_2, c3.a, r2);
  return vec4(c, o);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float t = .5 * u_time;
  float noise_scale = .0005 + .006 * u_scale;

  uv -= .5;
  uv *= (noise_scale * u_resolution);
  uv = rotate(uv, u_rotation * .5 * PI);
  uv /= u_pixelRatio;
  uv += .5;

  float n1 = noise(uv * 1. + t);
  float n2 = noise(uv * 2. - t);
  float angle = n1 * TWO_PI;
  uv.x += 4. * u_distortion * n2 * cos(angle);
  uv.y += 4. * u_distortion * n2 * sin(angle);

  float iterations_number = ceil(clamp(u_swirlIterations, 1., 30.));
  for (float i = 1.; i <= iterations_number; i++) {
    uv.x += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1.5 * uv.y);
    uv.y += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1. * uv.x);
  }

  float proportion = clamp(u_proportion, 0., 1.);
  float shape = 0.;
  float mixer = 0.;

  if (u_shape < .5) {
    vec2 checks_shape_uv = uv * (.5 + 3.5 * u_shapeScale);
    shape = .5 + .5 * sin(checks_shape_uv.x) * cos(checks_shape_uv.y);
    mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
  } else if (u_shape < 1.5) {
    vec2 stripes_shape_uv = uv * (.25 + 3. * u_shapeScale);
    float f = fract(stripes_shape_uv.y);
    shape = smoothstep(.0, .55, f) * smoothstep(1., .45, f);
    mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
  } else {
    float sh = 1. - uv.y;
    sh -= .5;
    sh /= (noise_scale * u_resolution.y);
    sh += .5;
    float shape_scaling = .2 * (1. - u_shapeScale);
    shape = smoothstep(.45 - shape_scaling, .55 + shape_scaling, sh + .3 * (proportion - .5));
    mixer = shape;
  }

  vec4 color_mix = blend_colors(u_color1, u_color2, u_color3, mixer, 1. - clamp(u_softness, 0., 1.), .01 + .01 * u_scale);
  fragColor = vec4(color_mix.rgb, color_mix.a);
}
`;

// ── Shape type enum ──
const ShapeType = { Checks: 0, Stripes: 1, Edge: 2 } as const;
type ShapeName = keyof typeof ShapeType;

// ── Preset type ──
interface GradientPreset {
  color1: string;
  color2: string;
  color3: string;
  rotation: number;
  proportion: number;
  scale: number;
  speed: number;
  distortion: number;
  swirl: number;
  swirlIterations: number;
  softness: number;
  offset: number;
  shape: ShapeName;
  shapeSize: number;
}

// ── Built-in presets ──
const PRESETS: Record<string, GradientPreset> = {
  // OXONN custom — cyan mist on black
  OxonnMist: {
    color1: '#050505',
    color2: '#00E5FF',
    color3: '#050505',
    rotation: 0,
    proportion: 33,
    scale: 0.48,
    speed: 25,
    distortion: 4,
    swirl: 65,
    swirlIterations: 5,
    softness: 100,
    offset: -235,
    shape: 'Edge',
    shapeSize: 48,
  },
  // OXONN subtle — very dark, barely visible
  OxonnSubtle: {
    color1: '#030303',
    color2: '#00E5FF',
    color3: '#030303',
    rotation: -30,
    proportion: 20,
    scale: 0.4,
    speed: 15,
    distortion: 3,
    swirl: 50,
    swirlIterations: 5,
    softness: 100,
    offset: -300,
    shape: 'Edge',
    shapeSize: 48,
  },
  // Framer Mist (original pink)
  Mist: {
    color1: '#050505',
    color2: '#FF66B8',
    color3: '#050505',
    rotation: 0,
    proportion: 33,
    scale: 0.48,
    speed: 39,
    distortion: 4,
    swirl: 65,
    swirlIterations: 5,
    softness: 100,
    offset: -235,
    shape: 'Edge',
    shapeSize: 48,
  },
  Prism: {
    color1: '#050505',
    color2: '#66B3FF',
    color3: '#FFFFFF',
    rotation: -50,
    proportion: 1,
    scale: 0.01,
    speed: 30,
    distortion: 0,
    swirl: 50,
    swirlIterations: 16,
    softness: 47,
    offset: -299,
    shape: 'Checks',
    shapeSize: 45,
  },
};

// ── Color parsing ──
function parseHex(hex: string): [number, number, number, number] {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
  if (hex.length === 6) hex += 'ff';
  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255,
    parseInt(hex.slice(6, 8), 16) / 255,
  ];
}

function parseColor(color: string): number[] {
  if (color.startsWith('#')) return Array.from(parseHex(color));
  return [0, 0, 0, 1];
}

// ── Build uniforms from preset ──
function buildUniforms(preset: GradientPreset) {
  return {
    u_scale: preset.scale,
    u_rotation: (preset.rotation * Math.PI) / 180,
    u_color1: parseColor(preset.color1),
    u_color2: parseColor(preset.color2),
    u_color3: parseColor(preset.color3),
    u_proportion: preset.proportion / 100,
    u_softness: preset.softness / 100,
    u_distortion: preset.distortion / 50,
    u_swirl: preset.swirl / 100,
    u_swirlIterations: preset.swirl === 0 ? 0 : preset.swirlIterations,
    u_shapeScale: preset.shapeSize / 100,
    u_shape: ShapeType[preset.shape],
  };
}

// ── WebGL helpers ──
function compileShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  console.error('Shader compile error:', gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  return null;
}

function createProgram(gl: WebGL2RenderingContext) {
  const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.detachShader(program, vs);
    gl.detachShader(program, fs);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    return program;
  }
  console.error('Program link error:', gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  return null;
}

// ═══════════════════════════════════════════════════════════════════
// React Component
// ═══════════════════════════════════════════════════════════════════

interface ShaderGradientProps {
  /** Preset name or custom config */
  preset?: string | GradientPreset;
  /** Noise texture overlay opacity (0-1, default 0.2) */
  noiseOpacity?: number;
  /** Noise texture scale (default 1) */
  noiseScale?: number;
  /** Additional CSS class for the container */
  className?: string;
  /** Whether to render (false = skip WebGL for SSR/perf) */
  enabled?: boolean;
}

const NOISE_URL = 'https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png';

export function ShaderGradient({
  preset = 'OxonnMist',
  noiseOpacity = 0.15,
  noiseScale = 1,
  className = '',
  enabled = true,
}: ShaderGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<{
    rafId: number | null;
    disposed: boolean;
    totalTime: number;
    lastFrame: number;
    speed: number;
    gl: WebGL2RenderingContext | null;
    program: WebGLProgram | null;
    uniformLocations: Record<string, WebGLUniformLocation | null>;
    resizeObserver: ResizeObserver | null;
    resolutionChanged: boolean;
  } | null>(null);

  const getPreset = useCallback((): GradientPreset => {
    if (typeof preset === 'string') {
      return PRESETS[preset] ?? PRESETS.OxonnMist;
    }
    return preset;
  }, [preset]);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', {
      premultipliedAlpha: false,
      alpha: true,
    });
    if (!gl) {
      console.warn('WebGL2 not supported');
      return;
    }

    const program = createProgram(gl);
    if (!program) return;

    // Setup fullscreen quad
    const posLoc = gl.getAttribLocation(program, 'a_position');
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const p = getPreset();
    const uniforms = buildUniforms(p);
    const uniformLocations: Record<string, WebGLUniformLocation | null> = {
      u_time: gl.getUniformLocation(program, 'u_time'),
      u_pixelRatio: gl.getUniformLocation(program, 'u_pixelRatio'),
      u_resolution: gl.getUniformLocation(program, 'u_resolution'),
    };
    for (const key of Object.keys(uniforms)) {
      uniformLocations[key] = gl.getUniformLocation(program, key);
    }

    // Set static uniforms
    gl.useProgram(program);
    for (const [name, value] of Object.entries(uniforms)) {
      const loc = uniformLocations[name];
      if (!loc) continue;
      if (Array.isArray(value)) {
        if (value.length === 4) gl.uniform4fv(loc, value);
        else if (value.length === 2) gl.uniform2fv(loc, value);
      } else {
        gl.uniform1f(loc, value);
      }
    }

    // Cubic bezier easing for speed
    const speedNorm = p.speed / 100;
    const easedSpeed = speedNorm * speedNorm * (3 - 2 * speedNorm) * 5;

    const state = {
      rafId: null as number | null,
      disposed: false,
      totalTime: (1000 / 120) * (p.offset * 10),
      lastFrame: performance.now(),
      speed: easedSpeed,
      gl,
      program,
      uniformLocations,
      resizeObserver: null as ResizeObserver | null,
      resolutionChanged: true,
    };
    rendererRef.current = state;

    // Resize handler
    const handleResize = () => {
      const dpr = window.devicePixelRatio;
      const w = canvas.clientWidth * dpr;
      const h = canvas.clientHeight * dpr;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        state.resolutionChanged = true;
        gl.viewport(0, 0, w, h);
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(canvas);
    state.resizeObserver = observer;
    handleResize();

    // Respect reduced-motion: render one static frame only
    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Render loop
    const render = (ts: number) => {
      if (state.disposed) return;
      const delta = ts - state.lastFrame;
      state.lastFrame = ts;
      state.totalTime += delta * state.speed;

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.uniform1f(uniformLocations.u_time!, state.totalTime * 0.001);

      if (state.resolutionChanged) {
        gl.uniform2f(uniformLocations.u_resolution!, canvas.width, canvas.height);
        gl.uniform1f(uniformLocations.u_pixelRatio!, window.devicePixelRatio);
        state.resolutionChanged = false;
      }

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // Stop loop after first frame if user prefers reduced motion
      if (!prefersReducedMotion) {
        state.rafId = requestAnimationFrame(render);
      }
    };

    state.rafId = requestAnimationFrame(render);

    // Cleanup
    return () => {
      state.disposed = true;
      if (state.rafId !== null) cancelAnimationFrame(state.rafId);
      observer.disconnect();
      gl.deleteProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
    };
  }, [enabled, getPreset]);

  if (!enabled) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ display: 'block' }}
      />
      {/* Noise texture overlay */}
      {noiseOpacity > 0 && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url(${NOISE_URL})`,
            backgroundRepeat: 'repeat',
            backgroundSize: `${noiseScale * 200}px`,
            opacity: noiseOpacity / 2,
          }}
        />
      )}
    </div>
  );
}

export { PRESETS as shaderPresets };
export type { GradientPreset };
