<template>
	<div class="__newApl relative w-full grid grid-cols-12 gap-2 px-5 py-2">
		<div class="col-span-full flex">
			<div class="col-span-2 translate-x-1 row-span-2 flex flex-col items-center gap-3">
				<avatarSelect :src="secSRC" class="" />

				<input @change="handleFile" type="file"
					class="file-input file-input-primary dark:text-neutral-900 dark:bg-white file-input-xs w-[300px]" />
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
					<DatePicker dark :color="'purple'" is-dark v-model="applicant.sdob" mode="date">
						<template #default="{ togglePopover }">
							<TextInput :val_err="vuelidate_err == false && !applicant.sdob" :icon="true"
								:value="applicant.sdob ? $formatDate(new Date(applicant.sdob!)) : ''" @click="togglePopover">
								Date of Birth
							</TextInput>
						</template>
					</DatePicker>
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

const { applicant, vuelidate_err } = storeToRefs(useAplStore())
const { secIMG } = storeToRefs(useImageStore())
const secSRC = computed(() => {
	if (secIMG.value) return URL.createObjectURL(secIMG.value) || ''
})

function handleFile(evt: any) {
	useImageStore().setFiles(evt.target.files[0], `sec`)
}
</script>