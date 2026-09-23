import { lazy, Suspense, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
  Pause,
  Play,
  Database,
  Workflow,
  Server,
} from "lucide-react";
import { portfolioData } from "../Data/PortfolioData";
const HeroScene = lazy(() => import("../components/HeroScene"));
export function Home() {
  const [paused, setPaused] = useState(false);
  return (
    <section
      className="hero section-wrap"
      id="home"
      aria-labelledby="hero-title"
    >
      <div className="hero-content">
        <div className="availability">
          <span className="status-dot" /> OPEN TO OPPORTUNITIES
        </div>
        <p className="hero-intro">
          Hey, I’m Rahul <span aria-hidden="true">↗</span>
        </p>
        <h1 id="hero-title">
          Ideas to code.
          <br />
          Code to{" "}
          <span className="accent-word">
            impact<span className="title-period">.</span>
          </span>
        </h1>
        <p className="hero-description">
          Full Stack Developer & DevOps Engineer.
          <br />I build scalable APIs, cloud platforms, and the
          <br className="desktop-break" /> infrastructure that brings ideas to
          life.
        </p>
        <div className="hero-actions">
          <a className="button button-dark" href="#projects">
            Explore my work <ArrowUpRight size={19} />
          </a>
          <a className="text-link" href="#contact">
            Let’s build something <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="hero-socials">
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Rahul’s GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Rahul’s LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <span className="social-divider" />
          <span>
            BASED IN INDIA <span className="tiny-globe">◎</span> BUILDING FOR
            EVERYWHERE
          </span>
        </div>
      </div>
      <div className="hero-art">
        <div className="art-corner art-corner-tl" />
        <div className="art-corner art-corner-br" />
        <span className="art-coordinate">SYSTEM 01 — CLOUD ARCHITECTURE</span>
        <div className="art-grid" aria-hidden="true" />
        <div className="art-orbit" aria-hidden="true" />
        <div className="hero-scene">
          <Suspense
            fallback={
              <div
                className="scene-loading"
                aria-label="Loading interactive cloud infrastructure"
              >
                <Server size={72} strokeWidth={1} />
              </div>
            }
          >
            <HeroScene paused={paused} />
          </Suspense>
        </div>
        <div className="floating-label label-code">
          <span className="label-symbol">
            <Database size={20} />
          </span>
          <div>
            <strong>DomainDrop</strong>
            <span>Objects. Storage. Delivery.</span>
          </div>
        </div>
        <div className="floating-label label-scale">
          <span className="label-symbol">
            <Workflow size={21} />
          </span>
          <div>
            <strong>DeployHub</strong>
            <span>Push. Build. Deploy.</span>
          </div>
          <span className="label-dot" />
        </div>
        <div className="art-bottom">
          <span>
            <span className="small-cross">+</span> DRAG TO EXPLORE THE STACK
          </span>
          <button
            className="scene-toggle"
            type="button"
            aria-label={paused ? "Play 3D animation" : "Pause 3D animation"}
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
          >
            {paused ? <Play size={13} /> : <Pause size={13} />}
          </button>
        </div>
      </div>
      <div className="hero-bottom">
        <a href="#projects">
          <ArrowDown size={14} /> SCROLL TO EXPLORE
        </a>
        <span>A LITTLE CREATIVITY. A LOT OF ENGINEERING.</span>
        <span className="edition">PORTFOLIO — {new Date().getFullYear()}</span>
      </div>
    </section>
  );
}
