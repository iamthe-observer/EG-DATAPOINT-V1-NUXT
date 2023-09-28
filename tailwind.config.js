/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        EG: {
          primary: "#7e22ce",
          secondary: "#eebe3e",
          accent: "#e11d48",
          neutral: "#3f3f3f",
          "base-100": "#1f1f1f",
          info: "#0ea5e9",
          success: "#16a34a",
          warning: "#fde68a",
          error: "#dc2626",
        },
      },
      "wireframe",
    ],
    darkTheme: "wireframe",
    base: false,
    styled: true,
    utils: true,
    rtl: false,
    prefix: "",
    logs: true,
  },
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fdf6e3",
          100: "#fceec7",
          200: "#f9e4a7",
          300: "#f5d87f",
          400: "#f1cd5e",
          500: "#eebe3e",
          600: "#d9a32a",
          700: "#b7811d",
          800: "#936215",
          900: "#7a4c0d",
        },
      },
      gridTemplateRows: {
        15: "repeat(15, minmax(0, 1fr))",
      },
      gridRow: {
        "span-15": "span 15 / span 15",
        "span-8": "span 8 / span 8",
        "span-7": "span 7 / span 7",
      },
      fontFamily: {
        Urbanist: "Urbanist",
        SpaceMono: "Space Mono",
        KumorOne: "Kumar One Outline",
        Jura: "Jura",
        Tourney: "Tourney",
      },
      boxShadow: {
        "neo-box": "8px 8px 0px #000",
      },
    },
  },
};
