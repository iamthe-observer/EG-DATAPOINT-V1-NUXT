<template>
	<div class="bg-neutral-900 h-full p-3 relative">
		<h1 :class="mini ? 'flex items-center justify-center pb-8' : 'flex items-center justify-between'">
			<span v-if="!mini" class="['font-bold text-2xl']"> {{ profile?.username ?
				profile?.username :
				'User' }}
			</span>
			<span class="w-3 h-3 rounded-full bg-green-500 border border-white"></span>
		</h1>
		<p :class="mini ? 'flex items-center justify-center pb-10' : 'flex items-center justify-between'">
			<span v-if="!mini" class="text-xs mb-10 text-neutral-700">EG-Datapoint ©</span>
			<span class="text-xs text-white uppercase font-bold cursor-pointer hover:text-primary"
				@click="useAppStore().$patch({ if_minimize: !useAppStore().if_minimize })">{{ mini ? 'maximize' :
					'minimize' }}</span>
		</p>


		<!-- navigation links -->
		<NavLinks />


		<div
			:class="mini ? 'absolute bottom-0 left-0 w-full p-2 px-4 flex justify-center items-center' : 'absolute bottom-0 left-0 w-full p-2 px-4 flex justify-between items-center'">
			<span v-if="!mini" class="text-sm">{{ profile?.fullname ?
				profile?.fullname :
				'User' }}</span>

			<div @click="handleLogout" class="w-8 group tooltip tooltip-top tooltip-error" data-tip="Logout">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path class="group-hover:fill-red-500" fill="currentColor"
						d="M12 18.25a.75.75 0 0 0 0 1.5h6A1.75 1.75 0 0 0 19.75 18V6A1.75 1.75 0 0 0 18 4.25h-6a.75.75 0 0 0 0 1.5h6a.25.25 0 0 1 .25.25v12a.25.25 0 0 1-.25.25h-6Z" />
					<path class="group-hover:fill-red-500" fill="currentColor" fill-rule="evenodd"
						d="M14.503 14.365c.69 0 1.25-.56 1.25-1.25v-2.24c0-.69-.56-1.25-1.25-1.25H9.89a26.723 26.723 0 0 0-.02-.22l-.054-.556a1.227 1.227 0 0 0-1.751-.988a15.059 15.059 0 0 0-4.368 3.163l-.099.104a1.253 1.253 0 0 0 0 1.734l.1.103a15.06 15.06 0 0 0 4.367 3.164a1.227 1.227 0 0 0 1.751-.988l.054-.556l.02-.22h4.613Zm-5.308-1.5a.75.75 0 0 0-.748.704c-.019.29-.042.581-.07.871l-.016.162a13.562 13.562 0 0 1-3.516-2.607a13.558 13.558 0 0 1 3.516-2.607l.016.162c.028.29.051.58.07.871a.75.75 0 0 0 .748.704h5.058v1.74H9.195Z"
						clip-rule="evenodd" />
				</svg>
			</div>

		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useProfileStore } from '@/store/profile'
import { useTasksStore } from '@/store/tasks';
import { useAppStore } from '@/store/app';
import { useAnnStore } from '@/store/announce';
import { useRequestStore } from '@/store/requests';
import { useSearchStore } from '@/store/search';
import { useImageStore } from '@/store/images';
import { useAplStore } from '@/store/apl';
const { profile } = storeToRefs(useProfileStore())
const { if_minimize: mini } = storeToRefs(useAppStore())
const { $router, $SB } = useNuxtApp()
const logout_loading = ref(false)

async function handleLogout() {
	logout_loading.value = true
	try {
		let { error } = await $SB.auth.signOut()
		if (error) throw error
		$router.push('/')
		useTasksStore().reset()
		useProfileStore().reset()
		useAppStore().reset()
		useAnnStore().reset()
		useRequestStore().reset()
		useSearchStore().resetRecentSearch()
		useImageStore().resetFiles()
		useAplStore().resetAplData()
		logout_loading.value = false
	} catch (error: any) {
		console.log(error);
		logout_loading.value = false
	}
	finally {
		logout_loading.value = false
	}
}

</script>