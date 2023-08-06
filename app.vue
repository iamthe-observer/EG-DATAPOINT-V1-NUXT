<template>
  <div class="h-screen bg-neutral-900 text-white dark:bg-neutral-200 dark:text-neutral-900">
    <div v-if="!app_loading" class="w-full h-full grid place-items-center bg-neutral-900 dark:bg-neutral-50">
      <Loading />
    </div>
    <NuxtLayout v-else>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useAplStore } from '@/store/apl';
import { useAppStore } from '@/store/app';
import { storeToRefs } from 'pinia';

useServerSeoMeta({
  title: 'Ebbysgold Group Datapoint',
  ogTitle: 'Ebbysgold Group Datapoint',
  description: 'Welcome! and Enjoy your stay with us!',
  ogDescription: 'Welcome! and Enjoy your stay with us!',
})

// document.body.style
const { $SB } = useNuxtApp()
const { app_loading, dark_mode } = storeToRefs(useAppStore())

const { $onInitLoadAppData, $router } = useNuxtApp()

$SB.auth.onAuthStateChange((event: string) => {
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
  document.documentElement.setAttribute('data-theme', 'EG')
})
</script>