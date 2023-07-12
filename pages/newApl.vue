<template>
	<div class="w-full h-full flex flex-col rounded-2xl pb-2">
		<div
			class="w-full h-full rounded-2xl bg-neutral-800 col-span-full row-span-full pb-2 overflow-y-scroll scrollbar-hidden text-justify px-0 relative">

			<h1 @click="handleClick"
				class="px-5 py-5 rounded-2xl bg-neutral-700 text-2xl w-full flex justify-between items-center sticky top-0 mb-2 shadow-lg z-10">
				<span class="">Add a new Applicant</span>

				<steps v-if="apl_data.prime?.pmarital_status !== 'UNMARRIED' || apl_data.prime?.children_number !== 0"
					@step="handleStep" :steps="steps_" class="text-sm" />

				<div class="text-md">
					<button @click="handleSend" class="btn btn-outline rounded-xl">SUBMIT</button>
				</div>
			</h1>
			<!-- text fields -->
			<FieldSetPrimeApl @apl="handlePrimeInput" v-if="curr_page == 'prime'" :current_page="curr_page" />

			<FieldSetSecApl @sec="handleSecInput" v-if="curr_page == 'sec'" />

			<div v-if="curr_page == 'ward'" class="">
				<FieldSetWardApl v-for="idx in  Number(apl_data.prime?.children_number)" :key="idx" @ward="handleWardInput"
					:idx="idx" />

			</div>
		</div>
	</div>
</template>

<script setup lang='ts'>
import { PrimeApplicant, WardsApplicant, SecApplicant, AplData } from 'interfaces/interfaces';
import { useAplStore } from '@/store/apl';

const steps_ = ref([{ name: 'Primary', page: 'prime' }])
const curr_page = ref('prime')
const apl_data = reactive<AplData>({
	prime: null,
	sec: null,
	wards: [],
})

onBeforeUnmount(() => {
	useAplStore().resetAplData()
})

// this handles the visibility of the steps
watchEffect(() => {
	if (apl_data.prime?.pmarital_status === 'MARRIED') {
		if (steps_.value.every(step => step.name != 'Secondary'))
			steps_.value.push({ name: 'Secondary', page: 'sec' })
	}

	if (apl_data.prime?.pmarital_status !== 'MARRIED') {
		let stepper = steps_.value.filter(step => step.name !== 'Secondary')
		steps_.value = stepper
	}

	if (apl_data.prime?.children_number! > 0) {
		let stepper = steps_.value.filter(step => !step.name.startsWith('Wards'))
		steps_.value = stepper
		steps_.value.push({ name: 'Wards', page: 'ward' })

	}

	if (apl_data.prime?.children_number == 0) {
		let stepper = steps_.value.filter(step => step.name == 'Primary' || step.name == 'Secondary')
		steps_.value = stepper
	}
})

function resetApl_sec() {
	apl_data.sec = {
		slastName: '',
		sfirstName: '',
		sotherName: '',
		scity_ob: '',
		scountry_ob: '',
		scontact: '',
		sgender: '',
		sdob: '',
	}
}
function resetApl_wards() {
	apl_data.wards = []
}
// resets sec on marital status change
watchEffect(() => {
	if (apl_data.prime?.pmarital_status == 'UNMARRIED') {
		resetApl_sec()
	}
})
// resets wards on number of children
watchEffect(() => {
	if (apl_data.prime?.children_number == 0) {
		resetApl_wards()
	}
})

// check to regulate the amount of wards in apl_data.wards
watchEffect(() => {
	if (apl_data.wards?.length! > apl_data.prime?.children_number! && apl_data.wards?.length != 0) {
		let diff = apl_data.wards?.length! - apl_data.prime?.children_number!
		for (let ii = 0; ii < diff; ii++) {
			apl_data.wards?.pop()
		}
		console.log('done');
	}
})

function handleStep(page: string) {
	curr_page.value = page
}

function handleClick() {
}

const handlePrimeInput = (prime: PrimeApplicant) => {
	apl_data.prime = prime
}

const handleSecInput = (sec: SecApplicant) => {
	apl_data.sec = sec
}

const handleWardInput = (ward: WardsApplicant) => {
	if (apl_data.wards?.length! > 0 && apl_data.wards!.some(warder => warder.index == ward.index)) {
		const filtered_ward = apl_data.wards!.filter(warder => warder.index != ward.index)
		filtered_ward.push(ward)
		filtered_ward.sort((a, b) => a.index - b.index)
		apl_data.wards = filtered_ward

	} else {
		apl_data.wards!.push(ward)
		apl_data.wards!.sort((a, b) => a.index - b.index)
	}

	useAplStore().setWardsApl(apl_data.wards!)
}

const handleSend = async () => {
	if (apl_data.wards?.length! > 0) {
		for (let ii = 0; ii < apl_data.wards!.length; ii++) {
			const el = apl_data.wards![ii];
			apl_data.prime?.wards!.push(el)
		}
	}

	console.log(apl_data);
	// await submitApl()
}

const submitApl = async () => {
	try {
		// @ts-ignore
		const { error } = await useSupabaseClient().from('applicants').insert([apl_data.prime])

		if (error) throw error
	} catch (err: any) {
		console.log(err);

	}
}
</script>

<style scoped>
.griddy {
	display: grid;
}
</style>