import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
const links = [
  ["home", "Home"],
  ["projects", "Work"],
  ["about", "About"],
  ["contact", "Contact"],
];
export function Navbar({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);
  useEffect(() => {
    const dismiss = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    if (menuOpen) window.addEventListener("keydown", dismiss);
    return () => window.removeEventListener("keydown", dismiss);
  }, [menuOpen]);
  return (
    <header className="site-header">
      <div className="header-inner section-wrap">
        <a
          className="brand"
          href="#home"
          aria-label="Rahul Kumar home"
          onClick={() => setMenuOpen(false)}
        >
          r<span>k</span>
          <i>.</i>
        </a>
        <nav
          className={`nav-links ${menuOpen ? "is-open" : ""}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeSection === id ? "active" : ""}
              aria-current={activeSection === id ? "location" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="#contact">
          Let’s talk <ArrowUpRight size={16} />
        </a>
        <button
          ref={menuButton}
          className="menu-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
