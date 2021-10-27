const colors = require("tailwindcss/colors")

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      // Build your palette here
      transparent: "transparent",
      current: "currentColor",
      blue: colors.sky,
      black: colors.black,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      white: colors.white,
      yellow: colors.amber,
      purple: colors.purple,
    },
  },
  variants: {
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["checked"],
      inset: ["checked"],
      zIndex: ["hover", "active"],
    },
    margin: ["responsive", "hover"],
    padding: ["responsive", "hover"],
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
}
