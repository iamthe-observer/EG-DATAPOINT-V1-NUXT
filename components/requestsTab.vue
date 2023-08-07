<template>
	<div v-if="curr_page == 'requests' || curr_page == ''"
		class="w-full h-full rounded-xl p-1 overflow-y-hidden flex flex-col">
		<h1 class="py-1 px-1 text-xl font-semibold flex justify-between items-center">
			<span :class="['transition-all duration-300 ease-out', curr_page == 'requests' ? 'text-4xl' : '']">Requests</span>

			<select v-model="filter_val" class="select select-xs w-fit max-w-xs dark:bg-neutral-50">
				<option disabled selected>Filter</option>
				<option value="all">All</option>
				<option value="pending">Pending</option>
				<option value="rejected">Rejected</option>
				<option value="approved">Approved</option>
				<option value="discount">Discount</option>
				<option value="edit">Edit</option>
				<option value="delete">Delete</option>
			</select>

			<span class="">{{ curr_filtered_req.length }}</span>
		</h1>
		<!-- if no requests -->
		<div v-if="curr_filtered_req!.length == 0" class="w-full h-full grid place-items-center">
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
				<span class="text-center">No Requests</span>
			</div>
		</div>

		<!-- contains all requests -->
		<div v-else id="style-1" class="bg-neutral-800 dark:bg-neutral-100 flex flex-col gap-3 rounded-xl overflow-y-auto">
			<label :for="`my_modal_${i}`"
				class="w-full flex gap-2 justify-between p-2 dark:hover:bg-neutral-200 hover:bg-neutral-700 rounded-xl"
				v-for="(req, i) in curr_filtered_req.sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime())"
				:key="i">

				<input type="checkbox" :id="`my_modal_${i}`" class="modal-toggle" />
				<div class="modal">
					<div :class="[req.status == 'rejected' ? 'modal-box relative outline outline-4 outline-red-600 pt-10' : 'modal-box relative outline outline-4 outline-neutral-700 dark:outline-neutral-200 pt-10',
					req.status == 'approved' ? 'modal-box relative outline outline-4 outline-success pt-10' : 'modal-box relative outline outline-4 outline-neutral-700 dark:outline-neutral-200 pt-10',
						'dark:bg-neutral-50'
					]">
						<h3 class="font-semibold text-lg uppercase flex gap-2 items-center">
							<svg v-if="req.status == 'pending'" xmlns="http://www.w3.org/2000/svg" class="w-7 aspect-square"
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
							<svg v-else-if="req.status == 'approved'" xmlns="http://www.w3.org/2000/svg" class="w-7 aspect-square"
								viewBox="0 0 24 24">
								<g stroke="green" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
									<circle cx="12" cy="12" r="9" fill="green" fill-opacity="0">
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
							{{ req.modify_type == 'delete' ? req.fullName : null }}
							{{ req.modify_type == 'edit' ? req.fullName : null }}
							{{ req.modify_type == 'discount' ? req.modified_apl?.fullName : null }}
						</h3>
						<p class="py-4">{{ req.modify_type == 'discount' ? 'GHC' : '' }}{{
							req.body }}{{ req.modify_type == 'discount' ? '.00' : '' }}</p>

						<p v-if="req.modified_apl" class="badge badge-neutral">{{ typeOfApl(req.modified_apl!) }}</p>
						<p v-if="req.modified_apl" class="badge badge-neutral ml-1">By: {{ profiles.find(user => user.id ==
							req.user_id)!.fullname }}</p>

						<p class="absolute top-2 left-2 text-xs flex gap-2 items-center badge badge-outline">
							{{ req.modify_type.toUpperCase() }} REQUEST
						</p>

						<p v-if="req.status == 'pending'" class="absolute top-2 right-2 text-xs flex gap-2 items-center">
						<div class="badge-sm badge badge-primary">{{ useNuxtApp().$formatDateWords(new
							Date(req.created_at!)) }}</div>
						<div class="badge-sm badge badge-primary">{{ new Date(req.created_at!).toLocaleTimeString([], {
							hour: '2-digit', minute: '2-digit', hour12: true
						}) }}
						</div>
						<div class="badge-sm badge badge-ghost">{{ req.status }}</div>
						</p>

						<p v-else-if="req.status == 'approved'" class="absolute top-2 right-2 text-xs flex gap-2 items-center">
						<div class="badge-sm badge badge-success">{{ useNuxtApp().$formatDateWords(new
							Date(req.created_at!)) }}</div>
						<div class="badge-sm badge badge-success">{{ new Date(req.created_at!).toLocaleTimeString([], {
							hour: '2-digit', minute: '2-digit', hour12: true
						}) }}
						</div>
						<div class="badge-sm badge badge-success">{{ req.status }}</div>
						</p>

						<p v-else class="absolute top-2 right-2 text-xs flex gap-2 items-center">
						<div class="badge-sm badge badge-error">{{ useNuxtApp().$formatDateWords(new
							Date(req.created_at!)) }}</div>
						<div class="badge-sm badge badge-error">{{ new Date(req.created_at!).toLocaleTimeString([], {
							hour: '2-digit', minute: '2-digit', hour12: true
						}) }}
						</div>
						<div class="badge-sm badge badge-error">{{ req.status }}</div>
						</p>

						<div class="modal-action">
							<div v-if="req.status == 'pending'" class="join">
								<label :for="`my_modal_${i}`" v-if="role" @click="handleApprove(req)"
									class="join-item btn btn-success btn-sm">Approve</label>
								<label :for="`my_modal_${i}`" v-if="role" @click="handleReject(req)"
									class="join-item btn btn-error btn-sm">Reject</label>
								<label :for="`my_modal_${i}`" v-if="req.modify_type !== 'discount' && role" @click="handleOpen(req)"
									class="join-item btn btn-primary btn-sm">Open</label>
								<label :for="`my_modal_${i}`" class="join-item btn btn-sm">Close</label>
							</div>
							<label v-else :for="`my_modal_${i}`" class="join-item btn btn-sm">Close</label>
						</div>
					</div>
				</div>


				<span class="text-neutral-600 w-10 text-xs grid place-items-center">
					{{ i + 1 }}
				</span>
				<span class="flex flex-col justify-center w-full truncate- justify-self-stretch">
					{{ req.modify_type == 'delete' ? req.fullName : null }}
					{{ req.modify_type == 'edit' ? req.fullName : null }}
					{{ req.modify_type == 'discount' ? req.modified_apl?.fullName : null }}
					<span class="text-xs pb-1 truncate- truncate w-1/2">{{ req.modify_type == 'discount' ? 'GHC' : '' }}{{
						req.body }}{{ req.modify_type == 'discount' ? '.00' : '' }}</span>
					<span :class="req.modify_type == 'delete' ? 'badge badge-accent badge-xs' : 'badge badge-primary badge-xs'">{{
						req.modify_type }}</span>
				</span>
				<div class="flex flex-col text-xs text-right text-neutral-400">
					<span class="">
						{{ getCreatedAtDate(req) }}
					</span>
					<span class="">
						{{ getCreatedAtTime(req) }}
					</span>
					<span
						:class="[getStatus(req) == 'pending' ? 'text-secondary dark:text-accent' : '', getStatus(req) == 'rejected' ? 'text-error' : '', getStatus(req) == 'approved' ? 'text-success' : '', 'text-sm']">
						{{ getStatus(req) }}
					</span>
				</div>
			</label>
		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRequestStore } from '@/store/requests';
