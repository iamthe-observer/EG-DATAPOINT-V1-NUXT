import { useAppStore } from '@/store/app'
import { setupCalendar, Calendar, DatePicker } from 'v-calendar'
import 'v-calendar/style.css'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(setupCalendar, {})
  nuxtApp.vueApp.component('VCalendar', Calendar)
  nuxtApp.vueApp.component('DatePicker', DatePicker)

  const { $router, _route } = useNuxtApp()

  const onInitLoadAppData = async () => {
    try {
      let currentSession = await useSupabaseClient().auth.getSession()
      console.log(currentSession.data)

      if (currentSession.data.session == null) {
        throw currentSession.error
      } else {
        let {
          data: { user },
        } = await useSupabaseClient().auth.getUser()
        useAppStore().logged = true

        if (_route.path == '/') {
          $router.push('/dashboard')
        }
        return user
      }
    } catch (error) {
      $router.push('/')
      console.log(error)
    }
  }

  const loadAppData = async () => {
    // app_loading.value = true
    // set(app_loading, true)
    try {
      let currentSession = await useSupabaseClient().auth.getSession()
      console.log(currentSession.data)

      if (currentSession.data.session == null) {
        throw currentSession.error
      } else {
        let {
          data: { user },
        } = await useSupabaseClient().auth.getUser()
        useAppStore().logged = true

        return user
      }
      // let active_profile = await useProfileStore().getUserProfileByUserId(id)
      // useProfileStore().setActiveProfile(active_profile?.data!)

      // let [ann] = await Promise.allSettled([
      // 	useAnnStore().getAnnouncements(),
      // 	useProfileStore().getUserProfiles(),
      // 	active_profile?.data![0].role
      // 		? useRequestStore().getRequestsById(id)
      // 		: useRequestStore().getAllRequests(),
      // 	useDashStore().getSupervisorData(),
      // 	!active_profile?.data![0].role ? useAppStore().getUserSignIns() : null,
      // ])

      // @ts-ignore
      // useAnnStore().setAnnouncements(ann?.value!.data)
      // set(logged, true)
      // set(app_loading, false)
      // logged.value = true;
      // app_loading.value = false;
      // await dailySignIn(role.value)
      // set(app_loading, false)
      // set(logged, false)
      // app_loading.value = false;
      // logged.value = false;
    } catch (error) {
      $router.push('/')
      console.log(error)
    }
  }

  return {
    provide: {
      loadAppData,
      onInitLoadAppData,
    },
  }
})
