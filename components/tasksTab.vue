<template>
	<div v-if="curr_page == 'tasks' || curr_page == ''"
		class="w-full h-full rounded-xl p-1 overflow-y-hidden flex flex-col">
		<h1 class="py-1 px-1 text-xl font-semibold flex justify-between">
			<span :class="['transition-all duration-300 ease-out', curr_page == 'tasks' ? 'text-4xl' : '']">Tasks</span>

			<select v-model="filter_val" class="select select-xs w-fit max-w-xs dark:bg-neutral-50">
				<option disabled selected>Filter</option>
				<option selected value="false">Not Completed</option>
				<option value="true">Completed</option>
				<option value="all">All</option>
			</select>

			<span class="">{{ curr_filtered_tasks.length }}</span>
		</h1>

		<div v-if="curr_filtered_tasks.length == 0" class="w-full h-full grid place-items-center">
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
				<span class="text-center">No Tasks</span>
			</div>
		</div>

		<div v-else id="style-1" class="bg-neutral-800 dark:bg-neutral-100 flex flex-col gap-3 rounded-xl overflow-y-auto">
			<div class="w-full flex gap-2 justify-between p-2 hover:bg-neutral-700 dark:hover:bg-neutral-200 rounded-xl"
				v-for="(task, i) in curr_filtered_tasks" :key="i">
				<span class="text-neutral-600 w-10 text-xs grid place-items-center">
					<div class="form-control">
						<label class="label cursor-pointer">
							<input @keypress="useTasksStore().updateTask(task.done!, task.id!)" type="checkbox" v-model="task.done"
								class="checkbox checkbox-primary" />
						</label>
					</div>
				</span>
				<span class="flex flex-col justify-center truncate flex-1 overflow-x-hidden text-sm">
					<span :class="['truncate-', task.done ? 'text-neutral-600 line-through' : '']">{{ task.body }}</span>
				</span>
				<div class="flex flex-col text-xs text-right text-neutral-400">
					<span class="">
						{{ $formatDate(new Date(task.created_at!)) }}
					</span>
					<span class="">
						{{ $formatDateTime(new Date(task.created_at!)) }}
					</span>
				</div>
			</div>

		</div>


	</div>
</template>


<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTasksStore } from '@/store/tasks';

const { _tasks } = storeToRefs(useTasksStore())

const filter_val = ref('false')
const curr_filtered_tasks = computed(() => {
	if (filter_val.value == 'all') return _tasks.value.sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime())
	if (filter_val.value == 'true') return _tasks.value.filter(task => task.done == true).sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime())
	if (filter_val.value == 'false') return _tasks.value.filter(task => task.done == false).sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime())
	return []
})

defineProps<{
	curr_page: string
}>()
</script>

<style scoped></style>