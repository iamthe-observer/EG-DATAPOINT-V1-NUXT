<template>
	<div class="__people col-span-3 row-span-8 p-2">

		<div class="w-full h-full carousel carousel-vertical rounded-xl carousel-center gap-2">

			<div v-for="(apl, idx) in recent_apls" class="carousel-container bg-neutral-800 grid place-items-center">
				<div class="relative w-full h-full flex flex-col items-center">
					<span class="badge badge-secondary absolute top-0 right-0">#{{ idx + 1 }}</span>
					<div class="avatar pt-5 justify-start">
						<div
							class="w-32 rounded-full ring ring-[rgba(0,0,0,.4)] ring-offset-neutral-800 ring-offset-2 justify-center">
							<img v-if="URLs?.length! > 0" class="" :src="URLs ? URLs[idx].signedUrl : ''" />
						</div>
					</div>
					<p class="font-bold pt-4 text-sm justify-end">{{ apl.fullName }}</p>

					<p class="font-bold text-xs">{{ apl.pcontact }}</p>

					<div class="flex absolute bottom-0 left-0 justify-center pt-5 gap-1 items-center">
						<button @click="$router.push(`/applicant/${apl.apl_id}`)"
							class="btn btn-primary mr-3 rounded-2xl">View</button>
						<span class="flex gap-1">
							<SvgsCedis class="w-2 fill-white" />{{ apl.totalPayment }}.00
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
import { useAplStore } from 'store/apl';

const { all_my_apls } = storeToRefs(useAppStore())

const paths = computed(() => {
	return all_my_apls.value.map(apl => apl.aplImg_path.primePath[0])
})

const URLs = ref<{
	error: string | null;
	path: string | null;
	signedUrl: string;
}[] | null | undefined>()

onMounted(async () => {
	let data = await useAppStore().getAllMyApls()
	try {
		let { data, error } = await useNuxtApp().$SB.storage.from('applicants').createSignedUrls(paths.value, 10)
		if (error) throw error
		URLs.value = data
		console.log(URLs.value);
	} catch (error) {

	}
})

async function getURLs() {
	try {
		let { data, error } = await useNuxtApp().$SB.storage.from('applicants').createSignedUrls(paths.value, 10)
		return data
	} catch (error) {

	}
}

const recent_apls = computed(() => {
	if (all_my_apls.value) {
		return all_my_apls.value.slice(-5)
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