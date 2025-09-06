<template>
	<div
		:class="`relative aspect-square w-full backdrop-blur-lg outline outline-4 outline-neutral-900/60 dark:outline-neutral-300/25 rounded-lg ${classer ? classer : ''}`">
		<!-- :class="`relative min-h-[200px] min-w-[200px] dark:bg-neutral-300 bg-neutral-600 rounded-lg ${classer ? classer : ''}`"> -->
		<div v-if="!src"
			class="absolute inset-1 rounded-md bg-neutral-900/50 dark:bg-neutral-300/20 backdrop-blur-lg grid place-items-center">
			<SvgsImage class="w-10" />
		</div>

		<div class="absolute inset-1 rounded-md backdrop-blur-lg grid place-items-center" v-else><img
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