import { Applicant, Requests } from '@/interfaces/interfaces';
import { useProfileStore } from '@/store/profile';
import { useAplStore } from '@/store/apl';

const { $SB } = useNuxtApp()
defineProps<{
	curr_page: string
}>()
const { requests, my_requests, } = storeToRefs(useRequestStore())
const { role, profiles } = storeToRefs(useProfileStore())

const filter_val = ref('pending')
const curr_filtered_req = computed(() => {
	if (role.value) {
		if (filter_val.value == 'all') return requests.value
		if (filter_val.value == 'pending') return requests.value.filter(req => req.status == 'pending')
		if (filter_val.value == 'rejected') return requests.value.filter(req => req.status == 'rejected')
		if (filter_val.value == 'approved') return requests.value.filter(req => req.status == 'approved')
		if (filter_val.value == 'edit') return requests.value.filter(req => req.modify_type == 'edit')
		if (filter_val.value == 'delete') return requests.value.filter(req => req.modify_type == 'delete')
		if (filter_val.value == 'discount') return requests.value.filter(req => req.modify_type == 'discount')
	} else {
		if (filter_val.value == 'all') return my_requests.value
		if (filter_val.value == 'pending') return my_requests.value.filter(req => req.status == 'pending')
		if (filter_val.value == 'rejected') return my_requests.value.filter(req => req.status == 'rejected')
		if (filter_val.value == 'approved') return my_requests.value.filter(req => req.status == 'approved')
		if (filter_val.value == 'edit') return my_requests.value.filter(req => req.modify_type == 'edit')
		if (filter_val.value == 'delete') return my_requests.value.filter(req => req.modify_type == 'delete')
		if (filter_val.value == 'discount') return my_requests.value.filter(req => req.modify_type == 'discount')
	}
	return []
})

