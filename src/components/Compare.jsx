import React from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products.js";

const Compare = () => {
  const { id1, id2 } = useParams();
  const product1 = products.find(p => p.id === id1);
  const product2 = products.find(p => p.id === id2);

  if (!product1 || !product2) return <NotFound />;

  const comparisons = [
    { label: "Price", p1: product1.price, p2: product2.price },
    { label: "Rating", p1: `${product1.rating}/5`, p2: `${product2.rating}/5` },
    { label: "Commission", p1: product1.commission, p2: product2.commission },
    { label: "Best For", p1: product1.bestFor, p2: product2.bestFor },
    { label: "Tier", p1: product1.tier, p2: product2.tier },
    { label: "Category", p1: product1.category.replace(/-/g, " "), p2: product2.category.replace(/-/g, " ") },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product1.name} vs {product2.name}</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {product1.name} vs {product2.name}
        </h1>
        <p className="text-lg text-gray-500">
          {product1.tagline} vs {product2.tagline}
        </p>
      </div>

      {/* Side-by-side comparison */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-8">
        <div className="grid grid-cols-3">
          <div className="bg-gray-50 p-6 flex items-center">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Feature</span>
          </div>
          <div className="bg-blue-50 p-6 text-center border-x border-gray-200">
            <span className="text-lg font-bold text-gray-900">{product1.name}</span>
            <div className="text-sm text-blue-600 mt-1">{product1.price}</div>
          </div>
          <div className="bg-blue-50 p-6 text-center border-x border-gray-200">
            <span className="text-lg font-bold text-gray-900">{product2.name}</span>
            <div className="text-sm text-blue-600 mt-1">{product2.price}</div>
          </div>
        </div>

        {comparisons.map((item, i) => (
          <div key={i} className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
            <div className="p-4 flex items-center">
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
            </div>
            <div className="p-4 text-center border-x border-gray-200">
              <span className="text-sm text-gray-900">{item.p1}</span>
            </div>
            <div className="p-4 text-center border-x border-gray-200">
              <span className="text-sm text-gray-900">{item.p2}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pros & Cons side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 mb-4">{product1.name} Pros & Cons</h3>
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-green-700 mb-2">✓ Pros</h4>
            <ul className="space-y-1">
              {product1.pros.map((pro, i) => (
                <li key={i} className="text-sm text-gray-700">• {pro}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-red-700 mb-2">✕ Cons</h4>
            <ul className="space-y-1">
              {product1.cons.map((con, i) => (
                <li key={i} className="text-sm text-gray-700">• {con}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 mb-4">{product2.name} Pros & Cons</h3>
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-green-700 mb-2">✓ Pros</h4>
            <ul className="space-y-1">
              {product2.pros.map((pro, i) => (
                <li key={i} className="text-sm text-gray-700">• {pro}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-red-700 mb-2">✕ Cons</h4>
            <ul className="space-y-1">
              {product2.cons.map((con, i) => (
                <li key={i} className="text-sm text-gray-700">• {con}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Winner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center mb-8">
        <h2 className="text-2xl font-bold mb-3">Our Verdict</h2>
        <p className="text-blue-100 max-w-2xl mx-auto mb-6">
          {product1.rating >= product2.rating
            ? `${product1.name} takes the edge for most use cases with its higher rating and strong ${product1.pros[0].toLowerCase()}.`
            : `${product2.name} takes the edge with its higher rating and strong ${product2.pros[0].toLowerCase()}.`
          }
          {product1.commission.includes("$") || product1.commission.includes("100%")
            ? ` For affiliates, ${product1.name} also offers a more generous commission structure.`
            : product2.commission.includes("$") || product2.commission.includes("100%")
            ? ` For affiliates, ${product2.name} offers a more generous commission structure.`
            : ""}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={product1.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-700 font-semibold py-3 px-6 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Try {product1.name} →
          </a>
          <a
            href={product2.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/15 border border-white/30 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/25 transition-colors"
          >
            Try {product2.name} →
          </a>
        </div>
      </div>
    </div>
  );
};

function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Comparison not found</h1>
      <Link to="/" className="text-blue-600 hover:underline">← Back to home</Link>
    </div>
  );
}

export default Compare;
