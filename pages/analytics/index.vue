<template>
	<!-- <div v-if="!view" class="w-full h-full rounded-2xl overflow-y-auto" id="style-2">
		<div
			class="w-full min-h-full rounded-s-2xl bg-neutral-800 dark:bg-neutral-50 dark:shadow-xl col-span-full row-span-full p-3 overflow-y-auto text-justify relative flex flex-col gap-5"
			id="style-1">

			<header classs="">
				<span @dblclick="view = !view" class="">Overview</span>
				loction
			</header>

			<div class="w-full grid grid-cols-4 gap-3">
				<span @click="() => {
					useViewAplStore().setUSER(user.id)
					$router.push(`/analytics/${user.id}_${user.fullname}`);
				}" class="px-2 py-1 rounded-full bg-white text-black font-bold cursor-pointer" v-for="user in normal_users">
					{{ user.fullname || 'User' }}
				</span>
				{{ total_daily_applicants_admin.filter(apl => apl.location == curr_location) }}
			</div>

		</div>
	</div> -->



	<div v-if="role" class="w-full h-full rounded-2xl overflow-y-auto" id="style-2">
		<div
			class="w-full min-h-full rounded-s-2xl bg-neutral-800 dark:bg-neutral-50 dark:shadow-xl col-span-full row-span-full p-3 overflow-y-auto text-justify relative flex flex-col gap-5"
			id="style-1">

			<div class="w-full flex items-center justify-between">
				<div class="flex gap-2 items-center">
					<span @dblclick="view = !view" :class="['font-bold', ISM ? 'text-xl' : 'text-3xl']">Overview</span>
				</div>

				<select v-model="curr_location"
					:class="['select rounded-full bg-[rgb(13,13,13)] dark:bg-neutral-50 dark:text-black', ISM ? 'select-xs w-32' : 'select-sm w-40']">
					<option selected value="all">All Locations</option>
					<option v-for="location in locations" :value="location">{{ location![0].toUpperCase() + location?.substring(1)
					}}</option>
				</select>
			</div>

			<section :class="['grid w-full gap-5', ISM ? 'grid-cols-1' : 'grid-cols-3']">
				<div
					class="flex justify-center items-center gap-3 p-5 flex-1 bg-neutral-900 dark:bg-purple-200 min-h-[8rem] rounded-xl shadow-xl">
					<div class="p-3 rounded-full bg-purple-600 bg-opacity-30 w-16 aspect-square"><svg
							xmlns="http://www.w3.org/2000/svg" class="w-full" viewBox="0 0 24 24">
							<path class="fill-purple-700"
								d="M12 22.575q-.2 0-.375-.062T11.3 22.3L9 20H5q-.825 0-1.413-.588T3 18V4q0-.825.588-1.413T5 2h14q.825 0 1.413.588T21 4v14q0 .825-.588 1.413T19 20h-4l-2.3 2.3q-.15.15-.325.213t-.375.062ZM12 12q1.45 0 2.475-1.025T15.5 8.5q0-1.45-1.025-2.475T12 5q-1.45 0-2.475 1.025T8.5 8.5q0 1.45 1.025 2.475T12 12Zm0 8.2l2.2-2.2H19v-1.15q-1.35-1.325-3.138-2.087T12 14q-2.075 0-3.863.763T5 16.85V18h4.8l2.2 2.2Z" />
						</svg></div>
					<p class="flex flex-col">
						<span class="text-xl font-bold">{{ curr_location == 'all' ? total_apls.length :
							total_apls.filter(apl => apl.location == curr_location).length }}</span>
						<span class="text-sm text-neutral-500 dark:text-neutral-800">Total Applicants</span>
					</p>
				</div>
				<!-- <div
					class="flex justify-center items-center gap-3 p-5 flex-1 bg-neutral-900 dark:bg-fuchsia-200 min-h-[8rem] rounded-xl shadow-xl">
					<div class="p-3 rounded-full bg-accent bg-opacity-30 w-16 aspect-square"><svg xmlns="http://www.w3.org/2000/svg"
							class="w-full" viewBox="0 0 24 24">
							<g class="fill-accent">
								<path
									d="M9.592 3.2a5.727 5.727 0 0 1-.495.399c-.298.2-.633.338-.985.408c-.153.03-.313.043-.632.068c-.801.064-1.202.096-1.536.214a2.713 2.713 0 0 0-1.655 1.655c-.118.334-.15.735-.214 1.536a5.707 5.707 0 0 1-.068.632c-.07.352-.208.687-.408.985c-.087.13-.191.252-.399.495c-.521.612-.782.918-.935 1.238c-.353.74-.353 1.6 0 2.34c.153.32.414.626.935 1.238c.208.243.312.365.399.495c.2.298.338.633.408.985c.03.153.043.313.068.632c.064.801.096 1.202.214 1.536a2.713 2.713 0 0 0 1.655 1.655c.334.118.735.15 1.536.214c.319.025.479.038.632.068c.352.07.687.209.985.408c.13.087.252.191.495.399c.612.521.918.782 1.238.935c.74.353 1.6.353 2.34 0c.32-.153.626-.414 1.238-.935c.243-.208.365-.312.495-.399c.298-.2.633-.338.985-.408c.153-.03.313-.043.632-.068c.801-.064 1.202-.096 1.536-.214a2.713 2.713 0 0 0 1.655-1.655c.118-.334.15-.735.214-1.536c.025-.319.038-.479.068-.632c.07-.352.209-.687.408-.985c.087-.13.191-.252.399-.495c.521-.612.782-.918.935-1.238c.353-.74.353-1.6 0-2.34c-.153-.32-.414-.626-.935-1.238a5.574 5.574 0 0 1-.399-.495a2.713 2.713 0 0 1-.408-.985a5.72 5.72 0 0 1-.068-.632c-.064-.801-.096-1.202-.214-1.536a2.713 2.713 0 0 0-1.655-1.655c-.334-.118-.735-.15-1.536-.214a5.707 5.707 0 0 1-.632-.068a2.713 2.713 0 0 1-.985-.408a5.73 5.73 0 0 1-.495-.399c-.612-.521-.918-.782-1.238-.935a2.713 2.713 0 0 0-2.34 0c-.32.153-.626.414-1.238.935Z"
									opacity=".5" />
								<path
									d="M15.83 8.17a.814.814 0 0 1 0 1.151l-6.51 6.51a.814.814 0 0 1-1.151-1.15l6.51-6.511a.814.814 0 0 1 1.152 0Zm-.032 6.544a1.085 1.085 0 1 1-2.17 0a1.085 1.085 0 0 1 2.17 0Zm-6.511-4.341a1.085 1.085 0 1 0 0-2.17a1.085 1.085 0 0 0 0 2.17Z" />
							</g>
						</svg></div>
					<p class="flex flex-col">
						<span class="text-xl font-bold">GHC {{ totalSales }}.00</span>
						<span class="text-sm text-neutral-500 dark:text-neutral-800">Total Sales</span>
					</p>
				</div> -->
				<div
					class="flex justify-center items-center gap-3 p-5 flex-1 bg-neutral-900 dark:bg-yellow-200 min-h-[8rem] rounded-xl shadow-xl">
					<div class="p-3 rounded-full bg-secondary bg-opacity-30 w-16 aspect-square"><svg
							xmlns="http://www.w3.org/2000/svg" class="w-full" viewBox="0 0 24 24">
							<path class="fill-secondary"
								d="M12 22.575q-.2 0-.375-.062T11.3 22.3L9 20H5q-.825 0-1.413-.588T3 18V4q0-.825.588-1.413T5 2h14q.825 0 1.413.588T21 4v14q0 .825-.588 1.413T19 20h-4l-2.3 2.3q-.15.15-.325.213t-.375.062ZM5 16.85q1.35-1.325 3.138-2.087T12 14q2.075 0 3.863.763T19 16.85V4H5v12.85ZM12 12q1.45 0 2.475-1.025T15.5 8.5q0-1.45-1.025-2.475T12 5q-1.45 0-2.475 1.025T8.5 8.5q0 1.45 1.025 2.475T12 12Zm0-2q-.625 0-1.063-.438T10.5 8.5q0-.625.438-1.063T12 7q.625 0 1.063.438T13.5 8.5q0 .625-.438 1.063T12 10Zm0 10.2l2.2-2.2H17v-.25q-1.05-.875-2.325-1.312T12 16q-1.4 0-2.675.438T7 17.75V18h2.8l2.2 2.2Zm0-9.775Z" />
						</svg></div>
					<p class="flex flex-col">
						<span class="text-xl font-bold">{{ curr_location == 'all' ? total_daily_applicants_admin.length :
							total_daily_applicants_admin.filter(apl => apl.location == curr_location).length }}</span>
						<span class="text-sm text-neutral-500 dark:text-neutral-800">Daily Applicants</span>
					</p>
				</div>
				<div
					class="flex justify-center items-center gap-3 p-5 flex-1 bg-neutral-900 dark:bg-green-200 min-h-[8rem] rounded-xl shadow-xl">
					<div class="p-3 rounded-full bg-green-300 bg-opacity-30 w-16 aspect-square"><svg
							xmlns="http://www.w3.org/2000/svg" class="w-full" viewBox="0 0 24 24">
							<g class="fill-green-900">
								<path class="dark:stroke-green-900 stroke-green-500" stroke-width="1.5"
									d="M9.781 3.89c.564-.48.846-.72 1.14-.861a2.5 2.5 0 0 1 2.157 0c.295.14.577.38 1.14.861c.225.192.337.287.457.367a2.5 2.5 0 0 0 .908.376c.141.028.288.04.582.064c.739.058 1.108.088 1.416.197a2.5 2.5 0 0 1 1.525 1.524c.109.309.138.678.197 1.416c.023.294.035.441.063.583c.064.324.192.633.376.907c.08.12.176.232.367.457c.48.564.721.846.862 1.14a2.5 2.5 0 0 1 0 2.157c-.14.294-.381.576-.862 1.14a5.25 5.25 0 0 0-.367.457a2.497 2.497 0 0 0-.376.907c-.028.142-.04.289-.063.583c-.059.738-.088 1.108-.197 1.416a2.5 2.5 0 0 1-1.525 1.524c-.308.11-.677.139-1.416.197c-.294.024-.44.036-.582.064a2.5 2.5 0 0 0-.908.376a5.25 5.25 0 0 0-.456.367c-.564.48-.846.72-1.14.861a2.5 2.5 0 0 1-2.157 0c-.295-.14-.577-.38-1.14-.861a5.263 5.263 0 0 0-.457-.367a2.5 2.5 0 0 0-.908-.376a5.277 5.277 0 0 0-.582-.064c-.739-.058-1.108-.088-1.416-.197a2.5 2.5 0 0 1-1.525-1.524c-.109-.308-.138-.678-.197-1.416a5.186 5.186 0 0 0-.063-.583a2.5 2.5 0 0 0-.376-.907c-.08-.12-.176-.232-.367-.457c-.48-.564-.721-.846-.862-1.14a2.5 2.5 0 0 1 0-2.157c.141-.294.381-.576.862-1.14c.191-.225.287-.337.367-.457a2.5 2.5 0 0 0 .376-.907c.028-.142.04-.289.063-.583c.059-.738.088-1.107.197-1.416A2.5 2.5 0 0 1 6.42 4.894c.308-.109.677-.139 1.416-.197c.294-.024.44-.036.582-.064a2.5 2.5 0 0 0 .908-.376c.12-.08.232-.175.456-.367Z"
									opacity=".5" />
								<path class="dark:stroke-green-900 stroke-green-700" stroke-linecap="round" stroke-width="1.5"
									d="m9 15l6-6" />
								<path class="dark:fill-green-900 fill-green-700"
									d="M15.5 14.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm-5-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z" />
							</g>
						</svg></div>
					<p class="flex flex-col">
						<span class="text-xl font-bold">GHC {{ today_sales_admin }}.00</span>
						<span class="text-sm text-neutral-500 dark:text-neutral-800">Daily Sales</span>
					</p>
				</div>
			</section>

			<section class="grid grid-cols-4 w-full min-h-full gap-5">
				<div :class="['rounded-xl shadow-xl bg-neutral-900 dark:bg-neutral-50 p-2', ISM ? 'col-span-4' : 'col-span-3']">
					<LineChart :chartData="lineData" :options="lineOptions" />
				</div>

				<div v-if="!ISM"
					class="bg-neutral-900 dark:bg-neutral-50 min-h-[8rem] rounded-xl shadow-xl flex flex-col items-center justify-between p-2">
					<!-- <h1 class="mx-auto">Total Amount By Users</h1> -->

					<PieChart :chartData="pieData" :options="pieOptions">
					</PieChart>

					<span class="btn btn-primary w-full" @click="$router.push('/viewApplicants')">View All Applicants</span>
				</div>
			</section>

			<section class="grid grid-cols-4 w-full min-h-full gap-5">
				<div class="col-span-full rounded-xl shadow-xl bg-neutral-900 dark:bg-neutral-50 p-2">
					<BarChart :chartData="barData" :options="barOptions" />
				</div>

			</section>

			<h1 class="col-span-full w-full font-bold text-2xl text-center">EG-Datapoint Users</h1>
			<h2 class="col-span-full w-full font-bold text-sm text-center text-neutral-500">Today</h2>

			<section :class="['grid w-full min-h-full gap-5', ISM ? 'grid-cols-1' : 'grid-cols-2']">
				<div @click="() => {
					useViewAplStore().setUSER(user.id)
					$router.push(`/analytics/${user.id}_${user.fullname}`)
				}" v-for="user in normal_users" :key="user.id"
					class="col-span-1 bg-neutral-900 dark:bg-neutral-50 dark:hover:bg-neutral-200 cursor-pointer p-3 dark:shadow-xl rounded-xl flex items-center hover:scale-105 transition-all duration-100 ease-out hover:bg-neutral-00">
					<div class="avatar">
						<div class="w-24 mask mask-square">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path fill="#888888"
									class="group-hover:fill-white transition-all duration-300 ease-out group-hover:drop-shadow-lg"
									d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 16H7v-.24C8.42 17.62 10.16 17 12 17s3.58.62 5 1.76V19zm2-1.14C17.2 16.09 14.73 15 12 15s-5.2 1.09-7 2.86V5h14v12.86zM12 13c1.93 0 3.5-1.57 3.5-3.5S13.93 6 12 6S8.5 7.57 8.5 9.5S10.07 13 12 13zm0-5c.83 0 1.5.67 1.5 1.5S12.83 11 12 11s-1.5-.67-1.5-1.5S11.17 8 12 8z" />
							</svg>
						</div>
					</div>

					<div class="flex flex-col">
						<span class="text-lg font-bold">{{ user.fullname }}</span>
						<span class="text-sm text-neutral-500 dark:text-neutral-700">Sales: GHC {{ getUserSalesToday(user.id)[0]
						}}</span>
						<span class="text-sm text-neutral-500 dark:text-neutral-700">Entries: {{ getUserSalesToday(user.id)[1]
						}}</span>
						<span class="text-sm text-neutral-500 dark:text-neutral-700">Location: {{ user.location![0].toUpperCase() +
							user.location?.substring(1) }}</span>
					</div>
				</div>
			</section>

		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app'
