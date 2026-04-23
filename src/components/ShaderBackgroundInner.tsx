import { Shader, ChromaFlow, Swirl } from "shaders/react";
import { useEffect, useState } from "react";

export default function ShaderBackgroundInner() {
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  return (
    <div
      className="absolute inset-0"
      style={{ width: "100vw", height: "100vh" }}
    >
      <Shader
        className="h-full w-full"
        style={{ width: viewport.width || "100vw", height: viewport.height || "100vh", display: "block" }}
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
          opacity={0.97}
        />
      </Shader>
    </div>
  );
}
