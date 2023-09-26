<template>
	<section class="absolute z-50 top-0 -left-8 h-full w-20 flex justify-center items-center">

		<div class="w-full h-[95%] border-2 border-black bg-secondary flex flex-col items-center text-black py-3">

			<span class="font-bold mb-5">Menu</span>

			<div class="flex w-full h-full flex-col justify-between items-center">
				<section class="flex flex-col w-full gap-8 items-center">

					<NuxtLink to="/dashboard" class="__icons_container tooltip tooltip-primary z-20 tooltip-right"
						data-tip="Dashboard">
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
							<path fill="currentColor"
								d="M4 20v2h4.586L2 28.586L3.414 30L10 23.414V28h2v-8H4zm20 1h2v5h-2zm-4-5h2v10h-2zm-4 2h2v8h-2z" />
							<path fill="currentColor"
								d="M28 2H4a2.002 2.002 0 0 0-2 2v12h2v-3h24.001l.001 15H16v2h12a2.003 2.003 0 0 0 2-2V4a2.002 2.002 0 0 0-2-2Zm-16 9H4V4h8Zm2 0V4h14v7Z" />
						</svg>
					</NuxtLink>

					<NuxtLink to="/newApplicantV2" class="__icons_container tooltip tooltip-primary z-20 tooltip-right"
						data-tip="Add Applicant">
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256">
							<path fill="currentColor"
								d="M256 136a8 8 0 0 1-8 8h-16v16a8 8 0 0 1-16 0v-16h-16a8 8 0 0 1 0-16h16v-16a8 8 0 0 1 16 0v16h16a8 8 0 0 1 8 8Zm-57.87 58.85a8 8 0 0 1-12.26 10.3C165.75 181.19 138.09 168 108 168s-57.75 13.19-77.87 37.15a8 8 0 0 1-12.25-10.3c14.94-17.78 33.52-30.41 54.17-37.17a68 68 0 1 1 71.9 0c20.65 6.76 39.23 19.39 54.18 37.17ZM108 152a52 52 0 1 0-52-52a52.06 52.06 0 0 0 52 52Z" />
						</svg>
					</NuxtLink>

					<NuxtLink :to="{ path: '/viewApplicants' }" class="__icons_container tooltip tooltip-primary z-20 tooltip-right"
						data-tip="View Applicants">
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256">
							<g fill="currentColor">
								<path
									d="M168 144a40 40 0 1 1-40-40a40 40 0 0 1 40 40ZM64 56a32 32 0 1 0 32 32a32 32 0 0 0-32-32Zm128 0a32 32 0 1 0 32 32a32 32 0 0 0-32-32Z"
									opacity=".2" />
								<path
									d="M244.8 150.4a8 8 0 0 1-11.2-1.6A51.6 51.6 0 0 0 192 128a8 8 0 0 1 0-16a24 24 0 1 0-23.24-30a8 8 0 1 1-15.5-4A40 40 0 1 1 219 117.51a67.94 67.94 0 0 1 27.43 21.68a8 8 0 0 1-1.63 11.21ZM190.92 212a8 8 0 1 1-13.85 8a57 57 0 0 0-98.15 0a8 8 0 1 1-13.84-8a72.06 72.06 0 0 1 33.74-29.92a48 48 0 1 1 58.36 0A72.06 72.06 0 0 1 190.92 212ZM128 176a32 32 0 1 0-32-32a32 32 0 0 0 32 32Zm-56-56a8 8 0 0 0-8-8a24 24 0 1 1 23.24-30a8 8 0 1 0 15.5-4A40 40 0 1 0 37 117.51a67.94 67.94 0 0 0-27.4 21.68a8 8 0 1 0 12.8 9.61A51.6 51.6 0 0 1 64 128a8 8 0 0 0 8-8Z" />
							</g>
						</svg>
					</NuxtLink>

					<NuxtLink to="/database" class="__icons_container tooltip tooltip-primary z-20 tooltip-right"
						data-tip="Database">
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
							<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
								d="M4 6s0-3 7-3s7 3 7 3M4 6s0 3 7 3s7-3 7-3M4 6v6m14-6v6s0 3-7 3s-7-3-7-3m7 9c-7 0-7-3-7-3v-6m13.306 5.113l.909-1.927a.312.312 0 0 1 .57 0l.91 1.927l2.032.311c.261.04.365.376.177.568l-1.471 1.5l.347 2.118c.044.272-.229.48-.462.351l-1.818-1l-1.818 1c-.233.129-.506-.079-.462-.351l.347-2.118l-1.47-1.5c-.19-.192-.085-.528.176-.568l2.033-.31Z" />
						</svg>
					</NuxtLink>

					<NuxtLink v-if="role" to="/analytics" class="__icons_container tooltip tooltip-primary z-20 tooltip-right"
						data-tip="Analytics">
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
							<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M3 5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm4 15h10m-8-4v4m6-4v4m-6-8V8m3 4v-1m3 1v-2m-3 2v-1" />
						</svg>
					</NuxtLink>
				</section>

				<div class="w-full font-bold text-center">
					{{ profile?.fullname }}
				</div>
			</div>

		</div>

	</section>
</template>

<script setup lang="ts">
import { useProfileStore } from '@/store/profile'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'

const { role, profile } = storeToRefs(useProfileStore())
const { dark_mode, is_mobile } = storeToRefs(useAppStore())
</script>

<style scoped></style>