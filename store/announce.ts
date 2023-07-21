import { Announcement } from './../interfaces/interfaces'
import { defineStore } from 'pinia'

export const useAnnStore = defineStore('announcements', () => {
  const announcements = ref<Announcement[]>([])

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

  return {
    getAnnounce,
    announcements,
  }
})
