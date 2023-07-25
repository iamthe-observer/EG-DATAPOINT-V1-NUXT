<template>
	<div class="flex flex-col p-5">
		<div class="w-full flex gap-5 justify-between">
			<div class="w-2/5 h-full flex flex-col gap-10 indicator">

				<div class="w-full h-full">
					<div class="indicator w-full h-full">
						<span class="indicator-item indicator-top indicator-center badge badge-primary">Primary Applicant</span>
						<AvatarSelect class="avatarImg w-full aspect-square" :src="prime_image" :alt="apl.fullName" />
					</div>
					<div class="flex w-full gap-2 items-end">
						<button v-if="edit_mode && prime_file" @click="handlePrimeUpdate"
							class="btn btn-xs btn-success">Update</button>
						<input v-if="edit_mode" @change="e => handleFile(e, 'prime')" type="file"
							class="file-input file-input-xs file-input-primary w-full mt-2" />
					</div>
				</div>

				<div v-if="apl.pmarital_status == 'MARRIED'" class="w-full h-full">
					<div class="indicator w-full h-full">
						<span class="indicator-item indicator-top indicator-center badge badge-primary">Secondary Applicant</span>
						<AvatarSelect class="w-full aspect-square" v-if="apl.pmarital_status == 'MARRIED'" :src="sec_image"
							:alt="apl.fullName" />
					</div>
					<div class="flex w-full gap-2 items-end">
						<button @click="handleSecUpdate" v-if="edit_mode && sec_file" class="btn btn-xs btn-success">Update</button>
						<input v-if="edit_mode" @change="e => handleFile(e, 'sec')" type="file"
							class="file-input file-input-xs file-input-primary w-full mt-2" />
					</div>
				</div>

				<div v-if="wards_image.length > 0" v-for="(src, i) in wards_image" class="h-full flex flex-col gap-4">
					<div class="w-full h-full">
						<div class="indicator w-full h-full">
							<span class="indicator-item indicator-top indicator-center badge badge-primary">
								Ward Applicant {{ i + 1 }}</span>
							<AvatarSelect class="w-full aspect-square" :src="src" :alt="apl.fullName" />
						</div>
						<div class="flex w-full gap-2 items-end">
							<button v-if="edit_mode && wards_file[0] && curr_ward_file!.apl_type.includes(`ward${i}`)"
								@click="handleWardUpdate(i)" class="btn btn-xs btn-success">Update</button>
							<input v-if="edit_mode" @change="e => handleFile(e, `ward${i}`, i)" type="file"
								class="file-input file-input-primary w-full mt-2 mx-auto file-input-xs" />
						</div>
					</div>
				</div>
			</div>

			<div class="flex-1 grid grid-cols-2 gap-2 h-fit">
				<div class="flex-1 grid grid-cols-2 gap-2 col-span-full">
					<AplInfoCardDate :heading="`Date of Birth`" :date="new Date(apl.pdob!)" @date="handleDate"
						:name_type="'pdob'" />
					<AplInfoCard @update:model-value="logger" v-model="apl.pconf_code" :heading="'Confirmation Code'" />
					<AplInfoCard @update:model-value="logger" v-model="apl.ppassport_number" :heading="'Passport Number'" />
					<AplInfoCard @update:model-value="logger" v-model="apl.pcity_ob" :heading="'City Of Birth'" />
					<AplInfoCard @update:model-value="logger" v-model="apl.pcountry_ob" :heading="'Country of Birth'" />
					<AplInfoCard @update:model-value="logger" v-model="apl.pother_contact" :heading="'Next of Kin Contact'" />
					<AplInfoCard @update:model-value="logger" v-model="apl.pcountry_live_today"
						:heading="'Country You Live in Today'" />
					<AplInfoCardDate @update:model-value="logger" :date="new Date(apl.passport_ex!)" @date="handleDate"
						:name_type="'passport_ex'" :heading="'Passport Expiry Date'" />
					<AplInfoCard @update:model-value="logger" v-model="apl.pemail" :heading="'Email'" />
					<AplInfoCard @update:model-value="logger" v-model="apl.pgender" :heading="'Gender'" />
					<AplInfoCard @update:model-value="logger" v-model="apl.pmarital_status" :heading="'Marital Status'" />
					<AplInfoCard @update:model-value="logger" v-model="apl.peducation_level" :heading="'Education Level'" />
					<AplInfoCard @update:model-value="logger" v-model="apl.pcontact" :heading="'Contact'" />
					<AplInfoCard @update:model-value="logger" v-model="apl.ppostal" :heading="'Residential Address'" />
					<AplInfoCard @update:model-value="logger" v-model="apl.children_number" :heading="'Number of Children'" />
					<AplInfoCard @update:model-value="logger" v-model="apl.totalPayment" :heading="'Paid Amount'" />
				</div>

				<div v-if="apl.pmarital_status === 'MARRIED'" class="pt-10 flex-1 grid grid-cols-3 gap-2 col-span-full">
					<h2 class="col-span-full py-3 text-2xl font-bold flex justify-between items-center">
						<span>Spouse Information</span>
						<span v-if="!edit_mode" class="font-normal">{{
							`${apl.slastName} ${apl.sfirstName} ${apl.sotherName}`.trimEnd() }}
						</span>
						<div v-else class="flex gap-3 w-fit">
							<TextInput @update:model-value="logger" classer="input-sm" v-model="apl.slastName">Last Name</TextInput>
							<TextInput @update:model-value="logger" classer="input-sm" v-model="apl.sfirstName">First Name</TextInput>
							<TextInput @update:model-value="logger" classer="input-sm" v-model="apl.sotherName">Other Name</TextInput>
						</div>

					</h2>
					<AplInfoCardDate @update:model-value="logger" :date="new Date(apl.sdob!)" @date="handleDate" :name_type="'sdob'"
						:heading="'Date of Birth'" />
					<AplInfoCard @update:model-value="logger" v-model="apl.sgender" :heading="'Gender'" />
					<AplInfoCard @update:model-value="logger" v-model="apl.scontact" :heading="'Contact'" />
					<AplInfoCard @update:model-value="logger" v-model="apl.scity_ob" :heading="'City of Birth'" />
					<AplInfoCard @update:model-value="logger" v-model="apl.scountry_ob" :heading="'Country of Birth'" />
				</div>

				<div v-for="ward in apl.wards" v-if="apl.wards.length > 0"
					class="pt-10 flex-1 grid grid-cols-2 gap-2 col-span-full">
					<h2 class="col-span-full py-3 text-2xl font-bold flex justify-between items-center">
						<span>Ward #{{ ward.index + 1 }}</span>
						<span v-if="!edit_mode" class="font-normal">{{ `${ward.wlastName} ${ward.wfirstName}
													${ward.wotherName}`.trimEnd() }}
						</span>
						<div v-else class="flex gap-3 w-2/3">
							<TextInput @update:model-value="logger" classer="input-sm" v-model="ward.wlastName">Last Name</TextInput>
							<TextInput @update:model-value="logger" classer="input-sm" v-model="ward.wfirstName">First Name</TextInput>
							<TextInput @update:model-value="logger" classer="input-sm" v-model="ward.wotherName">Other Name</TextInput>
						</div>
					</h2>

					<AplInfoCardDate @update:model-value="logger" :date="new Date(ward.wdob!)" @date="handleDate"
						:name_type="'wdob'" :idx="ward.index" :heading="'Date of Birth'" />
					<AplInfoCard @update:model-value="logger" v-model="ward.wgender" :heading="'Gender'" />
					<AplInfoCard @update:model-value="logger" v-model="ward.wcity_ob" :heading="'City of Birth'" />
					<AplInfoCard @update:model-value="logger" v-model="ward.wcountry_ob" :heading="'Country of Birth'" />
				</div>
			</div>
		</div>
		<input :checked="if_updated" type="checkbox" id="my_modal_7" class="modal-toggle" />
		<div class="modal">
			<div class="modal-box">
				<p class="py-4 text-center text-2xl">Image Updated!</p>
			</div>
			<label class="modal-backdrop bg-[rgb(0,0,0,.7)]" for="my_modal_7">Close</label>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Applicant, FileWithAplType, Requests } from 'interfaces/interfaces';
