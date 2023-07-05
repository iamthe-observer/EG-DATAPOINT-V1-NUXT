<template>
	<div class="__dashboard w-full h-full grid grid-cols-12 gap-1 grid-rows-15">
		<HeroDash />
		<Calendar />
		<UsersDash />
		<AplInfoDash />
		<MostRecentApls />
		<AplsTimeGraph />
	</div>
</template>

<style scoped>
.griddy {
	display: grid;
}
</style>