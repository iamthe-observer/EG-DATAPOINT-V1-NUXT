<template>
	<div class="flex gap-2 w-full h-full overflow-hidden">
		<div class="min-w-[250px] min-h-full">
			<navigation />
		</div>
		<div class="w-full min-h-full">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
</script>