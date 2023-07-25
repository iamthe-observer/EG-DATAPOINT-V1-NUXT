import { defineStore } from 'pinia'
import { useAppStore } from './app'
import { useStorage } from '@vueuse/core'

export interface SearchParams {
  fullName: string | undefined
  apl_id: string | undefined
}

export const useSearchStore = defineStore('search', () => {
  const if_search = ref(false)
  const recent_search = ref(useStorage<SearchParams[] | null>('search', []))

  async function getSearch(search: string) {
    const data = await useAppStore().getTotalApls()
    return data!.filter(apl => apl.fullName?.includes(search))
  }

  function setIfSearch(val: boolean) {
    if_search.value = val
  }

  function clearRecentSearch() {
    recent_search.value = []
  }

  const resetRecentSearch = () => {
    recent_search.value = []
  }

  const setRecentSearch = (inp: SearchParams) => {
    let isIn = recent_search.value?.find(x => x.apl_id == inp.apl_id)

    if (recent_search.value!.length > 4) {
      recent_search.value?.unshift(inp)
      recent_search.value?.splice(-1, 1)
    } else if (!isIn) {
      recent_search.value?.unshift(inp)
    }
  }

  return {
    recent_search,
    resetRecentSearch,
    setRecentSearch,
    getSearch,
    clearRecentSearch,
    if_search,
    setIfSearch,
  }
})
