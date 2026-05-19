import React, { useState } from 'react';
import { FiGithub, FiExternalLink, FiChevronRight } from 'react-icons/fi';

const projectsData = [
  {
    id: 'cloudprepper',
    title: 'CloudPrepper — Cloud Certification Study Platform',
    badge: 'Featured',
    badgeColor: '#00d4ff',
    description: 'Full-stack exam prep platform for the Cloud Technology Professional (v25.5) path — covering CompTIA Cloud+ (IT7011) and AWS Solutions Architect – Associate (IT7013). Built as a real SaaS product under Execute & Engrave LLC.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'JWT'],
    links: {
      frontend: 'https://github.com/ericbowser/CompTIAPrepper',
      backend: 'https://github.com/ericbowser/cloud_prepper_api',
    },
    details: 'CloudPrepper targets the IT-7000 Cloud Technology Professional certification path with scenario-based questions, comprehensive explanations, and a dual-track difficulty system based on Bloom\'s Taxonomy and experience level. The 410+ question bank covers CompTIA Cloud+ and AWS SA exam domains with original, copyright-safe content.',
    highlights: [
      'React/TypeScript frontend with multiple quiz modes (Practice, Exam Simulation)',
      'Node.js/Express API with JWT auth, admin panel, and question management',
      'PostgreSQL with JSONB for options/explanations, 410+ questions in bank',
      'Dual-track difficulty: cognitive levels (Bloom\'s Taxonomy) + skill levels',
      'Theme support: Classic, Pastel, Dark — full spaced repetition system',
      'Docker containerized, Cloudflare SSL, Raspberry Pi Ubuntu servers',
    ]
  },
  {
    id: 'boxes-js',
    title: 'Boxes.js — Parametric Box Generator',
    badge: 'Engineering',
    badgeColor: '#f59e0b',
    description: 'Browser-based parametric finger-joint box generator for laser cutting. Pure geometry engine with live SVG preview and laser-ready export — validated with physical test cuts on acrylic.',
    technologies: ['React 19', 'Vite 7', 'Tailwind CSS 4', 'SVG', 'Geometry Engine'],
    links: {
      github: 'https://github.com/ericbowser/Boxes.js',
    },
    details: 'A product of Execute & Engrave LLC. Designs finger-joint boxes with configurable dimensions, material thickness, kerf compensation, play tolerances, and four edge types (finger joints, finger holes, stackable, straight). The geometry engine is pure math with zero UI dependencies — all rendering is live SVG with interactive hover states and zoom.',
    highlights: [
      'Modular architecture: geometry engine fully decoupled from UI',
      'Four edge joint types: finger tabs, finger holes, stackable, straight',
      'Parametric controls: kerf, play, surrounding spaces, edge width',
      'Laser-ready SVG export with 0.1mm stroke precision',
      'Physically validated — test cuts on 3mm acrylic with CO2 laser',
      'Clean separation: geometry.js → edgeTypes.js → panelGenerator.js → boxGenerator.js',
    ]
  },
  {
    id: 'ai-assistant',
    title: 'AI Assistant Platform Suite',
    badge: 'Full-Stack',
    badgeColor: '#a855f7',
    description: 'Unified AI toolkit integrating OpenAI, Google Gemini, and Anthropic Claude with real-time streaming, secure API key management, and a clean React/TypeScript frontend.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'OpenAI', 'Gemini', 'Claude API'],
    links: {
      github: 'https://github.com/ericbowser/Assist',
    },
    details: 'A multi-model AI platform that abstracts provider differences behind a unified interface. Supports real-time streaming responses, conversation history management, and secure API credential handling — a practical demonstration of AI integration patterns.',
    highlights: [
      'Integrated OpenAI, Google Gemini, and Anthropic Claude APIs',
      'Real-time streaming responses with React state management',
      'Secure backend API gateway with credential management',
      'TypeScript throughout for type-safe frontend development',
      'Scalable Node.js/Express architecture with error handling',
    ]
  },
  {
    id: 'pet-id-tags',
    title: 'Pet ID Tags — Smart QR Platform',
    badge: 'Full-Stack',
    badgeColor: '#22c55e',
    description: 'End-to-end application for custom pet ID tags with QR code generation that links to owner contact profiles. JWT authentication, PostgreSQL persistence, and Docker deployment.',
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'JWT', 'QR Code'],
    links: {
      frontend: 'https://github.com/ericbowser/LaserTags',
      backend: 'https://github.com/ericbowser/backendlaser',
    },
    details: 'A product under Execute & Engrave LLC combining laser engraving with smart technology. Pet owners create profiles with contact info; the generated QR code links scanners directly to that profile — no app required.',
    highlights: [
      'QR code generation linked to live owner contact profiles',
      'JWT-based authentication and secure profile management',
      'PostgreSQL schema with optimized indexing for fast lookups',
      'Docker containers for consistent dev-to-production deployment',
      'RESTful API with Node.js/Express backend',
    ]
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    badge: 'Live',
    badgeColor: '#f59e0b',
    description: 'This portfolio — built with React, Vite, and Tailwind CSS. Dark mode, responsive design, animated hero, and a contact form backed by a containerized Node.js email service.',
    technologies: ['React', 'Tailwind CSS', 'Vite', 'Node.js', 'SendGrid', 'Docker', 'NGINX'],
    links: {
      github: 'https://github.com/ericbowser/my-portfolio',
      live: 'https://erb-think.com',
    },
    details: 'A production-grade portfolio demonstrating modern frontend practices: dark mode with localStorage persistence, smooth scroll navigation, animated components, and a microservices email backend using Google Auth + SendGrid — all containerized and served via NGINX with Cloudflare SSL.',
    highlights: [
      'Dark/light mode with system preference detection',
      'Animated landing with typewriter effect and stat counters',
      'Containerized email backend (Node.js + SendGrid + Google Auth)',
      'NGINX reverse proxy + Cloudflare SSL/TLS in production',
      'Vite bundling for fast builds and HMR in development',
    ]
  }
];

