<template>
	<div class="w-full h-full overflow-hidden flex rounded-xl">
		<div class="w-full h-full rounded-xl flex flex-col gap-2">
			<h1
				class="flex justify-between items-center w-full bg-neutral-700 dark:bg-neutral-100 min-h-[50px] rounded-xl dark:shadow-xl p-2">
				<p class="flex flex-col">
					<span class="text-lg font-bold">{{ request.modified_apl?.fullName }}</span>
					<span class="text-xs text-neutral-400 dark:text-neutral-600">{{ request.body }}</span>
				</p>


				<div class="join">
					<label @click="handleApprove(request)" class="join-item btn btn-success btn-sm">Approve</label>
					<label @click="handleReject(request)" class="join-item btn btn-error btn-sm">Reject</label>
					<label class="join-item btn btn-sm">Close</label>
				</div>
			</h1>

			<div id="style-2" class="flex flex-col overflow-y-auto rounded-xl">
				<section class="flex flex-col gap-2 rounded-s-xl rounded-bl-none relative bg-neutral-800 dark:bg-neutral-50 p-2">
					<p class="flex justify-evenly sticky top-0">
					<div class="flex w-full h-fit items-center group">
						<div class="flex-1 grid h-12 flex-grow place-items-center text-xl uppercase badge font-bold badge-secondary">
							Old
						</div>
						<div class="divider divider-horizontal text-center">
						</div>
						<div class="flex-1 grid h-12 flex-grow place-items-center text-xl uppercase font-bold badge badge-accent">
							New
						</div>
					</div>
					</p>

					<h2 class="mx-auto mt-3 mb-5 text-3xl font-bold">Primary Applicant</h2>


					<Divider>
						<template #modified_apl="props">
							{{ props.original?.plastName }}
						</template>
						Last Name
						<template #apl="props">
							{{ props.edited?.plastName }}
						</template>
					</Divider>
					<Divider>
						<template #modified_apl="props">
							{{ props.original?.pfirstName }}
						</template>
						First Name
						<template #apl="props">
							{{ props.edited?.pfirstName }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ props.original?.potherName }}
						</template>
						Other Name
						<template #apl="props">
							{{ props.edited?.potherName }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ useNuxtApp().$formatDateWords(new Date(props.original?.pdob!)) }}
						</template>
						Date of Birth
						<template #apl="props">
							{{ useNuxtApp().$formatDateWords(new Date(props.edited?.pdob!)) }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ props.original?.pgender }}
						</template>
						Gender
						<template #apl="props">
							{{ props.edited?.pgender }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ props.original?.pcity_ob }}
						</template>
						City Of Birth
						<template #apl="props">
							{{ props.edited?.pcity_ob }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ props.original?.pcountry_ob }}
						</template>
						Country Of Birth
						<template #apl="props">
							{{ props.edited?.pcountry_ob }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ props.original?.pcontact }}
						</template>
						Phone Number
						<template #apl="props">
							{{ props.edited?.pcontact }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ props.original?.pother_contact }}
						</template>
						Next of Kin Contact
						<template #apl="props">
							{{ props.edited?.pother_contact }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ props.original?.pemail }}
						</template>
						Email
						<template #apl="props">
							{{ props.edited?.pemail }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ props.original?.ppassport_number }}
						</template>
						Passport Number
						<template #apl="props">
							{{ props.edited?.ppassport_number }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ props.original?.passport_ex ? useNuxtApp().$formatDateWords(new Date(props.original?.passport_ex!)) : ''
							}}
						</template>
						Passort Expiration <br /> Date
						<template #apl="props">
							{{ props.edited?.passport_ex ? useNuxtApp().$formatDateWords(new Date(props.edited?.passport_ex!)) : '' }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ props.original?.pcountry_live_today }}
						</template>
						Location
						<template #apl="props">
							{{ props.edited?.pcountry_live_today }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ props.original?.psocial_media.facebook }}
						</template>
						Facebook
						<template #apl="props">
							{{ props.edited?.psocial_media.facebook }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ props.original?.psocial_media.instagram }}
						</template>
						Instagram
						<template #apl="props">
							{{ props.edited?.psocial_media.instagram }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ props.original?.psocial_media.twitter }}
						</template>
						Twitter
						<template #apl="props">
							{{ props.edited?.psocial_media.twitter }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ props.original?.pmarital_status }}
						</template>
						Marital Status
						<template #apl="props">
							{{ props.edited?.pmarital_status }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ props.original?.peducation_level }}
						</template>
						Highest Level <br />of Education
						<template #apl="props">
							{{ props.edited?.peducation_level }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ props.original?.children_number }}
						</template>
						Number of Children
						<template #apl="props">
							{{ props.edited?.children_number }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ props.original?.pconf_code }}
						</template>
						Confirmation Code
						<template #apl="props">
							{{ props.edited?.pconf_code }}
						</template>
					</Divider>


				</section>

				<section v-if="request.modified_apl?.slastName"
					class="flex flex-col gap-2 rounded-s-xl rounded-tl-none bg-neutral-800 dark:bg-neutral-50 p-2">
					<h2 class="mx-auto mt-10 mb-5 text-3xl font-bold">Secondary Applicant</h2>
					<Divider>
						<template #modified_apl="props">
							{{ props.original?.slastName }}
						</template>
						Last Name
						<template #apl="props">
							{{ props.edited?.slastName }}
						</template>
					</Divider>
					<Divider>
						<template #modified_apl="props">
							{{ props.original?.sfirstName }}
						</template>
						First Name
						<template #apl="props">
							{{ props.edited?.sfirstName }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ props.original?.sotherName }}
						</template>
						Other Name
						<template #apl="props">
							{{ props.edited?.sotherName }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ useNuxtApp().$formatDateWords(new Date(props.original?.sdob!)) }}
						</template>
						Date of Birth
						<template #apl="props">
							{{ useNuxtApp().$formatDateWords(new Date(props.edited?.sdob!)) }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ props.original?.sgender }}
						</template>
						Gender
						<template #apl="props">
							{{ props.edited?.sgender }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ props.original?.scity_ob }}
						</template>
						City Of Birth
						<template #apl="props">
							{{ props.edited?.scity_ob }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ props.original?.scountry_ob }}
						</template>
						Country Of Birth
						<template #apl="props">
							{{ props.edited?.scountry_ob }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ props.original?.scontact }}
						</template>
						Phone Number
						<template #apl="props">
							{{ props.edited?.scontact }}
						</template>
					</Divider>

				</section>

				<section v-for="(ward, idx) in request.modified_apl?.wards" v-if="request.modified_apl?.wards.length! > 0"
					class="flex flex-col gap-2 rounded-s-xl rounded-tl-none bg-neutral-800 dark:bg-neutral-50 p-2">
					<h2 class="mx-auto mt-10 mb-5 text-3xl font-bold">Ward Applicant {{ idx + 1 }}</h2>
					<Divider>
						<template #modified_apl="props">
							{{ props.original?.wards[idx].wlastName }}
						</template>
						Last Name
						<template #apl="props">
							{{ props.edited?.wards[idx].wlastName }}
						</template>
					</Divider>
					<Divider>
						<template #modified_apl="props">
							{{ props.original?.wards[idx].wfirstName }}
						</template>
						First Name
						<template #apl="props">
							{{ props.edited?.wards[idx].wfirstName }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ props.original?.wards[idx].wotherName }}
						</template>
						Other Name
						<template #apl="props">
							{{ props.edited?.wards[idx].wotherName }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ useNuxtApp().$formatDateWords(new Date(props.original?.wards[idx].wdob!)) }}
						</template>
						Date of Birth
						<template #apl="props">
							{{ useNuxtApp().$formatDateWords(new Date(props.edited?.wards[idx].wdob!)) }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ props.original?.wards[idx].wgender }}
						</template>
						Gender
						<template #apl="props">
							{{ props.edited?.wards[idx].wgender }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ props.original?.wards[idx].wcity_ob }}
						</template>
						City Of Birth
						<template #apl="props">
							{{ props.edited?.wards[idx].wcity_ob }}
						</template>
					</Divider>
					<Divider class="">
						<template #modified_apl="props">
							{{ props.original?.wards[idx].wcountry_ob }}
						</template>
						Country Of Birth
						<template #apl="props">
							{{ props.edited?.wards[idx].wcountry_ob }}
						</template>
					</Divider>

				</section>
			</div>

		</div>


		<input type="checkbox" id="approved" :checked="if_ap" class="modal-toggle" />
		<div class="modal">
			<div
				class="modal-box dark:bg-neutral-50 dark:text-black dark:outline dark:outline-4 dark:outline-green-500 bg-neutral-800 text-white text-center">
				<h3 class="text-lg font-bold">SUCCESS</h3>
				<p class="py-4">Request Approved!</p>
			</div>
			<label @click="$router.push('/database')" class="modal-backdrop" for="approved">Close</label>
		</div>

		<input type="checkbox" id="rejected" :checked="if_rej" class="modal-toggle" />
		<div class="modal">
			<div
				class="modal-box dark:bg-neutral-50 dark:text-black dark:outline dark:outline-4 dark:outline-red-500 bg-neutral-800 text-white text-center">
				<h3 class="text-lg font-bold">SUCCESS</h3>
				<p class="py-4 text-red-500 dark:text-neutral-800">Request Rejected!</p>
			</div>
			<label @click="$router.push('/database')" class="modal-backdrop" for="rejected">Close</label>
		</div>

	</div>
