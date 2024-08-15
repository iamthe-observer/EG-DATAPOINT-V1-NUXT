<template>
	<div class="w-full h-full col-span-6 row-span-7 p-2">

		<div v-if="!role"
			class="stats dark:bg-neutral-50 dark:border-none bg-neutral-800 w-full h-full overflow-x-hidden dark shadow-xl">
			<div class="stat">
				<div :class="['stat-figure', dark_mode ? 'text-accent' : 'text-secondary']">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
						class="inline-block w-8 h-8 stroke-current">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
					</svg>
				</div>
				<div :class="['stat-title font-semibold', dark_mode ? 'text-neutral-500' : 'text-neutral-700']">Today's
					Sales
				</div>
				<div
					:class="[dark_mode ? 'text-neutral-500' : 'text-neutral-400', 'stat-value flex items-center gap-1']">
					<SvgsCedis :classer="`w-5 fill-neutral-500`" />
					<span @dblclick="showPrice" v-if="show_price" class="text-3xl">{{ today_sales }}.00</span>
					<span @dblclick="showPrice" v-else class="flex">
						<svg v-for="i in 4" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
							viewBox="0 0 24 24">
							<path fill="currentColor"
								d="M9.075 16.25L12 14.475l2.925 1.775l-.775-3.325l2.6-2.25l-3.425-.275L12 7.25l-1.325 3.15l-3.425.275l2.6 2.25zM12 23.3L8.65 20H4v-4.65L.7 12L4 8.65V4h4.65L12 .7L15.35 4H20v4.65L23.3 12L20 15.35V20h-4.65zm0-2.8l2.5-2.5H18v-3.5l2.5-2.5L18 9.5V6h-3.5L12 3.5L9.5 6H6v3.5L3.5 12L6 14.5V18h3.5zm0-8.5" />
						</svg>
					</span>
				</div>
				<div class="flex w-full text-sm stat-desc drop-shadow-lg">
					<span :class="[dark_mode ? 'text-primary' : 'text-secondary', 'whitespace-pre-wrap']">{{
						perc_compared_to_yesterday_admin }}</span>
				</div>
			</div>
		</div>

		<!-- admin -->
		<div v-if="role"
			class="stats dark:bg-neutral-50 dark:border-none bg-neutral-800 w-full h-full overflow-x-hidden dark shadow-xl">
			<div class="stat">
				<div :class="['stat-figure', dark_mode ? 'text-accent' : 'text-secondary']">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
						class="inline-block w-8 h-8 stroke-current">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
					</svg>
				</div>
				<div :class="['stat-title font-semibold', dark_mode ? 'text-neutral-500' : 'text-neutral-700']">Today's
					Sales
				</div>
				<div
					:class="[dark_mode ? 'text-neutral-500' : 'text-neutral-400', 'stat-value flex items-center gap-1']">
					<SvgsCedis :classer="`w-5 fill-neutral-500`" />
					<span @dblclick="showPrice" v-if="show_price" class="text-3xl">{{ today_sales_admin
						}}.00</span>
					<span @dblclick="showPrice" v-else class="flex">
						<svg v-for="i in 4" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
							viewBox="0 0 24 24">
							<path fill="currentColor"
								d="M9.075 16.25L12 14.475l2.925 1.775l-.775-3.325l2.6-2.25l-3.425-.275L12 7.25l-1.325 3.15l-3.425.275l2.6 2.25zM12 23.3L8.65 20H4v-4.65L.7 12L4 8.65V4h4.65L12 .7L15.35 4H20v4.65L23.3 12L20 15.35V20h-4.65zm0-2.8l2.5-2.5H18v-3.5l2.5-2.5L18 9.5V6h-3.5L12 3.5L9.5 6H6v3.5L3.5 12L6 14.5V18h3.5zm0-8.5" />
						</svg>
					</span>
				</div>
				<div class="flex w-full text-sm stat-desc drop-shadow-lg">
					<span :class="[dark_mode ? 'text-primary' : 'text-secondary', 'whitespace-pre-wrap']">{{
						perc_compared_to_yesterday_admin }}</span>
				</div>
			</div>

		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app'
import { useProfileStore } from '@/store/profile';

const { dark_mode, today_sales, today_sales_admin, perc_compared_to_yesterday_admin, } = storeToRefs(useAppStore())
const { role } = storeToRefs(useProfileStore())
const show_price = ref(false);

function showPrice() {
	show_price.value = !show_price.value
	setTimeout(() => {
		show_price.value = false
	}, 3000)
}
</script>

<style scoped></style>