import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Scroll-driven vertical parallax for a layer. Different `speed` values on
 * neighbouring layers make them drift at different rates as they pass through
 * the viewport, which reads as depth — the DOM counterpart to the site's WebGL
 * 3D moments.
 *
 * Accessibility: under prefers-reduced-motion it renders its children plainly,
 * with no scroll coupling.
 */

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Pixels of travel across the element's full pass through the viewport.
   *  Positive drifts down, negative drifts up (moves "faster"). */
  speed?: number;
}

const Parallax = ({ children, className, speed = -40 }: ParallaxProps) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
};

export default Parallax;