import { useProfileStore } from '@/store/profile'
import { useViewAplStore } from '@/store/viewApl';
import { BarChart, PieChart, LineChart } from 'vue-chart-3';
import { ChartData, ChartOptions } from 'chart.js';

const { is_mobile: ISM, total_apls, dark_mode, total_daily_applicants_admin, locations
} = storeToRefs(useAppStore())
const { profiles, role, profile } = storeToRefs(useProfileStore())
const view = ref(false)
const curr_location = ref('all')

onBeforeMount(async () => {
	if (!role.value) return useNuxtApp().$router.push('/dashboard')

	if (profile.value?.location == 'madina' && role.value) curr_location.value = 'madina'

	const app = useAppStore()
	await app.getTotalApls()
})

const today_sales_admin = computed(() => {
	if (curr_location.value == 'all') {
		if (total_daily_applicants_admin.value.length > 0) {
			let sum = 0;
			for (let i = 0; i < total_daily_applicants_admin.value!.length; i++) {
				const payment = total_daily_applicants_admin.value![i].totalPayment;
				if (!isNaN(payment)) {
					sum += payment;
				}
			}
			return sum;
		} else {
			return 0;
		}
	} else {
		let filtered_apls = total_daily_applicants_admin.value.filter(apl => apl.location == curr_location.value)

		if (filtered_apls.length > 0) {
			let sum = 0;
			for (let i = 0; i < filtered_apls!.length; i++) {
				const payment = filtered_apls![i].totalPayment;
				if (!isNaN(payment)) {
					sum += payment;
				}
			}
			return sum;
		} else {
			return 0;
		}
	}
});