const ProjectCard = ({ project }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="p-6">
        {/* Badge + Tech tags */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span style={{
            background: `${project.badgeColor}20`,
            color: project.badgeColor,
            border: `1px solid ${project.badgeColor}40`,
            padding: '3px 10px', borderRadius: '20px',
            fontSize: '0.72rem', fontFamily: 'Space Mono, monospace', fontWeight: 700,
          }}>
            {project.badge}
          </span>
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="text-xs px-2 py-1 bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 rounded-full">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Links */}
        <div className="flex flex-wrap gap-4 mb-4">
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noreferrer"
              className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors">
              <FiGithub className="mr-1" /> Repository
            </a>
          )}
          {project.links.frontend && (
            <a href={project.links.frontend} target="_blank" rel="noreferrer"
              className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors">
              <FiGithub className="mr-1" /> Frontend
            </a>
          )}
          {project.links.backend && (
            <a href={project.links.backend} target="_blank" rel="noreferrer"
              className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors">
              <FiGithub className="mr-1" /> Backend
            </a>
          )}
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noreferrer"
              className="inline-flex items-center text-sm font-semibold text-teal-500 dark:text-teal-400 hover:text-teal-600 transition-colors">
              <FiExternalLink className="mr-1" /> Live Site
            </a>
          )}
        </div>

        {/* Toggle */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="inline-flex items-center text-sm font-semibold text-teal-500 dark:text-teal-400 hover:text-teal-600 transition-colors"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
          <FiChevronRight className={`ml-1 transform transition-transform ${showDetails ? 'rotate-90' : ''}`} />
        </button>

        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
              {project.details}
            </p>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">Key Highlights:</h4>
            <ul className="space-y-1">
              {project.highlights.map((h, i) => (
                <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                  <span style={{ color: project.badgeColor, marginTop: '2px', flexShrink: 0 }}>›</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#00d4ff', marginBottom: '10px' }}>
            // what I've built
          </p>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm leading-relaxed">
            Production applications built with modern full-stack architecture, cloud-native tooling,
            and real deployment infrastructure — not just demos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
