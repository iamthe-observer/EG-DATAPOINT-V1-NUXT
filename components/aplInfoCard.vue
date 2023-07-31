<template>
	<p class="container">
		<span :class="[
			'heading',
			edit_mode ? 'text-secondary' : 'text-neutral-400',
		]">
			{{ heading }}
		</span>
		<span v-if="!edit_mode" class="info truncate">{{ modelValue }}</span>

		<input v-else oninput="this.value = this.value.toUpperCase()" type="text" class="info_edit"
			@input="$emit('update:modelValue', $event.target?.value)" :value="modelValue ? modelValue : value"
			:placeholder="placeholder ? placeholder : ''">
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
}

.info_edit {
	@apply p-3 bg-[#3f3f3f] rounded-b-xl;
}

.heading {
	@apply w-full bg-neutral-900 rounded-t-xl px-3 py-1 text-sm;
}
</style>