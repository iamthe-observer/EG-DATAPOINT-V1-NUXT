<template>
	<div class="">
		<main>
			<button class="btn" id="btn1">
				<slot />
			</button>
			<button class="btn" id="btn2"></button>
			<button class="btn" id="btn3"></button>
		</main>
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped>
main {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
}

main>.btn {
	transform: translateX(0%) translateY(0%);
	transition: 0.3s ease-in-out;
}

main:hover>#btn1 {
	transform: translateX(-5%) translateY(-24%);
	transition: 0.3s ease-in-out;
}

main:hover>#btn2 {
	transform: translateX(-2%) translateY(-12%);
	transition: 0.3s ease-in-out;
}

.btn {
	position: absolute;
	min-width: 200px;
	min-height: 40px;
	color: white;
	font-size: 1rem;
	border: solid 2px black;
	border-radius: 0px;
}

#btn1 {
	background: black;
	z-index: 3;
}

#btn2 {
	background: purple;
	z-index: 2;
}

#btn3 {
	background: gold;
	z-index: 1;
}
</style>