<template>
	<div class="w-full relative h-full rounded-2xl pb-2">
		<div
			class="w-full h-full rounded-2xl bg-neutral-800 col-span-full row-span-full pb-2 overflow-y-scroll scrollbar-hidden text-justify px-5 py-5 relative">

			<!-- Search -->
			<Search :visible="if_search" />

			<!-- heading -->
			<div class="flex justify-between">
				<h3 class="text-3xl font-bold">Database Resources</h3>

				<div @click="if_search = !if_search" v-if="!if_search" ref="search_bar"
					class="flex justify-end rounded-xl w-[400px] search_bar bg-neutral-900 fixed top-10 right-7 drop-shadow-2xl transition-all duration-300 ease-out">
					<input ref="search_bar_input" type="text" class="flex-1 bg-transparent px-2">
					<div class="w-10 p-2">
						<SvgsSearch class=" w-full h-full aspect-square" />
					</div>
				</div>
			</div>
			<!-- heading end -->

			<section class="flex w-full h-[475px] mt-10 gap-5">
				<div class="bg-neutral-900 flex-1 rounded-2xl"></div>
				<div class="bg-neutral-900 flex-1 rounded-2xl"></div>
				<div class="bg-neutral-900 flex-1 rounded-2xl"></div>
			</section>
		</div>


	</div>
</template>

<script setup lang="ts">
const if_search = ref(false)
const search_bar = ref<HTMLDivElement>()
const search_bar_input = ref<HTMLInputElement>()

</script>