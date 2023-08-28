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
		<span v-if="!edit_mode" class="info">{{ value ? $formatDateWords(new Date(value!)) : '' }}</span>
		<DatePicker v-else dark :color="'purple'" is-dark v-model="value" mode="date">
			<template #default="{ togglePopover }">
				<span @click="togglePopover" class="info_edit dark:bg-neutral-100">{{ value ? $formatDateWords(new Date(value!)) :
					''
				}}</span>
			</template>
		</DatePicker>
	</p>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useViewAplStore } from '@/store/viewApl';

const { edit_mode } = storeToRefs(useViewAplStore())

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
	modelValue: Date | null
	heading: string
	placeholder?: string
	disabled?: boolean
}>()

const value = computed({
	get() {
		return props.modelValue!
	},
	set(value: Date) {
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

.heading {
	@apply w-full rounded-t-xl px-3 py-1 text-sm;
}

.info {
	@apply p-3;
	@apply h-full;
}

.info_edit {
	@applyll;
	@apply p-3 rounded-b-xl;
}
</style>