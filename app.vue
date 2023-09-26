<template>
  <div class="h-screen bg-neutral-900 text-white dark:bg-neutral-200 dark:text-neutral-900 relative">
    <div v-if="app_loading" class="w-full h-full grid place-items-center bg-neutral-900 dark:bg-neutral-50">
      <Loading />
    </div>
    <NuxtLayout v-else>
      <NuxtPage />
    </NuxtLayout>

    <NotifService />
  </div>
</template>

<script setup lang="ts">
import { useAplStore } from '@/store/apl';
import { useAppStore } from '@/store/app';
import { useAnnStore } from '@/store/announce';
import { useProfileStore } from '@/store/profile';
import { useRequestStore } from '@/store/requests';
import { useTasksStore } from '@/store/tasks';
import { storeToRefs } from 'pinia';

useServerSeoMeta({
  title: 'Ebbysgold Group Datapoint',
  ogTitle: 'Ebbysgold Group Datapoint',
  description: 'Welcome! and Enjoy your stay with us!',
  ogDescription: 'Welcome! and Enjoy your stay with us!',
})

// document.body.style
const { $SB } = useNuxtApp()
const { app_loading, is_mobile } = storeToRefs(useAppStore())
const { $router, _route } = useNuxtApp()
const app = useAppStore()

$SB.auth.onAuthStateChange((event: string) => {
  if (event === 'SIGNED_OUT') {
    useAplStore().resetAplData()
    $router.push('/')
  }
})

// onMounted(async () => {
//   let { data: circle_sales } = await $SB.from('applicants').select('totalPayment').eq('location', 'circle')
//   let { data: kaneshie_sales } = await $SB.from('applicants').select('totalPayment').eq('location', 'kaneshie')
//   let { data: ashaiman_sales } = await $SB.from('applicants').select('totalPayment').eq('location', 'ashaiman')

//   let data = [...circle_sales!, ...kaneshie_sales!, ...ashaiman_sales!]

//   let sum = 0
//   for (let ii = 0; ii < data.length; ii++) {
//     const sales = data[ii].totalPayment;
//     sum += sales
//   }
//   console.log(sum);


// })

const onInitLoadAppData = async () => {
  app.$patch({
    app_loading: true
  })

  try {
    let currentSession = await $SB.auth.getSession();
    console.log(currentSession.data.session);

    if (currentSession.data.session == null) {
      throw currentSession.error;
    } else {
      let {
        data: { user },
      } = await $SB.auth.getUser();


      let { data } = await $SB.from('restricted_users').select('*')
      if (data?.some(USER => USER.user_id == user?.id)) {
        await $SB.auth.signOut()
        $router.push('/')
        return app.$patch({ restricted_user: true })
      } else {
        app.$patch({ restricted_user: false })
      }

      let { data: DATA } = await $SB.from('profiles').select('*').eq('id', user?.id)
      if (!DATA![0].role && useNuxtApp().$mobileCheck()) {
        alert('Open site on a computer to continue!...')
        await $SB.auth.signOut()
        return $router.push('/')
      }
      const promises = await Promise.allSettled([
        useProfileStore().getProfile(),
        useProfileStore().getProfiles(),
        useAppStore().getTotalApls(),
        useAppStore().getPrices(),
        useAnnStore().getAnnounce(),
        useRequestStore().getRequests(),
        useTasksStore().getTasks(),
      ])

      // @ts-ignore
      let values = promises.filter(val => val.status == 'fulfilled').map(val => val.value);

      if (values.length == promises.length) {
        if (useProfileStore().profile!.role && useNuxtApp().$mobileCheck()) {
          $router.push("/analytics");
        } else if (_route.path == '/') {
          $router.push("/dashboard");
        }

        await $SB.auth.startAutoRefresh();
        app.$patch({
          app_loading: false
        })
        return user;
      }
    }
  } catch (error) {
    $router.push("/");
    console.log(error);
    app.$patch({
      app_loading: false
    })
  }
  finally {
    app.$patch({
      app_loading: false,
    });
  }
};

onMounted(async () => {
  document.documentElement.setAttribute('data-theme', 'EG')
  await onInitLoadAppData()
  useAppStore().$patch({
    dark_mode: useProfileStore().profile?.is_dark
  })

  useAppStore().$patch({
    is_mobile: useNuxtApp().$mobileCheck()
  })
})
</script>