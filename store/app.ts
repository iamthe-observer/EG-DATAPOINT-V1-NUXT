import { Applicant } from '@/interfaces/interfaces'
import { Prices } from '@/supabase/supabase'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const { $SB, $formatDate } = useNuxtApp()

  const all_my_apls = ref<Applicant[]>([])
  const total_apls = ref<Applicant[]>([])
  const prices = ref<Prices[]>([])
  const app_loading = ref(false)

  function setAppLoading(val: boolean) {
    app_loading.value = val
  }

  async function getAllMyApls() {
    try {
      let { data, error } = await $SB
        .from('applicants')
        .select('*')
        .eq('user_id', useSupabaseUser().value?.id)

      if (error) throw error
      all_my_apls.value = data!
      // console.log(data)
      return data
    } catch (err: any) {
      console.log(err)
    }
  }

  async function getTotalApls() {
    try {
      let { data, error } = await $SB.from('applicants').select('*')

      if (error) throw error
      total_apls.value = data!
      return data
    } catch (err: any) {
      console.log(err)
    }
  }

  async function getPrices() {
    try {
      let { data, error } = await $SB.from('prices').select('*')

      if (error) throw error
      prices.value = data!
      return data
    } catch (err: any) {
      console.log(err)
    }
  }

  const total_daily_applicants = computed(() => {
    return all_my_apls.value?.filter(
      apl => $formatDate(new Date(apl.created_at!)) == $formatDate(new Date())
    )
  })

  // real-time channels
  $SB
    .channel('applicants-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'applicants' },
      async payload => {
        await getAllMyApls()
      }
    )
    .subscribe()

  $SB
    .channel('prices-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'prices' },
      async payload => {
        await getPrices()
      }
    )
    .subscribe()

  return {
    all_my_apls,
    total_apls,
    total_daily_applicants,
    app_loading,
    prices,
    getAllMyApls,
    getTotalApls,
    setAppLoading,
    getPrices,
  }
})
