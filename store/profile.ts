import { Profile } from '@/interfaces/interfaces'
import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<Profile>()
  const { $SB, $curr_session: sesh } = useNuxtApp()

  async function getProfile() {
    try {
      let { data, error } = await useNuxtApp()
        .$SB.from('profiles')
        .select('*')
        .eq('id', sesh.value.user.id.toString())
      if (error) throw error
      profile.value = data![0]
      console.log(profile.value)
      return data!
    } catch (error) {
      console.log(error)
    }
  }

  return {
    getProfile,
    profile,
  }
})
