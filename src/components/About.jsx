import React from "react";
import { Link } from "react-router-dom";
import SEO from "./SEO";

const About = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO
        title="About"
        description="Wasatch Rockhound is an independent gear site built by a Salt Lake City-based developer for people who actually get out and dig on Utah BLM land."
        path="/about"
      />
      <nav className="text-sm text-slate-400 mb-8">
        <Link to="/" className="hover:text-amber-400">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-200">About</span>
      </nav>

      <h1 className="text-3xl font-semibold text-slate-100 mb-6">About Wasatch Rockhound</h1>

      <div className="space-y-6 text-slate-300 leading-relaxed">
        <p>
          <strong className="text-slate-100">Wasatch Rockhound</strong> is an independent gear site
          built for people who actually get out and dig. Picks are chosen based on real Utah terrain —
          what holds up in desert conditions, on BLM land, and in mineralized soil.
        </p>

        <h2 className="text-xl font-bold text-slate-100 pt-4">Who's Behind This Site</h2>
        <p>
          A Salt Lake City-based software developer and small business owner running{" "}
          <strong className="text-slate-100">Execute &amp; Engrave LLC</strong>, a laser engraving business
          that's pushing deeper into rockhounding — sourcing raw minerals and gems from Utah's BLM
          land to turn into custom engraved jewelry.
        </p>
        <p>
          Wasatch Rockhound started because there wasn't a gear site that actually knew Utah.
          Most outdoor review sites come from a Pacific Northwest or Colorado perspective — great
          for hiking above treeline, less useful for navigating alkaline desert, dry washes,
          and miles of unmarked BLM access roads.
        </p>

        <h2 className="text-xl font-bold text-slate-100 pt-4">Affiliate Disclosure</h2>
        <p>
          Wasatch Rockhound participates in affiliate programs including Amazon Associates, Backcountry,
          and direct retailer programs. When you buy through our links, we earn a small commission at no
          extra cost to you. This is how we keep the lights on and get into the field more often.
        </p>
        <p>
          Our affiliate relationships never influence our ratings or recommendations. We've passed on
          recommending gear that wasn't worth it regardless of commission potential.
        </p>

        <h2 className="text-xl font-bold text-slate-100 pt-4">What's Coming</h2>
        <ul className="space-y-2 list-disc pl-5 marker:text-amber-500">
          <li>Full site guides for Topaz Mountain, Dugway Geode Beds, and Tintic with GPS coordinates</li>
          <li>First-person trip reports with field photos</li>
          <li>Beginner's guide to rockhounding in Utah</li>
          <li>Seasonal guides — when to go, where to go</li>
        </ul>

        <div className="mt-8 p-4 bg-slate-800 border border-slate-700 rounded-xl">
          <p className="text-sm text-slate-300">
            <strong className="text-amber-400">Have a question, site tip, or gear recommendation?</strong> Reach out — always interested in hearing from other Utah rockhounds.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
