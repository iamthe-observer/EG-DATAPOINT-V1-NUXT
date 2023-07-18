<template>
	<div v-if="curr_page == 'ward'" class="flex flex-col items-center">
		<FieldSetWardApl v-for="idx in  Number(apl_data.prime?.children_number)" :key="idx" @ward="handleWardInput"
			:idx="idx" />
	</div>
</template>

<script setup lang="ts">
import { AplData } from 'interfaces/interfaces';

onMounted(() => {
	setTimeout(() => {
		props.container.scrollTo({ top: 0, behavior: 'smooth' });
	}, 100)
})

const props = defineProps<{
	container: HTMLDivElement
	curr_page: string
	apl_data: AplData
}>()

const emit = defineEmits(['handleWardInput'])

function handleWardInput(e: any) {
	emit('handleWardInput', e)
}
</script>

<style scoped></style>