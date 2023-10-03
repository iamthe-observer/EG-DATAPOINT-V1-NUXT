<template>
	<div v-if="!useAppStore().is_mobile" class="__dashboard w-full h-full grid grid-cols-12 gap-1 grid-rows-15">
		<!-- <div v-if="false" class="__dashboard w-full h-full grid grid-cols-12 gap-1 grid-rows-15"> -->
		<HeroDash class="dash_item" />
		<SideInfo class="dash_item" />
		<UsersDash class="dash_item" />
		<AplInfoDash class="dash_item" />
		<MostRecentApls class="dash_item" />
		<AplStats class="dash_item" />
	</div>

	<div v-else class="__dashboard w-full h-full grid grid-cols-12 gap-1 grid-rows-15">
	</div>
</template>

<script setup lang='ts'>
import { useTitle } from '@vueuse/core';
import { useAppStore } from '@/store/app'
useTitle('EG Datapoint | Dashboard')

const { $gsap } = useNuxtApp()

onMounted(() => {
	setTimeout(() => {
		$gsap.to(".dash_item", {
			scale: 1,
			opacity: 1,
			duration: .2,
			ease: "power1.inOut",
			stagger: {
				from: "random",
				amount: .6
			}
		});
	}, 500)
})
</script>

<style scoped>
.dash_item {
	opacity: 0;
	transform: scale(.8);
}
</style>

<style scoped>
.griddy {
	display: grid;
}
</style>