<template>
	<div class="__apl_received_time col-span-6 row-span-7 p-2">

		<div v-dragscroll class="stats shadow w-full h-full bg-neutral-800 scrollbar-hidden select-none">
			<div class="stat">
				<div class="stat-figure text-primary">
					<svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-12 aspect-square stroke-primary"
						viewBox="0 0 24 24">
						<g fill="none" stroke="#7e22ce" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
							<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
							<path
								d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2zm5 6h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3H10m2 0v1m0-8v1" />
						</g>
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

					<svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-12 aspect-square stroke-primary"
						viewBox="0 0 24 24">
						<g fill="none" stroke="#eebe3e" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round"
								d="m16.719 19.752l-.64-5.124A3 3 0 0 0 13.101 12h-2.204a3 3 0 0 0-2.976 2.628l-.641 5.124A2 2 0 0 0 9.266 22h5.468a2 2 0 0 0 1.985-2.248Z" />
							<circle cx="12" cy="5" r="3" />
							<circle cx="4" cy="9" r="2" />
							<circle cx="20" cy="9" r="2" />
							<path stroke-linecap="round" stroke-linejoin="round"
								d="M4 14h-.306a2 2 0 0 0-1.973 1.671l-.333 2A2 2 0 0 0 3.361 20H7m13-6h.306a2 2 0 0 1 1.973 1.671l.333 2A2 2 0 0 1 20.639 20H17" />
						</g>
					</svg>

				</div>
				<div class="stat-title">Total Single Applicants</div>
				<div class="stat-value text-secondary">{{ all_my_apls.filter(apl => apl.pmarital_status == 'UNMARRIED' &&
					apl.children_number == 0).length }} Applicant{{ all_my_apls.filter(apl => apl.pmarital_status == 'UNMARRIED' &&
		apl.children_number == 0).length > 1 ? 's' : '' }}</div>
				<div class="stat-desc">{{ all_my_apls.filter(apl => apl.pmarital_status == 'MARRIED' &&
					apl.children_number == 0).length }} Applicants with spouses</div>
				<div class="stat-desc">{{ all_my_apls.filter(apl => apl.pmarital_status == 'MARRIED' ||
					apl.children_number > 0).length }} Applicants with families</div>
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
	if (total_daily_applicants.value.length > 0) {
		return total_daily_applicants.value.filter(x => {
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
		} else if (total_daily_sales.value == yesterday_sales.value) {
			return 100
		}
	}
})

</script>
