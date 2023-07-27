<template>
	<div class="__apl_info col-span-6 row-span-8 flex flex-col gap-5 p-2">
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
					<span :class="`text-xs ${total_daily_inc >= 50 ? 'text-green-500' : 'text-red-500'} font-medium w-2/3`">+{{
						total_daily_inc.toFixed(1) }}% more than yesterday.</span>
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
					<span class="w-min mx-auto font-medium text-2xl">{{ total_daily_applicants?.length }}</span>
					<span
						:class="`text-xs text-center ${total_daily_inc >= 50 ? 'text-green-500' : 'text-red-500'} font-medium w-full`">+{{
							total_daily_inc.toFixed(1) }}% more than yesterday.</span>
				</p>
				<radial-progress v-else :textclr="`secondary`" :amount="Number(total_daily_inc!.toFixed(1))" />
			</div>

			<!-- total applicants -->
			<div class="containers total_applicants px-4 flex gap-2 items-center justify-between w-[70%] h-full">
				<p class="flex flex-col gap-2">
					<span class="text-sm text-neutral-500">All Applicants</span>
					<span class="text-2xl font-medium">{{ total_apls?.length }}</span>
					<!-- <span :class="`text-xs ${total_perc_inc >= 50 ? 'text-green-500' : 'text-red-500'} font-medium`">+{{
						total_perc_inc.toFixed(1) }}% coverage.</span> -->
				</p>
				<!-- <radial-progress :textclr="'primary'" :amount="Number(total_apl_perc.toFixed(1))" /> -->
				<div class="flex flex-col gap-2 w-3/5 h-full items-center justify-center">
					<progress class="progress progress-secondary bg-neutral-700 w-full" value="0" max="100"></progress>
					<progress class="progress progress-secondary bg-neutral-700 w-full" value="5" max="100"></progress>
					<progress class="progress progress-secondary bg-neutral-700 w-full" value="10" max="100"></progress>
					<progress class="progress progress-secondary bg-neutral-700 w-full" value="40" max="100"></progress>
					<progress class="progress progress-secondary bg-neutral-700 w-full" value="70" max="100"></progress>
					<progress class="progress progress-secondary bg-neutral-700 w-full" value="100" max="100"></progress>
				</div>
			</div>

		</div>

		<div v-if="!role" class="flex w-full h-full gap-5">
			<!-- tasks -->
			<div class="containers total_applicants flex items-center px-3 justify-between w-[70%] h-full gap-4">
				<p class="flex flex-col gap-2 h-full w-full justify-center">
					<textarea v-model="new_task" class="textarea outline outline-4 outline-neutral-700 text-sm h-[80%] w-full"
						placeholder="Create a new Task..."></textarea>
				</p>

				<div v-if="!new_task" class="flex flex-col items-center gap-2 w-fit">
					<span
						class="hover:text-accent cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out text-xs whitespace-nowrap">Tasks
						Done</span>
					<radial-progress :textclr="`accent`"
						:amount="Number(((done_tasks.length / my_tasks.length) * 100).toFixed(1)) || 0">
						{{ `${done_tasks.length}/${my_tasks.length}` }}
					</radial-progress>
				</div>

				<div v-else class="join join-vertical">
					<button @click="handleTask" class="btn join-item btn-md btn-success">
						<span v-if="!loading_task" class="">Save</span>
						<span v-else class="loading loading-ring loading-md"></span>
					</button>
					<button @click="new_task = ''" class="btn join-item btn-md btn-error">Cancel</button>
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



			<div class="containers total_applicants px-4 flex items-center justify-between flex-1">

			</div>
		</div>
		<div v-else class="flex w-full h-full gap-5">
			<!-- tasks -->
			<div class="containers total_applicants flex items-center px-3 justify-between w-[70%] h-full gap-4">
				<p class="flex flex-col gap-2 h-full w-full justify-center">
					<textarea v-model="new_task" class="textarea outline outline-4 outline-neutral-700 text-sm h-[80%] w-full"
						placeholder="Create a new Task..."></textarea>
				</p>

				<div v-if="!new_task" class="flex flex-col items-center gap-2 w-fit">
					<span
						class="hover:text-accent cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out text-xs whitespace-nowrap">Tasks
						Done</span>
					<radial-progress :textclr="`accent`"
						:amount="Number(((done_tasks.length / my_tasks.length) * 100).toFixed(1)) || 0">
						{{ `${done_tasks.length}/${my_tasks.length}` }}
					</radial-progress>
				</div>

				<div v-else class="join join-vertical">
					<button @click="handleTask" class="btn join-item btn-md btn-success">
						<span v-if="!loading_task" class="">Save</span>
						<span v-else class="loading loading-ring loading-md"></span>
					</button>
					<button @click="new_task = ''" class="btn join-item btn-md btn-error">Cancel</button>
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



			<div class="containers total_applicants px-4 flex items-center justify-between flex-1">

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
	all_total_daily_applicants,
	total_apls
} = storeToRefs(useAppStore())
const { loading_task, my_tasks, done_task } = storeToRefs(useTasksStore())
const { role } = storeToRefs(useProfileStore())
const { $formatDate, $SB } = useNuxtApp()

const total_apl_perc = computed(() => {
	return ((all_my_apls.value.length / total_apls.value.length) * 100) || 0
})

const total_perc_inc = computed(() => {
	return ((total_daily_applicants.value.length / all_total_daily_applicants.value.length) * 100) || 0
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
	return my_tasks.value.filter(task => task.done)
})
const undone_tasks = computed(() => {
	return my_tasks.value.filter(task => !task.done)
})
</script>

<style scoped>
.containers {
	@apply rounded-xl bg-neutral-800;
}
</style>