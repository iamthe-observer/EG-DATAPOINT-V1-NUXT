<template>
	<div :key="num" class="w-full h-full flex flex-col rounded-2xl">
		<div ref="container"
			class="w-full h-full rounded-2xl dark:bg-neutral-50 bg-neutral-800 col-span-full row-span-full overflow-y-scroll text-justify px-0 relative dark:shadow-xl"
			id="style-1">
			<h1
				class="px-5 py-5 rounded-2xl bg-neutral-700 dark:bg-primary text-2xl w-full flex justify-between items-center sticky top-0 mb-2 shadow-lg z-10">
				<span ref="header"
					class="flex flex-col gap-1 dark:text-white dark:hover:text-purple-600 hover:text-neutral-600 group">
					<span class="text-lg">Add a new Applicant</span>
					<button v-if="if_hover_header" onclick="request_modal.showModal()"
						class="btn btn-ghost btn-xs dark:group-hover:text-white group-hover:text-secondary">Request
						Discount</button>

					<dialog id="request_modal" class="modal">
						<form method="dialog" class="modal-box dark:bg-neutral-50 flex flex-col gap-4">
							<button @click="useAplStore().resetRequest()"
								class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-red-500">✕</button>
							<div class="flex flex-col gap-2 items-center">
								<h3 class="font-semibold text-2xl text-neutral-300 dark:text-neutral-900 mb-5">Input
									discounted amount
									only
								</h3>
								<div class="flex gap-2 items-center">
									<span class="text-neutral-600 text-xl dark:text-neutral-900">GHC</span>
									<input v-model="request.body" type="number" min="0"
										class="input input-xl w-fit outline outline-4 outline-neutral-700 dark:outline-neutral-300 dark:text-neutral-900 dark:bg-white text-2xl text-center text-white"
										placeholder="" />
									<span class="text-neutral-600 dark:text-neutral-900">.00</span>
								</div>
							</div>
							<div class="modal-action flex gap-2 items-center">
								<span data-tip="Contact Supervisor or Manager for pending requests."
									class="text-xs tooltip tooltip-left">
									<svg xmlns="http://www.w3.org/2000/svg" class="w-6 z-[500] aspect-square"
										viewBox="0 0 24 24">
										<path fill="white" class="dark:fill-accent"
											d="M11.75 19h-.25q-3.55 0-6.025-2.475T3 10.5q0-3.55 2.475-6.025T11.5 2q1.775 0 3.313.662t2.7 1.825q1.162 1.163 1.824 2.7T20 10.5q0 3.35-1.888 6.225t-4.762 4.5q-.25.125-.5.138t-.45-.113q-.2-.125-.35-.325t-.175-.475L11.75 19Zm-.275-3.025q.425 0 .725-.3t.3-.725q0-.425-.3-.725t-.725-.3q-.425 0-.725.3t-.3.725q0 .425.3.725t.725.3ZM9.3 8.375q.275.125.55.013t.45-.363q.225-.3.525-.463T11.5 7.4q.6 0 .975.337t.375.863q0 .325-.188.65t-.662.8q-.625.55-.925 1.038t-.3.987q0 .3.213.513t.512.212q.3 0 .5-.225t.3-.525q.125-.425.45-.775t.6-.625q.525-.525.788-1.05t.262-1.05q0-1.15-.788-1.85T11.5 6q-.8 0-1.475.388t-1.1 1.062q-.15.275-.038.537t.413.388Z" />
									</svg>
								</span>
								<button @click="useAplStore().requestDiscount()"
									class="btn btn-sm btn-primary border-none">Request</button>
							</div>
						</form>
					</dialog>

				</span>

				<steps v-if="applicant.pmarital_status !== 'UNMARRIED' || applicant.children_number !== 0"
					@step="handleStep" :steps="steps_" class="text-sm" />

				<div class="text-md flex gap-2">
					<button v-if="!apl_sending"
						@click="() => { useAplStore().resetAplData(); useImageStore().resetFiles() }"
						class="btn font-normal btn-ghost rounded-xl text-white group hover:bg-base-100 hover:text-white group">
						Reset
						<svg xmlns="http://www.w3.org/2000/svg" class="w-4 aspect-square stroke-red-500"
							viewBox="0 0 24 24">
							<path fill="none" stroke="" stroke-dasharray="12" stroke-dashoffset="12"
								stroke-linecap="round" stroke-width="2"
								d="M12 12L19 19M12 12L5 5M12 12L5 19M12 12L19 5">
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
			<div class="modal-box dark:bg-white dark:outline dark:outline-4 dark:outline-success">
				<p class="py-4 text-center text-4xl dark:text-success dark:font-semibold">
					Applicant Saved!</p>
			</div>
			<label class="modal-backdrop bg-[rgb(0,0,0,.7)]" for="my_modal_7">Close</label>
		</div>

		<input :checked="if_req_sent" type="checkbox" id="request_modal_1" class="modal-toggle" />
		<div class="modal">
			<div class="modal-box dark:bg-white dark:outline dark:outline-4 dark:outline-success">
				<p class="py-4 text-center text-4xl dark:text-success dark:font-semibold">
					Request Sent!</p>
			</div>
			<label class="modal-backdrop bg-[rgb(0,0,0,.7)]" for="request_modal_1">Close</label>
		</div>

		<Teleport to="body">
			<div v-if="if_val_err" class="absolute bottom-0 left-1/2 -translate-x-1/2 pb-6">
				<div class="alert alert-error">
					<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
						viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span class="">Error! Validation Failed. <br />(Go over and check if all the fields have been
						filled)</span>
				</div>
			</div>
		</Teleport>
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
const { applicant, if_sent, if_req_sent, apl_sending, request, if_val_err } = storeToRefs(useAplStore())
const container = ref<HTMLDivElement>()
const steps_ = ref([{ name: 'Primary', page: 'prime' }])
const curr_page = ref('prime')
const num = ref(0)
const header = ref()
const if_hover_header = useElementHover(header)

onMounted(async () => {
	if_sent.value = false
	useAplStore().resetAplData()
	useImageStore().resetFiles()
})

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

onBeforeUnmount(() => {
	useAplStore().resetAplData()
	useImageStore().resetFiles()
})
</script>

<style scoped>
.griddy {
	display: grid;
}
</style>
