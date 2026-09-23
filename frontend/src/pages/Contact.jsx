import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Linkedin,
  LoaderCircle,
} from "lucide-react";
import { portfolioData } from "../Data/PortfolioData";

const emptyForm = { name: "", email: "", message: "" };

export const Contact = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const requestRef = useRef(null);
  const timeoutRef = useRef(null);
  const mountedRef = useRef(true);
  const { personal } = portfolioData;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      requestRef.current?.abort();
      window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (status.message) setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (requestRef.current) return;

    const payload = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value.trim()]),
    );

    if (Object.values(payload).some((value) => !value)) {
      setStatus({
        type: "error",
        message: "Please add your name, email, and a message.",
      });
      return;
    }

    const controller = new AbortController();
    let timedOut = false;
    requestRef.current = controller;
    setIsLoading(true);
    setStatus({ type: "", message: "" });
    timeoutRef.current = window.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 20000);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const data = await response.json().catch(() => null);

      if (!response.ok || data?.success !== true) {
        const message =
          typeof data?.msg === "string"
            ? data.msg
            : response.status === 429
              ? "Too many messages right now. Please try again later or email me directly."
              : "Your message could not be sent. Please try again or email me directly.";
        throw new Error(message);
      }

      if (mountedRef.current) {
        setFormData(emptyForm);
        setStatus({
          type: "success",
          message: "Message sent. Thanks for reaching out — I’ll be in touch!",
        });
      }
    } catch (error) {
      if (mountedRef.current) {
        setStatus({
          type: "error",
          message: timedOut
            ? "Sending took too long. Delivery could not be confirmed. You can email me directly."
            : error instanceof TypeError
              ? "Unable to connect. Please check your connection or email me directly."
              : error.message ||
                "Your message could not be sent. Please email me directly.",
        });
      }
    } finally {
      window.clearTimeout(timeoutRef.current);
      requestRef.current = null;
      if (mountedRef.current) setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="contact-section section-wrap"
      aria-labelledby="contact-title"
    >
      <div className="contact-heading">
        <p className="section-eyebrow">04 / LET’S TALK</p>
        <h2 id="contact-title">
          Good things start
          <br />
          with a conversation<span>.</span>
        </h2>
      </div>

      <div className="contact-layout">
        <div className="contact-info">
          <p className="contact-intro">
            Have an idea, a challenging project, or a role in mind? I’d love to
            hear what you’re building.
          </p>
          <a className="contact-email" href={`mailto:${personal.email}`}>
            {personal.email}
            <ArrowUpRight size={22} aria-hidden="true" />
          </a>
          <p className="contact-detail">Based in {personal.location}</p>
          <div className="contact-socials" aria-label="Find me online">
            {personal.github && (
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={17} aria-hidden="true" /> GitHub{" "}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
            {personal.linkedin && (
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={17} aria-hidden="true" /> LinkedIn{" "}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
          aria-busy={isLoading}
        >
          <div className="contact-form-row">
            <div className="contact-field">
              <label htmlFor="contact-name">Your name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Alex Taylor"
                required
                maxLength={120}
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-email">Email address</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="alex@company.com"
                required
                maxLength={254}
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="contact-field">
            <label htmlFor="contact-message">What do you have in mind?</label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="A little about your project, idea, or opportunity…"
              required
              maxLength={5000}
              rows={4}
              value={formData.message}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          <button className="contact-submit" type="submit" disabled={isLoading}>
            {isLoading ? "Sending message…" : "Send a message"}
            {isLoading ? (
              <LoaderCircle
                className="contact-spinner"
                size={19}
                aria-hidden="true"
              />
            ) : (
              <ArrowRight size={19} aria-hidden="true" />
            )}
          </button>
          <p
            id="contact-status"
            className={`contact-status${status.type ? ` is-${status.type}` : ""}`}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {status.message}
          </p>
        </form>
      </div>
    </section>
  );
};
