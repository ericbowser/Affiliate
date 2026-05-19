import React from 'react';
import { FiHome } from 'react-icons/fi';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import resume from '../assets/erb_cv_resume_2.pdf';

function Navbar({ setDarkMode = () => {}, darkMode = false, showBackButton = false, onBackToLanding = () => {} }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Brand / Back */}
          <div className="flex items-center space-x-3">
            {showBackButton && (
              <button
                onClick={onBackToLanding}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:opacity-90 transition-opacity font-medium text-sm"
                aria-label="Back to home"
              >
                <FiHome className="text-base" />
                <span className="hidden sm:inline">Home</span>
              </button>
            )}
            <div>
              <span className="font-bold text-gray-900 dark:text-white text-sm sm:text-base" style={{ fontFamily: 'Space Mono, monospace' }}>
                <span className="text-teal-500">ERB</span>
                <span className="text-gray-400 dark:text-gray-500 mx-1">·</span>
                <span style={{ color: '#a855f7', fontSize: '0.75rem' }}>Execute &amp; Engrave LLC</span>
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <BsFillSunFill className="text-lg" /> : <BsFillMoonStarsFill className="text-lg" />}
            </button>

            <a
              href={resume}
              download
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm"
            >
              <span className="hidden sm:inline">Download </span>Resume
            </a>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
