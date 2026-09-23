export const portfolioData = {
  personal: {
    name: "Rahul Kumar",
    tagline: "Full Stack Developer & DevOps Engineer",
    email: "rahul@cloudcoderhub.in",
    phone: "+91 9006308804",
    location: "Katauli, Bihar, India",
    github: "https://github.com/Rahulkumar6777",
    linkedin: "https://www.linkedin.com/in/rahul-kumar-003aa2316/",
    twitter: "",
    "picture": "https://cdn.domaindrop.cloud/dd-6a862db78bc59f70fd83615e/spaces/6ab3fbbd5baff8e78c0f275d/rahul.jpeg"
  },

  about: {
    title: "About Me",
    description:
      "I'm a passionate Backend Developer with strong expertise in building scalable, secure and high-performance server-side applications. I love designing efficient APIs, managing databases, and implementing authentication, authorization, background jobs, and cloud deployments. Along with backend, I also work on DevOps to automate workflows and ensure smooth deployments.",

    skills: [
      // Backend Core
      { name: "Node.js", level: 92 },
      { name: "Express.js", level: 90 },
      { name: "REST APIs & Microservices", level: 88 },

      // Security & Auth
      { name: "JWT / Authentication", level: 85 },

      // Database
      { name: "MongoDB", level: 88 },

      // DevOps
      { name: "Docker", level: 85 },
      { name: "CI/CD (GitHub Actions)", level: 82 },
      { name: "Linux", level: 80 },
      { name: "Nginx", level: 78 },

      // Tools
      { name: "Git & GitHub", level: 90 },
    ],
  },

  projects: [
    {
      id: 1,
      title: "DomainDrop - Developer File Hosting & Storage Platform",
      description:
        "DomainDrop is a developer-focused object storage platform built with Node.js, Express, MongoDB, Redis, MinIO AIStor, and a React dashboard. It provides per-user object storage with automatic bucket provisioning, logical Spaces for project isolation, nested object paths, and storage, object-count, and file-size quotas.",
      tech: [
        "Node.js",
        "express",
        "Minio",
        "Redis",
        "socket.io",
        "Docker",
        "React"
      ],
      type: "fullstack",
      image: "https://cdn.domaindrop.cloud/dd-6a862db78bc59f70fd83615e/spaces/6ab401c55baff8e78c0f2761/DomainDrop.png",
      github: "https://github.com/rahulkumar6777/DomainDrop",
      live: 'https://domaindrop.cloud'
    },
    {
      id: 2,
      title: "DeployHub - Self-Hosted Cloud Deployment Platform",
      description:
        "A self-hosted Heroku/Vercel alternative built from scratch. Supports Node.js & static site deployments via automated Docker build/push pipeline, custom subdomain routing with a custom reverse proxy, real-time build log streaming using Redis Pub/Sub and Socket.IO, automated SSL certificate provisioning for custom domains via Let's Encrypt and Docker SDK, dynamic Nginx config generation, scalable request tracking with BullMQ and MongoDB, and MinIO-based build log storage.",
      tech: [
        "Node.js",
        "Docker",
        "Redis",
        "BullMQ",
        "Socket.IO",
        "MongoDB",
        "Nginx",
        "MinIO",
        "Let's Encrypt",
        "CI/CD"
      ],
      type: "devops",
      image: "https://cdn.domaindrop.cloud/dd-6a862db78bc59f70fd83615e/spaces/6ab401c55baff8e78c0f2761/deployhub.png",
      github: "https://github.com/Rahulkumar6777/deployhub",
      live: "https://deployhub.cloud"
    },
  ]
};
