<template>
	<div class="form-control w-full">
		<label class="label">
			<span class="label-text dark:text-neutral-900 dark:font-semibold">
				<slot />
			</span>
		</label>
		<div class="indicator w-full">
			<span
				:class="['transition-all duration-300 ease-in pointer-events-none indicator-item badge-sm badge bg-red-400 border-transparent drop-shadow-xl', val_err ? 'opacity-100' : 'opacity-0']"></span>

			<select class="select w-full bg-neutral-600 dark:bg-neutral-300 rounded-xl"
				@input="$emit('update:modelValue', $event.target?.value)" :value="modelValue">
				<option v-if="options" disabled selected>Pick one</option>
				<option v-if="num_options" disabled selected>Pick number</option>
				<option v-if="options" v-for="(option, i) in  options" :key="i" :value="option.toUpperCase()">{{
					option.toUpperCase() }}</option>
				<option v-if="num_options" v-for="(option, i) in  num_options" :key="i" :value="option">{{ option }}</option>
			</select>
		</div>
	</div>
</template>

<script setup lang="ts">
defineEmits(['update:modelValue'])
defineProps<{
	options?: string[]
	num_options?: number[]
	modelValue?: string | number
	val_err?: boolean
}>()
</script>