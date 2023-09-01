<template>
	<div class="__dashboard w-full h-full relative overflow-y-auto flex flex-col bg-neutral-100 pb-10">

		<header
			class="sticky top-0 w-full h-fit text-black p-3 px-10 bg-white col-span-full border-b border-black flex justify-between z-[400]">
			<h1 class="text-3xl font-bold">Dashboard</h1>

			<div class="flex gap-6 items-center bg-white">
				<SvgsSearch classer="stroke-black" class="w-6 h-6" />
				<SvgsBell classer="stroke-black" class="w-6 h-6" />
				<NButton @click="$router.push('/newApplicant')">Add Applicant</NButton>
			</div>
		</header>

		<!-- statistics -->
		<h1 class="mt-5 mb-2 font-bold px-10 w-full text-black">Statistics</h1>

		<div class="flex w-full text-black gap-5 min-h-fit px-10">
			<StatCard :head="'Total Applicants'" :val="!role ? all_my_apls.length : total_apls.length" :stat="undefined">

				<div class="flex flex-col w-full">
					<div v-for="i in [5, 4, 3, 2, 1]" class="flex gap-2 w-full items-center">
						<progress class="progress progress-primary dark:progress-primary bg-purple-400 dark:bg-white"
							:value="getAplNumByDay(i)" :max="getMaxDay.maxCount"></progress>
						<span
							:class="i == 0 ? 'w-6 text-md text-primary tooltip tooltip-primary tooltip-right' : 'w-6 text-sm tooltip tooltip-primary tooltip-right'"
							:data-tip="i == 0 ? `Today` : `${i} days ago`">{{
								getAplNumByDay(i)
							}}
						</span>
					</div>
				</div>
			</StatCard>

			<StatCard :head="`Today's Applicants`"
				:val="role ? total_daily_applicants_admin.length : total_daily_applicants.length"
				:stat="`${isNaN(Number(perc_compared_to_yesterday.toFixed(1))) ? 0 : perc_compared_to_yesterday.toFixed(1)}%`">
				<div class="flex flex-col w-full gap-1">
					<div class="flex-1 flex justify-between items-center">
						<span class="text-sm">Singles</span>
						<span class="text-sm">
							{{ role ? total_daily_applicants_admin.filter(apl => apl.pmarital_status !== 'MARRIED' && apl.wards.length
								== 0).length :
								total_daily_applicants.filter(apl => apl.pmarital_status !== 'MARRIED' && apl.wards.length
									== 0).length }}
						</span>
					</div>
					<div class="flex-1 flex justify-between items-center">
						<span class="text-sm">W/Spouse</span>
						<span class="text-sm">
							{{ role ? total_daily_applicants_admin.filter(apl => apl.pmarital_status === 'MARRIED' && apl.wards.length
								== 0).length :
								total_daily_applicants.filter(apl => apl.pmarital_status === 'MARRIED' && apl.wards.length == 0).length }}
						</span>
					</div>
					<div class="flex-1 flex justify-between items-center">
						<span class="text-sm">W/Kids</span>
						<span class="text-sm">
							{{ role ? total_daily_applicants_admin.filter(apl => apl.pmarital_status !== 'MARRIED' && apl.wards.length
								!==
								0).length :
								total_daily_applicants.filter(apl => apl.pmarital_status !== 'MARRIED' && apl.wards.length !== 0).length }}
						</span>
					</div>
					<div class="flex-1 flex justify-between items-center">
						<span class="text-sm">Family</span>
						<span class="text-sm">
							{{ role ? total_daily_applicants_admin.filter(apl => apl.pmarital_status === 'MARRIED' && apl.wards.length
								!==
								0).length :
								total_daily_applicants.filter(apl => apl.pmarital_status === 'MARRIED' && apl.wards.length !== 0).length }}
						</span>
					</div>
				</div>
			</StatCard>

			<StatCard :head="`Today's Sales`" :val="Number((!role ? today_sales : today_sales_admin)).toFixed(2)"
				:stat="undefined">
				<div class="flex justify-end items-center w-[50%]">
					<radial-progress :textclr="`primary`"
						:amount="Number(((!role ? today_sales : today_sales_admin - getTotalPaymentByDay(1)) * 100).toFixed(1)) || 0">

					</radial-progress>
				</div>
			</StatCard>
		</div>



		<div class="flex gap-5 flex-1 pb-5">
			<!-- requests/ann/tasks -->
			<div class="flex-1 pl-10 text-black">
				<h1 class="mt-3 mb-2 font-bold w-full text-black">Tasks</h1>

				<div class="flex flex-col min-h-[300px] max-h-[400px] border border-black overflow-y-auto relative bg-white">
					<header class="w-full flex items-center justify-between p-2 border-b sticky top-0 border-black bg-white z-50">
						<span class="font-bold">{{ task_type ? task_type![0].toUpperCase() + task_type?.substring(1) : '' }}
							<div class="dropdown dropdown-right dropdown-hover">
								<label tabindex="0" class=" ">※</label>
								<ul tabindex="0"
									class="dropdown-content z-[1000] text-black menu p-2 border border-black bg-white rounded-sm hover:shadow-box transition-all duration-150 ease-out w-52">
									<li @click="task_type = 'uncompleted'"><a>Uncompleted</a></li>
									<li @click="task_type = 'completed'"><a>Completed</a></li>
									<li @click="task_type = 'all'"><a>All</a></li>
								</ul>
							</div>

						</span>

						<NButton onclick="my_modal_3.showModal()">New Task</NButton>

						<dialog id="my_modal_3" class="modal">
							<form method="dialog" class="modal-box bg-white shadow-box rounded-sm">
								<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
								<h3 class="font-bold text-lg pb-5">New Task</h3>
								<textarea v-model="new_task" class="w-full min-h-12 border border-black rounded-sm p-3"></textarea>
								<span class="text-xs italic">Enter task to send!</span>

								<div class="modal-action">
									<NButton class="" v-if="new_task.length > 0" @click="async () => {
										await useTasksStore().sendTasks({
											body: new_task,
											user_id: useSupabaseUser().value?.id!,
										})
										new_task = ''
									}">

										<span v-if="!loading_task" class="">Add</span>
										<span v-else class="loading loading-infinity loading-md"></span>
									</NButton>
								</div>
							</form>
						</dialog>
					</header>

					<div class="flex flex-col w-full">
						<div v-for="(task, i) in tasks_computed" v-if="_tasks"
							:class="['flex items-center justify-between p-2 px-5 border-b border-black', task.done ? 'bg-green-200' : '']"
							:key="i">
							<div class="w-full flex gap-5 items-center">
								<span class="text-xs">{{ i + 1 }}</span>
								<div class="flex flex-col gap-1">
									<span class="">{{ task.body }}</span>
									<span class="text-xs">{{ $formatDate(new Date(task.created_at!)) }} | {{ $formatDateTime(new
										Date(task.created_at!)) }}</span>
								</div>
							</div>

							<div class="dropdown dropdown-left dropdown-hover">
								<label tabindex="0" class=" ">※</label>
								<ul tabindex="0"
									class="dropdown-content z-[1000] text-black menu p-2 border border-black bg-white rounded-sm hover:shadow-box transition-all duration-150 ease-out w-52">
									<li @click="useTasksStore().updateTask(task.done!, task.id!)"><a>{{ !task.done ? 'Mark as Done' : `Mark
											as not Done` }}</a></li>
									<li @click="useTasksStore().deleteTask(task.id!)" class="bg-red-200 text-white rounded-sm"><a
											class="">Delete</a></li>
								</ul>
							</div>

						</div>
					</div>

					<span v-if="loading_task"
						class="absolute top-1/2 left-1/2 -translate-x-1/2 z-50 -translate-y-1/2 loading loading-infinity loading-lg"></span>

				</div>
			</div>

			<!-- recent apls -->
			<div class="w-1/3 flex flex-col pr-10 text-black">
				<h1 class="mt-3 mb-2 font-bold w-full text-black">Today's Recent Applicants</h1>
				<div class="flex flex-col w-full h-full border border-black bg-white rounded-sm">
					<!-- searchbar -->
					<div class="sticky top-0 w-full border-b border-black h-16 flex justify-center items-center">
						<input
							class=" w-[90%] h-[60%] border border-black focus:outline-none focus:shadow-box px-3 transition-all duration-150 ease-out text-center placeholder:text-neutral-300 placeholder:text-sm rounded-sm"
							v-model="quick_search" placeholder="Quick Search" />
					</div>
					<!-- recent apl -->
					<div class="w-full h-full border-black relative flex">
						<div class="flex-1 overflow-y-auto overflow-x-hidden max-h-[400px]">

							<div v-if="!loading" v-for="(apl, i) in recent_apls"
								@click="() => { $router.push(`/applicant/${apl.apl_id}`); useViewAplStore().setID(apl.apl_id!); }"
								class="w-full border-b border-black p-2 flex items-center justify-between gap-2 bg-white hover:bg-purple-50 cursor-pointer transition-all duration-100 ease-out group z-50 group">
								<!-- img -->
								<div class="h-14 aspect-square border border-black rounded-sm">
									<img loading="lazy" v-if="URLs?.length! > 0" class=""
										:src="URLs![i].signedUrl !== null ? URLs![i].signedUrl : '/svg/image.svg'" />
								</div>

								<!-- name -->
								<div class="flex flex-col w-full">
									<span class="text-sm font-semibold group-hover:text-primary">{{ apl.fullName }}</span>
									<span class="text-xs">{{ $formatDateTime(new Date(apl.created_at!)) }}</span>
									<span v-if="role" class="text-xs">By: {{ profiles.find(user => user.id == apl.user_id)?.fullname!
									}}</span>
								</div>

								<div class="">{{ apl.totalPayment }}.00</div>

							</div>

							<div class="w-full h-full grid place-items-center dark:bg-neutral-100"
								v-if="role && total_daily_applicants_admin.length == 0">
								<div class="flex flex-col items-center gap-2">
									<svg xmlns="http://www.w3.org/2000/svg" class="w-20 aspect-square" viewBox="0 0 24 24">
										<g stroke="#888888" stroke-linecap="round" stroke-width="2">
											<path fill="#888888" fill-opacity="0" stroke-dasharray="60" stroke-dashoffset="60"
												d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z">
												<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0" />
												<animate fill="freeze" attributeName="fill-opacity" begin="1.2s" dur="0.15s" values="0;0.3" />
											</path>
											<path fill="none" stroke-dasharray="14" stroke-dashoffset="14"
												d="M8 16C8.5 15 9.79086 14 12 14C14.2091 14 15.5 15 16 16">
												<animate fill="freeze" attributeName="stroke-dashoffset" begin="1s" dur="0.2s" values="14;0" />
											</path>
										</g>
										<g fill="#888888" fill-opacity="0">
											<ellipse cx="9" cy="9.5" rx="1" ry="1.5">
												<animate fill="freeze" attributeName="fill-opacity" begin="0.6s" dur="0.2s" values="0;1" />
											</ellipse>
											<ellipse cx="15" cy="9.5" rx="1" ry="1.5">
												<animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.2s" values="0;1" />
											</ellipse>
										</g>
									</svg>
									<span class="text-center">No recent <br />Applicants</span>
								</div>
							</div>

							<div class="w-full h-full grid place-items-center dark:bg-neutral-100"
								v-if="!role && total_daily_applicants.length == 0">
								<div class="flex flex-col items-center gap-2">
									<svg xmlns="http://www.w3.org/2000/svg" class="w-20 aspect-square" viewBox="0 0 24 24">
										<g stroke="#888888" stroke-linecap="round" stroke-width="2">
											<path fill="#888888" fill-opacity="0" stroke-dasharray="60" stroke-dashoffset="60"
												d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z">
												<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0" />
												<animate fill="freeze" attributeName="fill-opacity" begin="1.2s" dur="0.15s" values="0;0.3" />
											</path>
											<path fill="none" stroke-dasharray="14" stroke-dashoffset="14"
												d="M8 16C8.5 15 9.79086 14 12 14C14.2091 14 15.5 15 16 16">
												<animate fill="freeze" attributeName="stroke-dashoffset" begin="1s" dur="0.2s" values="14;0" />
											</path>
										</g>
										<g fill="#888888" fill-opacity="0">
											<ellipse cx="9" cy="9.5" rx="1" ry="1.5">
												<animate fill="freeze" attributeName="fill-opacity" begin="0.6s" dur="0.2s" values="0;1" />
											</ellipse>
											<ellipse cx="15" cy="9.5" rx="1" ry="1.5">
												<animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.2s" values="0;1" />
											</ellipse>
										</g>
									</svg>
									<span class="text-center">No recent <br />Applicants</span>
								</div>
							</div>


							<span v-if="loading"
								class="absolute top-1/2 left-1/2 -translate-x-1/2 z-50 -translate-y-1/2 loading loading-infinity loading-lg"></span>
						</div>
					</div>


				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang='ts'>
