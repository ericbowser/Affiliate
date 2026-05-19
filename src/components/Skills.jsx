import React from 'react';
import { RiJavascriptLine } from "react-icons/ri";
import { FaReact, FaNodeJs, FaGithub, FaServer, FaMicrosoft } from "react-icons/fa";
import { SiPostgresql } from "react-icons/si";
import { PiFileSql, PiFileCssLight } from "react-icons/pi";
import { BsGearFill } from "react-icons/bs";

const EXPERIENCE = [
  {
    company: "Visible Supply Chain (Maersk)",
    role: "Supply Chain / Integrations Specialist",
    period: "Feb 2023 — Dec 2023",
    bullets: [
      "Migrated .NET Standard 4.61 hybrid app to .NET Core 7.0 for Azure deployment",
      "Reduced API response times by 40% through strategic caching and LINQ optimization",
      "Architected PostgreSQL → Azure Cosmos DB migration with zero downtime",
      "Built multithreaded carrier API integration system (USPS, FedEx) with retry logic",
    ],
  },
  {
    company: "Willis Towers Watson",
    role: "Full Stack Software Engineer",
    period: "2016 — Aug 2022",
    bullets: [
      "Led migration of legacy .NET applications to .NET Core, improving performance 30%",
      "Developed 50+ reusable React/TypeScript components for enterprise UI library",
      "Architected RESTful APIs with Auth0, JWT, and Microsoft Identity",
      "Established coding standards reducing frontend development time by 25%",
    ],
  },
  {
    company: "Independent Developer & Cloud Architect",
    role: "Execute & Engrave LLC",
    period: "Jan 2024 — Present",
    bullets: [
      "Built 3 production-ready full-stack applications during professional development period",
      "Pursuing CompTIA Cloud+ and AWS Solutions Architect certifications",
      "Architected multi-AI platform integrating OpenAI, Gemini, and Claude APIs",
      "Containerized all projects with Docker for consistent deployment pipelines",
    ],
  },
];

const PROJECTS = [
  {
    title: "CloudPrepper",
    subtitle: "Cloud Certification Study Platform",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
    description:
      "Full-stack study platform for CompTIA Cloud+ and AWS certifications. Implements spaced repetition algorithms, practice exams, and real-time progress analytics.",
    links: {
      frontend: "https://github.com/ericbowser/CloudPrepper",
      backend: "https://github.com/ericbowser/cloud_prepper_api",
    },
  },
  {
    title: "AI Assistant Suite",
    subtitle: "Multi-Provider AI Toolkit",
    stack: ["React", "TypeScript", "Node.js", "Express", "API Integration"],
    description:
      "Unified AI toolkit integrating OpenAI, Google Gemini, and Anthropic Claude. Features real-time streaming, prompt engineering patterns, and secure API key management.",
    links: {
      frontend: "https://github.com/ericbowser/AssistFront",
      backend: "https://github.com/ericbowser/Assist",
    },
  },
  {
    title: "Pet ID Tags",
    subtitle: "Full-Stack QR Application",
    stack: ["React", "Node.js", "PostgreSQL", "Docker", "JWT"],
    description:
      "End-to-end application for smart pet ID tags with QR code generation, JWT authentication, and containerized microservices deployment.",
    links: {
      frontend: "https://github.com/ericbowser/LaserTags",
      backend: "https://github.com/ericbowser/backendlaser",
    },
  },
  {
    title: "Portfolio & Email Service",
    subtitle: "Containerized Microservices",
    stack: ["React", "Tailwind CSS", "Docker", "SendGrid", "NGINX"],
    description:
      "Production-grade portfolio with containerized email backend. Demonstrates microservices architecture, NGINX reverse proxy, and SSL/TLS via Cloudflare.",
    links: {
      live: "https://erb-think.com",
      github: "https://github.com/ericbowser/my-portfolio",
    },
  },
];

const SKILLS = {
  "Languages & Frameworks": [
    "C# / .NET Core 8",
    "ASP.NET Core Web API",
    "React.js",
    "TypeScript",
    "Node.js / Express",
    "WPF / MVVM",
    "HTML5 / CSS3",
    "Tailwind CSS",
  ],
  "Cloud & DevOps": [
    "Azure App Service",
    "Azure Functions",
    "Cosmos DB",
    "Docker",
    "GitHub Actions",
    "Azure DevOps",
    "TeamCity",
    "NGINX",
  ],
  "Data & Security": [
    "SQL Server / T-SQL",
    "PostgreSQL",
    "Entity Framework Core",
    "Dapper",
    "JWT / Auth0",
    "OAuth2 / OIDC",
    "Key Vault",
    "SSL / TLS",
  ],
  Practices: [
    "REST / OpenAPI",
    "Microservices",
    "SOLID Principles",
    "TDD / xUnit / Jest",
    "Agile / Scrum",
    "CI/CD Pipelines",
    "Design Patterns",
    "Performance Tuning",
  ],
};

export default SKILLS;