const normal_users = computed(() => {
	if (curr_location.value !== 'all') {
		return profiles.value.filter(user => !user.role && user.fullname != null && user.location == curr_location.value).sort(function (a, b) { if (a.email < b.email) { return -1; } if (a.email > b.email) { return 1; } return 0; })
	} else {
		return profiles.value.filter(user => !user.role && user.fullname != null).sort(function (a, b) { if (a.email < b.email) { return -1; } if (a.email > b.email) { return 1; } return 0; })
	}
})

function getUserSalesToday(id: string) {
	let amount = 0
	const user_apls = total_daily_applicants_admin.value.filter(apl => apl.user_id == id)
	for (let idx = 0; idx < user_apls.length; idx++) {
		const payment = user_apls[idx].totalPayment;

		if (!isNaN(payment)) {
			amount += payment
		}
	}
	return [amount, user_apls.length]

}

const totalSales = computed(() => {
	let amount = 0

	if (curr_location.value == 'all') {
		for (let idx = 0; idx < total_apls.value.length; idx++) {
			const payment = total_apls.value[idx].totalPayment;

			if (!isNaN(payment)) {
				amount += payment
			}
		}
	} else {
		for (let idx = 0; idx < total_apls.value.filter(apl => apl.location == curr_location.value).length; idx++) {
			const payment = total_apls.value[idx].totalPayment;

			if (!isNaN(payment)) {
				amount += payment
			}
		}
	}

	return amount

	// 				for (let i = 0; i < aplsByDay!.length; i++) {
	// 				const payment = aplsByDay![i].totalPayment;
	// 				if (!isNaN(payment)) {
	// 					sum += payment;
	// 				}
	// 			}

	// 			amount.push(sum)
	// 			// return sum;
	// 		} else {
	// 			amount.push(0)
	// 			// return 0;
	// 		}
	// }
})

