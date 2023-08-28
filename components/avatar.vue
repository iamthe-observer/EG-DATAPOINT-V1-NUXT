<template>
	<section class="__avatar w-full max-h-full p-2 flex flex-col items-center gap-1">
		<div class="avatar">
			<div
				class="w-20 rounded-xl flex justify-center items-center hover:bg-black group hover:bg-opacity-25 cursor-pointer transition-all duration-300 ease-out">
				<svg v-if="!role" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path fill="#888888"
						class="group-hover:fill-white transition-all duration-300 ease-out group-hover:drop-shadow-lg"
						d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 16H7v-.24C8.42 17.62 10.16 17 12 17s3.58.62 5 1.76V19zm2-1.14C17.2 16.09 14.73 15 12 15s-5.2 1.09-7 2.86V5h14v12.86zM12 13c1.93 0 3.5-1.57 3.5-3.5S13.93 6 12 6S8.5 7.57 8.5 9.5S10.07 13 12 13zm0-5c.83 0 1.5.67 1.5 1.5S12.83 11 12 11s-1.5-.67-1.5-1.5S11.17 8 12 8z" />
				</svg>
				<svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path class="group-hover:fill-white transition-all duration-300 ease-out group-hover:drop-shadow-lg"
						fill="#888888"
						d="M12 23C6.443 21.765 2 16.522 2 11V5l10-4l10 4v6c0 5.524-4.443 10.765-10 12ZM4 6v5a10.58 10.58 0 0 0 8 10a10.58 10.58 0 0 0 8-10V6l-8-3Z" />
					<circle cx="12" cy="8.5" r="2.5"
						class="group-hover:fill-white transition-all duration-300 ease-out group-hover:drop-shadow-lg"
						fill="#888888" />
					<path class="group-hover:fill-white transition-all duration-300 ease-out group-hover:drop-shadow-lg"
						fill="#888888"
						d="M7 15a5.782 5.782 0 0 0 5 3a5.782 5.782 0 0 0 5-3c-.025-1.896-3.342-3-5-3c-1.667 0-4.975 1.104-5 3Z" />
				</svg>
			</div>
		</div>
		<div v-if="username" class="__username text-sm px-1">{{ username || 'User' }}</div>
		<div v-if="role"
			class="__username text-[.6rem] bg-red-600 dark:bg-red-400 dark:text-white dark:outline dark:outline-1 dark:outline-red-200 px-2 rounded-full outline-1 outline-white outline">
			{{ role
				?
				'ADMIN' :
				'' }}</div>
	</section>
</template>

<script setup lang="ts">
import { useProfileStore } from '@/store/profile';
import { storeToRefs } from 'pinia';

const { role } = storeToRefs(useProfileStore())

const props = defineProps<{
	username: string | undefined
	role?: boolean
	url?: string
}>()

const src = ref()

onMounted(async () => {
	try {
		let { data, error } = await useNuxtApp().$SB.storage.from('applicants').createSignedUrls([props.url!], 10)
		if (error) throw error

		src.value = data![0].signedUrl
		// console.log(data);

	} catch (error) {
		console.log(error);
	}
})
</script>