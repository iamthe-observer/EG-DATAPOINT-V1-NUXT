<template>
	<section ref="svg" class="__navs w-full flex-1 flex flex-col gap-8 items-center justify-center">
		<NuxtLink to="/dashboard" class="__icons_container tooltip tooltip-primary z-20 tooltip-right" data-tip="Dashboard">
			<SvgsHome v-if="!dark_mode" class="__icons" />
			<SvgsHomeDark v-else class="__icons" />
		</NuxtLink>
		<NuxtLink to="/newApl" class="__icons_container tooltip tooltip-primary z-20 tooltip-right" data-tip="Add Applicant">
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
		</NuxtLink>
	</section>
</template>

<script setup lang="ts">
import { useProfileStore } from '@/store/profile'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'

const { role } = storeToRefs(useProfileStore())
const { dark_mode } = storeToRefs(useAppStore())
</script>

<style scoped>
.__icons {
	width: 100%;
	height: 100%;
	aspect-ratio: square;
	;
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
