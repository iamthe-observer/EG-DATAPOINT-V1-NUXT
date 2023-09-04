<template>
	<section ref="svg" class="__navs w-full flex-1 flex flex-col">
		<header v-if="!mini" class="pb-1 text-white text-xs">Navigation</header>
		<NuxtLink to="/dashboard"
			:class="['hover:bg-primary hover:text-black rounded-sm flex gap-2 items-center p-2', mini ? 'justify-center' : '']">
			<svg xmlns="http://www.w3.org/2000/svg" class="w-[30px]" viewBox="0 0 24 24">
				<g fill="none">
					<path fill-rule="evenodd" clip-rule="evenodd"
						d="M5 9a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5zm0 13a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5zm10 0a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4zm0-8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4z"
						fill="currentColor" />
				</g>
			</svg> <span v-if="!mini" class="">Dashboard</span>
		</NuxtLink>
		<NuxtLink to="/newApplicant"
			:class="['hover:bg-primary hover:text-black rounded-sm flex gap-2 items-center p-2', mini ? 'justify-center' : '']">
			<svg xmlns="http://www.w3.org/2000/svg" class="w-[30px]" viewBox="0 0 24 24">
				<circle cx="9" cy="8" r="4" fill="currentColor" />
				<path fill="currentColor"
					d="M9 14c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4zm11-4V7h-2v3h-3v2h3v3h2v-3h3v-2z" />
			</svg>
			<span v-if="!mini" class="">New Applicant</span>
		</NuxtLink>
		<NuxtLink to="/viewApplicants"
			:class="['hover:bg-primary hover:text-black rounded-sm flex gap-2 items-center p-2', mini ? 'justify-center' : '']">
			<svg xmlns="http://www.w3.org/2000/svg" class="w-[30px]" viewBox="0 0 24 24">
				<path fill="currentColor"
					d="M4 15.5q-.425 0-.713-.288T3 14.5V14q0-.425.288-.713T4 13h16q.425 0 .713.288T21 14v.5q0 .425-.288.713T20 15.5H4ZM4 11q-.425 0-.713-.288T3 10v-.5q0-.425.288-.713T4 8.5h16q.425 0 .713.288T21 9.5v.5q0 .425-.288.713T20 11H4Zm0-4.5q-.425 0-.713-.288T3 5.5V5q0-.425.288-.713T4 4h16q.425 0 .713.288T21 5v.5q0 .425-.288.713T20 6.5H4ZM4 20q-.425 0-.713-.288T3 19v-.5q0-.425.288-.713T4 17.5h16q.425 0 .713.288T21 18.5v.5q0 .425-.288.713T20 20H4Z" />
			</svg>
			<span v-if="!mini" class="">All Applicants</span>
		</NuxtLink>
		<!-- <NuxtLink to="/database" class="hover:bg-primary hover:text-black rounded-sm flex gap-2 items-center p-2">
			<SvgsHome class="" />
			<span class="">Database</span>
		</NuxtLink> -->
		<NuxtLink to="/requests"
			:class="['hover:bg-primary hover:text-black rounded-sm flex gap-2 items-center p-2', mini ? 'justify-center' : '']">
			<svg xmlns="http://www.w3.org/2000/svg" class="w-[30px]" viewBox="0 0 24 24">
				<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
					<path
						d="M4 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0M4 6a2 2 0 1 0 4 0a2 2 0 1 0-4 0m12 12a2 2 0 1 0 4 0a2 2 0 1 0-4 0M6 8v8" />
					<path d="M11 6h5a2 2 0 0 1 2 2v8" />
					<path d="m14 9l-3-3l3-3" />
				</g>
			</svg>
			<span v-if="!mini" class="">Requests</span>
		</NuxtLink>
		<!-- <NuxtLink to="/dashboard"
			:class="['hover:bg-primary hover:text-black rounded-sm flex gap-2 items-center p-2', mini ? 'justify-center' : '']">
			<svg xmlns="http://www.w3.org/2000/svg" class="w-[30px]" viewBox="0 0 36 36">
				<path fill="currentColor"
					d="M29.29 4.95h-7.2a4.31 4.31 0 0 0-8.17 0H7a1.75 1.75 0 0 0-2 1.69v25.62a1.7 1.7 0 0 0 1.71 1.69h22.58A1.7 1.7 0 0 0 31 32.26V6.64a1.7 1.7 0 0 0-1.71-1.69Zm-18 3a1 1 0 0 1 1-1h3.44v-.63a2.31 2.31 0 0 1 4.63 0V7h3.44a1 1 0 0 1 1 1v1.8H11.25Zm14.52 9.23l-9.12 9.12l-5.24-5.24a1.4 1.4 0 0 1 2-2l3.26 3.26l7.14-7.14a1.4 1.4 0 1 1 2 2Z"
					class="clr-i-solid clr-i-solid-path-1" />
				<path fill="none" d="M0 0h36v36H0z" />
			</svg> <span v-if="!mini" class="">Tasks</span>
		</NuxtLink> -->
		<NuxtLink to="/dashboard"
			:class="['hover:bg-primary hover:text-black rounded-sm flex gap-2 items-center p-2', mini ? 'justify-center' : '']">
			<svg xmlns="http://www.w3.org/2000/svg" class="w-[30px]" viewBox="0 0 24 24">
				<g fill="none" fill-rule="evenodd">
					<path
						d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
					<path fill="currentColor"
						d="M15.992 3.013C17.326 2.236 19 3.197 19 4.741V8a3 3 0 1 1 0 6v3c0 1.648-1.881 2.589-3.2 1.6l-2.06-1.546A8.658 8.658 0 0 0 10 15.446v2.844a2.71 2.71 0 0 1-5.316.744l-1.57-5.496a4.7 4.7 0 0 1 3.326-7.73l3.018-.168a9.344 9.344 0 0 0 4.19-1.259l2.344-1.368ZM5.634 15.078l.973 3.407A.71.71 0 0 0 8 18.29v-3.01l-1.56-.087a4.723 4.723 0 0 1-.806-.115ZM20 11a1 1 0 0 0-1-1v2a1 1 0 0 0 1-1Z" />
				</g>
			</svg> <span v-if="!mini" class="">Announcements</span>
		</NuxtLink>
		<NuxtLink v-if="role" to="/analytics"
			:class="['hover:bg-primary hover:text-black rounded-sm flex gap-2 items-center p-2', mini ? 'justify-center' : '']">
			<svg xmlns="http://www.w3.org/2000/svg" class="w-[30px]" viewBox="0 0 24 24">
				<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M3 5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm4 15h10m-8-4v4m6-4v4m-6-8V8m3 4v-1m3 1v-2m-3 2v-1" />
			</svg> <span v-if="!mini" class="">Analytics</span>
		</NuxtLink>
		<!-- <NuxtLink to="/newApplicant" class="__icons_container tooltip tooltip-primary z-20 tooltip-right"
			data-tip="Add Applicant">
			<SvgsContact v-if="!dark_mode" class="__icons" />
			<SvgsContactDark v-else class="__icons" />
		</NuxtLink>
		<NuxtLink :to="{ path: '/viewApplicants' }" class="__icons_container tooltip tooltip-primary z-20 tooltip-right"
			data-tip="View Applicants">
			<SvgsAplTable v-if="!dark_mode" class="__icons" />
			<SvgsAplTableDark v-else class="__icons" />
		</NuxtLink>
		<NuxtLink to="/database" class="__icons_container tooltip tooltip-primary z-20 tooltip-right" data-tip="Database">
			<SvgsDatabase v-if="!dark_mode" class="__icons" />
			<SvgsDatabaseDark v-else class="__icons" />
		</NuxtLink>
		<NuxtLink v-if="role" to="/analytics" class="__icons_container tooltip tooltip-primary z-20 tooltip-right"
			data-tip="Analytics">
			<SvgsAnalytics v-if="!dark_mode" class="__icons" />
			<SvgsAnalyticsDark v-else class="__icons" />
		</NuxtLink> -->
	</section>
</template>

<script setup lang="ts">
import { useProfileStore } from '@/store/profile'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'

const { role } = storeToRefs(useProfileStore())
const { dark_mode, is_mobile, if_minimize: mini } = storeToRefs(useAppStore())
</script>

<style scoped>
.__icons {
	max-width: 30px;
	aspect-ratio: square;
}

.__icons_container {
	width: 1.5rem;
	aspect-ratio: square;
	transition: all .3s ease-out;
}

.__icons_container:hover {
	transform: scale(120%);
}
</style>
