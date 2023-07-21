<template>
	<div class="__apl_received_time col-span-6 row-span-7 p-2">

		<div class="stats shadow w-full h-full bg-neutral-800 scrollbar-hidden select-none">
			<div class="stat">
				<div class="stat-figure text-primary">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
						class="inline-block w-8 h-8 stroke-current">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
						</path>
					</svg>
				</div>
				<div class="stat-title">Total Daily Sales</div>
				<div class="stat-value text-primary flex items-center gap-1">
					<SvgsCedis class="w-5 aspect-square fill-primary" />{{ total_daily_sales }}.00
				</div>
				<div class="stat-desc">{{ daily_sales_perc?.toFixed(1) }}% more than yesterday's sales</div>
			</div>

			<div class="stat">
				<div class="stat-figure text-secondary">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
						class="inline-block w-8 h-8 stroke-current">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
					</svg>
				</div>
				<div class="stat-title">Total Single Applicants</div>
				<div class="stat-value text-secondary">{{ total_apls.filter(apl => apl.pmarital_status == 'UNMARRIED' &&
					apl.children_number == 0).length }} Applicant{{ total_apls.filter(apl => apl.pmarital_status == 'UNMARRIED' &&
		apl.children_number == 0).length > 1 ? 's' : '' }}</div>
				<div class="stat-desc">{{ total_apls.filter(apl => apl.pmarital_status == 'MARRIED' &&
					apl.children_number == 0).length }} Applicants with spouses</div>
			</div>

			<!-- <div class="stat">
				<div class="stat-figure text-secondary">
					<div class="avatar online">
						<div class="w-16 rounded-full">
							<img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
						</div>
					</div>
				</div>
				<div class="stat-value">86%</div>
				<div class="stat-title">Tasks done</div>
				<div class="stat-desc text-secondary">31 tasks remaining</div>
			</div> -->
		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app';

const { all_my_apls, total_daily_applicants, total_apls } = storeToRefs(useAppStore())

const total_daily_sales = computed(() => {
	if (all_my_apls.value.length > 0) {
		return all_my_apls.value.filter(x => {
			let date = new Date()
			if (date = new Date(x.created_at!)) {
				return x
			}
		}).map(x => { return x.totalPayment }).reduce((a, b) => a + b)
	} else {
		return 0
	}
})

const yesterday_sales = computed(() => {
	let yesterday_apls = all_my_apls.value.filter(apl => useNuxtApp().$formatDate(new Date(apl.created_at!)) === useNuxtApp().$formatDate(new Date(Date.now() - 86400000)))

	if (yesterday_apls.length > 0) {
		return yesterday_apls.map(x => { return x.totalPayment }).reduce((a, b) => a + b)
	} else {
		return 0
	}
})

const daily_sales_perc = computed(() => {
	if (total_daily_sales.value == 0 || yesterday_sales.value == 0) {
		return 0
	} else {
		if (total_daily_sales.value > yesterday_sales.value) {
			return (total_daily_sales.value / yesterday_sales.value) * 100
		} else if (total_daily_sales.value < yesterday_sales.value) {
			return (yesterday_sales.value / total_daily_sales.value) * 100
		} else if (total_daily_sales.value < yesterday_sales.value) {
			return 100
		}
	}
})

</script>