import { useTitle } from '@vueuse/core';
useTitle('EG Datapoint | Dashboard')
import { useAppStore } from '@/store/app';
import { useProfileStore } from '@/store/profile';
import { useTasksStore } from '@/store/tasks';
import { storeToRefs } from 'pinia';
import { useViewAplStore } from '@/store/viewApl';

const { total_apls, all_my_apls, perc_compared_to_yesterday, total_daily_applicants, total_daily_applicants_admin, today_sales_admin, perc_compared_to_yesterday_admin, today_sales } = storeToRefs(useAppStore())
const { _tasks, done_task, loading_task } = storeToRefs(useTasksStore())
const loading = ref(false)
const quick_search = ref('')
const new_task = ref('')
const { role, profiles } = storeToRefs(useProfileStore())
const { $formatDate, $sortByRecency: SR } = useNuxtApp()
const task_type = ref('uncompleted')
const URLs = ref<{
	error: string | null;
	path: string | null;
	signedUrl: string;
}[] | null | undefined>()
const tasks_computed = computed(() => {
	if (task_type.value == 'uncompleted') return _tasks.value.filter(t => !t.done)
	if (task_type.value == 'completed') return _tasks.value.filter(t => t.done)
	if (task_type.value == 'all') return _tasks.value
})

onMounted(async () => {
	await loadUrls()
})