import { useAppStore } from '@/store/app';
import { storeToRefs } from 'pinia';
import { useRequestStore } from '@/store/requests';
import { useAplStore } from '@/store/apl';
import { useImageStore } from '@/store/images';

const if_updated = ref(false)
const apl = ref<Applicant>({
	apl_id: '',
	aplImg_path: {
		primePath: [],
		secPath: [],
		wardsPath: []
	},
	children_number: 0,
	created_at: null,
	fullName: '',
	passport_ex: null,
	pcity_ob: '',
	pconf_code: '',
	pcontact: '',
	pcountry_live_today: '',
	pcountry_ob: '',
	pdob: null,
	peducation_level: '',
	pemail: '',
	pfirstName: '',
	pgender: '',
	plastName: '',
	pmarital_status: '',
	pother_contact: '',
	potherName: '',
	ppassport_number: '',
	ppostal: '',
	psocial_media: {
		facebook: '',
		instagram: '',
		twitter: '',
	},
	scity_ob: '',
	scontact: '',
	scountry_ob: '',
	sdob: null,
	sfirstName: '',
	sgender: '',
	slastName: '',
	sotherName: '',
	totalPayment: 0,
	user_id: useSupabaseUser().value?.id!,
	wards: []
})
const { edit_mode } = storeToRefs(useAplStore())
const { $SB } = useNuxtApp()
const { total_apls } = storeToRefs(useAppStore())
const emit = defineEmits(['apl', 'request'])
const request = ref<Requests>({
	apl_id: '',
	modified_apl: null,
	modify_type: '',
	body: '',
	status: '',
	user_id: '',
})

