<template>
	<div class="__newApl relative w-full grid grid-cols-12 gap-2 px-5 py-2">
		<avatarSelect @click="logger(apl)" class="col-span-2 row-span-2" />
		<!-- name -->
		<div class="flex gap-4 col-span-10 pl-6 justify-center">
			<TextInput @update:model-value="handleKeyPress" v-model="apl.pfirstName">First Name</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="apl.potherName">Middle Name</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="apl.plastName">Last Name</TextInput>
		</div>

		<div class="flex gap-4 col-span-10 pl-6 justify-center">
			<TextInput @update:model-value="handleKeyPress" v-model="apl.pdob_day">Date of Birth</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="apl.pgender">Gender</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="apl.pcity_ob">City of Birth</TextInput>
		</div>

		<!-- <div class="flex gap-4 col-span-12 justify-center">
			<TextInput v-model="">Confirmation Code</TextInput>
		</div> -->

		<div class="flex gap-4 col-span-12 justify-center">
			<TextInput @update:model-value="handleKeyPress" v-model="apl.pcountry_ob">Country of Birth</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="apl.pcontact">Phone Number</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="apl.pother_contact">Next of Kin's Phone Number</TextInput>
		</div>

		<div class="flex gap-4 col-span-12 justify-center">
			<TextInput @update:model-value="handleKeyPress" v-model="apl.pemail">Email</TextInput>
		</div>

		<div class="flex gap-4 col-span-12 justify-center">
			<TextInput @update:model-value="handleKeyPress" v-model="apl.ppassport_number">Passport Number</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="apl.passport_ex_day">Passport Expiration Date</TextInput>
		</div>

		<div class="flex gap-4 col-span-12 justify-center">
			<TextInput @update:model-value="handleKeyPress" v-model="apl.ppostal">Residential Address</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="apl.pcountry_live_today">Country where you like today
			</TextInput>
		</div>

		<div class="flex gap-4 col-span-12 justify-center">
			<TextInput @update:model-value="handleKeyPress" v-model="apl.psocial_media.facebook">Facebook</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="apl.psocial_media.instagram">Instagram</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="apl.psocial_media.twitter">Twitter</TextInput>
		</div>

		<div class="flex gap-4 col-span-12 justify-center">
			<TextInput @update:model-value="handleKeyPress" v-model="apl.pmarital_status">Marital Status</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="apl.peducation_level">Highest Level of Education
			</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="apl.children_number">Number of Children</TextInput>
		</div>

	</div>
</template>

<script setup lang="ts">
import { Applicant } from '@/interfaces/interfaces'
const emit = defineEmits(['apl'])
const props = defineProps<{
	apl_id: string
}>()
const logger = (log: any) => {
	console.log(log)
}
const handleKeyPress = () => {
	emit('apl', apl)
}
const apl = reactive<Applicant>({
	created_at: new Date(),
	apl_id: props.apl_id,
	plastName: '',
	pfirstName: '',
	potherName: '',
	pdob_day: '',
	pdob_month: '',
	pdob_year: '',
	pcity_ob: '',
	pcountry_ob: '',
	pgender: '',
	pconf_code: '',
	pemail: '',
	ppassport_number: '',
	passport_ex_day: '',
	passport_ex_month: '',
	passport_ex_year: '',
	pcountry_live_today: '',
	peducation_level: '',
	ppostal: '',
	pmarital_status: 'unmarried',
	children_number: 0,
	fullName: '',
	user_id: 'useSupabaseClient().auth.user()!.id',
	pcontact: '',
	slastName: '',
	sfirstName: '',
	sotherName: '',
	scity_ob: '',
	scountry_ob: '',
	sgender: '',
	wards: [],
	sdob_day: '',
	sdob_month: '',
	sdob_year: '',
	totalPayment: 0,
	passportAvail: false,
	created_at_date: new Date().toLocaleString().split(',')[0],
	pother_contact: '',
	psocial_media: {
		facebook: '',
		instagram: '',
		twitter: '',
	},
	aplImg_path: {
		primePath: [],
		secPath: [],
		wardsPath: [],
	},
})

watchEffect(() => {
	if (apl) {
		emit('apl', apl)
	}
})
</script>