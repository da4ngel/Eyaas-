import { Github, Linkedin, Mail } from "lucide-react";
import ContactForm from "./ContactForm";
import { contact } from "@/content/site";
import TiltCard from "@/components/atoms/TiltCard";

const Contact = () => {
  return (
    <section id="contact" className="py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">{contact.heading}</h2>
            <p className="text-muted-foreground mb-6">{contact.blurb}</p>
            <ContactForm />
          </div>
          <div className="relative">
            <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(600px 300px at 20% 0%, hsl(var(--accent)/0.15), transparent)" }} />
            <TiltCard glare className="glass rounded-xl p-6">
              <h3 className="text-lg font-medium mb-3">Connect</h3>
              <div className="flex items-center gap-4">
                <a href={`mailto:${contact.email}`} aria-label="Email" className="story-link"><Mail /></a>
                <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="story-link"><Github /></a>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="story-link"><Linkedin /></a>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
