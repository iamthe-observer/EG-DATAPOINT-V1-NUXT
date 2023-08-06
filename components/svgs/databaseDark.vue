<template>
	<svg ref="svg" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<g :fill="state.fill" :stroke="state.stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
			<ellipse cx="12" cy="6" rx="8" ry="3"></ellipse>
			<path d="M6.037 12C4.77 12.53 4 13.232 4 14c0 1.657 3.582 3 8 3s8-1.343 8-3c0-.768-.77-1.47-2.037-2"></path>
			<path d="M4 6v4c0 1.657 3.582 3 8 3s8-1.343 8-3V6M4 14v4c0 1.657 3.582 3 8 3s8-1.343 8-3v-4"></path>
		</g>
	</svg>
</template>

<script setup lang="ts">
const svg = ref<SVGElement>()
const isHover = useElementHover(svg)
const state = computed(() => {
	if (isHover.value) {
		// hovered
		return {
			fill: '#a020f03f',
			stroke: '#a020f0',
		}
		// !hovered
	} else return {
		fill: 'none',
		stroke: '#222',
	}
})
</script>