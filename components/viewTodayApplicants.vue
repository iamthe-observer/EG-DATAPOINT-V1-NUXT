<template>
	<h1 class="w-full text-left font-bold text-3xl pb-8">Total Daily Applicants</h1>
	<div class="grid grid-cols-3 gap-4 rounded-xl w-full overflow-y-auto" id="style-1">

		<div @click="() => {
			useViewAplStore().$patch({
				APL_ID: apl.apl_id
			});
			$router.push(`/applicant/${apl.apl_id}`)
		}" v-for="(apl, i) in useNuxtApp().$sortByRecency(total_daily_applicants)" class="flex gap-2">
			<div class="avatar">
				<div class="w-24 rounded-xl">
					<img v-if="daily_urls?.length! > 0"
						:src="daily_urls![i].signedUrl !== null ? daily_urls![i].signedUrl : '/svg/image.svg'" />
				</div>
			</div>

			<div class="flex flex-col items-start">
				<span class="text-left font-bold text-xl">{{ apl.fullName }}</span>
				<span class="text-left">{{ useNuxtApp().$formatDateWords(new Date(apl.created_at!)) }}</span>
				<span class="text-left">GHC {{ apl.totalPayment }}.00</span>
			</div>
		</div>

	</div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'
import { useViewAplStore } from '@/store/viewApl';

const { total_daily_applicants, daily_urls } = storeToRefs(useAppStore())
</script>

<style scoped></style>