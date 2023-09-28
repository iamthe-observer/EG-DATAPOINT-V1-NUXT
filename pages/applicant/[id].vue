<template>
	<div ref="container" class="bg-white w-full h-full flex flex-col text-black absolute inset-0">
		<div class="w-full h-full flex flex-col relative">

			<header
				class="w-full min-h-fit bg-purple-500 dark:bg-primary pl-16 rounded-none border-b-2 border-black flex justify-between items-center p-5">

				<span v-if="!edit_mode" class="text-3xl">Applicant Information
					<br>
					<span class="text-sm">Created At: {{ $formatDateWords(new Date(applicant.created_at!)) }}</span>
				</span>

				<span v-if="!edit_mode" class="text-sm font-semibold text-center">{{ applicant.fullName ? applicant.fullName :
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

				<div
					class="join join-vertical rounded-none text-black border-2 border-black hover:-translate-y-1 hover:shadow-neo-box transition- duration-150 ease-out bg-black">
					<button v-if="edit_mode" onclick="my_modal_1.showModal()"
						class="btn btn-sm rounded-none border-none text-black hover:text-green-500 dark:hover:text-green-200 join-item">
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
						class="btn btn-sm rounded-none border-none text-black hover:text-red-500 dark:hover:text-red-300 join-item">
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
						class="btn bg-blue-200 hover:bg-blue-400 border-none btn-sm rounded-none text-blue-400 hover:text-blue-200 join-item relative group flex items-center justify-start">
						<svg xmlns="http://www.w3.org/2000/svg" class="w-6 aspect-square" viewBox="0 0 24 24">
							<g fill="none" class="group-hover:stroke-blue-200 stroke-blue-400" stroke-linecap="round"
								stroke-linejoin="round" stroke-width="2">
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
						class="btn bg-red-200 hover:bg-red-400 border-none btn-sm rounded-none text-red-400 hover:text-red-200 join-item relative group flex items-center justify-start">
						<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24">
							<g fill="none" class="group-hover:stroke-red-200 stroke-red-400" stroke-linecap="round" stroke-width="2">
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

			</header>

			<div class="w-full h-full overflow-y-auto">
				<ViewApplicantV2 />
			</div>

		</div>
	</div>
</template>

<!-- TODO before the req is sent check to see if any user has already req for a deleting of that particular applicant -->

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useProfileStore } from '@/store/profile'
import { useRequestStore } from '@/store/requests'
import { useViewAplStore } from '@/store/viewApl';
import { Applicant, Requests } from '@/interfaces/interfaces';
import { useAppStore } from '@/store/app';

let num = ref(0)
const { applicant, edit_mode, request, if_applicant_ex } = storeToRefs(useViewAplStore())

let loading = ref(false)
const if_sent = ref(false)

onMounted(async () => {
	loading.value = true
	if (!if_applicant_ex.value) {
		const data = await getApl(applicant.value.apl_id!)
		loading.value = false
		useViewAplStore().$patch(() => {
			edit_mode.value = false
			request.value = nullReq.value
			applicant.value = data
		})
	} else {
		try {
			const { data, error } = await useNuxtApp().$SB.from('applicants_ex').select('*').eq('apl_id', applicant.value.apl_id!)
			if (error) throw error
			loading.value = false
			useViewAplStore().$patch(() => {
				edit_mode.value = false
				request.value = nullReq.value
				applicant.value = data[0]!
			})
		} catch (error) {
			console.error(error)
		}
	}
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
