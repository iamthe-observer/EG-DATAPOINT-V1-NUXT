<template>
	<div :key="num" class="w-full h-full flex flex-col rounded-2xl pb-2">
		<div ref="container"
			class="w-full h-full rounded-2xl bg-neutral-800 col-span-full row-span-full pb-2 overflow-y-scroll scrollbar-hidden text-justify px-0 relative">
			<h1
				class="px-5 py-5 rounded-2xl bg-neutral-700 text-2xl w-full flex justify-between items-center sticky top-0 mb-2 shadow-lg z-10">
				<span class="">Add a new Applicant</span>

				<steps v-if="apl_data.prime?.pmarital_status !== 'UNMARRIED' || apl_data.prime?.children_number !== 0"
					@step="handleStep" :steps="steps_" class="text-sm" />

				<div class="text-md">
					<button @click="handleSend" class="btn btn-outline rounded-xl text-white group">
						SUBMIT
						<SvgsCedis
							class="w-4 aspect-square stroke-white fill-white group-hover:fill-black transition-all duration-150 ease-linear" />
						{{
							price }}.00
					</button>
				</div>
			</h1>
			<!-- text fields -->
			<FieldSetPrimeApl @file="onSelect" @validate="setPrimeValidate" @apl="handlePrimeInput" v-if="curr_page == 'prime'"
				:container="container!" />

			<FieldSetSecApl @file="onSelect" @validate="setSecValidate" @sec="handleSecInput" :container="container!"
				v-if="curr_page == 'sec'" />


			<FieldSetWardContainer @handle-ward-input="handleWardInput" :container="container!" :curr_page="curr_page"
				:apl_data="apl_data" />
		</div>

		<!-- Put this part before </body> tag -->
		<input :checked="if_sent" type="checkbox" id="my_modal_7" class="modal-toggle" />
		<div class="modal">
			<div class="modal-box">
				<p class="py-4 text-center text-2xl">Applicant Saved!</p>
			</div>
			<label class="modal-backdrop bg-[rgb(0,0,0,.7)]" for="my_modal_7">Close</label>
		</div>
	</div>
</template>

<script setup lang="ts">
import { PrimeApplicant, WardsApplicant, SecApplicant, AplData, Applicant } from '@/interfaces/interfaces';
import { useAplStore } from '@/store/apl';
import { useImageStore } from '@/store/images';
import { required, email, numeric } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid'
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app';

const price = computed(() => {
	const pp = useAppStore().prices[0]
	const if_sp = apl_data.prime?.pmarital_status == 'MARRIED'
	const if_wa = apl_data.prime?.children_number! > 0

	if (pp) {
		if (!if_sp && if_wa) {
			return pp.adult + (pp.child * apl_data.prime?.children_number!)
		} else if (if_sp && !if_wa) {
			return pp.adult * 2
		} else if (if_sp && if_wa) {
			return (pp.adult * 2) + (pp.child * apl_data.prime?.children_number!)
		} else if (!if_sp && !if_wa) {
			return pp.adult
		}
	} else {
		return 0
	}
})

const container = ref<HTMLDivElement>()
const { $SB } = useNuxtApp()
const { has_files } = storeToRefs(useImageStore())
const steps_ = ref([{ name: 'Primary', page: 'prime' }])
const curr_page = ref('prime')
const if_sent = ref<boolean>(false)
const num = ref(0)
const apl_data = reactive<AplData>({
	prime: null,
	sec: null,
	wards: [],
})

// watchEffect(() => {
// 	if (curr_page.value == 'wards') {
// 		setTimeout(() => {
// 			container.value!.scrollTo({ top: 0, behavior: 'smooth' });
// 		}, 1000)
// 	}
// })

const onSelect = (evt: any) => {
	useImageStore().setFiles(evt.file, evt.type)
	console.log(evt);
}


// validation
const val = reactive<{ prime: boolean; sec: boolean; wards: { idx: number; val: boolean }[] }>({
	prime: false,
	sec: false,
	wards: []
})

const if_prime = computed(() => { return val.prime })
const if_spouse = computed(() => {
	if (val.sec && apl_data.prime?.pmarital_status == 'MARRIED') {
		return true
	} else {
		return false
	}
})
const if_wards = computed(() => {
	if (val.wards.every(ward => ward.val) && apl_data.prime?.children_number! > 0 && apl_data.prime?.children_number! == apl_data.prime?.wards.length) {
		return true
	} else { return false }
})

