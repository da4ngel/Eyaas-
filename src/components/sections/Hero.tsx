import { motion } from "framer-motion";
import SplineScene from "@/components/3d/SplineScene";
import MagneticButton from "@/components/atoms/MagneticButton";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="hero" className="relative pt-24 pb-12 sm:pt-28 sm:pb-16">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight font-sans glow-text">
            Eyaas Ajmal
          </motion.h1>
          <br />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl tracking-tight font-medium text-muted-foreground/80 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Full Stack AI-ML Engineer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 text-lg sm:text-xl text-muted-foreground"
          >
            Building intelligent full-stack solutions with code, data, and creativity.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <MagneticButton>
              <Button asChild variant="glow" size="xl">
                <a href="#projects" aria-label="View my work">View My Work</a>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button asChild variant="hero" size="xl">
                <a href="#contact" aria-label="Contact me">Contact Me</a>
              </Button>
            </MagneticButton>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-[320px] sm:h-[420px] md:h-[520px]"
            label="Interactive 3D illustration of a robot that follows your cursor"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