const userNames = computed(() => {
	return profiles.value.filter(user => !user.role && user.fullname != null).sort(function (a, b) { if (a.email < b.email) { return -1; } if (a.email > b.email) { return 1; } return 0; }).map(user => {
		if (!user.fullname) return 'User'
		return user.fullname
	})
})

const numberOfAplsByUser = computed(() => {
	// let totals: { x: string, y: number }[] = []
	let totals: number[] = []

	const PROFILES = profiles.value.filter(user => !user.role && user.fullname != null).sort(function (a, b) { if (a.email < b.email) { return -1; } if (a.email > b.email) { return 1; } return 0; })

	for (let ii = 0; ii < PROFILES.length; ii++) {
		const user = PROFILES[ii];

		let aplsByDay = total_apls.value.filter(apl => apl.user_id == user.id)
		// let aplsByDay = total_apls.value.filter(apl => apl.user_id == user.id).filter(apl => FD(new Date(apl.created_at!)) == FD(new Date(date.value!)))

		totals.push(aplsByDay.length)
		// return totals.push({ x: user.fullname!, y: aplsByDay.length })
	}

	// console.log(totals);

	return totals
})

const amountOfAplsByUser = computed(() => {
	// let totals: { x: string, y: number }[] = []
	let amount: number[] = []

	const PROFILES = profiles.value.filter(user => !user.role && user.fullname != null).sort(function (a, b) { if (a.email < b.email) { return -1; } if (a.email > b.email) { return 1; } return 0; })

	for (let ii = 0; ii < PROFILES.length; ii++) {
		const user = PROFILES[ii];

		let aplsByDay = total_apls.value.filter(apl => apl.user_id == user.id)
		// let aplsByDay = total_apls.value.filter(apl => apl.user_id == user.id).filter(apl => FD(new Date(apl.created_at!)) == FD(new Date(date.value!)))

		if (aplsByDay.length > 0) {
			let sum = 0;
			for (let i = 0; i < aplsByDay!.length; i++) {
				const payment = aplsByDay![i].totalPayment;
				if (!isNaN(payment)) {
					sum += payment;
				}
			}

			amount.push(sum)
			// return sum;
		} else {
			amount.push(0)
			// return 0;
		}



		// amount.push(aplsByDay.length)
		// return totals.push({ x: user.fullname!, y: aplsByDay.length })
	}

	// console.log(totals);

	return amount
})

