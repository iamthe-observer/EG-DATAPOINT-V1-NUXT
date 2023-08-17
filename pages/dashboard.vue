<template>
	<div v-if="!useAppStore().is_mobile" class="__dashboard w-full h-full grid grid-cols-12 gap-1 grid-rows-15">
		<HeroDash />
		<Calendar />
		<UsersDash />
		<AplInfoDash />
		<MostRecentApls />
		<AplStats />
	</div>

	<div v-else class="__dashboard w-full h-full grid grid-cols-12 gap-1 grid-rows-15">
		<!-- <HeroDash />
		<Calendar />
		<UsersDash />
		<AplInfoDash />
		<MostRecentApls />
		<AplStats /> -->
	</div>
</template>

<script setup lang='ts'>
import { useTitle } from '@vueuse/core';
import { useAppStore } from '@/store/app';
useTitle('EG Datapoint | Dashboard')
</script>

<style scoped>
.griddy {
	display: grid;
}
</style>