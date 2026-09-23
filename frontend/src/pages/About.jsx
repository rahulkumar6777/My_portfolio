import { useState } from "react";
import { ArrowUpRight, Code2, Server, Workflow, MapPin } from "lucide-react";
import { portfolioData } from "../Data/PortfolioData";
const capabilities = [
  {
    icon: <Code2 size={26} strokeWidth={1.5} />,
    number: "01",
    title: "Full stack development",
    text: "From the first interaction to the last API call. Experiences that feel right and work even better.",
    skills: ["React", "JavaScript", "Node.js", "Express"],
  },
  {
    icon: <Server size={26} strokeWidth={1.5} />,
    number: "02",
    title: "Backend & architecture",
    text: "The thoughtful work behind the scenes. Secure APIs, efficient data, and systems built for growth.",
    skills: ["REST APIs", "MongoDB", "Redis", "Authentication"],
  },
  {
    icon: <Workflow size={26} strokeWidth={1.5} />,
    number: "03",
    title: "DevOps & cloud",
    text: "Closing the gap between building and shipping. Reliable infrastructure with automation at its core.",
    skills: ["Docker", "CI/CD", "Linux", "Nginx"],
  },
];
export function About() {
  const [photoFailed, setPhotoFailed] = useState(false);
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="section-wrap">
        <div className="about-grid">
          <div className="about-visual">
            <div className="portrait-frame">
              {photoFailed ? (
                <div className="portrait-fallback">
                  rk<span>.</span>
                </div>
              ) : (
                <img
                  src="/images/portrait.jpg"
                  alt="Rahul Kumar"
                  loading="lazy"
                  width="650"
                  height="800"
                  onError={() => setPhotoFailed(true)}
                />
              )}
              <div className="portrait-tag">
                <span className="status-dot" /> THE HUMAN BEHIND THE CODE
              </div>
            </div>
            <div className="portrait-note">
              Always curious.
              <br />
              <span>Always building.</span>
              <svg viewBox="0 0 90 60" aria-hidden="true">
                <path d="M4 7C64-10 84 18 61 38C47 49 45 17 65 22C79 25 78 38 83 50M73 44L84 52L89 40" />
              </svg>
            </div>
          </div>
          <div className="about-content">
            <p className="eyebrow">
              <span>02 /</span> A LITTLE ABOUT ME
            </p>
            <h2 id="about-title">
              An engineer’s mind.
              <br />
              <span className="serif-text">A builder’s heart.</span>
            </h2>
            <p className="about-lead">
              I’m Rahul, a developer who loves connecting the dots between a
              good idea and a great product.
            </p>
            <p>
              I work across the stack, with a special interest in what happens
              behind the scenes: scalable backends, well-designed APIs, and the
              infrastructure that brings it all together.
            </p>
            <p>
              My approach is simple: stay curious, understand the problem, and
              build something that makes a difference. Every project is a chance
              to do it a little better.
            </p>
            <div className="about-location">
              <MapPin size={16} />
              <span>Bihar, India</span>
              <span className="location-line" />
              <span>OPEN TO COLLABORATION</span>
            </div>
            <a
              className="text-link"
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              More about my journey <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
        <div className="capabilities-heading">
          <p className="eyebrow">
            <span>03 /</span> WHAT I BRING TO THE TABLE
          </p>
          <span>A connected toolkit. An end-to-end perspective.</span>
        </div>
        <div className="capabilities-grid">
          {capabilities.map(({ icon, number, title, text, skills }) => (
            <article className="capability" key={title}>
              <div className="capability-top">
                {icon}
                <span>/{number}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <div className="capability-skills">
                {skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
