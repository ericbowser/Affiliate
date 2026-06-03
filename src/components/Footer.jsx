import React, { useState } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../data/config.js";
import { sendSubscribeNotification } from "../utils/emailService";

const Footer = () => {
  const { categories, meta } = siteConfig;
  const [email, setEmail]       = useState("");
  const [status, setStatus]     = useState("idle"); // idle | submitting | success | error

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");
    try {
      await sendSubscribeNotification(email);
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="md:col-span-1">
            <span className="text-lg font-semibold text-white">
              Wasatch <span className="text-amber-500">Rockhound</span>
            </span>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{meta.tagline}</p>
            <p className="mt-3 text-xs text-slate-500">
              Some links on this site earn us a small commission at no extra cost to you. It keeps the site running and never influences our reviews.
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
              <li><Link to="/"                       className="text-sm hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/tools/detector-match"   className="text-sm hover:text-white transition-colors">Detector Match Quiz</Link></li>
              <li><Link to="/about"                  className="text-sm hover:text-white transition-colors">About</Link></li>
              <li><Link to="/about"                  className="text-sm hover:text-white transition-colors">Disclosures &amp; Privacy</Link></li>
              <li>
                <a href="https://www.blm.gov/programs/recreation" target="_blank" rel="noopener noreferrer"
                   className="text-sm hover:text-white transition-colors">
                  BLM Recreation Info ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Field Notes</h3>
            <p className="text-sm mb-3">New site guides, gear reviews, and seasonal tips — no spam.</p>

            {status === "success" ? (
              <p className="text-sm text-amber-400 font-medium">✓ You're in. We'll be in touch.</p>
            ) : (
              <>
                {status === "error" && (
                  <p className="text-sm text-red-400 mb-2">Something went wrong — try again.</p>
                )}
                <form className="flex flex-col gap-2" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-600"
                  />
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="bg-amber-700 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
                  >
                    {status === "submitting" ? "Subscribing…" : "Subscribe"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} Wasatch Rockhound. All rights reserved.</p>
          <p className="text-xs text-slate-500">
            <a href="https://www.flaticon.com/free-icons/gem" title="gem icons" className="hover:text-slate-300 transition-colors">
              Gem icons by Freepik — Flaticon
            </a>
            {" · "} Built by Execute &amp; Engrave LLC · Salt Lake City, UT
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
