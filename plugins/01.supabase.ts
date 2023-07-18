import { Database } from '@/supabase/supabase'

export default defineNuxtPlugin(nuxtApp => {
  const supabase = useSupabaseClient<Database>()
  return {
    provide: {
      SB: supabase,
    },
  }
})
