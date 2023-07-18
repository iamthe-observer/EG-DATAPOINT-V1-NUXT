<template>
	<ul class="steps steps-horizontal">
		<li ref="_step" v-for="(step, i) in steps" :key="i" @click="e => handleClick(e, step)" :class="`step`">
			{{ step.name }}
		</li>
	</ul>
</template>

<script setup lang="ts">
const emit = defineEmits(['step'])
defineProps<{
	steps: {
		name: string
		page: string
	}[]
}>()

const handleClick = (e: any, step: any) => {
	const stepEl = document.querySelectorAll('.step')
	for (let ii = 0; ii < stepEl.length; ii++) {
		const ee = stepEl[ii];
		ee.classList.remove('step-primary')
	}
	e.target.classList.add('step-primary')
	emit('step', step.page)
}
const _step = ref<HTMLElement>()
</script>