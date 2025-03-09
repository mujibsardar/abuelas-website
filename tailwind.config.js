/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  important: false,
  content: [
    "./index.html",
    "./index.js",
    "./tailwind-css/**/*.{js,html}",
    "./css/**/*.{js,html}",
    "./assets/**/*.{js,html}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#BFFE66",
        secondary: "#BDB8FF",
      },
    },
  },
  plugins: [],
};
