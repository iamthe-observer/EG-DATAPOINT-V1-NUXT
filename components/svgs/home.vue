<template>
	<svg class="transition-all duration-300 ease-out" ref="svg" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
		viewBox="0 0 24 24">
		<g :fill="state.fill" :stroke="state.stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
			<path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm6 14h8"></path>
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
			fill: '#a020f04f',
			stroke: '#fff',
		}
		// !hovered
	} else return {
		fill: 'none',
		stroke: '#888',
	}
})
</script>