import { useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sections } from "@/content/site";

/**
 * Plain anchor navigation. Every section carries a real `id`, so the links
 * themselves need no JavaScript — the browser handles the jump, and the focus
 * ring in index.css works out of the box for keyboard users.
 *
 * Below `sm` the inline row does not fit, so it moves into a drawer. It used to
 * simply be `hidden sm:flex`, which left phones with no way to reach any
 * section but the one at the top of the page.
 */
const Header = () => {
  const [open, setOpen] = useState(false);
  const links = sections.slice(1);

  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4 sm:grid sm:grid-cols-3">
        <a
          href="#hero"
          className="font-semibold story-link sm:justify-self-start text-green-400 hover:text-green-300 transition-colors duration-300 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]"
        >
          Eyaas
        </a>

        <nav
          aria-label="Primary"
          className="hidden sm:flex items-center gap-6 text-sm justify-self-center"
        >
          {links.map((section) => (
            <a key={section.id} className="story-link" href={`#${section.id}`}>
              {section.label}
            </a>
          ))}
        </nav>

        <div className="sm:justify-self-end">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="sm:hidden grid h-10 w-10 place-items-center rounded-md border border-border/60 text-foreground"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" aria-hidden />
            </SheetTrigger>
            {/* A nav drawer needs no description; the explicit undefined stops
                Radix warning about a missing aria-describedby. */}
            <SheetContent side="right" className="w-[min(18rem,80vw)]" aria-describedby={undefined}>
              <SheetTitle className="text-base font-semibold text-green-400">
                Navigate
              </SheetTitle>
              {/* Closing on click matters here: these are same-page anchors, so
                  without it the drawer stays open over the section it just
                  scrolled to. */}
              <nav aria-label="Primary" className="mt-6 flex flex-col">
                {links.map((section) => (
                  <SheetClose asChild key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="py-3 text-base border-b border-border/40 last:border-b-0"
                    >
                      {section.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
