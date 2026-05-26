import React, { useState } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../data/config.js";

const Footer = () => {
  const { categories, meta } = siteConfig;
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    const existing = JSON.parse(localStorage.getItem("wr_subscribers") || "[]");
    existing.push({ email, date: new Date().toISOString() });
    localStorage.setItem("wr_subscribers", JSON.stringify(existing));
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="bg-stone-900 text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="md:col-span-1">
            <span className="text-lg font-bold text-white">
              Western <span className="text-amber-500">Rockhound</span>
            </span>
            <p className="mt-3 text-sm leading-relaxed">{meta.tagline}</p>
            <p className="mt-4 text-xs text-stone-500">
              Affiliate disclosure: We earn commissions from purchases made through links on this site at no extra cost to you. This never affects our reviews.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Gear Categories</h3>
            <ul className="space-y-2">
              {Object.entries(categories).map(([slug, cat]) => (
                <li key={slug}>
                  <Link to={`/category/${slug}`} className="text-sm hover:text-amber-400 transition-colors">
                    {cat.icon} {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Site</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-sm hover:text-white transition-colors">About</Link></li>
              <li><Link to="/about" className="text-sm hover:text-white transition-colors">Affiliate Disclosure</Link></li>
              <li><Link to="/about" className="text-sm hover:text-white transition-colors">Privacy Policy</Link></li>
              <li>
                <a href="https://www.blm.gov/programs/recreation" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors">
                  BLM Recreation Info ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Field Notes</h3>
            <p className="text-sm mb-3">New site guides, gear reviews, and seasonal tips — no spam.</p>
            {submitted ? (
              <p className="text-sm text-amber-400 font-medium">✓ You're in. We'll be in touch.</p>
            ) : (
              <form className="flex flex-col gap-2" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500">© {new Date().getFullYear()} Western Rockhound. All rights reserved.</p>
          <p className="text-xs text-stone-500">Built by Eric Bowser · Execute & Engrave LLC · Salt Lake City, UT</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
