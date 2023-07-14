/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: colors.orange,
      slate: colors.slate,
      red: colors.red,
      gray: colors.gray,
      stone: colors.stone,
      white: colors.white,
    },
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
};
