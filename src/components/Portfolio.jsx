import { useState, useEffect, useRef, useCallback } from "react";

// ─── FLAT PALETTE — zero gradients, hard edges ──────────
// Ink:      #0A0A0A  (near-black)
// Paper:    #F7F5F0  (warm cream)
// Slate:    #1E1E1E  (dark sections)
// Accent 1: #D64933  (burnt vermillion)
// Accent 2: #1B6B93  (deep teal)
// Accent 3: #2D8653  (forest)
// Accent 4: #C4841D  (amber)
// Muted:    #8A8A8A  (mid gray)
// Rule:     #D4D0C8  (warm rule)

const C = {
  ink: "#0A0A0A",
  paper: "#F7F5F0",
  slate: "#1E1E1E",
  vermillion: "#D64933",
  teal: "#1B6B93",
  forest: "#2D8653",
  amber: "#C4841D",
  muted: "#8A8A8A",
  rule: "#D4D0C8",
  white: "#FFFFFF",
};

const ACCENT_CYCLE = [C.vermillion, C.teal, C.forest, C.amber];

// ─── DATA ───────────────────────────────────────────────

const EXPERIENCE = [
  {
    company: "Visible Supply Chain (Maersk)",
    role: "Supply Chain / Integrations Specialist",
    period: "Feb 2023 — Dec 2023",
    accent: C.teal,
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
    accent: C.forest,
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
    accent: C.vermillion,
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
    accent: C.vermillion,
    description:
      "Full-stack study platform for CompTIA Cloud+ and AWS certifications. Implements spaced repetition algorithms, practice exams, and real-time progress analytics.",
    links: {
      frontend: "https://github.com/ericbowser/CloudPrepper",
      backend: "https://github.com/ericbowser/cloud_prepper_api",
    },
  },
  {
    title: "Boxes.js",
    subtitle: "Parametric Box Generator for Laser Cutting",
    stack: ["React 19", "Vite 7", "Tailwind CSS 4", "SVG", "Geometry Engine"],
    accent: C.teal,
    description:
      "Browser-based parametric finger-joint box generator. Pure geometry engine with live SVG preview, kerf compensation, and laser-ready export — validated with physical test cuts on acrylic.",
    links: {
      github: "https://github.com/ericbowser/Boxes.js",
    },
  },
  {
    title: "AI Assistant Suite",
    subtitle: "Multi-Provider AI Toolkit",
    stack: ["React", "TypeScript", "Node.js", "Express", "API Integration"],
    accent: C.amber,
    description:
      "Unified AI toolkit integrating OpenAI, Google Gemini, and Anthropic Claude. Features real-time streaming, prompt engineering patterns, and secure API key management.",
    links: {
      github: "https://github.com/ericbowser/Assist",
    },
  },
  {
    title: "Pet ID Tags",
    subtitle: "Full-Stack QR Application",
    stack: ["React", "Node.js", "PostgreSQL", "Docker", "JWT"],
    accent: C.forest,
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
    accent: C.amber,
    description:
      "Production-grade portfolio with containerized email backend. Demonstrates microservices architecture, NGINX reverse proxy, and SSL/TLS via Cloudflare.",
    links: {
      live: "https://erb-think.com",
      github: "https://github.com/ericbowser/my-portfolio",
    },
  },
];

const SKILLS = {
  "Languages & Frameworks": {
    accent: C.vermillion,
    items: [
      "C# / .NET Core 8", "ASP.NET Core Web API", "React.js", "TypeScript",
      "Node.js / Express", "WPF / MVVM", "HTML5 / CSS3", "Tailwind CSS",
    ],
  },
  "Cloud & DevOps": {
    accent: C.teal,
    items: [
      "Azure App Service", "Azure Functions", "Cosmos DB", "Docker",
      "GitHub Actions", "Azure DevOps", "TeamCity", "NGINX",
    ],
  },
  "Data & Security": {
    accent: C.forest,
    items: [
      "SQL Server / T-SQL", "PostgreSQL", "Entity Framework Core", "Dapper",
      "JWT / Auth0", "OAuth2 / OIDC", "Key Vault", "SSL / TLS",
    ],
  },
  Practices: {
    accent: C.amber,
    items: [
      "REST / OpenAPI", "Microservices", "SOLID Principles", "TDD / xUnit / Jest",
      "Agile / Scrum", "CI/CD Pipelines", "Design Patterns", "Performance Tuning",
    ],
  },
};

