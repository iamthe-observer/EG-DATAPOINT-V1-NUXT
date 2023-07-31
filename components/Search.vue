<template>
	<div v-if="visible" class="absolute flex w-full h-full inset-0">
		<div class="relative h-full flex-1 bg-gradient-to-b to-[rgba(0,0,0,0.5)] from-black from-[50%] z-50">
			<!-- SearchBar -->
			<form @submit.prevent="startSearch" ref="search_bar"
				class="flex justify-end rounded-xl w-[400px] search_bar bg-neutral-900 absolute z-10 top-5 right-1/2 translate-x-[47.9%] shadow-2xl transition-all duration-300 ease-out">
				<input v-model="search" ref="search_bar_input" type="text" class="flex-1 bg-transparent px-2">
				<div @click.prevent="startSearch" class="w-10 p-2 cursor-pointer">
					<SvgsSearch class=" w-full h-full aspect-square" />
				</div>

				<div @click="useSearchStore().setIfSearch(false)" class="w-10 p-2 cursor-pointer">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path fill="#888888"
							d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6L8.4 17Zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z" />
					</svg>
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
						<span v-if="recent_search!.length > 0"
							class="text-sm font-bold justify-self-end mt-2 mx-auto px-3 bg-white text-black w-fit rounded-full">Recent
							Searches</span>
						<span class="cursor-pointer hover:text-purple-700 text-center text-xs" v-for="recent in recent_search" @click="() => { $router.push(`/applicant/${recent.apl_id}`); useViewAplStore().setID(recent.apl_id!) }
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

		<!-- <label for="my_modal_011" class="btn">open modal</label> -->
		<input type="checkbox" :checked="not_long_enough_search" id="my_modal_011" class="modal-toggle" />
		<div class="modal">
			<div class="modal-box">
				<h3 class="text-lg font-bold text-red-500">Error Check Search Term!</h3>
				<p class="py-4">Check the spelling and try to type a longer name if its short!</p>
			</div>
			<label @click="not_long_enough_search = false" class="modal-backdrop">Close</label>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/store/search';
import { Applicant } from '@/interfaces/interfaces';
import { storeToRefs } from 'pinia';
import { useViewAplStore } from '@/store/viewApl';

const { recent_search } = storeToRefs(useSearchStore())
const not_long_enough_search = ref(false)

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

	if (!search.value || search.value.length < 3) return not_long_enough_search.value = true
	search_results.value = await useSearchStore().getSearch(search.value!.toUpperCase())
	console.log(search_results.value);
}
</script>