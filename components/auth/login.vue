<template>
	<div class="bg-green-5001 text-white rounded-xl w-[400px] h-full p-4 flex flex-col">
		<div class="w-full text-right">Not a member Yet? <span class="text-amber-600">Register Here</span></div>
		<div class="flex flex-col w-full h-full justify-center px-12">
			<p class="w-full text-center text-2xl">Hello</p>
			<p class="w-full text-center mb-5">Welcome back!</p>
			<textInput v-model="email" :placeholder="'Enter username / email'" />
			<textInput v-model="password" :placeholder="'Password'" class="mb-2" />
			<span class="w-full text-right mb-6">Recover Password</span>
			<button @click="LogMeIn()" class="btn mb-9">Sign In</button>
			<span class="w-full text-center mb-4">Or continue with</span>
			<div class="mx-auto">google G</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app'
const email = ref('')
const password = ref('')
const { } = storeToRefs(useAppStore())

async function LogMeIn() {
	try {
		await useAppStore().loginUser({ email: email.value, password: password.value })
	} catch (err: any) {
		console.log(err);
	}
}

// const { loginUser } = storeToRefs(useAppStore())
</script>