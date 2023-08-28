<template>
	<div class="relative w-full grid grid-cols-12 gap-2 px-5 py-2 mb-10">
		<h2 class="w-full col-span-full text-xl pb-2 font-semibold">Ward {{ idx + 1 }}</h2>

		<div class="col-span-2 row-span-2 flex flex-col items-center gap-3">
			<avatarSelect :src="wardSRC" class="col-span-2 row-span-2" />
			<input @change="handleFile" type="file"
				class="file-input file-input-primary dark:text-neutral-900 dark:bg-white file-input-xs w-full max-w-xs" />
		</div>
		<!-- name -->
		<div class="flex gap-4 col-span-10 pl-6 justify-center">
			<TextInput :val_err="vuelidate_err == false && applicant.wards[idx].wlastName.length == 0"
				v-model="applicant.wards[idx].wlastName">Last Name</TextInput>
			<TextInput :val_err="vuelidate_err == false && applicant.wards[idx].wfirstName.length == 0"
				v-model="applicant.wards[idx].wfirstName">First Name</TextInput>
			<TextInput v-model="applicant.wards[idx].wotherName">Other Name</TextInput>
		</div>

		<div class="flex gap-4 col-span-10 pl-6 justify-center">
			<!-- <DatePicker dark :color="'purple'" is-dark v-model="applicant.wards[idx].wdob" mode="date">
				<template #default="{ togglePopover }">
					<TextInput :val_err="vuelidate_err == false && !applicant.wards[idx].wdob" :icon="true"
						:value="applicant.wards[idx].wdob ? $formatDate(new Date(applicant.wards[idx].wdob!)) : ''"
						@click="togglePopover">Date
						of Birth
					</TextInput>
				</template>
			</DatePicker> -->

			<div class="form-control w-full">

				<label class="label">
					<span class="label-text dark:text-neutral-900 dark:font-semibold">
						Date Of Birth
					</span>
				</label>

				<div class="indicator w-full">
					<span
						:class="['transition-all duration-300 ease-in pointer-events-none indicator-item badge-sm badge bg-red-400 border-transparent drop-shadow-xl', vuelidate_err == false && !applicant.wards[idx].wdob ? 'opacity-100' : 'opacity-0']"></span>


					<div class="flex items-end flex-1 gap-4">
						<input v-model="dates.wdob.dd" type="number" min="1" max="31" maxlength="2" placeholder="DD"
							class="input w-full max-w-xs bg-neutral-600 dark:bg-neutral-300 rounded-xl" />
						<input v-model="dates.wdob.mm" type="number" min="1" max="12" maxlength="2" placeholder="MM"
							class="input w-full max-w-xs bg-neutral-600 dark:bg-neutral-300 rounded-xl" />
						<input v-model="dates.wdob.yyyy" type="number" maxlength="4" placeholder="YYYY"
							class="input w-full max-w-xs bg-neutral-600 dark:bg-neutral-300 rounded-xl" />
					</div>
				</div>
			</div>

			<SelectInput :val_err="vuelidate_err == false && applicant.wards[idx].wgender.length == 0"
				:options="['MALE', 'FEMALE']" v-model="applicant.wards[idx].wgender">Gender
			</SelectInput>
			<TextInput :val_err="vuelidate_err == false && applicant.wards[idx].wcity_ob.length == 0"
				v-model="applicant.wards[idx].wcity_ob">City of Birth</TextInput>
			<SelectInput :val_err="vuelidate_err == false && applicant.wards[idx].wcountry_ob.length == 0" :options="$countries"
				v-model="applicant.wards[idx].wcountry_ob">
				Country of Birth
			</SelectInput>
		</div>

	</div>
</template>

<script setup lang="ts">
import { useAplStore } from '@/store/apl';
import { storeToRefs } from 'pinia';
import { useImageStore } from '@/store/images';

const { wardIMG } = storeToRefs(useImageStore())
const { applicant, vuelidate_err, reset_data } = storeToRefs(useAplStore())
const props = defineProps<{
	idx: number
}>()
const wardSRC = computed(() => {
	if (wardIMG.value.some(x => x.apl_type == `ward${props.idx}`)) {
		let file = wardIMG.value.find(img => img.apl_type == `ward${props.idx}`)
		return URL.createObjectURL(file!) || ''
	}
})

const dates = reactive<{
	wdob: {
		dd: number | null,
		mm: number | null,
		yyyy: number | null
	},
}>({
	wdob: {
		dd: null,
		mm: null,
		yyyy: null
	},
})

const { wdob } = toRefs(dates)

const date_of_birth = computed(() => {
	if (wdob.value.yyyy !== null && wdob.value.mm !== null && wdob.value.dd !== null) return new Date(wdob.value.yyyy!, wdob.value.mm! - 1, wdob.value.dd!)
	return null
})

watch(date_of_birth, val => {
	if (!wdob.value.dd || !wdob.value.mm || !wdob.value.yyyy) return useAplStore().$patch(() => {
		applicant.value.wards[props.idx].wdob = null
	})

	if (Object.prototype.toString.call(val) === "[object Date]") {
		// it is a date
		useAplStore().$patch(() => {
			applicant.value.wards[props.idx].wdob = val
		})

	} else {
		// not a date object
		useAplStore().$patch(() => {
			applicant.value.wards[props.idx].wdob = null
		})
	}
})

watch(reset_data, val => {
	if (!val) {
		wdob.value = {
			dd: null,
			mm: null,
			yyyy: null
		}
	}
})

function handleFile(evt: any) {
	useImageStore().setFiles(evt.target.files[0], `ward${props.idx}`)
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
