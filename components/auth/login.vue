<template>
	<div
		class="text-black rounded-xl w-[400px] h-full p-4 flex flex-col justify-center bg-neutral-800 bg-opacity-5 backdrop-blur-sm">
		<!-- <div class="w-full text-right">Not a member Yet? <span @click="$emit('toRegister')"
				class="cursor-pointer text-amber-600">Register
				Here</span>
		</div> -->
		<form action="" class="flex flex-col">
			<div class="flex flex-col w-full h-full justify-center px-12">
				<p class="w-full text-center text-2xl font-bold">Hello!</p>
				<p class="w-full text-center mb-5 text-primary text-sm font-semibold">Welcome back to<br />
					Ebbysgold Datapoint!</p>
				<textInput :no_uppercase="true" :bg="'neutral-700'" v-model="email_" :placeholder="'Enter username / email'" />
				<textInput :type="'password'" :no_uppercase="true" :bg="'neutral-700'" v-model="password"
					:placeholder="'Password'" class="mb-2" />
				<span onclick="my_modal_23.showModal()"
					class="hover:cursor-pointer hover:text-amber-600 w-full text-right mb-6">Recover
					Password</span>
				<button @click.prevent="loginUser" class="btn mb-9 bg-primary hover:bg-purple-500 text-black border-none">
					<span v-if="loading" class="loading loading-ring loading-sm text-white"></span>
					<span v-else>Sign In</span>
				</button>
			</div>
		</form>

		<dialog id="my_modal_23" class="modal">
			<form method="dialog" class="modal-box text-white w-fit outline-4 outline-neutral-700 outline">
				<p class="">Response:</p>
				<h3 class="font-semibold text-2xl">Contact the IT Head.</h3>
			</form>
			<form method="dialog" class="modal-backdrop bg-black bg-opacity-70">
				<button>close</button>
			</form>
		</dialog>
	</div>
</template>

<script setup lang="ts">
import { required, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useTitle } from '@vueuse/core';
import { useAppStore } from '@/store/app';

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


		let { data } = await $SB.from('restricted_users').select('*')
		if (data?.some(USER => USER.user_id == useSupabaseUser().value?.id)) {
			await $SB.auth.signOut()
			alert('Bad Login')
			return useAppStore().$patch({ restricted_user: true })
		} else {
			useAppStore().$patch({ restricted_user: false })
		}


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