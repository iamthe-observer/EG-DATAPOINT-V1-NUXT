<template>
	<div v-if="!useAppStore().is_mobile" class="flex gap-2 w-full h-full px-2 py-2 relative">
		<!-- <StarBG /> -->
		<div class="min-w-[100px] min-h-full">
			<navigation />
		</div>
		<div class="w-full min-h-full">
			<slot></slot>
		</div>
	</div>

	<div v-if="useAppStore().is_mobile" class="flex flex-col gap-2 w-full h-full px-2 py-2">
		<div class="min-w-fit">
			<navigation />
		</div>
		<div class="w-full h-full overflow-hidden">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'

</script>