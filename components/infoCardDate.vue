<template>
	<p class="flex flex-col text-black rounded-none w-full bg-neutral-100 font-semibold outline outline-2 outline-black">
		<span :class="[
			'heading font-normal bg-neutral-400',
			edit_mode ? 'text-accent' : 'text-black',
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
	@apply w-full rounded-none border-b-2 border-black px-3 py-1 text-sm;
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