<template>
	<div id="APL_NEW" class="bg-transparent rounded-xl w-full h-full flex flex-col relative">
		<h1 ref="header_ref"
			class="w-full bg-neutral-900/70 dark:bg-neutral-50/30 outline outline-4 outline-neutral-900/30 dark:outline-neutral-50/60 mb-4 backdrop-blur rounded-xl shadow-xl flex justify-between items-center p-5 transition-all duration-500 ease-out">
			<span ref="discount_ref"
				class="flex flex-col gap-1 dark:text-white dark:hover:text-purple-600 hover:text-neutral-600 group">
				<p class="text-lg flex flex-col">
					<span id="text" class="text-xl">Add a new Applicant</span>
					<button v-if="if_hover_discount" onclick="request_modal.showModal()"
						class="request_btn btn btn-ghost btn-xs dark:group-hover:text-white group-hover:text-secondary">Request
						Discount</button>
				</p>

				<dialog id="request_modal" class="modal">
					<form method="dialog" class="modal-box dark:bg-neutral-50 flex flex-col gap-4">
						<button @click="useAplStore().resetRequest()"
							class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-red-500">✕</button>
						<div class="flex flex-col gap-2 items-center">
							<h3 class="font-semibold text-2xl text-neutral-300 dark:text-neutral-900 mb-5">Input
								discounted amount
								only
							</h3>
							<div class="flex gap-2 items-center">
								<span class="text-neutral-600 text-xl dark:text-neutral-900">GHC</span>
								<input v-model="request.body" type="number" min="0"
									class="input input-xl w-fit outline outline-4 outline-neutral-700 dark:outline-neutral-300 dark:text-neutral-900 dark:bg-white text-2xl text-center text-white"
									placeholder="" />
								<span class="text-neutral-600 dark:text-neutral-900">.00</span>
							</div>
						</div>
						<div class="modal-action flex gap-2 items-center">
							<span data-tip="Contact Supervisor or Manager for pending requests."
								class="text-xs tooltip tooltip-left">
								<svg xmlns="http://www.w3.org/2000/svg" class="w-6 z-[500] aspect-square"
									viewBox="0 0 24 24">
									<path fill="white" class="dark:fill-accent"
										d="M11.75 19h-.25q-3.55 0-6.025-2.475T3 10.5q0-3.55 2.475-6.025T11.5 2q1.775 0 3.313.662t2.7 1.825q1.162 1.163 1.824 2.7T20 10.5q0 3.35-1.888 6.225t-4.762 4.5q-.25.125-.5.138t-.45-.113q-.2-.125-.35-.325t-.175-.475L11.75 19Zm-.275-3.025q.425 0 .725-.3t.3-.725q0-.425-.3-.725t-.725-.3q-.425 0-.725.3t-.3.725q0 .425.3.725t.725.3ZM9.3 8.375q.275.125.55.013t.45-.363q.225-.3.525-.463T11.5 7.4q.6 0 .975.337t.375.863q0 .325-.188.65t-.662.8q-.625.55-.925 1.038t-.3.987q0 .3.213.513t.512.212q.3 0 .5-.225t.3-.525q.125-.425.45-.775t.6-.625q.525-.525.788-1.05t.262-1.05q0-1.15-.788-1.85T11.5 6q-.8 0-1.475.388t-1.1 1.062q-.15.275-.038.537t.413.388Z" />
								</svg>
							</span>
							<button @click="useAplStore().requestDiscount()"
								class="btn btn-sm btn-primary border-none">Request</button>
						</div>
					</form>
				</dialog>
			</span>

			<div class="text-md flex gap-2">
				<button v-if="!apl_sending && if_hover_header" @click="() => {
					useAplStore().resetAplData(); useImageStore().resetFiles(); container!.scrollTo({ top: 0, behavior: 'smooth' })
				}" class="btn font-normal btn-ghost rounded-xl text-white group hover:bg-neutral-900/40 hover:text-white group">
					Reset
					<svg xmlns="http://www.w3.org/2000/svg" class="w-4 aspect-square stroke-red-500"
						viewBox="0 0 24 24">
						<path fill="none" stroke="" stroke-dasharray="12" stroke-dashoffset="12" stroke-linecap="round"
							stroke-width="2" d="M12 12L19 19M12 12L5 5M12 12L5 19M12 12L19 5">
							<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="12;0" />
						</path>
					</svg>
				</button>
				<button v-if="!apl_sending" @click="async () => {
					await useAplStore().handleSend()
					// curr_page = 'prime'
				}" class="btn bg-neutral-800 dark:bg-neutral-900/30 rounded-xl text-yellow-200 outline outline-4 border-none dark:outline-neutral-600 outline-neutral-700/30 group dark:hover:bg-yellow-400 hover:bg-yellow-400 italic hover:text-yellow-800 group font-black">
					SUBMIT
					<SvgsCedis
						class="w-4 aspect-square stroke-white fill-white transition-all duration-150 ease-linear group-hover:fill-black" />
					<span class="text-2xl"> {{
						price }}.00</span>
				</button>
				<button v-else class="btn btn-ghost rounded-xl text-white">
					<span class="loading loading-spinner"></span>
					loading
				</button>
			</div>
		</h1>

		<main ref="container" class="flex-1 rounded-xl overflow-y-auto py-2 pb-6 pl-2 flex flex-col" id="style-1">

			<p class="font-bold uppercase text-3xl drop-shadow-lg mx-auto pt-10 pb-5 text-white">Primary Applicant</p>
			<FieldSetPrimeApl />

			<p v-if="applicant.pmarital_status == 'MARRIED'"
				class="font-bold uppercase text-3xl drop-shadow-lg mx-auto pt-14 pb-5 text-white">Secondary Applicant
			</p>
			<FieldSetSecApl v-if="applicant.pmarital_status == 'MARRIED'" />

			<p v-if="applicant.children_number > 0"
				class="font-bold uppercase text-3xl drop-shadow-lg mx-auto pt-14 pb-5 text-white">Wards
			</p>
			<FieldSetWardApl v-for="(ward) in applicant.wards" v-if="applicant.children_number > 0" :idx="ward.index!"
				:key="ward.index!" :ward_info="applicant.wards![ward.index!]" />
		</main>

		<!-- MODALS -->
		<!-- RECEIPT -->
		<input :checked="if_receipt" type="checkbox" id="receipt-modal" class="modal-toggle" />
		<div class="modal">
			<div
				class="modal-box dark:bg-neutral-50/30 backdrop-blur-lg bg-neutral-900/50 flex flex-col justify-center">
				<p class="py-4 text-center text-4xl text-white font-semibold">
					Receipt Generated!</p>

				<div class="rounded-lg overflow-hidden">
					<div class="flex flex-col items-center gap-4 h-[500px] overflow-y-auto text-black">

						<div id="receipt" class="w-full bg-white py-10 px-10">

							<!-- header -->
							<div class="w-full text-center py-10 border-t-4 border-black border-double font-bold">
								EBBYSGOLD GROUP

								<span class="block text-center w-full font-normal text-sm">
									{{ receipt?.location?.toUpperCase() }} BRANCH
								</span>
							</div>

							<!-- body -->
							<div class="flex flex-col gap-2 text-center border-y-2 border-black border-dashed py-6">
								<div class="flex px-5 justify-between">
									<span class="">DATE</span>
									<span class="font-bold">{{ currDate }}</span>
								</div>
								<div class="flex px-5 justify-between">
									<span class="">CLERK </span>
									<span class="font-bold">{{ profile?.username }} </span>
								</div>
							</div>

							<!-- data -->
							<div class="flex flex-col gap-2 text-center border-b-4 border-black border-double py-6">
								<div class="flex px-5 justify-between">
									<span class="">NAME</span>
									<span class="font-bold">{{ receipt?.fullName }}</span>
								</div>
								<div class="flex px-5 justify-between">
									<span class="">ITEM</span>
									<span class="font-bold">REGISTRATION</span>
								</div>
								<div class="flex px-5 justify-between">
									<span class="">TOTAL</span>
									<span class="font-bold">GHC {{ receipt?.totalPayment }}.00</span>
								</div>
							</div>

							<!-- footer -->
							<div class="flex flex-col gap-10 text-center py-6 pt-2">

								<div class="w-full flex px-5 justify-between">
									<span class="text-[.65rem]">RECEIPT NO.</span>
									<span class="text-[.65rem]">{{ receipt?.apl_id }}</span>
								</div>

								<span class="font-bold text-xs italic">THANK YOU AND ALL THE BEST!</span>
								<span class="flex justify-center">
									<img ref="image"
										:src="'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + receipt?.apl_id"
										alt="qr-code" class="w-24 aspect-square" />
								</span>
							</div>

						</div>


					</div>
				</div>

				<button @click="downloadDivAsPdf('receipt')"
					class="btn btn-ghost text-blue-400 mx-auto mt-2">DOWNLOAD</button>
			</div>


			<label @click="
				useAplStore().$patch({ if_receipt: false });" class=" modal-backdrop bg-[rgb(0,0,0,.7)]"
				for="receipt-modal">Close</label>
		</div>

		<!-- Put this part before </body> tag -->
		<input :checked="if_sent" type="checkbox" id="my_modal_7" class="modal-toggle" />
		<div class="modal">
			<div class="modal-box dark:bg-neutral-50/30 backdrop-blur-lg bg-neutral-900/50">
				<p class="py-4 text-center text-4xl text-white font-semibold">
					Applicant Saved!</p>
			</div>
			<label @click="
				useAplStore().$patch({ if_sent: false, if_receipt: true });
			" class="modal-backdrop bg-[rgb(0,0,0,.7)]">Close</label>
		</div>

		<input :checked="if_req_sent" type="checkbox" id="request_modal_1" class="modal-toggle" />
		<div class="modal">
			<div class="modal-box dark:bg-white dark:outline dark:outline-4 dark:outline-success">
				<p class="py-4 text-center text-4xl dark:text-success dark:font-semibold">
					Request Sent!</p>
			</div>
			<label class="modal-backdrop bg-[rgb(0,0,0,.7)]" for="request_modal_1">Close</label>
		</div>

		<Teleport to="body">
			<div :class="['transition-all duration-500 pointer-events-none ease-out absolute bottom-0 left-1/2 -translate-x-1/2 pb-6',
				if_val_err ? 'opacity-100' : 'opacity-0']">
				<div id="alert" class="alert alert-error">
					<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
						viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span class="">Error! Validation Failed. <br />(Go over and check if all the fields have been
						filled)</span>
				</div>
			</div>
		</Teleport>

	</div>
