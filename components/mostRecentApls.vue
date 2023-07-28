<template>
	<div class="__most_recent_apls col-span-3 row-span-7 p-2">
		<div class="bg-neutral-800 w-full h-full rounded-xl p-2 flex flex-col gap-2">
			<h2 class="flex-1 flex items-center justify-between cursor-pointer hover:text-secondary"
				@click="$router.push('/database')">
				<span class="text-lg font-medium">Total Requests</span>
				<span class="text-lg font-medium">{{ requests.length }}</span>
			</h2>


			<div class="flex justify-evenly gap-2 bg-neutral-900 rounded-lg w-full h-3/4">
				<div class="flex-1 flex flex-col items-center justify-center">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-10 aspect-square" viewBox="0 0 24 24">
						<g stroke="#888888" stroke-linecap="round" stroke-width="2">
							<path fill="#888888" fill-opacity="0" stroke-dasharray="60" stroke-dashoffset="60"
								d="M5.63604 5.63603C9.15076 2.12131 14.8492 2.12131 18.364 5.63603C21.8787 9.15075 21.8787 14.8492 18.364 18.364C14.8492 21.8787 9.15076 21.8787 5.63604 18.364C2.12132 14.8492 2.12132 9.15075 5.63604 5.63603Z">
								<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0" />
								<animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.15s" values="0;0.3" />
							</path>
							<path fill="none" stroke-dasharray="18" stroke-dashoffset="18" d="M6 6L18 18">
								<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="18;0" />
							</path>
						</g>
					</svg>

					<span class="text-sm">Rejected</span>
					<span class="text-sm">{{ requests.filter(req => req.status == 'reject').length }}</span>
				</div>

				<div class="flex-1 flex flex-col items-center justify-center">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-10 aspect-square" viewBox="0 0 24 24">
						<g fill="none" stroke="#888888" stroke-linecap="round" stroke-width="2">
							<path stroke-dasharray="2 4" stroke-dashoffset="6"
								d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3">
								<animate attributeName="stroke-dashoffset" dur="0.6s" repeatCount="indefinite" values="6;0" />
							</path>
							<path stroke-dasharray="30" stroke-dashoffset="30"
								d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21">
								<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.1s" dur="0.3s" values="30;0" />
							</path>
							<path stroke-dasharray="10" stroke-dashoffset="10" d="M12 16v-7.5">
								<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="10;0" />
							</path>
							<path stroke-dasharray="6" stroke-dashoffset="6" d="M12 8.5l3.5 3.5M12 8.5l-3.5 3.5">
								<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="6;0" />
							</path>
						</g>
					</svg>
					<span class="text-sm">Pending</span>
					<span class="text-sm">{{ requests.filter(req => req.status == 'pending').length }}</span>
				</div>

				<div class="flex-1 flex flex-col items-center justify-center">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-10 aspect-square" viewBox="0 0 24 24">
						<path fill="#888888" fill-opacity=".3" d="M6 4H10V6H14V4H18V20H6V4Z" />
						<g fill="none" stroke="#888888" stroke-linecap="round" stroke-linejoin="round">
							<g stroke-width="2">
								<path d="M12 3H19V21H5V3H12Z" />
								<path stroke-dasharray="10" stroke-dashoffset="10" d="M9 13L11 15L15 11">
									<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="10;0" />
								</path>
							</g>
							<path d="M14.5 3.5V6.5H9.5V3.5" />
						</g>
					</svg>
					<span class="text-sm">Approved</span>
					<span class="text-sm">{{ requests.filter(req => req.status == 'approved').length }}</span>
				</div>
			</div>

		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRequestStore } from '@/store/requests';

const { requests } = storeToRefs(useRequestStore())
</script>