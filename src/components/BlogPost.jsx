import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, posts } from "../data/posts";

const BlogPost = () => {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) return <Navigate to="/404" replace />;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-amber-700">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/blog" className="hover:text-amber-700">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{post.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
          {post.category}
        </span>
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight mb-4">
          {post.title}
        </h1>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="text-gray-500 text-sm">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric",
            })}{" "}· {post.readTime}
          </p>
          {post.mapSites?.length > 0 && (
            <Link
              to="/weather"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 hover:text-amber-900 border border-amber-300 hover:border-amber-500 px-3 py-1.5 rounded-lg transition-colors"
            >
              🏜️ Check field conditions
            </Link>
          )}
        </div>
      </div>

      {/* Article body */}
      <article className="prose-article">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          children={post.content}
          components={{
            h1: ({ children }) => null,
            h2: ({ children }) => (
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 pb-2 border-b border-stone-200">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-bold text-gray-900 mt-8 mb-3">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-gray-700 leading-relaxed mb-5 text-[1.05rem]">
                {children}
              </p>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                className="text-amber-700 hover:text-amber-900 underline underline-offset-2 font-medium"
                target={href?.startsWith("http") ? "_blank" : undefined}
                rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {children}
              </a>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-gray-900">{children}</strong>
            ),
            em: ({ children }) => (
              <em className="italic text-gray-600">{children}</em>
            ),
            ul: ({ children }) => (
              <ul className="my-4 space-y-1 pl-5 list-disc marker:text-amber-500">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="my-4 space-y-1 pl-5 list-decimal marker:text-amber-600 marker:font-semibold">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-gray-700 leading-relaxed pl-1">{children}</li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-amber-400 bg-amber-50 pl-5 pr-4 py-3 my-6 rounded-r-lg text-gray-700 italic">
                {children}
              </blockquote>
            ),
            code: ({ inline, children }) =>
              inline ? (
                <code className="bg-stone-100 text-amber-800 px-1.5 py-0.5 rounded text-sm font-mono">
                  {children}
                </code>
              ) : (
                <pre className="bg-stone-900 text-stone-100 rounded-xl p-5 overflow-x-auto my-6 text-sm font-mono leading-relaxed">
                  <code>{children}</code>
                </pre>
              ),
            hr: () => <hr className="my-10 border-stone-200" />,
          }}
        />
      </article>

      {/* Footer CTA */}
      <div className="mt-14 p-6 bg-amber-50 border border-amber-200 rounded-2xl">
        <p className="text-sm font-semibold text-amber-900 mb-1">Ready to head out?</p>
        <p className="text-sm text-amber-800 mb-4">
          Check live field conditions before you drive, or browse gear picked for Utah terrain.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/weather"
            className="text-sm font-medium bg-amber-700 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            🏜️ Field Conditions →
          </Link>
          <Link
            to="/category/rock-hammers"
            className="text-sm font-medium border border-amber-400 text-amber-700 hover:bg-amber-100 px-4 py-2 rounded-lg transition-colors"
          >
            Browse Gear →
          </Link>
          <Link
            to="/guides/utah-sites-map"
            className="text-sm font-medium border border-amber-400 text-amber-700 hover:bg-amber-100 px-4 py-2 rounded-lg transition-colors"
          >
            📍 Site Map
          </Link>
        </div>
      </div>

      {/* Related posts */}
      {posts.length > 1 && (
        <div className="mt-12">
          <h3 className="text-lg font-bold text-gray-900 mb-4">More Guides</h3>
          <div className="space-y-3">
            {posts
              .filter((p) => p.slug !== slug)
              .map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="flex items-center justify-between bg-white border border-stone-200 hover:border-amber-400 rounded-xl px-5 py-4 transition-colors group"
                >
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-amber-700 transition-colors text-sm">
                      {p.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{p.readTime}</p>
                  </div>
                  <span className="text-amber-600 text-sm">→</span>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
