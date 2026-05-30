import React from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../data/config.js";

const About = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-amber-700">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">About</span>
      </nav>

      <h1 className="text-3xl font-semibold text-gray-900 mb-6">About Wasatch Rockhound</h1>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>
          <strong className="text-gray-900">Wasatch Rockhound</strong> is an independent gear site
          built for people who actually get out and dig. Picks are chosen based on real Utah terrain —
          what holds up in desert conditions, on BLM land, and in mineralized soil.
        </p>

        <h2 className="text-xl font-bold text-gray-900 pt-4">Who's Behind This Site</h2>
        <p>
          A Salt Lake City-based software developer and small business owner running{" "}
          <strong className="text-gray-900">Execute &amp; Engrave LLC</strong>, a laser engraving business
          that's pushing deeper into rockhounding — sourcing raw minerals and gems from Utah's BLM
          land to turn into custom engraved jewelry.
        </p>
        <p>
          Western Rockhound started because there wasn't a gear site that actually knew Utah.
          Most outdoor review sites come from a Pacific Northwest or Colorado perspective — great
          for hiking above treeline, less useful for navigating alkaline desert, dry washes,
          and miles of unmarked BLM access roads.
        </p>

        <h2 className="text-xl font-bold text-gray-900 pt-4">Affiliate Disclosure</h2>
        <p>
          Western Rockhound participates in affiliate programs including Amazon Associates, Backcountry,
          and direct retailer programs. When you buy through our links, we earn a small commission at no
          extra cost to you. This is how we keep the lights on and get into the field more often.
        </p>
        <p>
          Our affiliate relationships never influence our ratings or recommendations. We've passed on
          recommending gear that wasn't worth it regardless of commission potential.
        </p>

        <h2 className="text-xl font-bold text-gray-900 pt-4">What's Coming</h2>
        <ul className="space-y-2">
          <li>Full site guides for Topaz Mountain, Dugway Geode Beds, and Tintic with GPS coordinates</li>
          <li>First-person trip reports with field photos</li>
          <li>Beginner's guide to rockhounding in Utah</li>
          <li>Seasonal guides — when to go, where to go</li>
        </ul>

        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-sm text-amber-800">
            <strong>Have a question, site tip, or gear recommendation?</strong> Reach out — always interested in hearing from other Utah rockhounds.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
