<template>
	<!-- <div v-if="is_mobile" class="flex w-full h-fit items-center group">
		<div
			class="flex-1 grid h-12 flex-grow card rounded-xl place-items-center dark:bg-neutral-300 bg-neutral-700 font-semibold text-xl shadow-xl">
			<slot name="apl" :edited="curr_apl" />
		</div>

		<div class="divider divider-horizontal text-center">
			<span
				class="text-sm z-[400] text-neutral-500 dark:text-neutral-800 font-bold drop-shadow-xl group-hover:text-secondary dark:group-hover:text-accent transition-all duration-150 ease-out uppercase">
				<slot name='default' />
			</span>
		</div>

		<div
			class="flex-1 grid h-12 flex-grow card rounded-xl place-items-center dark:bg-neutral-400 bg-neutral-900 font-semibold text-xl shadow-xl">
			<slot name="modified_apl" :original="request.modified_apl" />
		</div>

	</div> -->

	<div class="flex flex-col justify-center w-full h-fit items-center mb-10">
		<!-- heading -->
		<div class="mx-auto whitespace-nowrap w-full">
			<slot name='default' />
		</div>

		<!-- prev data -->
		<div
			class="flex-1 grid h-12 flex-grow card rounded-xl place-items-center dark:bg-neutral-300 bg-neutral-900 font-semibold text-xl shadow-xl w-full rounded-b-none relative border-b-black border-b-2 py-2 text-neutral-600">
			<slot name="apl" :edited="curr_apl" />
			<span class="text-sm absolute right-3 top-1/2 -translate-y-1/2">
				<svg class="fill-red-200" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
					<path
						d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h6l2 2h8q.825 0 1.413.588T22 8v10q0 .825-.587 1.413T20 20zm10.5-3h2q.625 0 1.063-.437T18 15.5v-4h1V10h-2.5V9h-2v1H12v1.5h1v4q0 .625.438 1.063T14.5 17m0-5.5h2v4h-2z" />
				</svg>
			</span>
		</div>

		<!-- new data -->
		<div
			class="flex-1 grid h-12 flex-grow card rounded-xl place-items-center dark:bg-neutral-300 bg-black font-semibold text-xl shadow-xl w-full rounded-t-none py-2">
			<slot name="modified_apl" :original="request.modified_apl" />

			<span class="text-sm absolute right-3 top-1/2 -translate-y-1/2">
				<svg class="fill-green-200" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
					viewBox="0 0 24 24">
					<path
						d="M14 16h2v-2h2v-2h-2v-2h-2v2h-2v2h2zM4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h6l2 2h8q.825 0 1.413.588T22 8v10q0 .825-.587 1.413T20 20z" />
				</svg>
			</span>

		</div>
	</div>
</template>

<script setup lang="ts">
import { useAplStore } from '@/store/apl';
import { useAppStore } from '@/store/app';
import { storeToRefs } from 'pinia';

const apl_ = useAplStore()
const app_ = useAppStore()
const { total_apls } = storeToRefs(app_)
const { curr_compared_request: request } = storeToRefs(apl_)
const curr_apl = computed(() => total_apls.value.find(apl => apl.apl_id == request.value.apl_id))
</script>

<style scoped></style>