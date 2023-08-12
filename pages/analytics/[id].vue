<template>
	<div class="w-full h-full rounded-2xl overflow-y-auto" id="style-2">
		<div
			class="w-full min-h-full rounded-s-2xl bg-neutral-800 dark:bg-neutral-50 dark:shadow-xl col-span-full row-span-full p-3 overflow-y-auto text-justify relative flex flex-col gap-5"
			id="style-1">


			<h1 class="w-full flex justify-between items-center">
				<span class="font-bold text-3xl">{{ profiles.find(user => user.id == id)?.fullname }} ({{
					total_daily_applicants.length }})</span>


				<DatePicker dark :color="'purple'" is-dark v-model="date" mode="date">
					<template #default="{ togglePopover }">
						<span @click="togglePopover"
							class="font-bold text-3xl bg-neutral-900 px-2 py-1 rounded-xl hover:text-secondary cursor-pointer">{{
								useNuxtApp().$formatDateWords(date)
							}}
						</span>
					</template>
				</DatePicker>



				<span class="font-bold text-3xl">GHC {{ today_sales }}.00</span>
			</h1>

			<div class="grid grid-cols-3 gap-3">
				<div class="bg-white text-black text-center font-bold rounded-xl flex justify-between px-2" @click="() => {
					useViewAplStore().setID(apl.apl_id!)
					$router.push(`/applicant/${apl.apl_id}`)
				}" v-for="apl in total_daily_applicants">
					<span class="flex-1 truncate trucate- text-ellipsis text-left">{{ apl.fullName }}</span>
					<span class="">GHC {{ apl.totalPayment }}.00</span>
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

const { total_apls } = storeToRefs(useAppStore())
const { profiles } = storeToRefs(useProfileStore())
const { USER_ID: id } = storeToRefs(useViewAplStore())
const date = ref(new Date())

const total_daily_applicants = computed(() => {
	return total_apls.value.filter(apl => apl.user_id == id.value).filter(apl => useNuxtApp().$formatDate(date.value) == useNuxtApp().$formatDate(new Date(apl.created_at!)))
});

const today_sales = computed(() => {
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

</script>

<style scoped></style>