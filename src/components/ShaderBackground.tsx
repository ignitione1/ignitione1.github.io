import { useEffect, useState, lazy, Suspense } from "react";

const ShaderInner = lazy(() => import("./ShaderBackgroundInner"));

export function ShaderBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-full w-full bg-black" />;
  return (
    <Suspense fallback={<div className="h-full w-full bg-black" />}>
      <ShaderInner />
    </Suspense>
  );
}
