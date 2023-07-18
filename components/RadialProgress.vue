<template>
	<div class="radial-progress bg-purple-800 text-primary-content border-4 border-purple-900"
		:style="`--value:${amount}; `">
		{{
			amount }}%</div>
</template>

<script setup lang="ts">
defineProps<{
	amount: number
}>()
</script>