onMounted(async () => {
	await useAppStore().getTotalApls()
	let aplVal = total_apls.value.filter(applicant => applicant.apl_id == useNuxtApp()._route.params.id)[0]
	setTimeout(async () => {
		await loadUrl()
	}, 1000)

	apl.value = aplVal
	console.log(apl.value.aplImg_path.wardsPath);

	request.value.apl_id = apl.value.apl_id!
	request.value.modify_type = 'edit'
	request.value.modified_apl = apl.value
	request.value.status = 'pending'
	request.value.user_id = useSupabaseUser().value?.id!
	useRequestStore().setRequest(request.value)
	emit('request', request.value)
	emit('apl', apl.value)

	useAplStore().toggleEditMode(false)
})

onBeforeUnmount(() => {
	useAplStore().toggleEditMode(false)
})

const prime_image = ref()
const sec_image = ref()
const wards_image = ref<any[]>([])
const wards_data = ref<any[]>([])

async function loadUrl() {
	// if (apl.value.aplImg_path.wardsPath.length == 0) {
	// 	for (let idx = 0; idx < apl.value.children_number; idx++) {
	// 		apl.value.aplImg_path.wardsPath.push('')
	// 	}
	// }

	try {
		const { data, error } = await $SB
			.storage
			.from('applicants')
			.createSignedUrls([apl.value.aplImg_path!.primePath[0], apl.value.aplImg_path.secPath[0], ...apl.value.aplImg_path.wardsPath], 3600)

		if (error) throw error

		console.log(data);


		prime_image.value = data[0].signedUrl || ''
		sec_image.value = data[1].signedUrl || ''
		wards_image.value = data.slice(2).map(img => img.signedUrl)
		wards_data.value = data.slice(2)
		// console.log(apl.value.aplImg_path.wardsPath);

		// let DATA = sortArrayByWardNumber(data.slice(2)!)
		// wards_image.value = DATA
	}
	catch (err: any) {
		console.log((err));
	}
}

function sortArrayByWardNumber(arr: string[]): string[] {
	// Custom sorting function
	function compareByWardNumber(a: string, b: string): number {
		console.log(a, b);
		if (a == null) {
			const numB = parseInt(b.match(/ward(\d+)/)?.[1] || '0');
			return numB
		} else {
			const numA = parseInt(a.match(/ward(\d+)/)?.[1] || '0');
			const numB = parseInt(b.match(/ward(\d+)/)?.[1] || '0');
			return numA - numB;
		}
	}

	// Use the custom sorting function to sort the array
	return arr.slice().sort(compareByWardNumber);
}

function handleDate(e: { name: string, date: Date, ward_idx?: number }) {
	if (e.name == 'pdob') {
		apl.value.pdob = e.date
		console.log(apl.value);
	} else if (e.name == 'sdob') {
		apl.value.sdob = e.date
		console.log(apl.value);
	} else if (e.name == 'passport_ex') {
		apl.value.passport_ex = e.date
		console.log(apl.value);
	} else if (e.name == 'wdob') {
		apl.value.wards[e.ward_idx! - 1].wdob = e.date
		console.log(apl.value);
	}
}

function loggerr(e: any) {
	console.log(e);
}

function logger(e: any) {
	console.log(e);

	setTimeout(() => {
		request.value.apl_id = apl.value.apl_id!
		request.value.modify_type = 'edit'
		request.value.modified_apl = apl.value
		request.value.status = 'pending'
		request.value.user_id = useSupabaseUser().value?.id!
		useRequestStore().setRequest(request.value)
		emit('request', request.value)
	}, 10)
}

const prime_file = ref<FileWithAplType>()
const sec_file = ref<FileWithAplType>()
const wards_file = ref<FileWithAplType[]>([])
const curr_ward_file = ref<FileWithAplType>()

