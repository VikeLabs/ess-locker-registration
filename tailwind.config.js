/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Sofia Sans", "sans-serif"],
      serif: ["serif"],
    },
    extend: {},
  },
  plugins: [],
};
