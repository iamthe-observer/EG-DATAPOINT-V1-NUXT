import { Announcement } from './../interfaces/interfaces'
import { defineStore } from 'pinia'

export const useAnnStore = defineStore('announcements', () => {
  const announcements = ref<Announcement[]>([])
  const { $SB } = useNuxtApp()

  async function getAnnounce() {
    try {
      let { data, error } = await useNuxtApp()
        .$SB.from('announcements')
        .select('*')
      if (error) throw error
      announcements.value = data!
    } catch (error) {
      console.log(error)
    }
  }

  function resetAnnouncements() {
    announcements.value = []
  }

  $SB
    .channel('prices-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'announcements' },
      async payload => {
        await getAnnounce()
      }
    )
    .subscribe()

  return {
    getAnnounce,
    announcements,
    resetAnnouncements
  }
})
