/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "main-gradient":
          "conic-gradient(from 45deg, rgba(255, 255, 255, 1.0),  rgba(223, 211, 255, 1.0))",
        "calc-gradient":
          "conic-gradient(from 45deg, rgba(255, 255, 255, 1.0), rgba(211, 252, 255, 1.0))",
      },
      boxShadow: {
        customShadow:
          "rgba(0, 0, 0, 0.12) 0px 0px 2px 0px, rgba(0, 0, 0, 0.14) 0px 2px 4px 0px",
      },
    },
  },
  plugins: [],
};
