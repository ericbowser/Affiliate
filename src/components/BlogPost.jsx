import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getRelatedPosts } from "../data/posts";
import { ArticleSchema } from "../data/seoSchema";

const BlogPost = () => {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const related = getRelatedPosts(slug, 3);

  if (!post) return <Navigate to="/404" replace />;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ArticleSchema post={post} />

      {/* Breadcrumb */}
      <nav className="text-sm text-slate-400 mb-8">
        <Link to="/" className="hover:text-amber-400">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/blog" className="hover:text-amber-400">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-200">{post.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <span className="inline-block bg-amber-900/30 text-amber-400 border border-amber-800/50 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
          {post.category}
        </span>
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-100 leading-tight mb-4">
          {post.title}
        </h1>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="text-slate-400 text-sm">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric",
            })}{" "}&#183; {post.readTime}
          </p>
          {post.mapSites?.length > 0 && (
            <Link
              to="/weather"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:text-amber-300 border border-amber-700 hover:border-amber-500 px-3 py-1.5 rounded-lg transition-colors"
            >
              &#127964; Check field conditions
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
            h1: () => null,
            h2: ({ children }) => (
              <h2 className="text-2xl font-bold text-slate-100 mt-12 mb-4 pb-2 border-b border-slate-700">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-bold text-slate-100 mt-8 mb-3">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-slate-300 leading-relaxed mb-5 text-[1.05rem]">
                {children}
              </p>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                className="text-amber-400 hover:text-amber-300 underline underline-offset-2 font-medium"
                target={href?.startsWith("http") ? "_blank" : undefined}
                rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {children}
              </a>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-slate-100">{children}</strong>
            ),
            em: ({ children }) => (
              <em className="italic text-slate-300">{children}</em>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto my-8 rounded-xl border border-slate-700">
                <table className="w-full text-sm border-collapse">{children}</table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-slate-800">{children}</thead>
            ),
            tbody: ({ children }) => (
              <tbody>{children}</tbody>
            ),
            tr: ({ children }) => (
              <tr className="border-b border-slate-700 even:bg-slate-800/40">{children}</tr>
            ),
            th: ({ children }) => (
              <th className="text-left font-semibold text-slate-100 px-4 py-3 border-b border-slate-600">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="text-slate-200 px-4 py-3 align-top">{children}</td>
            ),
            ul: ({ children }) => (
              <ul className="my-4 space-y-1 pl-5 list-disc marker:text-amber-500">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="my-4 space-y-1 pl-5 list-decimal marker:text-amber-500 marker:font-semibold">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-slate-300 leading-relaxed pl-1">{children}</li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-amber-500 bg-amber-900/20 pl-5 pr-4 py-3 my-6 rounded-r-lg text-slate-300 italic">
                {children}
              </blockquote>
            ),
            code: ({ inline, children }) =>
              inline ? (
                <code className="bg-slate-700 text-amber-400 px-1.5 py-0.5 rounded text-sm font-mono">
                  {children}
                </code>
              ) : (
                <pre className="bg-slate-950 text-slate-100 rounded-xl p-5 overflow-x-auto my-6 text-sm font-mono leading-relaxed border border-slate-800">
                  <code>{children}</code>
                </pre>
              ),
            hr: () => <hr className="my-10 border-slate-700" />,
          }}
        />
      </article>

      {/* Footer CTA */}
      <div className="mt-14 p-6 bg-slate-800 border border-slate-700 rounded-2xl">
        <p className="text-sm font-semibold text-slate-100 mb-1">Ready to head out?</p>
        <p className="text-sm text-slate-400 mb-4">
          Check live field conditions before you drive, or browse gear picked for Utah terrain.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/weather"
            className="text-sm font-medium bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg transition-colors"
          >
            &#127964; Field Conditions &rarr;
          </Link>
          <Link
            to="/category/rock-hammers"
            className="text-sm font-medium border border-amber-700 text-amber-400 hover:bg-amber-900/30 px-4 py-2 rounded-lg transition-colors"
          >
            Browse Gear &rarr;
          </Link>
          <Link
            to="/guides/utah-sites-map"
            className="text-sm font-medium border border-amber-700 text-amber-400 hover:bg-amber-900/30 px-4 py-2 rounded-lg transition-colors"
          >
            &#128205; Site Map
          </Link>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="mt-12">
          <h3 className="text-lg font-bold text-slate-100 mb-4">More Guides</h3>
          <div className="space-y-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="flex items-center justify-between bg-slate-800 border border-slate-700 hover:border-amber-500 rounded-xl px-5 py-4 transition-colors group"
              >
                <div>
                  <p className="font-semibold text-slate-100 group-hover:text-amber-400 transition-colors text-sm">
                    {p.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{p.readTime}</p>
                </div>
                <span className="text-amber-400 text-sm">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
