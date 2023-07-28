<template>
	<div class="w-full relative h-full rounded-2xl pb-2">
		<div
			class="w-full h-full rounded-2xl bg-neutral-800 col-span-full row-span-full pb-2 overflow-y-scroll scrollbar-hidden text-justify px-5 py-5 relative">

			<!-- Search -->
			<Search :visible="if_search" />

			<!-- heading -->
			<div class="flex justify-between">
				<h3 class="text-3xl font-semibold">Database Resources</h3>

				<div @click="useSearchStore().setIfSearch(true)" v-if="!if_search" ref="search_bar"
					class="z-[200] flex justify-end rounded-xl w-[400px] search_bar bg-neutral-900 fixed top-10 right-7 drop-shadow-2xl transition-all duration-300 ease-out outline outline-2 outline-neutral-300">
					<input ref="search_bar_input" type="text" class="flex-1 bg-transparent px-2"
						placeholder="Click here to search!">
					<div class="w-10 p-2">
						<SvgsSearch class=" w-full h-full aspect-square" />
					</div>
				</div>
			</div>
			<!-- heading end -->

			<section class="grid grid-cols-2 grid-rows-2 flex-1 h-full max-h-screen my-10 gap-5 relative">
				<!-- <section class="flex w-full h-[475px] mt-10 gap-5 relative"> -->
				<!-- <div
					class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-4xl font-semibold drop-shadow-2xl p-5 w-full text-center bg-black bg-opacity-40 text-neutral-900">
					Locked
				</div> -->

				<div class="w-full h-full flex flex-col gap-5 row-span-2">
					<div class="w-full h-full rounded-xl">
						<AnnTab />
					</div>

					<div class="w-full h-full rounded-xl">
						<TasksTab />
					</div>
				</div>
				<RequestsTab class="row-span-2" />
				<!-- <div class="bg-neutral-900 flex-1 rounded-2xl"></div> -->
			</section>
		</div>


	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSearchStore } from '@/store/search';
import { useTitle } from '@vueuse/core';

useTitle('EG Datapoint | Database')

const { if_search } = storeToRefs(useSearchStore())
const search_bar = ref<HTMLDivElement>()
const search_bar_input = ref<HTMLInputElement>()

onBeforeUnmount(() => {
	useSearchStore().setIfSearch(false)
})
</script>