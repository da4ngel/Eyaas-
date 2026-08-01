import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, ExternalLink, Globe } from "lucide-react";
import { projects } from "@/content/site";
import TiltCard from "@/components/atoms/TiltCard";
import Parallax from "@/components/atoms/Parallax";

const ProjectCard = ({ p }: { p: (typeof projects)[number] }) => {
  return (
    <TiltCard glare className="glass rounded-xl p-6 h-full flex flex-col justify-between border border-primary/20">
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
    </TiltCard>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <Parallax speed={-30} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Projects</h2>
        </Parallax>
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
