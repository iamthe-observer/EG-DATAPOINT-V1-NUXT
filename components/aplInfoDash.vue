<template>
	<div class="__apl_info col-span-6 row-span-8 flex flex-col gap-5 p-2">
		<div v-if="!role" class="flex w-full h-full gap-5">
			<!-- tasks -->
			<div class="containers total_applicants flex items-center px-3 justify-between w-full h-full gap-4">
				<p class="flex flex-col gap-2 h-full w-full justify-center">
					<textarea v-model="new_task"
						class="textarea outline outline-4 outline-neutral-700 text-sm h-[80%] w-full dark:bg-neutral-300 bg-neutral-900 dark:outline-neutral-200"
						placeholder="Create a new Task..."></textarea>
				</p>

				<div v-if="!new_task" class="flex flex-col items-center gap-2 w-fit">
					<span
						class="hover:text-accent cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out text-xs whitespace-nowrap dark:font-semibold">Tasks
					</span>
					<radial-progress :textclr="`accent`"
						:amount="Number(((done_tasks.length / _tasks.length) * 100).toFixed(1)) || 0">
						{{ `${done_tasks.length} / ${_tasks.length}` }}
					</radial-progress>
				</div>

				<div v-else class="join join-vertical">
					<button @click="handleTask"
						class="btn join-item btn-md btn-success dark:bg-green-400 dark:border-none dark:text-white ">
						<span v-if="!loading_task" class="">Save</span>
						<span v-else class="loading loading-ring loading-md"></span>
					</button>
					<button @click="new_task = ''"
						class="dark:border-none dark:text-white dark:bg-red-400 btn join-item btn-md btn-error">Cancel</button>
				</div>
				<input type="checkbox" :checked="done_task" class="modal-toggle" />
				<div class="modal">
					<div class="modal-box w-fit">
						<h3 class="font-semibold text-lg">Task has been saved!</h3>
						<div class="modal-action">
							<label @click="useTasksStore().setDoneTask(false)" class="btn">Close!</label>
						</div>
					</div>
				</div>

			</div>
		</div>

		<!-- admin -->
		<div v-else class="flex w-full h-full gap-5">
			<!-- tasks -->
			<div class="containers total_applicants flex items-center px-3 justify-between w-full h-full gap-4">
				<p class="flex flex-col gap-2 h-full w-full justify-center">
					<textarea v-model="new_task"
						class="textarea outline outline-4 outline-neutral-700 text-sm h-[80%] w-full dark:bg-neutral-300 bg-neutral-900 dark:outline-neutral-200"
						placeholder="Create a new Task..."></textarea>
				</p>

				<div v-if="!new_task" class="flex flex-col items-center gap-2 w-fit">
					<span @click="$router.push('/database')"
						class="hover:text-accent cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out text-xs whitespace-nowrap dark:font-semibold">Tasks
					</span>
					<radial-progress :textclr="`secondary`"
						:amount="Number(((done_tasks.length / _tasks.length) * 100).toFixed(1)) || 0">
						{{ `${done_tasks.length}/${_tasks.length}` }}
					</radial-progress>
				</div>

				<div v-else class="join join-vertical">
					<button @click="handleTask"
						class="btn join-item btn-md btn-success dark:bg-green-400 dark:border-none dark:text-white">
						<span v-if="!loading_task" class="">Save</span>
						<span v-else class="loading loading-ring loading-md"></span>
					</button>
					<button @click="new_task = ''"
						class="dark:border-none dark:text-white dark:bg-red-400 btn join-item btn-md btn-error">Cancel</button>
				</div>
				<input type="checkbox" :checked="done_task" class="modal-toggle" />
				<div class="modal">
					<div class="modal-box w-fit">
						<h3 class="font-semibold text-lg">Task has been saved!</h3>
						<div class="modal-action">
							<label @click="useTasksStore().setDoneTask(false)" class="btn">Close!</label>
						</div>
					</div>
				</div>

			</div>
		</div>

		<div v-if="!role" class="flex w-full h-full gap-5">
			<!-- total applicants -->
			<div class="containers total_applicants px-4 flex gap-2 items-center justify-between w-full h-full">
				<p class="flex flex-col gap-2">
					<span class="text-sm text-neutral-500">All Applicants</span>
					<span class="text-2xl font-medium">{{ all_my_apls?.length }}</span>
					<span :class="`text-xs ${total_perc_inc >= 50 ? 'text-green-500' : 'text-red-500'} font-medium`">+{{
						total_perc_inc.toFixed(1) }}% coverage.</span>
				</p>
				<radial-progress :textclr="'primary'" :amount="Number(total_apl_perc.toFixed(1))" />
			</div>

			<!-- total daily applicants -->
			<div class="containers total_applicants px-4 flex items-center justify-between w-full h-full">
				<p class="flex flex-col gap-2">
					<span class="text-sm text-neutral-500">Today's Applicants</span>
					<span class="font-medium text-2xl">{{ total_daily_applicants?.length }}</span>
					<span :class="`text-xs ${total_daily_inc >= 100 ? 'text-green-500' : 'text-red-500'} font-medium w-full`">{{
						total_daily_inc >= 100 ? Math.floor(total_daily_inc - 100) : total_daily_inc.toFixed(1) }}% {{
		total_daily_inc >= 100 ? 'more than yesterday.' : 'of yesterday.'
	}}</span>
				</p>
				<radial-progress :textclr="`secondary`" :amount="Number(total_daily_inc!.toFixed(1))" />
			</div>
		</div>

		<!-- admin -->
		<div v-else class="flex w-full h-full gap-5">
			<!-- total daily applicants -->
			<div ref="info_container" class="containers total_applicants flex items-center justify-center flex-1 h-full">
				<p v-if="!is_hover" class="flex flex-col gap-2 items-start">
					<span class="w-min mx-auto text-sm text-neutral-500 text-center">Today's Applicants</span>
					<span class="w-min mx-auto font-medium text-2xl">{{ total_daily_applicants_admin?.length }}</span>
					<span
						:class="`text-xs text-center ${total_daily_inc_admin >= 100 ? 'text-green-500' : 'text-red-500'} font-medium w-full`">
						{{ total_daily_inc_admin >= 100 ? Math.floor(total_daily_inc_admin - 100) : total_daily_inc_admin.toFixed(1)
						}}% {{
	total_daily_inc_admin >= 100 ? 'more than yesterday.' : 'of yesterday.'
}}</span>
				</p>
				<radial-progress v-else :textclr="`secondary`" :amount="Number(total_daily_inc_admin!.toFixed(1))" />
			</div>

			<!-- total applicants -->
			<div class="containers total_applicants px-4 flex gap-2 items-center justify-between w-[70%] h-full">
				<p class="flex flex-col gap-2">
					<span class="text-sm text-neutral-500">All Applicants</span>
					<span class="text-4xl font-medium">{{ total_apls?.length }}</span>
				</p>
				<div class="flex flex-col gap- w-3/5 h-full items-center justify-center">
					<span class="text-neutral-500 text-sm">Recent Daily Applicants</span>
					<div v-for="i in [5, 4, 3, 2, 1]" class="flex gap-2 w-full items-center">
						<progress class="progress progress-secondary dark:progress-accent bg-neutral-700 dark:bg-white"
							:value="getAplNumByDay(i)" :max="getMaxDay.maxCount"></progress>
						<span
							:class="i == 0 ? 'w-6 text-md text-secondary tooltip tooltip-secondary tooltip-right' : 'w-6 text-sm tooltip tooltip-secondary tooltip-right'"
							:data-tip="i == 0 ? `Today / GHC${getTotalPaymentByDay(i)}.00` : `${i} days ago / GHC${getTotalPaymentByDay(i)}.00`">{{
								getAplNumByDay(i)
							}}</span>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app';
