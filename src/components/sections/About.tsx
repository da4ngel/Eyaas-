import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { about, detailedSkills, skills, stats } from "@/content/site";
import TiltCard from "@/components/atoms/TiltCard";
import Parallax from "@/components/atoms/Parallax";

const About = () => {
  return (
    <section id="about" className="py-16 sm:py-20 animate-fade-in">
      <div className="container mx-auto px-4">
        <article className="glass rounded-2xl p-6 sm:p-10">
          <header className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">About Me</h2>
            <p className="sr-only">Portfolio introduction and skills</p>
          </header>

          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Left: Portrait + Quick Stats */}
            <Parallax speed={-24} className="md:col-span-4 space-y-6 sm:max-w-sm md:max-w-none">
              <TiltCard
                intensity={10}
                glare
                className="relative rounded-2xl border border-primary/20 shadow-[var(--shadow-glow)] bg-gradient-to-br from-primary/10 to-accent/10 p-2"
              >
                <AspectRatio ratio={3 / 4}>
                  <img
                    src={about.portrait.src}
                    alt={about.portrait.alt}
                    className="h-full w-full rounded-xl object-cover"
                    loading="lazy"
                  />
                </AspectRatio>
              </TiltCard>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-3 sm:gap-4" aria-label="Quick stats">
                {stats.map((s) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TiltCard className="rounded-xl border bg-card text-card-foreground p-4 sm:p-5 shadow-sm h-full">
                      <div className="text-2xl sm:text-3xl font-bold text-primary">{s.value}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">{s.label}</div>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            </Parallax>

            {/* Right: Intro + Actions + Tech badges */}
            <div className="md:col-span-7 space-y-6">
              {about.paragraphs.map((text, i) => (
                <motion.p
                  key={i}
                  className="text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                >
                  {text}
                </motion.p>
              ))}

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={about.resume.href}
                      download={about.resume.downloadAs}
                      aria-label="Download professional resume"
                    >
                      <Button className="hover-scale">
                        <Download className="mr-2 h-4 w-4" aria-hidden />
                        Download Resume
                      </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>Download my CV</TooltipContent>
                </Tooltip>
              </div>

              {/* Tech badges */}
              <div className="pt-2">
                <h3 className="text-lg font-medium mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <motion.div key={s} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.98 }}>
                      <Badge variant="secondary" className="hover-scale shadow-[var(--shadow-elegant)]">
                        {s}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Skills, each paired with the work that evidences it */}
          <section className="mt-10">
            <h3 className="text-xl font-semibold mb-1">Skills</h3>
            <p className="text-sm text-muted-foreground mb-4">Where I&apos;ve actually used each one.</p>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {detailedSkills.map((s, i) => (
                <motion.article
                  key={s.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                >
                  <TiltCard glare className="rounded-2xl border border-primary/20 bg-card/60 p-4 sm:p-5 shadow-sm hover:shadow-[var(--shadow-glow)] h-full">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br from-primary/15 to-accent/15 grid place-items-center border border-primary/20">
                        <s.Icon className="h-5 w-5 text-primary" aria-hidden />
                      </div>
                      <div>
                        <h4 className="font-semibold">{s.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{s.evidence}</p>
                      </div>
                    </div>
                  </TiltCard>
                </motion.article>
              ))}
            </div>
          </section>
        </article>
      </div>
    </section>
  );
};

export default About;
