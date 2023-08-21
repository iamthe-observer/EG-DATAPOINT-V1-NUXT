<template>
	<div class="flex flex-col p-5 gap-10">
		<!-- primary apl -->
		<div class="flex gap-4">
			<!-- image -->
			<div class="flex flex-col gap-2">
				<div class="indicator">
					<span :class="['indicator-item indicator-top indicator-center badge',
						!edit_mode ? 'badge-primary' : 'badge-primary']">Primary Applicant</span>
					<AvatarSelect :classer="`w-[300px] h-[300px]`" :src="prime_image" />
				</div>
				<div class="flex w-full gap-2 items-end">
					<button v-if="edit_mode && prime_file" @click="handlePrimeUpdate" class="btn btn-xs btn-success">
						<span v-if="p_loading" class="loading loading-ring loading-sm text-white"></span>
						<span v-else>Update</span>
					</button>
					<input v-if="edit_mode" @change="e => handleFile(e, 'prime')" type="file"
						class="file-input file-input-xs file-input-primary w-full mt-2" />
				</div>
			</div>

			<div class="grid grid-cols-3 gap-2 w-full">
				<AplInfoCardDate :heading="`Date of Birth`" :date="new Date(apl.pdob!)" @date="handleDate" :name_type="'pdob'" />
				<AplInfoCard @update:model-value="logger" v-model="apl.pcity_ob" :heading="'City Of Birth'" />
				<AplInfoCard @update:model-value="logger" :select="true" :options="$countries" v-model="apl.pcountry_ob"
					:heading="'Country of Birth'" />
				<AplInfoCard @update:model-value="logger" v-model="apl.pcontact" :heading="'Contact'" />
				<AplInfoCard @update:model-value="logger" v-model="apl.pother_contact" :heading="'Next of Kin Contact'" />
				<AplInfoCard @update:model-value="logger" v-model="apl.pcountry_live_today"
					:heading="'Country You Live in Today'" />
				<AplInfoCard @update:model-value="logger" v-model="apl.ppassport_number" :heading="'Passport Number'" />
				<AplInfoCardDate @update:model-value="logger" :date="apl.passport_ex ? new Date(apl.passport_ex!) : undefined"
					@date="handleDate" :name_type="'passport_ex'" :heading="'Passport Expiry Date'" />
				<AplInfoCard @update:model-value="logger" v-model="apl.pemail" :heading="'Email'" />
				<AplInfoCard @update:model-value="logger" :select="true" :options="['MALE', 'FEMALE']" v-model="apl.pgender"
					:heading="'Gender'" />
				<AplInfoCard @update:model-value="logger" :select="true" :options="$marital_status" v-model="apl.pmarital_status"
					:heading="'Marital Status'" />
				<AplInfoCard @update:model-value="logger" :select="true" :options="$highest_level_ed"
					v-model="apl.peducation_level" :heading="'Education Level'" />
				<AplInfoCard @update:model-value="logger" v-model="apl.ppostal" :heading="'Residential Address'" />
				<AplInfoCard @update:model-value="logger" v-model="apl.pconf_code" :heading="'Confirmation Code'" />
				<AplInfoCard @update:model-value="logger" :select="true" :num_options="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
					v-model="apl.children_number" :heading="'Number of Children'" />
				<AplInfoCard class="col-span-full mx-auto w-fit" v-if="!edit_mode" :disabled="true" @update:model-value="logger"
					v-model="apl.totalPayment" :heading="'Paid Amount'" />
			</div>
		</div>

		<div v-if="apl.pmarital_status == 'MARRIED'" class="divider"></div>

		<!-- secondary -->
		<div v-if="apl.pmarital_status == 'MARRIED'" class="flex gap-4">
			<!-- image -->
			<div class="flex flex-col gap-2">
				<div class="indicator">
					<span :class="['indicator-item indicator-top indicator-center badge',
						!edit_mode ? 'badge-primary' : 'badge-primary']">Secondary Applicant</span>
					<AvatarSelect :classer="`w-[300px] h-[300px]`" :src="sec_image" />
				</div>
				<div class="flex w-full gap-2 items-end">
					<button v-if="edit_mode && sec_file" @click="handleSecUpdate" class="btn btn-xs btn-success">
						<span v-if="s_loading" class="loading loading-ring loading-sm text-white"></span>
						<span v-else>Update</span>
					</button>
					<input v-if="edit_mode" @change="e => handleFile(e, 'sec')" type="file"
						class="file-input file-input-xs file-input-primary w-full mt-2" />
				</div>
			</div>


			<div class="grid grid-cols-3 gap-2 w-full h-fit">
				<h2 class="col-span-full py-3 text-2xl font-bold flex justify-between items-center">
					<span>Spouse Information</span>
					<span v-if="!edit_mode" class="font-normal">{{
						`${apl.slastName} ${apl.sfirstName}
											${apl.sotherName}`.trimEnd() }}
					</span>
					<div v-else class="flex gap-3 w-fit">
						<TextInput @update:model-value="logger" classer="input-sm" v-model="apl.slastName">Last
							Name
						</TextInput>
						<TextInput @update:model-value="logger" classer="input-sm" v-model="apl.sfirstName">First
							Name
						</TextInput>
						<TextInput @update:model-value="logger" classer="input-sm" v-model="apl.sotherName">Other
							Name
						</TextInput>
					</div>

				</h2>
				<AplInfoCardDate @update:model-value="logger" :date="new Date(apl.sdob!)" @date="handleDate" :name_type="'sdob'"
					:heading="'Date of Birth'" />
				<AplInfoCard @update:model-value="logger" v-model="apl.sgender" :heading="'Gender'" />
				<AplInfoCard @update:model-value="logger" v-model="apl.scontact" :heading="'Contact'" />
				<AplInfoCard @update:model-value="logger" v-model="apl.scity_ob" :heading="'City of Birth'" />
				<AplInfoCard @update:model-value="logger" v-model="apl.scountry_ob" :heading="'Country of Birth'" />
			</div>
		</div>

		<div v-if="apl.children_number > 0" class="divider"></div>


		<div v-if="apl.children_number > 0" class="flex flex-col gap-10">
			<div v-for="(ward, i) in apl.wards" class="flex gap-5">
				<!-- image -->
				<div class="flex flex-col gap-2">
					<div class="indicator">
						<span :class="['indicator-item indicator-top indicator-center badge',
							!edit_mode ? 'badge-primary' : 'badge-primary']">Ward Applicant {{ i + 1
	}}</span>
						<AvatarSelect :classer="`w-[300px] h-[300px]`" :src="wards_image[ward.index!]" />
					</div>
					<div class="flex w-full gap-2 items-end">
						<button v-if="edit_mode && wards_file[0] && curr_ward_file!.apl_type.includes(`ward${i}`)"
							@click="handleWardUpdate(i)" class="btn btn-xs btn-success">
							<span v-if="w_loading && wards_file[0] && curr_ward_file!.apl_type.includes(`ward${i}`)"
								class="loading loading-ring loading-sm text-white"></span>
							<span v-else>Update</span>
						</button>
						<input v-if="edit_mode" @change="e => handleFile(e, `ward${i}`, i)" type="file"
							class="file-input file-input-xs file-input-primary w-full mt-2" />
					</div>
				</div>



				<div class="flex-1 grid grid-cols-2 gap-2 col-span-full h-fit">
					<h2 class="col-span-full py-3 text-2xl font-bold flex justify-between items-center w-full">
						<span>Ward #{{ ward.index! + 1 }}</span>
						<span v-if="!edit_mode" class="font-normal">{{ `${ward.wlastName} ${ward.wfirstName}
													${ward.wotherName}`.trimEnd() }}
						</span>
						<div v-else class="flex gap-3 w-2/3">
							<TextInput @update:model-value="logger" classer="input-sm font-normal" v-model="ward.wlastName">Last Name
							</TextInput>
							<TextInput @update:model-value="logger" classer="input-sm font-normal" v-model="ward.wfirstName">First Name
							</TextInput>
							<TextInput @update:model-value="logger" classer="input-sm font-normal" v-model="ward.wotherName">Other Name
							</TextInput>
						</div>
					</h2>

					<AplInfoCardDate @update:model-value="logger" :date="new Date(ward.wdob!)" @date="handleDate"
						:name_type="'wdob'" :idx="ward.index!" :heading="'Date of Birth'" />
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
import { useViewAplStore } from '@/store/viewApl';
import { useProfileStore } from '@/store/profile';