function handleFile(evt: any, type: string, idx?: number) {
	// console.log(evt.target.files[0], type);
	let file = evt.target.files[0]
	file.apl_type = type
	curr_ward_file.value = file

	console.log(file, type);

	if (type === 'prime') {
		prime_file.value = file
		prime_image.value = URL.createObjectURL(file)
	} else if (type === 'sec') {
		sec_file.value = file
		sec_image.value = URL.createObjectURL(file)
	} else if (type.includes('ward')) {
		// const updatedImages = wards_file.value.filter(
		// 	x => x.apl_type !== file.apl_type
		// )
		// updatedImages.push(file)
		// wards_file.value = updatedImages
		wards_file.value = []
		wards_file.value.push(file)
		wards_image.value[idx!] = URL.createObjectURL(file)
		console.log(wards_file.value);
		console.log(wards_image.value);
	}
}

async function handlePrimeUpdate() {
	let aplVal = total_apls.value.filter(applicant => applicant.apl_id == useNuxtApp()._route.params.id)[0]
	if (!prime_file.value) return;
	if (apl.value.aplImg_path.primePath.length == 0) {
		try {
			// let apl_paths = apl.value.aplImg_path
			prime_file.value!.apl_type = 'prime'
			let path = await useImageStore().uploadAplImg2(apl.value.apl_id, prime_file.value)
			aplVal.aplImg_path.primePath.push(path)
			console.log(aplVal)
			console.log(path)
			if (!path) return
			const { error: err } = await $SB
				.from('applicants')
				.delete()
				.eq('apl_id', aplVal.apl_id)
			if (err) {
				console.log('delete err');
				throw err
			}
			let { data, error } = await $SB
				.from('applicants')
				.insert([aplVal])
				.eq('apl_id', aplVal.apl_id!)
				.select()
			if (error) throw error
			if_updated.value = true
			console.log(data)
		} catch (error) {
			console.log(error);
		}
	} else {
		let path = await useImageStore().updateSingleAplImg(apl.value.aplImg_path.primePath[0], prime_file.value!);
		if (path) if_updated.value = true
	}
}
async function handleSecUpdate() {
	let aplVal = total_apls.value.filter(applicant => applicant.apl_id == useNuxtApp()._route.params.id)[0]
	if (!sec_file.value) return;
	if (apl.value.aplImg_path.secPath.length == 0) {
		try {
			sec_file.value!.apl_type = 'sec'
			let path = await useImageStore().uploadAplImg2(apl.value.apl_id, sec_file.value)
			aplVal.aplImg_path.secPath.push(path)
			console.log(aplVal)
			console.log(path)
			if (!path) return
			const { error: err } = await $SB
				.from('applicants')
				.delete()
				.eq('apl_id', aplVal.apl_id)
			if (err) {
				console.log('delete err');
				throw err
			}
			let { data, error } = await $SB
				.from('applicants')
				.insert([aplVal])
				.eq('apl_id', aplVal.apl_id!)
				.select()
			if (error) throw error
			if_updated.value = true
			console.log(data)
		} catch (error) {
			console.log(error);
		}
	} else {
		let path = await useImageStore().updateSingleAplImg(apl.value.aplImg_path.secPath[0], sec_file.value!);
		if (path) if_updated.value = true
	}
}

// [ ] problem is here... images of wards dont show cos of match error

async function handleWardUpdate(idx: number) {
	let aplVal = total_apls.value.filter(applicant => applicant.apl_id == useNuxtApp()._route.params.id)[0]

	// to see if theres a file before going ahead and sending
	if (wards_file.value.length == 0) return;

	if (apl.value.aplImg_path.wardsPath[idx] == `ward${idx}` || apl.value.aplImg_path.wardsPath[idx] == '') {
		try {
			console.log(wards_file.value);

			let path = await useImageStore().uploadAplImg2(apl.value.apl_id, wards_file.value[0])
			aplVal.aplImg_path.wardsPath[idx] = path
			console.log(aplVal)
			console.log(path)
			if (!path) return
			const { error: err } = await $SB
				.from('applicants')
				.delete()
				.eq('apl_id', aplVal.apl_id)
			if (err) {
				console.log('delete err');
				throw err
			}
			let { data, error } = await $SB
				.from('applicants')
				.insert([aplVal])
				.eq('apl_id', aplVal.apl_id!)
				.select()
			if (error) throw error
			if_updated.value = true
			console.log(data)
			wards_file.value = []
		} catch (error) {
			console.log(error);
			wards_file.value = []
		}
		finally {
			wards_file.value = []
		}
	} else {
		let path = await useImageStore().updateSingleAplImg(apl.value.aplImg_path.wardsPath[idx], wards_file.value[0]);
		if (path) if_updated.value = true
	}
}
</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	background-color: #1f1f1f;
	color: white;
	width: 100%;
	border-radius: 10px;
}

.info {
	@apply p-3 font-bold;
}

.heading {
	@apply w-full bg-neutral-900 rounded-t-xl px-3 py-1 text-sm;
}
</style>
