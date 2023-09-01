<template>
	<div
		:class="['bg-primary px-4 py-1 h-fit border border-black rounded-sm hover:shadow-box transition-all duration-200 ease-out font-bold cursor-pointer flex items-center', classer]">
		<slot />
	</div>
</template>

<script setup lang="ts">
defineProps<{ classer?: string }>()
</script>
