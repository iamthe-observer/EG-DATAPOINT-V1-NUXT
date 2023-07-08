// import { resolve } from 'path'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', '@nuxtjs/supabase', '@pinia/nuxt'],
  alias: {
    // old way of doing it
    // '@': resolve(__dirname, '/'),

    // new way
    assets: '<rootDir>/assets',
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', '~/assets/css/fonts.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
