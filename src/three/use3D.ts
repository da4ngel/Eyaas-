import { useEffect, useState } from "react";

/**
 * Single gate deciding whether to mount the WebGL build or fall back to the
 * DOM sections in src/components/sections/*.
 *
 * Three independent reasons to fall back:
 *   1. No WebGL2      — nothing would render at all.
 *   2. Reduced motion — a scroll-driven camera flythrough is exactly the kind
 *                       of vestibular trigger the setting exists to prevent.
 *                       CSS cannot stop a useFrame loop, so it is gated here.
 *   3. Low-end device — the flythrough costs most on the hardware least able
 *                       to afford it.
 *
 * Tune the thresholds in `isLowEnd` — that is the one knob worth moving once
 * the build has been measured on a real handset.
 */

function hasWebGL2(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!canvas.getContext("webgl2");
  } catch {
    return false;
  }
}

function isLowEnd(): boolean {
  // navigator.deviceMemory and hardwareConcurrency are advisory and absent on
  // Safari, so a missing value must not by itself force the fallback.
  const nav = navigator as Navigator & { deviceMemory?: number };
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) return true;
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4) return true;

  // Coarse pointer with a narrow viewport is a phone. Flip this line to ship
  // the flythrough to mobile once it has been profiled there.
  if (window.matchMedia("(pointer: coarse)").matches && window.innerWidth < 900) return true;

  return false;
}

export function use3D(): boolean {
  // Start false so the first paint is the cheap DOM path; the effect promotes
  // to WebGL once the capability checks pass. This also keeps the very first
  // render identical to the static #root markup in index.html.
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => {
      setEnabled(hasWebGL2() && !motionQuery.matches && !isLowEnd());
    };

    evaluate();

    // Honour the setting being changed while the page is open.
    motionQuery.addEventListener("change", evaluate);
    window.addEventListener("resize", evaluate);
    return () => {
      motionQuery.removeEventListener("change", evaluate);
      window.removeEventListener("resize", evaluate);
    };
  }, []);

  return enabled;
}

export default use3D;
