<template>
	<div class="w-full h-full rounded-2xl overflow-y-auto" id="style-2">
		<div
			class="w-full min-h-full rounded-s-2xl bg-neutral-800 dark:bg-neutral-50 dark:shadow-xl col-span-full row-span-full p-3 overflow-y-auto text-justify relative flex flex-col gap-5"
			id="style-1">

			<header classs="">
				<span class="">Overview</span>
				<!-- loction -->
			</header>

			<div class="w-full grid grid-cols-4 gap-3">
				<span @click="() => {
					useViewAplStore().setUSER(user.id)
					$router.push(`/analytics/${user.id}`);
				}" class="px-2 py-1 rounded-full bg-white text-black font-bold cursor-pointer" v-for="user in profiles">
					{{ user.fullname || 'User' }}
				</span>
			</div>



			<!-- <section class="grid grid-cols-4 w-full gap-5">
				<div
					class="flex justify-center items-center gap-3 p-5 flex-1 bg-neutral-900 dark:bg-neutral-50 min-h-[8rem] rounded-xl shadow-xl">
					<div class="p-3 rounded-full bg-purple-600 bg-opacity-30 w-16 aspect-square"><svg
							xmlns="http://www.w3.org/2000/svg" class="w-full" viewBox="0 0 24 24">
							<path class="fill-purple-700"
								d="M12 22.575q-.2 0-.375-.062T11.3 22.3L9 20H5q-.825 0-1.413-.588T3 18V4q0-.825.588-1.413T5 2h14q.825 0 1.413.588T21 4v14q0 .825-.588 1.413T19 20h-4l-2.3 2.3q-.15.15-.325.213t-.375.062ZM12 12q1.45 0 2.475-1.025T15.5 8.5q0-1.45-1.025-2.475T12 5q-1.45 0-2.475 1.025T8.5 8.5q0 1.45 1.025 2.475T12 12Zm0 8.2l2.2-2.2H19v-1.15q-1.35-1.325-3.138-2.087T12 14q-2.075 0-3.863.763T5 16.85V18h4.8l2.2 2.2Z" />
						</svg></div>
					<p class="flex flex-col">
						<span class="text-xl font-bold">1234</span>
						<span class="text-sm text-neutral-500">Total Applicants</span>
					</p>
				</div>
				<div
					class="flex justify-center items-center gap-3 p-5 flex-1 bg-neutral-900 dark:bg-neutral-50 min-h-[8rem] rounded-xl shadow-xl">
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
						<span class="text-xl font-bold">GHC 1234.00</span>
						<span class="text-sm text-neutral-500">Total Sales</span>
					</p>
				</div>
				<div
					class="flex justify-center items-center gap-3 p-5 flex-1 bg-neutral-900 dark:bg-neutral-50 min-h-[8rem] rounded-xl shadow-xl">
					<div class="p-3 rounded-full bg-secondary bg-opacity-30 w-16 aspect-square"><svg
							xmlns="http://www.w3.org/2000/svg" class="w-full" viewBox="0 0 24 24">
							<path class="fill-secondary"
								d="M12 22.575q-.2 0-.375-.062T11.3 22.3L9 20H5q-.825 0-1.413-.588T3 18V4q0-.825.588-1.413T5 2h14q.825 0 1.413.588T21 4v14q0 .825-.588 1.413T19 20h-4l-2.3 2.3q-.15.15-.325.213t-.375.062ZM5 16.85q1.35-1.325 3.138-2.087T12 14q2.075 0 3.863.763T19 16.85V4H5v12.85ZM12 12q1.45 0 2.475-1.025T15.5 8.5q0-1.45-1.025-2.475T12 5q-1.45 0-2.475 1.025T8.5 8.5q0 1.45 1.025 2.475T12 12Zm0-2q-.625 0-1.063-.438T10.5 8.5q0-.625.438-1.063T12 7q.625 0 1.063.438T13.5 8.5q0 .625-.438 1.063T12 10Zm0 10.2l2.2-2.2H17v-.25q-1.05-.875-2.325-1.312T12 16q-1.4 0-2.675.438T7 17.75V18h2.8l2.2 2.2Zm0-9.775Z" />
						</svg></div>
					<p class="flex flex-col">
						<span class="text-xl font-bold">1234</span>
						<span class="text-sm text-neutral-500">Daily Applicants</span>
					</p>
				</div>
				<div
					class="flex justify-center items-center gap-3 p-5 flex-1 bg-neutral-900 dark:bg-neutral-50 min-h-[8rem] rounded-xl shadow-xl">
					<div class="p-3 rounded-full bg-green-300 bg-opacity-30 w-16 aspect-square"><svg
							xmlns="http://www.w3.org/2000/svg" class="w-full" viewBox="0 0 24 24">
							<g class="fill-green-900">
								<path stroke="currentColor" stroke-width="1.5"
									d="M9.781 3.89c.564-.48.846-.72 1.14-.861a2.5 2.5 0 0 1 2.157 0c.295.14.577.38 1.14.861c.225.192.337.287.457.367a2.5 2.5 0 0 0 .908.376c.141.028.288.04.582.064c.739.058 1.108.088 1.416.197a2.5 2.5 0 0 1 1.525 1.524c.109.309.138.678.197 1.416c.023.294.035.441.063.583c.064.324.192.633.376.907c.08.12.176.232.367.457c.48.564.721.846.862 1.14a2.5 2.5 0 0 1 0 2.157c-.14.294-.381.576-.862 1.14a5.25 5.25 0 0 0-.367.457a2.497 2.497 0 0 0-.376.907c-.028.142-.04.289-.063.583c-.059.738-.088 1.108-.197 1.416a2.5 2.5 0 0 1-1.525 1.524c-.308.11-.677.139-1.416.197c-.294.024-.44.036-.582.064a2.5 2.5 0 0 0-.908.376a5.25 5.25 0 0 0-.456.367c-.564.48-.846.72-1.14.861a2.5 2.5 0 0 1-2.157 0c-.295-.14-.577-.38-1.14-.861a5.263 5.263 0 0 0-.457-.367a2.5 2.5 0 0 0-.908-.376a5.277 5.277 0 0 0-.582-.064c-.739-.058-1.108-.088-1.416-.197a2.5 2.5 0 0 1-1.525-1.524c-.109-.308-.138-.678-.197-1.416a5.186 5.186 0 0 0-.063-.583a2.5 2.5 0 0 0-.376-.907c-.08-.12-.176-.232-.367-.457c-.48-.564-.721-.846-.862-1.14a2.5 2.5 0 0 1 0-2.157c.141-.294.381-.576.862-1.14c.191-.225.287-.337.367-.457a2.5 2.5 0 0 0 .376-.907c.028-.142.04-.289.063-.583c.059-.738.088-1.107.197-1.416A2.5 2.5 0 0 1 6.42 4.894c.308-.109.677-.139 1.416-.197c.294-.024.44-.036.582-.064a2.5 2.5 0 0 0 .908-.376c.12-.08.232-.175.456-.367Z"
									opacity=".5" />
								<path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="m9 15l6-6" />
								<path fill="currentColor" d="M15.5 14.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm-5-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z" />
							</g>
						</svg></div>
					<p class="flex flex-col">
						<span class="text-xl font-bold">GHC 1234.00</span>
						<span class="text-sm text-neutral-500">Daily Sales</span>
					</p>
				</div>
			</section>

			<section class="grid grid-cols-4 w-full min-h-[400px] gap-5">
				<div class="col-span-3 bg-blac min-h-[8rem] rounded-xl shadow-xl">


				</div>
				<div class="bg-black min-h-[8rem] rounded-xl shadow-xl"></div>
			</section>

			<section class="grid grid-cols-8 w-full min-h-[300px] gap-5">
				<div class="col-span-4 bg-black min-h-[8rem] rounded-xl shadow-xl"></div>
				<div class="col-span-2 bg-black min-h-[8rem] rounded-xl shadow-xl"></div>
				<div class="col-span-2 bg-black min-h-[8rem] rounded-xl shadow-xl"></div>
			</section> -->

		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app'
import { useProfileStore } from '@/store/profile'
import { useViewAplStore } from '@/store/viewApl';

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
