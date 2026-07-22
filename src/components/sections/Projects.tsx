import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Github, Linkedin, ExternalLink, Globe } from "lucide-react";

// Ordered by relevance to data science: research first, then ML/AI work,
// then full-stack. Every entry states the problem it solves and the approach
// taken, not just the stack.
type Project = {
  title: string;
  year: string;
  problem: string;
  approach: string;
  stack: string[];
  githubUrl: string;
  linkedInUrl: string;
  demoUrl?: string;
};

const projects: Project[] = [
  {
    title: "Flood Risk Prediction & Decision Dashboard",
    year: "2026",
    problem:
      "Flood warnings in Sri Lanka often arrive too late to act on, and the data behind them is not in a form responders can use.",
    approach:
      "Undergraduate research project. I own the predictive risk model, which forecasts flood events ahead of time from environmental data and is validated against recorded historical floods, plus the decision dashboard built over its output.",
    stack: ["Python", "scikit-learn", "pandas", "NumPy", "Time-series forecasting", "Matplotlib"],
    githubUrl: "",
    linkedInUrl: "",
  },
  {
    title: "Asteroid Orbit Viewer",
    year: "2025",
    problem:
      "Raw orbital element data says little about which near-Earth objects actually pose an impact risk.",
    approach:
      "Trained scikit-learn models on orbital datasets to predict Earth-impact risk, then built an interactive visualisation layer over the model outputs so the predictions can be explored rather than just read.",
    stack: ["Python", "scikit-learn", "pandas", "NumPy", "Classification", "JavaScript"],
    githubUrl: "",
    linkedInUrl: "",
  },
  {
    title: "AI Code Reviewer",
    year: "2025",
    problem: "Code review is a bottleneck, and much of the first pass is mechanical.",
    approach:
      "An LLM-based review assistant that analyses code quality, suggests refactors, and translates between languages.",
    stack: ["LLM APIs", "Prompt engineering", "Python", "React"],
    githubUrl: "",
    linkedInUrl: "",
  },
  {
    title: "PodBang – Agentic AI Podcast Automation",
    year: "2025",
    problem:
      "Producing a podcast episode means repeating the same planning, scripting and publishing steps every time.",
    approach:
      "An agentic AI platform that automates the end-to-end podcast workflow — autonomous agents plan, generate, refine and publish episode content with minimal human intervention.",
    stack: ["LLM APIs", "n8n", "Prompt engineering", "React", "Node.js"],
    githubUrl: "https://github.com/Eyaas-Ajmal/pod-AI",
    linkedInUrl: "https://www.linkedin.com/posts/eyaasajmal_ai-agenticai-automation-activity-7399622920106332160-VWfj?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEIKCqoBFFLCLy__iBN0AHNFDrJYuEN2WAo",
  },
  {
    title: "WashCO",
    year: "2026",
    problem:
      "Car wash vendors and customers had no shared system for booking time slots, so scheduling was manual and double-bookings were common.",
    approach:
      "Multi-vendor booking platform with slot-based scheduling, vendor management and role-based access control.",
    stack: ["React", "Node.js", "Express", "PostgreSQL", "Supabase"],
    githubUrl: "",
    linkedInUrl: "",
  },
  {
    title: "Pet Universe",
    year: "",
    problem: "Pet owners had nowhere to both connect with each other and buy supplies.",
    approach: "Full-stack social and marketplace platform combining a community feed with payments.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Redux", "JWT", "Stripe"],
    githubUrl: "",
    linkedInUrl: "",
  },
  {
    title: "Smart Ticket Support System",
    year: "",
    problem: "Customer queries arriving through several channels were tracked inconsistently.",
    approach: "Ticket management system routing and tracking support requests through to resolution.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Python", "Flask", "MySQL"],
    githubUrl: "",
    linkedInUrl: "",
  },
];

const ProjectCard = ({ p }: { p: (typeof projects)[number] }) => {
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${py * -6}deg`);
    el.style.setProperty("--ry", `${px * 6}deg`);
  };
  const reset = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ transform: "perspective(800px) rotateX(var(--rx)) rotateY(var(--ry))" }}
      className="glass rounded-xl p-6 h-full flex flex-col justify-between border border-primary/20"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div>
        <div className="flex items-baseline justify-between gap-3 mb-2">
          <h3 className="text-xl font-semibold">{p.title}</h3>
          {p.year && <span className="text-xs text-muted-foreground shrink-0">{p.year}</span>}
        </div>
        <p className="text-muted-foreground mb-4">{p.problem}</p>
        <div className="flex flex-wrap gap-2">
          {p.stack.map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded-full bg-secondary/60 border border-border">{t}</span>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="hero">View More</Button>
          </DialogTrigger>
          <DialogContent className="glass">
            <DialogHeader>
              <DialogTitle>{p.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-3 text-sm text-muted-foreground">
                <p><span className="text-foreground font-medium">Problem:</span> {p.problem}</p>
                <p><span className="text-foreground font-medium">Approach:</span> {p.approach}</p>
                <p><span className="text-foreground font-medium">Tools:</span> {p.stack.join(", ")}</p>
              </div>
              {((p.githubUrl && p.githubUrl.trim() !== "") || (p.linkedInUrl && p.linkedInUrl.trim() !== "") || (p.demoUrl && p.demoUrl.trim() !== "")) && (
                <div className="flex flex-wrap gap-3 pt-2">
                  {p.demoUrl && p.demoUrl.trim() !== "" && (
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => window.open(p.demoUrl, "_blank", "noopener,noreferrer")}
                    >
                      <Globe className="w-4 h-4" />
                      Live Demo
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  )}
                  {p.githubUrl && p.githubUrl.trim() !== "" && (
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => window.open(p.githubUrl, "_blank", "noopener,noreferrer")}
                    >
                      <Github className="w-4 h-4" />
                      View GitHub Repo
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  )}
                  {p.linkedInUrl && p.linkedInUrl.trim() !== "" && (
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => window.open(p.linkedInUrl, "_blank", "noopener,noreferrer")}
                    >
                      <Linkedin className="w-4 h-4" />
                      View LinkedIn Post
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={i} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
