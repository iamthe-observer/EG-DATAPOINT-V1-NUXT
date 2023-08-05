<template>
	<div
		class="w-full h-full dark:bg-neutral-50 dark:shadow-2xl bg-neutral-800 p-0 rounded-xl gap-5 flex flex-col justify-between">
		<div class="dropdown dropdown-right">
			<label tabindex="0" class="">
				<Avatar :username="profile?.username!" :role="profile?.role!" :url="profile?.avatar_url" />
			</label>
			<ul tabindex="0"
				class="dropdown-content menu p-2 shadow bg-base-100 border-2 border-neutral-900 rounded-box w-52 z-[500]">
				<li class="">
					<div data-tip="Change Profile Picture" class="tooltip flex justify-between items-center">
						{{ profile?.username || 'User' }}
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
							<circle cx="26" cy="16" r="4" fill="#009900" />
							<path fill="#888888"
								d="M22 30h-2v-5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5H2v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7zM12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7z" />
						</svg>
					</div>
				</li>
				<li @click="handleLogout" class="bg-error rounded-lg shadow-xl"><a v-if="!logout_loading">Log out</a><span v-else
						class="loading loading-infinity loading-xs mx-auto"></span></li>
			</ul>
		</div>
		<nav-links />
		<lightmode-toggle />
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