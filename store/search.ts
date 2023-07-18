import { defineStore } from 'pinia'
import { useAppStore } from './app'
import { useStorage } from '@vueuse/core'

export interface SearchParams {
  fullName: string | undefined
  apl_id: string | undefined
}

export const useSearchStore = defineStore('search', () => {
  async function getSearch(search: string) {
    const data = await useAppStore().getTotalApls()
    return data!.filter(apl => apl.fullName?.includes(search))
  }

  const recent_search = ref(useStorage<SearchParams[] | null>('search', []))

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
  }
})
