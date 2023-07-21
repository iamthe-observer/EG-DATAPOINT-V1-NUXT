<template>
	<div class="__most_recent_apls col-span-3 row-span-7 p-2">
		<div class="bg-neutral-800 w-full h-full rounded-xl">{{ }}</div>
	</div>
</template>

<script setup lang="ts">
import { useAnnStore } from '@/store/announce';
import { storeToRefs } from 'pinia';

const { announcements } = storeToRefs(useAnnStore())
</script>