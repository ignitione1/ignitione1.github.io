import { useEffect, useState } from "react";
import { Shader, Swirl, ChromaFlow } from "shaders/react";

export function ShaderBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    window.sessionStorage.setItem("__shadersForceWebGL", "1");
    setMounted(true);

    return () => {
      window.sessionStorage.removeItem("__shadersForceWebGL");
    };
  }, []);

  if (!mounted) {
    return <div className="shader-bg h-full w-full" aria-hidden="true" />;
  }

  return (
    <Shader
      className="h-full w-full"
      style={{ width: "100%", height: "100%" }}
      colorSpace="srgb"
      disableTelemetry
    >
      <Swirl
        colorA="#1275d8"
        colorB="#e19136"
        speed={0.8}
        detail={0.8}
        blend={50}
        opacity={1}
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
        opacity={0.9}
      />
    </Shader>
  );
}
