<template>
	<!-- <div v-if="!useAppStore().is_mobile" class="__dashboard w-full h-full grid grid-cols-12 gap-1 grid-rows-15">
		<HeroDash class="dash_item" />
		<Calendar class="dash_item" />
		<UsersDash class="dash_item" />
		<AplInfoDash class="dash_item" />
		<MostRecentApls class="dash_item" />
		<AplStats class="dash_item" />
	</div>

	<div v-else class="__dashboard w-full h-full grid grid-cols-12 gap-1 grid-rows-15">
	</div> -->
	<div class="w-full h-full flex flex-col text-black">

		<header class=" pt-1 w-fit text-black flex flex-col">
			<div class="flex flex-col w-fit">
				<progress class="progress progress-secondary w-full border-2 border-black rounded-none" :max="12"
					:value="new Date().getMonth() + 1"></progress>
				<span class="font-bold uppercase text-sm">
					{{ $formatDateWords(new Date()) }}
				</span>
			</div>
			<span class="font-bold uppercase">
				Hi, {{ profile?.fullname }}, lets be productive today!
			</span>
		</header>

		<section class="flex-1 flex gap-5 pr-5 pb-[10px]">
			<div class="flex flex-col w-full min-h-full">

				<div class="flex w-full pb-2 font-semibold">
					<section class="w-full text-black">Employee Username: {{ profile?.username }}</section>
					<section class="w-full text-black">Employee Location: {{ profile?.location?.toUpperCase() }}</section>
				</div>

				<div class="flex gap-4 flex-1">

					<div
						class="transition-all duration-100 ease-out hover:shadow-neo-box hover:-translate-y-1 flex-1 bg-white border-2 border-black hover:bg-purple-100 relative flex p-3 min-h-full">
						<div class="absolute top-4 left-4 border-2 border-black px-2 py-1 bg-white">
							<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256">
								<g fill="black">
									<path
										d="M168 144a40 40 0 1 1-40-40a40 40 0 0 1 40 40ZM64 56a32 32 0 1 0 32 32a32 32 0 0 0-32-32Zm128 0a32 32 0 1 0 32 32a32 32 0 0 0-32-32Z"
										opacity=".2" />
									<path
										d="M244.8 150.4a8 8 0 0 1-11.2-1.6A51.6 51.6 0 0 0 192 128a8 8 0 0 1 0-16a24 24 0 1 0-23.24-30a8 8 0 1 1-15.5-4A40 40 0 1 1 219 117.51a67.94 67.94 0 0 1 27.43 21.68a8 8 0 0 1-1.63 11.21ZM190.92 212a8 8 0 1 1-13.85 8a57 57 0 0 0-98.15 0a8 8 0 1 1-13.84-8a72.06 72.06 0 0 1 33.74-29.92a48 48 0 1 1 58.36 0A72.06 72.06 0 0 1 190.92 212ZM128 176a32 32 0 1 0-32-32a32 32 0 0 0 32 32Zm-56-56a8 8 0 0 0-8-8a24 24 0 1 1 23.24-30a8 8 0 1 0 15.5-4A40 40 0 1 0 37 117.51a67.94 67.94 0 0 0-27.4 21.68a8 8 0 1 0 12.8 9.61A51.6 51.6 0 0 1 64 128a8 8 0 0 0 8-8Z" />
								</g>
							</svg>
						</div>
						<div class="flex-1 flex items-end font-bold text-sm">Total Applicants</div>
						<div class="flex-1 flex justify-end font-bold text-[4rem]">{{ apls.length }}</div>
					</div>

					<div onclick="show_todays_apl.showModal()"
						class="transition-all duration-100 ease-out hover:shadow-neo-box hover:-translate-y-1 flex-1 bg-white border-2 border-black hover:bg-purple-100 relative flex p-3">
						<div class="absolute top-4 left-4 border-2 border-black px-2 py-1 bg-white">
							<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256">
								<path fill="currentColor"
									d="M256 136a8 8 0 0 1-8 8h-16v16a8 8 0 0 1-16 0v-16h-16a8 8 0 0 1 0-16h16v-16a8 8 0 0 1 16 0v16h16a8 8 0 0 1 8 8Zm-57.87 58.85a8 8 0 0 1-12.26 10.3C165.75 181.19 138.09 168 108 168s-57.75 13.19-77.87 37.15a8 8 0 0 1-12.25-10.3c14.94-17.78 33.52-30.41 54.17-37.17a68 68 0 1 1 71.9 0c20.65 6.76 39.23 19.39 54.18 37.17ZM108 152a52 52 0 1 0-52-52a52.06 52.06 0 0 0 52 52Z" />
							</svg>
						</div>
						<div class="flex-1 flex items-end font-bold text-sm">Today's Applicants</div>
						<div class="flex-1 flex justify-end font-bold text-[4rem]">{{ daily_apls.length }}</div>

						<Teleport to="body">
							<dialog id="show_todays_apl" class="modal">
								<div
									class="modal-box min-w-[40%] h-full max-h-[90%] bg-white rounded-none border-black border-2 overflow-y-auto">
									<header class="flex justify-between items-center border-2 border-black bg-gold-300 px-3 py-2">
										<span class="font-bold uppercase text-xl">Today's Applicants</span>
										<span class="font-bold text-3xl">{{ daily_apls.length }}</span>
									</header>

									<div class="flex flex-col gap-3 pt-3">
										<div v-for="(apl, i) in $sortByRecency(daily_apls)" :key="i"
											class="w-full h-20 hover:bg-gold-100 bg-white border-2 border-black transition-all duration-200 ease-out hover:-translate-y-1 cursor-pointer hover:shadow-neo-box flex text-black justify-between items-center gap-2 relative"
											@click="() => {
												useViewAplStore().$patch({ APL_ID: apl.apl_id });
												$router.push(`/applicant/${apl.apl_id}`)
											}">
											<div class="absolute top-1 right-1 font-bold text-sm">{{ i + 1 }}</div>

											<div class="h-full aspect-square">
												<img v-if="daily_urls?.length! > 0"
													:src="daily_urls![i].signedUrl !== null ? daily_urls![i].signedUrl : '/svg/image.svg'">
											</div>

											<div class="font-bold w-full flex flex-col">
												<span class="w-[300px] truncate">{{ apl.fullName }}</span>
												<span class="">GHC {{ apl.totalPayment }}.00</span>
												<span class="text-right w-full pr-2">{{ $formatDateTime(new Date(apl.created_at!)) }}</span>
											</div>
										</div>

									</div>

								</div>
								<form method="dialog" class="modal-backdrop">
									<button>close</button>
								</form>
							</dialog>
						</Teleport>
					</div>

					<div
						class="transition-all duration-100 ease-out hover:shadow-neo-box hover:-translate-y-1 flex-1 bg-white border-2 border-black hover:bg-purple-100 relative flex p-3">
						<div class="absolute top-4 left-4 border-2 border-black px-2 py-1 bg-white">
							<SvgsCedis :classer="'w-8 aspect-square'" />
						</div>
						<div class="flex-1 flex items-end font-bold text-sm">Today's Sales</div>
						<div class="flex-1 flex justify-end font-bold text-[4rem]">{{ today_sales }}</div>
					</div>

				</div>
			</div>

			<div
				class="transition-all duration-100 ease-out hover:shadow-neo-box hover:-translate-y-1 w-[400px] h-full border-2 border-black p-2 px-3 flex flex-col gap-2 bg-gold-200 relative">
				<div class="absolute -top-7 text-sm font-bold uppercase left-0">Account Summary & Analysis</div>

				<div class="bg-white border-2 border-black flex flex-1 items-center pl-2">
					<!-- icon -->
					<div class="h-full aspect-square flex justify-center items-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
							<path fill="currentColor"
								d="M2 21V5h5.15L9 3h6l1.85 2H22v16H2Zm2-2h16V7h-4.05l-1.825-2h-4.25L8.05 7H4v12Zm8-6Zm-4 4h8v-.55q0-1.125-1.1-1.788T12 14q-1.8 0-2.9.663T8 16.45V17Zm4-4q.825 0 1.413-.588T14 11q0-.825-.588-1.413T12 9q-.825 0-1.413.588T10 11q0 .825.588 1.413T12 13Z" />
						</svg>
					</div>

					<div class="w-full flex flex-col items-end justify-between p-1">
						<span class="text-sm font-bold">Registered Applicants</span>
						<span class="text-2xl font-bold">{{ confirmed_apls.length }}</span>
					</div>
				</div>

				<div class="bg-white border-2 border-black flex flex-1 items-center pl-2">
					<!-- icon -->
					<div class="h-full aspect-square flex justify-center items-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
							<path fill="currentColor"
								d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h8q.425 0 .713.288T14 4q0 .425-.288.713T13 5H5v14h14v-8q0-.425.288-.713T20 10q.425 0 .713.288T21 11v8q0 .825-.588 1.413T19 21H5ZM17 7h-1q-.425 0-.713-.288T15 6q0-.425.288-.713T16 5h1V4q0-.425.288-.713T18 3q.425 0 .713.288T19 4v1h1q.425 0 .713.288T21 6q0 .425-.288.713T20 7h-1v1q0 .425-.288.713T18 9q-.425 0-.713-.288T17 8V7Zm-5.75 9L9.4 13.525q-.15-.2-.4-.2t-.4.2l-2 2.675q-.2.25-.05.525T7 17h10q.3 0 .45-.275t-.05-.525l-2.75-3.675q-.15-.2-.4-.2t-.4.2L11.25 16Zm.75-4Z" />
						</svg>
					</div>

					<div class="w-full flex flex-col items-end justify-between p-1">
						<span class="text-sm font-bold">Incomplete Pics</span>
						<span class="text-2xl font-bold">{{ incomplete_apl_pics.length }}</span>
					</div>
				</div>

				<div class="bg-white border-2 border-black flex flex-1 items-center pl-2">
					<!-- icon -->
					<div class="h-full aspect-square flex justify-center items-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48">
							<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4">
								<path d="M40 23v-9L31 4H10a2 2 0 0 0-2 2v36a2 2 0 0 0 2 2h12" />
								<path d="m26 38l6 5l9-11M30 4v10h10" />
							</g>
						</svg>
					</div>

					<div class="w-full flex flex-col items-end justify-between p-1">
						<span class="text-sm font-bold">Registered Applicants</span>
						<span class="text-2xl font-bold">{{ apls.filter(apl => apl.pconf_code).length }}</span>
					</div>
				</div>

			</div>
		</section>

		<section class="flex-1 flex gap-5 pr-5 py-[10px]">
			<!-- requests -->
			<div
				class="transition-all duration-100 ease-out hover:shadow-neo-box hover:-translate-y-1 flex flex-col w-full h-full border-2 border-black bg-purple-300 p-3">
				<!-- title -->
				<div class="w-full h-20 flex flex-col gap-2">
					<div class="flex justify-between">
						<span class="font-bold">Recent Requests</span>
						<select
							class="select bg-white rounded-none focus:border-2 focus:border-black w-[100px] outline outline-2 outline-black select-xs"
							v-model="status">
							<option value="pending" selected>pending</option>
							<option value="approved">approved</option>
							<option value="rejected">rejected</option>
						</select>
					</div>

					<div
						class="px-3 items-center flex justify-between w-full border-t-2 border-x-2 bg-purple-200 border-black h-full">
						<span class="uppercase font-bold">#</span>
						<span class="uppercase w-[200px] font-bold">Name</span>
						<span class="uppercase font-bold">Created At</span>
						<span class="uppercase font-bold">Type</span>
						<span class="uppercase font-bold">Status</span>
					</div>
				</div>

				<div class="bg-white flex-1 border-2 border-black max-h-[150px] flex flex-col overflow-y-auto px-4">

					<div v-if="recent_req.length > 0"
						:class="['w-full h-10 font-bold border-black flex justify-between items-center', i == recent_req.length - 1 ? 'border-b-0' : 'border-b-2']"
						v-for="(req, i) in recent_req" :key="i">
						<span class="font-bold">{{ i + 1 }}</span>
						<p class="truncate w-[200px]">{{ req.fullName }}</p>
						<p class="">{{ $formatDate(new Date(req.created_at!)) }}</p>
						<p v-if="req.modify_type == 'edit'" class="bg-blue-300 px-2 outline outline-2 outline-black">{{
							req.modify_type }}</p>
						<p v-if="req.modify_type == 'delete'" class="bg-red-300 px-2 outline outline-2 outline-black">{{
							req.modify_type }}</p>
						<p v-if="req.modify_type == 'discount'" class="bg-purple-300 px-2 outline outline-2 outline-black">{{
							req.modify_type }}</p>
						<p class="">{{ req.status }}</p>
					</div>

					<div v-else class="w-full h-full flex justify-center items-center">
						<SvgsSadFace class="w-14 aspect-square" />
						<span class="font-bold uppercase text-xl">No Recent Requests</span>
					</div>
				</div>

			</div>

			<!-- tasks -->
			<div
				class="transition-all duration-100 ease-out hover:shadow-neo-box hover:-translate-y-1 w-[400px] h-full border-2 border-black p-2 px-3 flex flex-col gap-2 bg-indigo-200">
				<div class="w-full flex justify-between">
					<span class="font-bold">Tasks</span>
					<span class="font-bold bg-indigo-100 border-2 border-black px-3 tracking-widest">{{ tasks.filter(t =>
						t.done).length
					}}/{{
	tasks.length
}}</span>
				</div>
				<div class="flex flex-col w-full gap-2 border-2 border-black h-full">
					<textarea name="" id="" class="w-full h-full resize-none focus:outline-none px-3 py-2 font-bold"
						placeholder="Create a new task!" v-model="task.body"></textarea>
				</div>
				<button @click="async () => { task.body ? await handleTaskSend() : null; }"
					class="flex flex-col w-full gap-2 border-2 border-black h-20 transition-all duration-100 ease-out hover:-translate-y-1 hover:shadow-neo-box bg-indigo-100 active:bg-gold-300 hover:bg-secondary justify-center items-center font-bold text-2xl hover:uppercase">
					<span class="loading loading-infinity loading-lg" v-if="loading_task"></span>
					<span class="" v-else>Send</span>
				</button>
			</div>
		</section>

	</div>
