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
    "picture": "https://api-devload.cloudcoderhub.in/public/695f91881242b7ee566ffeea/176787154576659db7e7e05eb043d7fee2d91.jpeg"
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
      title: "DevLoad - Developer File Hosting & Storage Platform",
      description:
        "A self-hosted alternative to S3 providing secure project-wise storage using MinIO. Supports file uploads, signed URLs, bucket isolation per project, email alerts, Redis-based job queueing, Dockerised workers, CI/CD automation, domain integration, and production-grade infrastructure. Built to offer affordable file hosting with 5 projects, 5GB storage, and 100GB bandwidth.",
      tech: [
        "Node.js",
        "MinIO",
        "Redis",
        "socket.io",
        "Docker",
        "Nginx",
        "Ubuntu",
        "CI/CD",
        "Cloudflare"
      ],
      type: "fullstack",
      image: "https://api-devload.cloudcoderhub.in/public/695f91881242b7ee566ffeea/176797767201909a04ed66600d34765d77694.png",
      github: "https://github.com/Rahulkumar6777/DevLoad",
      live: 'https://devload.cloudcoderhub.in'
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
      image: "https://api-devload.cloudcoderhub.in/public/69a26bb5e558f1024337ce27/17731698223745db8fc0e24b05c155e3a935d.png",
      github: "https://github.com/Rahulkumar6777/deployhub",
      live: "https://deployhub.cloud"
    },
  ]
};