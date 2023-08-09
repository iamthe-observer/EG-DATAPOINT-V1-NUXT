<template>
	<div class="w-full h-full flex flex-col rounded-2xl pb-2">
		<div
			class="w-full h-full rounded-2xl bg-neutral-800 dark:bg-neutral-50 dark:shadow-xl col-span-full row-span-full p-10 overflow-y-auto text-justify relative flex flex-col"
			id="style-1">

			<div class="flex justify-center items-center gap-2">
				<DatePicker @dayclick="" dark :color="'purple'" is-dark v-model="date" mode="date">
					<template #default="{ togglePopover }">
						<span @click="togglePopover" class="text-white bg-blue-900 min-w-[100px]">{{ date ? $formatDateWords(new
							Date(date!)) :
							''
						}}</span>
					</template>
				</DatePicker>

				<select v-model="curr_user"
					class="select w-fit select-sm rounded-full bg-[rgb(13,13,13)] dark:bg-neutral-50 dark:text-black">
					<option selected value="all">All Users</option>
					<option v-for="user in profiles" :value="user.id">{{ `${user.fullname || 'User'} (${total_apls.filter(apl =>
						apl.user_id
						==
						user.id).length})` }}</option>
				</select>
			</div>


			<div class="flex-1 grid place-items-center">

				<span class="text-4xl">
					{{ get_total_by_date }}
				</span>
			</div>



		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app'
import { useProfileStore } from '@/store/profile'

const { total_apls } = storeToRefs(useAppStore())
const { profiles } = storeToRefs(useProfileStore())
const date = ref<Date | null>(new Date())
const curr_user = ref(useSupabaseUser().value?.id)

const { $formatDate: FD } = useNuxtApp()

const get_total_by_date = computed(() => {
	let aplsByDay = total_apls.value.filter(apl => apl.user_id == curr_user.value).filter(apl => FD(new Date(apl.created_at!)) == FD(new Date(date.value!)))

	if (aplsByDay.length > 0) {
		let sum = 0;
		for (let i = 0; i < aplsByDay!.length; i++) {
			const payment = aplsByDay![i].totalPayment;
			if (!isNaN(payment)) {
				sum += payment;
			}
		}
		return sum;
	} else {
		return 0;
	}

})

</script>