import { useTasksStore } from '@/store/tasks';
import { useProfileStore } from '@/store/profile';

const info_container = ref()
const is_hover = useElementHover(info_container)
const new_task = ref<string>()
const {
	all_my_apls,
	total_daily_applicants,
	total_daily_applicants_admin,
	total_apls
} = storeToRefs(useAppStore())

const { loading_task, _tasks, done_task } = storeToRefs(useTasksStore())
const { role } = storeToRefs(useProfileStore())
const { $formatDate, $SB } = useNuxtApp()

function getAplNumByDay(num: number) {
	// num == number of days from today
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(today.getDate() - num);

	const yesterdayFormatted = useNuxtApp().$formatDate(yesterday);

	const yesterday_apls = total_apls.value.filter(
		(apl) => useNuxtApp().$formatDate(new Date(apl.created_at!)) === yesterdayFormatted
	).length;

	return yesterday_apls;
}

function getTotalPaymentByDay(num: number) {
	const today = new Date();
	const numDaysAgo = new Date(today);
	numDaysAgo.setDate(today.getDate() - num);

	let totalPayments = total_apls.value.filter(apl => $formatDate(new Date(apl.created_at!)) == $formatDate(numDaysAgo)).map(apl => apl.totalPayment)

	let sum = 0
	for (let ii = 0; ii < totalPayments.length; ii++) {
		const payment = totalPayments[ii];
		if (!isNaN(payment)) sum += payment
	}

	return sum
}

