<template>
	<div class="__calendar col-span-3 row-span-15 px-2 flex flex-col items-center">
		<div class="bg-neutral-800 w-full h-full rounded-xl flex flex-col items-center justify-between gap-2 px-4 pb-4">
			<div class="flex flex-col items-center w-full min-h-1/2">
				<h2 class="w-full text-xl pt-3">Calendar</h2>
				<VCalendar expanded title-position="right" :attributes='attrs' :color="selectedClr" isDark="true" transparent
					borderless class="mt-2">
				</VCalendar>
			</div>
			<span class="w-full">{{ $formatDateWords(new Date()) }}</span>
			<div class="rounded-none w-full h-full flex flex-col gap-2 overflow-y-scroll scrollbar-hidden">

				<div class="flex-1 flex-col flex gap-1">

					<div v-for="(ann, i) in announcements.slice(-4)"
						class="w-full h-16 border-t-2 border-neutral-700 flex items-center justify-between gap-2">
						<div class="w-10 h-10 aspect-square bg-black rounded-xl grid place-items-center">icon</div>
						<div class="flex-1 flex flex-col truncate">
							<span class="text-md truncate">{{ ann.title }}</span>
							<span class="text-sm truncate">{{ ann.body }}</span>
						</div>
						<div class="text-xs">{{ new Date(ann.created_at).toLocaleTimeString([], {
							hour: '2-digit', minute: '2-digit', hour12:
								true
						})
						}}</div>
					</div>


				</div>

			</div>
			<div v-if="announcements.length > 0" class="ann_btn w-full bg-neutral-700 py-3 text-center rounded-xl">view ({{
				announcements.length - 4 }}) more
				announcement(s)</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAnnStore } from '@/store/announce';
import { storeToRefs } from 'pinia';

const { announcements } = storeToRefs(useAnnStore())

const selectedClr = ref('purple')
const attrs = ref([
	{
		key: 'test',
		highlight: true,
		dates: { start: new Date(2023, 6, 3), end: new Date(2023, 6, 6) },
	}
]);
</script>
