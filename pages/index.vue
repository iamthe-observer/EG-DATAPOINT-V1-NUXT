<template>
	<div v-if="!useAppStore().is_mobile" class="w-full h-full flex justify-between p-7 relative">
		<!-- <Planet /> -->
		<div class="absolute bg- inset-0 my-7 mx-7">
			<div class="w-full h-full flex relative">
				<div class="l-slide bg-white w-[00px] rounded-2xl relative"></div>
				<div class="flex-1 rounded-2xl bg-black1 relative">
					<!-- <span class="z-[500] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem]">
						<span class="text-primary font-Foldit">Ebbysgold</span>
						<br />
						<span class="text-secondary font-Foldit">Datapoint</span>
					</span> -->
				</div>
				<div class="r-slide w-[400px] rounded-2xl backdrop-blur-xl bg-black bg-opacity-20"></div>
			</div>
		</div>
		<AuthRegister @toLogin="toLogin" class="__register opacity-0 z-10" />
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
			if (data?.some(USER => USER.user_id == user?.id)) return app.$patch({ restricted_user: true })


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
