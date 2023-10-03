<template>
	<p v-if="!edit_mode"
		class="flex flex-col text-black rounded-none w-full bg-neutral-100 font-semibold outline outline-2 outline-black">
		<span :class="[
			'heading font-normal bg-neutral-400',
			edit_mode ? 'text-accent' : 'text-black',
		]">
			{{ heading }}
		</span>
		<span class="info truncate">{{ modelValue }}</span>

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
	@apply w-full rounded-none border-b-2 border-black px-3 py-1 text-sm;
}
</style>