const { $SB, $trimStringProperties } = useNuxtApp()
const { total_apls } = storeToRefs(useAppStore())
const { empty_ward } = storeToRefs(useAplStore())
const { APL_ID } = storeToRefs(useViewAplStore())
const { role } = storeToRefs(useProfileStore())
const emit = defineEmits(['apl', 'request'])

const apl_data = useApl(APL_ID.value)
apl_data.setApl()
console.log(apl_data.applicant.value);

const if_updated = ref(false)
const { edit_mode } = storeToRefs(useAplStore())
const p_loading = ref(false)
const s_loading = ref(false)
const w_loading = ref(false)
const prime_file = ref<FileWithAplType>()
const sec_file = ref<FileWithAplType>()
const wards_file = ref<FileWithAplType[]>([])
const curr_ward_file = ref<FileWithAplType>()
const prime_image = ref()
const sec_image = ref()
const wards_image = ref<any[]>([])
const request = ref<Requests>({
	apl_id: '',
	modified_apl: null,
	modify_type: '',
	body: '',
	status: '',
	user_id: '',
})
const apl = ref<Applicant>(total_apls.value.find(apl => apl.apl_id == APL_ID.value)!)
const init_ward_count = ref(total_apls.value.find(apl => apl.apl_id == APL_ID.value)!.wards.length)

