<template>
	<div class="flex flex-col p-5">
		<div class="w-full flex gap-5">
			<div class="flex flex-col gap-4">
				<AvatarSelect :src="prime_image" :alt="apl.fullName" />
				<AvatarSelect v-if="apl.pmarital_status == 'MARRIED'" :src="sec_image" :alt="apl.fullName" />
				<AvatarSelect v-if="apl.children_number > 0" :src="prime_image" :alt="apl.fullName" />
			</div>

			<div class="flex-1 grid grid-cols-3 gap-2">
				<!-- <p class="w-fit place-self-center">{{ apl.plastName }}</p>
				<p class="w-fit place-self-center">{{ apl.pfirstName }}</p>
				<p class="w-fit place-self-center">{{ apl.potherName }}</p> -->
				<p class="container">
					<span class="heading">Date of Birth</span>
					<span class="info">{{ $formatDateWords(new Date(apl.pdob!)) }}</span>
				</p>
				<p class="container">
					<span class="heading">Confirmation Code</span>
					<span class="info">{{ apl.pconf_code ? apl.pconf_code : `No Confirmation Code` }}</span>
				</p>
				<p class="container">
					<span class="heading">Passport Number</span>
					<span class="info">{{ apl.ppassport_number }}</span>
				</p>
				<p class="container">
					<span class="heading">City of Birth</span>
					<span class="info">{{ apl.pcity_ob }}</span>
				</p>
				<p class="container">
					<span class="heading">Country of Birth</span>
					<span class="info">{{ apl.pcountry_ob }}</span>
				</p>
				<p class="container">
					<span class="heading">Next of Kin Contact</span>
					<span class="info">{{ apl.pother_contact }}</span>
				</p>
				<p class="container">
					<span class="heading">Country You Live in Today</span>
					<span class="info">{{ apl.pcountry_live_today }}</span>
				</p>
				<p class="container">
					<span class="heading">Passport Expiry Date</span>
					<span class="info">{{ $formatDateWords(new Date(apl.passport_ex!)) }}</span>
				</p>
				<p class="container">
					<span class="heading">Email</span>
					<span class="info">{{ apl.pemail }}</span>
				</p>
				<p class="container">
					<span class="heading">Gender</span>
					<span class="info">{{ apl.pgender }}</span>
				</p>
				<p class="container">
					<span class="heading">Marital Status</span>
					<span class="info">{{ apl.pmarital_status }}</span>
				</p>
				<p class="container">
					<span class="heading">Education Level</span>
					<span class="info">{{ apl.peducation_level }}</span>
				</p>
				<p class="container">
					<span class="heading">Contact</span>
					<span class="info">{{ apl.pcontact }}</span>
				</p>
				<p class="container">
					<span class="heading">Residential Address</span>
					<span class="info">{{ apl.ppostal }}</span>
				</p>
				<p class="container">
					<span class="heading">Number of Children</span>
					<span class="info">{{ apl.children_number }}</span>
				</p>

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
const prime_image = ref()
const sec_image = ref()
const wards_image = ref()

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
			.createSignedUrls([props.apl.aplImg_path.primePath[0], props.apl.aplImg_path.secPath[0]], 3600)

		console.log(data);
		if (error) throw error

		prime_image.value = data[0].signedUrl || ''
		sec_image.value = data[1].signedUrl || ''

	}
	catch (err: any) {
		console.log((err));

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
