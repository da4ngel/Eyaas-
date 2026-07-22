import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Github, Linkedin, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "PodBang – Agentic AI Podcast Automation Platform",
    stack: ["LLMs", "API" , "N8N", "Prompt Engineering", "React", "node"],
    description: "PodBang is an Agentic AI-powered platform that automates the end-to-end podcast creation workflow. It intelligently plans, generates, refines, and publishes podcast content with minimal human intervention by using autonomous AI agents.",
    githubUrl: "https://github.com/Eyaas-Ajmal/pod-AI",
    linkedInUrl: "https://www.linkedin.com/posts/eyaasajmal_ai-agenticai-automation-activity-7399622920106332160-VWfj?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEIKCqoBFFLCLy__iBN0AHNFDrJYuEN2WAo",
  },
  {
    title: "Pet Universe",
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Redux", "JWT", "Stripe","GIT"],
    description: "A full‑stack social and marketplace platform for pet lovers.",
    githubUrl: "",
    linkedInUrl: "",
  },
  {
    title: "Smart Ticket Support System",
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Redux", "JWT", "Stripe", "Python", "Flask", "MySQL"],
    description: "A smart ticket support system for managing customer queries and support tickets.",
    githubUrl: "",
    linkedInUrl: "",
  },
  {
    title: "Library Management System",
    stack: ["PHP", "HTML", "CSS", "JavaScript","GIT"],
    description: "A complete library system with cataloging, lending, and admin dashboards.",
    githubUrl: "",
    linkedInUrl: "",
  },
  {
    title: "Computer Inventory Management",
    stack: ["Java", "MySQL", "JDBC", "Tomcat","GIT"],
    description: "Track hardware assets, lifecycle, and utilization with reports.",
    githubUrl: "",
    linkedInUrl: "",
  },
  {
    title: "My Portfolio Website",
    stack: ["React", "Tailwind CSS", "Vite", "TypeScript", "Shadcn UI", "Framer Motion", "Vercel", "GSAP","GIT"],
    description: "My Portfolio Website, your viewing it currently",
    githubUrl: "",
    linkedInUrl: "",
  }
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
        <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
        <p className="text-muted-foreground mb-4">{p.description}</p>
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
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>{p.description}</p>
                <p><span className="text-foreground">Tech:</span> {p.stack.join(", ")}</p>
              </div>
              {((p.githubUrl && p.githubUrl.trim() !== "") || (p.linkedInUrl && p.linkedInUrl.trim() !== "")) && (
                <div className="flex flex-wrap gap-3 pt-2">
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
