export default defineNuxtConfig({
  plugins: [{ src: "~/plugins/dragscroll", ssr: false }],
  modules: ["@vueuse/nuxt", "@nuxtjs/supabase", "@pinia/nuxt"],
  alias: {
    assets: "<rootDir>/assets",
  },
  devtools: { enabled: false },
  css: ["~/assets/css/main.css", "~/assets/css/fonts.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
