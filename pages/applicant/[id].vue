<template>
	<div :key="num" class="w-full h-full flex flex-col rounded-2xl">
		<div id="style-1"
			class="w-full h-full rounded-2xl bg-neutral-800 dark:bg-neutral-50 col-span-full row-span-full pb-2 overflow-y-auto text-justify px-0 relative">
			<h1
				:class="['px-5 py-5 rounded-2xl bg-neutral-700 dark:bg-primary dark:text-white text-2xl w-full flex justify-between items-center mb-2 sticky top-0 shadow-lg z-10 transition-all duration-200 ease-in-out', edit_mode ? 'dark:bg-blue-400' : 'dark:bg-primary']">
				<span v-if="!edit_mode" class="text-3xl">Applicant Information
					<br>
					<span class="text-sm">Created At: {{ $formatDateWords(new Date(applicant.created_at!)) }}</span>
				</span>

				<div class="join join-vertical lg:join-horizontal">
					<button v-if="edit_mode" onclick="my_modal_1.showModal()"
						class="btn btn-outline btn-sm rounded-xl text-white hover:text-green-500 dark:hover:text-green-200 join-item bg-none hover:btn-ghost">
						<svg class="w-6 aspect-square stroke-green-500 dark:stroke-green-300" xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24">
							<path fill="none" stroke-dasharray="24" stroke-dashoffset="24" stroke-linecap="round"
								stroke-linejoin="round" stroke-width="2" d="M5 11L11 17L21 7">
								<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="24;0" />
							</path>
						</svg>
						Request
					</button>
					<button v-if="edit_mode" @click="handleClose"
						class="btn btn-outline btn-sm rounded-xl text-white hover:text-red-500 dark:hover:text-red-300 join-item bg-none hover:btn-ghost">
						<svg xmlns="http://www.w3.org/2000/svg" class="w-6 aspect-square stroke-red-600 dark:stroke-red-400"
							viewBox="0 0 24 24">
							<path fill="none" stroke="" stroke-dasharray="12" stroke-dashoffset="12" stroke-linecap="round"
								stroke-width="2" d="M12 12L19 19M12 12L5 5M12 12L5 19M12 12L19 5">
								<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="12;0" />
							</path>
						</svg>
						Quit
					</button>

					<button v-if="!edit_mode" @click="useViewAplStore().$patch(() => edit_mode = true)"
						class="btn btn-outline btn-sm rounded-xl text-white hover:text-blue-500 dark:hover:text-blue-300 join-item bg-none hover:btn-ghost relative">
						<svg xmlns="http://www.w3.org/2000/svg" class="w-6 aspect-square" viewBox="0 0 24 24">
							<g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
								<path stroke-dasharray="56" stroke-dashoffset="56"
									d="M3 21L4.99998 15L16 4C17 3 19 3 20 4C21 5 21 7 20 8L8.99998 19L3 21">
									<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="56;0" />
								</path>
								<g stroke-dasharray="6" stroke-dashoffset="6">
									<path d="M15 5L19 9">
										<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="6;0" />
									</path>
									<path stroke-width="1" d="M6 15L9 18">
										<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="6;0" />
									</path>
								</g>
							</g>
							<path fill="#888888" fill-opacity="0" d="M9 18L18 9L15 6L6 15L9 18Z">
								<animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.15s" values="0;0.3" />
							</path>
						</svg>
						Request Edit
					</button>
					<button v-if="!edit_mode" onclick="my_modal_2.showModal()"
						class="btn btn-outline btn-sm rounded-xl text-white hover:text-red-500 dark:hover:text-red-300 join-item bg-none hover:btn-ghost">
						<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24">
							<g fill="none" stroke="#fff" stroke-linecap="round" stroke-width="2">
								<path stroke-dasharray="20" stroke-dashoffset="20"
									d="M3 21V20C3 17.7909 4.79086 16 7 16H11C13.2091 16 15 17.7909 15 20V21">
									<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="20;0" />
								</path>
								<path stroke-dasharray="20" stroke-dashoffset="20"
									d="M9 13C7.34315 13 6 11.6569 6 10C6 8.34315 7.34315 7 9 7C10.6569 7 12 8.34315 12 10C12 11.6569 10.6569 13 9 13Z">
									<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.4s" values="20;0" />
								</path>
								<path stroke-dasharray="10" stroke-dashoffset="10" d="M15 3L21 9">
									<animate fill="freeze" attributeName="stroke-dashoffset" begin="1s" dur="0.2s" values="10;0" />
								</path>
								<path stroke-dasharray="10" stroke-dashoffset="10" d="M21 3L15 9">
									<animate fill="freeze" attributeName="stroke-dashoffset" begin="1.2s" dur="0.2s" values="10;0" />
								</path>
							</g>
						</svg>
						Request Delete
					</button>
				</div>

				<span v-if="!edit_mode" class="text-sm font-semibold text-right">{{ applicant.fullName ? applicant.fullName :
					'Applicant' }}<br />By:
					{{
						creator
					}}<br />Location:
					{{ applicant?.location?.toUpperCase() }}
				</span>
				<div v-else class="flex gap-3">
					<TextInput v-model="applicant.plastName">Last Name</TextInput>
					<TextInput v-model="applicant.pfirstName">First Name</TextInput>
					<TextInput v-model="applicant.potherName">Other Name</TextInput>
				</div>
			</h1>


			<ViewApplicantV2 v-if="!loading" />
			<div v-else class="w-full h-1/2 flex items-end">
				<Loading class="bg-transparent" />
			</div>

		</div>
		<dialog id="my_modal_1" class="modal">
			<form method="dialog" class="modal-box bg-neutral-900 dark:bg-neutral-50">
				<h3 class="font-semibold text-lg text-white dark:text-black flex items-center gap-3">
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
						<g stroke="#888888" stroke-linecap="round" stroke-width="2">
							<path fill="#dc1010" fill-opacity="0" stroke-dasharray="60" stroke-dashoffset="60"
								d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z">
								<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0" />
								<animate fill="freeze" attributeName="fill-opacity" begin="1.2s" dur="0.15s" values="0;0.3" />
							</path>
							<path fill="none" stroke-dasharray="8" stroke-dashoffset="8" d="M12 7V13">
								<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8;0" />
							</path>
						</g>
						<circle cx="12" cy="17" r="1" fill="#888888" fill-opacity="0">
							<animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.4s" values="0;1" />
						</circle>
					</svg>
					Are you sure you want to send this request?
				</h3>
				<textarea v-model="request.body"
					class="textarea textarea-bordered w-full bg-black dark:bg-neutral-200 dark:text-black dark:border-none text-white mt-3"
					placeholder="What's your reason for editing?..."></textarea>
				<p class="text-white font-semibold py-4 text-right text-sm dark:text-red-400">Review and
					cross-check your request
					before sending!
				</p>
				<div class="modal-action">
					<!-- if there is a button in form, it will close the modal -->
					<button v-if="request.body" class="btn btn-primary text-white" @click="handleEditSubmit">Submit</button>
					<button @click="request.body = ''" class="btn btn-error text-white">Close</button>
				</div>
			</form>
		</dialog>

		<dialog id="my_modal_2" class="modal">
			<form method="dialog" class="modal-box bg-red-950 dark:bg-red-700 w-5/6 max-w-5xl">
				<h3 class="text-lg text-white flex items-center gap-3">
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
						<g stroke="#888888" stroke-linecap="round" stroke-width="2">
							<path fill="#dc1010" fill-opacity="0" stroke-dasharray="60" stroke-dashoffset="60"
								d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z">
								<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0" />
								<animate fill="freeze" attributeName="fill-opacity" begin="1.2s" dur="0.15s" values="0;0.3" />
							</path>
							<path fill="none" stroke-dasharray="8" stroke-dashoffset="8" d="M12 7V13">
								<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8;0" />
							</path>
						</g>
						<circle cx="12" cy="17" r="1" fill="#888888" fill-opacity="0">
							<animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.4s" values="0;1" />
						</circle>
					</svg>
					Are you sure you want to send this request to delete the Applicant:<br /> <span class="text-bold">{{
						applicant?.fullName }}</span>
				</h3>
				<textarea v-model="request.body" class="textarea textarea-bordered w-full bg-red-900 border-none text-white mt-3"
					placeholder="What's your reason for editing?..."></textarea>
				<p class="text-white py-4 text-right text-xs">Review and cross-check your request before sending!</p>
				<div class="modal-action">
					<!-- if there is a button in form, it will close the modal -->
					<button @click="handleDeleteSubmit" v-if="request.body" class="btn btn-primary text-white">Submit</button>
					<button @click="request.body = ''" class="btn btn-error text-white">Close</button>
				</div>
			</form>
		</dialog>

		<input :checked="if_sent" type="checkbox" id="my_modal_09" class="modal-toggle" />
		<div class="modal">
			<div class="modal-box">
				<p class="py-4 text-center text-2xl">Request Sent!</p>
				<div class="modal-action">
					<label class="btn btn-sm btn-ghost" for="my_modal_09">Close</label>
				</div>
			</div>
		</div>

	</div>
