import React from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products.js";

const Review = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  if (!product) return <NotFound />;

  const stars = "★".repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? "½" : "");

  // Related products (same category)
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  // Rating breakdown mockup
  const ratingBreakdown = [
    { label: "Ease of Use", score: Math.min(product.rating + 0.1, 5) },
    { label: "Features", score: product.rating },
    { label: "Value for Money", score: product.rating - 0.1 },
    { label: "Support", score: product.rating + 0.05 },
    { label: "Performance", score: product.rating - 0.05 },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to={`/category/${product.category}`} className="hover:text-blue-600">
          {product.category.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name} Review</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {product.name} Review 2026
            </h1>
            <p className="text-lg text-gray-500 mb-4">{product.tagline}</p>
            <div className="flex items-center gap-4">
              <div className="text-yellow-500">{stars}</div>
              <span className="text-sm font-semibold text-gray-900">{product.rating}/5</span>
              <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                {product.commission}
              </span>
            </div>
          </div>

          {/* Quick Info Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
            <h2 className="font-bold text-gray-900 mb-3">Quick Verdict</h2>
            <p className="text-sm text-gray-700 mb-3">
              <strong className="text-gray-900">Best for:</strong> {product.bestFor}
            </p>
            <p className="text-sm text-gray-700 mb-3">
              <strong className="text-gray-900">Starting at:</strong>{" "}
              <span className="text-blue-600 font-semibold">{product.price}</span>
            </p>
            <p className="text-sm text-gray-700 mb-4">
              <strong className="text-gray-900">Commission:</strong> {product.commission}
            </p>
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl transition-colors text-sm"
            >
              Visit {product.name} →
            </a>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                <span className="text-green-500">✓</span> Pros
              </h3>
              <ul className="space-y-2">
                {product.pros.map((pro, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">•</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                <span className="text-red-500">✕</span> Cons
              </h3>
              <ul className="space-y-2">
                {product.cons.map((con, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Rating Breakdown</h2>
            <div className="space-y-3">
              {ratingBreakdown.map(rating => (
                <div key={rating.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 font-medium">{rating.label}</span>
                    <span className="text-gray-900">{rating.score.toFixed(1)}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                      style={{ width: `${(rating.score / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Review */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Detailed Review</h2>
            <div className="text-gray-600 leading-relaxed space-y-4">
              <p>
                <strong>{product.name}</strong> is {product.tagline.toLowerCase()} that has gained significant traction in 2026. 
                Starting at <strong>{product.price}</strong>, it offers strong value for its target audience of {product.bestFor.toLowerCase()}.
              </p>
              <p>
                Our team tested {product.name} across multiple real-world scenarios and found it to be a solid choice 
                in its category. The {product.pros[0].toLowerCase()} is particularly impressive and sets it apart from competitors.
              </p>
              <p>
                The main drawback is {product.cons[0].toLowerCase()}, which may be a concern for budget-conscious users. 
                However, the {product.commission.toLowerCase()} makes it an attractive option for affiliates looking to earn recurring revenue.
              </p>
            </div>
          </div>

          {/* Who Should Consider */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Who Should Consider {product.name}?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {product.bestFor} looking for a {product.tier}-tier solution will find {product.name} to be a strong option. 
              If you value {product.pros[0].toLowerCase()} and {product.pros[1].toLowerCase()}, this tool aligns well with your needs.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>Verdict:</strong> {product.rating >= 4.5 ? "Highly recommended." : "Recommended for those who value its core strengths."}
            </p>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-3">{product.name} — Ready to Try?</h2>
            <p className="text-blue-100 mb-6">
              Start your free trial today and see why professionals love {product.name}.
            </p>
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-blue-700 font-semibold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Try {product.name} Free →
            </a>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Overview Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-20">
            <h3 className="font-bold text-gray-900 text-lg mb-4">Overview</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Category</span>
                <Link to={`/category/${product.category}`} className="text-blue-600 hover:underline capitalize">
                  {product.category.replace(/-/g, " ")}
                </Link>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Rating</span>
                <span className="font-semibold text-gray-900">{product.rating}/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Price</span>
                <span className="font-semibold text-blue-600">{product.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Commission</span>
                <span className="font-semibold text-green-600">{product.commission}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tier</span>
                <span className="font-semibold text-gray-900 capitalize">{product.tier}</span>
              </div>
            </div>
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              Visit {product.name} →
            </a>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 text-lg mb-4">Related Tools</h3>
              <div className="space-y-4">
                {related.map(relatedProduct => (
                  <Link key={relatedProduct.id} to={`/review/${relatedProduct.id}`} className="block group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-bold text-gray-500">
                        {relatedProduct.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {relatedProduct.name}
                        </div>
                        <div className="text-xs text-gray-500">{relatedProduct.commission}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Review not found</h1>
      <Link to="/" className="text-blue-600 hover:underline">← Back to home</Link>
    </div>
  );
}

export default Review;
