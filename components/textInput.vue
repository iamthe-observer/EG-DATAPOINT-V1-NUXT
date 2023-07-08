<template>
	<div class="form-control w-full">
		<label class="label">
			<span class="label-text">
				<slot />
			</span>
		</label>
		<input v-if="!no_uppercase" oninput="this.value = this.value.toUpperCase()" :value="modelValue ? modelValue : value"
			@input="$emit('update:modelValue', $event.target?.value)" type="text" :placeholder="placeholder ? placeholder : ''"
			:class="`input input-bordered w-full border-none bg-${bg}`" />
		<input v-else :value="modelValue ? modelValue : value" @input="$emit('update:modelValue', $event.target?.value)"
			type="text" :placeholder="placeholder ? placeholder : ''"
			:class="`input input-bordered w-full border-none bg-${bg}`" />
	</div>
	<!-- this.value = this.value.toUpperCase()  -->
</template>

<script setup lang="ts">
defineEmits(['update:modelValue'])
defineProps<{
	no_uppercase?: boolean
	value?: string
	modelValue?: string | number
	placeholder?: string
	bg?: string
}>()
</script>