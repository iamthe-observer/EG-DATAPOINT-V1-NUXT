import { Requests } from 'interfaces/interfaces'
import { defineStore } from 'pinia'

export const useRequestStore = defineStore('requests', () => {
  const requests = ref<Requests[]>([])
  const curr_request = ref<Requests>()
  const { $SB: SB } = useNuxtApp()

  async function getRequests() {
    try {
      let { data, error } = await SB.from('requests')
        .select('*')
        .eq('user_id', useSupabaseUser().value?.id!)
      if (error) throw error
      requests.value = data!
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async function sendRequest(request: Requests) {
    try {
      let { data, error } = await SB.from('requests').insert([request]).select()
      if (error) throw error
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async function setRequest(req: Requests) {
    curr_request.value = req
  }

  useNuxtApp()
    .$SB.channel('applicants-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'requests' },
      async payload => {
        await getRequests()
      }
    )
    .subscribe()

  return {
    getRequests,
    sendRequest,
    curr_request,
    setRequest,
    requests,
  }
})
