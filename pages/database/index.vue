<template>
	<div ref="database" class="w-full h-full flex flex-col rounded-2xl pb-2">
		<div
			class="w-full h-full rounded-2xl bg-neutral-00 col-span-full row-span-full text-justify relative flex flex-col overflow-y-hidden">

			<div class="w-full relative h-full rounded-2xl pb-2">
				<div id="style-1" :class="[
					'max-w-full w-full h-full max-h-full rounded-2xl col-span-full row-span-full scrollbar text-justify p-2 relative flex flex-col',
					if_search ? 'overflow-hidden' : 'overflow-y-auto'
				]">
					<!-- Search -->
					<Search :visible="if_search" />

					<!-- heading -->
					<div ref="header" :class="[
						'flex w-full justify-between transition-all duration-300 ease-in-out relative group',
						curr_page !== '' ? 'hover:mb-10' : ''
					]">


						<div v-if="is_hover && !if_search && curr_page !== ''" @click="curr_page = ''" :class="[
							'opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out absolute -bottom-9 left-1/2 -translate-x-1/2 w-56 h-10 cursor-pointer z-[5000] flex justify-center items-end',
							if_search ? '' : 'tooltip tooltip-primary tooltip-bottom'
						]" data-tip="resize panels">
							<svg data-tip="resize" class="w-6 aspect-square" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path fill="white"
									d="M10 6a1 1 0 0 0-1 1v4H5.41l.8-.79a1 1 0 0 0-1.42-1.42l-2.5 2.5a1 1 0 0 0-.21.33a1 1 0 0 0 0 .76a1 1 0 0 0 .21.33l2.5 2.5a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42l-.8-.79H9v4a1 1 0 0 0 2 0V7a1 1 0 0 0-1-1Zm11.92 5.62a1 1 0 0 0-.21-.33l-2.5-2.5a1 1 0 0 0-1.42 1.42l.8.79H15V7a1 1 0 0 0-2 0v10a1 1 0 0 0 2 0v-4h3.59l-.8.79a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l2.5-2.5a1 1 0 0 0 .21-.33a1 1 0 0 0 0-.76Z" />
							</svg>
						</div>

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
					<div class="w-full h-full rounded-xl flex gap-2 overflow-hidden pt-2">

						<div @click="handlePage('tasks')" :class="[
							'transition-all duration-500 ease-in-out hover:bg-neutral-800 group rounded-xl relative',
							curr_page !== 'tasks' ? 'flex-1' : 'w-4/5 bg-neutral-800'
						]">
							<span v-if="curr_page != 'tasks' && curr_page != ''"
								class="vertical-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 tracking-[-0.2rem] font-semibold text-neutral-600 group-hover:text-secondary text-[2rem] cursor-pointer transition-all duration-300 ease-out group-hover:scale-110">TASKS</span>

							<TasksTab :curr_page="curr_page" />
						</div>

						<div @click="handlePage('requests')" :class="[
							'transition-all duration-500 ease-in-out hover:bg-neutral-800 group rounded-xl relative',
							curr_page !== 'requests' ? 'flex-1' : 'w-4/5 bg-neutral-800'
						]">
							<span v-if="curr_page != 'requests' && curr_page != ''"
								class="vertical-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 tracking-[-0.2rem] font-semibold text-neutral-600 group-hover:text-secondary text-[2rem] cursor-pointer transition-all duration-300 ease-out group-hover:scale-110">REQUESTS</span>


							<RequestsTab :curr_page="curr_page" />
						</div>

						<div @click="handlePage('announcements')" :class="[
							'transition-all duration-500 ease-in-out hover:bg-neutral-800 group rounded-xl relative',
							curr_page !== 'announcements' ? 'flex-1' : 'w-4/5 bg-neutral-800'
						]">
							<span v-if="curr_page != 'announcements' && curr_page != ''"
								class="vertical-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 tracking-[-0.2rem] font-semibold text-neutral-600 group-hover:text-secondary text-[2rem] cursor-pointer transition-all duration-300 ease-out group-hover:scale-110">ANNOUNCEMENTS</span>


							<AnnTab :curr_page="curr_page" />
						</div>

					</div>
					<!-- content end-->

					<!-- footer -->
					<div class="w-full"></div>
					<!-- footer end -->
				</div>
			</div>
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
const header = ref()
const is_hover = useElementHover(header)
const database = ref<HTMLDivElement>()

onMounted(() => {
	// @ts-ignore
	database.value!.style.zoom = '90%'
})

const curr_page = ref('')

function handlePage(page: string): void {
	curr_page.value = page
}

onBeforeUnmount(() => {
	useSearchStore().setIfSearch(false)
})
</script>