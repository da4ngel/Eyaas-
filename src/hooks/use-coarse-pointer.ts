import { useEffect, useState } from "react";

/**
 * True when the primary input is a finger rather than a mouse.
 *
 * The distinction that matters for this site's effects is the input device,
 * not the viewport width: a narrow desktop window still has a cursor to follow,
 * and a large tablet does not. Anything driven by cursor position — the tilt in
 * TiltCard, the pull in MagneticButton, the CursorGlow halo — has no input to
 * respond to here and needs a touch-appropriate substitute instead.
 *
 * Starts false so the first client render matches what a desktop gets, then
 * corrects in the effect; the touch variants are all "less motion", so the
 * worst case is one frame of an effect that never gets to run.
 */
export function useCoarsePointer(): boolean {
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarse(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return coarse;
}

export default useCoarsePointer;
