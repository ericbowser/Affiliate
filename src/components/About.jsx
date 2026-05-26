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

      <h1 className="text-3xl font-bold text-gray-900 mb-6">About Western Rockhound</h1>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p>
          <strong className="text-gray-900">Western Rockhound</strong> is an independent gear review site
          built for people who actually go out and dig. No manufacturer-supplied gear, no paid placements —
          just honest assessments of what performs in Utah's desert terrain and the broader American West.
        </p>

        <h2 className="text-xl font-bold text-gray-900 pt-4">Who's Behind This Site</h2>
        <p>
          I'm Eric Bowser, a software developer and small business owner based in Salt Lake City, Utah.
          I run <strong className="text-gray-900">Execute & Engrave LLC</strong>, a laser engraving business
          that's pushing me deeper into rockhounding — I'm sourcing raw minerals and gems from Utah's BLM
          land to turn into custom engraved jewelry. So this is personal.
        </p>
        <p>
          I started Western Rockhound because I couldn't find a gear review site that actually knew Utah.
          Most outdoor review sites are written from a Pacific Northwest or Colorado perspective — great
          if you're hiking above treeline, not great if you're navigating alkaline desert, dry washes,
          and miles of unmarked BLM access roads looking for topaz.
        </p>

        <h2 className="text-xl font-bold text-gray-900 pt-4">How We Review Gear</h2>
        <ul className="space-y-2">
          <li><strong className="text-gray-800">Field use first:</strong> Every product reviewed gets time on actual Utah sites before we publish anything.</li>
          <li><strong className="text-gray-800">Real terrain:</strong> We test in mineralized desert soil — the kind that trips up cheaper detectors — not just a backyard.</li>
          <li><strong className="text-gray-800">No fluff:</strong> We're a developer and maker, not a lifestyle blogger. If something isn't worth the money, we say so.</li>
          <li><strong className="text-gray-800">Updated regularly:</strong> Gear evolves. We revisit reviews when new models or firmware change the picture.</li>
        </ul>

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
            <strong>Have a question, site tip, or gear recommendation?</strong> Reach out — I'm genuinely interested in hearing from other Utah rockhounds.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
