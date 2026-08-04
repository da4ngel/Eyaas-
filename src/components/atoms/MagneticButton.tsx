import { ReactNode, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCoarsePointer } from "@/hooks/use-coarse-pointer";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
}

/**
 * A button wrapper that drifts toward the cursor while it is hovered.
 *
 * On a coarse pointer there is nothing to be magnetic toward, so it gives the
 * touch equivalent — a press-in on tap — rather than sitting inert.
 */
const MagneticButton = ({ children, className }: MagneticButtonProps) => {
  const coarse = useCoarsePointer();
  const [isHover, setIsHover] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.2);
    y.set(relY * 0.2);
  };

  const reset = () => {
    setIsHover(false);
    x.set(0);
    y.set(0);
  };

  if (coarse) {
    return (
      <motion.div
        className={className}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      style={{ x: springX, y: springY }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={reset}
      onMouseMove={onMouseMove}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
