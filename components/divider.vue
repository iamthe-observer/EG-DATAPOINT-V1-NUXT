<template>
	<div class="flex w-full h-fit items-center group">
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