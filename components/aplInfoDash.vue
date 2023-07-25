<template>
	<div class="__apl_info col-span-6 row-span-8 flex flex-col gap-5 p-2">
		<div class="flex w-full h-full gap-5">
			<!-- total applicants -->
			<div class="containers total_applicants px-4 flex items-center justify-between w-full h-full">
				<p class="flex flex-col gap-2">
					<span class="text-sm">All Applicants</span>
					<span class="text-2xl font-medium">{{ all_my_apls?.length }}</span>
					<span :class="`text-xs ${total_perc_inc >= 50 ? 'text-green-500' : 'text-red-500'} font-medium`">+{{
						total_perc_inc.toFixed(1) }}% Inc.</span>
				</p>
				<radial-progress :textclr="'primary'" :amount="Number(total_apl_perc.toFixed(1))" />
			</div>

			<!-- total daily applicants -->
			<div class="containers total_applicants px-4 flex items-center justify-between w-full h-full">
				<p class="flex flex-col gap-2">
					<span class="text-sm">Today's Applicants</span>
					<span class="font-medium text-2xl">{{ total_daily_applicants?.length }}</span>
					<span :class="`text-xs ${total_daily_inc >= 100 ? 'text-green-500' : 'text-red-500'} font-medium`">
						<span v-if="total_daily_inc < 100">-</span>
						<span v-if="total_daily_inc > 100">+</span>
						{{ total_daily_inc.toFixed(1) }}%
						<span v-if="total_daily_inc < 100">Dec.</span>
						<span v-if="total_daily_inc >= 100">Inc.</span>
					</span>
				</p>
				<radial-progress :textclr="`secondary`" :amount="Number(total_daily_inc.toFixed(1))" />
			</div>
		</div>

		<div class="flex w-full h-full gap-5">
			<!-- tasks -->
			<div class="containers total_applicants flex items-center px-3 justify-between w-[70%] h-full gap-4">
				<p class="flex flex-col gap-2 h-full w-full justify-center">
					<textarea v-model="new_task" class="textarea text-sm h-[80%] w-full"
						placeholder="Create a new Task..."></textarea>
				</p>

				<div v-if="!new_task" class="flex flex-col items-center gap-2 w-fit">
					<span
						class="hover:text-accent cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out text-xs whitespace-nowrap">Tasks
						Done</span>
					<radial-progress :textclr="`accent`"
						:amount="Number(((done_tasks.length / my_tasks.length) * 100).toFixed(1))" />
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

const new_task = ref<string>()
const { all_my_apls, total_daily_applicants, total_apls } = storeToRefs(useAppStore())
const { loading_task, my_tasks, done_task } = storeToRefs(useTasksStore())
const { $formatDate, $curr_session } = useNuxtApp()

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

const handleTask = async () => {
	await useTasksStore().sendTasks({
		body: new_task.value!,
		user_id: $curr_session.value.user.id!
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