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
                burtons: ['../src/assets/fonts/Burtons.otf']
            },
            colors: {
                provocative: {
                    primary: '#FF6B6B',
                    secondary: '#4ECDC4',
                    accent: '#FFD166',
                    dark: '#1A1A1D',
                    light: '#F7F7F7'
                }
            }
        },
    },
    plugins: [require('@tailwindcss/typography')],
}