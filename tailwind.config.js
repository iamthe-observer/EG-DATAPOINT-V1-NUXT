/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        EG: {
          primary: '#7e22ce',
          secondary: '#eebe3e',
          accent: '#e11d48',
          neutral: '#3f3f3f',
          'base-100': '#1f1f1f',
          info: '#0ea5e9',
          success: '#16a34a',
          warning: '#fde68a',
          error: '#dc2626',
        },
      },
      'wireframe',
    ], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: 'wireframe', // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdf6e3',
          100: '#fceec7',
          200: '#f9e4a7',
          300: '#f5d87f',
          400: '#f1cd5e',
          500: '#eebe3e',
          600: '#d9a32a',
          700: '#b7811d',
          800: '#936215',
          900: '#7a4c0d',
        },
      },
      gridTemplateRows: {
        15: 'repeat(15, minmax(0, 1fr))',
      },
      gridRow: {
        'span-15': 'span 15 / span 15',
        'span-8': 'span 8 / span 8',
        'span-7': 'span 7 / span 7',
      },
      fontFamily: {
        Jost: 'Jost',
        Fredoka: 'Fredoka',
        Lekton: 'Lekton',
        Foldit: 'Foldit',
      },
    },
  },
}
