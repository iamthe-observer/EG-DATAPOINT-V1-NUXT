<template>
	<svg xmlns="http://www.w3.org/2000/svg" class="w-6" viewBox="0 0 24 24">
		<path :fill="state.fill1" d="M12 12V2c5.523 0 10 4.477 10 10H12z" opacity=".25" />
		<path :fill="state.fill1" d="m12 12l5 8.66A10.01 10.01 0 0 0 22 12H12z" opacity=".5" />
		<path :fill="state.fill1"
			d="M17 20.66L12 12V2c-5.523.002-9.999 4.48-9.997 10.003c.002 5.523 4.48 9.999 10.004 9.997A10 10 0 0 0 17 20.662l.003-.005l-.004.003z" />
	</svg>
</template>

<script setup lang="ts">
const svg = ref<SVGElement>()
const isHover = useElementHover(svg)
const state = computed(() => {
	if (isHover.value) {
		// hovered
		return {
			fill1: '#a020f03f',
			fill2: '#a020f03f',
			stroke: '#a020f0',
		}
		// !hovered
	} else return {
		fill1: '#222',
		fill2: '#222',
		stroke: 'none',
	}
})
</script>