function getTotalPaymentByDay(num: number) {
	const today = new Date();
	const numDaysAgo = new Date(today);
	numDaysAgo.setDate(today.getDate() - num);

	let totalPayments = total_apls.value.filter(apl => useNuxtApp().$formatDate(new Date(apl.created_at!)) == useNuxtApp().$formatDate(numDaysAgo)).map(apl => apl.totalPayment)

	let sum = 0
	for (let ii = 0; ii < totalPayments.length; ii++) {
		const payment = totalPayments[ii];
		if (!isNaN(payment)) sum += payment
	}

	return sum
}

const sales_by_day = computed(() => {
	let arr = [6, 5, 4, 3, 2, 1, 0]
	let sales = []
	for (let idx = 0; idx < arr.length; idx++) {
		let day_idx = arr[idx];
		let amount = getTotalPaymentByDay(day_idx)
		sales.push(amount)
	}

	return sales
})

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

const bgClrs = ref(
	[
		'#40128B',
		'#9336B4',
		'#DD58D6',
		'#BB008A',
		'#FFE79B',
		'#FF2300',
		'#E9002E',
	]
)

const lineOptions = computed<ChartOptions<'bar'>>(() => {
	return {
		responsive: true,
		elements: {
			line: {
				tension: .5,
				borderColor: !dark_mode.value ? 'rgb(80 80 80)' : 'rgb(80 80 80)',
			}
		},
		plugins: {
			legend: {
				display: false
			},
			title: {
				display: true,
				text: 'Daily Total Sales',
			},
			tooltip: {
				enabled: true
			}
		},
	}
});