const KEY_METRICS = [
  { value: "10+", label: "Years Exp", accent: C.vermillion },
  { value: "40%", label: "API Perf Gain", accent: C.teal },
  { value: "50+", label: "Components Built", accent: C.forest },
  { value: "3", label: "Apps Shipped (2024)", accent: C.amber },
];

// ─── REVEAL HOOK ────────────────────────────────────────

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── NAV ────────────────────────────────────────────────

function Nav({ active, onNav }) {
  const items = ["About", "Experience", "Projects", "Skills", "Contact"];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: C.paper,
      borderBottom: `1px solid ${C.rule}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 clamp(20px, 4vw, 60px)", height: 52,
      transition: "box-shadow 0.3s",
      boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.06)" : "none",
    }}>
      <span style={{
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
        color: C.ink,
      }}>
        Eric Bowser
      </span>
      <div style={{ display: "flex", gap: 32 }}>
        {items.map((it, i) => {
          const isActive = active === it.toLowerCase();
          return (
            <button key={it} onClick={() => onNav(it.toLowerCase())} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontSize: 11, fontWeight: isActive ? 600 : 400,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: isActive ? C.ink : C.muted,
              padding: "4px 0",
              borderBottom: isActive ? `2px solid ${ACCENT_CYCLE[i % 4]}` : "2px solid transparent",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = C.ink; }}
            onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = C.muted; }}
            >
              {it}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ─── SECTION DIVIDER ────────────────────────────────────

function SectionTag({ number, label, dark = false }) {
  const accent = ACCENT_CYCLE[(parseInt(number) - 1) % 4];
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 16, marginBottom: 56,
    }}>
      <span style={{
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize: 12, fontWeight: 700, color: accent, letterSpacing: "0.1em",
      }}>
        {number}
      </span>
      <div style={{ width: 48, height: 1, background: dark ? "#444" : C.rule }} />
      <span style={{
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
        color: dark ? C.paper : C.ink,
      }}>
        {label}
      </span>
    </div>
  );
}

// ─── HERO ───────────────────────────────────────────────

function HeroSection() {
  return (
    <section id="about" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "120px clamp(24px, 6vw, 120px) 80px",
      background: C.slate, position: "relative",
    }}>
      {/* Decorative corner marks */}
      <div style={{ position: "absolute", top: 80, right: "clamp(24px, 6vw, 120px)", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
        <div style={{ width: 32, height: 1, background: C.vermillion }} />
        <div style={{ width: 20, height: 1, background: C.vermillion, opacity: 0.5 }} />
      </div>

      <Reveal>
        <p style={{
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
          color: C.vermillion, marginBottom: 32,
        }}>
          Full Stack Software Engineer
        </p>
      </Reveal>

      <Reveal delay={80}>
        <h1 style={{
          fontFamily: "'Instrument Serif', 'Playfair Display', Georgia, serif",
          fontSize: "clamp(52px, 9vw, 108px)",
          fontWeight: 400, lineHeight: 0.95, color: C.paper,
          margin: 0, letterSpacing: "-0.03em",
        }}>
          Eric<br />Bowser
        </h1>
      </Reveal>

      <Reveal delay={160}>
        <div style={{ maxWidth: 500, marginTop: 44 }}>
          <p style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 16, lineHeight: 1.85, color: C.muted, margin: 0, fontWeight: 300,
          }}>
            10+ years building mission-critical applications in C#/.NET, React,
            and Node.js. Specializing in performance optimization, cloud
            architecture, and full-stack modernization. Currently pursuing AWS
            and CompTIA Cloud+ certifications.
          </p>
        </div>
      </Reveal>

      <Reveal delay={240}>
        <div style={{ display: "flex", gap: 24, marginTop: 44, flexWrap: "wrap" }}>
          {[
            { label: "GitHub", href: "https://github.com/ericbowser", accent: C.vermillion },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/erbowser/", accent: C.teal },
            { label: "Portfolio", href: "https://erb-think.com", accent: C.forest },
          ].map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
              color: C.paper, textDecoration: "none",
              padding: "10px 0", borderBottom: `2px solid ${l.accent}`,
              transition: "color 0.25s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = l.accent; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = C.paper; }}
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      </Reveal>

      {/* Tech strip */}
      <Reveal delay={320}>
        <div style={{
          display: "flex", gap: 0, marginTop: 64, flexWrap: "wrap",
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: 11, letterSpacing: "0.06em",
        }}>
          {["C# / .NET", "React", "TypeScript", "Azure", "Docker", "Node.js"].map((t, i) => (
            <span key={t} style={{ color: ACCENT_CYCLE[i % 4], display: "inline-flex", alignItems: "center" }}>
              {i > 0 && <span style={{ color: "#333", margin: "0 14px" }}>—</span>}
              {t}
            </span>
          ))}
        </div>
      </Reveal>

      {/* Metrics strip at bottom of hero */}
      <Reveal delay={400}>
        <div style={{
          display: "flex", gap: 0, marginTop: 64,
          borderTop: `1px solid #333`,
        }}>
          {KEY_METRICS.map((m, i) => (
            <div key={m.label} style={{
              flex: 1, padding: "24px 0",
              borderRight: i < KEY_METRICS.length - 1 ? "1px solid #333" : "none",
              paddingRight: i < KEY_METRICS.length - 1 ? 24 : 0,
              paddingLeft: i > 0 ? 24 : 0,
            }}>
              <div style={{
                fontFamily: "'Instrument Serif', 'Playfair Display', Georgia, serif",
                fontSize: 32, fontWeight: 400, color: m.accent, lineHeight: 1,
              }}>
                {m.value}
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                color: "#555", marginTop: 10,
              }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

// ─── EXPERIENCE ─────────────────────────────────────────

function ExperienceSection() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="experience" style={{
      padding: "120px clamp(24px, 6vw, 120px)",
      background: C.paper, color: C.ink,
    }}>
      <Reveal><SectionTag number="01" label="Experience" /></Reveal>
      <div>
        {EXPERIENCE.map((exp, i) => (
          <Reveal key={i} delay={i * 80}>
            <div
              style={{
                borderTop: `1px solid ${expanded === i ? exp.accent : C.rule}`,
                padding: "40px 0", cursor: "pointer",
                transition: "border-color 0.3s",
              }}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "flex-start", flexWrap: "wrap", gap: 12,
              }}>
                <div>
                  <h3 style={{
                    fontFamily: "'Instrument Serif', 'Playfair Display', Georgia, serif",
                    fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 400,
                    margin: 0, color: expanded === i ? exp.accent : C.ink,
                    transition: "color 0.3s",
                  }}>
                    {exp.company}
                  </h3>
                  <p style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 14, color: C.muted, margin: "8px 0 0 0",
                  }}>
                    {exp.role}
                  </p>
                </div>
                <span style={{
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  fontSize: 12, color: C.muted, letterSpacing: "0.04em", whiteSpace: "nowrap",
                }}>
                  {exp.period}
                </span>
              </div>

              <div style={{
                maxHeight: expanded === i ? 400 : 0, overflow: "hidden",
                transition: "max-height 0.4s ease",
              }}>
                <ul style={{
                  marginTop: 28, paddingLeft: 0, listStyle: "none",
                  display: "flex", flexDirection: "column", gap: 16,
                }}>
                  {exp.bullets.map((b, j) => (
                    <li key={j} style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: 14, lineHeight: 1.75, color: "#555",
                      paddingLeft: 16, borderLeft: `2px solid ${exp.accent}`,
                    }}>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <span style={{
                display: "inline-block",
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                fontSize: 11, fontWeight: 700,
                color: expanded === i ? exp.accent : C.muted,
                marginTop: 20, letterSpacing: "0.1em", textTransform: "uppercase",
                transition: "color 0.3s",
              }}>
                {expanded === i ? "— Collapse" : "+ Details"}
              </span>
            </div>
          </Reveal>
        ))}
        <div style={{ borderTop: `1px solid ${C.rule}` }} />
      </div>
    </section>
  );
}

