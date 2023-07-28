<template>
	<div class="w-full h-full flex flex-col rounded-2xl pb-2">
		<div class="w-full h-full rounded-2xl bg-neutral-800 col-span-full row-span-full text-justify relative flex flex-col">

			<header class="w-full h-20 bg-neutral-700 rounded-2xl shadow-xl flex items-center justify-between px-4">
				<h1 class="text-2xl">View All Applicants <span class="">({{ all_my_apls.length }})</span></h1>

				<div class="flex items-center gap-2">
					<div class="join">
						<input @click="() => {
							filter_alpha = true
							filter_recent = false
							filter_reverse = false
						}" :checked="filter_alpha" class="join-item btn btn-xs rounded-full" type="radio" name="options"
							aria-label="Alphabetic" />
						<input @click="() => {
							filter_alpha = false
							filter_recent = true
							filter_reverse = false
						}" :checked="filter_recent" class="join-item btn btn-xs rounded-full" type="radio" name="options"
							aria-label="Recency" />
						<input @click="() => {
							filter_alpha = false
							filter_recent = false
							filter_reverse = true
						}" :checked="filter_reverse" class="join-item btn btn-xs rounded-full" type="radio" name="options"
							aria-label="Reverse" />
					</div>

					<select class="select w-full select-xs rounded-full bg-[rgb(13,13,13)]">
						<option>50</option>
						<option>100</option>
					</select>
				</div>
			</header>


			<div v-if="curr_filtered_apls?.length! > 0" id="style-1" class="overflow-x-auto overflow-Y-auto pb -3 px-2">
				<table class="table relative">
					<!-- head -->
					<thead class="sticky top-0 backdrop-blur-lg border-none z-50">
						<tr class="border-none z-50">
							<th class="font-semibold text-sm">Pos.</th>
							<th class="font-semibold text-sm">Action</th>
							<th class="font-semibold text-sm">Name</th>
							<th class="font-semibold text-sm">Bio</th>
							<th class="font-semibold text-sm">Phone Number</th>
							<th class="font-semibold text-sm">Created At</th>
							<th class="font-semibold text-sm">Type</th>
						</tr>
					</thead>

					<tbody class="">
						<!-- row -->
						<!-- <tr v-for="(apl, i) in all_my_apls" -->
						<tr v-for="(apl, i) in curr_filtered_apls" class="border-b-neutral-700 hover">
							<th class="font-normal">
								{{ i + 1 }}
							</th>
							<th>
								<div class="dropdown dropdown-right">
									<label tabindex="0" class="btn btn-xs rounded-full m-1">options <svg class="w-4 aspect-square"
											xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
											<path fill="#888888"
												d="M4.957 5a1 1 0 0 0-.821 1.571l2.633 3.784a1.5 1.5 0 0 0 2.462 0l2.633-3.784A1 1 0 0 0 11.043 5H4.957Z" />
										</svg></label>
									<ul tabindex="0"
										class="dropdown-content z-[100] menu p-1 shadow bg-base-100 rounded-lg w-52 font-normal">
										<li @click="$router.push(`/applicant/${apl.apl_id}`)"
											class="hover:bg-accent hover:text-black rounded-lg"><a>View</a></li>
										<li class="hover:bg-accent hover:text-black rounded-lg"><a>Request Delete</a></li>
									</ul>
								</div>
							</th>
							<td>
								<div class="flex items-center space-x-3">
									<div>
										<div class="font-semibold">{{ apl.fullName }}</div>
										<div class="text-sm text-neutral-400 z-0">{{ apl.pconf_code ? apl.pconf_code : 'No Confirmation Code'
										}}
										</div>
									</div>
								</div>
							</td>
							<td>
								{{ useNuxtApp().$formatDateWords(new Date(apl.pdob!)) }}
								<br />
								<span class="badge badge-ghost badge-sm mr-1">{{ apl.pcity_ob }}</span>
								<span class="badge badge-ghost badge-sm">{{ apl.pcountry_ob }}</span>
							</td>
							<td>
								<div class="flex flex-col items-end">
									<span class="">
										{{ apl.pcontact }}
									</span>
									<span class="text-xs">
										{{ apl.pother_contact }}
									</span>
								</div>
							</td>
							<td class="">
								<div class="flex flex-col items-end justify-center text-xs">
									<span>{{ useNuxtApp().$formatDate(new Date(apl.created_at!)) }}</span>
									<span>{{ new Date(apl.created_at!).toLocaleTimeString([], {
										hour: '2-digit', minute: '2-digit', hour12: true
									}) }}</span>
								</div>
							</td>
							<td>
								<div class="">
									{{ typeOfApl(apl) }}
								</div>
							</td>
						</tr>
					</tbody>
					<!-- foot -->
					<tfoot>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Job</th>
							<th>Favorite Color</th>
							<th></th>
						</tr>
					</tfoot>

				</table>
			</div>

			<div v-else class="w-full h-full flex flex-col items-center justify-center">
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

				No Applicants Yet.
			</div>

		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app'
import { Applicant } from 'interfaces/interfaces';
import { useTitle } from '@vueuse/core';

useTitle('EG Datapoint | View Applicants')

const { all_my_apls } = storeToRefs(useAppStore())
const page_index = ref(1)

const filter_alpha = ref(true)
const filter_recent = ref(false)
const filter_reverse = ref(false)
const order_alpha_apls = computed(() => sortAplsByName(all_my_apls.value))
const order_recency_apls = computed(() => useNuxtApp().$sortByRecency(all_my_apls.value))
const order_reverse_apls = computed(() => sortAplsByName(all_my_apls.value).reverse())
const curr_filtered_apls = computed(() => {
	if (filter_alpha.value) return order_alpha_apls.value
	if (filter_recent.value) return order_recency_apls.value
	if (filter_reverse.value) return order_reverse_apls.value
})


function sortAplsByName(apls: Applicant[]): Applicant[] {
	return apls.sort((a, b) => a.fullName.localeCompare(b.fullName));
}

const typeOfApl = (apl: Applicant): string | undefined => {
	if (apl.pmarital_status == 'MARRIED' && apl.children_number > 0) {
		return 'Family'
	}
	else if (apl.pmarital_status == 'MARRIED' && apl.children_number == 0) {
		return 'With Spouse Only'
	}
	else if (apl.pmarital_status != 'MARRIED' && apl.children_number > 0) {
		return 'With Kids Only'
	}
	else if (apl.pmarital_status != 'MARRIED' && apl.children_number == 0) {
		return 'Single'
	}
}

</script>