const barOptions = ref<ChartOptions<'bar'>>({
	responsive: true,
	onClick: (ctx, el) => {
		if (el.length > 0) {
			let index = el[0].index
			const user = profiles.value.filter(user => !user.role && user.fullname != null).sort(function (a, b) { if (a.email < b.email) { return -1; } if (a.email > b.email) { return 1; } return 0; })[index]

			console.log(user.id, user.fullname);

			useViewAplStore().setUSER(user.id)
			useNuxtApp().$router.push(`/analytics/${user.id}_${user.fullname}`)
		}
	},
	plugins: {
		legend: {
			display: false,
			position: 'bottom'
		},
		title: {
			display: true,
			text: 'Total Sales Per User',
		},
		tooltip: {
			enabled: true
		},
	},
});

const pieOptions = ref<ChartOptions<'bar'>>({
	responsive: true,
	onClick: (ctx, el) => {
		if (el.length > 0) {
			let index = el[0].index
			const user = profiles.value.filter(user => !user.role && user.fullname != null).sort(function (a, b) { if (a.email < b.email) { return -1; } if (a.email > b.email) { return 1; } return 0; })[index]

			console.log(user.id, user.fullname);

			useViewAplStore().setUSER(user.id)
			useNuxtApp().$router.push(`/analytics/${user.id}_${user.fullname}`)
		}
	},
	plugins: {
		legend: {
			display: false,
			position: 'bottom'
		},
		title: {
			position: 'top',
			display: true,
			text: 'Total Applicants Per User',
		},
		tooltip: {
			enabled: true
		}
	},
});

const barData = computed<ChartData<'bar'>>(() => {
	return {
		labels: userNames.value,
		datasets: [
			{
				label: 'Applicants',
				type: 'bar',
				borderRadius: 10,
				data: amountOfAplsByUser.value,
				// data: [{ x: 'Sales', y: 20 }, { x: 'Revenue', y: 10 }],
				backgroundColor: bgClrs.value,
			},
		],
	}
})

const lineData = computed<ChartData<'line'>>(() => {
	return {
		labels: getDaysArrayWithTodayAtEnd(),
		datasets: [
			{
				label: 'Sales',
				borderRadius: 10,
				data: sales_by_day.value,
				// data: [{ x: 'Sales', y: 20 }, { x: 'Revenue', y: 10 }],
				backgroundColor: bgClrs.value,
			},
		],
	}
})

const pieData = computed<ChartData<'pie'>>(() => {
	return {
		labels: userNames.value,
		datasets: [
			{
				data: numberOfAplsByUser.value,
				backgroundColor: bgClrs.value,
			},
		],
	}
})
</script>
