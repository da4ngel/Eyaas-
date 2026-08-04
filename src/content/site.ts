import { Atom, BarChart3, Bot, Brain, Database, FileCode, Table2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Single source of truth for every piece of copy on the site.
 *
 * The DOM sections in src/components/sections/* all read from here. A second,
 * hand-written copy lives in the static #root block in index.html for crawlers
 * and no-JS clients — that one cannot import from this module, so it still has
 * to be updated by hand when copy here changes.
 */

export const hero = {
  name: "Eyaas Ajmal",
  tagline: "Turning messy, real-world data into decisions",
  intro:
    "Final-year Data Science undergraduate at SLIIT. I build forecasting models on real environmental data — and the dashboards that make them usable. Looking for a data science / machine learning internship.",
};

// Data science first, then engineering. The section should read as a data
// scientist who can ship, not a web developer who dabbles in ML.
export const skills = [
  "Python",
  "pandas",
  "NumPy",
  "scikit-learn",
  "SQL",
  "R",
  "TensorFlow",
  "Power BI",
  "PostgreSQL",
  "Supabase",
  "MongoDB",
  "JavaScript/TypeScript",
  "React",
  "Node.js",
  "Java",
  "Git",
];

/** Every skill is paired with the work that demonstrates it. A claim without
 *  evidence is worth less than no claim at all. */
export type SkillItem = { name: string; evidence: string; Icon: LucideIcon };

export const detailedSkills: SkillItem[] = [
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

export const stats = [
  { value: "3.56", label: "CGPA — BSc (Hons) Data Science, SLIIT" },
  { value: "2027", label: "Expected graduation" },
  { value: "2+", label: "Years building data-driven systems" },
];

export const about = {
  paragraphs: [
    "I'm in my final year of a BSc (Hons) in Information Technology at SLIIT, specialising in Data Science, with a CGPA of 3.56. My coursework runs through machine learning, data mining, big data analytics, database systems and cloud-driven solutions.",
    "My undergraduate research is on satellite-based flood risk assessment for Sri Lanka. I own the predictive risk modelling and the decision dashboard: the model forecasts flood events ahead of time from environmental data, validated against recorded historical floods, and the dashboard turns those forecasts into something a responder can act on.",
    "Alongside the degree I work as Purchasing Manager at Sillara Agri Tech, where I replaced a manual, multi-step daily procurement pricing process with an automated pipeline and built the margin logic across fresh produce and packaged goods. Most of my day-to-day data work — cleaning, validation, consolidating sources, EDA — comes from there. I'm looking for a data science or machine learning internship.",
  ],
  portrait: {
    src: "/lovable-uploads/80607c52-3ca7-47d9-bf90-c7ccf791a76e.png",
    alt: "Eyaas Ajmal, Data Science undergraduate at SLIIT",
  },
  // A PDF with a real text layer, not the old JPG scan — an applicant tracking
  // system reading an image gets nothing. Source of truth is scripts/cv/cv.html;
  // regenerate with `npm run build:cv` after editing it.
  resume: {
    href: "/Eyaas-Ajmal-CV.pdf",
    downloadAs: "Eyaas-Ajmal-CV.pdf",
  },
};

// Ordered by relevance to data science: research first, then ML/AI work,
// then full-stack. Every entry states the problem it solves and the approach
// taken, not just the stack.
export type Project = {
  title: string;
  year: string;
  problem: string;
  approach: string;
  stack: string[];
  githubUrl: string;
  linkedInUrl: string;
  demoUrl?: string;
};

export const projects: Project[] = [
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
    linkedInUrl:
      "https://www.linkedin.com/posts/eyaasajmal_ai-agenticai-automation-activity-7399622920106332160-VWfj?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEIKCqoBFFLCLy__iBN0AHNFDrJYuEN2WAo",
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

// Ascending, one entry per year from the start of the degree through to
// expected graduation. Nothing here is projected except the 2027 entry, which
// is labelled as expected.
export type JourneyStep = {
  year: string;
  title: string;
  subtitle: string;
  details: string;
  status: { label: string; tone: string }[];
};

export const journey: JourneyStep[] = [
  {
    year: "2023",
    title: "Started BSc (Hons) IT — Data Science, SLIIT",
    subtitle: "Degree begins",
    details:
      "Began the degree at the Sri Lanka Institute of Information Technology. Coursework in machine learning, data mining, big data analytics, database systems and cloud-driven solutions.",
    status: [{ label: "Year 1", tone: "primary" }],
  },
  {
    year: "2024",
    title: "Purchasing Manager — Sillara Agri Tech",
    subtitle: "Present",
    details:
      "Automated the daily procurement pricing workflow, replacing a manual multi-step process. Built the margin logic across fresh produce and packaged goods, and took on the EDA, cleaning and consolidation behind it.",
    status: [{ label: "Current role", tone: "success" }],
  },
  {
    year: "2025",
    title: "Machine learning & AI projects",
    subtitle: "Applied work",
    details:
      "Asteroid Orbit Viewer — scikit-learn models predicting Earth-impact risk from orbital data. AI Code Reviewer. PodBang, an agentic podcast automation platform.",
    status: [{ label: "Shipped", tone: "success" }],
  },
  {
    year: "2026",
    title: "Undergraduate research — flood risk",
    subtitle: "Current",
    details:
      "Satellite-based flood risk assessment for Sri Lanka. I own the predictive risk model and the decision dashboard built over it. Also built WashCO, a multi-vendor booking platform.",
    status: [{ label: "In Progress", tone: "primary" }],
  },
  {
    year: "2027",
    title: "Graduation",
    subtitle: "Expected",
    details: "BSc (Hons) in Information Technology, Data Science specialisation. CGPA 3.56 to date.",
    status: [{ label: "Expected", tone: "primary" }],
  },
];

export type CourseItem = {
  title: string;
  issuer: string;
  year: string;
  type: "Course" | "Certification";
  link?: string;
};

export const courses: CourseItem[] = [
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

export const contact = {
  heading: "Contact Me",
  blurb: "Have a project in mind or want to collaborate? Drop a message.",
  email: "eyaasofficial@gmail.com",
  github: "https://github.com/Eyaas-Ajmal",
  linkedin: "https://www.linkedin.com/in/eyaas-ajmal-da-4ngel/",
};

/**
 * Section order and identity. The DOM fallback uses `id` for anchor links; the
 * 3D build uses the array index as the ScrollControls page to scroll to, so
 * the two navigations stay in sync from one definition.
 */
export const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "ml", label: "Experience" },
  { id: "courses", label: "Certifications" },
  { id: "contact", label: "Contact" },
] as const;
