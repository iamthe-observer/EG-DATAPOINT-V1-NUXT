<template>
	<div v-if="role" class="w-full h-full rounded-2xl overflow-y-auto" id="style-2">
		<div class="w-full min-h-full rounded-s-2xl bg-neutral-800 dark:bg-neutral-50 dark:shadow-xl col-span-full row-span-full p-3 overflow-y-auto text-justify relative flex flex-col gap-5"
			id="style-1">

			<div :class="['w-full flex items-center justify-between', ISM ? 'flex-col gap-3' : '']">
				<div class="flex gap-2 items-center">
					<span @dblclick="shown = !shown"
						:class="['font-bold', ISM ? 'text-xl' : 'text-3xl']">Overview</span>
				</div>

				<DatePicker dark :color="'purple'" is-dark v-model="date" mode="date">
					<template #default="{ togglePopover }">
						<div class="w-full px-10 flex">
							<span @click="togglePopover"
								class="text-2xl font-bold px-2 py-1 dark:hover:bg-neutral-300 hover:text-accent bg-neutral-700 min-w-full text-center hover:bg-neutral-900 rounded-xl transition-all mx-auto duration-200 ease-in-out cursor-pointer">{{
									$formatDateWords(date!) }}</span>
						</div>
					</template>
				</DatePicker>


				<select v-model="curr_location"
					:class="['select rounded-full bg-[rgb(13,13,13)] dark:bg-neutral-50 dark:text-black', ISM ? 'select-xs w-32' : 'select-sm w-40']">
					<option v-if="admin" selected value="all">All Locations</option>
					<option v-for="location in locationz" :value="location">{{ location![0].toUpperCase() +
						location?.substring(1)
						}}</option>
				</select>
			</div>

			<section :class="['grid w-full gap-5', ISM ? 'grid-cols-1' : 'grid-cols-4']">
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
				<div v-if="shown"
					class="flex justify-center items-center gap-3 p-5 flex-1 bg-neutral-900 dark:bg-fuchsia-200 min-h-[8rem] rounded-xl shadow-xl">
					<div class="p-3 rounded-full bg-accent bg-opacity-30 w-16 aspect-square"><svg
							xmlns="http://www.w3.org/2000/svg" class="w-full" viewBox="0 0 24 24">
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
				</div>
				<div
					class="flex justify-center items-center gap-3 p-5 flex-1 bg-neutral-900 dark:bg-yellow-200 min-h-[8rem] rounded-xl shadow-xl">
					<div class="p-3 rounded-full bg-secondary bg-opacity-30 w-16 aspect-square"><svg
							xmlns="http://www.w3.org/2000/svg" class="w-full" viewBox="0 0 24 24">
							<path class="fill-secondary"
								d="M12 22.575q-.2 0-.375-.062T11.3 22.3L9 20H5q-.825 0-1.413-.588T3 18V4q0-.825.588-1.413T5 2h14q.825 0 1.413.588T21 4v14q0 .825-.588 1.413T19 20h-4l-2.3 2.3q-.15.15-.325.213t-.375.062ZM5 16.85q1.35-1.325 3.138-2.087T12 14q2.075 0 3.863.763T19 16.85V4H5v12.85ZM12 12q1.45 0 2.475-1.025T15.5 8.5q0-1.45-1.025-2.475T12 5q-1.45 0-2.475 1.025T8.5 8.5q0 1.45 1.025 2.475T12 12Zm0-2q-.625 0-1.063-.438T10.5 8.5q0-.625.438-1.063T12 7q.625 0 1.063.438T13.5 8.5q0 .625-.438 1.063T12 10Zm0 10.2l2.2-2.2H17v-.25q-1.05-.875-2.325-1.312T12 16q-1.4 0-2.675.438T7 17.75V18h2.8l2.2 2.2Zm0-9.775Z" />
						</svg></div>
					<p class="flex flex-col">
						<span class="text-xl font-bold">{{ curr_location == 'all' ? daily_applicants.length :
							daily_applicants.filter(apl => apl.location == curr_location).length }}</span>
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
								<path class="dark:stroke-green-900 stroke-green-700" stroke-linecap="round"
									stroke-width="1.5" d="m9 15l6-6" />
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

			<!-- graphs -->
			<section class="grid grid-cols-4 w-full gap-5 mb-3">
				<div
					:class="['rounded-xl shadow-xl bg-neutral-900 dark:bg-neutral-50 p-2', ISM ? 'col-span-4' : 'col-span-full']">
					<LineChart :class="[ISM ? 'h-fit' : 'h-[500px]']" :chartData="lineData" :options="lineOptions" />
				</div>
			</section>

			<section class="grid grid-cols-4 w-full gap-5 mb-5">
				<div class="col-span-full rounded-xl shadow-xl bg-neutral-900 dark:bg-neutral-50 p-2">
					<BarChart :class="[ISM ? 'h-fit' : 'h-[500px]']" :chartData="barData" :options="barOptions" />
				</div>
			</section>

			<h1 class="col-span-full w-full font-bold text-2xl text-center">EG-Datapoint Users</h1>
			<h2 class="col-span-full w-full font-bold text-sm text-center text-neutral-500">Today</h2>

			<section :class="['grid w-full min-h-full gap-5', ISM ? 'grid-cols-1 pb-40' : 'grid-cols-2']">
				<div @click="() => {
					useViewAplStore().setUSER(user.id)
					$router.push(`/analytics/${user.id}_${user.fullname}`)
				}" v-for="user in normal_users" :key="user.id"
					:class="['col-span-1 dark:hover:bg-neutral-200 cursor-pointer p-3 shadow-xl rounded-xl flex items-center transition-all duration-100 ease-out', getUserSalesToday(user.id)[1] > 0 ? 'bg-green-900 dark:bg-green-400' : 'bg-neutral-900 dark:bg-neutral-50']">
					<div class="avatar">
						<div class="w-24 mask mask-square">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path fill="#888888" class="dark:fill-neutral-700"
									d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 16H7v-.24C8.42 17.62 10.16 17 12 17s3.58.62 5 1.76V19zm2-1.14C17.2 16.09 14.73 15 12 15s-5.2 1.09-7 2.86V5h14v12.86zM12 13c1.93 0 3.5-1.57 3.5-3.5S13.93 6 12 6S8.5 7.57 8.5 9.5S10.07 13 12 13zm0-5c.83 0 1.5.67 1.5 1.5S12.83 11 12 11s-1.5-.67-1.5-1.5S11.17 8 12 8z" />
							</svg>
						</div>
					</div>

					<div class="flex flex-col">
						<span class="text-lg font-bold">{{ user.fullname }}</span>
						<span class="text-sm text-neutral-200 dark:text-neutral-700 dark:font-bold">Sales: GHC {{
							getUserSalesToday(user.id)[0]
						}}</span>
						<span class="text-sm text-neutral-200 dark:text-neutral-700 dark:font-bold">Entries: {{
							getUserSalesToday(user.id)[1]
						}}</span>
						<span class="text-sm text-neutral-200 dark:text-neutral-700 dark:font-bold">Location: {{
							user.location![0].toUpperCase() +
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
import { BarChart, LineChart } from 'vue-chart-3';
import { ChartData, ChartOptions } from 'chart.js';

const { is_mobile: ISM, total_apls, dark_mode, locations
} = storeToRefs(useAppStore())
const { profiles, role, profile } = storeToRefs(useProfileStore())
const date = ref<Date>(new Date())
const shown = ref(false)
const curr_location = ref('circle')

const admin = computed(() => {
	if (profile.value?.email == 'topsquad3552@gmail.com') {
		return true
	} else {
		return false
	}
})

onMounted(() => {
	if (profile.value?.email == 'topsquad3552@gmail.com') {
		curr_location.value = 'circle'
	} else {
		curr_location.value = profile.value?.location!
	}
})

const lizzy_locations = computed(() => {
	return locations.value.filter(loc => ['madina', 'kwashieman', 'manet'].includes(loc))
})
const asor_locations = computed(() => {
	return locations.value.filter(loc => ['spintex', 'ashaiman'].includes(loc))
})
const nana_locations = computed(() => {
	return locations.value.filter(loc => ['circle'].includes(loc))
})

const locationz = computed(() => {
	if (profile.value?.email == 'elizabethlarbi1999@gmail.com') {
		return lizzy_locations.value
	} else if (profile.value?.email == 'asorlarbi@gmail.com') {
		return asor_locations.value
	} else if (profile.value?.email == 'ebbysgold@gmail.com') {
		return nana_locations.value
	}
	else {
		return locations.value
	}
})

onBeforeMount(async () => {
	if (!role.value) return useNuxtApp().$router.push('/dashboard')

	if (profile.value?.location == 'madina' && role.value) curr_location.value = 'madina'

	const app = useAppStore()
	await app.getTotalApls()
})

const daily_applicants = computed(() => {
	if (admin.value) {
		return total_apls.value?.filter(
			(apl) =>
				useNuxtApp().$formatDate(new Date(apl.created_at!)) ==
				useNuxtApp().$formatDate(date.value)
		)
			.filter(apl => {
				if (curr_location.value == 'all') {
					return true
				} else {
					return apl.location == curr_location.value
				}
			});
	} else {
		return total_apls.value?.filter(
			(apl) =>
				useNuxtApp().$formatDate(new Date(apl.created_at!)) ==
				useNuxtApp().$formatDate(date.value)
		)
			.filter(apl => apl.location == curr_location.value)
	}

	// old code
	// else if (profile.value?.email == 'elizabethlarbi1999@gmail.com' || profile.value?.email == 'asorlarbi@gmail.com') {
	// 	return total_apls.value?.filter(
	// 		(apl) =>
	// 			useNuxtApp().$formatDate(new Date(apl.created_at!)) ==
	// 			useNuxtApp().$formatDate(date.value),
	// 	).filter(apl => apl.location == 'madina' || apl.location == 'kwashieman');
	// } else {
	// 	return total_apls.value?.filter(
	// 		(apl) =>
	// 			useNuxtApp().$formatDate(new Date(apl.created_at!)) ==
	// 			useNuxtApp().$formatDate(date.value),
	// 	).filter(apl => apl.location == curr_location.value);
	// }
})

const today_sales_admin = computed(() => {
	if (curr_location.value == 'all') {
		if (daily_applicants.value.length > 0) {
			let sum = 0;
			for (let i = 0; i < daily_applicants.value!.length; i++) {
				const payment = daily_applicants.value![i].totalPayment;
				if (!isNaN(payment)) {
					sum += payment;
				}
			}
			return sum;
		} else {
			return 0;
		}
	} else {
		let filtered_apls = daily_applicants.value.filter(apl => apl.location == curr_location.value)

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
	if (admin.value) {

		if (curr_location.value !== 'all') {
			return profiles.value.filter(user => !user.role && user.fullname != null && user.location == curr_location.value).sort(function (a, b) {
				if (a.email < b.email) {
					return -1;
				}
				if (a.email > b.email) {
					return 1;
				}
				return 0;
			})
		} else {
			return profiles.value.filter(user => !user.role && user.fullname != null).sort(function (a, b) { if (a.email < b.email) { return -1; } if (a.email > b.email) { return 1; } return 0; })
		}

	}
	// else if (profile.value?.email == 'elizabethlarbi1999@gmail.com') {

	// 	if (curr_location.value !== 'all' && ['madina', 'kwashieman', 'manet'].includes(curr_location.value)) {
	// 		return profiles.value.filter(user => !user.role && user.fullname != null && user.location == curr_location.value).sort(function (a, b) {
	// 			if (a.email < b.email) {
	// 				return -1;
	// 			}
	// 			if (a.email > b.email) {
	// 				return 1;
	// 			}
	// 			return 0;
	// 		})
	// 	} else {
	// 		return []
	// 	}

	// } else if (profile.value?.email == 'asorlarbi@gmail.com') {

	// 	if (curr_location.value !== 'all' && ['spintex', 'ashaiman'].includes(curr_location.value)) {
	// 		return profiles.value.filter(user => !user.role && user.fullname != null && user.location == curr_location.value).sort(function (a, b) {
	// 			if (a.email < b.email) {
	// 				return -1;
	// 			}
	// 			if (a.email > b.email) {
	// 				return 1;
	// 			}
	// 			return 0;
	// 		})
	// 	} else {
	// 		return []
	// 	}

	// }
	else {
		if (curr_location.value !== 'all') {
			return profiles.value.filter(user => !user.role && user.fullname != null && user.location == curr_location.value).sort(function (a, b) {
				if (a.email < b.email) {
					return -1;
				}
				if (a.email > b.email) {
					return 1;
				}
				return 0;
			})
		} else {
			return profiles.value.filter(user => !user.role && user.fullname != null).sort(function (a, b) { if (a.email < b.email) { return -1; } if (a.email > b.email) { return 1; } return 0; })
			// return profiles.value.filter(user => user.location != 'madina').filter(user => user.email != 'vinocharles419@gmail.com').filter(user => !user.role && user.fullname != null).sort(function (a, b) { if (a.email < b.email) { return -1; } if (a.email > b.email) { return 1; } return 0; })
		}

	}
})

function getUserSalesToday(id: string) {
	let amount = 0
	const user_apls = daily_applicants.value.filter(apl => apl.user_id == id)
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
	if (admin.value) {
		return profiles.value
			.filter(user => !user.role && user.fullname != null)
			.filter(user => {
				if (curr_location.value == 'all') {
					return true
				} else {
					return user.location == curr_location.value
				}
			})
			.sort(function (a, b) {
				if (a.email < b.email) { return -1; }
				if (a.email > b.email) { return 1; } return 0;
			})
			.map(user => {
				if (!user.fullname) return 'User'
				return user.fullname
			})
	} else {
		return profiles.value
			.filter(user => !user.role && user.fullname != null)
			.filter(user => user.location == curr_location.value)
			.sort(function (a, b) {
				if (a.email < b.email) { return -1; }
				if (a.email > b.email) { return 1; } return 0;
			})
			.map(user => {
				if (!user.fullname) return 'User'
				return user.fullname
			})
	}
})

const amountOfAplsByUser = computed(() => {
	// let totals: { x: string, y: number }[] = []
	let amount: number[] = []

	// .filter(user => {
	// 	if (profile.value?.email != 'topsquad3552@gmail.com') {
	// 		return user.email != 'vinocharles419@gmail.com'
	// 	} else {
	// 		return user
	// 	}
	// })

	const PROFILES = profiles.value
		.filter(user => !user.role && user.fullname != null)
		.filter(user => {
			if (curr_location.value == 'all') {
				return true
			} else {
				return user.location == curr_location.value
			}
		})
		.sort(function (a, b) { if (a.email < b.email) { return -1; } if (a.email > b.email) { return 1; } return 0; })

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

	let totalPayments = total_apls.value.filter(x => {
		if (curr_location.value == 'all') {
			return true
		} else {
			return x.location == curr_location.value
		}
	}).filter(apl => useNuxtApp().$formatDate(new Date(apl.created_at!)) == useNuxtApp().$formatDate(numDaysAgo)).map(apl => apl.totalPayment)
	// let totalPayments = total_apls.value.filter(x => x.location != 'madina').filter(apl => useNuxtApp().$formatDate(new Date(apl.created_at!)) == useNuxtApp().$formatDate(numDaysAgo)).map(apl => apl.totalPayment)

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
	// onClick: (ctx, el) => {
	// 	if (el.length > 0) {
	// 		let index = el[0].index
	// 		const user = profiles.value.filter(user => !user.role && user.fullname != null).sort(function (a, b) { if (a.email < b.email) { return -1; } if (a.email > b.email) { return 1; } return 0; })[index]

	// 		console.log(user.id, user.fullname);

	// 		useViewAplStore().setUSER(user.id)
	// 		useNuxtApp().$router.push(`/analytics/${user.id}_${user.fullname}`)
	// 	}
	// },
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

const barData = computed<ChartData<'bar'>>(() => {
	return {
		labels: userNames.value,
		datasets: [
			{
				label: '₵',
				type: 'bar',
				borderRadius: 10,
				data: amountOfAplsByUser.value,
				// data: [{ x: 'Sales', y: 20 }, { x: 'Revenue', y: 10 }],
				backgroundColor: bgClrs.value,
			},
		],
	}
})
</script>
