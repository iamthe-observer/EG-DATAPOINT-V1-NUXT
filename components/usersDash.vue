<template>
	<div class="__people col-span-3 row-span-8 p-2">
		<span class="absolute -top-[1rem] left-2 text-neutral-300 text-sm uppercase">Most Recent Applicants</span>

		<div class="w-full h-full carousel carousel-vertical dark:shadow-xl rounded-xl carousel-center gap-2">

			<div class="w-full h-full grid place-items-center dark:bg-neutral-100"
				v-if="!role && recent_apls.length == 0">
				<div class="flex flex-col items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-20 aspect-square" viewBox="0 0 24 24">
						<g stroke="#888888" stroke-linecap="round" stroke-width="2">
							<path fill="#888888" fill-opacity="0" stroke-dasharray="60" stroke-dashoffset="60"
								d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z">
								<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0" />
								<animate fill="freeze" attributeName="fill-opacity" begin="1.2s" dur="0.15s"
									values="0;0.3" />
							</path>
							<path fill="none" stroke-dasharray="14" stroke-dashoffset="14"
								d="M8 16C8.5 15 9.79086 14 12 14C14.2091 14 15.5 15 16 16">
								<animate fill="freeze" attributeName="stroke-dashoffset" begin="1s" dur="0.2s"
									values="14;0" />
							</path>
						</g>
						<g fill="#888888" fill-opacity="0">
							<ellipse cx="9" cy="9.5" rx="1" ry="1.5">
								<animate fill="freeze" attributeName="fill-opacity" begin="0.6s" dur="0.2s"
									values="0;1" />
							</ellipse>
							<ellipse cx="15" cy="9.5" rx="1" ry="1.5">
								<animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.2s"
									values="0;1" />
							</ellipse>
						</g>
					</svg>
					<span class="text-center">No recent <br />Applicants</span>
				</div>
			</div>

			<div v-if="!role && recent_apls.length != 0" v-for="(apl, idx) in recent_apls"
				class="carousel-container dark:bg-neutral-50 bg-neutral-800 grid place-items-center">
				<div class="relative w-full h-full flex flex-col items-center">
					<span class="badge badge-secondary dark:badge-accent absolute top-1 right-1">#{{ idx + 1 }}</span>

					<div class="flex flex-col justify-center items-center pt-5">

						<div class="avatar pt-5 justify-start">
							<div class="w-32 rounded-full justify-center">
								<img loading="lazy" v-if="URLs?.length! > 0" class=""
									:src="URLs![idx].signedUrl !== null ? URLs![idx].signedUrl : '/svg/image.svg'" />
							</div>
						</div>
						<p class="font-bold pt-4 text-sm text-center justify-end">{{ apl.fullName }}</p>

						<p class="font-normal text-neutral-400 text-xs dark:text-neutral-600">{{ apl.pcontact }}</p>

						<p class="font-normal text-neutral-400 text-xs dark:text-neutral-600">{{
							useNuxtApp().$formatDateTime(new
								Date(apl.created_at!)) }}
						</p>
					</div>

					<div class="flex absolute bottom-1 left-1 justify-center pt-5 gap-1 items-center">
						<button
							@click="() => { $router.push(`/applicant/${apl.apl_id}`); useViewAplStore().setID(apl.apl_id!) }"
							class="btn btn-sm btn-primary mr-3 rounded-full">View</button>
						<span class="flex gap-1 dark:font-semibold">
							<SvgsCedis class="w-2 fill-white dark:fill-neutral-900" />{{ apl.totalPayment }}.00
						</span>
					</div>
				</div>
			</div>

			<!-- ADMIN SIDE -->
			<div class="w-full h-full bg-neutral-800 dark:bg-neutral-50 grid place-items-center"
				v-if="role && recent_apls_admin.length == 0">
				<div class="flex flex-col items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-20 aspect-square" viewBox="0 0 24 24">
						<g stroke="#888888" stroke-linecap="round" stroke-width="2">
							<path fill="#888888" fill-opacity="0" stroke-dasharray="60" stroke-dashoffset="60"
								d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z">
								<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0" />
								<animate fill="freeze" attributeName="fill-opacity" begin="1.2s" dur="0.15s"
									values="0;0.3" />
							</path>
							<path fill="none" stroke-dasharray="14" stroke-dashoffset="14"
								d="M8 16C8.5 15 9.79086 14 12 14C14.2091 14 15.5 15 16 16">
								<animate fill="freeze" attributeName="stroke-dashoffset" begin="1s" dur="0.2s"
									values="14;0" />
							</path>
						</g>
						<g fill="#888888" fill-opacity="0">
							<ellipse cx="9" cy="9.5" rx="1" ry="1.5">
								<animate fill="freeze" attributeName="fill-opacity" begin="0.6s" dur="0.2s"
									values="0;1" />
							</ellipse>
							<ellipse cx="15" cy="9.5" rx="1" ry="1.5">
								<animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.2s"
									values="0;1" />
							</ellipse>
						</g>
					</svg>
					<span class="text-center">No recent <br />Applicants</span>
				</div>
			</div>

			<div v-if="role && recent_apls_admin.length != 0" v-for="(apl, idx) in recent_apls_admin"
				class="carousel-container bg-neutral-800 dark:bg-neutral-50 grid place-items-center">
				<div class="relative w-full h-full">
					<span class="badge badge-secondary dark:badge-accent absolute top-1 right-1">#{{ idx + 1 }}</span>

					<div class="flex flex-col justify-center items-center pt-5">

						<div class="avatar pt-5 justify-start">
							<div class="w-32 rounded-full justify-center">
								<img loading="lazy" v-if="URLs?.length! > 0" class=""
									:src="URLs![idx].signedUrl !== null ? URLs![idx].signedUrl : '/svg/image.svg'" />
							</div>
						</div>
						<p class="font-semibold pt-4 text-sm text-center justify-end">{{ apl.fullName }}</p>

						<p class="font-normal text-neutral-400 text-xs dark:text-neutral-600">{{ apl.pcontact }}</p>

						<p class="font-normal text-neutral-400 text-xs dark:text-neutral-600">{{
							useNuxtApp().$formatDateTime(new
								Date(apl.created_at!)) }}
						</p>

						<p class="font-normal text-neutral-400 text-xs dark:text-neutral-600">By: {{
							profiles.find(user => user.id ==
								apl.user_id)!.fullname ||
							'User'
						}}
						</p>
					</div>

					<div class="flex absolute bottom-1 left-1 justify-center pt-5 gap-1 items-center">
						<button
							@click="() => { $router.push(`/applicant/${apl.apl_id}`); useViewAplStore().setID(apl.apl_id!) }"
							class="btn btn-sm btn-primary mr-3 rounded-lg">View</button>
						<span class="flex gap-1 dark:font-semibold">
							<SvgsCedis class="w-2 fill-white dark:fill-neutral-900" />{{ apl.totalPayment }}.00
						</span>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app';
