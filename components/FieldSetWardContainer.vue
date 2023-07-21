<template>
	<div v-if="curr_page == 'ward'" class="flex flex-col items-center">
		<FieldSetWardApl @file="handleFile" v-for="(apl, idx) in Number(apl_data.prime?.children_number)" :idx="idx"
			:key="idx" :ward_info="apl_data.wards![idx]" @ward="handleWardInput" />
	</div>
</template>

<script setup lang="ts">
import { AplData } from 'interfaces/interfaces';

onMounted(() => {
	setTimeout(() => {
		props.container.scrollTo({ top: 0, behavior: 'smooth' });
	}, 100)

	console.log(props.apl_data.wards);

})

const props = defineProps<{
	container: HTMLDivElement
	curr_page: string
	apl_data: AplData
}>()

const emit = defineEmits(['handleWardInput', 'file'])

function handleFile(e: any) {
	emit('file', e)
}

function handleWardInput(e: any) {
	emit('handleWardInput', e)
}
</script>

<style scoped></style>