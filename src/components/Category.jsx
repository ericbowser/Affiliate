import React from "react";
import { useParams, Link } from "react-router-dom";
import { siteConfig } from "../data/config.js";
import { products } from "../data/products.js";
import SEO from "./SEO";

const Category = () => {
  const { slug } = useParams();
  const category = siteConfig.categories[slug];
  const productsInCategory = products.filter(p => p.category === slug);

  if (!category) return <NotFound />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO
        title={category.name}
        description={category.description}
        path={`/category/${slug}`}
      />
      <nav className="text-sm text-slate-400 mb-6">
        <Link to="/" className="hover:text-amber-400">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-200">{category.name}</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3">
          {category.icon} {category.name}
        </h1>
        <p className="text-lg text-slate-400 max-w-3xl">{category.description}</p>
      </div>

      {slug === "metal-detectors" && (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-slate-100 text-lg">Not sure which detector is right for you?</p>
            <p className="text-slate-400 text-sm mt-1">Answer 6 quick questions — budget, terrain, experience — and get a match in 30 seconds.</p>
          </div>
          <Link
            to="/tools/detector-match"
            className="shrink-0 bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors whitespace-nowrap"
          >
            Take the quiz &rarr;
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {productsInCategory.map(product => (
          <CategoryProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

function CategoryProductCard({ product }) {
  const stars = "★".repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? "½" : "");
  const tierLabel = {
    budget:  { label: "Budget Pick", style: "bg-slate-700 text-slate-300" },
    mid:     { label: "Mid Range",   style: "bg-amber-900/30 text-amber-400" },
    premium: { label: "Premium",     style: "bg-amber-800/40 text-amber-300" },
  }[product.tier] || { label: "", style: "" };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:shadow-lg hover:shadow-amber-900/20 transition-all">
      <div className="mb-3">
        <h3 className="font-bold text-slate-100 text-lg">{product.name}</h3>
        <p className="text-sm text-slate-400">{product.tagline}</p>
      </div>

      <div className="text-amber-400 text-sm mb-2">{stars} {product.rating}</div>

      {tierLabel.label && (
        <span className={`inline-block text-xs font-semibold px-2 py-1 rounded-full mb-3 ${tierLabel.style}`}>
          {tierLabel.label}
        </span>
      )}

      <p className="text-sm text-slate-300 mb-1">
        <span className="font-medium text-slate-200">Best for:</span> {product.bestFor}
      </p>
      <p className="text-sm text-slate-300 mb-4">
        <span className="font-medium">Price:</span>{" "}
        <span className="text-amber-400 font-semibold">{product.price}</span>
      </p>

      <div className="flex gap-2">
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex-1 bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium py-2 px-4 rounded-lg text-center transition-colors"
        >
          Check price &rarr;
        </a>
        <Link
          to={`/review/${product.id}`}
          className="bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm font-medium py-2 px-4 rounded-lg text-center transition-colors"
        >
          Review
        </Link>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-3xl font-bold text-slate-100 mb-4">Category not found</h1>
      <Link to="/" className="text-amber-400 hover:underline">&larr; Back to home</Link>
    </div>
  );
}

export default Category;
