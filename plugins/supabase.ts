export default defineNuxtPlugin(nuxtApp => {
  const supabase = useSupabaseClient()
  return {
    provide: {
      SB: supabase,
    },
  }
})
