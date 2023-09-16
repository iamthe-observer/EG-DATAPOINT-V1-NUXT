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
				<textInput :no_uppercase="true" :bg="'neutral-50'" v-model="email_" :placeholder="'Enter username / email'"
					:icon="true">
					<template #login>
						<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
							<path fill="currentColor"
								d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12v1.45q0 1.475-1.012 2.513T18.5 17q-.875 0-1.65-.375t-1.3-1.075q-.725.725-1.638 1.088T12 17q-2.075 0-3.538-1.463T7 12q0-2.075 1.463-3.538T12 7q2.075 0 3.538 1.463T17 12v1.45q0 .65.425 1.1T18.5 15q.65 0 1.075-.45t.425-1.1V12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20h4q.425 0 .713.288T17 21q0 .425-.288.713T16 22h-4Zm0-7q1.25 0 2.125-.875T15 12q0-1.25-.875-2.125T12 9q-1.25 0-2.125.875T9 12q0 1.25.875 2.125T12 15Z" />
						</svg>
					</template>
				</textInput>

				<textInput :type="seen ? 'text' : 'password'" @focusin="() => { seen = false }" :no_uppercase="true"
					:bg="'neutral-50'" v-model="password" :placeholder="'Password'" :icon="true" class="mb-2">
					<template #login>
						<svg v-if="!seen" @click="seen = !seen" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em"
							viewBox="0 0 24 24">
							<path fill="currentColor"
								d="M12 16q1.875 0 3.188-1.313T16.5 11.5q0-1.875-1.313-3.188T12 7q-1.875 0-3.188 1.313T7.5 11.5q0 1.875 1.313 3.188T12 16Zm0-1.8q-1.125 0-1.913-.788T9.3 11.5q0-1.125.788-1.913T12 8.8q1.125 0 1.913.788T14.7 11.5q0 1.125-.787 1.913T12 14.2Zm0 4.8q-3.475 0-6.35-1.838T1.3 12.2q-.075-.125-.1-.312t-.025-.388q0-.2.025-.388t.1-.312q1.475-3.125 4.35-4.963T12 4q3.475 0 6.35 1.838T22.7 10.8q.075.125.1.313t.025.387q0 .2-.025.388t-.1.312q-1.475 3.125-4.35 4.963T12 19Zm0-7.5Zm0 5.5q2.825 0 5.188-1.488T20.8 11.5q-1.25-2.525-3.613-4.013T12 6Q9.175 6 6.812 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17Z" />
						</svg>

						<svg v-else @click="seen = !seen" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em"
							viewBox="0 0 24 24">
							<path fill="currentColor"
								d="m16.1 13.3l-1.45-1.45q.225-1.175-.675-2.2t-2.325-.8L10.2 7.4q.425-.2.863-.3T12 7q1.875 0 3.188 1.313T16.5 11.5q0 .5-.1.938t-.3.862Zm3.2 3.15l-1.45-1.4q.95-.725 1.688-1.587T20.8 11.5q-1.25-2.525-3.588-4.013T12 6q-.725 0-1.425.1T9.2 6.4L7.65 4.85q1.025-.425 2.1-.638T12 4q3.575 0 6.425 1.887T22.7 10.8q.075.125.1.313t.025.387q0 .2-.037.388t-.088.312q-.575 1.275-1.437 2.35t-1.963 1.9Zm-.2 5.45l-3.5-3.45q-.875.275-1.762.413T12 19q-3.575 0-6.425-1.888T1.3 12.2q-.075-.125-.1-.312t-.025-.388q0-.2.025-.375t.1-.3Q1.825 9.7 2.55 8.75T4.15 7L2.075 4.9Q1.8 4.625 1.8 4.212t.3-.712q.275-.275.7-.275t.7.275l17 17q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275ZM5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.588 4.013T12 17q.5 0 .975-.063t.975-.137l-.9-.95q-.275.075-.525.113T12 16q-1.875 0-3.188-1.312T7.5 11.5q0-.275.038-.525t.112-.525L5.55 8.4Zm7.975 2.325ZM9.75 12.6Z" />
						</svg>
					</template>
				</textInput>

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
const seen = ref(false)
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
		return
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