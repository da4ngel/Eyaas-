import { sections } from "@/content/site";

/**
 * Plain anchor navigation. Every section carries a real `id`, so these need no
 * JavaScript — the browser handles the jump, and the focus ring in index.css
 * works out of the box for keyboard users.
 */
const Header = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 h-14 grid grid-cols-3 items-center">
        <a
          href="#hero"
          className="font-semibold story-link justify-self-start text-green-400 hover:text-green-300 transition-colors duration-300 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]"
        >
          Eyaas
        </a>
        <nav aria-label="Primary" className="hidden sm:flex items-center gap-6 text-sm justify-self-center">
          {sections.slice(1).map((section) => (
            <a key={section.id} className="story-link" href={`#${section.id}`}>
              {section.label}
            </a>
          ))}
        </nav>
        <div className="justify-self-end" aria-hidden="true" />
      </div>
    </header>
  );
};

export default Header;
