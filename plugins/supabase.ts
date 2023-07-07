export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      SB: useSupabaseClient(),
    },
  }
})