</template>

<!-- TODO before the req is sent check to see if any user has already req for a deleting of that particular applicant -->

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAplStore } from '@/store/apl'
import { useProfileStore } from '@/store/profile'
import { useRequestStore } from '@/store/requests'
import { useViewAplStore } from '@/store/viewApl';
import { Applicant, Requests } from '@/interfaces/interfaces';
import { useAppStore } from '@/store/app';

let num = ref(0)
const { applicant, edit_mode, request } = storeToRefs(useViewAplStore())

let loading = ref(false)
const if_sent = ref(false)

onMounted(async () => {
	loading.value = true
	const data = await getApl(applicant.value.apl_id!)
	loading.value = false
	useViewAplStore().$patch(() => {
		edit_mode.value = false
		request.value = nullReq.value
		applicant.value = data
	})
})

const fullName = computed(() => {
	if (!applicant.value.potherName) return `${applicant.value.plastName} ${applicant.value.pfirstName}`.trim()
	if (applicant.value.potherName) return `${applicant.value.plastName} ${applicant.value.pfirstName} ${applicant.value.potherName}`.trim()
})

const creator = computed(() => useProfileStore().profiles.find(prof => prof.id == applicant.value.user_id)?.fullname)

async function handleClose() {
	const data = await getApl(applicant.value.apl_id!)
	useViewAplStore().$patch(() => {
		edit_mode.value = false
		request.value = nullReq.value
		applicant.value = data
	})
}

