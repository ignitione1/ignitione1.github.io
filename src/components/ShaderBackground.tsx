import { MeshGradient, Swirl } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";

/**
 * Smooth liquid background — MeshGradient base + Swirl overlay for fluid motion.
 * Uses @paper-design/shaders-react (same lib as the reference site).
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
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      <MeshGradient
        width={size.w}
        height={size.h}
        colors={["#d97939", "#e8a04a", "#3b4ba8", "#1a1f3a"]}
        distortion={0.9}
        swirl={0.4}
        speed={0.4}
        grainMixer={0}
        grainOverlay={0.03}
        style={{ width: "100%", height: "100%" }}
      />
      <Swirl
        width={size.w}
        height={size.h}
        colors={["#e88c3a", "#4a5fcf", "#1a1f3a"]}
        colorBack="#00000000"
        bandCount={2}
        twist={0.6}
        center={0.5}
        proportion={0.5}
        softness={1}
        noise={0.4}
        noiseFrequency={0.3}
        speed={0.25}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          mixBlendMode: "soft-light",
          opacity: 0.7,
        }}
      />
    </div>
  );
}
