<template>
	<div class="w-full h-full flex flex-col rounded-2xl pb-2">
		<div
			class="w-full h-full rounded-2xl bg-neutral-800 col-span-full row-span-full pb-2 overflow-y-scroll scrollbar-hidden text-justify px-0 relative">

			<h1
				class="px-5 py-5 rounded-2xl bg-neutral-700 text-2xl w-full flex justify-between items-center sticky top-0 mb-2 shadow-lg z-10">
				<span class="">Add a new Applicant</span>

				<!-- <steps @step="handleStep" :steps="steps_"
					v-if="prime_apl?.pmarital_status === 'MARRIED' || prime_apl?.children_number! > 0" class="text-sm" /> -->
				<steps @step="handleStep" :steps="steps_" class="text-sm" />

				<div class="text-md">
					<button @click="handleSend" class="btn btn-outline rounded-xl">SUBMIT</button>
					<!-- <button @click="handleSend" v-if="prime_apl?.pmarital_status !== 'MARRIED' && prime_apl?.children_number == 0"
						class="btn btn-outline rounded-xl">SUBMIT</button> -->

					<!-- <div v-if="prime_apl?.pmarital_status === 'MARRIED' || prime_apl?.children_number! > 0"
						class="join grid grid-cols-2 rounded-2xl">
						<button class="join-item btn bg-neutral-600 border-none">Previous page</button>
						<button ref="progress_btn" class="join-item btn bg-neutral-800 border-none">Next</button>
					</div> -->
				</div>
			</h1>
			<!-- text fields -->
			<FieldSetPrimeApl @apl="handlePrimeInput" v-if="curr_page == 'prime'" :current_page="curr_page" :apl_id="apl_id" />
			<FieldSetSecApl @sec="" v-if="curr_page == 'sec'" />
			<FieldSetWardApl @ward="handleWardInput" v-for="idx in 4" :idx="idx" :key="idx" v-if="curr_page == 'ward'" />
		</div>
	</div>
</template>

<script setup lang='ts'>
import { PrimeApplicant, WardsApplicant, SecApplicant } from 'interfaces/interfaces';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid'

const apl_id = ref(uuidv4())
function handleStep(page: string) {
	curr_page.value = page

}

const curr_page = ref('prime')
// const progress_btn = ref<HTMLDivElement>()
const prime_apl = ref<PrimeApplicant>()
onMounted(() => console.log(prime_apl.value))
const sec_apl = ref<SecApplicant>()
const ward_apls = ref<WardsApplicant[]>([])

const steps_ = ref([{ name: 'Primary', page: 'prime' }])

// this handles the visibility of the steps
watchEffect(() => {
	if (prime_apl.value?.pmarital_status === 'MARRIED') {
		if (steps_.value.every(step => step.name != 'Secondary'))
			steps_.value.push({ name: 'Secondary', page: 'sec' })
	}

	if (prime_apl.value?.pmarital_status !== 'MARRIED') {
		let stepper = steps_.value.filter(step => step.name !== 'Secondary')
		steps_.value = stepper
	}

	if (prime_apl.value?.children_number! > 0) {
		let stepper = steps_.value.filter(step => !step.name.startsWith('Ward'))
		steps_.value = stepper
		for (let ii = 0; ii < prime_apl.value?.children_number!; ii++) {
			const el = ii;
			steps_.value.push({ name: `Ward ${el + 1}`, page: 'ward' })
		}
	}

	if (prime_apl.value?.children_number == 0) {
		let stepper = steps_.value.filter(step => step.name == 'Primary' || step.name == 'Secondary')
		steps_.value = stepper
	}

})

// [ ] warning message when you have to leave the page with info on it
const handlePrimeInput = (prime: PrimeApplicant) => {
	prime_apl.value = prime
}

const handleSecInput = (sec: SecApplicant) => {
	sec_apl.value = sec
}

const handleWardInput = (ward: WardsApplicant) => {
	if (ward_apls.value.some(warder => warder.index == ward.index)) {
		const filtered_ward = ward_apls.value.filter(warder => warder.index != ward.index)
		filtered_ward.push(ward)
		filtered_ward.sort((a, b) => a.index - b.index)
		ward_apls.value = filtered_ward

	} else {
		ward_apls.value.push(ward)
		ward_apls.value.sort((a, b) => a.index - b.index)
	}
	console.log(ward_apls.value);

}

const handleSend = async () => {
	console.log(prime_apl.value);
	// await submitApl()
}

const submitApl = async () => {
	try {
		// @ts-ignore
		const { error } = await useSupabaseClient().from('applicants').insert([prime_apl.value])

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