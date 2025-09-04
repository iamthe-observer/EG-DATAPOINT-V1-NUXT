<template>
	<div class="w-[30rem] aspect-square rounded-3xl flex flex-col">

		<div class="w-[80%] h-[3rem] rounded-t-full flex bg-blue-800">

		</div>

		<div class="w-[90%] h-[3rem] rounded-t-none flex">
			<div class="w-[90%] h-full bg-blue-700"></div>
			<div class="w-[10%] h-[100%] bg-blue-600"></div>
		</div>

		<div class="w-full h-[90%] rounded-b-3xl flex">
			<div class="w-[90%] h-full bg-blue-500"></div>
			<div class="w-[10%] h-full bg-blue-400 rounded-r-full"></div>
		</div>


	</div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.cube::after {
	content: "";
	aspect-ratio: 1/1;
	height: 100%;
	background: black;
	position: absolute;
	top: 0;
	right: 0;
}

.curve {
	background: conic-gradient(red 6deg,
			orange 6deg 18deg,
			yellow 18deg 45deg,
			green 45deg 110deg,
			blue 110deg 200deg,
			purple 200deg);
}
</style>