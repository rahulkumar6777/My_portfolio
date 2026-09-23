import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowUp, Github, Linkedin } from "lucide-react";
import { portfolioData } from "./src/Data/PortfolioData";
import { Navbar } from "./src/pages/Navbar";
import { Home } from "./src/pages/Home";
import { Project } from "./src/pages/Project";
import { About } from "./src/pages/About";
import { Contact } from "./src/pages/Contact";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar activeSection={activeSection} />
      <main id="main">
        <Home />
        <div className="expertise-strip" aria-label="Specialties">
          <div className="section-wrap expertise-strip-inner">
            <span>
              THOUGHTFULLY BUILT. <strong>FROM FRONT TO BACK.</strong>
            </span>
            <div>
              <span>FULL STACK</span>
              <span className="strip-star">✳</span>
              <span>BACKEND</span>
              <span className="strip-star">✳</span>
              <span>DEVOPS</span>
              <span className="strip-star">✳</span>
              <span>CLOUD</span>
            </div>
          </div>
        </div>
        <Project />
        <About />
        <Contact />
      </main>
      <footer className="footer section-wrap">
        <a
          className="brand footer-brand"
          href="#home"
          aria-label="Rahul Kumar home"
        >
          r<span>k</span>
          <i>.</i>
        </a>
        <p>
          © {new Date().getFullYear()} Rahul Kumar <span>·</span> Built with
          curiosity & a little caffeine.
        </p>
        <div className="footer-links">
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a href="#home" className="back-top" aria-label="Back to top">
            <ArrowUp size={18} />
          </a>
        </div>
      </footer>
      <a href="#contact" className="mobile-contact-link">
        Let’s talk <ArrowUpRight size={17} />
      </a>
    </>
  );
}
