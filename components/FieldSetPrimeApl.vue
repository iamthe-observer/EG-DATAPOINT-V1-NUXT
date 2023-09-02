<template>
	<div class="relative w-full grid grid-cols-12 gap-5 px-5 py-2">

		<div class="col-span-full flex">
			<div class="col-span-2 translate-x-1 row-span-2 flex flex-col items-center gap-3">
				<avatarSelect :src="primeSRC" class="" />

				<input @change="handleFile" type="file"
					class="file-input file-input-ghost border outline outline-4 outline-neutral-400 border-black text-black rounded-sm bg-white file-input-xs w-[300px]" />
			</div>

			<div class="flex flex-col flex-1 justify-between gap-4">
				<!-- name -->
				<div class="flex gap-4 col-span-10 pl-6 justify-center">
					<TextInput :val_err="vuelidate_err == false && applicant.plastName.length == 0" v-model="applicant.plastName">
						Last Name</TextInput>
					<TextInput :val_err="vuelidate_err == false && applicant.pfirstName.length == 0" v-model="applicant.pfirstName">
						First Name
					</TextInput>
					<TextInput v-model="applicant.potherName">Other Name
					</TextInput>
				</div>

				<div class="grid grid-cols-3 gap-4 col-span-10 pl-6 justify-center">
					<!-- <DatePicker dark :color="'purple'" is-dark v-model="applicant.pdob" mode="date">
						<template #default="{ togglePopover }"> -->
					<!-- <TextInput :val_err="vuelidate_err == false && !applicant.pdob" :icon="true"
								:value="applicant.pdob ? $formatDate(new Date(applicant.pdob!)) : ''" @click="togglePopover">Date of
								Birth
							</TextInput> -->

					<div class="form-control w-full">

						<label class="label">
							<span class="label-text text-neutral-800 dark:font-semibold">
								Date Of Birth
							</span>
						</label>

						<div class="indicator w-full">
							<span
								:class="['transition-all indicator-start duration-300 ease-in pointer-events-none indicator-item badge-sm badge bg-red-400 border-transparent drop-shadow-xl', vuelidate_err == false && !applicant.pdob ? 'opacity-100' : 'opacity-0']"></span>

							<div class="flex items-end flex-1 gap-4">
								<input v-model="dates.pdob.dd" type="number" min="1" max="31" maxlength="2" placeholder="DD"
									class="input w-full max-w-xs bg-white border border-black focus:shadow-box focus:outline-none transition-all duration-150 ease-out rounded-sm dark:bg-neutral-300" />
								<input v-model="dates.pdob.mm" type="number" min="1" max="12" maxlength="2" placeholder="MM"
									class="input w-full max-w-xs bg-white border border-black focus:shadow-box focus:outline-none transition-all duration-150 ease-out rounded-sm dark:bg-neutral-300" />
								<input v-model="dates.pdob.yyyy" type="number" maxlength="4" placeholder="YYYY"
									class="input w-full max-w-xs bg-white border border-black focus:shadow-box focus:outline-none transition-all duration-150 ease-out rounded-sm dark:bg-neutral-300" />
							</div>
						</div>
					</div>

					<!-- </template>
					</DatePicker> -->
					<SelectInput :val_err="vuelidate_err == false && applicant.pgender.length == 0" :options="['male', 'female']"
						v-model="applicant.pgender">
						Gender
					</SelectInput>
					<TextInput :val_err="vuelidate_err == false && applicant.pcity_ob.length == 0" v-model="applicant.pcity_ob">City
						of Birth</TextInput>
				</div>

				<div class="flex gap-4 col-span-10 pl-6 justify-center">
					<SelectInput :val_err="vuelidate_err == false && applicant.pcountry_ob.length == 0" :options="$countries"
						v-model="applicant.pcountry_ob">
						Country of
						Birth
					</SelectInput>
					<TextInput :val_err="vuelidate_err == false && applicant.pcontact.length == 0" v-model="applicant.pcontact">
						Phone Number</TextInput>
					<TextInput :val_err="vuelidate_err == false && applicant.pother_contact.length == 0"
						v-model="applicant.pother_contact">Next of Kin's Phone Number
					</TextInput>
				</div>

			</div>
		</div>

		<!-- <div class="flex gap-4 col-span-12 justify-center">
			<TextInput v-model="">Confirmation Code</TextInput>
		</div> -->
		<div class="flex gap-4 col-span-12 justify-center">
			<TextInput v-model="applicant.pemail">Email</TextInput>
		</div>

		<div class="flex gap-4 col-span-12 justify-center">
			<TextInput v-model="applicant.ppassport_number">Passport Number</TextInput>
			<!-- <DatePicker dark :color="'purple'" is-dark v-model="applicant.passport_ex" mode="date">
				<template> -->
			<div class="form-control w-full">
				<label class="label">
					<span class="label-text text-neutral-800 dark:font-semibold">
						Passport Expiration
					</span>
				</label>

				<div class="indicator w-full">
					<!-- <span
						:class="['transition-all duration-300 ease-in pointer-events-none indicator-start indicator-item badge-sm badge bg-red-400 border-transparent drop-shadow-xl', vuelidate_err == false && !applicant.passport_ex ? 'opacity-100' : 'opacity-0']"></span> -->

					<div class="flex items-end flex-1 gap-4">
						<input v-model="dates.passport_ex.dd" type="number" min="1" max="31" maxlength="2" placeholder="DD"
							class="input w-full max-w-xs bg-white border border-black focus:shadow-box focus:outline-none transition-all duration-150 ease-out rounded-sm dark:bg-neutral-300" />
						<input v-model="dates.passport_ex.mm" type="number" min="1" max="12" maxlength="2" placeholder="MM"
							class="input w-full max-w-xs bg-white border border-black focus:shadow-box focus:outline-none transition-all duration-150 ease-out rounded-sm dark:bg-neutral-300" />
						<input v-model="dates.passport_ex.yyyy" type="number" maxlength="4" placeholder="YYYY"
							class="input w-full max-w-xs bg-white border border-black focus:shadow-box focus:outline-none transition-all duration-150 ease-out rounded-sm dark:bg-neutral-300" />
					</div>
				</div>
			</div>
			<!-- </template>
			</DatePicker> -->
		</div>

		<div class="flex gap-4 col-span-12 justify-center">
			<TextInput :val_err="vuelidate_err == false && applicant.ppostal.length == 0" v-model="applicant.ppostal">
				Residential Address</TextInput>
			<SelectInput :val_err="vuelidate_err == false && applicant.pcountry_live_today.length == 0" :options="$countries"
				v-model="applicant.pcountry_live_today">
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
			<SelectInput :options="$marital_status" v-model="applicant.pmarital_status">
				Marital
				Status</SelectInput>
			<SelectInput :val_err="vuelidate_err == false && applicant.peducation_level.length == 0"
				:options="$highest_level_ed" v-model="applicant.peducation_level">
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

