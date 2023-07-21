<template>
	<div class="flex flex-col p-5">
		<div class="w-full flex gap-5 justify-between">
			<div class="w-2/5 h-full flex flex-col gap-4">
				<AvatarSelect class="w-full aspect-square" :src="prime_image" :alt="apl.fullName" />
				<AvatarSelect class="w-full aspect-square" v-if="apl.pmarital_status == 'MARRIED'" :src="sec_image"
					:alt="apl.fullName" />
				<AvatarSelect class="w-full aspect-square" v-for="src in wards_image" v-if="apl.children_number > 0"
					:src="src.signedUrl" :alt="apl.fullName" />
			</div>

			<div class="flex-1 grid grid-cols-3 gap-2 h-fit">
				<AplInfoCardDate :heading="`Date of Birth`" :date="apl.pdob" @date="handleDate" :name_type="'pdob'" />
				<AplInfoCard @update:model-value="logger" v-model="apl.pconf_code" :heading="'Confirmation Code'" />
				<AplInfoCard @update:model-value="logger" v-model="apl.ppassport_number" :heading="'Passport Number'" />
				<AplInfoCard @update:model-value="logger" v-model="apl.pcity_ob" :heading="'City Of Birth'" />
				<AplInfoCard @update:model-value="logger" v-model="apl.pcountry_ob" :heading="'Country of Birth'" />
				<AplInfoCard @update:model-value="logger" v-model="apl.pother_contact" :heading="'Next of Kin Contact'" />
				<AplInfoCard @update:model-value="logger" v-model="apl.pcountry_live_today"
					:heading="'Country You Live in Today'" />
				<AplInfoCardDate @update:model-value="logger" :date="apl.passport_ex" @date="handleDate"
					:name_type="'passport_ex'" :heading="'Passport Expiry Date'" />
				<AplInfoCard @update:model-value="logger" v-model="apl.pemail" :heading="'Email'" />
				<AplInfoCard @update:model-value="logger" v-model="apl.pgender" :heading="'Gender'" />
				<AplInfoCard @update:model-value="logger" v-model="apl.pmarital_status" :heading="'Marital Status'" />
				<AplInfoCard @update:model-value="logger" v-model="apl.peducation_level" :heading="'Education Level'" />
				<AplInfoCard @update:model-value="logger" v-model="apl.pcontact" :heading="'Contact'" />
				<AplInfoCard @update:model-value="logger" v-model="apl.ppostal" :heading="'Residential Address'" />
				<AplInfoCard @update:model-value="logger" v-model="apl.children_number" :heading="'Number of Children'" />

				<div v-if="apl.pmarital_status === 'MARRIED'" class="pt-10 flex-1 grid grid-cols-3 gap-2 col-span-full">
					<h2 class="col-span-full py-3 text-2xl font-bold flex justify-between"><span>Spouse Information</span> <span
							class="font-normal">{{
								`${apl.slastName} ${apl.sfirstName} ${apl.sotherName}`.trimEnd() }}</span></h2>
					<p class="container">
						<span class="heading">Date of Birth</span>
						<span class="info">
							{{ $formatDateWords(new Date(apl.sdob!)) }}
						</span>
					</p>
					<p class="container">
						<span class="heading">Gender</span>
						<span class="info">{{ apl.sgender }}</span>
					</p>
					<p class="container">
						<span class="heading">Contact</span>
						<span class="info">{{ apl.scontact }}</span>
					</p>
					<p class="container">
						<span class="heading">City of Birth</span>
						<span class="info">{{ apl.scity_ob }}</span>
					</p>
					<p class="container">
						<span class="heading">Country of Birth</span>
						<span class="info">{{ apl.scountry_ob }}</span>
					</p>
				</div>

				<div v-for="ward in apl.wards" v-if="apl.wards.length > 0"
					class="pt-10 flex-1 grid grid-cols-3 gap-2 col-span-full">
					<h2 class="col-span-full py-3 text-2xl font-bold flex justify-between"><span>Ward {{ ward.index }}</span> <span
							class="font-normal">{{
								`${ward.wlastName} ${ward.wfirstName} ${ward.wotherName}`.trimEnd() }}</span></h2>
					<p class="container">
						<span class="heading">Date of Birth</span>
						<span class="info">{{ $formatDateWords(new Date(ward.wdob!)) }}</span>
					</p>
					<p class="container">
						<span class="heading">Gender</span>
						<span class="info">{{ ward.wgender }}</span>
					</p>
					<p class="container">
						<span class="heading">City of Birth</span>
						<span class="info">{{ ward.wcity_ob }}</span>
					</p>
					<p class="container">
						<span class="heading">Country of Birth</span>
						<span class="info">{{ ward.wcountry_ob }}</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Applicant } from 'interfaces/interfaces';

const { $SB } = useNuxtApp()
const props = defineProps<{
	apl: Applicant
}>()
provide('apl', props.apl)
const editMode = inject<boolean>('edit')
const prime_image = ref()
const sec_image = ref()
const wards_image = ref<any[]>([])

onMounted(() => {
	setTimeout(async () => {
		await loadUrl()
	}, 1000)
})

async function loadUrl() {
	console.log(props.apl);

	try {
		const { data, error } = await $SB
			.storage
			.from('applicants')
			.createSignedUrls([props.apl.aplImg_path.primePath[0], props.apl.aplImg_path.secPath[0], ...props.apl.aplImg_path.wardsPath], 3600)

		console.log(data);
		if (error) throw error

		prime_image.value = data[0].signedUrl || ''
		sec_image.value = data[1].signedUrl || ''
		wards_image.value = data.slice(2)

	}
	catch (err: any) {
		console.log((err));
	}
}

function handleDate(e: { name: string, date: Date }) {
	if (e.name == 'pdob') {
		console.log(e);
	} else if (e.name == 'sdob') {
		console.log(e);
	} else if (e.name == 'passport_ex') {
		console.log(e);
	}
}

function logger(e: any) {

	console.log(e)
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
