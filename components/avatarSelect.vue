<template>
	<div :class="`relative h-[200px] w-[200px] bg-neutral-600 rounded-lg ${classer ? classer : ''}`">
		<div v-if="!src" class="absolute inset-1 rounded-md bg-neutral-700 grid place-items-center">
			<SvgsImage class="w-10" />
		</div>

		<div class="absolute inset-1 rounded-md bg-neutral-700 grid place-items-center" v-else><img :src="src" :alt="alt"
				class="w-full h-full rounded-md object-cover"></div>
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