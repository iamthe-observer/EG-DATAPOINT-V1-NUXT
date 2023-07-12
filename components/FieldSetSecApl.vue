<template>
	<div class="__newApl relative w-full grid grid-cols-12 gap-2 px-5 py-2">
		<avatarSelect @click="logger" class="col-span-2 row-span-2" />
		<!-- name -->
		<div class="flex gap-4 col-span-10 pl-6 justify-center">
			<TextInput @update:model-value="handleKeyPress" v-model="sec_apl.sfirstName">First Name</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="sec_apl.sotherName">Middle Name</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="sec_apl.slastName">Last Name</TextInput>
		</div>

		<div class="flex gap-4 col-span-10 pl-6 justify-center">
			<DatePicker @click="handleKeyPress" dark :color="'purple'" is-dark v-model="sdob" mode="date">
				<template #default="{ togglePopover }">
					<TextInput :value="sdob ? $formatDate(sdob) : sec_apl.sdob" @click="togglePopover">Date of Birth
					</TextInput>
				</template>
			</DatePicker>
			<SelectInput :options="['MALE', 'FEMALE']" @update:model-value="handleKeyPress" v-model="sec_apl.sgender">Gender
			</SelectInput>
			<TextInput @update:model-value="handleKeyPress" v-model="sec_apl.scity_ob">City of Birth</TextInput>
		</div>

		<div class="flex gap-4 col-span-12 justify-center">
			<SelectInput :options="$countries" @update:model-value="handleKeyPress" v-model="sec_apl.scountry_ob">Country of
				Birth
			</SelectInput>
			<TextInput @update:model-value="handleKeyPress" v-model="sec_apl.scontact">Phone Number</TextInput>
		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAplStore } from '@/store/apl';
import { required, email, numeric } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

const { sec_apl } = storeToRefs(useAplStore())

const rules = computed(() => {
	return {
		slastName: { required },
		sfirstName: { required },
		sotherName: { required },
		scity_ob: { required },
		scountry_ob: { required },
		scontact: { required },
		sgender: { required },
		sdob: { required },
	}
})

const v$ = useVuelidate(rules, sec_apl.value)

async function logger() {
	const val = await v$.value.$validate()
	console.log(val)
}

onMounted(() => {
	emit('sec', sec_apl.value)
})

const { $formatDate } = useNuxtApp()
const sdob = ref()
const emit = defineEmits(['sec', 'validate'])

const handleKeyPress = () => {
	if (sdob.value) sec_apl.value.sdob = $formatDate(sdob.value)
	emit('sec', sec_apl.value)
}
</script>