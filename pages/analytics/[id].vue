<template>
	<div class="w-full h-full rounded-2xl overflow-y-auto" id="style-2">
		<div
			class="w-full min-h-full rounded-s-2xl bg-neutral-800 dark:bg-neutral-50 dark:shadow-xl col-span-full row-span-full p-3 overflow-y-auto text-justify relative flex flex-col gap-5"
			id="style-1">


			<h1 class="w-full flex justify-between items-center">
				<span class="font-bold text-3xl">Overview: {{ profiles.find(user => user.id == id)?.fullname }} ({{
					total_daily_applicants.length }})</span>


				<DatePicker dark :color="'purple'" is-dark v-model="date" mode="date">
					<template #default="{ togglePopover }">
						<span @click="togglePopover"
							class="text-2xl font-bold px-2 py-1 dark:hover:bg-neutral-300 hover:text-accent hover:bg-neutral-900 rounded-xl transition-all duration-200 ease-in-out cursor-pointer">{{
								$formatDateWords(date) }}</span>
					</template>
				</DatePicker>




				<span class="font-bold text-3xl">GHC {{ today_daily_sales }}.00</span>
			</h1>

			<div class="grid grid-cols-3 gap-3 bg-neutral-900 dark:bg-neutral-100 dark:text-white rounded-xl p-2">
				<div
					class="bg-neutral-700 dark:border-2 dark:border-neutral-400 dark:bg-white dark:hover:bg-neutral-100 hover:bg-neutral-800 dark:shadow-xl p-2 text-white cursor-pointer dark:text-black text-center font-bold rounded-lg flex justify-between px-2"
					@click="() => {
						useViewAplStore().setID(apl.apl_id!)
						$router.push(`/applicant/${apl.apl_id}`)
					}" v-for="apl in total_daily_applicants">
					<span class="flex-1 truncate trucate- text-ellipsis text-left">{{ apl.fullName }}</span>
					<span class="">GHC {{ apl.totalPayment }}.00</span>
				</div>
			</div>

			<section class="grid grid-col-2">
				<div class="col-span-full rounded-xl shadow-xl bg-neutral-900 dark:bg-neutral-50 p-2">
					<BarChart :chartData="barData" :options="barOptions" />
				</div>
			</section>


			<div class="grid grid-cols-2 gap-3">
				<div
					class="flex flex-col justify-center items-center bg-neutral-900 dark:bg-primary dark:text-white rounded-xl py-5">
					<h1 class="dark:text-purple-400 text-neutral-500">Total Applicants</h1>
					<span class="text-4xl font-bold"> {{ total_applicants.length }}</span>
				</div>
				<div
					class="flex flex-col justify-center items-center bg-neutral-900 dark:bg-primary dark:text-white rounded-xl py-5">
					<h1 class="dark:text-purple-400 text-neutral-500">Total Sales</h1>
					<span class="text-4xl font-bold">GHC {{ total_sales }}.00</span>
				</div>
			</div>

		</div>
	</div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app';
import { useProfileStore } from '@/store/profile';
import { useViewAplStore } from '@/store/viewApl';
import { storeToRefs } from 'pinia';
import { BarChart } from 'vue-chart-3';
import { ChartData, ChartOptions } from 'chart.js';

const { total_apls } = storeToRefs(useAppStore())
const { profiles } = storeToRefs(useProfileStore())
const { USER_ID: id } = storeToRefs(useViewAplStore())
const user = computed(() => profiles.value.find(user => user.id == id.value))
const date = ref(new Date())

const barOptions = ref<ChartOptions<'bar'>>({
	responsive: true,
	plugins: {
		legend: {
			display: false,
			position: 'bottom'
		},
		title: {
			display: true,
			text: `Total Sales for ${user.value?.fullname} in a week from Today`,
		},
		tooltip: {
			enabled: true
		},
	},
});

const barData = computed<ChartData<'bar'>>(() => {
	return {
		labels: getDaysArrayWithTodayAtEnd(),
		datasets: [
			{
				label: 'Sales',
				type: 'bar',
				borderRadius: 10,
				data: pastWeekSales.value,
				// data: [{ x: 'Sales', y: 20 }, { x: 'Revenue', y: 10 }],
				backgroundColor: bgClrs.value,
			},
		],
	}
})

const bgClrs = ref(
	[
		'#313866',
		'#504099',
		'#974EC3',
		'#FE7BE5',
	]
)

function getDaysArrayWithTodayAtEnd() {
	const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const todayIndex = new Date().getDay(); // Get the index of today's day (0-6)

	const daysArray = [];

	for (let i = 1; i < 7; i++) {
		daysArray.push(daysOfWeek[(todayIndex + i) % 7]);
	}

	daysArray.push(daysOfWeek[todayIndex]); // Today is at the end

	return daysArray;
}

function getTotalPaymentByDay(num: number) {
	const today = new Date();
	const numDaysAgo = new Date(today);
	numDaysAgo.setDate(today.getDate() - num);

	let totalPayments = total_applicants.value.filter(apl => useNuxtApp().$formatDate(new Date(apl.created_at!)) == useNuxtApp().$formatDate(numDaysAgo)).map(apl => apl.totalPayment)

	let sum = 0
	for (let ii = 0; ii < totalPayments.length; ii++) {
		const payment = totalPayments[ii];
		if (!isNaN(payment)) sum += payment
	}

	return sum
}

const pastWeekSales = computed(() => {
	let arr = [6, 5, 4, 3, 2, 1, 0]
	let sales = []
	for (let idx = 0; idx < arr.length; idx++) {
		let day_idx = arr[idx];
		let amount = getTotalPaymentByDay(day_idx)
		sales.push(amount)
	}

	return sales
})

const total_daily_applicants = computed(() => {
	return total_apls.value.filter(apl => apl.user_id == id.value).filter(apl => useNuxtApp().$formatDate(date.value) == useNuxtApp().$formatDate(new Date(apl.created_at!)))
});
const total_applicants = computed(() => {
	return total_apls.value.filter(apl => apl.user_id == id.value)
});




const today_daily_sales = computed(() => {
	if (total_daily_applicants.value.length > 0) {
		let sum = 0;
		for (let i = 0; i < total_daily_applicants.value!.length; i++) {
			const payment = total_daily_applicants.value![i].totalPayment;
			if (!isNaN(payment)) {
				sum += payment;
			}
		}
		return sum;
	} else {
		return 0;
	}
});
const total_sales = computed(() => {
	if (total_applicants.value.length > 0) {
		let sum = 0;
		for (let i = 0; i < total_applicants.value!.length; i++) {
			const payment = total_applicants.value![i].totalPayment;
			if (!isNaN(payment)) {
				sum += payment;
			}
		}
		return sum;
	} else {
		return 0;
	}
});
</script>

<style scoped></style>