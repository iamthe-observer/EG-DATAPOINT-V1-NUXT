<template>
	<div class="w-full relative h-full rounded-2xl pb-2">
		<div id="style-1" :class="[
			'w-full h-full rounded-2xl bg-neutral-800 col-span-full row-span-full scrollbar text-justify p-2 relative flex flex-col gap-2',
			if_search ? 'overflow-hidden' : 'overflow-y-auto'
		]">
			<!-- Search -->
			<Search :visible="if_search" />

			<!-- heading -->
			<div class="flex w-full justify-between hover:pb-10 transition-all duration-300 ease-in-out">
				<div @click="useSearchStore().setIfSearch(true)" v-if="!if_search" ref="search_bar"
					class="z-[200] w-full flex justify-end rounded-xl search_bar bg-neutral-900 drop-shadow-2xl transition-all duration-300 ease-out outline outline-2 outline-neutral-600">
					<input ref="search_bar_input" type="text" class="flex-1 bg-transparent px-2"
						placeholder="Click here to search!">
					<div class="w-10 p-2">
						<SvgsSearch class=" w-full h-full aspect-square" />
					</div>
				</div>
			</div>
			<!-- heading end -->

			<!-- content -->
			<div class="w-full h-full rounded-xl flex gap-2">
				<div class="transition-all duration-500 ease-in-out bg-neutral-900 flex-1 rounded-xl"></div>
				<div class="transition-all duration-500 ease-in-out bg-neutral-900 w-4/5 rounded-xl"></div>
				<div class="transition-all duration-500 ease-in-out bg-neutral-900 flex-1 rounded-xl"></div>
			</div>
			<!-- content end-->
		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSearchStore } from '@/store/search';
import { useTitle } from '@vueuse/core';

useTitle('EG Datapoint | Database')
useResizeObserver
const { if_search } = storeToRefs(useSearchStore())
const search_bar = ref<HTMLDivElement>()
const search_bar_input = ref<HTMLInputElement>()

onBeforeUnmount(() => {
	useSearchStore().setIfSearch(false)
})
</script>