
<template>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<g stroke="#888888" strokeLinecap="round" strokeLinejoin="round">
			<path fill="none" strokeDasharray="66" strokeDashoffset="66" strokeWidth="2" d="M3 14V5H21V19H3V14">
				<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="66;0"></animate>
			</path>
			<path fill="#888888" fillOpacity="0" strokeDasharray="52" strokeDashoffset="52"
				d="M3 16L7 13L10 15L16 10L21 14V19H3Z">
				<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.8s" values="52;0"></animate>
				<animate fill="freeze" attributeName="fill-opacity" begin="1s" dur="0.15s" values="0;0.3"></animate>
			</path>
		</g>
		<circle cx="7.5" cy="9.5" r="1.5" fill="#888888" fillOpacity="0">
			<animate fill="freeze" attributeName="fill-opacity" begin="1s" dur="0.4s" values="0;1"></animate>
		</circle>
	</svg>
</template>

<script lang="ts">
export default {
	name: 'LineMdImageTwotone'
}
</script>