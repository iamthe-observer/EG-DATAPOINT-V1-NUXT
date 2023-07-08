<template>
	<div class="relative w-full grid grid-cols-12 gap-5 px-5 py-2">
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
					<TextInput :value="pdob ? $formatDate(pdob) : apl.pdob" @click="togglePopover">Date of Birth</TextInput>
				</template>
			</DatePicker>
			<SelectInput :options="['male', 'female']" @update:model-value="handleKeyPress" v-model="apl.pgender">Gender
			</SelectInput>
			<TextInput @update:model-value="handleKeyPress" v-model="apl.pcity_ob">City of Birth</TextInput>
		</div>

		<!-- <div class="flex gap-4 col-span-12 justify-center">
			<TextInput v-model="">Confirmation Code</TextInput>
		</div> -->

		<div class="flex gap-4 col-span-12 justify-center">
			<SelectInput :options="$countries" @update:model-value="handleKeyPress" v-model="apl.pcountry_ob">Country of Birth
			</SelectInput>
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
					<TextInput :value="passport_ex ? $formatDate(passport_ex) : apl.passport_ex" @click="togglePopover">Passport
						Expiration Date
					</TextInput>
				</template>
			</DatePicker>
		</div>

		<div class="flex gap-4 col-span-12 justify-center">
			<TextInput @update:model-value="handleKeyPress" v-model="apl.ppostal">Residential Address</TextInput>
			<SelectInput :options="$countries" @update:model-value="handleKeyPress" v-model="apl.pcountry_live_today">Country
				where you live today
			</SelectInput>
		</div>

		<div class="flex gap-4 col-span-12 justify-center">
			<TextInput @update:model-value="handleKeyPress" v-model="apl.psocial_media.facebook">Facebook</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="apl.psocial_media.instagram">Instagram</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="apl.psocial_media.twitter">Twitter</TextInput>
		</div>

		<div class="flex gap-4 col-span-12 justify-center">
			<SelectInput :options="marital_status" @update:model-value="handleKeyPress" v-model="apl.pmarital_status">Marital
				Status</SelectInput>
			<SelectInput :options="highest_level_ed" @update:model-value="handleKeyPress" v-model="apl.peducation_level">Highest
				Level of Education
			</SelectInput>
			<SelectInput :num_options="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" @update:model-value="handleKeyPress"
				v-model="apl.children_number">
				Number of Children</SelectInput>
		</div>
	</div>
</template>

<script setup lang="ts">
import { PrimeApplicant } from '@/interfaces/interfaces'
import { useStorage } from '@vueuse/core';

const emit = defineEmits(['apl'])
const { $formatDate } = useNuxtApp()

const logger = (log: PrimeApplicant) => {
	log.pdob = $formatDate(pdob.value)
	log.passport_ex = $formatDate(passport_ex.value)
	console.log(log)
}


const handleKeyPress = () => {
	if (pdob.value) apl.value.pdob = $formatDate(pdob.value)
	if (passport_ex.value) apl.value.passport_ex = $formatDate(passport_ex.value)
	apl.value.fullName = `${apl.value.plastName} ${apl.value.pfirstName} ${apl.value.potherName}`.trimEnd()
	// prime_apl.value = apl.value
	emit('apl', apl.value)
}

// TODO work on discounting system

const user = useSupabaseUser()
const pdob = ref()
const passport_ex = ref()
const apl = ref<PrimeApplicant>({
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
	pmarital_status: 'UNMARRIED',
	children_number: 0,
	fullName: '',
	user_id: user.value?.id!,
	pcontact: '',
	wards: [],
	totalPayment: 0,
	passportAvail: false,
	created_at_date: $formatDate(new Date()),
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

const prime_apl = ref(useStorage<PrimeApplicant>('prime_apl', apl))

onMounted(() => {
	console.log(prime_apl.value);

	apl.value = prime_apl.value
	emit('apl', apl.value)
})

const marital_status = [
	'UNMARRIED',
	'MARRIED',
	'DIVORCED',
	'WIDOWED',
	'LEGALLY SEPARATED'
];

const highest_level_ed = [
	"PRIMARY SCHOOL ONLY",
	"HIGH SCHOOL, NO DEGREE",
	"HIGH SCHOOL DEGREE",
	"VOCATIONAL SCHOOL",
	"SOME UNIVERSITY COURSES",
	"UNIVERSITY DEGREE",
	"SOME GRADUATE LEVEL COURSES",
	"MASTER'S DEGREE",
	"SOME DOCTORATE LEVEL COURSES",
	"DOCTORATE DEGREE"
]
</script>

