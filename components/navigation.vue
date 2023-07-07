<template>
	<div class="w-full h-full bg-neutral-800 p-0 rounded-2xl gap-5 flex flex-col justify-between">
		<Avatar @click="$router.push('/')" />
		<nav-links />
		<lightmode-toggle @click="handleLogout" />
	</div>
</template>

<script setup lang="ts">
async function handleLogout() {
	try {
		let { error } = await useSupabaseClient().auth.signOut()
		if (error) throw error
		console.log('signed out');

		// logged.value = ev;
		// set(logged, ev)
		useNuxtApp().$router.push('/')
	} catch (error: any) {
		console.log(error);

	}
}

</script>