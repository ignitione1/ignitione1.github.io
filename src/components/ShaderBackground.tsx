import { Shader, ChromaFlow, Swirl } from "shaders/react";

/**
 * Background shader — configuration from the reference site.
 */
export function ShaderBackground() {
  return (
    <Shader
      className="h-full w-full"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <Swirl
        colorA="#1275d8"
        colorB="#e19136"
        speed={0.8}
        detail={0.8}
        blend={50}
      />
      <ChromaFlow
        baseColor="#0066ff"
        upColor="#0066ff"
        downColor="#d1d1d1"
        leftColor="#e19136"
        rightColor="#e19136"
        intensity={0.9}
        radius={1.8}
        momentum={25}
        maskType="alpha"
        opacity={0.97}
      />
    </Shader>
  );
}
