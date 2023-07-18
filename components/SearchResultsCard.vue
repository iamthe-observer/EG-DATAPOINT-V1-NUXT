<template>
	<div @click="$router.push(`/database/search/${result.apl_id}`)
		" class="card card-side bg-neutral-800 shadow-xl w-[60%]">
		<figure class="p-2 max-h-full aspect-square"><img class="border-2 border-white w-36 h-36 rounded-xl" :src="image"
				alt="Movie" />
		</figure>
		<div class="card-body p-2" @click="$emit('recentSearch', rSearchParams)">
			<h2 class="card-title">{{ result.fullName }}</h2>
			<p>{{ $formatDate(new Date(result.pdob!)) }}</p>
			<p>{{ result.pconf_code ? result.pconf_code : 'No Confirmation Code' }}</p>
			<div class="card-actions justify-end">
				<button class="">Created At: {{ $formatDateWords(new Date(result.created_at!)) }}</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Applicant, SearchParams } from '@/interfaces/interfaces';
import { asyncComputed } from '@vueuse/core'

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
	console.log(props.result);

	try {
		const { data, error } = await $SB
			.storage
			.from('applicants')
			.createSignedUrls([props.result.aplImg_path.primePath[0]], 3600)

		console.log(data);
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