const getMaxDay = computed(() => {
	const today = new Date();
	const fiveDaysAgo = new Date(today);
	fiveDaysAgo.setDate(today.getDate() - 5);

	const aplsByDay: { [date: string]: number } = {}; // Object to store counts by date

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

	console.log({ maxCount, daysAgo: daysAgoMaxCount });

	return { maxCount, daysAgo: daysAgoMaxCount };
})

const total_apl_perc = computed(() => {
	return ((all_my_apls.value.length / total_apls.value.length) * 100) || 0
})

const total_perc_inc = computed(() => {
	return ((total_daily_applicants.value.length / total_daily_applicants_admin.value.length) * 100) || 0
})

const total_daily_inc = computed(() => {
	let yesterday_apls = all_my_apls.value.filter(apl => $formatDate(new Date(apl.created_at!)) === $formatDate(new Date(Date.now() - 86400000)))

	if (yesterday_apls.length == 0 || total_daily_applicants.value.length == 0) {
		return 0
	} else {
		if (yesterday_apls.length < total_daily_applicants.value.length) return ((yesterday_apls.length / total_daily_applicants.value.length) * 100)
		if (yesterday_apls.length > total_daily_applicants.value.length) return ((total_daily_applicants.value.length / yesterday_apls.length) * 100)
		if (yesterday_apls.length = total_daily_applicants.value.length) return 0
		return 0
	}
})
const total_daily_inc_admin = computed(() => {
	let yesterday_apls = total_apls.value.filter(apl => $formatDate(new Date(apl.created_at!)) === $formatDate(new Date(Date.now() - 86400000)))

	if (yesterday_apls.length == 0 || total_daily_applicants_admin.value.length == 0) {
		return 0
	} else {
		if (yesterday_apls.length < total_daily_applicants_admin.value.length) return ((yesterday_apls.length / total_daily_applicants_admin.value.length) * 100)
		if (yesterday_apls.length > total_daily_applicants_admin.value.length) return ((total_daily_applicants_admin.value.length / yesterday_apls.length) * 100)
		if (yesterday_apls.length = total_daily_applicants_admin.value.length) return 0
		return 0
	}
})

const handleTask = async () => {
	let currentSession = await $SB.auth.getSession()
	await useTasksStore().sendTasks({
		body: new_task.value!,
		user_id: currentSession.data.session!.user.id
	});
	new_task.value = ''
	useTasksStore().setDoneTask(true)
}


const done_tasks = computed(() => {
	return _tasks.value.filter(task => task.done)
})
const undone_tasks = computed(() => {
	return _tasks.value.filter(task => !task.done)
})
</script>

<style scoped>
/* .containers {
	@apply rounded-xl bg-neutral-800;
} */
</style>