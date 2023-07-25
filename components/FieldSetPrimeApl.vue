<template>
	<div class="relative w-full grid grid-cols-12 gap-5 px-5 py-2">
		<div class="col-span-2 translate-x-1 row-span-2 flex flex-col items-center gap-3">
			<avatarSelect :src="primeSRC" @click="logger(prime_apl)" class="" />

			<input @change="handleFile" type="file" class="file-input file-input-primary file-input-xs w-full max-w-xs" />
		</div>

		<!-- name -->
		<div class="flex gap-4 col-span-10 pl-6 justify-center">
			<TextInput @update:model-value="handleKeyPress" v-model="prime_apl.plastName">Last Name</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="prime_apl.pfirstName">First Name</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="prime_apl.potherName">Other Name</TextInput>
		</div>

		<div class="flex gap-4 col-span-10 pl-6 justify-center">
			<DatePicker @click="handleKeyPress" dark :color="'purple'" is-dark v-model="pdob" mode="date">
				<template #default="{ togglePopover }">
					<TextInput :icon="true" :value="pdob ? $formatDate(new Date(pdob)) : $formatDate(prime_apl.pdob!) || ''"
						@click="togglePopover">Date of Birth
					</TextInput>
				</template>
			</DatePicker>
			<SelectInput :options="['male', 'female']" @update:model-value="handleKeyPress" v-model="prime_apl.pgender">Gender
			</SelectInput>
			<TextInput @update:model-value="handleKeyPress" v-model="prime_apl.pcity_ob">City of Birth</TextInput>
		</div>

		<!-- <div class="flex gap-4 col-span-12 justify-center">
			<TextInput v-model="">Confirmation Code</TextInput>
		</div> -->

		<div class="flex gap-4 col-span-12 justify-center">
			<SelectInput :options="$countries" @update:model-value="handleKeyPress" v-model="prime_apl.pcountry_ob">Country of
				Birth
			</SelectInput>
			<TextInput @update:model-value="handleKeyPress" v-model="prime_apl.pcontact">Phone Number</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="prime_apl.pother_contact">Next of Kin's Phone Number
			</TextInput>
		</div>

		<div class="flex gap-4 col-span-12 justify-center">
			<TextInput @update:model-value="handleKeyPress" v-model="prime_apl.pemail">Email</TextInput>
		</div>

		<div class="flex gap-4 col-span-12 justify-center">
			<TextInput @update:model-value="handleKeyPress" v-model="prime_apl.ppassport_number">Passport Number</TextInput>
			<DatePicker @click="handleKeyPress" dark :color="'purple'" is-dark v-model="passport_ex" mode="date">
				<template #default="{ togglePopover }">
					<TextInput :icon="true"
						:value="passport_ex ? $formatDate(passport_ex) : $formatDate(prime_apl.passport_ex!) || ''"
						@click="togglePopover">
						Passport
						Expiration Date
					</TextInput>
				</template>
			</DatePicker>
		</div>

		<div class="flex gap-4 col-span-12 justify-center">
			<TextInput @update:model-value="handleKeyPress" v-model="prime_apl.ppostal">Residential Address</TextInput>
			<SelectInput :options="$countries" @update:model-value="handleKeyPress" v-model="prime_apl.pcountry_live_today">
				Country
				where you live today
			</SelectInput>
		</div>

		<div class="flex gap-4 col-span-12 justify-center">
			<TextInput @update:model-value="handleKeyPress" v-model="prime_apl.psocial_media.facebook">Facebook</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="prime_apl.psocial_media.instagram">Instagram</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="prime_apl.psocial_media.twitter">Twitter</TextInput>
		</div>

		<div class="flex gap-4 col-span-12 justify-center">
			<SelectInput :options="marital_status" @update:model-value="handleKeyPress" v-model="prime_apl.pmarital_status">
				Marital
				Status</SelectInput>
			<SelectInput :options="highest_level_ed" @update:model-value="handleKeyPress" v-model="prime_apl.peducation_level">
				Highest
				Level of Education
			</SelectInput>
			<SelectInput :num_options="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" @update:model-value="handleKeyPress"
				v-model="prime_apl.children_number">
				Number of Children</SelectInput>
		</div>
		<!-- <div v-if="v$.pfirstName.$error">Name field has an error.</div> -->
	</div>
</template>

<script setup lang="ts">
import { PrimeApplicant, Applicant } from '@/interfaces/interfaces'
import { storeToRefs } from 'pinia';
import { useAplStore } from '@/store/apl';
import { useImageStore } from '@/store/images';
import { required, email, numeric } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
// import { Applicant } from '@/supabase/supabase';


const props = defineProps<{
	container: HTMLDivElement
}>()
const { prime_apl } = storeToRefs(useAplStore())
const pdob = ref<Date>()
const passport_ex = ref<Date>()
const primeSRC = ref()
const { primeIMG, has_files } = storeToRefs(useImageStore())

onMounted(() => {
	if (primeIMG.value) primeSRC.value = URL.createObjectURL(primeIMG.value)
	pdob.value = prime_apl.value.pdob!
	passport_ex.value = prime_apl.value.passport_ex!
	emit('apl', prime_apl.value)

	setTimeout(() => {
		props.container.scrollTo({ top: 0, behavior: 'smooth' });
	}, 100)
})

function handleFile(evt: any) {
	primeSRC.value = URL.createObjectURL(evt.target.files[0])

	emit('file', {
		type: 'prime',
		file: evt.target.files[0]
	})
}

const emit = defineEmits(['apl', 'validate', 'file'])
const { $formatDate } = useNuxtApp()
const rules = computed(() => {
	return {
		plastName: { required },
		pfirstName: { required },
		// potherName: { required },
		pdob: { required },
		pcity_ob: { required },
		pcountry_ob: { required },
		pgender: { required },
		// pemail: { required, email },
		// ppassport_number: { required },
		// passport_ex: { required },
		pcountry_live_today: { required },
		peducation_level: { required },
		ppostal: { required },
		pmarital_status: { required },
		children_number: { required, numeric },
		fullName: { required },
		// user_id: { required },
		pcontact: { required },
		totalPayment: { required },
		// pother_contact: { required },
		// psocial_media: {
		// 	facebook: { required },
		// 	instagram: { required },
		// 	twitter: { required },
		// },
	}
})
const v$ = useVuelidate(rules, prime_apl.value)

const logger = async (log: PrimeApplicant) => {
	// log.pdob = new Date(pdob.value)
	// log.passport_ex = passport_ex.value
	let val = await v$.value.$validate()
	// console.log(log.user_id);
	if (!val) {
		v$.value.$errors.forEach(err => {
			console.log(err.$property, err.$message);
		});
	} else console.log(val);
}

const handleKeyPress = async () => {
	if (pdob.value) prime_apl.value.pdob = pdob.value
	if (passport_ex.value) prime_apl.value.passport_ex = passport_ex.value
	prime_apl.value.fullName = `${prime_apl.value.plastName} ${prime_apl.value.pfirstName} ${prime_apl.value.potherName}`.trimEnd()
	emit('apl', prime_apl.value)
	const val = await v$.value.$validate()
	emit('validate', val)
}

// TODO work on discounting system

// const user = useSupabaseUser()
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