</template>

<script setup lang="ts">
import { useAplStore } from '@/store/apl';
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app';
import { useProfileStore } from '@/store/profile';
import { useImageStore } from '@/store/images';
import { useTitle } from '@vueuse/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const imageUrl = ref('');
const image = ref<HTMLImageElement | null>(null);
// const loading = ref(true);

const fetchImage = async (url: string) => {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const blob = await response.blob();
		imageUrl.value = URL.createObjectURL(blob);
	} catch (error) {
		console.error('Error fetching image:', error);
		// Optionally set a placeholder image on error
		imageUrl.value = '';
	} finally {
		// loading.value = false;
	}
};

interface DownloadPdfOptions {
	elementId: string;
	filename?: string;
}

async function downloadDivAsPdf(
	elementId: string,
	filename: string = 'receipt.pdf'
): Promise<void> {

	await fetchImage('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + receipt.value?.apl_id);

	const element: HTMLElement | null = document.getElementById(elementId);
	if (!element) {
		console.error('Element not found:', elementId);
		return;
	}

	if (image.value) image.value.src = imageUrl.value

	setTimeout(async () => {
		const canvas: HTMLCanvasElement = await html2canvas(element);
		const imgData: string = canvas.toDataURL('image/png');
		const pdf: jsPDF = new jsPDF();
		const imgWidth: number = 210; // A4 width in mm
		const pageHeight: number = (canvas.height * imgWidth) / canvas.width;
		pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, pageHeight);
		pdf.save(filename);
	}, 1000)
}

