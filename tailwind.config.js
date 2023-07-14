/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: colors.indigo,
      slate: colors.slate,
      red: colors.red,
      gray: colors.gray,
      white: colors.white,
    },
  },
  plugins: [],
  darkMode: "class",
};
