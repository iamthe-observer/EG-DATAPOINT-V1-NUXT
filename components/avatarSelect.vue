<template>
	<div :class="`relative aspect-square w-full bg-white border-black border-2 rounded-none ${classer ? classer : ''}`">
		<!-- :class="`relative min-h-[200px] min-w-[200px] dark:bg-neutral-300 bg-neutral-600 rounded-lg ${classer ? classer : ''}`"> -->
		<div v-if="!src" class="absolute inset-0 rounded-none bg-purple-300 grid place-items-center">

			<svg xmlns="http://www.w3.org/2000/svg" class="w-10 aspect-square" viewBox="0 0 24 24">
				<g stroke="#000" strokeLinecap="round" strokeLinejoin="round">
					<path fill="none" strokeDasharray="66" strokeDashoffset="66" strokeWidth="2" d="M3 14V5H21V19H3V14">
						<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="66;0"></animate>
					</path>
					<path fill="#000" fillOpacity="0" strokeDasharray="52" strokeDashoffset="52"
						d="M3 16L7 13L10 15L16 10L21 14V19H3Z">
						<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.8s" values="52;0"></animate>
						<animate fill="freeze" attributeName="fill-opacity" begin="1s" dur="0.15s" values="0;0.3"></animate>
					</path>
				</g>
				<circle cx="7.5" cy="9.5" r="1.5" fill="#000" fillOpacity="0">
					<animate fill="freeze" attributeName="fill-opacity" begin="1s" dur="0.4s" values="0;1"></animate>
				</circle>
			</svg>

		</div>

		<div class="absolute inset-0 rounded-md dark:bg-neutral-200 bg-neutral-700 grid place-items-center" v-else><img
				:src="src ? src : ''" :alt="alt" class="w-full h-full rounded-none object-cover"></div>
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