import { useProfileStore } from '@/store/profile';
import { useViewAplStore } from '@/store/viewApl';

const { role, profiles } = storeToRefs(useProfileStore())

const loading = ref(false)
const { total_daily_applicants, total_apls } = storeToRefs(useAppStore())

const path = computed(() => {
	if (useNuxtApp().$sortByRecency(total_daily_applicants.value).length >= 5) {
		return useNuxtApp().$sortByRecency(total_daily_applicants.value).map(apl => apl.aplImg_path.primePath[0]).slice(0, 5)
	} else {
		return useNuxtApp().$sortByRecency(total_daily_applicants.value).map(apl => apl.aplImg_path.primePath[0])
	}
})
const path_all = computed(() => {
	return useNuxtApp().$sortByRecency(total_daily_applicants.value).map(apl => apl.aplImg_path.primePath[0])
})

const path_admin = computed(() => {
	if (total_apls.value.length >= 5) {
		return useNuxtApp().$sortByRecency(total_apls.value).map(apl => apl.aplImg_path.primePath[0]).slice(0, 5)
	} else {
		return useNuxtApp().$sortByRecency(total_apls.value).map(apl => apl.aplImg_path.primePath[0])
	}
})

const URLs = ref<{
	error: string | null;
	path: string | null;
	signedUrl: string;
}[] | null | undefined>()

onBeforeMount(async () => {
	await loadUrls()
})

async function loadUrls() {
	loading.value = true
	try {
		const APLS = await useAppStore().getTotalApls()

		if (!role.value) {
			if (total_daily_applicants.value.length == 0) return
			let { data, error } = await useNuxtApp().$SB.storage.from('applicants').createSignedUrls(path.value, 10)
			let { data: data_all, error: err } = await useNuxtApp().$SB.storage.from('applicants').createSignedUrls(path_all.value, 10)
			// console.log(data);

			if (error) throw error
			if (err) throw err
			loading.value = false
			URLs.value = data

			useAppStore().$patch({
				daily_urls: data_all
			})
			// console.log(URLs.value);
		} else if (role.value) {
			if (APLS!.length == 0) return
			let { data, error } = await useNuxtApp().$SB.storage.from('applicants').createSignedUrls(path_admin.value, 10)
			// console.log(data);

			if (error) throw error
			loading.value = false
			URLs.value = data
			// console.log(URLs.value);
		}
	} catch (error) {
		console.log(error);
		loading.value = false
	}

}

const recent_apls = computed(() => {
	if (total_daily_applicants.value.length > 0) {
		return useNuxtApp().$sortByRecency(total_daily_applicants.value).slice(0, 5)

	} else {
		return []
	}
})

const recent_apls_admin = computed(() => {
	if (total_apls.value) {
		return useNuxtApp().$sortByRecency(total_apls.value).slice(0, 5)

	} else {
		return []
	}
})

</script>

<style scoped>
.carousel-container {
	@apply carousel-item w-[100%] h-full rounded-xl;
}
</style>