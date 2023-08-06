<template>
	<p class="flex flex-col text-white w-full rounded-xl bg-neutral-700 dark:text-neutral-900 dark:font-semibold dark:bg-neutral-200
	dark:outline
		dark:outline-2 dark:outline-neutral-400 dark:shadow-lg">
		<span :class="[
			'heading font-normal bg-neutral-900 dark:bg-neutral-400 dark:text-black',
			edit_mode ? 'dark:text-accent text-secondary dark:bg-neutral-300' : 'text-neutral-400',
		]">
			{{ heading }}
		</span>
		<span v-if="!edit_mode" class="info truncate">{{ modelValue }}</span>

		<input v-else-if="edit_mode && !disabled" oninput="this.value = this.value.toUpperCase()" type="text"
			class="info_edit bg-neutral-700 dark:bg-neutral-100" @input="$emit('update:modelValue', $event.target?.value)"
			:value="modelValue ? modelValue : value" :placeholder="placeholder ? placeholder : ''">
	</p>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAplStore } from '@/store/apl';

const { edit_mode } = storeToRefs(useAplStore())
defineEmits(['update:modelValue'])
defineProps<{
	modelValue: string | number
	heading: string
	value?: string
	placeholder?: string
	disabled?: boolean
}>()
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