import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import { EMAIL_PUBLIC_KEY, EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID } from "@/config/email";

/**
 * The contact form, shared by the DOM build and the WebGL build.
 *
 * In the 3D scene this is mounted inside drei's <Html transform>, which puts
 * real DOM on a CSS3D matrix matched to an object in the scene — so it tilts
 * and moves with the camera while remaining a typeable, validatable form.
 * There is no sane way to render a working text input as geometry, and this is
 * the one place the WebGL build has to hand back to the DOM.
 */
export const ContactForm = ({ className }: { className?: string }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const from_name = String(data.get("name") || "");
    const reply_to = String(data.get("email") || "");
    const message = String(data.get("message") || "");

    if (!from_name || !reply_to || !message) {
      toast({ title: "Missing fields", description: "Please fill in all fields." });
      return;
    }

    if (!EMAIL_PUBLIC_KEY || !EMAIL_SERVICE_ID || !EMAIL_TEMPLATE_ID || EMAIL_PUBLIC_KEY.includes("YOUR_")) {
      toast({ title: "Email not configured", description: "Set your EmailJS keys in src/config/email.ts" });
      return;
    }

    try {
      setLoading(true);
      await emailjs.send(
        EMAIL_SERVICE_ID,
        EMAIL_TEMPLATE_ID,
        { from_name, reply_to, message },
        { publicKey: EMAIL_PUBLIC_KEY }
      );
      toast({ title: "Message sent!", description: "Thanks for reaching out. I'll get back to you soon." });
      form.reset();
    } catch (e) {
      console.error(e);
      toast({ title: "Failed to send", description: "Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className={className ?? "space-y-4 glass rounded-xl p-6"}>
      <Input name="name" placeholder="Your name" aria-label="Name" />
      <Input type="email" name="email" placeholder="Your email" aria-label="Email" />
      <Textarea name="message" placeholder="Your message" aria-label="Message" rows={5} />
      <Button type="submit" variant="glow" className="w-full" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
};

export default ContactForm;
