import { useEffect, useState } from "react";

/**
 * Single gate deciding how much WebGL a device gets.
 *
 *   "off"  — nothing renders; the DOM/CSS stand-ins in src/components/sections/*
 *            and the .flow-fallback gradient are shown instead.
 *   "low"  — the full scenes, at reduced particle count and pixel ratio.
 *   "high" — the full scenes at full quality.
 *
 * Only two things switch the effects off entirely:
 *   1. No WebGL2      — nothing would render at all.
 *   2. Reduced motion — endless drifting particles are exactly the kind of
 *                       vestibular trigger the setting exists to prevent. CSS
 *                       cannot stop a useFrame loop, so it is gated here.
 *
 * Everything else gets "low" rather than nothing. This used to be a boolean
 * that returned false for any coarse pointer under 900px, which meant every
 * phone fell through to the static SVG and a CSS gradient — the effects the
 * site is built around were invisible on the devices most people visit from.
 * The cost is carried by the quality tier instead: FlowField drops from 2500
 * particles to 900 and NeuralConstellation gives up antialiasing, with both
 * capping device pixel ratio at 1.5 so a 3x phone screen is not rendering nine
 * times the pixels.
 */

export type Quality3D = "off" | "low" | "high";

function hasWebGL2(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!canvas.getContext("webgl2");
  } catch {
    return false;
  }
}

/** Devices that can have the scenes, but not at full density. */
function needsReducedQuality(): boolean {
  // navigator.deviceMemory and hardwareConcurrency are advisory and absent on
  // Safari, so a missing value must not by itself force the low tier — the
  // coarse-pointer check below is what catches iPhones.
  const nav = navigator as Navigator & { deviceMemory?: number };
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) return true;
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4) return true;
  if (window.matchMedia("(pointer: coarse)").matches) return true;
  if (window.innerWidth < 900) return true;

  return false;
}

export function useQuality3D(): Quality3D {
  // Start "off" so the first paint is the cheap DOM path; the effect promotes
  // once the capability checks pass. This also keeps the very first render
  // identical to the static #root markup in index.html.
  const [quality, setQuality] = useState<Quality3D>("off");

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => {
      if (!hasWebGL2() || motionQuery.matches) {
        setQuality("off");
        return;
      }
      setQuality(needsReducedQuality() ? "low" : "high");
    };

    evaluate();

    // Honour the setting being changed, or the window resized, while open.
    motionQuery.addEventListener("change", evaluate);
    window.addEventListener("resize", evaluate);
    return () => {
      motionQuery.removeEventListener("change", evaluate);
      window.removeEventListener("resize", evaluate);
    };
  }, []);

  return quality;
}

/** Convenience for callers that only need to know whether to mount a canvas. */
export function use3D(): boolean {
  return useQuality3D() !== "off";
}

export default use3D;
