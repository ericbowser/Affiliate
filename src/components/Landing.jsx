import React, { useEffect, useState } from 'react';
import { FaUser, FaCode, FaFolderOpen, FaEnvelope, FaArrowRight, FaGithub, FaLinkedin } from 'react-icons/fa';
import head2 from '../assets/eb_1.jpg';

const STATS = [
  { value: '10+', label: 'Years Experience', color: '#00d4ff' },
  { value: '40%', label: 'API Perf Gain', color: '#a855f7' },
  { value: '3', label: 'Apps Built (2024)', color: '#22c55e' },
  { value: '50+', label: 'React Components', color: '#f59e0b' },
];

const sections = [
  {
    id: 'about',
    title: 'About Me',
    description: 'Background, experience & passion for development',
    icon: <FaUser />,
    color: '#00d4ff',
    delay: 0
  },
  {
    id: 'skills',
    title: 'Technical Skills',
    description: 'Full-stack expertise across modern tech stacks',
    icon: <FaCode />,
    color: '#a855f7',
    delay: 80
  },
  {
    id: 'projects',
    title: 'Projects',
    description: 'Production apps built with real-world architecture',
    icon: <FaFolderOpen />,
    color: '#22c55e',
    delay: 160
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'Open to new opportunities — let\'s connect',
    icon: <FaEnvelope />,
    color: '#f59e0b',
    delay: 240
  }
];

const TypewriterText = ({ text, delay = 0 }) => {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span>
      {displayed}
      <span style={{
        display: 'inline-block', width: '3px', height: '1em',
        background: '#00d4ff', marginLeft: '2px', verticalAlign: 'text-bottom',
        animation: displayed.length < text.length ? 'none' : 'erb-blink 1s step-end infinite'
      }} />
    </span>
  );
};

