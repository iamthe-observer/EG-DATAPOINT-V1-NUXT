<template>
	<div :class="`relative aspect-square w-full dark:bg-neutral-300 bg-neutral-400 rounded-sm ${classer ? classer : ''}`">
		<!-- :class="`relative min-h-[200px] min-w-[200px] dark:bg-neutral-300 bg-neutral-600 rounded-lg ${classer ? classer : ''}`"> -->
		<div v-if="!src"
			class="absolute inset-1 rounded-sm bg-neutral-50 dark:bg-neutral-200 grid place-items-center border border-black">
			<SvgsImage class="w-10" />
		</div>

		<div class="absolute inset-1 rounded-md dark:bg-neutral-200 bg-neutral-700 grid place-items-center" v-else><img
				:src="src ? src : ''" :alt="alt" class="w-full h-full rounded-md object-cover"></div>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	classer?: string | undefined
	src?: string
	alt?: string
}>()
defineEmits([])

</script>