watchEffect(() => {
	console.log(loading.value, URLs.value);
})

const path = computed(() => {
	return useNuxtApp().$sortByRecency(total_daily_applicants.value).map(apl => apl.aplImg_path.primePath[0])
})
const path_all = computed(() => {
	return useNuxtApp().$sortByRecency(total_apls.value).map(apl => apl.aplImg_path.primePath[0])
})

const path_admin = computed(() => {
	return useNuxtApp().$sortByRecency(total_daily_applicants_admin.value).map(apl => apl.aplImg_path.primePath[0])
})

const recent_apls = computed(() => {
	if (!quick_search.value) {
		console.log('here');

		if (!role.value) {
			return SR(total_daily_applicants.value)
		} else {
			return SR(total_daily_applicants_admin.value)
		}
	} else {
		if (!role.value) {
			return SR(total_daily_applicants.value.filter(apl => apl.fullName.includes(quick_search.value.toUpperCase())))
		} else {
			return SR(total_daily_applicants_admin.value.filter(apl => apl.fullName.includes(quick_search.value.toUpperCase())))
		}
	}
})

async function loadUrls() {
	loading.value = true
	try {
		const APLS = await useAppStore().getTotalApls()

		if (!role.value) {
			if (total_daily_applicants.value.length == 0) return loading.value = false
			let { data, error } = await useNuxtApp().$SB.storage.from('applicants').createSignedUrls(path.value, 10)
			let { data: data_all, error: err } = await useNuxtApp().$SB.storage.from('applicants').createSignedUrls(path_all.value, 10)
			// console.log(data);

			if (error) throw error
			if (err) throw err
			URLs.value = data

			useAppStore().$patch({
				daily_urls: data_all
			})
			loading.value = false
			// console.log(URLs.value);
		} else if (role.value) {
			if (APLS!.length == 0) return loading.value = false
			let { data, error } = await useNuxtApp().$SB.storage.from('applicants').createSignedUrls(path_admin.value, 10)
			// console.log(data);

			if (error) throw error
			URLs.value = data
			loading.value = false
			// console.log(URLs.value);
		}
	} catch (error) {
		console.log(error);
		loading.value = false
	}

}

