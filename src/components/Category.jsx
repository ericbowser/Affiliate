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
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{category.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {category.icon} {category.name}
        </h1>
        <p className="text-lg text-gray-500 max-w-3xl">{category.description}</p>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {productsInCategory.map(product => (
          <CategoryProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* SEO Content */}
      <div className="mt-16 bg-white border border-gray-200 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Best {category.name} in 2026
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Finding the right {category.name.toLowerCase()} tool can be overwhelming. There are dozens of options, 
          each claiming to be the best. We've tested and compared all of them so you don't have to.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          Our {productsInCategory.length} featured products represent the top tools in this category, 
          selected based on features, pricing, reliability, and value. Each has been independently evaluated 
          using real-world scenarios and workflows.
        </p>
        <p className="text-gray-600 leading-relaxed">
          All links on this page are affiliate links, which means we may earn a small commission 
          at no extra cost to you. We only recommend tools we genuinely believe in.
        </p>
      </div>
    </div>
  );
};

function CategoryProductCard({ product }) {
  const stars = "★".repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? "½" : "");

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-gray-900 text-lg">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.tagline}</p>
        </div>
      </div>
      
      <div className="text-yellow-500 text-sm mb-2">{stars} {product.rating}</div>
      
      <span className="inline-block text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-1 rounded-full mb-3">
        {product.commission}
      </span>
      
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium text-gray-700">Best for:</span> {product.bestFor}
      </p>
      <p className="text-sm text-gray-700 mb-4">
        <span className="font-medium">Starting at:</span>{" "}
        <span className="text-blue-600 font-semibold">{product.price}</span>
      </p>
      
      <div className="flex gap-2">
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg text-center transition-colors"
        >
          Visit Site →
        </a>
        <Link
          to={`/review/${product.id}`}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg text-center transition-colors"
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
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Category not found</h1>
      <Link to="/" className="text-blue-600 hover:underline">← Back to home</Link>
    </div>
  );
}

export default Category;
