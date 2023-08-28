<template>
	<div class="flex flex-col p-5">
		<!-- primary -->
		<div class="flex gap-4">
			<!-- image -->
			<div class="flex flex-col gap-2">
				<div class="indicator">
					<span :class="['indicator-item indicator-top indicator-center badge',
						!edit_mode ? 'badge-primary' : 'badge-primary']">Primary Applicant</span>
					<AvatarSelect :classer="`w-[300px] h-[300px]`" :src="prime_image" />
				</div>
				<div class="flex w-full gap-2 items-end">
					<button v-if="edit_mode && prime_file" @click="viewApl.handlePrimeUpdate" class="btn btn-xs btn-success">
						<span v-if="p_loading" class="loading loading-ring loading-sm text-white"></span>
						<span v-else>Update</span>
					</button>
					<input v-if="edit_mode" @change="e => viewApl.handleFile(e, 'prime')" type="file"
						class="file-input file-input-xs file-input-primary w-full mt-2" />
				</div>
			</div>

			<!-- info -->
			<div class="grid grid-cols-3 gap-2 w-full h-fit">
				<InfoCardDate heading="Date of Birth" v-model="apl.pdob" />
				<InfoCard heading="City of Birth" v-model="apl.pcity_ob" />
				<InfoCardSelect :options="$countries" heading="Country of Birth" v-model="apl.pcountry_ob" />
				<InfoCardSelect :options="['MALE', 'FEMALE']" heading="Gender" v-model="apl.pgender" />
				<InfoCard heading="Contact" v-model="apl.pcontact" />
				<InfoCard heading="Next of Kin Contact" v-model="apl.pother_contact" />
				<InfoCard heading="Email" v-model="apl.pemail" />
				<InfoCard heading="Passport Number" v-model="apl.ppassport_number" />
				<InfoCardDate heading="Passport Expiration Date" v-model="apl.passport_ex" />
				<InfoCard heading="Residential Address" v-model="apl.ppostal" />
				<InfoCardSelect :options="$countries" heading="Country You Live in Today" v-model="apl.pcountry_live_today" />
				<InfoCardSelect :options="$highest_level_ed" heading="Education Level" v-model="apl.peducation_level" />
				<InfoCardSelect :options="$marital_status" heading="Marital Status" v-model="apl.pmarital_status" />
				<InfoCardSelect :num_options="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" heading="Number of Children"
					v-model="apl.children_number" />
				<InfoCard v-if="apl.pconf_code" heading="Confirmation Code" v-model="apl.pconf_code" />
				<InformationCard :class="apl.pconf_code ? 'col-span-full' : 'col-span-1'" heading="Payment"
					v-model="apl.totalPayment" />

			</div>
		</div>


		<!-- secondary -->
		<div v-if="apl.pmarital_status == 'MARRIED'" class="flex gap-4 pt-32">
			<!-- image -->
			<div class="flex flex-col gap-2">
				<div class="indicator">
					<span :class="['indicator-item indicator-top indicator-center badge',
						!edit_mode ? 'badge-primary' : 'badge-primary']">Secondary Applicant</span>
					<AvatarSelect :classer="`w-[300px] h-[300px]`" :src="sec_image" />
				</div>
				<div class="flex w-full gap-2 items-end">
					<button v-if="edit_mode && sec_file" @click="viewApl.handleSecUpdate" class="btn btn-xs btn-success">
						<span v-if="s_loading" class="loading loading-ring loading-sm text-white"></span>
						<span v-else>Update</span>
					</button>
					<input v-if="edit_mode" @change="e => viewApl.handleFile(e, 'sec')" type="file"
						class="file-input file-input-xs file-input-primary w-full mt-2" />
				</div>
			</div>

			<!-- info -->
			<div class="grid grid-cols-3 gap-2 w-full h-fit">
				<h2 class="col-span-full py-3 text-2xl font-bold flex justify-between items-center">
					<span>Spouse Information</span>
					<span v-if="!edit_mode" class="font-normal">{{
						`${apl.slastName} ${apl.sfirstName}
											${apl.sotherName}`.trimEnd() }}
					</span>
					<div v-else class="flex gap-3 w-fit">
						<TextInput classer="input-sm" v-model="apl.slastName">Last
							Name
						</TextInput>
						<TextInput classer="input-sm" v-model="apl.sfirstName">First
							Name
						</TextInput>
						<TextInput classer="input-sm" v-model="apl.sotherName">Other
							Name
						</TextInput>
					</div>
				</h2>

				<InfoCardDate heading="Date of Birth" v-model="apl.sdob" />
				<InfoCardSelect :options="['MALE', 'FEMALE']" heading="Gender" v-model="apl.sgender" />
				<InfoCard heading="City of Birth" v-model="apl.scity_ob" />
				<InfoCardSelect :options="$countries" heading="Country of Birth" v-model="apl.scountry_ob" />
				<InfoCard heading="Contact" v-model="apl.scontact" />
			</div>
		</div>


		<div v-if="apl.children_number > 0" class="flex flex-col gap-10 pt-32">
			<div v-for="(ward, i) in apl.wards" :key="i" class="flex gap-5">
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
							@click="viewApl.handleWardUpdate(i)" class="btn btn-xs btn-success">
							<span v-if="w_loading && wards_file[0] && curr_ward_file!.apl_type.includes(`ward${i}`)"
								class="loading loading-ring loading-sm text-white"></span>
							<span v-else>Update</span>
						</button>
						<input v-if="edit_mode" @change="e => viewApl.handleFile(e, `ward${i}`, i)" type="file"
							class="file-input file-input-xs file-input-primary w-full mt-2" />
					</div>
				</div>


				<!-- wards -->
				<div class="flex-1 grid grid-cols-2 gap-2 col-span-full h-fit">
					<h2 class="col-span-full py-3 text-2xl font-bold flex justify-between items-center w-full">
						<span>Ward #{{ ward.index! + 1 }}</span>
						<span v-if="!edit_mode" class="font-normal">{{ `${ward.wlastName} ${ward.wfirstName}
													${ward.wotherName}`.trimEnd() }}
						</span>
						<div v-else class="flex gap-3 w-2/3">
							<TextInput classer="input-sm font-normal" v-model="ward.wlastName">Last Name
							</TextInput>
							<TextInput classer="input-sm font-normal" v-model="ward.wfirstName">First Name
							</TextInput>
							<TextInput classer="input-sm font-normal" v-model="ward.wotherName">Other Name
							</TextInput>
						</div>
					</h2>

					<InfoCardDate v-model="ward.wdob" :heading="'Date of Birth'" />
					<InfoCardSelect :options="['MALE', 'FEMALE']" v-model="ward.wgender" :heading="'Gender'" />
					<InfoCard v-model="ward.wcity_ob" :heading="'City of Birth'" />
					<InfoCardSelect :options="$countries" v-model="ward.wcountry_ob" :heading="'Country of Birth'" />
				</div>
			</div>

		</div>

		<input :checked="if_updated" type="checkbox" id="my_modal_7" class="modal-toggle" />
		<div class="modal">
			<div class="modal-box">
				<p class="py-4 text-center text-2xl">Image Updated!</p>
			</div>
			<label @click="viewApl.$patch({ if_updated: false })" class="modal-backdrop bg-[rgb(0,0,0,.7)]"
				for="my_modal_7">Close</label>
		</div>

	</div>
</template>

<script setup lang="ts">
import { useViewAplStore } from '@/store/viewApl';
import { storeToRefs } from 'pinia';


const viewApl = useViewAplStore()
const { edit_mode, prime_image, sec_image, p_loading, s_loading, prime_file, sec_file, applicant: apl, curr_ward_file, wards_file, wards_image, w_loading, if_updated } = storeToRefs(viewApl)

onBeforeMount(async () => {
	await viewApl.onLoad()
})

onBeforeUnmount(() => {
	viewApl.$patch({
		prime_image: undefined, sec_image: undefined, wards_image: [], edit_mode: false,
	})
})
</script>

<style scoped></style>