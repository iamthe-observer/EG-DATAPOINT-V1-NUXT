<template>
	<div class="w-full h-full bg-neutral-800 p-0 rounded-2xl gap-5 flex flex-col justify-between">
		<Avatar @click="$router.push('/')" />
		<nav-links />
		<lightmode-toggle />
	</div>
</template>