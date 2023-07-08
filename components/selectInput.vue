<template>
	<div class="form-control w-full">
		<label class="label">
			<span class="label-text">
				<slot />
			</span>
		</label>
		<select class="select w-full" @input="$emit('update:modelValue', $event.target?.value)" :value="modelValue">
			<option v-if="options" disabled selected>Pick one</option>
			<option v-if="num_options" disabled selected>Pick number</option>
			<option v-if="options" v-for="(option, i) in  options" :key="i" :value="option.toUpperCase()">{{
				option.toUpperCase() }}</option>
			<option v-if="num_options" v-for="(option, i) in  num_options" :key="i" :value="option">{{ option }}</option>
		</select>
	</div>
</template>

<script setup lang="ts">
defineEmits(['update:modelValue'])
defineProps<{
	options?: string[]
	num_options?: number[]
	modelValue?: string | number
}>()
</script>