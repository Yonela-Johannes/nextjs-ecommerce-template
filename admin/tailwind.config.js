/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#254441",
        primary_alt: "#76949F",
        secondary: "#321325",
        tertiary: "#5E4352",
        bg: "#FFC9DB",
        text_primary: "#fff",
      }
    },
  },
  plugins: [],
}
