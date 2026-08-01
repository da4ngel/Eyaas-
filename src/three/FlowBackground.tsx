import { Suspense, lazy } from "react";
import use3D from "@/three/use3D";

/**
 * The persistent, site-wide backdrop. One fixed layer behind every section:
 * the WebGL particle flow when the device can afford it, a calm CSS gradient
 * otherwise.
 *
 * The renderer is lazily imported so three.js stays out of the first paint and
 * out of the bundle entirely for anyone on the fallback path — exactly the
 * pattern Hero.tsx uses for the hero orb. use3D() is the single gate: it drops
 * to the CSS fallback for no-WebGL, reduced-motion, and low-end devices, so a
 * useFrame loop never runs for someone who asked not to see motion.
 *
 * The wrapper is fixed, full-viewport, behind content (-z-10) and click-through
 * (pointer-events-none), and wholly decorative (aria-hidden).
 */
const FlowField = lazy(() => import("@/three/FlowField"));

const FlowBackground = () => {
  const enable3D = use3D();

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      {enable3D ? (
        <Suspense fallback={<div className="flow-fallback" />}>
          <FlowField />
        </Suspense>
      ) : (
        <div className="flow-fallback" />
      )}
    </div>
  );
};

export default FlowBackground;
