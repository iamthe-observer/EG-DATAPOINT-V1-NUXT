<template>
	<div class="w-full h-full flex flex-col rounded-2xl pb-2">
		<div
			class="w-full h-full rounded-2xl bg-neutral-800 col-span-full row-span-full pb-2 overflow-y-scroll scrollbar-hidden text-justify px-0 relative">

			<h1
				class="px-5 py-5 rounded-2xl bg-neutral-700 text-2xl w-full flex justify-between items-center sticky top-0 mb-2 shadow-lg z-10">
				<span class="">Add a new Applicant</span>

				<steps v-if="prime_apl?.pmarital_status !== 'unmarried' || prime_apl?.children_number! > 0" class="text-sm" />

				<div class="text-md">
					<button v-if="prime_apl?.pmarital_status == 'unmarried' && prime_apl.children_number == 0"
						class="btn btn-outline rounded-2xl">SUBMIT</button>

					<div v-else class="join grid grid-cols-2 rounded-2xl">
						<button class="join-item btn bg-neutral-600 border-none">Previous page</button>
						<button ref="progress_btn" class="join-item btn bg-neutral-800 border-none">Next</button>
					</div>
				</div>
			</h1>
			<!-- text fields -->
			<FieldSetPrimeApl @apl="handleAplInput" v-if="curr_page == 'prime'" :current_page="curr_page" :apl_id="apl_id" />
			<FieldSetSecApl v-if="curr_page == 'sec'" />
			<FieldSetWardApl v-if="curr_page == 'ward'" />
		</div>
	</div>
</template>

<script setup lang='ts'>
import { Applicant } from 'interfaces/interfaces';
import { v4 as uuidv4 } from 'uuid'

const apl_id = ref(uuidv4())
const curr_page = ref('prime')
const progress_btn = ref<HTMLDivElement>()
const prime_apl = ref<Applicant>()

// [ ] warning message when you have to leave the page with info on it
const handleAplInput = (apl: Applicant) => {
	prime_apl.value = apl
}

</script>

<style scoped>
.griddy {
	display: grid;
}
</style>