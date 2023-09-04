<template>
	<div class="flex gap-2 w-full h-full overflow-hidden">
		<div v-if="!mini" class="min-w-[250px] min-h-full">
			<navigation />
		</div>
		<div v-else class="max-w-[100px] min-h-full overflow-hidden">
			<navigation />
		</div>
		<div class="w-full min-h-full">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app';
import { storeToRefs } from 'pinia';
const { if_minimize: mini } = storeToRefs(useAppStore())
</script>