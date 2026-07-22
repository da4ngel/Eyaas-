import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { Download, FileCode, Atom, Brain, Bot, Database, Table2, BarChart3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Data science first, then engineering. The section should read as a data
// scientist who can ship, not a web developer who dabbles in ML.
const skills = [
  "Python",
  "pandas",
  "NumPy",
  "scikit-learn",
  "SQL",
  "R",
  "TensorFlow",
  "PyTorch",
  "Power BI",
  "PostgreSQL",
  "Supabase",
  "MongoDB",
  "JavaScript/TypeScript",
  "React",
  "Node.js",
  "Java",
  "Docker",
  "Git",
];

/** Every skill is paired with the work that demonstrates it. A claim without
 *  evidence is worth less than no claim at all. */
type SkillItem = { name: string; evidence: string; Icon: LucideIcon };
const detailedSkills: SkillItem[] = [
  {
    name: "Python",
    evidence: "Flood risk model, asteroid orbit classifier, procurement pipeline automation",
    Icon: FileCode,
  },
  {
    name: "Machine Learning",
    evidence: "Time-series forecasting, classification, feature engineering, model validation",
    Icon: Brain,
  },
  {
    name: "pandas & NumPy",
    evidence: "EDA, cleaning and consolidation across supplier, purchasing and orbital datasets",
    Icon: Table2,
  },
  {
    name: "SQL & PostgreSQL",
    evidence: "WashCO booking platform on Supabase; multi-source procurement data consolidation",
    Icon: Database,
  },
  {
    name: "Data Visualisation",
    evidence: "Flood decision dashboard; Power BI and Matplotlib reporting on supplier data",
    Icon: BarChart3,
  },
  {
    name: "LLM tooling & n8n",
    evidence: "PodBang podcast automation agent, AI Code Reviewer",
    Icon: Bot,
  },
  {
    name: "React & Node.js",
    evidence: "WashCO, PodBang, Pet Universe, this site",
    Icon: Atom,
  },
];

const stats = [
  { value: "3.56", label: "CGPA — BSc (Hons) Data Science, SLIIT" },
  { value: "2027", label: "Expected graduation" },
  { value: "2+", label: "Years building data-driven systems" },
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
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-3 sm:gap-4" aria-label="Quick stats">
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
                I&apos;m in my final year of a BSc (Hons) in Information Technology at SLIIT, specialising in Data Science, with a CGPA of 3.56. My coursework runs through machine learning, data mining, big data analytics, database systems and cloud-driven solutions.
              </motion.p>
              <motion.p
                className="text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: 0.05 }}
              >
                My undergraduate research is on satellite-based flood risk assessment for Sri Lanka. I own the predictive risk modelling and the decision dashboard: the model forecasts flood events ahead of time from environmental data, validated against recorded historical floods, and the dashboard turns those forecasts into something a responder can act on.
              </motion.p>
              <motion.p
                className="text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                Alongside the degree I work as Purchasing Manager at Sillara Agri Tech, where I replaced a manual, multi-step daily procurement pricing process with an automated pipeline and built the margin logic across fresh produce and packaged goods. Most of my day-to-day data work — cleaning, validation, consolidating sources, EDA — comes from there. I&apos;m looking for a data science or machine learning internship.
              </motion.p>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="/lovable-uploads/Eyaas-CV.jpg"
                      download="Eyaas-Ajmal-CV.jpg"
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
                  className="rounded-2xl border border-primary/20 bg-card/60 p-4 sm:p-5 shadow-sm hover:shadow-[var(--shadow-glow)] hover-scale"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br from-primary/15 to-accent/15 grid place-items-center border border-primary/20">
                      <s.Icon className="h-5 w-5 text-primary" aria-hidden />
                    </div>
                    <div>
                      <h4 className="font-semibold">{s.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{s.evidence}</p>
                    </div>
                  </div>
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
