<template>
	<div v-if="curr_page == 'announcements' || curr_page == ''"
		class="w-full h-full rounded-xl p-1 overflow-y-hidden flex flex-col">

		<h1 class="py-1 px-1 text-xl font-semibold flex justify-between">
			<span
				:class="['transition-all duration-300 ease-out flex items-center gap-4', curr_page == 'announcements' ? 'text-4xl' : '']">Announcements
				<button v-if="role" onclick="addAnn.showModal()" for=""
					class="grid place-items-center btn btn-sm btn-circle btn-ghost tooltip tooltip-bottom"
					data-tip="New Announcement">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-7 cursor-pointer" viewBox="0 0 24 24">
						<g fill="none" fill-rule="evenodd">
							<path
								d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
							<path class="fill-secondary"
								d="M15.992 3.013C17.326 2.236 19 3.197 19 4.741V8a3 3 0 1 1 0 6v3c0 1.648-1.881 2.589-3.2 1.6l-2.06-1.546A8.658 8.658 0 0 0 10 15.446v2.844a2.71 2.71 0 0 1-5.316.744l-1.57-5.496a4.7 4.7 0 0 1 3.326-7.73l3.018-.168a9.344 9.344 0 0 0 4.19-1.259l2.344-1.368ZM5.634 15.078l.973 3.407A.71.71 0 0 0 8 18.29v-3.01l-1.56-.087a4.723 4.723 0 0 1-.806-.115ZM20 11a1 1 0 0 0-1-1v2a1 1 0 0 0 1-1Z" />
						</g>
					</svg>
				</button>
			</span>

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
		<div v-else id="style-1" class="bg-neutral-800 dark:bg-neutral-50 flex flex-col gap-3 rounded-xl overflow-y-auto">
			<label :for="`my_modal_${i}`"
				class="w-full flex gap-2 justify-between p-2 transition-all duration-300 ease-out dark:hover:bg-neutral-200 hover:bg-neutral-700 rounded-xl"
				v-for="(ann, i) in announcements.sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime())"
				:key="i">

				<input type="checkbox" :id="`my_modal_${i}`" class="modal-toggle" />
				<div class="modal">
					<div
						:class="ann.urgency ? 'modal-box relative outline dark:bg-neutral-50 outline-4 outline-red-600' : 'modal-box relative outline outline-4 outline-neutral-700 dark:outline-neutral-200 dark:bg-neutral-50'">
						<h3 class="font-semibold text-lg uppercase flex gap-2 items-center pt-4">
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
							Date(ann.created_at!)) }}</div>
						<div class="badge badge-primary">{{ new Date(ann.created_at!).toLocaleTimeString([], {
							hour: '2-digit', minute: '2-digit', hour12: true
						}) }}
						</div>
						</p>

						<p v-else class="absolute top-2 right-2 text-xs flex gap-2">
						<div class="badge badge-accent">{{ useNuxtApp().$formatDateWords(new
							Date(ann.created_at!)) }}</div>
						<div class="badge badge-accent">{{ new Date(ann.created_at!).toLocaleTimeString([], {
							hour: '2-digit', minute: '2-digit', hour12: true
						}) }}
						</div>
						</p>

						<div class="modal-action">
							<label v-if="role" :for="`my_modal_${i}`" class="btn btn-sm btn-error"
								@click="useAnnStore().delAnnounce(ann.uuid!)"><span v-if="ann_loading"
									class="loading loading-infinity"></span> Delete</label>
							<label :for="`my_modal_${i}`" class="btn btn-sm">Close!</label>
						</div>
					</div>
				</div>


				<span class="text-neutral-600 w-10 text-xs grid place-items-center">
					{{ i + 1 }}
				</span>
				<span class="flex flex-col justify-center truncate- flex-1 overflow-x-hidden text-lg">
					{{ ann.title }}<br />
					<span :class="[
						'overflow-hidden text-sm text-neutral-400 text-left truncate-',
						curr_page == 'announcements' ? 'max-w-[450px]' : 'w-[200px]'
					]">{{ ann.body }}</span>
				</span>
				<div class="flex flex-col text-xs text-right text-neutral-400">
					<span class="">
						{{ $formatDate(new Date(ann.created_at!)) }}
					</span>
					<span class="">
						{{ $formatDateTime(new Date(ann.created_at!)) }}
					</span>
					<span :class="ann.urgency ? 'badge badge-accent badge-xs self-end' : 'badge badge-info badge-xs self-end'">{{
						ann.urgency ? 'High' : 'Low' }}</span>
				</div>
			</label>


		</div>

		<dialog id="addAnn" class="modal">
			<form method="dialog" class="modal-box dark:bg-neutral-50 dark:text-neutral-900 min-h-fit min-w-[50%]">
				<div class="flex flex-col gap-2 w-full h-full">

					<div class="form-control w-full h-20">
						<label class="label">
							<span class="label-text dark:text-neutral-900">Subject</span>
						</label>
						<input v-model="announcement.title" type="text"
							class="input input-xl text-white dark:text-black dark:bg-neutral-200 bg-neutral-800 flex-1">
					</div>

					<div class="form-control w-full">
						<label class="label">
							<span class="label-text dark:text-neutral-900">Body</span>
						</label>
						<textarea v-model="announcement.body"
							class="textarea outline outline-4 text-white dark:text-black dark:bg-neutral-200 bg-neutral-800  text-2xl dark:outline-neutral-300 outline-neutral-700 w-full"></textarea>
					</div>


					<div class="flex gap-2 w-full h-full pt-4">

						<div class="form-control flex-1 h-24">
							<label class="label">
								<span class="label-text dark:text-neutral-900">Urgency</span>
							</label>
							<select v-model="announcement.urgency"
								class="select flex-1 bg-neutral-800 text-white dark:text-black dark:bg-neutral-200  text-xl">
								<option disabled selected>Importance Level</option>
								<option :value="true">High</option>
								<option :value="false">Low</option>
							</select>
						</div>

						<div class="form-control flex-1 h-24 flex flex-col justify-end">
							<button @click="useAnnStore().Announce()"
								class="btn w-full h-full text-3xl btn-secondary font-semibold">Announce</button>
						</div>

					</div>

				</div>
			</form>
			<form method="dialog" class="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>

	</div>
</template>


<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAnnStore } from '@/store/announce';
import { useProfileStore } from '@/store/profile';

defineProps<{
	curr_page: string
}>()
const { announcements, announcement, ann_loading } = storeToRefs(useAnnStore())
const { role } = storeToRefs(useProfileStore())
</script>
