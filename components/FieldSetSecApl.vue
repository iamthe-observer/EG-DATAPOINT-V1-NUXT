<template>
	<div class="__newApl relative w-full grid grid-cols-12 gap-2 px-5 py-2">
		<div class="col-span-full flex">
			<div
				class="col-span-2 translate-x-1 border-2 border-black p-3 transition-all duration-150 ease-out hover:shadow-neo-box hover:-translate-y-1 row-span-2 flex flex-col items-center gap-3">
				<avatarSelect :src="secSRC" class="" />

				<input @change="handleFile" type="file"
					class="file-input file-input-primary rounded-none border-2 border-black font-bold bg-white file-input-xs w-[300px]" />
			</div>

			<div class="col-span-10 w-full h-full flex flex-col justify-between">
				<!-- name -->
				<div class="flex gap-4 col-span-10 pl-6 justify-center">
					<TextInput :val_err="vuelidate_err == false && applicant.slastName.length == 0" v-model="applicant.slastName">
						Last Name</TextInput>
					<TextInput :val_err="vuelidate_err == false && applicant.sfirstName.length == 0" v-model="applicant.sfirstName">
						First Name</TextInput>
					<TextInput v-model="applicant.sotherName">Other Name</TextInput>
				</div>

				<div class="flex gap-4 col-span-10 pl-6 justify-center">
					<!-- <DatePicker dark :color="'purple'" is-dark v-model="applicant.sdob" mode="date">
						<template #default="{ togglePopover }"> -->
					<!-- <TextInput :val_err="vuelidate_err == false && !applicant.sdob" :icon="true"
								:value="applicant.sdob ? $formatDate(new Date(applicant.sdob!)) : ''" @click="togglePopover">
								Date of Birth
							</TextInput> -->

					<div class="form-control w-full">

						<label class="label">
							<span class="label-text text-neutral-500 font-semibold">
								Date Of Birth
							</span>
						</label>

						<div class="indicator w-full">
							<span
								:class="['transition-all duration-300 ease-in pointer-events-none indicator-item badge-sm badge bg-red-400 rounded-none border-2 border-red-600 drop-shadow-xl', vuelidate_err == false && !applicant.sdob ? 'opacity-100' : 'opacity-0']"></span>


							<div class="flex items-end flex-1 gap-4">
								<input v-model="dates.sdob.dd" type="number" min="1" max="31" maxlength="2" placeholder="DD"
									class="font-bold input w-full max-w-xs bg-white rounded-none border-black border-2 hover:-translate-y-1 focus:-translate-y-1 hover:shadow-neo-box focus:shadow-neo-box transition-all duration-150 ease-out focus:outline-none" />
								<input v-model="dates.sdob.mm" type="number" min="1" max="12" maxlength="2" placeholder="MM"
									class="font-bold input w-full max-w-xs bg-white rounded-none border-black border-2 hover:-translate-y-1 focus:-translate-y-1 hover:shadow-neo-box focus:shadow-neo-box transition-all duration-150 ease-out focus:outline-none" />
								<input v-model="dates.sdob.yyyy" type="number" maxlength="4" placeholder="YYYY"
									class="font-bold input w-full max-w-xs bg-white rounded-none border-black border-2 hover:-translate-y-1 focus:-translate-y-1 hover:shadow-neo-box focus:shadow-neo-box transition-all duration-150 ease-out focus:outline-none" />
							</div>
						</div>
					</div>

					<!-- </template>
					</DatePicker> -->
					<SelectInput :val_err="vuelidate_err == false && applicant.sgender.length == 0" :options="['MALE', 'FEMALE']"
						v-model="applicant.sgender">Gender
					</SelectInput>
					<TextInput :val_err="vuelidate_err == false && applicant.scity_ob.length == 0" v-model="applicant.scity_ob">City
						of Birth</TextInput>
				</div>

				<div class="flex gap-4 col-span-12 pl-6 justify-center">
					<SelectInput :val_err="vuelidate_err == false && applicant.scountry_ob.length == 0" :options="$countries"
						v-model="applicant.scountry_ob">Country of
						Birth
					</SelectInput>
					<TextInput :val_err="vuelidate_err == false && applicant.scontact.length == 0" v-model="applicant.scontact">
						Phone Number</TextInput>
				</div>
			</div>

		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAplStore } from '@/store/apl';
import { useImageStore } from '@/store/images';

const { applicant, vuelidate_err, reset_data } = storeToRefs(useAplStore())
const { secIMG } = storeToRefs(useImageStore())
const secSRC = computed(() => {
	if (secIMG.value) return URL.createObjectURL(secIMG.value) || ''
})

const dates = reactive<{
	sdob: {
		dd: number | null,
		mm: number | null,
		yyyy: number | null
	},
}>({
	sdob: {
		dd: null,
		mm: null,
		yyyy: null
	},
})

const { sdob } = toRefs(dates)

const date_of_birth = computed(() => {
	if (sdob.value.yyyy !== null && sdob.value.mm !== null && sdob.value.dd !== null) return new Date(sdob.value.yyyy!, sdob.value.mm! - 1, sdob.value.dd!)
	return null
})

watch(date_of_birth, val => {
	if (!sdob.value.dd || !sdob.value.mm || !sdob.value.yyyy) return useAplStore().$patch(() => {
		applicant.value.sdob = null
	})

	if (Object.prototype.toString.call(val) === "[object Date]") {
		// it is a date
		useAplStore().$patch(() => {
			applicant.value.sdob = val
		})

	} else {
		// not a date object
		useAplStore().$patch(() => {
			applicant.value.sdob = null
		})
	}
})

watch(reset_data, val => {
	if (!val) {
		sdob.value = {
			dd: null,
			mm: null,
			yyyy: null
		}
	}
})

function handleFile(evt: any) {
	useImageStore().setFiles(evt.target.files[0], `sec`)
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
