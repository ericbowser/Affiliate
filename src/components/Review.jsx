import React from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products.js";
import { siteConfig } from "../data/config.js";
import { trackAffiliateClick } from "../utils/analytics.js";
import { ProductSchema } from "../data/seoSchema.jsx";

const Review = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  if (!product) return <NotFound />;

  const category = siteConfig.categories[product.category];
  const categoryName = category?.name || product.category.replace(/-/g, " ");
  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAffiliateClick = (location) => {
    trackAffiliateClick({
      productId:   product.id,
      productName: product.name,
      category:    product.category,
      location,
      url:         product.url,
    });
  };

  return (
    <>
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ProductSchema product={product} />

      {/* Breadcrumb */}
      <nav className="text-sm text-slate-400 mb-8">
        <Link to="/" className="hover:text-amber-400">Home</Link>
        <span className="mx-2">/</span>
        <Link to={`/category/${product.category}`} className="hover:text-amber-400">
          {categoryName}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-200">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-10">

          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              {product.tier && (
                <span className={{
                  budget:  "bg-slate-700 text-slate-300",
                  mid:     "bg-amber-900/30 text-amber-400",
                  premium: "bg-amber-800/40 text-amber-300",
                }[product.tier] + " text-xs font-semibold px-2 py-1 rounded-full"}>
                  {product.tier === "budget" ? "Budget Pick" : product.tier === "mid" ? "Mid Range" : "Premium"}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">
              {product.name} Review
            </h1>
            <p className="text-lg text-slate-400 mb-4">{product.tagline}</p>
            <div className="flex items-center gap-3">
              <span className="text-amber-400 text-lg">
                {"★".repeat(Math.floor(product.rating))}{product.rating % 1 >= 0.5 ? "½" : ""}
              </span>
              <span className="text-sm font-semibold text-slate-100">{product.rating} / 5</span>
              <span className="text-sm text-slate-500">&#183;</span>
              <span className="text-sm font-semibold text-amber-400">{product.price}</span>
            </div>
          </div>

          {/* Quick Verdict */}
          {product.verdict && (
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
              <h2 className="font-bold text-slate-100 mb-2 text-sm uppercase tracking-wider">
                Quick Verdict
              </h2>
              <p className="text-slate-300 leading-relaxed">{product.verdict}</p>
              <p className="text-sm text-slate-400 mt-3">
                <span className="font-medium text-slate-200">Best for:</span> {product.bestFor}
              </p>
            </div>
          )}

          {/* Pros & Cons */}
          <div>
            <h2 className="text-xl font-bold text-slate-100 mb-5">Pros &amp; Cons</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                <h3 className="font-semibold text-slate-100 mb-3 flex items-center gap-2">
                  <span className="text-amber-500">&#10003;</span> What we like
                </h3>
                <ul className="space-y-2">
                  {product.pros.map((pro, i) => (
                    <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5 shrink-0">&#8226;</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                <h3 className="font-semibold text-slate-100 mb-3 flex items-center gap-2">
                  <span className="text-slate-500">&#10005;</span> Watch out for
                </h3>
                <ul className="space-y-2">
                  {product.cons.map((con, i) => (
                    <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-slate-500 mt-0.5 shrink-0">&#8226;</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* What owners say */}
          {(product.ownerPros || product.ownerCons) && (
            <div>
              <h2 className="text-xl font-bold text-slate-100 mb-2">What owners say</h2>
              <p className="text-sm text-slate-500 mb-5">
                Synthesized from verified owner reviews across Amazon, Reddit, and detecting forums.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {product.ownerPros && (
                  <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                    <h3 className="font-semibold text-slate-100 mb-3 text-sm uppercase tracking-wider">
                      Owners consistently praise
                    </h3>
                    <ul className="space-y-2">
                      {product.ownerPros.map((item, i) => (
                        <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                          <span className="text-amber-400 mt-0.5 shrink-0">&#10003;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.ownerCons && (
                  <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                    <h3 className="font-semibold text-slate-100 mb-3 text-sm uppercase tracking-wider">
                      Common complaints
                    </h3>
                    <ul className="space-y-2">
                      {product.ownerCons.map((item, i) => (
                        <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                          <span className="text-slate-500 mt-0.5 shrink-0">&#8226;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Who it's for / Who should skip */}
          {(product.whoFor || product.whoSkip) && (
            <div>
              <h2 className="text-xl font-bold text-slate-100 mb-5">Is this the right pick for you?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {product.whoFor && (
                  <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                    <h3 className="font-semibold text-slate-100 mb-2">Buy it if...</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{product.whoFor}</p>
                  </div>
                )}
                {product.whoSkip && (
                  <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                    <h3 className="font-semibold text-slate-100 mb-2">Skip it if...</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{product.whoSkip}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-slate-100 mb-2">{product.name}</h2>
            <p className="text-slate-400 text-sm mb-6">{product.price} &#183; {product.bestFor}</p>
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => handleAffiliateClick('cta_button')}
              className="inline-block bg-amber-600 hover:bg-amber-500 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
            >
              Check current price on Amazon &rarr;
            </a>
            <p className="text-xs text-slate-500 mt-4">
              As an Amazon Associate we earn from qualifying purchases at no extra cost to you.
            </p>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 lg:sticky lg:top-6">
            <div className="text-2xl font-bold text-amber-400 mb-1">{product.price}</div>
            <div className="text-sm text-slate-400 mb-5">
              {"★".repeat(Math.floor(product.rating))} {product.rating} / 5
            </div>
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => handleAffiliateClick('sidebar_button')}
              className="block w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold py-3 rounded-xl transition-colors text-center text-sm mb-4"
            >
              Check price on Amazon &rarr;
            </a>
            <div className="space-y-3 text-sm border-t border-slate-700 pt-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Category</span>
                <Link
                  to={`/category/${product.category}`}
                  className="text-amber-400 hover:underline capitalize"
                >
                  {categoryName}
                </Link>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Best for</span>
                <span className="text-slate-300 text-right max-w-[140px]">{product.bestFor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tier</span>
                <span className="text-slate-300 capitalize">{product.tier}</span>
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
              <h3 className="font-bold text-slate-100 mb-4">Also in {categoryName}</h3>
              <div className="space-y-3">
                {related.map(r => (
                  <Link
                    key={r.id}
                    to={`/review/${r.id}`}
                    className="flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-sm font-medium text-slate-200 group-hover:text-amber-400 transition-colors">
                        {r.name}
                      </div>
                      <div className="text-xs text-slate-500">{r.price}</div>
                    </div>
                    <span className="text-amber-400 text-xs">&rarr;</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Quiz CTA for metal detectors */}
          {product.category === "metal-detectors" && (
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 text-center">
              <p className="text-sm font-semibold text-slate-100 mb-2">
                Comparing detectors?
              </p>
              <p className="text-xs text-slate-400 mb-4">
                Take the quiz and get a personalized match in 30 seconds.
              </p>
              <Link
                to="/tools/detector-match"
                className="block w-full bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium py-2 rounded-lg text-center transition-colors"
              >
                Take the quiz &rarr;
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* MOBILE STICKY PRICE BAR */}
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-700 shadow-lg px-4 py-3 flex items-center justify-between gap-3">
      <div>
        <div className="text-lg font-bold text-amber-400 leading-none">{product.price}</div>
        <div className="text-xs text-slate-400 mt-0.5 truncate max-w-[160px]">{product.name}</div>
      </div>
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={() => handleAffiliateClick('mobile_sticky_bar')}
        className="shrink-0 bg-amber-600 hover:bg-amber-500 text-white font-semibold py-2.5 px-5 rounded-xl transition-colors text-sm"
      >
        Check price &rarr;
      </a>
    </div>

    <div className="lg:hidden h-20" />
    </>
  );
};

function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-3xl font-bold text-slate-100 mb-4">Review not found</h1>
      <Link to="/" className="text-amber-400 hover:underline">&larr; Back to home</Link>
    </div>
  );
}

export default Review;
