<template>
	<div class="__newApl relative w-full grid grid-cols-12 gap-2 px-5 py-2">
		<div class="col-span-2 row-span-2 flex flex-col items-center gap-3">
			<avatarSelect :src="secSRC" @click="logger" class="" />

			<input @change="handleFile" type="file" class="file-input file-input-primary file-input-xs w-full max-w-xs" />
			<span v-if="has_files" class="text-xs px-3 py-1 rounded-full bg-green-800">{{ has_files ? 'Saved Image' : ''
			}}</span>
		</div>
		<!-- name -->
		<div class="flex gap-4 col-span-10 pl-6 justify-center">
			<TextInput @update:model-value="handleKeyPress" v-model="sec_apl.slastName">Last Name</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="sec_apl.sfirstName">First Name</TextInput>
			<TextInput @update:model-value="handleKeyPress" v-model="sec_apl.sotherName">Other Name</TextInput>
		</div>

		<div class="flex gap-4 col-span-10 pl-6 justify-center">
			<DatePicker @click="handleKeyPress" dark :color="'purple'" is-dark v-model="sdob" mode="date">
				<template #default="{ togglePopover }">
					<TextInput :icon="true" :value="sdob ? $formatDate(sdob) : $formatDate(sec_apl.sdob!)" @click="togglePopover">
						Date of Birth
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
import { useImageStore } from '@/store/images';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { SecApplicant } from 'interfaces/interfaces';

const { sec_apl } = storeToRefs(useAplStore())
const { $formatDate } = useNuxtApp()
const sdob = ref()
const emit = defineEmits(['sec', 'validate', 'file'])
const secSRC = ref()

const { secIMG, has_files } = storeToRefs(useImageStore())

onMounted(() => {
	if (secIMG.value) secSRC.value = URL.createObjectURL(secIMG.value)
	sdob.value = sec_apl.value.sdob!
})

function handleFile(evt: any) {
	secSRC.value = URL.createObjectURL(evt.target.files[0])

	emit('file', {
		type: 'sec',
		file: evt.target.files[0]
	})
}

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

const logger = async (log: SecApplicant) => {
	log.sdob = sdob.value
	let val = await v$.value.$validate()

	if (!val) {
		v$.value.$errors.forEach(err => {
			console.log(err.$property, err.$message);
		});
	} else console.log(val);
}

// onMounted(() => {
// 	emit('sec', sec_apl.value)
// })

const handleKeyPress = async () => {
	if (sdob.value) sec_apl.value.sdob = sdob.value
	emit('sec', sec_apl.value)
	const val = await v$.value.$validate()
	emit('validate', val)
}
</script>