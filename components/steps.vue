<template>
	<ul class="steps steps-horizontal">
		<li v-for="(step, i) in steps" :key="i" @click="$emit('step', step.page)" class="step step-primary">{{ step.name }}
		</li>
	</ul>
</template>

<script setup lang="ts">
defineEmits(['step'])
defineProps<{
	steps: {
		name: string
		page: string
	}[]
}>()

</script>