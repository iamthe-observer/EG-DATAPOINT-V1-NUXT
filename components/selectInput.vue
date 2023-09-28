<template>
	<div class="form-control w-full">
		<label class="label">
			<span class="label-text font-semibold text-neutral-500">
				<slot />
			</span>
		</label>
		<div class="indicator w-full">
			<span
				:class="['transition-all duration-300 ease-in pointer-events-none indicator-item badge-sm badge bg-red-400 rounded-none border-2 border-red-600 drop-shadow-xl', val_err ? 'opacity-100' : 'opacity-0']"></span>

			<select
				class="select w-full bg-white rounded-none border-black border-2 hover:-translate-y-1 focus:-translate-y-1 hover:shadow-neo-box focus:shadow-neo-box transition-all duration-150 ease-out focus:outline-none font-bold"
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