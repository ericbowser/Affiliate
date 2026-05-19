import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', icon: <FaGithub className="text-xl" />, url: 'https://github.com/ericbowser' },
    { name: 'LinkedIn', icon: <FaLinkedin className="text-xl" />, url: 'https://www.linkedin.com/in/erbowser/' },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              <span className="text-teal-500">E.R.B.</span> — Eric Ryan Bowser
            </h3>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.72rem', color: '#a855f7', marginBottom: '10px' }}>
              Execute &amp; Engrave LLC
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Full-Stack Engineer · Cloud Architect in Training · AI Integrations
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              &copy; {currentYear} Eric Ryan Bowser. All rights reserved.
            </p>
          </div>

          {/* Currently Building */}
          <div className="text-center">
            <h4 className="text-gray-900 dark:text-white font-semibold mb-3 text-sm uppercase tracking-wider" style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.72rem', letterSpacing: '0.1em' }}>
              Currently Building
            </h4>
            <div className="space-y-2">
              <div>
                <a href="https://github.com/ericbowser/CompTIAPrepper" target="_blank" rel="noreferrer"
                  className="text-sm text-teal-500 dark:text-teal-400 hover:underline font-medium">
                  CloudPrepper
                </a>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">Cloud cert study platform · IT-7000</p>
              </div>
              <div>
                <a href="https://erb-think.com" target="_blank" rel="noreferrer"
                  className="text-sm text-teal-500 dark:text-teal-400 hover:underline font-medium">
                  erb-think.com
                </a>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">Portfolio &amp; project hub</p>
              </div>
            </div>
          </div>

          {/* Connect */}
          <div className="text-center md:text-right">
            <h4 style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
              className="text-gray-900 dark:text-white font-semibold mb-3">
              Connect
            </h4>
            <div className="flex justify-center md:justify-end space-x-4 mb-4">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.url} target="_blank" rel="noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                  aria-label={link.name}>
                  {link.icon}
                </a>
              ))}
              <a href="mailto:eric@erb-think.com"
                className="text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                aria-label="Email">
                <FaEnvelope className="text-xl" />
              </a>
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)',
              color: '#00d4ff', padding: '4px 14px', borderRadius: '20px',
              fontSize: '0.72rem', fontFamily: 'Space Mono, monospace',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00d4ff', display: 'inline-block' }} />
              Open to new roles
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
