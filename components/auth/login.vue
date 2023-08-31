<template>
	<!-- container -->
	<div class="w-full text-black bg-neutral-50 h-full flex relative">

		<img src="../../assets/images/loginImg.jpg" alt="" class="absolute inset-0 w-full h-full object-cover">

		<div class="sm:w-[40%] w-full backdrop-blur-sm justify-center h-full flex flex-col px-10 z-10">
			<!-- company title -->
			<h3 class="font-semibold">
				Ebbysgold Group
			</h3>

			<div class="flex flex-col mt-10">
				<h1 class="text-3xl font-bold">Sign In</h1>
				<p class="text-sm text-neutral-500">Welcome to <span class="text-purple-500 text-sm">Ebbysgold Datapoint</span>,
					enter
					account details
					below.</p>
			</div>

			<form @submit.prevent="loginUser" class="flex flex-col gap-2 mt-10">
				<!-- email -->
				<div class="form-control w-full max-w-full">
					<label class="label">
						<span class="label-text text-sm text-black">Email</span>
					</label>
					<input v-model="email_" type="email" placeholder="email over here"
						class="input input-bordered bg-white rounded-sm w-full max-w-full focus:shadow-box shadow-box-null transition-all duration-150 ease-out" />
				</div>

				<!-- password -->
				<div class="form-control w-full max-w-full">
					<label class="label">
						<span class="label-text text-sm text-black">Password</span>
					</label>
					<input v-model="password" type="password" placeholder="super secret password 😉"
						class="input input-bordered bg-white rounded-sm w-full max-w-full focus:shadow-box shadow-box-null transition-all duration-150 ease-out" />
				</div>

				<div class="self-end hover:text-purple-500 hover:scale-110 transition-all duration-100 ease-out cursor-pointer">
					Reset Password
				</div>
			</form>

			<button @click="loginUser"
				class="mt-10 border border-black font-semibold p-3 rounded-sm bg-primary text-black shadow-box active:shadow-box-null transition-all duration-150 ease-out hover:bg-white flex items-center justify-center">
				<span v-if="loading" class="loading loading-infinity loading-md"></span>
				<span class="" v-else>Sign In</span>
			</button>
		</div>

	</div>
</template>

<style scoped></style>

<script setup lang="ts">
import { required, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useTitle } from '@vueuse/core';

useTitle('EG Datapoint | Home | Login')

const { $SB } = useNuxtApp()
const email_ = ref('')
const password = ref('')
const emit = defineEmits(['login'])

const rules = computed(() => {
	return {
		email: { required, email },
		password: { required },
	}
})

const loading = ref<boolean>(false)
const errMsg = ref<string>('')

async function loginUser() {
	loading.value = true
	const v$l = useVuelidate(rules, { email: email_, password: password })
	let val: any = await v$l.value.$validate()

	if (!val) {
		v$l.value.$errors.forEach(err => {
			alert(err.$message)
		})
		loading.value = false
	}
	try {
		let { error } = await $SB.auth.signInWithPassword({
			email: email_.value,
			password: password.value,
		})
		if (error) throw error
		console.log('Logged In!')
		loading.value = false

		let { data: DATA } = await $SB.from('profiles').select('*').eq('id', useSupabaseUser().value?.id)
		console.log(DATA);
		console.log(useNuxtApp().$mobileCheck());

		if (!DATA![0].role && useNuxtApp().$mobileCheck()) {
			alert('Open site on a computer to continue!...')
			await $SB.auth.signOut()
			return useNuxtApp().$router.push('/')
		}

		// if (DATA![0].role && useNuxtApp().$mobileCheck()) {
		// 	useNuxtApp().$router.push('/analytics')
		// } else if (DATA![0].role && !useNuxtApp().$mobileCheck()) {
		// 	useNuxtApp().$router.push('/dashboard')
		// } else {
		// 	useNuxtApp().$router.push('/dashboard')
		// }

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
