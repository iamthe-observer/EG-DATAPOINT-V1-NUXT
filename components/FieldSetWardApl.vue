<template>
	<div class="relative w-full grid grid-cols-12 gap-2 px-5 py-2 mb-10">
		<h2 class="w-full col-span-full text-xl pb-2">Ward {{ idx + 1 }}</h2>

		<div class="col-span-2 row-span-2 flex flex-col items-center gap-3">
			<avatarSelect :src="wardSRC" @click="logger" class="col-span-2 row-span-2" />
			<input @change="handleFile" type="file" class="file-input file-input-primary file-input-xs w-full max-w-xs" />
		</div>
		<!-- name -->
		<div class="flex gap-4 col-span-10 pl-6 justify-center">
			<TextInput @update:model-value="handleKeyPress" v-model="ward.wlastName">Last Name</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="ward.wfirstName">First Name</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="ward.wotherName">Other Name</TextInput>
		</div>

		<div class="flex gap-4 col-span-10 pl-6 justify-center">
			<DatePicker @click="handleKeyPress" dark :color="'purple'" is-dark v-model="wdob" mode="date">
				<template #default="{ togglePopover }">
					<TextInput :icon="true" :value="wdob ? $formatDate(wdob) : $formatDate(ward.wdob!)" @click="togglePopover">Date
						of Birth
					</TextInput>
				</template>
			</DatePicker>
			<SelectInput :options="['MALE', 'FEMALE']" @update:model-value="handleKeyPress" v-model="ward.wgender">Gender
			</SelectInput>
			<TextInput @update:model-value="handleKeyPress" v-model="ward.wcity_ob">City of Birth</TextInput>
			<SelectInput :options="$countries" @update:model-value="handleKeyPress" v-model="ward.wcountry_ob">Country of Birth
			</SelectInput>
		</div>

	</div>
</template>

<script setup lang="ts">
import { WardsApplicant } from 'interfaces/interfaces';
import { useAplStore } from '@/store/apl';
import { storeToRefs } from 'pinia';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useImageStore } from '@/store/images';

const { wardIMG, files } = storeToRefs(useImageStore())
const { wards_apl } = storeToRefs(useAplStore())
const { $formatDate } = useNuxtApp()
const wardSRC = ref()
const wdob = ref()
const props = defineProps<{
	idx: number
	ward_info: WardsApplicant | null
}>()
const emit = defineEmits(['ward', 'file'])

const ward = ref<WardsApplicant>({
	wlastName: '',
	wfirstName: '',
	wotherName: '',
	wcity_ob: '',
	wcountry_ob: '',
	wgender: '',
	wdob: new Date(),
	index: props.idx
})

const rules = computed(() => {
	return {
		wlastName: { required },
		wfirstName: { required },
		// wotherName: { required },
		wcity_ob: { required },
		wcountry_ob: { required },
		wgender: { required },
		wdob: { required },
	}
})

onMounted(async () => {
	console.log(wardIMG.value, props.idx);

	setTimeout(() => {
		wardIMG.value.forEach(img => {
			if (img.apl_type == `ward${props.idx}`) wardSRC.value = URL.createObjectURL(img)
		});

		// if (wardIMG.value[useNuxtApp().$extractNumFromPhrase(wardIMG.value[props.idx].apl_type)!]) wardSRC.value = (URL.createObjectURL(wardIMG.value[useNuxtApp().$extractNumFromPhrase(wardIMG.value[props.idx].apl_type)!]));

	}, 100)

	wdob.value = ward.value.wdob!
	if (wards_apl.value.length > 0) {
		if (wards_apl.value[props.idx]) ward.value = wards_apl.value[props.idx]
	}
	if (wdob.value) ward.value.wdob = wdob.value
	const val = await v$.value.$validate()
	emit('ward', { ward: ward.value, valid: val })

	// if (wards_apl.value.length > 0) {
	// 	let filtered_ward = wards_apl.value.filter(ward => ward.index === props.idx)[0]
	// 	if (filtered_ward == undefined || filtered_ward == null) {
	// 		console.log('damn too bad...')
	// 	} else {

	// 	}
	// }
})

const curr_ward = computed(() => {
	return wards_apl.value[props.idx]
})

const v$ = useVuelidate(rules, ward)

const handleKeyPress = async () => {
	if (wdob.value) ward.value.wdob = wdob.value
	const val = await v$.value.$validate()
	emit('ward', { ward: ward.value, valid: val })
}

function handleFile(evt: any) {
	wardSRC.value = URL.createObjectURL(evt.target.files[0])

	emit('file', {
		type: `ward${props.idx}`,
		file: evt.target.files[0]
	})
}

const logger = async () => {
	ward.value.wdob = wdob.value
	let val = await v$.value.$validate()

	if (!val) {
		v$.value.$errors.forEach(err => {
			console.log(err.$property, err.$message);
			console.log(ward.value);
		});
	} else { console.log(val); }

}
</script>