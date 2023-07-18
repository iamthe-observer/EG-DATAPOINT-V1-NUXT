<template>
	<div class="__apl_info col-span-6 row-span-8 flex flex-col gap-5 p-2">
		<div class="flex w-full h-full gap-5">
			<!-- total applicants -->
			<div class="containers total_applicants px-4 flex items-center justify-between w-full h-full">
				<p class="flex flex-col gap-2">
					<span class="text-sm">Total Applicants</span>
					<span class="text-2xl">{{ all_my_apls?.length }}</span>
					<span :class="`text-xs ${total_perc_inc >= 50 ? 'text-green-500' : 'text-red-500'} font-bold`">+{{
						total_perc_inc.toFixed(1) }}% Inc.</span>
				</p>
				<radial-progress :amount="Number(total_apl_perc.toFixed(1))" />
			</div>

			<!-- total daily applicants -->
			<div class="containers total_applicants px-4 flex items-center justify-between w-full h-full">
				<p class="flex flex-col gap-2">
					<span class="text-sm">Today's Applicants</span>
					<span class="text-2xl">{{ total_daily_applicants?.length }}</span>
					<span :class="`text-xs ${total_daily_inc >= 100 ? 'text-green-500' : 'text-red-500'} font-bold`">
						<span v-if="total_daily_inc < 100">-</span>
						<span v-if="total_daily_inc > 100">+</span>
						{{ total_daily_inc.toFixed(1) }}%
						<span v-if="total_daily_inc < 100">Dec.</span>
						<span v-if="total_daily_inc >= 100">Inc.</span>
					</span>
				</p>
				<radial-progress :amount="Number(total_daily_inc.toFixed(1))" />
			</div>
		</div>


		<div class="flex w-full h-full gap-5">
			<div class="containers total_applicants p-2 flex items-center justify-between w-full h-full">
				<p class="flex flex-col"><span class="">Total Applicants</span></p>
				<radial-progress :amount="all_my_apls?.length!" />
			</div>

			<div class="containers total_applicants p-2 flex items-center justify-between w-full h-full">
				<p class="flex flex-col"><span class="">Total Applicants</span></p>
				<radial-progress :amount="all_my_apls?.length!" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app';

const { all_my_apls, total_daily_applicants, total_apls } = storeToRefs(useAppStore())
const { $formatDate } = useNuxtApp()

const total_apl_perc = computed(() => {
	return ((all_my_apls.value.length / total_apls.value.length) * 100) || 0
})

const total_perc_inc = computed(() => {
	return ((total_daily_applicants.value.length / total_apls.value.length) * 100) || 0
})

const total_daily_inc = computed(() => {
	let yesterday_apls = all_my_apls.value.filter(apl => $formatDate(new Date(apl.created_at!)) === $formatDate(new Date(Date.now() - 86400000)))

	if (yesterday_apls.length == 0 || total_daily_applicants.value.length == 0) {
		return 0
	} else {
		return ((yesterday_apls.length / total_daily_applicants.value.length) * 100)
	}
})

const random1 = ref(Math.floor(Math.random() * 100))
const random2 = ref(Math.floor(Math.random() * 100))
const random3 = ref(Math.floor(Math.random() * 100))
</script>

<style scoped>
.containers {
	@apply rounded-xl bg-neutral-800;
}
</style>