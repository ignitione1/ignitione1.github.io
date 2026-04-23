import { MeshGradient } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";

/**
 * Smooth liquid mesh gradient background using @paper-design/shaders-react.
 * Reacts to cursor movement by subtly shifting colors and distortion.
 */
export function ShaderBackground() {
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const update = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (size.w === 0) return null;

  return (
    <div className="absolute inset-0 h-full w-full">
      <MeshGradient
        width={size.w}
        height={size.h}
        colors={["#d97939", "#e8a04a", "#3b4ba8", "#1a1f3a"]}
        distortion={0.85}
        swirl={0.35}
        speed={0.45}
        grainMixer={0.02}
        grainOverlay={0.04}
        style={{ width: "100%", height: "100%" }}
      />
      <MeshGradient
        width={size.w}
        height={size.h}
        colors={["#00000000", "#4a5fcf", "#00000000", "#e88c3a"]}
        distortion={1}
        swirl={0.6}
        speed={0.7}
        grainMixer={0}
        grainOverlay={0}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          mixBlendMode: "screen",
          opacity: 0.55,
        }}
      />
    </div>
  );
}