</template>

<script setup lang='ts'>
import { useTitle } from '@vueuse/core';
import { Applicant, Requests, Task } from '@/interfaces/interfaces';
import { storeToRefs } from 'pinia';
import { useProfileStore } from '@/store/profile';
import { useAppStore } from '@/store/app';
import { useAplStore } from '@/store/apl';
import { useRequestStore } from '@/store/requests';
import { useTasksStore } from '@/store/tasks';
import { useNotif } from '@/store/notif_service';
import { useViewAplStore } from '@/store/viewApl';

useTitle('EG Datapoint | Dashboard')

const { profile, role } = storeToRefs(useProfileStore())
const { my_requests } = storeToRefs(useRequestStore())
const { _tasks: tasks, loading_task } = storeToRefs(useTasksStore())
const task = reactive<Task>({
	body: '',
	user_id: useSupabaseUser().value?.id!,
})
watchEffect(() => {
	if (!loading_task.value) {
		task.body = ''
	}
})
const { all_my_apls: apls, total_apls, total_daily_applicants: daily_apls, today_sales, daily_urls } = storeToRefs(useAppStore())
const status = ref('pending')
const recent_req = computed(() => sortByRecency(my_requests.value).filter(req => req.status == status.value).slice(0, 3))
const confirmed_apls = computed(() => apls.value.filter(apl => apl.pconf_code))
const incomplete_apl_pics = computed(() => {
	const filtered: { apl: Applicant, type: string }[] = []
	apls.value.forEach(apl => {
		const type = useAplStore().typeOfApl(apl)
		const if_pics = ifPics(apl, type)
		if (if_pics) {
			filtered.push(if_pics)
		}
	});
	return filtered
})

