<template>
	<section ref="svg" class="__navs w-full flex-1 flex flex-col">
		<header class="pb-1 text-white text-xs">Navigation</header>
		<NuxtLink to="/dashboard" class="hover:bg-primary rounded-sm flex gap-2 items-center p-2">
			<SvgsHome class="" />
			<span class="">Dashboard</span>
		</NuxtLink>
		<NuxtLink to="/newApplicant" class="hover:bg-primary rounded-sm flex gap-2 items-center p-2">
			<SvgsHome class="" />
			<span class="">New Applicant</span>
		</NuxtLink>
		<NuxtLink to="/viewApplicants" class="hover:bg-primary rounded-sm flex gap-2 items-center p-2">
			<SvgsHome class="" />
			<span class="">All Applicants</span>
		</NuxtLink>
		<NuxtLink to="/database" class="hover:bg-primary rounded-sm flex gap-2 items-center p-2">
			<SvgsHome class="" />
			<span class="">Database</span>
		</NuxtLink>
		<NuxtLink to="/dashboard" class="hover:bg-primary rounded-sm flex gap-2 items-center p-2">
			<SvgsHome class="" />
			<span class="">Requests</span>
		</NuxtLink>
		<NuxtLink to="/dashboard" class="hover:bg-primary rounded-sm flex gap-2 items-center p-2">
			<SvgsHome class="" />
			<span class="">Tasks</span>
		</NuxtLink>
		<NuxtLink to="/dashboard" class="hover:bg-primary rounded-sm flex gap-2 items-center p-2">
			<SvgsHome class="" />
			<span class="">Announcements</span>
		</NuxtLink>
		<NuxtLink v-if="role" to="/analytics" class="hover:bg-primary rounded-sm flex gap-2 items-center p-2">
			<SvgsHome class="" />
			<span class="">Analytics</span>
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
const { dark_mode, is_mobile } = storeToRefs(useAppStore())
</script>

<style scoped>
.__icons {
	width: 100%;
	height: 100%;
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
