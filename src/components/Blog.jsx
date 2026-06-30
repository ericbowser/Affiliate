import React from "react";
import { Link } from "react-router-dom";
import { posts } from "../data/posts";
import SEO from "./SEO";

const CATEGORY_COLORS = {
  "Site Guides":   { bg: "bg-amber-900/30",   text: "text-amber-400",   border: "border-amber-800/50"  },
  "Gear Reviews":  { bg: "bg-slate-700",       text: "text-slate-300",   border: "border-slate-600"     },
  "Beginner Tips": { bg: "bg-emerald-900/30",  text: "text-emerald-400", border: "border-emerald-800/50"},
  "Field Notes":   { bg: "bg-orange-900/30",   text: "text-orange-400",  border: "border-orange-800/50" },
};

const categoryStyle = (cat) =>
  CATEGORY_COLORS[cat] ?? { bg: "bg-slate-700", text: "text-slate-300", border: "border-slate-600" };

const Blog = () => {
  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const [featured, ...rest] = sorted;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SEO
        title="Field Notes & Site Guides"
        description="Trip planning resources, site guides, and gear breakdowns for rockhounding in Utah and the American West."
        path="/blog"
      />

      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-slate-100 mb-2">Field Notes</h1>
        <p className="text-base text-slate-400">
          Site guides, gear write-ups, and trip planning resources for Utah rockhounders.
        </p>
      </div>

      {featured && (
        <Link
          to={`/blog/${featured.slug}`}
          className="group block bg-slate-800 border border-slate-700 hover:border-amber-500 rounded-2xl overflow-hidden mb-8 transition-all hover:shadow-md hover:shadow-amber-900/20"
        >
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 px-8 py-10">
            <div className={`inline-block text-xs font-medium px-3 py-1 rounded-full mb-4 border ${categoryStyle(featured.category).bg} ${categoryStyle(featured.category).text} ${categoryStyle(featured.category).border}`}>
              {featured.category}
            </div>
            <h2 className="text-2xl font-semibold text-white leading-snug mb-3 group-hover:text-amber-300 transition-colors">
              {featured.title}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-4 max-w-2xl">
              {featured.description}
            </p>
            <p className="text-xs text-slate-400">
              {new Date(featured.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              {" · "}{featured.readTime}
            </p>
          </div>
          <div className="px-8 py-4 flex items-center justify-between bg-slate-800">
            <span className="text-sm font-medium text-amber-400 group-hover:text-amber-300 transition-colors">
              Read the guide &rarr;
            </span>
            {featured.mapSites?.length > 0 && (
              <span className="text-xs text-slate-500">&#128205; Includes interactive map</span>
            )}
          </div>
        </Link>
      )}

      {rest.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {rest.map((post) => {
            const cs = categoryStyle(post.category);
            return (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group bg-slate-800 border border-slate-700 hover:border-amber-500 rounded-2xl p-6 transition-all hover:shadow-md hover:shadow-amber-900/20"
              >
                <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3 border ${cs.bg} ${cs.text} ${cs.border}`}>
                  {post.category}
                </span>
                <h2 className="text-base font-semibold text-slate-100 group-hover:text-amber-400 transition-colors leading-snug mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
                  {post.description}
                </p>
                <p className="text-xs text-slate-500">
                  {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  {" · "}{post.readTime}
                </p>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl px-8 py-10 text-center mb-10">
          <p className="text-sm text-slate-400 mb-1">More guides are on the way.</p>
          <p className="text-xs text-slate-500">Topaz Mountain, Dugway Geode Beds, and beginner trip planning coming soon.</p>
        </div>
      )}

      <div className="bg-slate-800 border border-slate-700 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-100 mb-1">Looking for a specific site?</p>
          <p className="text-sm text-slate-400">Browse all 8 Utah rockhounding locations on the interactive map.</p>
        </div>
        <Link
          to="/guides/utah-sites-map"
          className="shrink-0 text-sm font-medium bg-amber-600 hover:bg-amber-500 text-white px-5 py-2.5 rounded-xl transition-colors"
        >
          &#128205; Open Site Map
        </Link>
      </div>
    </div>
  );
};

export default Blog;
