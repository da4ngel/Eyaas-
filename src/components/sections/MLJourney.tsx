import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journey as steps } from "@/content/site";
import TiltCard from "@/components/atoms/TiltCard";
import Parallax from "@/components/atoms/Parallax";

gsap.registerPlugin(ScrollTrigger);

const MLJourney = () => {
  useEffect(() => {
    // GSAP is not driven by CSS, so the global prefers-reduced-motion rule in
    // index.css cannot stop these scroll-triggered entrances. Skip them and
    // leave the steps in their final state.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".jl-step").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="ml" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <Parallax speed={-30} className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Education &amp; Experience</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Where I study, where I work, and what I&apos;m researching.
          </p>
        </Parallax>

        <div className="relative">
          {/* Center line for md+ */}
          <div aria-hidden className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border" />

          <ol className="space-y-10 sm:space-y-14">
            {steps.map((s, i) => {
              const isLeft = i % 2 === 0;
              return (
                <li key={s.year} className="jl-step grid md:grid-cols-12 gap-6 items-center">
                  {/* Left column (content on left for even rows) */}
                  <div className={`md:col-span-5 ${isLeft ? "order-2 md:order-1 text-right" : "order-2"}`}>
                    {isLeft && (
                      <TiltCard glare className="inline-block rounded-xl border bg-card/60 backdrop-blur-sm text-card-foreground px-5 py-4 shadow-sm">
                        <h3 className="text-lg font-semibold">{s.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{s.details}</p>
                        <div className="mt-3 flex flex-wrap gap-2 justify-end">
                          {s.status.map((b) => (
                            <span
                              key={b.label}
                              className={`px-2.5 py-1 rounded-full text-xs border ${
                                b.tone === "success"
                                  ? "bg-green-500/10 text-green-500 border-green-500/20"
                                  : b.tone === "primary"
                                  ? "bg-primary/10 text-primary border-primary/20"
                                  : "bg-accent/10 text-accent border-accent/20"
                              }`}
                            >
                              {b.label}
                            </span>
                          ))}
                        </div>
                      </TiltCard>
                    )}
                  </div>

                  {/* Middle marker: year, dot, subtitle. Kept in the centre grid
                      column so it lines up with the vertical rule at every
                      breakpoint. */}
                  <div className="md:col-span-2 order-1 md:order-2 flex flex-col items-center justify-center gap-2">
                    <div className="text-sm font-semibold text-white">{s.year}</div>
                    <span className="block h-3 w-3 rounded-full bg-white ring-4 ring-background" />
                    <div className="text-xs text-muted-foreground text-center">{s.subtitle}</div>
                  </div>

                  {/* Right column (content on right for odd rows) */}
                  <div className={`md:col-span-5 ${isLeft ? "order-3" : "order-3 md:order-3"}`}>
                    {!isLeft && (
                      <TiltCard glare className="inline-block rounded-xl border bg-card/60 backdrop-blur-sm text-card-foreground px-5 py-4 shadow-sm">
                        <h3 className="text-lg font-semibold">{s.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{s.details}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {s.status.map((b) => (
                            <span
                              key={b.label}
                              className={`px-2.5 py-1 rounded-full text-xs border ${
                                b.tone === "success"
                                  ? "bg-green-500/10 text-green-500 border-green-500/20"
                                  : b.tone === "primary"
                                  ? "bg-primary/10 text-primary border-primary/20"
                                  : "bg-accent/10 text-accent border-accent/20"
                              }`}
                            >
                              {b.label}
                            </span>
                          ))}
                        </div>
                      </TiltCard>
                    )}
                  </div>

                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default MLJourney;
