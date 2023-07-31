<template>
	<div class="flex flex-col items-center">
		<FieldSetWardApl @file="handleFile" v-for="(ward) in applicant.wards" :idx="ward.index!" :key="ward.index!"
			:ward_info="applicant.wards![ward.index!]" />
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAplStore } from '@/store/apl';

const { applicant } = storeToRefs(useAplStore())

onMounted(() => {
	setTimeout(() => {
		props.container.scrollTo({ top: 0, behavior: 'smooth' });
	}, 100)
})

const props = defineProps<{
	container: HTMLDivElement
}>()

const emit = defineEmits(['handleWardInput', 'file'])

function handleFile(e: any) {
	emit('file', e)
}
</script>

<style scoped></style>