function getAplNumByDay(num: number) {
	// num == number of days from today
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(today.getDate() - num);

	const yesterdayFormatted = useNuxtApp().$formatDate(yesterday);

	if (role.value) {
		const yesterday_apls = total_apls.value.filter(
			(apl) => useNuxtApp().$formatDate(new Date(apl.created_at!)) === yesterdayFormatted
		).length;

		return yesterday_apls;
	} else {
		const yesterday_apls = all_my_apls.value.filter(
			(apl) => useNuxtApp().$formatDate(new Date(apl.created_at!)) === yesterdayFormatted
		).length;

		return yesterday_apls;
	}
}

// create a car class

function getTotalPaymentByDay(num: number) {
	const today = new Date();
	const numDaysAgo = new Date(today);
	numDaysAgo.setDate(today.getDate() - num);

	if (role.value) {
		let totalPayments = total_apls.value.filter(apl => $formatDate(new Date(apl.created_at!)) == $formatDate(numDaysAgo)).map(apl => apl.totalPayment)

		let sum = 0
		for (let ii = 0; ii < totalPayments.length; ii++) {
			const payment = totalPayments[ii];
			if (!isNaN(payment)) sum += payment
		}

		return sum
	} else {
		let totalPayments = all_my_apls.value.filter(apl => $formatDate(new Date(apl.created_at!)) == $formatDate(numDaysAgo)).map(apl => apl.totalPayment)

		let sum = 0
		for (let ii = 0; ii < totalPayments.length; ii++) {
			const payment = totalPayments[ii];
			if (!isNaN(payment)) sum += payment
		}

		return sum

	}

}

