<template>
	<div class="relative w-full grid grid-cols-12 gap-2 px-5 py-2 mb-10">
		<h2 class="w-full col-span-full text-xl pb-2">Ward {{ idx }}</h2>

		<avatarSelect @click="logger" class="col-span-2 row-span-2" />
		<!-- name -->
		<div class="flex gap-4 col-span-10 pl-6 justify-center">
			<TextInput @update:model-value="handleKeyPress" v-model="ward.wfirstName">First Name</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="ward.wotherName">Middle Name</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="ward.wlastName">Last Name</TextInput>
		</div>

		<div class="flex gap-4 col-span-10 pl-6 justify-center">
			<DatePicker @click="handleKeyPress" dark :color="'purple'" is-dark v-model="wdob" mode="date">
				<template #default="{ togglePopover }">
					<TextInput :value="wdob ? $formatDate(wdob) : ward.wdob" @click="togglePopover">Date of Birth
					</TextInput>
				</template>
			</DatePicker>
			<SelectInput :options="['MALE', 'FEMALE']" @update:model-value="handleKeyPress" v-model="ward.wgender">Gender
			</SelectInput>
			<TextInput @update:model-value="handleKeyPress" v-model="ward.wcity_ob">City of Birth</TextInput>
			<SelectInput :options="$countries" @update:model-value="handleKeyPress" v-model="ward.wcountry_ob">Country of Birth
			</SelectInput>
		</div>

		<!-- <div class="flex gap-4 col-span-12 justify-center">
			<TextInput>Country of Birth</TextInput>
		</div> -->
	</div>
</template>

<script setup lang="ts">
import { WardsApplicant } from 'interfaces/interfaces';
import { useAplStore } from '@/store/apl';
import { storeToRefs } from 'pinia';

const { wards_apl } = storeToRefs(useAplStore())
onMounted(() => {
	if (wards_apl.value.length > 0) {
		let filtered_ward = wards_apl.value.filter(ward => ward.index === props.idx)
		ward.value = filtered_ward[0]
		emit('ward', filtered_ward[0])
	}
})

const { $formatDate } = useNuxtApp()
const wdob = ref()
const props = defineProps<{
	idx: number
}>()
const emit = defineEmits(['ward'])

const handleKeyPress = () => {
	if (wdob.value) ward.value.wdob = $formatDate(wdob.value)
	emit('ward', ward.value)
}

const logger = () => {
	console.log(ward.value)
}

const ward = ref<WardsApplicant>({
	wlastName: '',
	wfirstName: '',
	wotherName: '',
	wcity_ob: '',
	wcountry_ob: '',
	wgender: '',
	wdob: '',
	index: props.idx
})
</script>