useTitle('EG Datapoint | Add Applicant')

// state
const { $gsap } = useNuxtApp()
const { price } = storeToRefs(useAppStore())
const { applicant, if_sent, if_req_sent, apl_sending, request, if_val_err, receiptData: receipt, if_receipt } = storeToRefs(useAplStore());
const { profile } = storeToRefs(useProfileStore());

const currDate = ref();
const dateTries = ref(0);

async function fetchCurrentDate() {
	try {
		const res = await fetch('https://worldtimeapi.org/api/timezone/Africa/Accra');
		const data = await res.json();
		const dateObj = new Date(data.datetime);
		currDate.value = dateObj.toLocaleDateString('en-GB'); // format: DD/MM/YYYY
		console.log('Current Date:', currDate.value);

	} catch (e) {
		// currDate.value = new Date().toLocaleDateString('en-GB');
		if (dateTries.value < 3) {
			dateTries.value++;
			console.error('Error fetching date, retrying...', e);
			await fetchCurrentDate();
		} else {
			dateTries.value = 0;
			currDate.value = new Date().toLocaleDateString('en-GB'); // fallback to local date
			console.error('Failed to fetch date after multiple attempts, using local date:', currDate.value);
		}
	}
}

onBeforeMount(() => {
	fetchCurrentDate();
});

// hover effects
const discount_ref = ref()
const header_ref = ref()
const container = ref<HTMLElement>()
const if_hover_discount = useElementHover(discount_ref)
const if_hover_header = useElementHover(header_ref)

watch(if_sent, val => {
	if (val) {
		container.value!.scrollTo({ top: 0, behavior: 'smooth' })
	}
})


function reset() {
	useAplStore().resetAplData()
	useAplStore().$patch({ if_sent: false })
	useImageStore().resetFiles()

}

onBeforeMount(() => {
	reset()
})

onBeforeUnmount(() => {
	reset()
})

watch(if_val_err, (val) => {
	if (val) {
		$gsap.to('#alert', {
			y: -20,
			duration: .5,
			ease: 'out',
		})
	} else {
		$gsap.to('#alert', {
			y: 20,
			duration: .5,
			ease: 'out',
		})
	}
})
</script>