const getMaxDay = computed(() => {
	const today = new Date();
	const fiveDaysAgo = new Date(today);
	fiveDaysAgo.setDate(today.getDate() - 5);

	const aplsByDay: { [date: string]: number } = {}; // Object to store counts by date
	if (role.value) {
		total_apls.value.forEach((apl) => {
			const aplDate = new Date(apl.created_at!);
			if (aplDate >= fiveDaysAgo && aplDate <= today) {
				const daysAgo = Math.floor((today.getTime() - aplDate.getTime()) / (24 * 60 * 60 * 1000));
				if (aplsByDay[daysAgo.toString()] === undefined) {
					aplsByDay[daysAgo.toString()] = 1;
				} else {
					aplsByDay[daysAgo.toString()]++;
				}
			}
		});

		let maxCount = 0;
		let daysAgoMaxCount = 0;
		for (const daysAgoStr in aplsByDay) {
			const count = aplsByDay[daysAgoStr];
			const daysAgo = parseInt(daysAgoStr);
			if (count > maxCount) {
				maxCount = count;
				daysAgoMaxCount = daysAgo;
			}
		}

		// console.log({ maxCount, daysAgo: daysAgoMaxCount });

		return { maxCount, daysAgo: daysAgoMaxCount };

	} else {
		all_my_apls.value.forEach((apl) => {
			const aplDate = new Date(apl.created_at!);
			if (aplDate >= fiveDaysAgo && aplDate <= today) {
				const daysAgo = Math.floor((today.getTime() - aplDate.getTime()) / (24 * 60 * 60 * 1000));
				if (aplsByDay[daysAgo.toString()] === undefined) {
					aplsByDay[daysAgo.toString()] = 1;
				} else {
					aplsByDay[daysAgo.toString()]++;
				}
			}
		});

		let maxCount = 0;
		let daysAgoMaxCount = 0;
		for (const daysAgoStr in aplsByDay) {
			const count = aplsByDay[daysAgoStr];
			const daysAgo = parseInt(daysAgoStr);
			if (count > maxCount) {
				maxCount = count;
				daysAgoMaxCount = daysAgo;
			}
		}

		// console.log({ maxCount, daysAgo: daysAgoMaxCount });

		return { maxCount, daysAgo: daysAgoMaxCount };

	}
})

</script>