const { applicant, vuelidate_err, reset_data } = storeToRefs(useAplStore())
const { primeIMG } = storeToRefs(useImageStore())
const primeSRC = computed(() => {
	if (primeIMG.value) return URL.createObjectURL(primeIMG.value) || ''
})

const dates = reactive<{
	pdob: {
		dd: number | null,
		mm: number | null,
		yyyy: number | null
	},
	passport_ex: {
		dd: number | null,
		mm: number | null,
		yyyy: number | null
	}
}>({
	pdob: {
		dd: null,
		mm: null,
		yyyy: null
	},
	passport_ex: {
		dd: null,
		mm: null,
		yyyy: null
	}
})

const { passport_ex, pdob } = toRefs(dates)

const date_of_birth = computed(() => {
	if (pdob.value.yyyy !== null && pdob.value.mm !== null && pdob.value.dd !== null) return new Date(pdob.value.yyyy!, pdob.value.mm! - 1, pdob.value.dd!)
	return null
})
const passport_expiration = computed(() => {
	if (passport_ex.value.yyyy !== null && passport_ex.value.mm !== null && passport_ex.value.dd !== null) return new Date(passport_ex.value.yyyy!, passport_ex.value.mm! - 1, passport_ex.value.dd!)
	return null
})

watch(date_of_birth, val => {
	if (!pdob.value.dd || !pdob.value.mm || !pdob.value.yyyy) return useAplStore().$patch(() => {
		applicant.value.pdob = null
	})

	if (Object.prototype.toString.call(val) === "[object Date]") {
		// it is a date
		useAplStore().$patch(() => {
			applicant.value.pdob = val
		})

	} else {
		// not a date object
		useAplStore().$patch(() => {
			applicant.value.pdob = null
		})
	}

})

watch(passport_expiration, val => {
	if (!passport_ex.value.dd || !passport_ex.value.mm || !passport_ex.value.yyyy) return useAplStore().$patch(() => {
		applicant.value.passport_ex = null
		console.log(applicant.value.passport_ex);
	})

	if (Object.prototype.toString.call(val) === "[object Date]") {
		// it is a date
		useAplStore().$patch(() => {
			applicant.value.passport_ex = val
			console.log(applicant.value.passport_ex);
		})

	} else {
		// not a date object
		useAplStore().$patch(() => {
			applicant.value.passport_ex = null
		})

	}

})

watch(reset_data, val => {
	if (!val) {
		pdob.value = {
			dd: null,
			mm: null,
			yyyy: null
		}
		passport_ex.value = {
			dd: null,
			mm: null,
			yyyy: null
		}
	}
})

function handleFile(evt: any) {
	useImageStore().setFiles(evt.target.files[0], `prime`)
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

/* Firefox */
input[type=number] {
	-moz-appearance: textfield;
}
</style>
