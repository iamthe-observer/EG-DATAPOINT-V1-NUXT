<template>
  <div class="h-screen bg-neutral-900 text-white">
    <div v-if="!app_loading" class="w-full h-full grid place-items-center">
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

const { $SB } = useNuxtApp()
const { app_loading } = storeToRefs(useAppStore())

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
})
</script>