const typeOfApl = (apl: Applicant): string | undefined => {
	if (apl) {
		if (apl.pmarital_status == 'MARRIED' && apl.children_number > 0) {
			return '👨‍👩‍👧‍👦 Family'
		}
		else if (apl.pmarital_status == 'MARRIED' && apl.children_number == 0) {
			return '👩🏿‍🤝‍👨🏾 With Spouse Only'
		}
		else if (apl.pmarital_status != 'MARRIED' && apl.children_number > 0) {
			return '👶🏾 With Kids Only'
		}
		else if (apl.pmarital_status != 'MARRIED' && apl.children_number == 0) {
			return '🧍🏾 Single'
		}
	}
}

function getStatus(req: Requests) {
	return req.status
}

function getCreatedAtDate(req: Requests) {
	return useNuxtApp().$formatDate(new Date(req.created_at!)) || ''
}
function getCreatedAtTime(req: Requests) {
	return useNuxtApp().$formatDateTime(new Date(req.created_at!)) || ''
}

async function deleteApplicant(req: Requests) {
	try {
		let { data, error } = await useNuxtApp().$SB.from('applicants').delete().eq('apl_id', req.apl_id)
		if (error) throw error

		return await updateRequestType(req, 'approved')
	} catch (error) {
		console.log(error);
	}
}

async function updateRequestType(req: Requests, type: string) {
	try {
		let { data, error } = await useNuxtApp().$SB.from('requests').update({ status: type }).eq('id', req.id)
		if (error) throw error
		return data
	} catch (error) {
		console.log(error);
	}
}

async function approveDiscount(req: Requests) {
	req.modified_apl!.totalPayment = Number(req.body)

	try {
		let { data, error } = await $SB.from('applicants').insert(req.modified_apl).select()
		if (error) throw error
		console.log(data);

		return data
	} catch (error) {
		console.log(error);
	}
}

async function updateApplicant(req: Requests) {
	let apl = req.modified_apl
	try {
		let { data, error } = await $SB
			.from('applicants')
			.update(apl)
			.eq('apl_id', req.apl_id)
			.select()
		if (error) throw error
		console.log(data);
		return data
	} catch (error) {
		console.log(error);
	}
}

async function handleApprove(req: Requests) {
	// type of request
	let ty = req.modify_type

	if (ty == 'delete') {
		await deleteApplicant(req)
		await updateRequestType(req, 'approved')

	} else if (ty == 'discount') {
		await approveDiscount(req)
		await updateRequestType(req, 'approved')

	} else if (ty == 'edit') {
		await updateApplicant(req)
		await updateRequestType(req, 'approved')
	}
}

async function handleReject(req: Requests) {
	let ty = req.modify_type
	if (ty == 'delete') {
		await updateRequestType(req, 'rejected')
	}
	if (ty == 'discount') {
		await updateRequestType(req, 'rejected')
	}
	if (ty == 'edit') {
		await updateRequestType(req, 'rejected')
	}
}

async function handleOpen(req: Requests) {
	useNuxtApp().$router.push(`/compareApl/${req.id}`)
	useAplStore().$patch({
		curr_compared_request: req
	})
	console.log(req.modified_apl?.fullName);
}

// TODO add delete and update ann
</script>

<style scoped></style>