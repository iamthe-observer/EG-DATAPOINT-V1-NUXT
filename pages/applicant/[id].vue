<template>
	<div class="w-full h-full flex flex-col rounded-2xl pb-2">
		<div
			class="w-full h-full rounded-2xl bg-neutral-800 col-span-full row-span-full pb-2 overflow-y-scroll scrollbar-hidden text-justify px-0 relative">
			<h1 class="px-5 py-5 rounded-2xl bg-neutral-700 text-2xl w-full flex justify-between items-center mb-2 sticky top-0
				shadow-lg z-10">
				<span class="">Applicant Information</span>

				<div class="join join-vertical lg:join-horizontal">
					<button @click="useAplStore().toggleEditMode"
						class="btn btn-outline rounded-xl text-white hover:text-blue-500 join-item bg-none hover:btn-ghost">
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
						Edit
					</button>
					<button @click=""
						class="btn btn-outline rounded-xl text-white hover:text-red-500 join-item bg-none hover:btn-ghost">
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
						Delete
					</button>
				</div>

				<span class="">{{ apl?.fullName }}</span>
			</h1>


			<ViewApplicant :apl="apl" />

		</div>
	</div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app';
import { storeToRefs } from 'pinia';
import { Applicant } from '@/interfaces/interfaces';
import { useAplStore } from '@/store/apl'

const { _route } = useNuxtApp()
const { total_apls } = storeToRefs(useAppStore())

const apl = ref<Applicant>({
	apl_id: '',
	aplImg_path: {
		primePath: [],
		secPath: [],
		wardsPath: []
	},
	children_number: 0,
	created_at: null,
	fullName: '',
	passport_ex: null,
	pcity_ob: '',
	pconf_code: '',
	pcontact: '',
	pcountry_live_today: '',
	pcountry_ob: '',
	pdob: null,
	peducation_level: '',
	pemail: '',
	pfirstName: '',
	pgender: '',
	plastName: '',
	pmarital_status: '',
	pother_contact: '',
	potherName: '',
	ppassport_number: '',
	ppostal: '',
	psocial_media: {
		facebook: '',
		instagram: '',
		twitter: '',
	},
	scity_ob: '',
	scontact: '',
	scountry_ob: '',
	sdob: null,
	sfirstName: '',
	sgender: '',
	slastName: '',
	sotherName: '',
	totalPayment: 0,
	user_id: useSupabaseUser().value?.id!,
	wards: []
})

onMounted(async () => {
	await useAppStore().getTotalApls()
	let aplVal = total_apls.value.filter(applicant => applicant.apl_id == _route.params.id)[0]

	apl.value = aplVal
})

</script>
