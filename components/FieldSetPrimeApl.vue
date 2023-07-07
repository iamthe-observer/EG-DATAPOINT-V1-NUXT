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
			<DatePicker @click="handleKeyPress" dark :color="'purple'" is-dark v-model="pdob" mode="date">
				<template #default="{ togglePopover }">
					<TextInput :value="pdob ? formatDate(pdob) : ''" @click="togglePopover">Date of Birth</TextInput>
				</template>
			</DatePicker>
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
			<DatePicker @click="handleKeyPress" dark :color="'purple'" is-dark v-model="passport_ex" mode="date">
				<template #default="{ togglePopover }">
					<TextInput :value="passport_ex ? formatDate(passport_ex) : ''" @click="togglePopover">Passport Expiration Date
					</TextInput>
				</template>
			</DatePicker>
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
import { PrimeApplicant } from '@/interfaces/interfaces'

const emit = defineEmits(['apl'])

const logger = (log: PrimeApplicant) => {
	log.pdob = formatDate(pdob.value)
	log.passport_ex = formatDate(passport_ex.value)
	console.log(log)
}

const handleKeyPress = () => {
	if (pdob.value) apl.pdob = formatDate(pdob.value)
	if (passport_ex.value) apl.passport_ex = formatDate(passport_ex.value)
	apl.fullName = `${apl.plastName} ${apl.pfirstName} ${apl.potherName}`.trimEnd()
	emit('apl', apl)
}

const formatDate = (date: Date) => {
	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();

	return `${day}/${month}/${year}`;
}

const user = useSupabaseUser()
const pdob = ref()
const passport_ex = ref()
const apl = reactive<PrimeApplicant>({
	created_at: new Date(),
	// apl_id: props.apl_id,
	plastName: '',
	pfirstName: '',
	potherName: '',
	pdob: '',
	pcity_ob: '',
	pcountry_ob: '',
	pgender: '',
	pconf_code: '',
	pemail: '',
	ppassport_number: '',
	passport_ex: '',
	pcountry_live_today: '',
	peducation_level: '',
	ppostal: '',
	pmarital_status: 'unmarried',
	children_number: 0,
	fullName: '',
	user_id: user.value?.id!,
	pcontact: '',
	wards: [],
	totalPayment: 0,
	passportAvail: false,
	created_at_date: formatDate(new Date()),
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

