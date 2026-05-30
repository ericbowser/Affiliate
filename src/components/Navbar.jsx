import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../data/config.js";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { categories } = siteConfig;

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <span className="text-lg font-semibold text-slate-900">
              Wasatch <span className="text-amber-700">Rockhound</span>
            </span>
            <span className="hidden lg:block text-xs text-gray-400 border-l border-gray-200 pl-3">
              Salt Lake City · Gear for the American West
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-amber-700 transition-colors text-base font-medium">
              Home
            </Link>

            {/* Working Categories Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-gray-600 hover:text-amber-700 transition-colors text-base font-medium flex items-center gap-1"
              >
                Gear Categories
                <span className={`text-xs transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}>▾</span>
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-60 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
                  {Object.entries(categories).map(([slug, cat]) => (
                    <Link
                      key={slug}
                      to={`/category/${slug}`}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-800 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/about" className="text-gray-600 hover:text-amber-700 transition-colors text-base font-medium">
              About
            </Link>
            <Link to="/blog" className="text-gray-600 hover:text-amber-700 transition-colors text-base font-medium">
              Blog
            </Link>
            <Link to="/weather" className="text-gray-600 hover:text-amber-700 transition-colors text-base font-medium">
              Field Conditions
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            <Link to="/" className="block text-gray-700 hover:text-amber-700 text-sm font-medium py-2" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider pt-2 pb-1">Gear Categories</p>
            {Object.entries(categories).map(([slug, cat]) => (
              <Link
                key={slug}
                to={`/category/${slug}`}
                className="flex items-center gap-2 text-gray-600 hover:text-amber-700 text-sm py-2"
                onClick={() => setMenuOpen(false)}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
            <Link to="/about" className="block text-gray-700 hover:text-amber-700 text-sm font-medium py-2 border-t border-gray-100 mt-1" onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <Link to="/blog" className="block text-gray-700 hover:text-amber-700 text-sm font-medium py-2 border-t border-gray-100" onClick={() => setMenuOpen(false)}>
              Blog
            </Link>
            <Link to="/weather" className="block text-gray-700 hover:text-amber-700 text-sm font-medium py-2 border-t border-gray-100" onClick={() => setMenuOpen(false)}>
              Field Conditions
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