// ─── PROJECTS ───────────────────────────────────────────

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal delay={index * 60}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          border: `1px solid ${hovered ? project.accent : C.rule}`,
          padding: 32, cursor: "default", position: "relative",
          transition: "border-color 0.3s",
          height: "100%", boxSizing: "border-box",
          background: C.white,
        }}
      >
        {/* Accent bar top */}
        <div style={{
          position: "absolute", top: 0, left: 0,
          width: hovered ? "100%" : 0, height: 2,
          background: project.accent,
          transition: "width 0.4s ease",
        }} />

        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        }}>
          <span style={{
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: 11, fontWeight: 700,
            color: hovered ? project.accent : C.muted,
            letterSpacing: "0.1em", transition: "color 0.3s",
          }}>
            0{index + 1}
          </span>
          <div style={{ display: "flex", gap: 16 }}>
            {Object.entries(project.links).map(([key, url]) => (
              <a key={key} href={url} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                color: C.muted, textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = project.accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = C.muted; }}
              >
                {key} ↗
              </a>
            ))}
          </div>
        </div>

        <h3 style={{
          fontFamily: "'Instrument Serif', 'Playfair Display', Georgia, serif",
          fontSize: 26, fontWeight: 400, margin: "24px 0 4px", color: C.ink,
        }}>
          {project.title}
        </h3>
        <p style={{
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: 11, fontWeight: 500, color: C.muted,
          letterSpacing: "0.05em", margin: "0 0 20px",
        }}>
          {project.subtitle}
        </p>
        <p style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: 14, lineHeight: 1.8, color: "#555", margin: "0 0 24px",
        }}>
          {project.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {project.stack.map((t) => (
            <span key={t} style={{
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "6px 14px",
              border: `1px solid ${hovered ? project.accent : C.rule}`,
              color: hovered ? project.accent : "#666",
              transition: "color 0.3s, border-color 0.3s",
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" style={{
      padding: "120px clamp(24px, 6vw, 120px)",
      background: C.paper,
    }}>
      <Reveal><SectionTag number="02" label="Projects" /></Reveal>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 0,
      }}>
        {PROJECTS.map((p, i) => (
          <div key={i}><ProjectCard project={p} index={i} /></div>
        ))}
      </div>
    </section>
  );
}

