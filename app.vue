<template>
  <div class="h-screen bg-neutral-900 text-white">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useAplStore } from '@/store/apl';

const { $onInitLoadAppData, $router } = useNuxtApp()

useSupabaseClient().auth.onAuthStateChange((event: string) => {
  if (event === 'SIGNED_OUT') {
    // set(logged, false)
    // profileStore.reset()
    // useSearchStore().resetRecentSearch()
    // useDashStore().reset()
    // useAnnStore().reset()
    // useRequestStore().reset()

    useAplStore().resetAplData()
    $router.push('/')
  }
})

onMounted(async () => {
  await $onInitLoadAppData()
})
</script>