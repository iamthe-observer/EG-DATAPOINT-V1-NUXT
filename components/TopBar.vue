<template>
	<div class="w-full h-16 text-black bg-white flex justify-between border-black border-2">
		<section class="w-fit p-2 px-10 grid place-items-center border-e-2 border-black bg-secondary">
			<span class="text-2xl font-bold uppercase">EG Datapoint</span>
		</section>

		<section class="flex items-center px-3">
			<!-- search bar -->
			<div class="flex items-center border-2 mr-10 border-black px-4 gap-2">
				<SvgsSearch classer="w-5 h-5" />
				<input type="text" class="w-[300px] font-semibold h-10 focus:outline-none" placeholder="Search Here">
			</div>

			<!-- notification bell -->
			<div class="mx-5">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-7 aspect-square" viewBox="0 0 256 256">
					<path fill="currentColor"
						d="M221.8 175.94c-5.55-9.56-13.8-36.61-13.8-71.94a80 80 0 1 0-160 0c0 35.34-8.26 62.38-13.81 71.94A16 16 0 0 0 48 200h40.81a40 40 0 0 0 78.38 0H208a16 16 0 0 0 13.8-24.06ZM128 216a24 24 0 0 1-22.62-16h45.24A24 24 0 0 1 128 216Zm-80-32c7.7-13.24 16-43.92 16-80a64 64 0 1 1 128 0c0 36.05 8.28 66.73 16 80Z" />
				</svg>
			</div>

			<!-- profile Photo and logout menu -->
			<div class="flex items-center">

				<div class="w-10 aspect-square border-black border-2 rounded-full">

				</div>

				<div class="dropdown dropdown-end w-fit">
					<label tabindex="0" class="">
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256">
							<path fill="currentColor" fill-rule="evenodd"
								d="M72.158 119.649c-11.578-11.362-2.954-31.242 12.729-31.005c15.682.238 71.904.238 87.357.238c15.453 0 23.578 19.299 12.17 30.815c-2.119 2.14-4.694 4.746-7.524 7.612c-12.403 12.561-29.725 30.102-35.25 35.125c-6.786 6.17-18.794 7.154-26.124-.31c-4.841-4.929-17.145-16.914-28.28-27.759c-5.727-5.579-11.145-10.856-15.078-14.716zm14.225-13.763c-2.214-.011-2.735 1.24-1.173 2.794l40.888 40.324c1.555 1.547 2.705 1.547 4.283 0l39.596-39.868c1.578-1.548 1.065-2.812-1.145-2.823l-82.449-.427z"
								clip-rule="evenodd" />
						</svg>
					</label>

					<ul tabindex="0"
						class="dropdown-content z-[1] menu p-2 shadow bg-white rounded-none w-52 border-2 border-black">
						<li class="">
							<div class="cursor-text flex justify-between items-center">
								{{ profile?.username || 'User' }}
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
									<circle cx="26" cy="16" r="4" fill="#009900" />
									<path fill="#888888"
										d="M22 30h-2v-5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5H2v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7zM12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7z" />
								</svg>
							</div>
						</li>
						<li @click="handleLogout" class="bg-error rounded-none shadow-xl text-white">
							<a v-if="!logout_loading">Logout</a>
							<span v-else class="loading loading-infinity loading-xs mx-auto"></span>
						</li>
					</ul>
				</div>
			</div>

		</section>
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

<style scoped></style>