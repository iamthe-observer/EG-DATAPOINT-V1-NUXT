<template>
	<div :key="num" class="w-full h-full flex flex-col rounded-2xl pb-2">
		<div ref="container"
			class="w-full h-full rounded-2xl bg-neutral-800 col-span-full row-span-full pb-2 overflow-y-scroll text-justify px-0 relative"
			id="style-1">
			<h1
				class="px-5 py-5 rounded-2xl bg-neutral-700 text-2xl w-full flex justify-between items-center sticky top-0 mb-2 shadow-lg z-10">
				<span class="">Add a new Applicant</span>

				<steps v-if="applicant.pmarital_status !== 'UNMARRIED' || applicant.children_number !== 0" @step="handleStep"
					:steps="steps_" class="text-sm" />

				<div class="text-md flex gap-2">
					<button v-if="!apl_sending" @click="() => { useAplStore().resetAplData(); useImageStore().resetFiles() }"
						class="btn font-normal btn-ghost rounded-xl text-white group hover:bg-base-100 hover:text-white group">
						Reset
						<svg xmlns="http://www.w3.org/2000/svg" class="w-4 aspect-square stroke-red-500" viewBox="0 0 24 24">
							<path fill="none" stroke="" stroke-dasharray="12" stroke-dashoffset="12" stroke-linecap="round"
								stroke-width="2" d="M12 12L19 19M12 12L5 5M12 12L5 19M12 12L19 5">
								<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="12;0" />
							</path>
						</svg>
					</button>
					<button v-if="!apl_sending" @click="async () => {
						await useAplStore().handleSend()
						curr_page = 'prime'
					}" class="btn btn-outline rounded-xl text-white group hover:bg-accent font-normal hover:text-white group">
						SUBMIT
						<SvgsCedis
							class="w-4 aspect-square stroke-white fill-white transition-all duration-150 ease-linear group-hover:fill-white" />
						{{
							price }}.00
					</button>
					<button v-else class="btn btn-ghost rounded-xl text-white">
						<span class="loading loading-spinner"></span>
						loading
					</button>
				</div>
			</h1>
			<!-- text fields -->
			<FieldSetPrimeApl v-if="curr_page == 'prime'" :container="container!" />

			<FieldSetSecApl :container="container!" v-if="curr_page == 'sec'" />


			<FieldSetWardContainer v-if="curr_page == 'ward'" :container="container!" />
		</div>

		<!-- Put this part before </body> tag -->
		<input :checked="if_sent" type="checkbox" id="my_modal_7" class="modal-toggle" />
		<div class="modal">
			<div class="modal-box">
				<p class="py-4 text-center text-2xl">Applicant Saved!</p>
			</div>
			<label class="modal-backdrop bg-[rgb(0,0,0,.7)]" for="my_modal_7">Close</label>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAplStore } from '@/store/apl';
import { useImageStore } from '@/store/images';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app';
import { useTitle } from '@vueuse/core';

useTitle('EG Datapoint | Add Applicant')

const { price } = storeToRefs(useAppStore())
const { applicant, if_sent, apl_sending } = storeToRefs(useAplStore())
const container = ref<HTMLDivElement>()
const steps_ = ref([{ name: 'Primary', page: 'prime' }])
const curr_page = ref('prime')
const num = ref(0)

onMounted(async () => {
	if_sent.value = false
	// try {
	// 	let response = await fetch('http://worldtimeapi.org/api/timezone/Africa/Accra')
	// 	curr_datetime.value = await response.json()
	// 	if (!curr_datetime.value) throw new Error("Can't get DateTime")
	// 	console.log(curr_datetime.value);
	// 	console.log(calculateHoursPassed(curr_datetime.value.datetime));
	// } catch (error) {
	// 	console.log(error);
	// }
	// console.log(apl_data.prime!.aplImg_path.wardsPath);
})

// onBeforeUnmount(() => {
// 	useAplStore().resetAplData()
// 	useImageStore().resetFiles()
// })

// this handles the visibility of the steps
watchEffect(() => {
	if (applicant.value.pmarital_status === 'MARRIED') {
		if (steps_.value.every(step => step.name != 'Secondary'))
			steps_.value.push({ name: 'Secondary', page: 'sec' })
	}

	if (applicant.value.pmarital_status !== 'MARRIED') {
		let stepper = steps_.value.filter(step => step.name !== 'Secondary')
		steps_.value = stepper
	}

	if (applicant.value.children_number! > 0) {
		let stepper = steps_.value.filter(step => !step.name.startsWith('Wards'))
		steps_.value = stepper
		steps_.value.push({ name: 'Wards', page: 'ward' })
	}

	if (applicant.value.children_number == 0) {
		let stepper = steps_.value.filter(step => step.name == 'Primary' || step.name == 'Secondary')
		steps_.value = stepper
	}
})

// resets sec on marital status change
function handleStep(page: string) {
	curr_page.value = page
}

// TODO error handler for JWT expiration

</script>

<style scoped>
.griddy {
	display: grid;
}
</style>
