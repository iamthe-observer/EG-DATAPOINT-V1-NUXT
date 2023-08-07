<template>
	<div class="relative w-full grid grid-cols-12 gap-5 px-5 py-2">

		<div class="col-span-full flex">
			<div class="col-span-2 translate-x-1 row-span-2 flex flex-col items-center gap-3">
				<avatarSelect :src="primeSRC" class="" />

				<input @change="handleFile" type="file"
					class="file-input file-input-primary dark:text-neutral-900 dark:bg-white file-input-xs w-full max-w-xs" />
			</div>

			<div class="flex flex-col flex-1 justify-evenly">
				<!-- name -->
				<div class="flex gap-4 col-span-10 pl-6 justify-center">
					<TextInput v-model="applicant.plastName">Last Name</TextInput>
					<TextInput v-model="applicant.pfirstName">First Name</TextInput>
					<TextInput v-model="applicant.potherName">Other Name</TextInput>
				</div>

				<div class="flex gap-4 col-span-10 pl-6 justify-center">
					<DatePicker dark :color="'purple'" is-dark v-model="applicant.pdob" mode="date">
						<template #default="{ togglePopover }">
							<TextInput :icon="true" :value="applicant.pdob ? $formatDate(new Date(applicant.pdob!)) : ''"
								@click="togglePopover">Date of
								Birth
							</TextInput>
							<!-- <TextInput :icon="true" :value="pdob ? $formatDate(new Date(pdob)) : $formatDate(prime_apl.pdob!) || ''"
						@click="togglePopover">Date of Birth
					</TextInput> -->
						</template>
					</DatePicker>
					<SelectInput :options="['male', 'female']" v-model="applicant.pgender">
						Gender
					</SelectInput>
					<TextInput v-model="applicant.pcity_ob">City of Birth</TextInput>
				</div>

			</div>
		</div>

		<!-- <div class="flex gap-4 col-span-12 justify-center">
			<TextInput v-model="">Confirmation Code</TextInput>
		</div> -->

		<div class="flex gap-4 col-span-12 justify-center">
			<SelectInput :options="$countries" v-model="applicant.pcountry_ob">
				Country of
				Birth
			</SelectInput>
			<TextInput v-model="applicant.pcontact">Phone Number</TextInput>
			<TextInput v-model="applicant.pother_contact">Next of Kin's Phone Number
			</TextInput>
		</div>

		<div class="flex gap-4 col-span-12 justify-center">
			<TextInput v-model="applicant.pemail">Email</TextInput>
		</div>

		<div class="flex gap-4 col-span-12 justify-center">
			<TextInput v-model="applicant.ppassport_number">Passport Number</TextInput>
			<DatePicker dark :color="'purple'" is-dark v-model="applicant.passport_ex" mode="date">
				<template #default="{ togglePopover }">
					<TextInput :icon="true" :value="applicant.passport_ex ? $formatDate(new Date(applicant.passport_ex!)) : ''"
						@click="togglePopover">
						Passport
						Expiration Date
					</TextInput>
				</template>
			</DatePicker>
		</div>

		<div class="flex gap-4 col-span-12 justify-center">
			<TextInput v-model="applicant.ppostal">Residential Address</TextInput>
			<SelectInput :options="$countries" v-model="applicant.pcountry_live_today">
				Country
				where you live today
			</SelectInput>
		</div>

		<div class="flex gap-4 col-span-12 justify-center">
			<TextInput v-model="applicant.psocial_media.facebook">Facebook</TextInput>
			<TextInput v-model="applicant.psocial_media.instagram">Instagram
			</TextInput>
			<TextInput v-model="applicant.psocial_media.twitter">Twitter</TextInput>
		</div>

		<div class="flex gap-4 col-span-12 justify-center">
			<SelectInput :options="marital_status" v-model="applicant.pmarital_status">
				Marital
				Status</SelectInput>
			<SelectInput :options="highest_level_ed" v-model="applicant.peducation_level">
				Highest
				Level of Education
			</SelectInput>
			<SelectInput :num_options="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" v-model="applicant.children_number">
				Number of Children</SelectInput>
		</div>
		<!-- <div v-if="v$.pfirstName.$error">Name field has an error.</div> -->
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAplStore } from '@/store/apl';
import { useImageStore } from '@/store/images';

const props = defineProps<{
	container: HTMLDivElement
}>()
const { applicant } = storeToRefs(useAplStore())
const { primeIMG } = storeToRefs(useImageStore())
const primeSRC = computed(() => {
	if (primeIMG.value) return URL.createObjectURL(primeIMG.value) || ''
})

onMounted(() => {
	setTimeout(() => {
		props.container.scrollTo({ top: 0, behavior: 'smooth' });
	}, 100)
})

function handleFile(evt: any) {
	useImageStore().setFiles(evt.target.files[0], `prime`)
}

// TODO work on discounting system
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

