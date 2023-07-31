<template>
	<div class="relative w-full grid grid-cols-12 gap-2 px-5 py-2 mb-10">
		<h2 class="w-full col-span-full text-xl pb-2">Ward {{ idx + 1 }}</h2>

		<div class="col-span-2 row-span-2 flex flex-col items-center gap-3">
			<avatarSelect :src="wardSRC" class="col-span-2 row-span-2" />
			<input @change="handleFile" type="file" class="file-input file-input-primary file-input-xs w-full max-w-xs" />
		</div>
		<!-- name -->
		<div class="flex gap-4 col-span-10 pl-6 justify-center">
			<TextInput v-model="applicant.wards[idx].wlastName">Last Name</TextInput>
			<TextInput v-model="applicant.wards[idx].wfirstName">First Name</TextInput>
			<TextInput v-model="applicant.wards[idx].wotherName">Other Name</TextInput>
		</div>

		<div class="flex gap-4 col-span-10 pl-6 justify-center">
			<DatePicker dark :color="'purple'" is-dark v-model="applicant.wards[idx].wdob" mode="date">
				<template #default="{ togglePopover }">
					<TextInput :icon="true"
						:value="applicant.wards[idx].wdob ? $formatDate(new Date(applicant.wards[idx].wdob!)) : ''"
						@click="togglePopover">Date
						of Birth
					</TextInput>
				</template>
			</DatePicker>
			<SelectInput :options="['MALE', 'FEMALE']" v-model="applicant.wards[idx].wgender">Gender
			</SelectInput>
			<TextInput v-model="applicant.wards[idx].wcity_ob">City of Birth</TextInput>
			<SelectInput :options="$countries" v-model="applicant.wards[idx].wcountry_ob">
				Country of Birth
			</SelectInput>
		</div>

	</div>
</template>

<script setup lang="ts">
import { WardsApplicant } from 'interfaces/interfaces';
import { useAplStore } from '@/store/apl';
import { storeToRefs } from 'pinia';
import { useImageStore } from '@/store/images';

const { wardIMG } = storeToRefs(useImageStore())
const { applicant } = storeToRefs(useAplStore())
const props = defineProps<{
	idx: number
}>()
const wardSRC = computed(() => {
	if (wardIMG.value.some(x => x.apl_type == `ward${props.idx}`)) {
		let file = wardIMG.value.find(img => img.apl_type == `ward${props.idx}`)
		return URL.createObjectURL(file!) || ''
	}
})

function handleFile(evt: any) {
	useAplStore().handleWardPath(applicant.value.wards[props.idx])
	console.log(applicant.value.aplImg_path.wardsPath);

	// wardSRC.value = URL.createObjectURL(evt.target.files[0])
	useImageStore().setFiles(evt.target.files[0], `ward${props.idx}`)
	// console.log(evt);
}
</script>