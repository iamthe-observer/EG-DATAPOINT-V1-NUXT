<template>
	<div @click="() => { $router.push(`/applicant/${result.apl_id}`); useViewAplStore().setID(result.apl_id!) }"
		class="card card-side bg-neutral-800 dark:bg-neutral-200 shadow-xl w-[60%] cursor-pointer hover:bg-primary dark:hover:bg-accent transition-all group duration-400 ease-in-out">
		<figure class="p-2 max-h-full aspect-square"><img loading="lazy"
				:class="image ? 'dark:border-none w-40 h-40 rounded-xl dark:shadow-lg' : 'w-36 h-36 rounded-xl'"
				:src="image ? image : '/svg/image.svg'" alt="Movie" />
		</figure>
		<div class="card-body p-2 dark:hover:text-white" @click="$emit('recentSearch', rSearchParams)">
			<h2 class="card-title">{{ result.fullName }}</h2>
			<p>{{ result.pcontact }}</p>
			<p>{{ $formatDate(new Date(result.pdob!)) }}</p>
			<p>{{ result.pconf_code ? result.pconf_code : 'No Confirmation Code' }}</p>
			<div class="card-actions flex flex-col gap-1 items-end justify-end text-neutral-500 text-xs">
				<button class="dark:drop-shadow-lg group-hover:text-white">{{ $formatDateTime(new Date(result.created_at!))
				}}</button>
				<button class="dark:drop-shadow-lg group-hover:text-white">{{ $formatDateWords(new Date(result.created_at!))
				}}</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Applicant, SearchParams } from '@/interfaces/interfaces';
import { asyncComputed } from '@vueuse/core'
import { useViewAplStore } from '@/store/viewApl';

const { $SB } = useNuxtApp()
const props = defineProps<{
	result: Applicant
}>()
const rSearchParams = reactive<SearchParams>({
	fullName: props.result.fullName,
	apl_id: props.result.apl_id,
});

defineEmits(['recentSearch'])

async function loadUrl() {
	try {
		const { data, error } = await $SB
			.storage
			.from('applicants')
			.createSignedUrls([props.result.aplImg_path.primePath[0]], 3600)
		if (error) throw error

		return data[0].signedUrl

	}
	catch (err: any) {
		console.log((err));
	}
}

const image = asyncComputed(async () => {
	return await loadUrl()
})


</script>

<style scoped></style>