async function getApl(id: string) {
	try {
		let { data, error } = await useNuxtApp().$SB.from('applicants').select('*').eq('apl_id', id)
		if (error) throw error

		return data![0]
	} catch (err) {
		console.log(err);
	}
}

function assignPrice(applicant: Applicant) {
	const pricer = useAppStore().prices;
	let price: number = 0;

	const if_sp = applicant.pmarital_status == "MARRIED";
	const if_wa = applicant.children_number > 0;

	if (pricer) {
		if (!if_sp && if_wa) {
			price = pricer.adult + pricer.child * applicant.children_number;
		} else if (if_sp && !if_wa) {
			price = pricer.adult * 2;
		} else if (if_sp && if_wa) {
			price =
				pricer.adult * 2 + pricer.child * applicant.children_number;
		} else if (!if_sp && !if_wa) {
			price = pricer.adult;
		}
	} else {
		throw new Error("Get Prices First");
	}

	// console.log(pricer, price);

	applicant.totalPayment = price;

	console.log(price);
	console.log(applicant.totalPayment);

	return applicant
}

async function handleEditSubmit() {
	const viewApl = useViewAplStore()
	if (!request.value.body) return
	applicant.value.fullName = fullName.value!

	let apl = assignPrice(applicant.value)

	viewApl.$patch(() => {
		request.value.fullName = fullName.value
		request.value.modified_apl = apl
		request.value.apl_id = apl.apl_id!
		request.value.modify_type = 'edit'
		request.value.status = 'pending'
		request.value.user_id = useSupabaseUser().value?.id!
	})

	loading.value = true
	let data = await useRequestStore().sendRequest(request.value!)
	if (data) if_sent.value = true
	loading.value = false

	console.log('done');

	const DATA = await getApl(applicant.value.apl_id!)
	viewApl.$patch(() => {
		edit_mode.value = false
		applicant.value = DATA
		request.value = nullReq.value
	})
	num.value++
	await useAppStore().getTotalApls()
}

async function handleDeleteSubmit() {
	const viewApl = useViewAplStore()
	if (!request.value.body) return

	viewApl.$patch(() => {
		request.value.fullName = fullName.value
		request.value.modified_apl = applicant.value
		request.value.apl_id = applicant.value.apl_id!
		request.value.modify_type = 'delete'
		request.value.status = 'pending'
		request.value.user_id = useSupabaseUser().value?.id!
	})

	loading.value = true
	let data = await useRequestStore().sendRequest(request.value!)
	if (data) if_sent.value = true
	loading.value = false

	console.log('done');

	viewApl.$patch(() => {
		edit_mode.value = false
		request.value = nullReq.value
	})
	num.value++
}

const nullReq = ref<Requests>({
	apl_id: '',
	modified_apl: null,
	modify_type: '',
	body: '',
	status: 'pending',
	user_id: '',
	fullName: undefined
})
</script>
