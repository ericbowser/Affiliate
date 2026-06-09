import React from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../data/config.js";
import { products } from "../data/products.js";

const Landing = () => {
  const { categories, meta } = siteConfig;
  const categoriesList = Object.entries(categories);
  const featured = products.filter(p => p.tier === "premium" || p.rating >= 4.7).slice(0, 3);

  const stats = [
    { value: `${products.length}+`, label: "Products Covered" },
    { value: "6", label: "Gear Categories" },
    { value: "Utah", label: "Home Base" },
    { value: "BLM", label: "Our Backyard" },
  ];

  const utahSites = [
    { name: "Topaz Mountain", what: "Topaz crystals", distance: "3.5 hrs from SLC" },
    { name: "Dugway Geode Beds", what: "Agate geodes", distance: "2.5 hrs from SLC" },
    { name: "Tintic Mountains", what: "Garnets & minerals", distance: "1.5 hrs from SLC" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-800 via-stone-700 to-amber-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-amber-200 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
              Based in Salt Lake City · Gear for the American West
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              The Right Gear for Rockhounding in the West
            </h1>
            <p className="text-lg md:text-xl text-stone-200 leading-relaxed mb-8">
              Honest gear picks for metal detectors, rock hammers, GPS units, and field tools —
              chosen for Utah's BLM land, desert terrain, and mineralized soil. No fluff. Just what works.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#categories"
                className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold px-8 py-3 rounded-xl transition-colors text-sm"
              >
                Browse Gear
              </a>
              <Link
                to="/tools/detector-match"
                className="bg-white/15 backdrop-blur-sm text-white border border-white/25 font-semibold px-8 py-3 rounded-xl hover:bg-white/25 transition-colors text-sm"
              >
                Find My Detector →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-amber-600">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Gear Category</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            From Dugway Geode Beds to Topaz Mountain — gear chosen for where you're actually going.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesList.map(([slug, cat]) => {
            const count = products.filter(p => p.category === slug).length;
            return (
              <Link
                key={slug}
                to={`/category/${slug}`}
                className="group bg-white border border-gray-200 rounded-2xl p-6 hover:border-amber-400 hover:shadow-lg transition-all"
              >
                <span className="text-3xl mb-3 block">{cat.icon}</span>
                <h3 className="font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{cat.description}</p>
                <div className="mt-4">
                  <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded-full">
                    {count} {count === 1 ? "product" : "products"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Detector Quiz CTA */}
      <section className="bg-amber-50 border-y border-amber-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
            Interactive Tool
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Not sure which metal detector to buy?
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Answer 6 questions about your budget, terrain, and experience.
            Get a matched recommendation with honest reasoning — in 30 seconds.
          </p>
          <Link
            to="/tools/detector-match"
            className="inline-block bg-amber-600 hover:bg-amber-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Take the Detector Match Quiz →
          </Link>
        </div>
      </section>

      {/* Top Picks */}
      <section id="top-picks" className="bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Picks for 2026</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              The gear that consistently performs in Utah's mineralized desert terrain.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Utah Sites Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Start in Your Backyard</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Utah is one of the best rockhounding states in the country. Here are three sites worth your first trip.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {utahSites.map((site, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="text-2xl mb-3">📍</div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">{site.name}</h3>
              <p className="text-sm text-amber-700 font-medium mb-2">{site.what}</p>
              <p className="text-sm text-gray-500">{site.distance}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About / Trust */}
      <section className="bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">About Western Rockhound</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl mb-2">📍</div>
              <h3 className="font-bold text-gray-900 mb-2">Utah-Based</h3>
              <p className="text-sm text-gray-500">
                Built by Eric Bowser in Salt Lake City. Every site, terrain type, and season mentioned here is ground we know personally.
              </p>
            </div>
            <div>
              <div className="text-2xl mb-2">⛏️</div>
              <h3 className="font-bold text-gray-900 mb-2">Niche Focus</h3>
              <p className="text-sm text-gray-500">
                We cover gear specifically for Western rockhounding — not general outdoor gear. Mineralized desert soil, BLM access, and high-desert conditions shape every pick.
              </p>
            </div>
            <div>
              <div className="text-2xl mb-2">🧭</div>
              <h3 className="font-bold text-gray-900 mb-2">No Fluff</h3>
              <p className="text-sm text-gray-500">
                Straight pros, cons, and who each piece of gear is actually best for. We'd rather send you to the right $50 tool than upsell you on something you don't need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-stone-800 to-amber-800 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Out There?</h2>
          <p className="text-stone-300 mb-8">
            Browse gear by category or take the detector quiz to find your match.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#categories"
              className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Browse Gear →
            </a>
            <Link
              to="/tools/detector-match"
              className="bg-white/15 text-white border border-white/25 font-semibold px-8 py-3 rounded-xl hover:bg-white/25 transition-colors"
            >
              Take the Quiz →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

function ProductCard({ product }) {
  const stars = "★".repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? "½" : "");
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
      <div className="mb-3">
        <h3 className="font-bold text-gray-900 text-lg">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.tagline}</p>
      </div>
      <div className="text-amber-500 text-sm mb-3">{stars} {product.rating}</div>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium text-gray-700">Best for:</span> {product.bestFor}
      </p>
      <p className="text-sm text-gray-700 mb-4">
        <span className="font-medium">Price:</span>{" "}
        <span className="text-amber-700 font-semibold">{product.price}</span>
      </p>
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="block w-full bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium py-2 px-4 rounded-lg text-center transition-colors"
      >
        Check Price →
      </a>
    </div>
  );
}

export default Landing;
