<template>
	<div class="w-full h-full relative overflow-y-auto flex flex-col bg-neutral-100">

		<header
			class="sticky top-0 w-full h-fit text-black p-3 px-10 bg-white col-span-full border-b border-black flex justify-between z-[400]">
			<h1 class="text-3xl font-bold">Requests</h1>

			<div class="flex gap-6 items-center bg-white">

			</div>
		</header>

		<div class="sticky top-16 px-10 py-5 flex w-full gap-3">
			<div class="min-w-[25%] flex flex-col gap-2">
				<p @click="req_status = 'pending'"
					:class="['flex items-center justify-between text-black cursor-pointer border border-black px-3 py-1 hover:bg-warning font-semibold hover:shadow-box transition-all duration-150 ease-out', req_status == 'pending' ? 'bg-warning' : 'bg-white']">
					Pending
					<span class="font-bold px-4 border border-black rounded-sm bg-neutral-200">{{ !role ?
						my_requests.filter(req =>
							req.status ==
							'pending').length : requests.filter(req =>
								req.status ==
								'pending').length }}
					</span>
				</p>
				<p @click="req_status = 'approved'"
					:class="['flex items-center justify-between text-black cursor-pointer border border-black px-3 py-1 hover:bg-success font-semibold hover:shadow-box transition-all duration-150 ease-out', req_status == 'approved' ? 'bg-success' : 'bg-white']">
					Approved <span class="font-bold px-4 border border-black rounded-sm bg-neutral-200">
						{{ !role ? my_requests.filter(req => req.status == 'approved').length : requests.filter(req => req.status ==
							'approved').length }}
					</span>
				</p>
				<p @click="req_status = 'rejected'"
					:class="['flex items-center justify-between text-black cursor-pointer border border-black px-3 py-1 hover:bg-error font-semibold hover:shadow-box transition-all duration-150 ease-out', req_status == 'rejected' ? 'bg-error' : 'bg-white']">
					Rejected <span class="font-bold px-4 border border-black rounded-sm bg-neutral-200">
						{{ !role ? my_requests.filter(req => req.status == 'rejected').length : requests.filter(req => req.status ==
							'rejected').length }}
					</span>
				</p>
				<p @click="req_status = 'all'"
					:class="['flex items-center justify-between text-black cursor-pointer border border-black px-3 py-1 hover:bg-primary font-semibold hover:shadow-box transition-all duration-150 ease-out', req_status == 'all' ? 'bg-primary' : 'bg-white']">
					All <span class="font-bold px-4 border border-black rounded-sm bg-neutral-200">
						{{ !role ? my_requests.length : requests.length }}
					</span>
				</p>
			</div>

			<div class="w-full h-fit bg-white border border-black">

				<div v-if="!role"
					v-for="(req, i) in req_status !== 'all' ? my_requests.filter(req => req.status == req_status) : my_requests"
					:key="i"
					:class="['flex min-h-[30px] text-black p-2 border-b cursor-pointer items-center justify-between hover:bg-primary bg-white', i !== val ? 'border-black' : 'border-transparent hover:border-black']">
					<span class="text-xs font-semibold">{{ i + 1 }}</span>
					<p class="flex flex-col items-start w-full pl-6">
						<span class="-truncate truncate w-[80%]">{{ req.body }}</span>
						<span class="flex items-center gap-1">
							<span
								:class="['badge rounded-sm border border-black font-bold text-xs', req.modify_type !== 'edit' ? 'badge-accent' : 'badge-info']">{{
									req.modify_type.toUpperCase() }}</span>
							<span class="font-semibold text-sm">
								{{ req.fullName !== 'Applicant' ? req.fullName : total_apls.find(apl => apl.apl_id ==
									req.apl_id)!.fullName }}
							</span>
						</span>
					</p>

					<span class="flex flex-col items-end">
						<span class="text-sm">{{ $formatDate(new Date(req.created_at!)) }}</span>
						<span class="text-xs">{{ $formatDateTime(new Date(req.created_at!)) }}</span>
					</span>
				</div>

				<div v-else v-for="(req, i) in req_computed" :key="i + 1"
					:class="['group flex min-h-[30px] text-black p-2 border-b cursor-pointer items-center justify-between hover:bg-primary hover:bg-opacity-20 bg-white', i !== val ? 'border-black' : 'border-transparent hover:border-black']">
					<span class="text-xs">{{ i + 1 }}</span>
					<p class="flex flex-col items-start w-full pl-6">
						<span class="-truncate truncate max-w-[600px] font-semibold">
							<span v-if="req.modify_type == 'discount'" class="font-semibold">GHC</span>
							{{ req.body }}
							<span v-if="req.modify_type == 'discount'" class="font-semibold">.00</span>
						</span>
						<span class="flex items-center gap-1">
							<span
								:class="['badge rounded-sm border border-black font-bold text-xs', req.modify_type == 'edit' ? 'badge-info' : '', req.modify_type == 'delete' ? 'badge-accent' : '', req.modify_type == 'discount' ? 'badge-secondary' : '']">{{
									req.modify_type.toUpperCase() }}</span>
							<span class="font-semibold text-sm">
								{{ req.fullName !== 'Applicant' ? req.fullName : total_apls.find(apl => apl.apl_id ==
									req.apl_id)!.fullName }}
							</span>
						</span>
					</p>

					<span class="flex items-center gap-2">
						<div class="flex flex-col items-end">
							<span class="text-sm">{{ $formatDate(new Date(req.created_at!)) }}</span>
							<span class="text-xs">{{ $formatDateTime(new Date(req.created_at!)) }}</span>
						</div>

						<div v-if="role" class="flex flex-col">
							<div class="">
								<svg xmlns="http://www.w3.org/2000/svg" class="w-5 aspect-square" viewBox="0 0 48 48">
									<path class="stroke-green-300 group-hover:stroke-green-500" fill="none" stroke="currentColor"
										stroke-linecap="round" stroke-linejoin="round" stroke-width="4"
										d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd" />
								</svg>
							</div>

							<div class="">
								<svg xmlns="http://www.w3.org/2000/svg" class="w-5 aspect-square" viewBox="0 0 24 24">
									<path fill="currentColor" fill-rule="evenodd" class="fill-red-300 group-hover:fill-red-600"
										d="M2 11.999c0-5.523 4.477-10 10-10s10 4.477 10 10s-4.477 10-10 10s-10-4.477-10-10Zm13.707-3.706a1 1 0 0 1 0 1.414L13.414 12l2.293 2.293a1 1 0 0 1-1.414 1.414L12 13.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L10.586 12L8.293 9.707a1 1 0 0 1 1.414-1.414L12 10.586l2.293-2.293a1 1 0 0 1 1.414 0Z"
										clip-rule="evenodd" />
								</svg>
							</div>
						</div>

					</span>
				</div>

			</div>
		</div>

	</div>
</template>

<script setup lang="ts">
import { useRequestStore } from '@/store/requests'
import { useProfileStore } from '@/store/profile';
import { useAppStore } from '@/store/app';
import { storeToRefs } from 'pinia'

const { requests, my_requests } = storeToRefs(useRequestStore())
const { role } = storeToRefs(useProfileStore())
const { total_apls } = storeToRefs(useAppStore())

const req_status = ref('pending')

const val = computed(() => {
	if (!role.value) {
		return req_status.value !== 'all' ? my_requests.value.filter(req => req.status == req_status.value).length - 1 : my_requests.value.length - 1
	} else {
		return req_status.value !== 'all' ? requests.value.filter(req => req.status == req_status.value).length - 1 : requests.value.length - 1
	}
})

const req_computed = computed(() => {
	if (!role.value) {
		return req_status.value !== 'all' ? my_requests.value.filter(req => req.status == req_status.value) : my_requests.value
	} else {
		return req_status.value !== 'all' ? requests.value.filter(req => req.status == req_status.value) : requests.value
	}
})

</script>

<style scoped></style>