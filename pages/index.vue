<template>
	<div v-if="!useAppStore().is_mobile"
		class="w-full h-full flex justify-between p-7 relative bg-neutral-90 overflow-hidden">
		<div class="absolute inset-0">
			<img :style="layer0" ref="img" src="../assets/images/login2.png" alt="" class="object-cover w-full h-full">
			<!-- <img src="../assets/images/login.jpg" alt="" class="object-cover w-full h-full"> -->
		</div>

		<AuthLogin @login="loadAppData" class="__login opacity-100 z-10" />
	</div>

	<div class="w-full h-full flex justify-center items-center p-7 relative" v-else>
		<AuthLogin @login="loadAppData" class="__login opacity-100 z-10" />
	</div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app';
import { useAnnStore } from '@/store/announce';
import { useProfileStore } from '@/store/profile';
import { useRequestStore } from '@/store/requests';
import { useTasksStore } from '@/store/tasks';

const { $router, $SB, _route } = useNuxtApp()
const img = ref()
const { roll, tilt } = useParallax(img)

const layer0 = computed(() => ({
	// transform: `translateX(${tilt.value * 10}px) translateY(${roll.value * 10
	// 	}px) scale(1.33)`,
	transform: `rotateX(${roll.value * 20}deg) rotateY(${tilt.value * 20
		}deg) translateX(${tilt.value * 10}px) translateY(${roll.value * 10
		}px) scale(1.33)`,
}))

definePageMeta({
	layout: 'auth',
	// middleware: 'auth'
})

const loadAppData = async () => {
	const app = useAppStore();
	app.$patch({
		app_loading: true,
	});

	try {
		let currentSession = await $SB.auth.getSession();

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


			let { data: DATA } = await $SB.from('profiles').select('*').eq('id', useSupabaseUser().value?.id)
			if (!DATA![0].role && useNuxtApp().$mobileCheck()) {
				alert('Open site on a computer to continue!...')
				await $SB.auth.signOut()
				return useNuxtApp().$router.push('/')
			}

			const promises = await Promise.allSettled([
				useProfileStore().getProfile(),
				useProfileStore().getProfiles(),
				useAppStore().getTotalApls(),
				useAppStore().getPrices(),
				useAnnStore().getAnnounce(),
				useRequestStore().getRequests(),
				useTasksStore().getTasks(),
			]);

			// @ts-ignore
			let values = promises
				.filter((val) => val.status == "fulfilled")
				.map((val) => val.value);

			if (values.length == promises.length) {
				if (useProfileStore().profile!.role && useNuxtApp().$mobileCheck()) {
					$router.push("/analytics");
				} else {
					$router.push("/dashboard");
				}
				await $SB.auth.startAutoRefresh();
				app.$patch({
					app_loading: false,
				});
				return user;
			}
		}
	} catch (error) {
		$router.push("/");
		console.log(error);
		app.$patch({
			app_loading: false,
		});
	} finally {
		app.$patch({
			app_loading: false,
		});
	}
};

function toRegister() {
	setTimeout(() => {
		gsap.to('.r-slide', {
			width: 0,
			opacity: 0,
			duration: 1
		})
		gsap.to('.l-slide', {
			width: 400,
			opacity: 1,
			delay: .5,
			duration: 1
		})
		setTimeout(() => {
			gsap.to('.__register', {
				opacity: 1,
				duration: 1
			})
		}, 1000);
	}, 500);

	// @ts-ignore
	gsap.to('.__login', {
		opacity: 0,
		duration: .5
	})
}
function toLogin() {
	setTimeout(() => {
		gsap.to('.r-slide', {
			width: 400,
			opacity: 1,
			delay: .5,
			duration: 1
		})
		gsap.to('.l-slide', {
			width: 0,
			opacity: 0,
			duration: 1
		})
		setTimeout(() => {
			gsap.to('.__login', {
				opacity: 1,
				duration: 1
			})
		}, 1000);
	}, 500);

	// @ts-ignore
	gsap.to('.__register', {
		opacity: 0,
		duration: .5
	})
}

</script>