const Landing = ({ onNavigate, darkMode }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: darkMode ? '#080c14' : '#f0f4f8',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 24px 40px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes erb-blink { 50% { opacity: 0; } }
        @keyframes erb-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes erb-grid { 0% { background-position: 0 0; } 100% { background-position: 60px 60px; } }
        @keyframes erb-fadein { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .erb-card:hover { transform: translateY(-6px) !important; }
        .erb-stat:hover { transform: translateY(-4px); }
      `}</style>

      {/* Animated grid bg */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(${darkMode ? 'rgba(0,212,255,0.04)' : 'rgba(0,150,200,0.06)'} 1px, transparent 1px), linear-gradient(90deg, ${darkMode ? 'rgba(0,212,255,0.04)' : 'rgba(0,150,200,0.06)'} 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        animation: 'erb-grid 10s linear infinite',
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: darkMode
          ? 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(0,212,255,0.07) 0%, transparent 70%)'
          : 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(0,180,220,0.08) 0%, transparent 70%)',
      }} />

      <div style={{ position: 'relative', width: '100%', maxWidth: '900px', textAlign: 'center' }}>

        {/* Status badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: darkMode ? 'rgba(0,212,255,0.08)' : 'rgba(0,180,220,0.1)',
          border: '1px solid rgba(0,212,255,0.25)',
          padding: '6px 18px', borderRadius: '20px', marginBottom: '28px',
          color: '#00d4ff', fontSize: '0.78rem', fontFamily: 'monospace', letterSpacing: '0.05em',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00d4ff', animation: 'erb-float 2s ease-in-out infinite' }} />
          Open to new opportunities
        </div>

        {/* Avatar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div style={{
            position: 'relative',
            animation: visible ? 'erb-fadein 0.7s ease forwards' : 'none',
            opacity: visible ? 1 : 0,
          }}>
            <div style={{
              width: 96, height: 96, borderRadius: '50%', overflow: 'hidden',
              border: '3px solid #00d4ff',
              boxShadow: '0 0 24px rgba(0,212,255,0.3)',
            }}>
              <img src={head2} alt="Eric Ryan Bowser" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{
              position: 'absolute', inset: -6, borderRadius: '50%',
              border: '1px solid rgba(0,212,255,0.2)',
              animation: 'erb-float 3s ease-in-out infinite',
              pointerEvents: 'none',
            }} />
          </div>
        </div>

        {/* Name */}
        <h1 style={{
          fontSize: 'clamp(2.2rem, 6vw, 4rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          color: darkMode ? '#f1f5f9' : '#0f172a',
          marginBottom: '10px',
          letterSpacing: '-0.02em',
          fontFamily: 'system-ui, sans-serif',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease 0.2s',
        }}>
          <TypewriterText text="Eric Ryan Bowser" delay={400} />
        </h1>

        <p style={{
          fontSize: '1.1rem', fontWeight: 500,
          color: '#00d4ff', marginBottom: '6px', fontFamily: 'monospace',
          opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 0.4s',
        }}>
          Full-Stack Engineer · Cloud Architect in Training · AI Integrations
        </p>

        <p style={{
          color: darkMode ? '#94a3b8' : '#475569',
          fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto 32px',
          lineHeight: 1.7,
          opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 0.5s',
        }}>
          10+ years building mission-critical systems with C#/.NET, React, Azure & Docker.
          Currently shipping production apps under{' '}
          <span style={{ color: '#a855f7', fontWeight: 600 }}>Execute &amp; Engrave LLC</span>.
        </p>

        {/* CTA links */}
        <div style={{
          display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48,
          opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 0.6s',
        }}>
          <a href="https://github.com/ericbowser" target="_blank" rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
              border: `1px solid ${darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`,
              color: darkMode ? '#f1f5f9' : '#0f172a',
              padding: '10px 22px', borderRadius: 8, fontSize: '0.9rem', fontWeight: 600,
              textDecoration: 'none', transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}
          >
            <FaGithub /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/erbowser/" target="_blank" rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)',
              color: '#a855f7', padding: '10px 22px', borderRadius: 8,
              fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <FaLinkedin /> LinkedIn
          </a>
        </div>

        {/* Nav cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 16, marginBottom: 48,
        }}>
          {sections.map((section, i) => (
            <div
              key={section.id}
              className="erb-card"
              onClick={() => onNavigate(section.id)}
              style={{
                background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.7)',
                border: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                borderRadius: 14, padding: '22px 16px',
                cursor: 'pointer', transition: 'all 0.25s ease',
                textAlign: 'center',
                boxShadow: darkMode ? 'none' : '0 2px 12px rgba(0,0,0,0.06)',
                opacity: visible ? 1 : 0,
                animation: visible ? `erb-fadein 0.5s ease ${section.delay + 700}ms forwards` : 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = section.color;
                e.currentTarget.style.boxShadow = `0 8px 24px ${section.color}22`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
                e.currentTarget.style.boxShadow = darkMode ? 'none' : '0 2px 12px rgba(0,0,0,0.06)';
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 10, margin: '0 auto 12px',
                background: `${section.color}18`, color: section.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem',
              }}>
                {section.icon}
              </div>
              <h2 style={{
                fontWeight: 700, fontSize: '1rem', marginBottom: 6,
                color: darkMode ? '#f1f5f9' : '#0f172a',
              }}>
                {section.title}
              </h2>
              <p style={{
                fontSize: '0.78rem', color: darkMode ? '#64748b' : '#64748b',
                lineHeight: 1.5, marginBottom: 12,
              }}>
                {section.description}
              </p>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                color: section.color, fontSize: '0.8rem', fontWeight: 600,
              }}>
                Explore <FaArrowRight style={{ fontSize: '0.65rem' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12,
          opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 1.2s',
        }}>
          {STATS.map((stat) => (
            <div key={stat.label} className="erb-stat" style={{
              textAlign: 'center', padding: '16px 8px',
              background: darkMode ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.6)',
              border: `1px solid ${stat.color}25`,
              borderRadius: 10, transition: 'transform 0.2s',
            }}>
              <div style={{
                fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800,
                color: stat.color, fontFamily: 'monospace', lineHeight: 1,
              }}>
                {stat.value}
              </div>
              <div style={{
                color: darkMode ? '#64748b' : '#94a3b8',
                fontSize: '0.72rem', marginTop: 6, letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