const if_validated = computed(() => {

})

const rules = computed(() => {
	return {
		plastName: { required },
		pfirstName: { required },
		potherName: { required },
		pdob: { required },
		pcity_ob: { required },
		pcountry_ob: { required },
		pgender: { required },
		pemail: { required, email },
		ppassport_number: { required },
		passport_ex: { required },
		pcountry_live_today: { required },
		peducation_level: { required },
		ppostal: { required },
		pmarital_status: { required },
		children_number: { required, numeric },
		fullName: { required },
		pcontact: { required },
		totalPayment: { required },
		pother_contact: { required },
	}
})

onBeforeUnmount(() => {
	useAplStore().resetAplData()
	useImageStore().resetFiles()
})

// this handles the visibility of the steps
watchEffect(() => {
	if (apl_data.prime?.pmarital_status === 'MARRIED') {
		if (steps_.value.every(step => step.name != 'Secondary'))
			steps_.value.push({ name: 'Secondary', page: 'sec' })
	}

	if (apl_data.prime?.pmarital_status !== 'MARRIED') {
		let stepper = steps_.value.filter(step => step.name !== 'Secondary')
		steps_.value = stepper
	}

	if (apl_data.prime?.children_number! > 0) {
		let stepper = steps_.value.filter(step => !step.name.startsWith('Wards'))
		steps_.value = stepper
		steps_.value.push({ name: 'Wards', page: 'ward' })

	}

	if (apl_data.prime?.children_number == 0) {
		let stepper = steps_.value.filter(step => step.name == 'Primary' || step.name == 'Secondary')
		steps_.value = stepper
	}
})
watchEffect(() => {
	if (apl_data.prime?.pmarital_status == 'UNMARRIED') {
		resetApl_sec()
	}
})
// resets wards on number of children
watchEffect(() => {
	if (apl_data.prime?.children_number == 0) {
		resetApl_wards()
	}
})
// check to regulate the amount of wards in apl_data.wards
watchEffect(() => {
	if (apl_data.wards?.length! > apl_data.prime?.children_number! && apl_data.wards?.length != 0) {
		let diff = apl_data.wards?.length! - apl_data.prime?.children_number!
		for (let ii = 0; ii < diff; ii++) {
			apl_data.wards?.pop()
		}
		console.log('done');
	}
})

function setPrimeValidate(e: boolean) {
	val.prime = e
}
function setSecValidate(e: boolean) {
	val.sec = e
}
function resetApl_sec() {
	apl_data.sec = {
		slastName: '',
		sfirstName: '',
		sotherName: '',
		scity_ob: '',
		scountry_ob: '',
		scontact: '',
		sgender: '',
		sdob: null,
	}
}
function resetApl_wards() {
	apl_data.wards = []
}
// resets sec on marital status change
function handleStep(page: string) {
	curr_page.value = page
}

const handlePrimeInput = (prime: PrimeApplicant) => {
	apl_data.prime = prime
}
const handleSecInput = (sec: SecApplicant) => {
	apl_data.sec = sec
}
const handleWardInput = (child: { ward: WardsApplicant, valid: boolean }) => {
	if (apl_data.wards?.length! > 0 && apl_data.wards!.some(warder => warder.index == child.ward.index)) {
		const filtered_ward = apl_data.wards!.filter(warder => warder.index != child.ward.index)
		const filtered_ward_valid = val.wards!.filter(warder => warder.idx != child.ward.index)

		filtered_ward.push(child.ward)
		filtered_ward_valid.push({ idx: child.ward.index, val: child.valid })

		filtered_ward.sort((a, b) => a.index - b.index)
		filtered_ward_valid.sort((a, b) => a.idx - b.idx)

		apl_data.wards = filtered_ward
		val.wards = filtered_ward_valid

	} else {
		apl_data.wards!.push(child.ward)
		val.wards!.push({ idx: child.ward.index, val: child.valid })
		apl_data.wards!.sort((a, b) => a.index - b.index)
		val.wards!.sort((a, b) => a.idx - b.idx)
	}

	console.log(val.wards);

	useAplStore().setWardsApl(apl_data.wards!)
}

