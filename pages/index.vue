<template>
	<div class="w-full h-full flex justify-between p-7 relative">
		<div class="absolute bg- inset-0 my-7 mx-7">
			<div ref="bg" class="w-full h-full flex relative">
				<div class="l-slide w-[00px] rounded-2xl bg-black1"></div>
				<div class="flex-1 rounded-2xl bg-black"></div>
				<div class="r-slide w-[400px] rounded-2xl bg-black1"></div>
			</div>
		</div>
		<AuthRegister @toLogin="toLogin" ref="register" class="__register opacity-0 z-10" />
		<AuthLogin ref="login" @login="changeBG" class="__login opacity-100 z-10" />
		<!-- <AuthLogin @toRegister="toRegister" ref="login" @login="changeBG" class="__login opacity-100 z-10" /> -->
	</div>
</template>

<script setup lang="ts">
const nxt = useNuxtApp()
definePageMeta({
	layout: 'auth',
})

const register = ref<HTMLDivElement>()
const login = ref<HTMLDivElement>()
const bg = ref<HTMLDivElement>()
const changeBG = async () => {
	const id = await loadAppData()
	console.log(id);
}
const { $gsap } = nxt
function toRegister() {
	setTimeout(() => {
		$gsap.to('.r-slide', {
			width: 0,
			opacity: 0,
			duration: 1
		})
		$gsap.to('.l-slide', {
			width: 400,
			opacity: 1,
			delay: .5,
			duration: 1
		})
		setTimeout(() => {
			$gsap.to('.__register', {
				opacity: 1,
				duration: 1
			})
		}, 1000);
	}, 500);

	$gsap.to('.__login', {
		opacity: 0,
		duration: .5
	})
}
function toLogin() {
	setTimeout(() => {
		$gsap.to('.r-slide', {
			width: 400,
			opacity: 1,
			delay: .5,
			duration: 1
		})
		$gsap.to('.l-slide', {
			width: 0,
			opacity: 0,
			duration: 1
		})
		setTimeout(() => {
			$gsap.to('.__login', {
				opacity: 1,
				duration: 1
			})
		}, 1000);
	}, 500);

	$gsap.to('.__register', {
		opacity: 0,
		duration: .5
	})
}

function onAppLoad() {

}

useSupabaseClient().auth.onAuthStateChange((event: string) => {
	if (event === 'SIGNED_OUT') {
		// logged.value = false;
		// set(logged, false)
		// profileStore.reset()
		// useSearchStore().resetRecentSearch()
		// useDashStore().reset()
		// useAnnStore().reset()
		// useRequestStore().reset()
		nxt.$router.push('/')
	}
})

const loadAppData = async () => {
	// app_loading.value = true
	// set(app_loading, true)
	let currentSession = await useSupabaseClient().auth.getSession()

	if (currentSession) {
		let id = useSupabaseClient().auth.getUser()!
		return id
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
	} else {
		// set(app_loading, false)
		// set(logged, false)
		// app_loading.value = false;
		// logged.value = false;
		router.push({ name: 'Authenticate' })
	}
}
</script>
