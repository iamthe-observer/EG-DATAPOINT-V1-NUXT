<template>
	<div class="w-full h-full flex justify-between p-7 relative">
		<div class="absolute bg- inset-0 my-7 mx-7">
			<div class="w-full h-full flex relative">
				<div class="l-slide w-[00px] rounded-2xl bg-black1"></div>
				<div class="flex-1 rounded-2xl bg-black"></div>
				<div class="r-slide w-[400px] rounded-2xl bg-black1"></div>
			</div>
		</div>
		<AuthRegister @toLogin="toLogin" class="__register opacity-0 z-10" />
		<AuthLogin @login="$loadAppData" class="__login opacity-100 z-10" />
		<!-- <AuthLogin @toRegister="toRegister" ref="login" @login="changeBG" class="__login opacity-100 z-10" /> -->
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'auth',
	// middleware: 'auth'
})


function toRegister() {
	setTimeout(() => {
		gsap.to('.r-slide', {
			width: 0,
			opacity: 0,
			duration: 1
		})
		gsap.to('.l-slide', {
			width: 400,
			opacity: 1,
			delay: .5,
			duration: 1
		})
		setTimeout(() => {
			gsap.to('.__register', {
				opacity: 1,
				duration: 1
			})
		}, 1000);
	}, 500);

	// @ts-ignore
	gsap.to('.__login', {
		opacity: 0,
		duration: .5
	})
}
function toLogin() {
	setTimeout(() => {
		gsap.to('.r-slide', {
			width: 400,
			opacity: 1,
			delay: .5,
			duration: 1
		})
		gsap.to('.l-slide', {
			width: 0,
			opacity: 0,
			duration: 1
		})
		setTimeout(() => {
			gsap.to('.__login', {
				opacity: 1,
				duration: 1
			})
		}, 1000);
	}, 500);

	// @ts-ignore
	gsap.to('.__register', {
		opacity: 0,
		duration: .5
	})
}

</script>
