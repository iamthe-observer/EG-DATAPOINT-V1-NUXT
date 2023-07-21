<template>
	<div v-if="visible" class="absolute flex w-full h-full inset-0">
		<div class="relative h-full flex-1 bg-gradient-to-b to-[rgba(0,0,0,0.5)] from-black">
			<!-- SearchBar -->
			<form @submit.prevent="startSearch" ref="search_bar"
				class="flex justify-end rounded-xl w-[400px] search_bar bg-neutral-900 absolute z-10 top-5 right-1/2 translate-x-[47.9%] shadow-2xl transition-all duration-300 ease-out">
				<input v-model="search" ref="search_bar_input" type="text" class="flex-1 bg-transparent px-2">
				<div @click.prevent="startSearch" class="w-10 p-2">
					<SvgsSearch class=" w-full h-full aspect-square" />
				</div>
			</form>


			<!-- background -->
			<div class="w-full h-full scrollbar-hidden relative flex justify-center items-center">
				<!-- if no Input -->
				<div v-if="search_results.length == 0" class="flex flex-col gap-2 w-fit">
					<span v-if="!if_first" class="text-center text-2xl drop-shadow-lg">Search For <br />Applicants over
						<br />here!</span>
					<span v-if="if_first" class="text-center text-2xl drop-shadow-lg">No Applicants Found
						<br />Check the spelling!</span>

					<div class=" absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex flex-col gap-2 text-sm justify-self-end">
						<span
							class="text-sm font-bold justify-self-end mt-2 mx-auto px-3 bg-white text-black w-fit rounded-full">Recent
							Searches</span>
						<span class="cursor-pointer hover:text-purple-700 text-center text-xs" v-for="recent in recent_search" @click="$router.push(`/applicant/${recent.apl_id}`)
							">{{ recent.fullName }}</span>
					</div>
					<div v-show="!if_first" class="h-40 mx-auto aspect-square absolute right-[420px] -rotate-45 top-24">
						<SvgsArrow />
					</div>
				</div>

				<!-- Search Results List -->
				<SearchResultsList v-else :search_results="search_results" />

			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/store/search';
import { Applicant } from '@/interfaces/interfaces';
import { storeToRefs } from 'pinia';

const { recent_search } = storeToRefs(useSearchStore())

const props = defineProps<{
	visible: boolean
}>()
const search = ref<string>()
const search_bar_input = ref<HTMLInputElement>()
const search_results = ref<Applicant[]>([])
let if_first = ref(false)

watchEffect(() => {
	if (props.visible) {
		search_bar_input.value?.focus()
	}
})

async function startSearch() {
	if (!if_first.value) {
		if_first.value = !if_first.value
	}

	if (!search.value) return
	search_results.value = await useSearchStore().getSearch(search.value!.toUpperCase())
	console.log(search_results.value);
}
</script>

<style scoped></style>