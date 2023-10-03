<template>
	<div class="col-span-3 row-span-15 px-2 flex flex-col items-center gap-5">
		<!-- registered apls -->
		<div
			class="bg-neutral-800 dark:bg-neutral-50 w-full h-full rounded-xl flex flex-col items-center justify-between gap-2 px-3 py-1">
			<h2 class="text-2xl flex justify-between w-full">
				<span class="font-semibold">Registered Apls</span>
				<span class="font-semibold">{{ registered_apls.length }}</span>
			</h2>
		</div>

		<!-- incomplete apls pics -->
		<div
			class="bg-neutral-800 dark:bg-neutral-50 w-full h-full rounded-xl flex flex-col items-center justify-between gap-2 px-3 py-1">
			<h2 class="text-2xl flex justify-between w-full">
				<span class="font-semibold">Incomplete Apls Pics</span>
				<span class="font-semibold">{{ registered_apls.length }}</span>
			</h2>
		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app';

const appStore = useAppStore();
const { all_my_apls } = storeToRefs(appStore);

const registered_apls = computed(() => {
	return all_my_apls.value.filter((apl) => apl.pconf_code)
});

const incomplete_apls_pics = computed(() => {
	let filtered = all_my_apls.value.forEach((apl) => {

	})
})
</script>

<style scoped></style>