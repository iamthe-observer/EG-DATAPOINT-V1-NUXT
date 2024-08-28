<template>
	<div class="w-full h-full overflow-hidden flex rounded-xl">
		<div class="w-full h-full rounded-xl flex flex-col gap-2">
			<h1
				class="flex justify-between items-center w-full bg-neutral-700 dark:bg-neutral-100 min-h-[50px] rounded-xl dark:shadow-xl p-2">
				<p class="flex flex-col">
					<span class="text-lg font-bold">{{ request.modified_apl?.fullName }}</span>
					<span class="text-xs text-neutral-400 dark:text-neutral-600">{{ request.body }}</span>
				</p>

				<span class="">{{ where_conf }}</span>

				<span v-if="loading" class="loading loading-infinity loading-lg"></span>


				<div class="join">
					<label @click="handleApprove(request)" class="join-item btn btn-success btn-sm">Approve</label>
					<label @click="handleReject(request)" class="join-item btn btn-error btn-sm">Reject</label>
					<label
						@click="() => { $router.push(`/applicant/${request.apl_id}`); useViewAplStore().setID(request.apl_id!) }"
						class="join-item btn btn-primary btn-sm">Open</label>
					<label class="join-item btn btn-sm">Close</label>
				</div>
			</h1>

			<div id="style-2" class="flex flex-col overflow-y-auto rounded-xl">
				<section
					class="flex flex-col gap-2 rounded-s-xl rounded-bl-none relative bg-neutral-800 dark:bg-neutral-50 p-2 ">
					<!-- <p class="flex justify-evenly sticky top-0">
					<div class="flex w-full h-fit items-center group">
						<div
							class="flex-1 grid h-12 flex-grow place-items-center text-xl uppercase badge font-bold badge-secondary">
							Old
						</div>
						<div class="divider divider-horizontal text-center">
						</div>
						<div
							class="flex-1 grid h-12 flex-grow place-items-center text-xl uppercase font-bold badge badge-accent">
							New
						</div>
					</div>
					</p> -->

					<div class="w-[200px] z-20 sticky top-2">
						<AvatarSelect :src="request.modified_apl?.aplImg_path.primePath[0]" />
					</div>

					<h2 class="mx-auto mt-3 mb-5 text-3xl font-bold">Primary Applicant</h2>


					<Divider v-if="if_val('plastName')">
						<template #modified_apl="props">
							{{ props.original?.plastName }}
						</template>
						Last Name
						<template #apl="props">
							{{ props.edited?.plastName }}
						</template>
					</Divider>
					<Divider v-if="if_val('pfirstName')">
						<template #modified_apl="props">
							{{ props.original?.pfirstName }}
						</template>
						First Name
						<template #apl="props">
							{{ props.edited?.pfirstName }}
						</template>
					</Divider>
					<Divider v-if="if_val('potherName')" class="">
						<template #modified_apl="props">
							{{ props.original?.potherName }}
						</template>
						Other Name
						<template #apl="props">
							{{ props.edited?.potherName }}
						</template>
					</Divider>
					<Divider v-if="if_val('pdob')" class="">
						<template #modified_apl="props">
							{{ useNuxtApp().$formatDateWords(new Date(props.original?.pdob!)) }}
						</template>
						Date of Birth
						<template #apl="props">
							{{ useNuxtApp().$formatDateWords(new Date(props.edited?.pdob!)) }}
						</template>
					</Divider>
					<Divider v-if="if_val('pgender')" class="">
						<template #modified_apl="props">
							{{ props.original?.pgender }}
						</template>
						Gender
						<template #apl="props">
							{{ props.edited?.pgender }}
						</template>
					</Divider>
					<Divider v-if="if_val('pcity_ob')" class="">
						<template #modified_apl="props">
							{{ props.original?.pcity_ob }}
						</template>
						City Of Birth
						<template #apl="props">
							{{ props.edited?.pcity_ob }}
						</template>
					</Divider>
					<Divider v-if="if_val('pcountry_ob')" class="">
						<template #modified_apl="props">
							{{ props.original?.pcountry_ob }}
						</template>
						Country Of Birth
						<template #apl="props">
							{{ props.edited?.pcountry_ob }}
						</template>
					</Divider>
					<Divider v-if="if_val('pcontact')" class="">
						<template #modified_apl="props">
							{{ props.original?.pcontact }}
						</template>
						Phone Number
						<template #apl="props">
							{{ props.edited?.pcontact }}
						</template>
					</Divider>
					<Divider v-if="if_val('pother_contact')" class="">
						<template #modified_apl="props">
							{{ props.original?.pother_contact }}
						</template>
						Next of Kin Contact
						<template #apl="props">
							{{ props.edited?.pother_contact }}
						</template>
					</Divider>
					<Divider v-if="if_val('pemail')" class="">
						<template #modified_apl="props">
							{{ props.original?.pemail }}
						</template>
						Email
						<template #apl="props">
							{{ props.edited?.pemail }}
						</template>
					</Divider>
					<Divider v-if="if_val('ppassport_number')" class="">
						<template #modified_apl="props">
							{{ props.original?.ppassport_number }}
						</template>
						Passport Number
						<template #apl="props">
							{{ props.edited?.ppassport_number }}
						</template>
					</Divider>
					<Divider v-if="if_val('passport_ex')" class="">
						<template #modified_apl="props">
							{{ props.original?.passport_ex ? useNuxtApp().$formatDateWords(new
								Date(props.original?.passport_ex!)) : ''
							}}
						</template>
						Passort Expiration Date
						<template #apl="props">
							{{ props.edited?.passport_ex ? useNuxtApp().$formatDateWords(new
								Date(props.edited?.passport_ex!)) : '' }}
						</template>
					</Divider>
					<Divider v-if="if_val('pcountry_live_today')" class="">
						<template #modified_apl="props">
							{{ props.original?.pcountry_live_today }}
						</template>
						Location
						<template #apl="props">
							{{ props.edited?.pcountry_live_today }}
						</template>
					</Divider>
					<Divider v-if="if_val('ppostal')" class="">
						<template #modified_apl="props">
							{{ props.original?.ppostal }}
						</template>
						Residential Address
						<template #apl="props">
							{{ props.edited?.ppostal }}
						</template>
					</Divider>
					<Divider v-if="if_val('psocial_media.facebook')" class="">
						<template #modified_apl="props">
							{{ props.original?.psocial_media.facebook }}
						</template>
						Facebook
						<template #apl="props">
							{{ props.edited?.psocial_media.facebook }}
						</template>
					</Divider>
					<Divider v-if="if_val('psocial_media.instagram')" class="">
						<template #modified_apl="props">
							{{ props.original?.psocial_media.instagram }}
						</template>
						Instagram
						<template #apl="props">
							{{ props.edited?.psocial_media.instagram }}
						</template>
					</Divider>
					<Divider v-if="if_val('psocial_media.twitter')" class="">
						<template #modified_apl="props">
							{{ props.original?.psocial_media.twitter }}
						</template>
						Twitter
						<template #apl="props">
							{{ props.edited?.psocial_media.twitter }}
						</template>
					</Divider>
					<Divider v-if="if_val('pmarital_status')" class="">
						<template #modified_apl="props">
							{{ props.original?.pmarital_status }}
						</template>
						Marital Status
						<template #apl="props">
							{{ props.edited?.pmarital_status }}
						</template>
					</Divider>
					<Divider v-if="if_val('peducation_level')" class="">
						<template #modified_apl="props">
							{{ props.original?.peducation_level }}
						</template>
						Highest Level of Education
						<template #apl="props">
							{{ props.edited?.peducation_level }}
						</template>
					</Divider>
					<Divider v-if="if_val('children_number')" class="">
						<template #modified_apl="props">
							{{ props.original?.children_number }}
						</template>
						Number of Children
						<template #apl="props">
							{{ props.edited?.children_number }}
						</template>
					</Divider>
					<Divider v-if="if_val('pconf_code')" class="">
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

					<div class="w-[200px] z-20 sticky top-20">
						<AvatarSelect />
					</div>

					<h2 class="mx-auto mt-10 mb-5 text-3xl font-bold">Secondary Applicant</h2>
					<Divider v-if="if_val('slastName')">
						<template #modified_apl="props">
							{{ props.original?.slastName }}
						</template>
						Last Name
						<template #apl="props">
							{{ props.edited?.slastName }}
						</template>
					</Divider>
					<Divider v-if="if_val('sfirstName')">
						<template #modified_apl="props">
							{{ props.original?.sfirstName }}
						</template>
						First Name
						<template #apl="props">
							{{ props.edited?.sfirstName }}
						</template>
					</Divider>
					<Divider v-if="if_val('sotherName')" class="">
						<template #modified_apl="props">
							{{ props.original?.sotherName }}
						</template>
						Other Name
						<template #apl="props">
							{{ props.edited?.sotherName }}
						</template>
					</Divider>
					<Divider v-if="if_val('sdob')" class="">
						<template #modified_apl="props">
							{{ useNuxtApp().$formatDateWords(new Date(props.original?.sdob!)) }}
						</template>
						Date of Birth
						<template #apl="props">
							{{ useNuxtApp().$formatDateWords(new Date(props.edited?.sdob!)) }}
						</template>
					</Divider>
					<Divider v-if="if_val('sgender')" class="">
						<template #modified_apl="props">
							{{ props.original?.sgender }}
						</template>
						Gender
						<template #apl="props">
							{{ props.edited?.sgender }}
						</template>
					</Divider>
					<Divider v-if="if_val('scity_ob')" class="">
						<template #modified_apl="props">
							{{ props.original?.scity_ob }}
						</template>
						City Of Birth
						<template #apl="props">
							{{ props.edited?.scity_ob }}
						</template>
					</Divider>
					<Divider v-if="if_val('scountry_ob')" class="">
						<template #modified_apl="props">
							{{ props.original?.scountry_ob }}
						</template>
						Country Of Birth
						<template #apl="props">
							{{ props.edited?.scountry_ob }}
						</template>
					</Divider>
					<Divider v-if="if_val('scontact')" class="">
						<template #modified_apl="props">
							{{ props.original?.scontact }}
						</template>
						Phone Number
						<template #apl="props">
							{{ props.edited?.scontact }}
						</template>
					</Divider>

				</section>

				<section v-for="(ward, idx) in request.modified_apl?.wards"
					v-if="request.modified_apl?.wards.length! > 0"
					class="flex flex-col gap-2 rounded-s-xl rounded-tl-none bg-neutral-800 dark:bg-neutral-50 p-2">

					<div class="w-[200px] z-20 sticky top-2">
						<AvatarSelect />
					</div>

					<h2 class="mx-auto mt-10 mb-5 text-3xl font-bold">Ward Applicant {{ idx + 1 }}</h2>
					<Divider v-if="if_val(`wards.${idx}.wlastName`)">
						<template #modified_apl="props">
							{{ props.original?.wards[idx].wlastName }}
						</template>
						Last Name
						<template #apl="props">
							{{ props.edited?.wards[idx].wlastName }}
						</template>
					</Divider>
					<Divider v-if="if_val(`wards.${idx}.wfirstName`)">
						<template #modified_apl="props">
							{{ props.original?.wards[idx].wfirstName }}
						</template>
						First Name
						<template #apl="props">
							{{ props.edited?.wards[idx].wfirstName }}
						</template>
					</Divider>
					<Divider v-if="if_val(`wards.${idx}.wotherName`)" class="">
						<template #modified_apl="props">
							{{ props.original?.wards[idx].wotherName }}
						</template>
						Other Name
						<template #apl="props">
							{{ props.edited?.wards[idx].wotherName }}
						</template>
					</Divider>
					<Divider v-if="if_val(`wards.${idx}.wdob`)" class="">
						<template #modified_apl="props">
							{{ useNuxtApp().$formatDateWords(new Date(props.original?.wards[idx].wdob!)) }}
						</template>
						Date of Birth
						<template #apl="props">
							{{ useNuxtApp().$formatDateWords(new Date(props.edited?.wards[idx].wdob!)) }}
						</template>
					</Divider>
					<Divider v-if="if_val(`wards.${idx}.wgender`)" class="">
						<template #modified_apl="props">
							{{ props.original?.wards[idx].wgender }}
						</template>
						Gender
						<template #apl="props">
							{{ props.edited?.wards[idx].wgender }}
						</template>
					</Divider>
					<Divider v-if="if_val(`wards.${idx}.wcity_ob`)" class="">
						<template #modified_apl="props">
							{{ props.original?.wards[idx].wcity_ob }}
						</template>
						City Of Birth
						<template #apl="props">
							{{ props.edited?.wards[idx].wcity_ob }}
						</template>
					</Divider>
					<Divider v-if="if_val(`wards.${idx}.wcountry_ob`)" class="">
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
			<label @click="is_mobile ? $router.push('/requests') : $router.push('/database')" class="modal-backdrop"
				for="approved">Close</label>
		</div>

		<input type="checkbox" id="rejected" :checked="if_rej" class="modal-toggle" />
		<div class="modal">
			<div
				class="modal-box dark:bg-neutral-50 dark:text-black dark:outline dark:outline-4 dark:outline-red-500 bg-neutral-800 text-white text-center">
				<h3 class="text-lg font-bold">SUCCESS</h3>
				<p class="py-4 text-red-500 dark:text-neutral-800">Request Rejected!</p>
			</div>
			<label @click="is_mobile ? $router.push('/requests') : $router.push('/database')" class="modal-backdrop"
				for="rejected">Close</label>
		</div>

	</div>
