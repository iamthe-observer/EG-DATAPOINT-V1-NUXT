<template>
	<section class="__lightmode w-full h-fit flex flex-col items-center gap-2 pb-4">
		<div class="dark:font-semibold dark:text-accent"><span class="text-sm">Mode</span></div>
		<div ref="toggle"
			class="__mode w-10 dark:bg-neutral-300 bg-neutral-900 h-full rounded-full flex flex-col relative items-center justify-evenly gap-5 py-3 transition-all ease-out duration-200">
			<SvgsLight @click="toggleLight" :state="dark_mode" class="z-10" />
			<SvgsDark @click="toggleDark" :state="dark_mode" class="z-10" />

			<div
				:class="dark_mode ? 'absolute w-6 aspect-square dark:bg-accent dark:bg-opacity-100 bg-neutral-700 rounded-full top-2 dark:opacity-100 opacity-30 left-1/2 -translate-x-1/2 transition-all duration-300 ease-out' : 'absolute w-6 aspect-square bg-neutral-700 rounded-full top-11 opacity-30 left-1/2 -translate-x-1/2 transition-all duration-300 ease-out'">
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app';

const { dark_mode } = storeToRefs(useAppStore())
const toggle = ref<HTMLDivElement>()!
const store = useAppStore()

async function setMode(mode: boolean) {
	try {
		let { data, error } = await useNuxtApp().$SB.from('profiles').update({ is_dark: mode }).eq('id', useSupabaseUser().value?.id).select()
		if (error) throw error
	} catch (error) {
		console.log(error);
	}
}

const toggleLight = async () => {
	store.setDarkMode(true)
	await setMode(true)
}
const toggleDark = async () => {
	store.setDarkMode(false)
	await setMode(false)
}
</script>