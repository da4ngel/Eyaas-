import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    year: "2025",
    title: "Agentic AI",
    subtitle: "Current Focus",
    details: "DeepSeek, OpenAI, Anthropic, Gemini, Claude, Qwen, Llama, etc.",
    status: [
      { label: "In Progress", tone: "primary" },
      { label: "~35%", tone: "primary" },
    ],
  },
  {
    year: "2025",
    title: "Advanced Deep Learning",
    subtitle: "Current Focus",
    details: "Transformers, CS231n, optimization & scaling laws",
    status: [
      { label: "In Progress", tone: "primary" },
      { label: "~25%", tone: "primary" },
    ],
  },
  {
    year: "2024",
    title: "Machine Learning Fundamentals",
    subtitle: "Foundation Year",
    details: "Andrew Ng, Python for Data Science, end‑to‑end ML",
    status: [
      { label: "Completed", tone: "success" },
      { label: "Certified", tone: "primary" },
    ],
  },
  {
    year: "2023",
    title: "Data Science Bootcamp",
    subtitle: "Data Science Start",
    details: "Statistics, Pandas, NumPy, visualization & EDA",
    status: [{ label: "Completed", tone: "success" }],
  },
];

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
        <header className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Learning Curve</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            A continuous evolution through ML/AI—from foundations to advanced research and deployment.
          </p>
        </header>

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
                      <article className="inline-block rounded-xl border bg-card/60 backdrop-blur-sm text-card-foreground px-5 py-4 shadow-sm">
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
                      </article>
                    )}
                  </div>

                  {/* Middle dot */}
                  <div className="md:col-span-2 order-1 md:order-2 flex md:block justify-center">
                    <div className="relative">
                      <span className="block h-3 w-3 rounded-full bg-white ring-4 ring-background" />
                    </div>
                  </div>

                  {/* Right column (content on right for odd rows) */}
                  <div className={`md:col-span-5 ${isLeft ? "order-3" : "order-3 md:order-3"}`}>
                    {!isLeft && (
                      <article className="inline-block rounded-xl border bg-card/60 backdrop-blur-sm text-card-foreground px-5 py-4 shadow-sm">
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
                      </article>
                    )}
                  </div>

                  {/* Year labels under on small screens */}
                  <div className="md:hidden col-span-full text-center">
                    <div className="text-sm font-medium text-white">{s.year}</div>
                    <div className="text-xs text-muted-foreground">{s.subtitle}</div>
                  </div>

                  {/* Year labels on sides for md+ */}
                  <div className={`hidden md:block absolute ${
                    isLeft ? "-translate-x-[calc(50%+1rem)] left-1/2" : "translate-x-[calc(50%+1rem)] left-1/2"
                  } text-white text-sm font-semibold mt-[-6px]`}>
                    {s.year}
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
