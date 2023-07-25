<template>
	<p class="container">
		<span class="heading">
			{{ heading }}
		</span>
		<span v-if="!edit_mode" class="info">{{ $formatDateWords(new Date(date!)) }}</span>
		<DatePicker @dayclick="logger" v-else dark :color="'purple'" is-dark v-model="date" mode="date">
			<template #default="{ togglePopover }">
				<span @click="togglePopover" class="info_edit">{{ $formatDateWords(new Date(date!))
				}}</span>
			</template>
		</DatePicker>
	</p>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAplStore } from '@/store/apl';

const { edit_mode } = storeToRefs(useAplStore())
const date = ref(new Date())
const props = defineProps<{
	date: Date | null
	heading: string
	name_type: string
	idx?: number | null
}>()
const emit = defineEmits(['date'])
function logger() {
	if (props.idx) {
		emit('date', { name: props.name_type, date: date.value, ward_idx: props.idx });
	} else {
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