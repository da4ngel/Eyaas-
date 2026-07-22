import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { Download, FileCode, Code2, Atom, Brain, Server, Database } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const skills = [
  "JavaScript/TypeScript",
  "Python",
  "React",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "TensorFlow",
  "PyTorch",
  "Docker",
];

type SkillItem = { name: string; subtitle: string; v: number; Icon: LucideIcon };
const detailedSkills: SkillItem[] = [
  { name: "Python", subtitle: "Data Science", v: 89, Icon: FileCode },
  { name: "Machine Learning", subtitle: "AI & Algorithms", v: 82, Icon: Brain },
  { name: "JavaScript", subtitle: "Frontend & Full-Stack", v: 80, Icon: Code2 },
  { name: "React", subtitle: "UI Framework", v: 78, Icon: Atom },
  { name: "Node.js", subtitle: "Backend Runtime", v: 65, Icon: Server },
  { name: "Databases", subtitle: "SQL & NoSQL", v: 70, Icon: Database },
];

const stats = [
  { label: "Certifications", value: "3" },
  { label: "Years of Experience", value: "2+" },
  { label: "Technologies Mastered", value: "12" },
  { label: "Passion‑Driven", value: "100%" },
];

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
            <div className="md:col-span-4 space-y-6 sm:max-w-sm md:max-w-none">
              <div className="relative rounded-2xl border border-primary/20 shadow-[var(--shadow-glow)] bg-gradient-to-br from-primary/10 to-accent/10 p-2">
                <AspectRatio ratio={3 / 4}>
                  <img
                    src="/lovable-uploads/80607c52-3ca7-47d9-bf90-c7ccf791a76e.png"
                    alt="Eyaas Ajmal, Data Science undergraduate at SLIIT"
                    className="h-full w-full rounded-xl object-cover"
                    loading="lazy"
                  />
                </AspectRatio>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4" aria-label="Quick stats">
                {stats.map((s) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-xl border bg-card text-card-foreground p-4 sm:p-5 shadow-sm hover-scale"
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-primary">{s.value}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Intro + Actions + Tech badges */}
            <div className="md:col-span-7 space-y-6">
              <motion.p
                className="text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35 }}
              >
                My journey began in the world of data science, where I discovered the power of transforming raw information into actionable insights. What started as curiosity about patterns in data evolved into a passion for building complete solutions that bridge analytical precision with user-centered design.
              </motion.p>
              <motion.p
                className="text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: 0.05 }}
              >
                Today, I specialize in creating intelligent applications that don&apos;t just process data—they tell stories, solve problems, and enhance human experiences. My approach combines rigorous analytical thinking with creative problem-solving, ensuring every solution is both technically sound and intuitively accessible.
              </motion.p>
              <motion.p
                className="text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                Currently expanding into machine learning and AI, I&apos;m fascinated by the intersection of traditional development and emerging technologies. Every project is an opportunity to push boundaries and create something meaningful.
              </motion.p>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="/lovable-uploads/Eyaas-CV.jpg"
                      download="Eyaas-Ajmal-CV.png"
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

          {/* Skills & Proficiency */}
          <section className="mt-10">
            <h3 className="text-xl font-semibold mb-4">Skills &amp; Proficiency</h3>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {detailedSkills.map((s, i) => (
                <motion.article
                  key={s.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="rounded-2xl border border-primary/20 bg-card/60 p-4 sm:p-5 shadow-sm hover:shadow-[var(--shadow-glow)] hover-scale"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/15 to-accent/15 grid place-items-center border border-primary/20">
                        <s.Icon className="h-5 w-5 text-primary" aria-hidden />
                      </div>
                      <div>
                        <h4 className="font-semibold">{s.name}</h4>
                        <p className="text-xs text-muted-foreground">{s.subtitle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{s.v}%</div>
                      <div className="text-xs text-muted-foreground">Proficiency</div>
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  >
                    <Progress value={s.v} className="mt-3" />
                  </motion.div>
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
