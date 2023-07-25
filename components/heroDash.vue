<template>
	<div class="__hero_dash flex col-span-9 row-span-2 p-2 h-full text-white">

		<div class="flex-1 flex-col flex">
			<p class="text-2xl">Hello, User</p>
			<p class="text-sm">Welcome to Ebbysgold Group Datapoint</p>
		</div>

		<div class="min-w-[30%] flex items-center justify-end gap-5">
			<div @click="() => {
				useSearchStore().setIfSearch(true)
				$router.push({ path: 'database', params: { search: 'true' } })
			}" class="w-9 p-2 aspect-square bg-neutral-800 rounded-xl hover:cursor-pointer">
				<SvgsSearch class="w-full h-full aspect-square" />
			</div>
			<div class="w-9 aspect-square bg-neutral-800 rounded-xl p-2 hover:cursor-pointer">
				<SvgsBell class="w-full h-full aspect-square" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/store/search';

</script>