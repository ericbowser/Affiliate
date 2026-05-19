import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from 'react-icons/fa';

const About = ({ profileImage, darkMode, onNavigate }) => {
  const [imgHover, setImgHover] = useState(false);

  const highlights = [
    { label: '10+ Years', desc: 'Enterprise full-stack development', color: '#00d4ff' },
    { label: '40% Faster', desc: 'API performance gain at Maersk', color: '#a855f7' },
    { label: '3 Apps', desc: 'Production apps built in 2024', color: '#22c55e' },
    { label: 'Cloud+', desc: 'CompTIA & AWS certs in progress', color: '#f59e0b' },
  ];

  return (
    <section style={{
      padding: '100px 24px 80px',
      background: darkMode ? '#080c14' : '#f0f4f8',
      minHeight: '100vh',
    }}>
      <style>{`
        @keyframes erb-spin-ring { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <p style={{
            color: '#00d4ff', fontFamily: 'monospace', fontSize: '0.75rem',
            letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10,
          }}>
            // who I am
          </p>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800,
            color: darkMode ? '#f1f5f9' : '#0f172a', letterSpacing: '-0.02em',
          }}>
            About Me
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 48, alignItems: 'flex-start', justifyContent: 'center' }}>

          {/* Image side */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, flexShrink: 0 }}>
            <div
              style={{ position: 'relative', cursor: 'default' }}
              onMouseEnter={() => setImgHover(true)}
              onMouseLeave={() => setImgHover(false)}
            >
              {/* Spinning ring */}
              <div style={{
                position: 'absolute', inset: -8, borderRadius: '50%',
                border: '2px dashed rgba(0,212,255,0.3)',
                animation: 'erb-spin-ring 12s linear infinite',
                pointerEvents: 'none',
              }} />
              <div style={{
                width: 200, height: 200, borderRadius: '50%', overflow: 'hidden',
                border: `3px solid ${imgHover ? '#a855f7' : '#00d4ff'}`,
                boxShadow: `0 0 ${imgHover ? '32px' : '20px'} ${imgHover ? 'rgba(168,85,247,0.4)' : 'rgba(0,212,255,0.25)'}`,
                transition: 'all 0.3s ease',
              }}>
                <img src={profileImage} alt="Eric Ryan Bowser" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { icon: <FaGithub />, url: 'https://github.com/ericbowser', color: '#94a3b8', label: 'GitHub' },
                { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/erbowser/', color: '#0077b5', label: 'LinkedIn' },
              ].map(link => (
                <a key={link.label} href={link.url} target="_blank" rel="noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    color: darkMode ? '#94a3b8' : '#64748b', textDecoration: 'none',
                    fontSize: '0.88rem', padding: '8px 14px', borderRadius: 8,
                    background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = link.color; e.currentTarget.style.borderColor = link.color + '44'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = darkMode ? '#94a3b8' : '#64748b'; e.currentTarget.style.borderColor = darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'; }}
                >
                  {link.icon} {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Content side */}
          <div style={{ flex: '1 1 420px', maxWidth: 560 }}>
            <h3 style={{
              fontSize: '1.5rem', fontWeight: 700, marginBottom: 20,
              color: darkMode ? '#f1f5f9' : '#0f172a',
            }}>
              Hey, I'm Eric 👋
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
              {[
                "I'm a Full-Stack Software Engineer with 10+ years building mission-critical systems at companies like Maersk and Willis Towers Watson. I specialize in C#/.NET Core, React.js, and cloud architecture.",
                "Since January 2024, I've been operating independently under Execute & Engrave LLC — shipping three production applications: CloudPrepper (a cloud cert study platform), an AI Assistant Platform integrating OpenAI, Gemini, and Claude, and a Pet ID Tags system.",
                "I'm currently pursuing CompTIA Cloud+ and AWS Solutions Architect certifications, and actively seeking my next senior engineering role where I can bring deep enterprise experience together with modern cloud and AI skills.",
              ].map((text, i) => (
                <p key={i} style={{ color: darkMode ? '#94a3b8' : '#475569', lineHeight: 1.8, fontSize: '0.95rem' }}>
                  {text}
                </p>
              ))}
            </div>

            {/* Highlight grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
              {highlights.map(h => (
                <div key={h.label} style={{
                  padding: '14px 16px',
                  background: darkMode ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.7)',
                  border: `1px solid ${h.color}25`, borderRadius: 10,
                }}>
                  <div style={{ color: h.color, fontWeight: 800, fontSize: '1.1rem', fontFamily: 'monospace' }}>{h.label}</div>
                  <div style={{ color: darkMode ? '#64748b' : '#94a3b8', fontSize: '0.78rem', marginTop: 3 }}>{h.desc}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigate && onNavigate('projects')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'linear-gradient(135deg, #00d4ff, #0080ff)',
                  border: 'none', color: '#080c14',
                  padding: '11px 24px', borderRadius: 9,
                  fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer',
                  transition: 'transform 0.2s, opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                View Projects
              </button>
              <button
                onClick={() => onNavigate && onNavigate('contact')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'none',
                  border: '1px solid rgba(0,212,255,0.35)',
                  color: '#00d4ff', padding: '11px 24px', borderRadius: 9,
                  fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,212,255,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                <FaEnvelope /> Contact Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
