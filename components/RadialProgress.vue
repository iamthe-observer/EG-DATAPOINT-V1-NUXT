<template>
	<div :class="`radial-progress bg-neutral-900 dark:bg-neutral-200 text-${textclr ? textclr : 'text-accent'}`"
		:style="`--value:${amount}; `">
		<slot>
			{{ amount }}%
		</slot>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	amount: number
	textclr?: string
	bgclr?: string
}>()
</script>