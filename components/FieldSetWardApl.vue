<template>
	<div class="relative w-full grid grid-cols-12 gap-2 px-5 py-2 mb-10">
		<h2 class="w-full col-span-full text-xl pb-2">Ward {{ idx }}</h2>

		<avatarSelect @click="logger" class="col-span-2 row-span-2" />
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

const { wards_apl } = storeToRefs(useAplStore())
const { $formatDate } = useNuxtApp()
const wdob = ref()
const props = defineProps<{
	idx: number
}>()
const emit = defineEmits(['ward'])

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
		wotherName: { required },
		wcity_ob: { required },
		wcountry_ob: { required },
		wgender: { required },
		wdob: { required },
	}
})

onMounted(() => {
	if (wards_apl.value.length > 0) {
		let filtered_ward = wards_apl.value.filter(ward => ward.index === props.idx)[0]
		if (filtered_ward == undefined) {
			console.log('damn too bad...')
		} else {
			console.log(`🚀 ~ file: FieldSetWardApl.vue:47 ~ onMounted ~ filtered_ward ${filtered_ward.index}:`, filtered_ward)
			ward.value = filtered_ward
		}
		// emit('ward', filtered_ward[0])
	}
})

const curr_ward = computed(() => {
	return wards_apl.value[props.idx]
})

const v$ = useVuelidate(rules, ward.value)

const handleKeyPress = async () => {
	if (wdob.value) ward.value.wdob = wdob.value
	const val = await v$.value.$validate()
	emit('ward', { ward: ward.value, valid: val })
}


const logger = async () => {
	ward.value.wdob = wdob.value
	let val = await v$.value.$validate()

	if (!val) {
		v$.value.$errors.forEach(err => {
			console.log(err.$property, err.$message);
		});
	} else console.log(val);

}
</script>