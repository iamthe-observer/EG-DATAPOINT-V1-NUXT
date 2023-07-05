<template>
	<div class="__calendar col-span-3 row-span-15 px-2 flex flex-col items-center">
		<div class="bg-neutral-800 w-full h-full rounded-xl flex flex-col items-center justify-between gap-2 px-4 pb-4">
			<div class="flex flex-col items-center">
				<h2 class="w-full text-xl pt-3">Calendar</h2>
				<VCalendar title-position="right" :attributes='attrs' :color="selectedClr" isDark="true" transparent borderless
					class="mt-2">
				</VCalendar>
			</div>
			<div class="rounded-xl w-full h-full flex flex-col gap-2">
				<span>4 July, 2023</span>
				<div class="flex-1 flex-col flex gap-1">
					<div class="w-full h-full border-t-2 border-neutral-700 flex items-center justify-between gap-2">
						<div class="w-10 h-10 aspect-square bg-black rounded-xl"></div>
						<div class="flex-1 flex flex-col truncate"><span class="text-md truncate">Lorem ipsum dolor sit
								amet.</span><span class="text-sm truncate">Lorem, ipsum.</span>
						</div>
						<div class="">7:30am</div>
					</div>
					<div class="w-full h-full border-t-2 border-neutral-700 flex items-center justify-between gap-2">
						<div class="w-10 h-10 aspect-square bg-black rounded-xl"></div>
						<div class="flex-1 flex flex-col truncate"><span class="text-md truncate">Lorem ipsum dolor sit
								amet.</span><span class="text-sm truncate">Lorem, ipsum.</span>
						</div>
						<div class="">7:30am</div>
					</div>
					<div class="w-full h-full border-t-2 border-b-2 border-neutral-700 flex items-center justify-between gap-2">
						<div class="w-10 h-10 aspect-square bg-black rounded-xl"></div>
						<div class="flex-1 flex flex-col truncate"><span class="text-md truncate">Lorem ipsum dolor sit
								amet.</span><span class="text-sm truncate">Lorem, ipsum.</span>
						</div>
						<div class="">7:30am</div>
					</div>
				</div>

				<div class="ann_btn w-full bg-neutral-700 py-3 text-center rounded-xl">View (4) more events</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const selectedClr = ref('purple')
const attrs = ref([
	{
		key: 'test',
		highlight: true,
		dates: { start: new Date(2023, 6, 3), end: new Date(2023, 6, 6) },
	}
]);
</script>
