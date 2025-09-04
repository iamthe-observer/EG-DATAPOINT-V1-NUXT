<template>
	<div :class="`radial-progress bg-black/30 backdrop-blur-lg text-gold-500 ${bgclr} ${textclr}`"
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