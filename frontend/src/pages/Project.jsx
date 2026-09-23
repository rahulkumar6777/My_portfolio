import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Github,
  Layers3,
  Cloud,
  ExternalLink,
} from "lucide-react";
import { portfolioData } from "../Data/PortfolioData";
const projectDetails = {
  1: {
    name: "DomainDrop",
    category: "FULL STACK · CLOUD STORAGE",
    summary: "A home for every byte.",
    description:
      "Developer-first object storage. From automatic bucket provisioning to isolated project spaces, a simpler way to store, organize, and deliver files.",
    image: "/images/domaindrop.png",
    tone: "blue",
    type: "Storage platform",
  },
  2: {
    name: "DeployHub",
    category: "DEVOPS · DEVELOPER TOOLS",
    summary: "From git push to live.",
    description:
      "A self-hosted deployment platform with automated Docker builds, live logs, custom domains, and SSL. Your infrastructure, on your terms.",
    image: "/images/deployhub.png",
    tone: "cyan",
    type: "Deployment platform",
  },
};
function ProjectPreview({ project, details }) {
  const [failed, setFailed] = useState(false);
  return (
    <a
      className={`project-preview preview-${details.tone}`}
      href={project.live}
      target="_blank"
      rel="noreferrer"
      aria-label={`Visit ${details.name} live website`}
    >
      <span className="preview-type">
        {project.id === 1 ? <Layers3 size={15} /> : <Cloud size={17} />}
        {details.type}
      </span>
      <span className="preview-open">
        <ArrowUpRight size={20} />
      </span>
      <div className="browser-mockup">
        <div className="mockup-toolbar">
          <span />
          <span />
          <span />
          <div>{new URL(project.live).hostname}</div>
          <ExternalLink size={10} />
        </div>
        {failed ? (
          <div className="project-fallback">
            <span>
              {project.id === 1 ? <Layers3 size={38} /> : <Cloud size={42} />}
            </span>
            <strong>
              {details.name}
              <i>.</i>
            </strong>
            <p>{details.summary}</p>
            <div className="fallback-lines">
              <span />
              <span />
              <span />
            </div>
          </div>
        ) : (
          <img
            src={details.image}
            alt={`${details.name} application dashboard`}
            onError={() => setFailed(true)}
            loading="lazy"
            width="1000"
            height="650"
          />
        )}
      </div>
      <span className="preview-caption">
        INDEPENDENTLY DESIGNED & ENGINEERED <ArrowUpRight size={12} />
      </span>
    </a>
  );
}
export function Project() {
  const [filter, setFilter] = useState("all");
  const projects = portfolioData.projects.filter(
    (project) => filter === "all" || project.type === filter,
  );
  return (
    <section
      className="work-section section-wrap"
      id="projects"
      aria-labelledby="work-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            <span>01 /</span> SELECTED WORK
          </p>
          <h2 id="work-title">
            Less talk. <span className="serif-text">More shipped.</span>
          </h2>
        </div>
        <p>
          A few things I’ve built.
          <br />
          Real problems. Considered solutions.
        </p>
      </div>
      <div className="work-toolbar">
        <div
          className="project-filters"
          role="group"
          aria-label="Filter projects"
        >
          {[
            ["all", "All work", "02"],
            ["fullstack", "Full stack"],
            ["devops", "DevOps"],
          ].map(([id, label, count]) => (
            <button
              key={id}
              type="button"
              aria-pressed={filter === id}
              className={filter === id ? "selected" : ""}
              onClick={() => setFilter(id)}
            >
              {label}
              {count && <span>{count}</span>}
            </button>
          ))}
        </div>
        <span className="work-note">IDEA → BUILD → DEPLOY</span>
      </div>
      <div className="project-grid" aria-live="polite" aria-atomic="true">
        {projects.map((project) => {
          const details = projectDetails[project.id];
          return (
            <article className="project-card" key={project.id}>
              <ProjectPreview project={project} details={details} />
              <div className="project-info">
                <div className="project-category">
                  <span>{details.category}</span>
                  <span>0{project.id}</span>
                </div>
                <div className="project-title-row">
                  <h3>
                    <a href={project.live} target="_blank" rel="noreferrer">
                      {details.name} <ArrowUpRight size={24} />
                    </a>
                  </h3>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="source-link"
                    aria-label={`View ${details.name} source code`}
                  >
                    <Github size={18} />
                  </a>
                </div>
                <p>{details.description}</p>
                <div className="tech-tags">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span key={tech}>
                      {tech === "express" ? "Express" : tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="more-work">
        <span>There’s always something in the works.</span>
        <a
          href={portfolioData.personal.github}
          target="_blank"
          rel="noreferrer"
        >
          Follow the commits <ArrowRight size={17} />
        </a>
      </div>
    </section>
  );
}
