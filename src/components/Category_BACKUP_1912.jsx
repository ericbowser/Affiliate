import React from "react";
import { useParams, Link } from "react-router-dom";
import { siteConfig } from "../data/config.js";
import { products } from "../data/products.js";

const Category = () => {
  const { slug } = useParams();
  const category = siteConfig.categories[slug];
  const productsInCategory = products.filter(p => p.category === slug);

  if (!category) return <NotFound />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-amber-700">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{category.name}</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {category.icon} {category.name}
        </h1>
        <p className="text-lg text-gray-500 max-w-3xl">{category.description}</p>
      </div>

<<<<<<< Updated upstream
=======
      {/* Quiz CTA — metal detectors only */}
>>>>>>> Stashed changes
      {slug === "metal-detectors" && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-gray-900 text-lg">Not sure which detector is right for you?</p>
            <p className="text-gray-600 text-sm mt-1">Answer 6 quick questions — budget, terrain, experience — and get a match in 30 seconds.</p>
          </div>
          <Link
            to="/tools/detector-match"
            className="shrink-0 bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors whitespace-nowrap"
          >
            Take the quiz →
          </Link>
        </div>
      )}

<<<<<<< Updated upstream
=======
      {/* Product List */}
>>>>>>> Stashed changes
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
    budget: { label: "Budget Pick", style: "bg-stone-100 text-stone-700" },
    mid: { label: "Mid Range", style: "bg-amber-50 text-amber-800" },
    premium: { label: "Premium", style: "bg-amber-100 text-amber-900" },
  }[product.tier] || { label: "", style: "" };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
      <div className="mb-3">
        <h3 className="font-bold text-gray-900 text-lg">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.tagline}</p>
      </div>

      <div className="text-amber-500 text-sm mb-2">{stars} {product.rating}</div>

      {tierLabel.label && (
        <span className={`inline-block text-xs font-semibold px-2 py-1 rounded-full mb-3 ${tierLabel.style}`}>
          {tierLabel.label}
        </span>
      )}

      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium text-gray-700">Best for:</span> {product.bestFor}
      </p>
      <p className="text-sm text-gray-700 mb-4">
        <span className="font-medium">Price:</span>{" "}
        <span className="text-amber-700 font-semibold">{product.price}</span>
      </p>

<<<<<<< Updated upstream
      <div className="flex gap-2">
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex-1 bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium py-2 px-4 rounded-lg text-center transition-colors"
        >
          Check price →
        </a>
        <Link
          to={`/review/${product.id}`}
          className="bg-stone-100 hover:bg-stone-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg text-center transition-colors"
        >
          Review
        </Link>
      </div>
=======
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="block w-full bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium py-2 px-4 rounded-lg text-center transition-colors"
      >
        Check price →
      </a>
>>>>>>> Stashed changes
    </div>
  );
}

function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Category not found</h1>
      <Link to="/" className="text-amber-700 hover:underline">← Back to home</Link>
    </div>
  );
}

export default Category;