function ifPics(apl: Applicant, type: "Family"
	| "With Kids Only"
	| "With Spouse Only"
	| "Single"
	| undefined) {
	if (type == 'Family') {
		if (apl.aplImg_path.primePath.length == 0 || apl.aplImg_path.secPath.length == 0 || apl.aplImg_path.wardsPath.length == 0) {
			return { apl, type }
		} else {
			return null
		}
	} else if (type == 'Single') {
		if (apl.aplImg_path.primePath.length == 0) {
			return { apl, type }
		} else {
			return null
		}
	} else if (type == 'With Kids Only') {
		if (apl.aplImg_path.primePath.length == 0 || apl.aplImg_path.wardsPath.length == 0) {
			return { apl, type }
		} else {
			return null
		}
	} else if (type == 'With Spouse Only') {
		if (apl.aplImg_path.primePath.length == 0 || apl.aplImg_path.secPath.length == 0) {
			return { apl, type }
		} else {
			return null
		}
	}
}

function sortByRecency(req: Requests[]): Requests[] {
	return req.sort(
		(a, b) =>
			new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime(),
	);
}

async function handleTaskSend() {
	try {
		let bool = await useTasksStore().sendTasks(task)
		if (!bool) { throw new Error('Task not sent!') }
		useNotif().notify('Task sent!', 'success')
		task.body = ''
	} catch (error: any) {
		alert(error)
		useNotif().notify(error + ' Check Internet Connection and try again!', 'error')
	}
}