// ─── SKILLS ─────────────────────────────────────────────

function SkillItem({ item, accent }) {
  const [hovered, setHovered] = useState(false);
  return (
    <li
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: 14, color: hovered ? accent : "#444",
        paddingLeft: 14,
        borderLeft: hovered ? `2px solid ${accent}` : `1px solid ${C.rule}`,
        transition: "color 0.2s, border-left 0.2s, padding-left 0.2s",
        paddingTop: 4, paddingBottom: 4, cursor: "default",
      }}
    >
      {item}
    </li>
  );
}

function SkillsSection() {
  return (
    <section id="skills" style={{
      padding: "120px clamp(24px, 6vw, 120px)",
      background: C.white,
      borderTop: `1px solid ${C.rule}`,
      borderBottom: `1px solid ${C.rule}`,
    }}>
      <Reveal><SectionTag number="03" label="Skills" /></Reveal>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 56,
      }}>
        {Object.entries(SKILLS).map(([category, { accent, items }], ci) => (
          <Reveal key={category} delay={ci * 60}>
            <div>
              <h4 style={{
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                fontSize: 11, fontWeight: 700,
                letterSpacing: "0.16em", textTransform: "uppercase",
                color: C.ink, margin: "0 0 24px", paddingBottom: 16,
                borderBottom: `2px solid ${accent}`,
              }}>
                {category}
              </h4>
              <ul style={{
                listStyle: "none", padding: 0, margin: 0,
                display: "flex", flexDirection: "column", gap: 12,
              }}>
                {items.map((item) => (
                  <SkillItem key={item} item={item} accent={accent} />
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── CONTACT ────────────────────────────────────────────

function ContactSection() {
  return (
    <section id="contact" style={{
      padding: "120px clamp(24px, 6vw, 120px)",
      background: C.slate, color: C.paper, position: "relative",
    }}>
      <Reveal><SectionTag number="04" label="Contact" dark /></Reveal>

      <Reveal delay={80}>
        <h2 style={{
          fontFamily: "'Instrument Serif', 'Playfair Display', Georgia, serif",
          fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 400,
          lineHeight: 1.05, margin: "0 0 32px", maxWidth: 560,
        }}>
          Let's build<br />something together.
        </h2>
      </Reveal>

      <Reveal delay={160}>
        <p style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: 15, lineHeight: 1.85, color: C.muted, fontWeight: 300,
          maxWidth: 460, margin: "0 0 48px",
        }}>
          Open to senior full-stack, cloud engineering, and .NET modernization
          roles. Available for contract work through Execute & Engrave LLC.
        </p>
      </Reveal>

      <Reveal delay={240}>
        <div style={{ display: "flex", gap: 0, flexWrap: "wrap" }}>
          {[
            { label: "GitHub", href: "https://github.com/ericbowser", accent: C.vermillion },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/erbowser/", accent: C.teal },
            { label: "Email", href: "mailto:ericbowser@gmail.com", accent: C.forest },
          ].map((l, i) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
              color: C.paper, textDecoration: "none",
              padding: "14px 32px",
              border: `1px solid #444`,
              borderRight: i < 2 ? "none" : `1px solid #444`,
              transition: "background 0.25s, color 0.25s, border-color 0.25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = l.accent;
              e.currentTarget.style.borderColor = l.accent;
              e.currentTarget.style.color = C.white;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "#444";
              e.currentTarget.style.color = C.paper;
            }}>
              {l.label} ↗
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

// ─── FOOTER ─────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{
      padding: "20px clamp(24px, 6vw, 120px)",
      background: C.slate, borderTop: "1px solid #333",
      display: "flex", justifyContent: "space-between",
      alignItems: "center", flexWrap: "wrap", gap: 12,
    }}>
      <span style={{
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize: 10, color: "#555", letterSpacing: "0.06em",
      }}>
        © 2025 Eric Bowser — Execute & Engrave LLC
      </span>
      <span style={{
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize: 10, color: "#555", letterSpacing: "0.06em",
      }}>
        Salt Lake City, UT
      </span>
    </footer>
  );
}

// ─── MAIN EXPORT ────────────────────────────────────────

export default function Portfolio() {
  const [active, setActive] = useState("about");

  const scrollTo = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const ids = ["about", "experience", "projects", "skills", "contact"];
    const onScroll = () => {
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 120) { setActive(ids[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: C.paper, color: C.ink, margin: 0, padding: 0, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;700&family=Inter:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
        ::selection { background: ${C.vermillion}; color: ${C.white}; }
        @media (max-width: 640px) {
          nav { padding: 0 16px !important; }
          nav > div:last-child { gap: 14px !important; }
          nav > div:last-child button { font-size: 9px !important; letter-spacing: 0.04em !important; }
        }
      `}</style>
      <Nav active={active} onNav={scrollTo} />
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
