<template>
	<div class="__calendar col-span-3 row-span-15 px-2 flex flex-col items-center">
		<div class="bg-neutral-800 w-full h-full rounded-xl flex flex-col items-center justify-between gap-2 px-0 pb-4">
			<div class="flex flex-col items-center w-full min-h-1/2 px-4">
				<h2 class="w-full text-xl pt-3">Calendar</h2>
				<VCalendar expanded title-position="right" :attributes='attrs' :color="selectedClr" isDark="true" transparent
					borderless class="mt-2">
				</VCalendar>
			</div>
			<span class="w-full pl-4">{{ $formatDateWords(new Date()) }}</span>

			<div class="rounded-none w-full h-full flex flex-col gap-2 overflow-y-scroll" id="style-1">

				<div class="flex-1 flex-col flex gap-1">

					<div v-for="(ann, i) in recent_ann" class="pl-4">

						<label
							class="w-full h-16 border-t-2 border-neutral-700 flex items-center justify-between gap-2 cursor-pointer hover:text-neutral-300 transition-all duration-200 ease-in-out"
							:for="`my_modal_${i}`">

							<input type="checkbox" :id="`my_modal_${i}`" class="modal-toggle" />
							<div class="modal">
								<div
									:class="ann.urgency ? 'modal-box relative outline outline-4 outline-red-600' : 'modal-box relative outline outline-4 outline-neutral-700'">
									<h3 class="font-semibold text-lg uppercase flex gap-2 items-center">
										<svg v-if="!ann.urgency" xmlns="http://www.w3.org/2000/svg" class="w-7 aspect-square"
											viewBox="0 0 24 24">
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


							<div class="w-10 h-10 aspect-square rounded-xl grid place-items-center">
								<svg v-if="!ann.urgency" xmlns="http://www.w3.org/2000/svg" class="w-8 aspect-square" viewBox="0 0 24 24">
									<g stroke="#888888" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
										<circle cx="12" cy="12" r="9" fill="#888888" fill-opacity="0">
											<animate fill="freeze" attributeName="fill-opacity" begin="0.2s" dur="0.15s" values="0;0.3" />
										</circle>
										<path fill="none" stroke-dasharray="14" stroke-dashoffset="14" d="M8 12L11 15L16 10">
											<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="14;0" />
										</path>
									</g>
								</svg>
								<svg v-else xmlns="http://www.w3.org/2000/svg" class="w-8 aspect-square" viewBox="0 0 24 24">
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
							</div>
							<div class="flex-1 flex flex-col truncate">
								<span class="text-md truncate">{{ ann.title }}</span>
								<!-- <span class="text-sm truncate">{{ ann.body }}</span> -->
							</div>
							<div class="text-xs flex flex-col items-end">
								<span>{{ new Date(ann.created_at).toLocaleTimeString([], {
									hour: '2-digit', minute: '2-digit', hour12: true
								}) }}</span>
								<span>{{ useNuxtApp().$formatDate(new Date(ann.created_at)) }}</span>
							</div>
						</label>
					</div>

					<div v-if="recent_ann.length == 0" class="w-full h-full px-4 grid place-items-center">
						<div class="flex flex-col gap-2 items-center">
							<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
								<g fill="none" fill-rule="evenodd">
									<path
										d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
									<path fill="#888888"
										d="M19 4.741V8a3 3 0 1 1 0 6v3c0 1.648-1.881 2.589-3.2 1.6l-2.06-1.546A8.658 8.658 0 0 0 10 15.446v2.844a2.71 2.71 0 0 1-5.316.744l-1.57-5.496a4.7 4.7 0 0 1 3.326-7.73l3.018-.168a9.344 9.344 0 0 0 4.19-1.259l2.344-1.368C17.326 2.236 19 3.197 19 4.741ZM5.634 15.078l.973 3.407A.71.71 0 0 0 8 18.29v-3.01l-1.56-.087a4.723 4.723 0 0 1-.806-.115ZM17 4.741L14.655 6.11A11.343 11.343 0 0 1 10 7.604v5.819c1.787.246 3.488.943 4.94 2.031L17 17V4.741ZM8 7.724l-1.45.08a2.7 2.7 0 0 0-.17 5.377l.17.015l1.45.08V7.724ZM19 10v2a1 1 0 0 0 .117-1.993L19 10Z" />
								</g>
							</svg>

							<span class="text-sm">No Announcements</span>
						</div>
					</div>
				</div>
			</div>
			<div v-if="announcements.length > 0"
				class="ann_btn w-[90%] whitespace-nowrap text-sm mx-auto bg-neutral-700 py-3 text-center rounded-xl">view
				({{
					announcements.length - 4 }}) more
				announcement(s)</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAnnStore } from '@/store/announce';
import { storeToRefs } from 'pinia';

const { announcements } = storeToRefs(useAnnStore())

const recent_ann = computed(() => {
	return announcements.value.slice(0, 4).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
})

const selectedClr = ref('purple')
const attrs = ref([
	{
		key: 'test',
		bar: {
			style: {
			},
		},
		dates: { start: new Date(), end: new Date() },
	}
]);
</script>
