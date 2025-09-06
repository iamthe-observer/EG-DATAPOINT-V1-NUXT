<template>
	<p v-if="!edit_mode" class="relative w-full h-full rounded-xl dark:font-semibold flex flex-col">
	<div class="flex w-full">
		<div :class="[
			'top-box dark:after:bg-[radial-gradient(circle_at_0%_0%,_transparent_10px,_#ffffff50_10px)] relative whitespace-nowrap w-fit min-h-[20px] bg-black/0 font-normal flex p-1 rounded-br-lg',
			edit_mode ? 'dark:text-warning text-secondary' : 'text-white/70',
		]">

			<span
				class="w-full h-full dark:bg-white/20 bg-black/50 px-2 py-0 text-xs rounded-md dark:outline-none outline outline-2 outline-black/60">
				{{ heading }}
			</span>
		</div>

		<span class="w-full rounded-t-xl dark:bg-white/30 bg-black/30"></span>
	</div>

	<div
		class="w-full h-full dark:bg-white/30 bg-black/30 text-white dark:text-white rounded-b-xl rounded-tl-xl flex items-center">

		<span class="info truncate">{{ modelValue }}</span>

	</div>


	</p>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useViewAplStore } from '@/store/viewApl';

const { edit_mode } = storeToRefs(useViewAplStore())
// const modelValue = defineModel<string | number>()
const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
	modelValue: number
	heading: string
	placeholder?: string
	disabled?: boolean
	// select?: boolean
	// options?: string[]
	// num_options?: number[]
}>()

const value = computed({
	get() {
		return props.modelValue
	},
	set(value: number) {
		emit('update:modelValue', value)
	}
})
</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	background-color: #1f1f1f;
	color: white;
	width: 100%;
	border-radius: 10px;
}

.info {
	@apply p-3;
	@apply h-full;
}

.info_edit {
	@apply p-3 rounded-b-xl;
}

.heading {
	@apply w-full rounded-t-xl px-3 py-1 text-sm;
}
</style>