const path = computed(() => {
	if (useNuxtApp().$sortByRecency(daily_apls.value).length >= 5) {
		return useNuxtApp().$sortByRecency(daily_apls.value).map(apl => apl.aplImg_path.primePath[0]).slice(0, 5)
	} else {
		return useNuxtApp().$sortByRecency(daily_apls.value).map(apl => apl.aplImg_path.primePath[0])
	}
})
const path_all = computed(() => {
	return useNuxtApp().$sortByRecency(daily_apls.value).map(apl => apl.aplImg_path.primePath[0])
})

const path_admin = computed(() => {
	if (total_apls.value.length >= 5) {
		return useNuxtApp().$sortByRecency(total_apls.value).map(apl => apl.aplImg_path.primePath[0]).slice(0, 5)
	} else {
		return useNuxtApp().$sortByRecency(total_apls.value).map(apl => apl.aplImg_path.primePath[0])
	}
})

const URLs = ref<{
	error: string | null;
	path: string | null;
	signedUrl: string;
}[] | null | undefined>()


onBeforeMount(() => {
	onBeforeMount(async () => {
		await loadUrls()
	})

	let loading = ref(false)
	async function loadUrls() {
		loading.value = true
		try {
			const APLS = await useAppStore().getTotalApls()

			if (!role.value) {
				if (daily_apls.value.length == 0) return
				let { data, error } = await useNuxtApp().$SB.storage.from('applicants').createSignedUrls(path.value, 10)
				let { data: data_all, error: err } = await useNuxtApp().$SB.storage.from('applicants').createSignedUrls(path_all.value, 10)
				// console.log(data);

				if (error) throw error
				if (err) throw err
				loading.value = false
				URLs.value = data

				useAppStore().$patch({
					daily_urls: data_all
				})
				// console.log(URLs.value);
			} else if (role.value) {
				if (APLS!.length == 0) return
				let { data, error } = await useNuxtApp().$SB.storage.from('applicants').createSignedUrls(path_admin.value, 10)
				// console.log(data);

				if (error) throw error
				loading.value = false
				URLs.value = data
				// console.log(URLs.value);
			}
		} catch (error) {
			console.log(error);
			loading.value = false
		}

	}
})
</script>

<style scoped>
.dash_item {
	opacity: 0;
	transform: scale(.8);
}
</style>

<style scoped>
.griddy {
	display: grid;
}
</style>