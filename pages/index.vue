<template>
	<div class="w-full h-full flex justify-between p-7 relative">
		<div class="absolute bg- inset-0 my-7 mx-7">
			<div ref="bg" class="w-full h-full flex relative">
				<div class="w-[00px] rounded-2xl bg-black1"></div>
				<div class="flex-1 rounded-2xl bg-black"></div>
				<div class="w-[400px] rounded-2xl bg-black1"></div>
			</div>
		</div>
		<AuthRegister class="opacity-0 z-10" />
		<AuthLogin @login="changeBG" class="opacity-100 z-10" />
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'auth',
})
// const supabase = useSupabaseClient()
const bg = ref<HTMLDivElement>()
const changeBG = () => {
	bg.value?.classList.add('bg-blue-600')
}
</script>
