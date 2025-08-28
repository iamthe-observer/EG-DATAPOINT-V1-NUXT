<template>
	<div class="__hero_dash flex col-span-9 items-center row-span-2 p-2 h-full text-white dark:text-neutral-800">

		<div class="">
			<img src="../assets/images/logo1.png" alt="" class="w-24 h-fit">
		</div>


		<div class="flex w-full">
			<div class="flex-1 flex-col flex">
				<p class="text-2xl dark:font-semibold">Hello, {{ useProfileStore().profile?.fullname || 'User' }}</p>
				<p class="text-sm text-primary dark:font-semibold">Welcome to Ebbysgold Group Datapoint</p>
			</div>

			<div class="min-w-[30%] flex items-center justify-end gap-5">
				<div @click="() => {
					useSearchStore().setIfSearch(true)
					$router.push({ path: 'database', params: { search: 'true' } })
				}" class="w-9 p-2 aspect-square dark:bg-white bg-neutral-800 rounded-none border-2 border-black boxy hover:cursor-pointer">
					<SvgsSearch
						class="w-full h-full aspect-square hover:scale-125 transition-all duration-200 ease-in-out" />
				</div>
			</div>

		</div>
	</div>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/store/search';
import { useProfileStore } from '@/store/profile';
</script>

<style></style>