</template>

<script setup lang="ts">
import { useAplStore } from '@/store/apl';
import { Requests } from '@/interfaces/interfaces';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app';
import { useViewAplStore } from '@/store/viewApl';

const apl_ = useAplStore()
const app_ = useAppStore()
const { curr_compared_request: request } = storeToRefs(apl_)
const { total_apls, is_mobile } = storeToRefs(app_)
const { $SB, $deepCompareObjects } = useNuxtApp()
const if_rej = ref(false)
const if_ap = ref(false)
let apl = total_apls.value.find(apl => apl.apl_id == request.value.apl_id)

const difference = $deepCompareObjects(apl!, request.value.modified_apl!)
console.log(difference);

const if_val = (val: string) => {
	if (difference.find(value => value.key == val)) return true
	return false
}

const where_conf = computed(() => {
	if (request.value.modified_apl?.pconf_code) {
		return 'req'
	} else if (apl?.pconf_code) {
		return 'apl'
	} else {
		return 'none'
	}

})

onMounted(() => {
	if (!request.value.modified_apl) useNuxtApp().$router.push({ path: '/database' })
	console.log(request.value.modified_apl?.wards);

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
	let request = req.modified_apl
	let code: string

	if (request?.pconf_code) {
		code = request?.pconf_code
	} else if (apl?.pconf_code) {
		code = apl?.pconf_code
	} else {
		code = ''
	}

	request!.pconf_code = code

	try {
		let { data, error } = await $SB
			.from('applicants')
			.update(request)
			.eq('apl_id', request?.apl_id)
			.select()
		if (error) throw error
		console.log(data);
		return data
	} catch (error) {
		console.log(error);
	}
}


// async function updateApplicant(req: Requests) {
// 	let req_apl = req.modified_apl
// 	let apl = total_apls.value.find(apl => apl.apl_id == req.apl_id)

// 	const diff = $deepCompareObjects(apl!, req_apl!);

// 	const APL: Partial<Applicant> = {}
// 	let data = diff.map(apl => {
// 		return {
// 			key: apl.key, value: apl.value2
// 		}
// 	})

// 	function mergeArrayOfObjects(arr: { key: string, value: any }[]): Record<string, any> {
// 		const mergedObject: Record<string, any> = {};

// 		for (const entry of arr) {
// 			mergedObject[entry.key] = entry.value;
// 		}

// 		return mergedObject;
// 	}

// 	console.log(mergeArrayOfObjects(data));

// 	// try {
// 	// 	let { data: dat, error } = await $SB
// 	// 		.from('applicants')
// 	// 		.update(mergeArrayOfObjects(data))
// 	// 		.eq('apl_id', req.apl_id)
// 	// 		.select()
// 	// 	if (error) throw error
// 	// 	await updateRequestType(req, 'approved')
// 	// 	console.log(dat);
// 	// 	return dat
// 	// } catch (error) {
// 	// 	console.log(error);
// 	// }
// }

const loading = ref(false)
async function handleApprove(req: Requests) {
	loading.value = true
	// type of request
	let ty = req.modify_type

	if (ty == 'delete') {
		await deleteApplicant(req)
		await updateRequestType(req, 'approved')
		if_ap.value = true
		loading.value = false
	} else if (ty == 'discount') {
		await approveDiscount(req)
		await updateRequestType(req, 'approved')
		if_ap.value = true
		loading.value = false
	} else if (ty == 'edit') {
		await updateApplicant(req)
		await updateRequestType(req, 'approved')
		if_ap.value = true
		loading.value = false
	}
}

async function handleReject(req: Requests) {
	loading.value = true
	let ty = req.modify_type
	if (ty == 'delete') {
		await updateRequestType(req, 'rejected')
		if_rej.value = true
		loading.value = false
	}
	if (ty == 'discount') {
		await updateRequestType(req, 'rejected')
		if_rej.value = true
		loading.value = false
	}
	if (ty == 'edit') {
		await updateRequestType(req, 'rejected')
		if_rej.value = true
		loading.value = false
	}
}

</script>

<style scoped></style>