watch(
	() => apl.value.children_number,
	(newVal) => {

		// apl.value.wards = [];
		// apl.value.aplImg_path.wardsPath = [];
		for (let idx = 0; idx < newVal; idx++) {
			let ward = { ...empty_ward.value };
			ward.index = idx;
			apl.value.wards.push(ward);
			apl.value.aplImg_path.wardsPath.push(`ward${idx}`);
		}
		console.log(apl.value.wards);
		console.log(apl.value.aplImg_path.wardsPath);
	},
);


onMounted(async () => {
	await loadUrl()

	request.value.apl_id = apl.value.apl_id!
	request.value.modify_type = 'edit'
	request.value.modified_apl = apl.value
	request.value.status = 'pending'
	request.value.fullName = apl.value.fullName
	request.value.user_id = useSupabaseUser().value?.id!
	useRequestStore().setRequest(request.value)
	emit('request', request.value)
	emit('apl', apl.value)

	useAplStore().toggleEditMode(false)
})

async function loadUrl() {
	try {
		const { data, error } = await $SB
			.storage
			.from('applicants')
			.createSignedUrls([apl.value.aplImg_path!.primePath[0], apl.value.aplImg_path.secPath[0], ...apl.value.aplImg_path.wardsPath], 3600)

		if (error) throw error
		// console.log(apl.value.aplImg_path);

		// console.log(data);


		prime_image.value = data[0].signedUrl || ''
		sec_image.value = data[1].signedUrl || ''
		if (!data) return
		wards_image.value = data.slice(2).map(img => img.signedUrl)
		// console.log(wards_image.value);

	}
	catch (err: any) {
		console.log((err));
	}
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

function logger(e: any) {
	console.log(e);

	setTimeout(() => {
		request.value.apl_id = apl.value.apl_id!
		request.value.modify_type = 'edit'
		request.value.modified_apl = apl.value
		request.value.status = 'pending'
		request.value.fullName = apl.value.fullName
		request.value.user_id = useSupabaseUser().value?.id!
		useRequestStore().setRequest(request.value)
		emit('request', request.value)
	}, 10)
}

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
	p_loading.value = true
	let aplVal = total_apls.value.filter(applicant => apl.value.apl_id == applicant.apl_id)[0]
	if (!prime_file.value) return;
	if (apl.value.aplImg_path.primePath.length == 0) {
		try {
			// let apl_paths = apl.value.aplImg_path
			// prime_file.value!.apl_type = 'prime'
			let path = await useImageStore().uploadAplImg2(apl.value.apl_id, prime_file.value)
			aplVal.aplImg_path.primePath.push(path)
			console.log(aplVal)
			console.log(path)
			if (!path) aplVal.aplImg_path.primePath.push(`${apl.value.apl_id}/prime.jpeg`)
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
				.insert([$trimStringProperties(aplVal)])
				.eq('apl_id', aplVal.apl_id!)
				.select()
			if (error) throw error
			if_updated.value = true
			console.log(data)
			p_loading.value = false
		} catch (error) {
			console.log(error);
			p_loading.value = false
		}
	} else {
		p_loading.value = true
		let path = await useImageStore().updateSingleAplImg(apl.value.aplImg_path.primePath[0], prime_file.value!);
		if (path) if_updated.value = true
		p_loading.value = false
	}
}
async function handleSecUpdate() {
	s_loading.value = true
	let aplVal = total_apls.value.filter(applicant => apl.value.apl_id == applicant.apl_id)[0]
	if (!sec_file.value) return;
	if (apl.value.aplImg_path.secPath.length == 0) {
		try {
			// sec_file.value!.apl_type = 'sec'
			let path = await useImageStore().uploadAplImg2(apl.value.apl_id, sec_file.value)
			aplVal.aplImg_path.secPath.push(path)
			console.log(aplVal)
			console.log(path)
			if (!path) aplVal.aplImg_path.secPath.push(`${apl.value.apl_id}/sec.jpeg`)
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
				.insert([$trimStringProperties(aplVal)])
				.eq('apl_id', aplVal.apl_id!)
				.select()
			if (error) throw error
			if_updated.value = true
			console.log(data)
			s_loading.value = false
		} catch (error) {
			console.log(error);
			s_loading.value = false
		}
	} else {
		s_loading.value = true
		let path = await useImageStore().updateSingleAplImg(apl.value.aplImg_path.secPath[0], sec_file.value!);
		if (path) if_updated.value = true
		s_loading.value = false
	}
}
async function handleWardUpdate(idx: number) {
	w_loading.value = true
	let aplVal = total_apls.value.filter(applicant => apl.value.apl_id == applicant.apl_id)[0]

	// to see if theres a file before going ahead and sending
	if (wards_file.value.length == 0) return;

	if (apl.value.aplImg_path.wardsPath[idx] == `ward${idx}` || apl.value.aplImg_path.wardsPath[idx] == undefined) {
		try {
			console.log(wards_file.value);

			let path = await useImageStore().uploadAplImg2(apl.value.apl_id, wards_file.value[0])
			aplVal.aplImg_path.wardsPath[idx] = path
			console.log(aplVal)
			console.log(path)
			if (!path) aplVal.aplImg_path.wardsPath[idx] = `${apl.value.apl_id}/ward${idx}.jpeg`
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
				.insert([$trimStringProperties(aplVal)])
				.eq('apl_id', aplVal.apl_id!)
				.select()
			if (error) throw error
			if_updated.value = true
			console.log(data)
			wards_file.value = []
			w_loading.value = false
		} catch (error) {
			console.log(error);
			wards_file.value = []
			w_loading.value = false
		}
		finally {
			wards_file.value = []
			w_loading.value = false
		}
	} else {
		w_loading.value = true
		let path = await useImageStore().updateSingleAplImg(apl.value.aplImg_path.wardsPath[idx], wards_file.value[0]);
		if (path) if_updated.value = true
		w_loading.value = false
	}
}

const resetApl = async () => {
	// let aplVal = await getApplicant(APL_ID.value!)
	// apl.value = aplVal

	apl.value = total_apls.value.find(aplz => aplz.apl_id == apl.value.apl_id)!
}

defineExpose({
	resetApl
})

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
