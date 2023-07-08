<template>
	<div class="bg-green-5001 text-white rounded-xl w-[400px] h-full p-4 flex flex-col">
		<!-- <div class="w-full text-right">Not a member Yet? <span @click="$emit('toRegister')"
				class="cursor-pointer text-amber-600">Register
				Here</span>
		</div> -->
		<div class="flex flex-col w-full h-full justify-center px-12">
			<p class="w-full text-center text-2xl">Hello</p>
			<p class="w-full text-center mb-5">Welcome back!</p>
			<textInput :no_uppercase="true" :bg="'neutral-700'" v-model="email_" :placeholder="'Enter username / email'" />
			<textInput :no_uppercase="true" :bg="'neutral-700'" v-model="password" :placeholder="'Password'" class="mb-2" />
			<span class="w-full text-right mb-6">Recover Password</span>
			<button @click="loginUser" class="btn mb-9">Sign In</button>
			<span class="w-full text-center mb-4">Or continue with</span>
			<div class="mx-auto">google G</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app'
import { required, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const email_ = ref('')
const password = ref('')
const { } = storeToRefs(useAppStore())
const emit = defineEmits(['login'])

const rules = computed(() => {
	return {
		email: { required, email },
		password: { required },
	}
})

// interface LoginInUser {
// 	(e: 'logIn'): void
// }

// interface AdminEmail {
// 	id: number
// 	created_at: Date
// 	email: string
// 	name: string
// 	user_id: string
// }

// type UserLogin = {
// 	email: string
// 	password: string
// }

const loading = ref<boolean>(false)
const errMsg = ref<string>('')
function checkPassword(str: string) {
	var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
	return re.test(str)
}



async function loginUser() {
	// loading.value = true
	const v$l = useVuelidate(rules, { email: email_, password: password })
	let val: any = await v$l.value.$validate()

	if (!val) {
		v$l.value.$errors.forEach(err => {
			alert(err.$message)
		})
		loading.value = false
	}
	try {
		let { error } = await useSupabaseClient().auth.signInWithPassword({
			email: email_.value,
			password: password.value,
		})
		if (error) throw error
		console.log('Logged In!')
		loading.value = false
		useNuxtApp().$router.push('/dashboard')

		emit('login')
		return true
	} catch (err: any) {
		errMsg.value = err.message
		console.log(errMsg.value);

		setTimeout(() => {
			errMsg.value = ''
		}, 4000)
		alert(err)
	} finally {
		loading.value = false
	}
}
</script>