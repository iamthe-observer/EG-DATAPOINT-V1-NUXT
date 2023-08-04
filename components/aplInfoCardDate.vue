<template>
	<p class="container">
		<span :class="[
			'heading',
			edit_mode ? 'text-secondary' : 'text-neutral-400',
		]">
			{{ heading }}
		</span>
		<span v-if="!edit_mode" class="info">{{ date ? $formatDateWords(new Date(date!)) : '' }}</span>
		<DatePicker @dayclick="logger" v-else dark :color="'purple'" is-dark v-model="date" mode="date">
			<template #default="{ togglePopover }">
				<span @click="togglePopover" class="info_edit">{{ date ? $formatDateWords(new Date(date!)) : ''
				}}</span>
			</template>
		</DatePicker>
	</p>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAplStore } from '@/store/apl';

const { edit_mode } = storeToRefs(useAplStore())
const props = defineProps<{
	date?: Date
	heading: string
	name_type: string
	idx?: number
}>()
const date = ref<Date | null>(null)

watch(() => props.date, () => {
	date.value = props.date!
	console.log(date.value);
})

const emit = defineEmits(['date'])
function logger() {
	if (props.idx) {
		console.log(props);

		emit('date', { name: props.name_type, date: date.value, ward_idx: props.idx });
	} else {
		console.log(props);

		emit('date', { name: props.name_type, date: date.value });
	}
}
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
	@apply w-full bg-neutral-900 rounded-t-xl px-3 py-1 text-sm;
}

.info {
	@apply p-3;
}

.info_edit {
	@apply p-3 bg-[#3f3f3f] rounded-b-xl;
}
</style>