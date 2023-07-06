<template>
	<div class="bg-blue-5001 text-white rounded-xl w-[400px] h-full p-4 flex flex-col">
		<div class="w-full text-left">Already a member? <span class="text-purple-700">Login Here</span></div>
		<div class="flex flex-col w-full h-full justify-center px-12">
			<p class="w-full text-center text-2xl">Hello</p>
			<p class="w-full text-center mb-5">Welcome!</p>
			<textInput v-model="email" :placeholder="'Enter email'" />
			<textInput v-model="username" :placeholder="'Enter username'" />
			<textInput v-model="password" :placeholder="'Password'" class="mb-10" />
			<button class="btn mb-9">Sign Up</button>
		</div>
	</div>
</template>

<script setup lang="ts">
const email = ref('')
const username = ref('')
const password = ref('')
</script>