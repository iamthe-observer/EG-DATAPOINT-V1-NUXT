<template>
	<div class="form-control w-full">
		<label class="label">
			<span class="label-text">
				<slot />
			</span>
		</label>
		<input :value="modelValue ? modelValue : value" @input="$emit('update:modelValue', $event.target?.value)" type="text"
			:placeholder="placeholder ? placeholder : ''" :class="`input input-bordered w-full border-none bg-${bg}`" />
	</div>
</template>

<script setup lang="ts">
const emits = defineEmits(['update:modelValue'])
defineProps<{
	value?: string
	modelValue?: string | number
	placeholder?: string
	bg?: string
}>()
</script>