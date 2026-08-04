import { ReactNode, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useCoarsePointer } from "@/hooks/use-coarse-pointer";

/**
 * A card wrapper that tilts toward the cursor in 3D and lifts on hover.
 *
 * This generalizes the one-off tilt that used to live inline in Projects.tsx so
 * the whole site can share one consistent 3D feel. Motion is spring-smoothed
 * (the same useMotionValue + useSpring approach as MagneticButton) rather than
 * snapping, and the rotation is driven through framer's own rotateX/rotateY
 * style props so it composes cleanly with the whileHover scale.
 *
 * Touch: there is no cursor to tilt toward and no hover state to enter, so on a
 * coarse pointer the card gets the touch equivalent — it presses in under the
 * finger. Wiring the tilt to touchmove instead would fight the scroll gesture,
 * since on a phone every touch that crosses a card is someone scrolling past
 * it. Previously these cards were completely inert on mobile.
 *
 * Accessibility: under prefers-reduced-motion it renders a plain, static div —
 * no listeners, no transforms — so reduced-motion users get the flat, readable
 * card the rest of the site already gives them.
 */

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Peak tilt in degrees at the card's edges. */
  intensity?: number;
  /** Show a soft cursor-following highlight for a glassy sheen. */
  glare?: boolean;
}

const SPRING = { stiffness: 250, damping: 20 };

const TiltCard = ({ children, className, intensity = 7, glare = false }: TiltCardProps) => {
  const reduce = useReducedMotion();
  const coarse = useCoarsePointer();
  const ref = useRef<HTMLDivElement>(null);

  // Normalized pointer position within the card, -0.5 … 0.5 on each axis.
  const px = useSpring(useMotionValue(0), SPRING);
  const py = useSpring(useMotionValue(0), SPRING);

  // Map pointer to rotation. rotateX responds to vertical position (inverted so
  // the top edge leans away), rotateY to horizontal position.
  const rotateX = useTransform(py, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(px, [-0.5, 0.5], [-intensity, intensity]);

  // Glare sits where the cursor is and fades toward the edges.
  const glareX = useTransform(px, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(py, [-0.5, 0.5], ["0%", "100%"]);

  const [hovered, setHovered] = useState(false);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  if (coarse) {
    return (
      <motion.div
        className={className}
        whileTap={{ scale: 0.975 }}
        transition={{ type: "spring", ...SPRING }}
      >
        {children}
      </motion.div>
    );
  }

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const reset = () => {
    setHovered(false);
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
        // Anchor the glare overlay; harmless for the non-glare case.
        position: "relative",
      }}
      whileHover={{ scale: 1.02, z: 30 }}
      transition={{ type: "spring", ...SPRING }}
    >
      {children}

      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
          style={{ opacity: hovered ? 1 : 0, transition: "opacity 200ms ease" }}
        >
          <motion.div
            className="absolute h-[60%] w-[60%] rounded-full blur-2xl"
            style={{
              left: glareX,
              top: glareY,
              x: "-50%",
              y: "-50%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.18), transparent 65%)",
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default TiltCard;
