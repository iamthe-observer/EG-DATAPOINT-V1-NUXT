<template>
	<svg ref="svg" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<g :fill="state.fill" :class="classer" :stroke="state.stroke" strokeLinecap="round" strokeWidth="2">
			<path strokeDasharray="4" strokeDashoffset="4" d="M12 3V5">
				<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="4;0"></animate>
			</path>
			<path :fill="state.fill" fillOpacity="0" strokeDasharray="28" strokeDashoffset="28"
				d="M12 5C8.68629 5 6 7.68629 6 11L6 17C5 17 4 18 4 19H12M12 5C15.3137 5 18 7.68629 18 11L18 17C19 17 20 18 20 19H12">
				<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.4s" values="28;0"></animate>
				<animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.15s" values="0;0.3"></animate>
			</path>
			<path strokeDasharray="8" strokeDashoffset="8" d="M10 20C10 21.1046 10.8954 22 12 22C13.1046 22 14 21.1046 14 20">
				<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8;0"></animate>
			</path>
		</g>
	</svg>
</template>

<script setup lang="ts">
defineProps<{
	classer?: string
}>()
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