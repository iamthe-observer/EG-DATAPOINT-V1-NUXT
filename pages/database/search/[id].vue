<template>
	<div class="w-full h-full flex flex-col rounded-2xl pb-2">
		<div
			class="w-full h-full rounded-2xl bg-neutral-800 col-span-full row-span-full pb-2 overflow-y-scroll scrollbar-hidden text-justify px-0 relative">
			<h1 class="px-5 py-5 rounded-2xl bg-neutral-700 text-2xl w-full flex justify-between items-center mb-2 sticky top-0
				shadow-lg z-10">
				<span class="">Applicant Information</span>
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
	created_at: new Date(),
	fullName: '',
	passport_ex: new Date(),
	pcity_ob: '',
	pconf_code: '',
	pcontact: '',
	pcountry_live_today: '',
	pcountry_ob: '',
	pdob: new Date(),
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
	sdob: new Date(),
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

<style scoped></style>