const submitApl = async (apl: Applicant) => {
	if_sent.value = false
	try {
		if (has_files.value) {
			let { primePath, secPath, wardsPath } =
				await useImageStore().uploadFiles(apl.apl_id)
			apl.aplImg_path.primePath = primePath
			apl.aplImg_path.secPath = secPath
			apl.aplImg_path.wardsPath = wardsPath
		}
		console.log(apl.aplImg_path);

		const { error } = await $SB.from('applicants').insert([apl])

		if (error) throw error
		if_sent.value = true
		useAplStore().resetAplData()
		return 'done'
	} catch (err: any) {
		console.log(err);
	}
}

const handleSend = async () => {
	let apl_info: Applicant
	// puts wards into apl_data
	if (apl_data.wards?.length! > 0) {
		for (let ii = 0; ii < apl_data.wards!.length; ii++) {
			const el = apl_data.wards![ii];
			apl_data.prime?.wards!.push(el)
		}
	}

	apl_info = {
		created_at: apl_data.prime!.created_at,
		aplImg_path: !apl_data.prime!.aplImg_path
			? { primePath: [], secPath: [], wardsPath: [] }
			: apl_data.prime!.aplImg_path,
		apl_id: uuidv4(),
		fullName: apl_data.prime!.fullName,
		plastName: apl_data.prime!.plastName?.toUpperCase().trim(),
		pfirstName: apl_data.prime!.pfirstName?.toUpperCase().trim(),
		potherName: apl_data.prime!.potherName?.toUpperCase().trim(),
		pdob: apl_data.prime!.pdob,
		ppassport_number: apl_data.prime!.ppassport_number,
		passport_ex: apl_data.prime!.passport_ex,
		pgender: apl_data.prime!.pgender,
		pcity_ob: apl_data.prime!.pcity_ob,
		pconf_code: apl_data.prime!.pconf_code,
		pcountry_ob: apl_data.prime!.pcountry_ob,
		pemail: apl_data.prime!.pemail,
		pcountry_live_today: apl_data.prime!.pcountry_live_today,
		peducation_level: apl_data.prime!.peducation_level,
		pcontact: apl_data.prime!.pcontact,
		pother_contact: apl_data.prime!.pother_contact,
		ppostal: apl_data.prime!.ppostal,
		pmarital_status: apl_data.prime!.pmarital_status,
		children_number: apl_data.prime!.children_number,
		wards: apl_data.prime!.wards,
		psocial_media: apl_data.prime!.psocial_media,

		slastName: apl_data.sec!.slastName || '',
		sfirstName: apl_data.sec!.sfirstName || '',
		sotherName: apl_data.sec!.sotherName || '',
		sdob: apl_data.sec!.sdob || null,
		sgender: apl_data.sec!.sgender || '',
		scity_ob: apl_data.sec!.scity_ob || '',
		scountry_ob: apl_data.sec!.scountry_ob || '',
		scontact: apl_data.sec!.scontact || '',
		totalPayment: price.value!,
		user_id: useSupabaseUser().value?.id!,
	}

	console.log(val);
	console.log(apl_info);

	if (apl_info.pmarital_status == 'MARRIED' && apl_info.children_number == 0) {
		if (if_prime.value && if_spouse.value && !if_wards.value) {
			await doAction(apl_info)
		} else {
			if_sent.value = false
			alert('fix yo shit');
		}
	} else if (apl_info.pmarital_status == 'MARRIED' && apl_info.children_number > 0) {
		if (if_prime.value && if_spouse.value && if_wards.value) {
			await doAction(apl_info)
		} else {
			if_sent.value = false
			alert('fix yo shit');
		}
	} else if (apl_info.pmarital_status == 'UNMARRIED' && apl_info.children_number > 0) {
		if (if_prime.value && !if_spouse.value && if_wards.value) {
			await doAction(apl_info)
		} else {
			if_sent.value = false
			alert('fix yo shit');
		}
	} else if (apl_info.pmarital_status == 'UNMARRIED' && apl_info.children_number == 0) {
		if (if_prime.value && !if_spouse.value && !if_wards.value) {
			await doAction(apl_info)
		} else {
			if_sent.value = false
			alert('fix yo shit');
		}
	}

}

const doAction = async (apl_info: any) => {
	await submitApl(apl_info)
	num.value++
	console.log('done');
}

// TODO error handler for JWT expiration

</script>

<style scoped>
.griddy {
	display: grid;
}
</style>