</template>

<script setup lang="ts">
import { useAplStore } from '@/store/apl';
import { Requests } from '@/interfaces/interfaces';
import { storeToRefs } from 'pinia';

const apl_ = useAplStore()
const { curr_compared_request: request } = storeToRefs(apl_)
const { $SB } = useNuxtApp()
const if_rej = ref(false)
const if_ap = ref(false)


onMounted(() => {
	if (!request.value.modified_apl) useNuxtApp().$router.push({ path: '/database' })
});

async function deleteApplicant(req: Requests) {
	try {
		let { data, error } = await useNuxtApp().$SB.from('applicants').delete().eq('apl_id', req.apl_id)
		if (error) throw error

		return await updateRequestType(req, 'approved')
	} catch (error) {
		console.log(error);
	}
}

async function updateRequestType(req: Requests, type: string) {
	try {
		let { data, error } = await useNuxtApp().$SB.from('requests').update({ status: type }).eq('id', req.id)
		if (error) throw error
		return data
	} catch (error) {
		console.log(error);
	}
}

async function approveDiscount(req: Requests) {
	req.modified_apl!.totalPayment = Number(req.body)

	try {
		let { data, error } = await $SB.from('applicants').insert(req.modified_apl).select()
		if (error) throw error
		console.log(data);

		return data
	} catch (error) {
		console.log(error);
	}
}

async function updateApplicant(req: Requests) {
	let apl = req.modified_apl
	try {
		let { data, error } = await $SB
			.from('applicants')
			.update(apl)
			.eq('apl_id', req.apl_id)
			.select()
		if (error) throw error
		console.log(data);
		return data
	} catch (error) {
		console.log(error);
	}
}

async function handleApprove(req: Requests) {
	// type of request
	let ty = req.modify_type

	if (ty == 'delete') {
		await deleteApplicant(req)
		await updateRequestType(req, 'approved')
		if_ap.value = true
	} else if (ty == 'discount') {
		await approveDiscount(req)
		await updateRequestType(req, 'approved')
		if_ap.value = true

	} else if (ty == 'edit') {
		await updateApplicant(req)
		await updateRequestType(req, 'approved')
		if_ap.value = true
	}
}

async function handleReject(req: Requests) {
	let ty = req.modify_type
	if (ty == 'delete') {
		await updateRequestType(req, 'rejected')
		if_rej.value = true
	}
	if (ty == 'discount') {
		await updateRequestType(req, 'rejected')
		if_rej.value = true
	}
	if (ty == 'edit') {
		await updateRequestType(req, 'rejected')
		if_rej.value = true
	}
}

</script>

<style scoped></style>