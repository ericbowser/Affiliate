import React from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../data/config.js";
import { products } from "../data/products.js";
import { posts } from "../data/posts";
import GemIcon from "./gems/GemIcons";
import LandingMap from "./LandingMap";
import { ClientOnly } from "./ClientOnly";
import SEO from "./SEO";

const Landing = () => {
  const { categories } = siteConfig;
  const categoriesList = Object.entries(categories);
  const featured = products.filter(p => p.tier === "premium" || p.rating >= 4.7).slice(0, 3);

  const stats = [
    { value: `${products.length}+`, label: "Products Covered" },
    { value: "6", label: "Gear Categories" },
    { value: "Utah", label: "Home Base" },
    { value: "BLM", label: "Our Backyard" },
  ];

  const utahSites = [
    { name: "Topaz Mountain", what: "Topaz crystals", distance: "3.5 hrs from SLC", gem: "topaz" },
    { name: "Dugway Geode Beds", what: "Quartz geodes", distance: "2.5 hrs from SLC", gem: "geode" },
    { name: "Tintic Mountains", what: "Garnets & minerals", distance: "1.5 hrs from SLC", gem: "garnet" },
  ];

  return (
    <div>
      <SEO
        description="Honest gear reviews, site guides, and beginner resources for rockhounding across Utah and the American West. Find what to buy, where to go, and what to bring."
        path="/"
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-8 lg:gap-10 items-start min-w-0">

            {/* Left — headline, gems, CTAs */}
            <div className="lg:pt-6">
              <h1 className="text-3xl md:text-4xl font-semibold leading-snug mb-4">
                The Right Gear for Rockhounding in the West
              </h1>
              <p className="text-base text-slate-300 leading-relaxed mb-5">
                Gear picks for metal detectors, rock hammers, GPS units, and field tools —
                chosen for Utah's BLM land, desert terrain, and mineralized soil.
              </p>

              <div className="flex items-center gap-3 mb-6">
                {["topaz", "garnet", "geode", "opal", "amethyst", "red-beryl"].map((gem) => (
                  <GemIcon key={gem} name={gem} size={34} className="opacity-90 drop-shadow-md" />
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#categories"
                  className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-6 py-2.5 rounded-xl transition-colors text-sm"
                >
                  Browse Gear
                </a>
                <Link
                  to="/tools/detector-match"
                  className="bg-white/10 backdrop-blur-sm text-white border border-white/20 font-medium px-6 py-2.5 rounded-xl hover:bg-white/20 transition-colors text-sm"
                >
                  Find My Detector &rarr;
                </Link>
              </div>
            </div>

            {/* Right — interactive gem-marker map (client-only to prevent hydration mismatch) */}
            <ClientOnly
              fallback={
                <div className="w-full min-h-[340px] lg:min-h-[420px] bg-slate-800/60 rounded-2xl ring-1 ring-white/10 animate-pulse" />
              }
            >
              <div className="w-full min-w-0 rounded-2xl overflow-hidden ring-1 ring-white/20 shadow-2xl">
                <LandingMap heroMode />
              </div>
            </ClientOnly>

          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-2xl font-semibold text-amber-400">{stat.value}</div>
                <div className="text-sm text-slate-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-100 mb-2">Browse by Gear Category</h2>
          <p className="text-base text-slate-400">
            From Dugway Geode Beds to Topaz Mountain — gear chosen for where you're actually going.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categoriesList.map(([slug, cat]) => {
            const count = products.filter(p => p.category === slug).length;
            return (
              <Link
                key={slug}
                to={`/category/${slug}`}
                className="group bg-slate-800 border border-slate-700 rounded-2xl p-5 hover:border-amber-500 hover:shadow-md hover:shadow-amber-900/20 transition-all"
              >
                <span className="text-2xl mb-2 block">{cat.icon}</span>
                <h3 className="font-semibold text-slate-100 group-hover:text-amber-400 transition-colors text-base">
                  {cat.name}
                </h3>
                <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">{cat.description}</p>
                <div className="mt-3">
                  <span className="text-xs font-medium text-amber-400 bg-amber-900/30 border border-amber-800/50 px-2 py-1 rounded-full">
                    {count} {count === 1 ? "product" : "products"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Detector Quiz CTA */}
      <section className="bg-slate-800 border-y border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <span className="inline-block bg-amber-900/30 text-amber-400 border border-amber-800/50 text-xs font-medium px-3 py-1 rounded-full mb-3 tracking-wide">
            Interactive Tool
          </span>
          <h2 className="text-2xl font-semibold text-slate-100 mb-3">
            Not sure which metal detector to buy?
          </h2>
          <p className="text-base text-slate-400 max-w-xl mx-auto mb-6">
            Answer 6 questions about your budget, terrain, and experience.
            Get a matched recommendation with honest reasoning — in 30 seconds.
          </p>
          <Link
            to="/tools/detector-match"
            className="inline-block bg-amber-600 hover:bg-amber-500 text-white font-medium px-7 py-2.5 rounded-xl transition-colors text-sm"
          >
            Take the Detector Match Quiz &rarr;
          </Link>
        </div>
      </section>

      {/* Top Picks */}
      <section id="top-picks" className="bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-100 mb-2">Top Picks for 2026</h2>
            <p className="text-base text-slate-400">
              Gear that consistently performs in Utah's mineralized desert terrain.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Utah Sites Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-100 mb-2">Start in Your Backyard</h2>
          <p className="text-base text-slate-400">
            Utah is one of the best rockhounding states in the country. Three sites worth your first trip.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {utahSites.map((site, i) => (
            <div key={i} className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
              <div className="mb-3">
                <GemIcon name={site.gem} size={44} />
              </div>
              <h3 className="font-semibold text-slate-100 text-base mb-1">{site.name}</h3>
              <p className="text-sm text-amber-400 font-medium mb-1">{site.what}</p>
              <p className="text-sm text-slate-400">{site.distance}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link
            to="/guides/utah-sites-map"
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
          >
            &#128205; Open Interactive Site Map
          </Link>
        </div>
      </section>

      {/* Latest from the Blog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-800">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-slate-100 mb-1">Latest from the Field</h2>
            <p className="text-base text-slate-400">Site guides and trip planning resources.</p>
          </div>
          <Link to="/blog" className="text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors">
            All posts &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group bg-slate-800 border border-slate-700 hover:border-amber-500 rounded-2xl p-5 transition-all hover:shadow-md hover:shadow-amber-900/20"
            >
              <span className="inline-block bg-amber-900/30 text-amber-400 border border-amber-800/50 text-xs font-medium px-2.5 py-1 rounded-full mb-3">
                {post.category}
              </span>
              <h3 className="text-base font-semibold text-slate-100 group-hover:text-amber-400 transition-colors leading-snug mb-2">
                {post.title}
              </h3>
              <p className="text-xs text-slate-500">{post.readTime}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* About / Trust */}
      <section className="bg-slate-800/50 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-semibold text-slate-100 mb-8">About Wasatch Rockhound</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="mb-3"><GemIcon name="topaz" size={36} /></div>
              <h3 className="font-semibold text-slate-100 mb-1.5 text-base">Utah-Based</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Built in Salt Lake City. Every site, terrain type, and season mentioned here is ground we know personally.
              </p>
            </div>
            <div>
              <div className="mb-3"><GemIcon name="garnet" size={36} /></div>
              <h3 className="font-semibold text-slate-100 mb-1.5 text-base">Niche Focus</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Gear specifically for Western rockhounding — not general outdoor gear. Mineralized desert soil, BLM access, and high-desert conditions shape every pick.
              </p>
            </div>
            <div>
              <div className="mb-3"><GemIcon name="opal" size={36} /></div>
              <h3 className="font-semibold text-slate-100 mb-1.5 text-base">Straight Talk</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Honest pros, cons, and who each piece of gear is actually best for. We'd rather send you to the right $50 tool than upsell you on something you don't need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-slate-900 to-amber-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="text-2xl font-semibold mb-3">Ready to Get Out There?</h2>
          <p className="text-base text-slate-300 mb-6">
            Browse gear by category or take the detector quiz to find your match.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#categories"
              className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-6 py-2.5 rounded-xl transition-colors text-sm"
            >
              Browse Gear &rarr;
            </a>
            <Link
              to="/tools/detector-match"
              className="bg-white/10 text-white border border-white/20 font-medium px-6 py-2.5 rounded-xl hover:bg-white/20 transition-colors text-sm"
            >
              Take the Quiz &rarr;
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
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 hover:shadow-md hover:shadow-amber-900/20 transition-all">
      <div className="mb-2">
        <h3 className="font-semibold text-slate-100 text-base">{product.name}</h3>
        <p className="text-sm text-slate-400">{product.tagline}</p>
      </div>
      <div className="text-amber-400 text-sm mb-2">{stars} {product.rating}</div>
      <p className="text-sm text-slate-300 mb-1">
        <span className="font-medium text-slate-200">Best for:</span> {product.bestFor}
      </p>
      <p className="text-sm text-slate-300 mb-4">
        <span className="font-medium">Price:</span>{" "}
        <span className="text-amber-400 font-semibold">{product.price}</span>
      </p>
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="block w-full bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium py-2 px-4 rounded-lg text-center transition-colors"
      >
        Check Price &rarr;
      </a>
    </div>
  );
}

export default Landing;
