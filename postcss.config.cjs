/** @type {import('postcss-load-config').Config} */
module.exports = (ctx) => {
  // Only run Tailwind on the source file — not on pre-built output.css
  const isTailwindSource = ctx.file?.includes('input.css');

  return {
    plugins: isTailwindSource
      ? { tailwindcss: { config: './tailwind.config.js' } }
      : {},
  };
};
