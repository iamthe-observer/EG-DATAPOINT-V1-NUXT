<template>
	<div class="w-full h-full col-span-6 row-span-7 p-2">

		<div v-if="!role"
			class="stats dark:bg-neutral-50 dark:border-none bg-neutral-800 w-full h-full overflow-x-hidden dark shadow-xl">
			<div class="stat">
				<div class="stat-figure text-secondary dark:text-accent">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
						class="inline-block w-8 h-8 stroke-current">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
					</svg>
				</div>
				<div class="stat-title font-semibold">Today's Sales</div>
				<div class="stat-value text-neutral-300 flex items-center gap-1">
					<SvgsCedis :classer="`w-5 fill-neutral-500`" />{{ today_sales }}.00
				</div>
				<div class="flex w-full text-primary text-sm stat-desc drop-shadow-lg"><span class="">{{
					perc_compared_to_yesterday }}</span>
				</div>
			</div>
		</div>

		<!-- admin -->
		<div v-if="role"
			class="stats dark:bg-neutral-50 dark:border-none bg-neutral-800 w-full h-full overflow-x-hidden dark shadow-xl">
			<div class="stat">
				<div class="stat-figure text-secondary dark:text-accent">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
						class="inline-block w-8 h-8 stroke-current">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
					</svg>
				</div>
				<div class="stat-title text-neutral-50 font-semibold">Today's Sales</div>
				<div class="stat-value text-neutral-300 flex items-center gap-1">
					<SvgsCedis :classer="`w-5 fill-neutral-500`" />{{ today_sales_admin }}.00
				</div>
				<div class="flex w-full stat-desc"><span class="whitespace-pre-wrap">{{ perc_compared_to_yesterday_admin }}</span>
				</div>
			</div>

		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app'
import { useProfileStore } from '@/store/profile';

const { today_sales, today_sales_admin, perc_compared_to_yesterday, perc_compared_to_yesterday_admin } = storeToRefs(useAppStore())
const { role } = storeToRefs(useProfileStore())
</script>

<style scoped></style>