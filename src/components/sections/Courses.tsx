import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Item {
  title: string;
  issuer: string;
  year: string;
  type: "Course" | "Certification";
  link?: string;
}

const items: Item[] = [
  {
    title: "Machine learning with Python",
    issuer: "Simplilearn",
    year: "2025",
    type: "Course",
  },
  {
    title: "Machine Learning Specialization",
    issuer: "DeepLearning.AI & Stanford Online (Coursera)",
    year: "2024",
    type: "Certification",
    // No link: the previous URL pointed at the Coursera sales page for the
    // course, not a credential. Under a "Certification" badge that reads as
    // proof of completion when it proves nothing. Replace with the real
    // credential URL (coursera.org/account/accomplishments/...).
  },
  {
    title: "Data Science Bootcamp",
    issuer: "FreeCodeCamp",
    year: "2023",
    type: "Course",
  },
  {
    title: "Python for Data Analysis",
    issuer: "FreeCodeCamp",
    year: "2023",
    type: "Course",
  },
];

const Courses = () => {
  return (
    <section id="courses" className="py-16 sm:py-24 animate-fade-in">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Courses & Certifications</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Courses and credentials behind the machine learning work above.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="hover-scale"
            >
              <Card className="transition-shadow hover:shadow-[var(--shadow-glow)]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{it.type}</Badge>
                    <span className="text-xs text-muted-foreground">{it.year}</span>
                  </div>
                  <CardTitle className="text-lg leading-snug">{it.title}</CardTitle>
                  <CardDescription>{it.issuer}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  {it.link ? (
                    <Button asChild variant="outline" size="sm">
                      <a href={it.link} target="_blank" rel="noreferrer noopener" aria-label={`View credential: ${it.title}`}>
                        View details
                      </a>
                    </Button>
                  ) : (
                    <div className="text-xs text-muted-foreground">No public credential link</div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
