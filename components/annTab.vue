<template>
	<div v-if="curr_page == 'announcements' || curr_page == ''"
		class="w-full h-full rounded-xl p-1 overflow-y-hidden flex flex-col">

		<h1 class="py-1 px-1 text-xl font-semibold flex justify-between">
			<span
				:class="['transition-all duration-300 ease-out', curr_page == 'announcements' ? 'text-4xl' : '']">Announcements</span>

			<span class="">{{ announcements.length }}</span>
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
			<label :for="`my_modal_${i}`" class="w-full flex gap-2 justify-between p-2 hover:bg-neutral-700 rounded-xl"
				v-for="(ann, i) in announcements.sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime())"
				:key="i">

				<input type="checkbox" :id="`my_modal_${i}`" class="modal-toggle" />
				<div class="modal">
					<div
						:class="ann.urgency ? 'modal-box relative outline outline-4 outline-red-600' : 'modal-box relative outline outline-4 outline-neutral-700'">
						<h3 class="font-semibold text-lg uppercase flex gap-2 items-center">
							<svg v-if="!ann.urgency" xmlns="http://www.w3.org/2000/svg" class="w-7 aspect-square" viewBox="0 0 24 24">
								<g stroke="#888888" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
									<circle cx="12" cy="12" r="9" fill="#888888" fill-opacity="0">
										<animate fill="freeze" attributeName="fill-opacity" begin="0.2s" dur="0.15s" values="0;0.3" />
									</circle>
									<path fill="none" stroke-dasharray="14" stroke-dashoffset="14" d="M8 12L11 15L16 10">
										<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="14;0" />
									</path>
								</g>
							</svg>
							<svg v-else xmlns="http://www.w3.org/2000/svg" class="w-7 aspect-square" viewBox="0 0 24 24">
								<g stroke="#dc2626" stroke-linecap="round" stroke-width="2">
									<path fill="#dc2626" fill-opacity="0" stroke-dasharray="60" stroke-dashoffset="60"
										d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z">
										<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0" />
										<animate fill="freeze" attributeName="fill-opacity" begin="1.2s" dur="0.15s" values="0;0.3" />
									</path>
									<path fill="none" stroke-dasharray="8" stroke-dashoffset="8" d="M12 7V13">
										<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8;0" />
									</path>
								</g>
								<circle cx="12" cy="17" r="1" fill="#dc2626" fill-opacity="0">
									<animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.4s" values="0;1" />
								</circle>
							</svg>
							{{ ann.title }}
						</h3>
						<p class="py-4">{{ ann.body }}</p>

						<p v-if="!ann.urgency" class="absolute top-2 right-2 text-xs flex gap-2">
						<div class="badge badge-primary">{{ useNuxtApp().$formatDateWords(new
							Date(ann.created_at)) }}</div>
						<div class="badge badge-primary">{{ new Date(ann.created_at).toLocaleTimeString([], {
							hour: '2-digit', minute: '2-digit', hour12: true
						}) }}
						</div>
						</p>

						<p v-else class="absolute top-2 right-2 text-xs flex gap-2">
						<div class="badge badge-accent">{{ useNuxtApp().$formatDateWords(new
							Date(ann.created_at)) }}</div>
						<div class="badge badge-accent">{{ new Date(ann.created_at).toLocaleTimeString([], {
							hour: '2-digit', minute: '2-digit', hour12: true
						}) }}
						</div>
						</p>

						<div class="modal-action">
							<label :for="`my_modal_${i}`" class="btn btn-sm">Close!</label>
						</div>
					</div>
				</div>


				<span class="text-neutral-600 w-10 text-xs grid place-items-center">
					{{ i + 1 }}
				</span>
				<span class="flex flex-col justify-center truncate- flex-1 overflow-x-hidden text-xl">
					{{ ann.title }}<br />
					<span :class="[
						'overflow-hidden text-sm text-neutral-400 text-left truncate-',
						curr_page == 'announcements' ? 'w-full' : 'w-[200px]'
					]">{{ ann.body }}</span>
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
			</label>


		</div>
	</div>
</template>


<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAnnStore } from '@/store/announce';

defineProps<{
	curr_page: string
}>()
const { announcements } = storeToRefs(useAnnStore())
</script>
