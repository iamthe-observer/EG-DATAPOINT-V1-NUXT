import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const logged = ref<boolean>(false)

  return {
    logged,
  }
})
