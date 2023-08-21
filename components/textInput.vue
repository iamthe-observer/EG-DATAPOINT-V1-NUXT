<template>
	<div class="form-control w-full">
		<label class="label">
			<span class="label-text dark:text-neutral-900 dark:font-semibold">
				<slot />
			</span>
		</label>
		<div class="flex w-full">
			<div v-if="!no_uppercase" class="indicator w-full">
				<span
					:class="['transition-all duration-300 ease-in pointer-events-none indicator-item badge-sm badge bg-red-400 border-transparent drop-shadow-xl', val_err ? 'opacity-100' : 'opacity-0']"></span>

				<input oninput="this.value = this.value.toUpperCase()" :value="modelValue ? modelValue : value"
					@input="$emit('update:modelValue', $event.target?.value)" :type="type ? type : 'text'"
					:placeholder="placeholder ? placeholder : ''"
					:class="[`input input-bordered w-full border-none dark:bg-neutral-300 dark:font-semibold bg-${bg} ${icon ? 'rounded-l-xl rounded-r-none bg-neutral-600' : 'rounded-xl bg-neutral-600'} ${classer}`]" />

				<div v-if="icon" :class='`icon grid place-items-center p-2 bg-neutral-700 dark:bg-primary bg-${bg} rounded-e-xl`'>
					<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
						<path fill="#fff"
							d="M17 22v-3h-3v-2h3v-3h2v3h3v2h-3v3h-2ZM5 20q-.825 0-1.413-.588T3 18V6q0-.825.588-1.413T5 4h1V2h2v2h6V2h2v2h1q.825 0 1.413.588T19 6v6.1q-.5-.075-1-.075t-1 .075V10H5v8h7q0 .5.075 1t.275 1H5ZM5 8h12V6H5v2Zm0 0V6v2Z">
						</path>
					</svg>
				</div>

			</div>

			<div v-else class="flex w-full">
				<input :value="modelValue ? modelValue : value" @input="$emit('update:modelValue', $event.target?.value)"
					:type="type ? type : 'text'" :placeholder="placeholder ? placeholder : ''"
					:class="[`input input-bordered w-full border-none dark:bg-neutral-300 dark:font-semibold bg-${bg} ${icon ? 'rounded-l-xl rounded-r-none bg-neutral-600' : 'rounded-xl bg-neutral-600'} ${classer}`]" />
				<!-- icon -->
				<div v-if="icon" :class='`icon grid place-items-center p-2 bg-neutral-700 dark:bg-primary bg-${bg} rounded-e-xl`'>
					<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
						<path fill="#fff"
							d="M17 22v-3h-3v-2h3v-3h2v3h3v2h-3v3h-2ZM5 20q-.825 0-1.413-.588T3 18V6q0-.825.588-1.413T5 4h1V2h2v2h6V2h2v2h1q.825 0 1.413.588T19 6v6.1q-.5-.075-1-.075t-1 .075V10H5v8h7q0 .5.075 1t.275 1H5ZM5 8h12V6H5v2Zm0 0V6v2Z">
						</path>
					</svg>
				</div>
			</div>

		</div>
	</div>
</template>

<script setup lang="ts">
defineEmits(['update:modelValue'])
defineProps<{
	no_uppercase?: boolean
	value?: string
	modelValue?: string | number
	placeholder?: string
	bg?: string
	icon?: boolean
	type?: string
	classer?: string
	val_err?: boolean

}>()
</script>