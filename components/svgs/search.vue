<template>
	<svg ref="svg" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<g :stroke="state.stroke" strokeLinecap="round" strokeWidth="2">
			<path fill="none" strokeDasharray="16" strokeDashoffset="16" d="M10.5 13.5L3 21">
				<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.2s" values="16;0"></animate>
			</path>
			<path :fill="state.fill" fillOpacity="0" strokeDasharray="40" strokeDashoffset="40"
				d="M10.7574 13.2426C8.41421 10.8995 8.41421 7.10051 10.7574 4.75736C13.1005 2.41421 16.8995 2.41421 19.2426 4.75736C21.5858 7.10051 21.5858 10.8995 19.2426 13.2426C16.8995 15.5858 13.1005 15.5858 10.7574 13.2426Z">
				<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="40;0"></animate>
				<animate fill="freeze" attributeName="fill-opacity" begin="0.6s" dur="0.15s" values="0;0.3"></animate>
			</path>
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
			fill: '#a020f0',
			stroke: '#fff',
		}
		// !hovered
	} else return {
		fill: '#888',
		stroke: '#888',
	}
})
</script>