<template>
	<div class="__newApl relative w-full grid grid-cols-12 gap-2 px-5 py-2">
		<avatarSelect @click="handleClick" class="col-span-2 row-span-2" />
		<!-- name -->
		<div class="flex gap-4 col-span-10 pl-6 justify-center">
			<TextInput @update:model-value="handleKeyPress" v-model="sec.sfirstName">First Name</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="sec.sotherName">Middle Name</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="sec.slastName">Last Name</TextInput>
		</div>

		<div class="flex gap-4 col-span-10 pl-6 justify-center">
			<DatePicker @click="handleKeyPress" dark :color="'purple'" is-dark v-model="sdob" mode="date">
				<template #default="{ togglePopover }">
					<TextInput :value="sdob ? $formatDate(sdob) : ''" @click="togglePopover">Date of Birth
					</TextInput>
				</template>
			</DatePicker>
			<SelectInput :options="['MALE', 'FEMALE']" @update:model-value="handleKeyPress" v-model="sec.sgender">Gender
			</SelectInput>
			<TextInput @update:model-value="handleKeyPress" v-model="sec.scity_ob">City of Birth</TextInput>
		</div>

		<div class="flex gap-4 col-span-12 justify-center">
			<SelectInput :options="$countries" @update:model-value="handleKeyPress" v-model="sec.scountry_ob">Country of Birth
			</SelectInput>
			<TextInput @update:model-value="handleKeyPress" v-model="sec.scontact">Phone Number</TextInput>
		</div>
	</div>
</template>

<script setup lang="ts">
import { SecApplicant } from 'interfaces/interfaces';
import { useStorage } from '@vueuse/core';

const { $formatDate } = useNuxtApp()
const sdob = ref()
const emit = defineEmits(['sec'])

const handleKeyPress = () => {
	if (sdob.value) sec.value.sdob = $formatDate(sdob.value)
	emit('sec', sec)
}

const handleClick = () => console.log(sec);

const sec = ref<SecApplicant>({
	slastName: '',
	sfirstName: '',
	sotherName: '',
	scity_ob: '',
	scountry_ob: '',
	scontact: '',
	sgender: '',
	sdob: '',
})

onMounted(() => {
	console.log(sec_apl.value);

	sec.value = sec_apl.value
	emit('sec', sec.value)
})

const sec_apl = ref(useStorage<SecApplicant>('sec_apl', sec))
</script>