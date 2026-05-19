import React, { useState } from 'react';
import Skills from './Skills';

const LEVEL_COLOR = {
  expert: '#00d4ff',
  advanced: '#a855f7',
  intermediate: '#22c55e',
};

const Cards = ({ darkMode }) => {
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
      {Skills.map((skill, index) => {
        const color = LEVEL_COLOR[skill.level] || '#00d4ff';
        const isOpen = expanded === skill.key;

        return (
          <div
            key={skill.key}
            data-testid="CardSkill"
            id="CardSkill"
            style={{
              background: darkMode ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.8)',
              border: `1px solid ${isOpen ? color : darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              borderRadius: 14, padding: 20,
              transition: 'all 0.25s ease',
              boxShadow: isOpen ? `0 8px 24px ${color}20` : darkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.05)',
              cursor: 'default',
            }}
            onMouseEnter={e => { if (!isOpen) e.currentTarget.style.borderColor = color + '55'; }}
            onMouseLeave={e => { if (!isOpen) e.currentTarget.style.borderColor = darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'; }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10,
                background: `${color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {skill.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{
                  fontWeight: 700, fontSize: '0.95rem',
                  color: darkMode ? '#f1f5f9' : '#0f172a', marginBottom: 2,
                }}>
                  {skill.title}
                </h3>
                <span style={{
                  background: `${color}18`, color, padding: '2px 8px',
                  borderRadius: 4, fontSize: '0.68rem', fontFamily: 'monospace',
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                }}>
                  {skill.level}
                </span>
              </div>
            </div>

            {/* Description */}
            <div style={{ color: darkMode ? '#94a3b8' : '#475569', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: 12 }}>
              {skill.description}
            </div>

            {/* Related tech */}
            {skill.relatedTech && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
                {skill.relatedTech.slice(0, 4).map(t => (
                  <span key={t} style={{
                    background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                    color: darkMode ? '#64748b' : '#94a3b8',
                    padding: '2px 8px', borderRadius: 4, fontSize: '0.72rem',
                    fontFamily: 'monospace',
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Links */}
            {skill.link && skill.link.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 10 }}>
                {skill.link.map(x => (
                  <a key={x.name} href={x.url} target="_blank" rel="noreferrer"
                    style={{
                      color, fontSize: '0.8rem', textDecoration: 'none',
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      fontFamily: 'monospace',
                    }}
                    onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                  >
                    → {x.name}
                  </a>
                ))}
              </div>
            )}

            {/* Toggle details */}
            <button
              onClick={() => setExpanded(isOpen ? null : skill.key)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color, fontSize: '0.78rem', fontWeight: 600, padding: 0,
                fontFamily: 'monospace', transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              {isOpen ? '▲ Less' : '▼ More details'}
            </button>

            {isOpen && (
              <div style={{
                marginTop: 12, paddingTop: 12,
                borderTop: `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                color: darkMode ? '#94a3b8' : '#475569',
                fontSize: '0.83rem', lineHeight: 1.7,
              }}>
                {skill.details}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
