<template>
	<section
		class="flex-1 flex bg-white border border-black hover:shadow-box transition-all duration-150 ease-out rounded-sm p-4 gap-10">
		<div class="flex flex-col gap-1">
			<h1 class="text-xs">
				{{ head }}
			</h1>

			<p class="text-3xl font-bold">
				{{ val }}
			</p>

			<span class="text-xs">
				{{ stat }}
			</span>
		</div>

		<!-- progress -->
		<slot />

	</section>
</template>

<script setup lang="ts">
defineProps<{
	head: string
	val: number | string
	stat?: string | number
}>()
</script>