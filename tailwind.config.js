/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                burtons: ['burtons', 'ui-serif', 'Georgia', 'serif'],
            },
            colors: {}
        },
    },
    plugins: [require('@tailwindcss/typography')],
}