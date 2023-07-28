<template>
	<div class="bg-neutral-900 flex flex-col rounded-2xl p-3 h-full">
		<h1 class="pb-2 text-xl font-semibold flex justify-between" v-if="announcements.length > 0">
			<span class="w-full text-center">Announcements</span>
		</h1>
		<!-- if no requests -->
		<div v-if="announcements!.length == 0" class="w-full h-full grid place-items-center">
			<div class="flex flex-col items-center gap-2">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-20 aspect-square" viewBox="0 0 24 24">
					<g stroke="#888888" stroke-linecap="round" stroke-width="2">
						<path fill="#888888" fill-opacity="0" stroke-dasharray="60" stroke-dashoffset="60"
							d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z">
							<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0" />
							<animate fill="freeze" attributeName="fill-opacity" begin="1.2s" dur="0.15s" values="0;0.3" />
						</path>
						<path fill="none" stroke-dasharray="14" stroke-dashoffset="14"
							d="M8 16C8.5 15 9.79086 14 12 14C14.2091 14 15.5 15 16 16">
							<animate fill="freeze" attributeName="stroke-dashoffset" begin="1s" dur="0.2s" values="14;0" />
						</path>
					</g>
					<g fill="#888888" fill-opacity="0">
						<ellipse cx="9" cy="9.5" rx="1" ry="1.5">
							<animate fill="freeze" attributeName="fill-opacity" begin="0.6s" dur="0.2s" values="0;1" />
						</ellipse>
						<ellipse cx="15" cy="9.5" rx="1" ry="1.5">
							<animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.2s" values="0;1" />
						</ellipse>
					</g>
				</svg>
				<span class="text-center">No Announcements</span>
			</div>
		</div>

		<!-- contains all requests -->
		<div v-else id="style-1" class="bg-neutral-800 flex flex-col gap-3 rounded-xl overflow-y-auto">
			<div class="w-full flex gap-2 justify-between p-2 hover:bg-neutral-700 rounded-xl"
				v-for="(ann, i) in announcements.sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime())"
				:key="i">
				<span class="text-neutral-600 w-10 text-xs grid place-items-center">
					{{ i + 1 }}
				</span>
				<span class="flex flex-col justify-center truncate flex-1 overflow-x-hidden text-sm">
					{{ ann.title }}<br />
					<span class="truncate">{{ ann.body }}</span>
				</span>
				<div class="flex flex-col text-xs text-right text-neutral-400">
					<span class="">
						{{ $formatDate(new Date(ann.created_at)) }}
					</span>
					<span class="">
						{{ $formatDateTime(new Date(ann.created_at)) }}
					</span>
					<span :class="ann.urgency ? 'badge badge-accent badge-xs self-end' : 'badge badge-info badge-xs self-end'">{{
						ann.urgency ? 'High' : 'Low' }}</span>
				</div>
			</div>


		</div>
	</div>
</template>


<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAnnStore } from '@/store/announce';

const { announcements } = storeToRefs(useAnnStore())
</script>

<style scoped></style>