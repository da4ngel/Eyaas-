import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import MagneticButton from "@/components/atoms/MagneticButton";
import Parallax from "@/components/atoms/Parallax";
import { Button } from "@/components/ui/button";
import { hero } from "@/content/site";
import use3D from "@/three/use3D";

/**
 * The hero object owns three.js. Loading it lazily keeps the renderer out of
 * the first paint (the text below renders immediately) and out of the bundle
 * entirely for anyone on the static fallback — reduced-motion, low-end, or
 * no-WebGL — since the import only fires when <NeuralConstellation/> renders.
 */
const NeuralConstellation = lazy(() => import("@/three/NeuralConstellation"));

/** Static stand-in for the 3D network: a small inline-SVG neural net in the
 *  brand gradient, no animation. Shown while the canvas loads and as the
 *  permanent fallback when 3D is disabled, so the right-hand column is never
 *  empty and reduced-motion users still get an on-theme, motionless graphic. */
const NetworkFallback = () => (
  <div aria-hidden className="absolute inset-0 grid place-items-center">
    <svg viewBox="0 0 200 160" className="w-64 h-52 sm:w-72 sm:h-60 opacity-70" role="presentation">
      <defs>
        <linearGradient id="hero-net" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      {/* Three layers of nodes, fully wired between adjacent layers. */}
      {[
        [30, 40], [30, 80], [30, 120],
        [100, 30], [100, 65], [100, 100], [100, 135],
        [170, 55], [170, 105],
      ].reduce<JSX.Element[]>((lines, [x, y], i, all) => {
        const layerOf = (idx: number) => (idx < 3 ? 0 : idx < 7 ? 1 : 2);
        all.forEach(([x2, y2], j) => {
          if (layerOf(j) === layerOf(i) + 1) {
            lines.push(
              <line key={`${i}-${j}`} x1={x} y1={y} x2={x2} y2={y2} stroke="url(#hero-net)" strokeWidth="0.6" opacity="0.35" />,
            );
          }
        });
        return lines;
      }, [])}
      {[
        [30, 40], [30, 80], [30, 120],
        [100, 30], [100, 65], [100, 100], [100, 135],
        [170, 55], [170, 105],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="url(#hero-net)" />
      ))}
    </svg>
  </div>
);

const Hero = () => {
  const enable3D = use3D();

  return (
    <section id="hero" className="relative pt-24 pb-12 sm:pt-28 sm:pb-16">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        {/* Left: copy */}
        <Parallax speed={-20}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight font-sans glow-text">
            {hero.name}
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 text-2xl sm:text-3xl md:text-4xl tracking-tight font-medium bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            {hero.tagline}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 text-lg sm:text-xl text-muted-foreground"
          >
            {hero.intro}
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
        </Parallax>

        {/* Right: the single 3D focal object, or its CSS stand-in. The canvas
            is absolutely positioned inside this sized, relative box. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative h-[320px] sm:h-[420px] md:h-[500px]"
          role="img"
          aria-label="Animated 3D neural network with signals flowing between the nodes"
        >
          {enable3D ? (
            <Suspense fallback={<NetworkFallback />}>
              <NeuralConstellation />
            </Suspense>
          ) : (
            <NetworkFallback />
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
