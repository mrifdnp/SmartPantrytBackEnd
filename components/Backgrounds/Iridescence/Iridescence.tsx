"use client";

import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import { useEffect, useRef } from "react";

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  uv += (uMouse - vec2(0.5)) * uAmplitude;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;

  // Efek animasi dasar
  vec3 wave = vec3(
    cos(uv.x * d) * 0.5 + 0.5,
    sin(uv.y * d) * 0.5 + 0.5,
    cos((uv.x + uv.y) * d) * 0.5 + 0.5
  );

  // Clamp biar gak overshoot
  wave = clamp(wave, 0.0, 1.0);

  // Warna Tailwind (gelap + aksen)
  vec3 greenDark = vec3(187.0/255.0, 247.0/255.0, 208.0/255.0);   // green-600
  vec3 emeraldDark = vec3(198.0/255.0, 225.0/255.0, 239.0/255.0); // emerald-600
  vec3 blueAccent = vec3(191.0/255.0, 219.0/255.0, 254.0/255.0);  // blue-600
  vec3 yellowAccent = vec3(255.0/255.0, 247.0/255.0, 208.0/255.0); // yellow-400

  // Mulai campur warna
  vec3 col = mix(greenDark, emeraldDark, wave.r);
  col = mix(col, blueAccent, wave.g * 0.5);
  col = mix(col, yellowAccent, wave.b * 0.4);

  // Sedikit perkuat kontras biar deep
  col = pow(col, vec3(0.8));

  gl_FragColor = vec4(col, 1.0);
}
`;



type PresetColor =
  | "emerald600"
  | "green600"
  | "bgGreen200"
  | "bgEmerald200"
  | "bgBlue200";

interface IridescenceProps {
  color?: [number, number, number];
  colorVariant?: PresetColor;
  speed?: number;
  amplitude?: number;
  mouseReact?: boolean;
}

const presetColors: Record<PresetColor, [number, number, number]> = {
  emerald600: [5 / 255, 150 / 255, 105 / 255],
  green600: [22 / 255, 163 / 255, 74 / 255],
  bgGreen200: [187 / 255, 247 / 255, 208 / 255],
  bgEmerald200: [167 / 255, 243 / 255, 208 / 255],
  bgBlue200: [191 / 255, 219 / 255, 254 / 255],
};

export default function Iridescence({
  color = presetColors.emerald600,
  colorVariant,
  speed = 1.0,
  amplitude = 0.1,
  mouseReact = true,
  ...rest
}: IridescenceProps) {
  const ctnDom = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!ctnDom.current) return;
    const ctn = ctnDom.current;
    const renderer = new Renderer();
    const gl = renderer.gl;
    gl.clearColor(1, 1, 1, 1);

    let program: Program;

    function resize() {
      const scale = 1;
      renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);
      if (program) {
        program.uniforms.uResolution.value = new Color(
          gl.canvas.width,
          gl.canvas.height,
          gl.canvas.width / gl.canvas.height
        );
      }
    }
    window.addEventListener("resize", resize, false);
    resize();

    const geometry = new Triangle(gl);
    const finalColor =
      colorVariant && presetColors[colorVariant]
        ? presetColors[colorVariant]
        : color;

    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color(...finalColor) },
        uResolution: {
          value: new Color(
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height
          ),
        },
        uMouse: {
          value: new Float32Array([
            mousePos.current.x,
            mousePos.current.y,
          ]),
        },
        uAmplitude: { value: amplitude },
        uSpeed: { value: speed },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    let animateId: number;

    function update(t: number) {
      animateId = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    }
    animateId = requestAnimationFrame(update);
    ctn.appendChild(gl.canvas);

    function handleMouseMove(e: MouseEvent) {
      const rect = ctn.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      mousePos.current = { x, y };
      program.uniforms.uMouse.value[0] = x;
      program.uniforms.uMouse.value[1] = y;
    }
    if (mouseReact) {
      ctn.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener("resize", resize);
      if (mouseReact) {
        ctn.removeEventListener("mousemove", handleMouseMove);
      }
      ctn.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [color, colorVariant, speed, amplitude, mouseReact]);

  return <div ref={ctnDom} className="w-full h-full" {...rest} />;
}
