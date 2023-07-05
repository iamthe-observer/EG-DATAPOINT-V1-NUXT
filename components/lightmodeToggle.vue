<template>
	<section class="__lightmode w-full h-fit flex flex-col items-center gap-2 pb-4">
		<div class=""><span>Mode</span></div>
		<div ref="toggle"
			class="__mode w-10 bg-neutral-900 h-full rounded-full flex flex-col relative items-center justify-evenly gap-5 py-3 transition-all ease-out duration-200">
			<SvgsLight @click="toggleLight" :state="state" class="z-10" />
			<SvgsDark @click="toggleDark" :state="state" class="z-10" />

			<div
				:class="state ? 'absolute w-6 aspect-square bg-neutral-700 rounded-full top-2 opacity-30 left-1/2 -translate-x-1/2 transition-all duration-300 ease-out' : 'absolute w-6 aspect-square bg-neutral-700 rounded-full top-11 opacity-30 left-1/2 -translate-x-1/2 transition-all duration-300 ease-out'">
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
const toggle = ref<HTMLDivElement>()!
const state = ref(false)

const toggleLight = () => {
	state.value = true
	console.log(state.value);
}
const toggleDark = () => {
	state.value = false
	console.log(state.value);
}
</script>