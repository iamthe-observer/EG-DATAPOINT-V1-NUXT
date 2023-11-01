<template>
	<div class="w-full h-full flex flex-col rounded-2xl">
		<div v-if="!if_apls_ex"
			class="w-full h-full rounded-2xl dark:bg-neutral-50 dark:shadow-xl bg-neutral-800 col-span-full row-span-full text-justify relative flex flex-col">

			<header
				class="w-full min-h-[4rem] dark:bg-primary bg-neutral-700 rounded-2xl flex items-center justify-between px-4">
				<h1 v-if="!role" class="text-2xl dark:text-neutral-50">View All Applicants <span class="text-2xl">({{
					all_my_apls.length
				}})</span></h1>
				<h1 v-else class="flex items-center gap-3 dark:text-neutral-50">
					<span class="text-2xl whitespace-nowrap">
						View All Applicants
					</span>
					<span class="text-2xl">({{ total_apls.length }})</span>
					<select v-model="curr_user"
						class="select w-full select-sm rounded-full bg-[rgb(13,13,13)] dark:bg-neutral-50 dark:text-black">
						<option selected value="all">All Users</option>
						<option v-for="user in profiles" :value="user.id">{{ `${user.fullname || 'User'} (${total_apls.filter(apl =>
							apl.user_id
							==
							user.id).length})` }}</option>
					</select>
				</h1>

				<div v-if="role ? total_apls.length > step : all_my_apls.length > step" class="join">
					<button class="join-item btn btn-sm rounded-full btn-primary" @click="PrevPage(page_index)">«</button>
					<button class="join-item btn btn-sm rounded-full btn-primary">Page {{ page_index }}</button>
					<button class="join-item btn btn-sm rounded-full btn-primary" @click="NextPage()">»</button>
				</div>

				<div class="flex items-center gap-2">
					<div class="join">
						<input @click="() => {
							filter_alpha = true
							filter_recent = false
							filter_registered = false
							filter_unregistered = false
							// filter_reverse = false
							// filter_family = false
							// filter_with_kids = false
							// filter_with_spouse = false
							// filter_single = false
							page_index = 1
						}" :checked="filter_alpha" class="join-item btn btn-xs rounded-full dark:bg-purple-500 dark:border-none"
							type="radio" name="options" aria-label="Alphabetic" />
						<input @click="() => {
							filter_alpha = false
							filter_recent = true
							filter_registered = false
							filter_unregistered = false
							// filter_reverse = false
							// filter_family = false
							// filter_with_kids = false
							// filter_with_spouse = false
							// filter_single = false
							page_index = 1
						}" :checked="filter_recent" class="join-item btn btn-xs rounded-full dark:bg-purple-500 dark:border-none"
							type="radio" name="options" aria-label="Recency" />
						<input @click="() => {
							filter_alpha = false
							filter_recent = false
							filter_registered = true
							filter_unregistered = false
							// filter_reverse = false
							// filter_family = false
							// filter_with_kids = false
							// filter_with_spouse = false
							// filter_single = false
							page_index = 1
						}" :checked="filter_registered" class="join-item btn btn-xs rounded-full dark:bg-purple-500 dark:border-none"
							type="radio" name="options" aria-label="Registered" />
						<input @click="() => {
							filter_alpha = false
							filter_recent = false
							filter_registered = false
							filter_unregistered = true
							// filter_reverse = false
							// filter_family = false
							// filter_with_kids = false
							// filter_with_spouse = false
							// filter_single = false
							page_index = 1
						}" :checked="filter_unregistered" class="join-item btn btn-xs rounded-full dark:bg-purple-500 dark:border-none"
							type="radio" name="options" aria-label="Unregistered" />
						<!-- <input @click="() => {
							filter_alpha = false
							filter_recent = false
							filter_reverse = true
							filter_family = false
							filter_with_kids = false
							filter_with_spouse = false
							filter_single = false
							page_index = 1
						}" :checked="filter_reverse" class="join-item btn btn-xs rounded-full dark:bg-purple-500 dark:border-none"
							type="radio" name="options" aria-label="Reverse" />
						<input @click="() => {
							filter_alpha = false
							filter_recent = false
							filter_reverse = false
							filter_family = true
							filter_with_kids = false
							filter_with_spouse = false
							filter_single = false
							page_index = 1
						}" :checked="filter_family" class="join-item btn btn-xs rounded-full dark:bg-purple-500 dark:border-none"
							type="radio" name="options" aria-label="👨‍👩‍👦" />
						<input @click="() => {
							filter_alpha = false
							filter_recent = false
							filter_reverse = false
							filter_family = false
							filter_with_kids = false
							filter_with_spouse = false
							filter_single = true
							page_index = 1
						}" :checked="filter_single" class="join-item btn btn-xs rounded-full dark:bg-purple-500 dark:border-none"
							type="radio" name="options" aria-label="🧍🏾" />
						<input @click="() => {
							filter_alpha = false
							filter_recent = false
							filter_reverse = false
							filter_family = false
							filter_with_kids = true
							filter_with_spouse = false
							filter_single = false
							page_index = 1
						}" :checked="filter_with_kids" class="join-item btn btn-xs rounded-full dark:bg-purple-500 dark:border-none"
							type="radio" name="options" aria-label="👶🏾" />
						<input @click="() => {
							filter_alpha = false
							filter_recent = false
							filter_reverse = false
							filter_family = false
							filter_with_kids = false
							filter_with_spouse = true
							filter_single = false
							page_index = 1
						}" :checked="filter_with_spouse" class="join-item btn btn-xs rounded-full dark:bg-purple-500 dark:border-none"
							type="radio" name="options" aria-label="👨‍👩" /> -->
					</div>

					<select v-model="step"
						class="select w-full select-xs rounded-full bg-[rgb(13,13,13)] dark:bg-neutral-50 dark:text-black">
						<option value="50">50</option>
						<option value="100">100</option>
					</select>
				</div>
			</header>

			<div ref="scroll_container" v-if="!role && curr_filtered_apls?.length! > 0" id="style-1"
				class="overflow-x-auto overflow-Y-auto pb -3 px-2">
				<table class="table relative">
					<!-- head -->
					<thead class="sticky top-0 backdrop-blur-lg border-none z-50">
						<tr class="border-none z-50">
							<!-- <th class="font-semibold text-center dark:text-neutral-700 text-sm">Pos.</th> -->
							<!-- <th class="font-semibold text-center dark:text-neutral-700 text-sm">Action</th> -->
							<th class="font-semibold text-center dark:text-neutral-700 text-sm">Name</th>
							<th class="font-semibold text-center dark:text-neutral-700 text-sm">Bio</th>
							<th class="font-semibold text-center dark:text-neutral-700 text-sm">Phone Number</th>
							<th class="font-semibold text-center dark:text-neutral-700 text-sm">Created</th>
							<th class="font-semibold text-center dark:text-neutral-700 text-sm">Type</th>
							<th class="font-semibold text-center dark:text-neutral-700 text-sm">Registered</th>
						</tr>
					</thead>

					<tbody class="">
						<!-- row -->
						<!-- <tr v-for="(apl, i) in all_my_apls" -->
						<tr v-for="(apl, i) in curr_filtered_apls"
							class="border-b-neutral-700 dark:border-b-neutral-200 hover:bg-black transition-all duration-300 ease-out dark:hover:bg-neutral-200"
							@dblclick="() => { $router.push(`/applicant/${apl.apl_id}`); useViewAplStore().setID(apl.apl_id!); }">
							<!-- <th class="font-normal">
								{{ i + 1 }}
							</th> -->
							<!-- <th>
								<div class="dropdown dropdown-right">
									<label tabindex="0"
										class="btn btn-xs dark:border-none dark:text-neutral-900 dark:bg-white rounded-full m-1 btn-circle"><svg
											class="w-4 aspect-square" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
											<path fill="#888888"
												d="M4.957 5a1 1 0 0 0-.821 1.571l2.633 3.784a1.5 1.5 0 0 0 2.462 0l2.633-3.784A1 1 0 0 0 11.043 5H4.957Z" />
										</svg></label>
									<ul tabindex="0"
										class="dropdown-content dark:bg-white dark:border-2 dark:border-neutral-300 dark:font-semibold dark:text-neutral-900 z-[100] menu p-1 shadow bg-base-100 rounded-lg w-52 font-normal">
										<li @click="() => { $router.push(`/applicant/${apl.apl_id}`); useViewAplStore().setID(apl.apl_id!) }"
											class="hover:bg-accent hover:text-black rounded-lg"><a>View</a></li>
										<li class="hover:bg-accent hover:text-black rounded-lg"><a>Request Delete</a></li>
									</ul>
								</div>
							</th> -->
							<td>
								<div class="flex items-center space-x-3">
									<div>
										<div class="font-semibold">{{ apl.fullName }}</div>
										<div class="text-sm text-neutral-400 z-0">{{ apl.pconf_code ? apl.pconf_code : 'No Confirmation Code'
										}}
										</div>
									</div>
								</div>
							</td>
							<td>
								{{ useNuxtApp().$formatDateWords(new Date(apl.pdob!)) }}
								<br />
								<span
									class="badge badge-ghost badge-sm dark:badge-accent mr-1 truncate- truncate max-w-[100px] text-ellipsis">{{
										apl.pcity_ob
									}}</span>
								<span class="badge badge-ghost badge-sm dark:badge-accent">{{ apl.pcountry_ob }}</span>
							</td>
							<td>
								<div class="flex flex-col items-end">
									<span class="text-right">
										{{ apl.pcontact }}
									</span>
									<span class="text-xs text-right">
										{{ apl.pother_contact }}
									</span>
								</div>
							</td>
							<td class="">
								<div class="flex flex-col items-end justify-center text-xs">
									<span class="text-neutral-300 dark:text-neutral-700">{{ useNuxtApp().$formatDate(new
										Date(apl.created_at!)) }}</span>
									<span class="text-neutral-300 dark:text-neutral-700">{{ new Date(apl.created_at!).toLocaleTimeString([],
										{
											hour: '2-digit', minute: '2-digit', hour12: true
										}) }}</span>
								</div>
							</td>
							<td>
								<div class="text-center">
									{{ typeOfApl(apl) }}
								</div>
							</td>
							<td>
								<div
									:class="['w-6 aspect-square mx-auto rounded-full', apl.pconf_code ? 'bg-green-500' : 'bg-amber-500']">

								</div>
							</td>
						</tr>
					</tbody>
					<!-- foot -->
					<tfoot>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Job</th>
							<th>Favorite Color</th>
							<th></th>
						</tr>
					</tfoot>

				</table>
			</div>

			<div ref="scroll_container_admin" v-if="role && _curr_filtered_apls?.length! > 0" id="style-1"
				class="overflow-x-auto overflow-Y-auto pb -3 px-2">
				<table class="table relative">
					<!-- head -->
					<thead class="sticky top-0 backdrop-blur-lg border-none z-50">
						<tr class="border-none z-50">
							<!-- <th class="font-semibold text-center dark:text-neutral-700 text-sm">Pos.</th> -->
							<!-- <th class="font-semibold text-center dark:text-neutral-700 text-sm">Action</th> -->
							<th class="font-semibold text-center dark:text-neutral-700 text-sm" @dblclick="loadAplEx">Name</th>
							<th class="font-semibold text-center dark:text-neutral-700 text-sm">Bio</th>
							<th class="font-semibold text-center dark:text-neutral-700 text-sm">Phone Number</th>
							<th class="font-semibold text-center dark:text-neutral-700 text-sm">Created</th>
							<th class="font-semibold text-center dark:text-neutral-700 text-sm">Type</th>
							<th class="font-semibold text-center dark:text-neutral-700 text-sm">Location</th>
						</tr>
					</thead>

					<tbody class="">
						<!-- row -->
						<tr @dblclick="() => { $router.push(`/applicant/${apl.apl_id}`); useViewAplStore().setID(apl.apl_id!) }"
							v-for="(apl, i) in _curr_filtered_apls"
							class="border-b-neutral-700 dark:border-b-neutral-200 hover:bg-black transition-all duration-300 ease-out dark:hover:bg-neutral-200">
							<!-- <th class="font-normal">
								{{ i + 1 }}
							</th> -->
							<!-- <th>
								<div class="dropdown dropdown-right">
									<label tabindex="0"
										class="btn btn-xs dark:border-none dark:text-neutral-900 dark:bg-white rounded-full m-1 btn-circle"><svg
											class="w-4 aspect-square" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
											<path fill="#888888"
												d="M4.957 5a1 1 0 0 0-.821 1.571l2.633 3.784a1.5 1.5 0 0 0 2.462 0l2.633-3.784A1 1 0 0 0 11.043 5H4.957Z" />
										</svg></label>
									<ul tabindex="0"
										class="dropdown-content dark:bg-white dark:border-2 dark:border-neutral-300 dark:font-semibold dark:text-neutral-900 z-[100] menu p-1 shadow bg-base-100 rounded-lg w-52 font-normal">
										<li @click="() => { $router.push(`/applicant/${apl.apl_id}`); useViewAplStore().setID(apl.apl_id!) }"
											class="hover:bg-accent hover:text-black rounded-lg"><a>View</a></li>
										<li class="hover:bg-accent hover:text-black rounded-lg"><a>Request Delete</a></li>
									</ul>
								</div>
							</th> -->
							<td>
								<div class="flex items-center space-x-3">
									<div>
										<div class="font-semibold">{{ apl.fullName }}</div>
										<div class="text-sm text-neutral-400 z-0">{{ apl.pconf_code ? apl.pconf_code : 'No Confirmation Code'
										}}
										</div>
									</div>
								</div>
							</td>
							<td>
								{{ useNuxtApp().$formatDateWords(new Date(apl.pdob!)) }}
								<br />
								<span
									class="badge badge-ghost badge-sm dark:badge-accent mr-1 truncate- truncate max-w-[100px] text-ellipsis">{{
										apl.pcity_ob }}</span>
								<span class="badge badge-ghost badge-sm dark:badge-accent">{{ apl.pcountry_ob }}</span>
							</td>
							<td>
								<div class="flex flex-col items-end">
									<span class="text-right">
										{{ apl.pcontact.substring(0, 10) }}
									</span>
									<span class="text-xs text-right">
										{{ apl.pother_contact }}
									</span>
								</div>
							</td>
							<td class="">
								<div class="flex flex-col items-end justify-center text-xs">
									<span class="text-right dark:font-semibold">By: {{ profiles.filter(user => user.id ==
										apl.user_id)[0].fullname ||
										'User'
									}}</span>
									<span class="text-neutral-300 dark:text-neutral-700">{{ useNuxtApp().$formatDate(new
										Date(apl.created_at!)) }}</span>
									<span class="text-neutral-300 dark:text-neutral-700">{{ new Date(apl.created_at!).toLocaleTimeString([],
										{
											hour: '2-digit', minute: '2-digit', hour12: true
										}) }}</span>
								</div>
							</td>
							<td>
								<div class="">
									{{ typeOfApl(apl) }}
								</div>
							</td>
							<td>
								<div class="text-right">
									{{ apl.location ? apl.location![0].toUpperCase() + apl.location?.substring(1) : '' }}
								</div>
							</td>
							<td>
								<div
									:class="['w-6 aspect-square mx-auto rounded-full', apl.pconf_code ? 'bg-green-500' : 'bg-amber-500']">

								</div>
							</td>
						</tr>
					</tbody>
					<!-- foot -->
					<tfoot>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Job</th>
							<th>Favorite Color</th>
							<th></th>
						</tr>
					</tfoot>

				</table>
			</div>

			<div v-if="role && _curr_filtered_apls?.length! == 0"
				class="w-full h-full flex flex-col items-center justify-center">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-20 aspect-square" viewBox="0 0 24 24">
					<g stroke="#888888" stroke-linecap="round" stroke-width="2">
						<path fill="#888888" fill-opacity="0" stroke-dasharray="60" stroke-dashoffset="60"
							d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z">
							<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0" />
							<animate fill="freeze" attributeName="fill-opacity" begin="1.2s" dur="0.15s" values="0;0.3" />
						</path>
						<path fill="none" stroke-dasharray="14" stroke-dashoffset="14"
							d="M8 16C8.5 15 9.79086 14 12 14C14.2091 14 15.5 15 16 16">
							<animate fill="freeze" attributeName="stroke-dashoffset" begin="1s" dur="0.2s" values="14;0" />
						</path>
					</g>
					<g fill="#888888" fill-opacity="0">
						<ellipse cx="9" cy="9.5" rx="1" ry="1.5">
							<animate fill="freeze" attributeName="fill-opacity" begin="0.6s" dur="0.2s" values="0;1" />
						</ellipse>
						<ellipse cx="15" cy="9.5" rx="1" ry="1.5">
							<animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.2s" values="0;1" />
						</ellipse>
					</g>
				</svg>

				No Applicants Yet.
			</div>

			<div v-if="!role && curr_filtered_apls?.length! == 0"
				class="w-full h-full flex flex-col items-center justify-center">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-20 aspect-square" viewBox="0 0 24 24">
					<g stroke="#888888" stroke-linecap="round" stroke-width="2">
						<path fill="#888888" fill-opacity="0" stroke-dasharray="60" stroke-dashoffset="60"
							d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z">
							<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0" />
							<animate fill="freeze" attributeName="fill-opacity" begin="1.2s" dur="0.15s" values="0;0.3" />
						</path>
						<path fill="none" stroke-dasharray="14" stroke-dashoffset="14"
							d="M8 16C8.5 15 9.79086 14 12 14C14.2091 14 15.5 15 16 16">
							<animate fill="freeze" attributeName="stroke-dashoffset" begin="1s" dur="0.2s" values="14;0" />
						</path>
					</g>
					<g fill="#888888" fill-opacity="0">
						<ellipse cx="9" cy="9.5" rx="1" ry="1.5">
							<animate fill="freeze" attributeName="fill-opacity" begin="0.6s" dur="0.2s" values="0;1" />
						</ellipse>
						<ellipse cx="15" cy="9.5" rx="1" ry="1.5">
							<animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.2s" values="0;1" />
						</ellipse>
					</g>
				</svg>

				No Applicants Yet.
			</div>

		</div>


		<div v-else
			class="w-full h-full rounded-2xl dark:bg-neutral-50 dark:shadow-xl bg-neutral-800 col-span-full row-span-full text-justify relative flex flex-col">

			<header
				class="w-full min-h-[4rem] dark:bg-primary bg-neutral-700 rounded-2xl flex items-center justify-between px-4">
				<h1 v-if="!role" class="text-2xl dark:text-neutral-50">View All Applicants <span class="text-2xl">({{
					all_my_apls.length
				}})</span></h1>
				<h1 v-else class="flex items-center gap-3 dark:text-neutral-50">
					<span class="text-2xl whitespace-nowrap">
						View All Applicants_Ex
					</span>
					<span class="text-2xl">[ <span class="text-2xl text-green-500 dark:text-white">{{ total_apls_ex.filter(apl =>
						apl.pconf_code).length }}</span> / <span class="text-2xl text-secondary dark:text-white">{{
		total_apls_ex.length }}</span>
						]</span> ||
					<span class="text-2xl">GHC {{ today_sales_ex }}</span>
				</h1>

				<div class="flex items-center gap-2">
					<div class="join">
						<input @click="() => {
							_filter_recent = true
							ex_registered = false
							_filter_unregistered = false
						}" :checked="_filter_recent" class="join-item btn btn-xs rounded-full dark:bg-purple-500 dark:border-none"
							type="radio" name="options" aria-label="Recency" />
						<input @click="() => {
							_filter_recent = false
							ex_registered = true
							_filter_unregistered = false
						}" :checked="ex_registered" class="join-item btn btn-xs rounded-full dark:bg-purple-500 dark:border-none"
							type="radio" name="options" aria-label="Registered" />
						<input @click="() => {
							_filter_recent = false
							ex_registered = false
							_filter_unregistered = true
						}" :checked="_filter_unregistered" class="join-item btn btn-xs rounded-full dark:bg-purple-500 dark:border-none"
							type="radio" name="options" aria-label="Unregistered" />
					</div>
				</div>
			</header>

			<div ref="scroll_container_admin" id="style-1" class="overflow-x-auto overflow-Y-auto pb-3 px-2">

				<div class="w-full flex justify-center items-center p-2">
					<input type="text"
						class="w-full border text-center py-1 text-lg font-bold bg-neutral-900 text-white dark:bg-white dark:text-black shadow-md border-neutral-500 rounded-xl"
						v-model=search>
				</div>

				<table v-if="role && apls_ex?.length! > 0" class="table relative">
					<!-- head -->
					<thead class="sticky top-0 backdrop-blur-lg border-none z-50">
						<tr class="border-none z-50">
							<!-- <th class="font-semibold text-center dark:text-neutral-700 text-sm">Pos.</th> -->
							<!-- <th class="font-semibold text-center dark:text-neutral-700 text-sm">Action</th> -->
							<th class="font-semibold text-center dark:text-neutral-700 text-sm" @dblclick="loadAplEx">Name {{ if_apls_ex
								? apls_ex.length : '' }}</th>
							<th class="font-semibold text-center dark:text-neutral-700 text-sm">Bio</th>
							<th class="font-semibold text-center dark:text-neutral-700 text-sm">Phone Number</th>
							<th class="font-semibold text-center dark:text-neutral-700 text-sm">Created</th>
							<th class="font-semibold text-center dark:text-neutral-700 text-sm">Type</th>
							<th class="font-semibold text-center dark:text-neutral-700 text-sm">Location</th>
							<th class="font-semibold text-center dark:text-neutral-700 text-sm">Registered</th>
						</tr>
					</thead>

					<tbody class="">
						<!-- row -->
						<tr
							@dblclick="() => { $router.push(`/applicant/${apl.apl_id}`); useViewAplStore().setID(apl.apl_id!); useViewAplStore().$patch({ if_applicant_ex: true }) }"
							v-for="(apl, i) in apls_ex"
							class="border-b-neutral-700 dark:border-b-neutral-200 hover:bg-black transition-all duration-300 ease-out dark:hover:bg-neutral-200">
							<td>
								<div class="flex items-center space-x-3">
									<div>
										<div class="font-semibold">{{ apl.fullName }}</div>
										<div class="text-sm text-neutral-400 z-0">{{ apl.pconf_code ? apl.pconf_code : 'No Confirmation Code'
										}}
										</div>
									</div>
								</div>
							</td>
							<td>
								{{ useNuxtApp().$formatDateWords(new Date(apl.pdob!)) }}
								<br />
								<span
									class="badge badge-ghost badge-sm dark:badge-accent mr-1 truncate- truncate max-w-[100px] text-ellipsis">{{
										apl.pcity_ob }}</span>
								<span class="badge badge-ghost badge-sm dark:badge-accent">{{ apl.pcountry_ob }}</span>
							</td>
							<td>
								<div class="flex flex-col items-end">
									<span class="text-right">
										{{ apl.pcontact.substring(0, 10) }}
									</span>
									<span class="text-xs text-right">
										{{ apl.pother_contact }}
									</span>
								</div>
							</td>
							<td class="">
								<div class="flex flex-col items-end justify-center text-xs">
									<span class="text-right dark:font-semibold">By: {{ profiles.filter(user => user.id ==
										apl.user_id)[0].fullname ||
										'User'
									}}</span>
									<span class="text-neutral-300 dark:text-neutral-700">{{ useNuxtApp().$formatDate(new
										Date(apl.created_at!)) }}</span>
									<span class="text-neutral-300 dark:text-neutral-700">{{ new Date(apl.created_at!).toLocaleTimeString([],
										{
											hour: '2-digit', minute: '2-digit', hour12: true
										}) }}</span>
								</div>
							</td>
							<td>
								<div class="">
									{{ typeOfApl(apl) }}
								</div>
							</td>
							<td>
								<div class="text-right">
									{{ apl.location ? apl.location![0].toUpperCase() + apl.location?.substring(1) : '' }}
								</div>
							</td>
							<td>
								<div
									:class="['w-6 aspect-square mx-auto rounded-full', apl.pconf_code ? 'bg-green-500' : 'bg-amber-500']">
								</div>
							</td>
						</tr>
					</tbody>
					<!-- foot -->
					<tfoot>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Job</th>
							<th>Favorite Color</th>
							<th></th>
						</tr>
					</tfoot>

				</table>

			</div>

			<div v-if="role && apls_ex?.length! == 0" class="w-full h-full flex flex-col items-center justify-center">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-20 aspect-square" viewBox="0 0 24 24">
					<g stroke="#888888" stroke-linecap="round" stroke-width="2">
						<path fill="#888888" fill-opacity="0" stroke-dasharray="60" stroke-dashoffset="60"
							d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z">
							<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0" />
							<animate fill="freeze" attributeName="fill-opacity" begin="1.2s" dur="0.15s" values="0;0.3" />
						</path>
						<path fill="none" stroke-dasharray="14" stroke-dashoffset="14"
							d="M8 16C8.5 15 9.79086 14 12 14C14.2091 14 15.5 15 16 16">
							<animate fill="freeze" attributeName="stroke-dashoffset" begin="1s" dur="0.2s" values="14;0" />
						</path>
					</g>
					<g fill="#888888" fill-opacity="0">
						<ellipse cx="9" cy="9.5" rx="1" ry="1.5">
							<animate fill="freeze" attributeName="fill-opacity" begin="0.6s" dur="0.2s" values="0;1" />
						</ellipse>
						<ellipse cx="15" cy="9.5" rx="1" ry="1.5">
							<animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.2s" values="0;1" />
						</ellipse>
					</g>
				</svg>

				No Applicants Yet.
			</div>

		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app'
import { Applicant } from 'interfaces/interfaces';
import { useTitle } from '@vueuse/core';
import { useProfileStore } from '@/store/profile'
import { useViewAplStore } from '@/store/viewApl';

useTitle('EG Datapoint | View Applicants')

const app_ = useAppStore()
const {
	all_my_apls,
	total_apls,
	total_apls_ex,
	today_sales_ex,
	filter_alpha,
	filter_reverse,
	filter_family,
	filter_with_kids,
	filter_with_spouse,
	filter_single,
	filter_recent,
	filter_unregistered,
	filter_registered,
	_filter_recent,
	_filter_unregistered,
	_filter_registered: ex_registered,
} = storeToRefs(useAppStore())
const { role, profiles, profile } = storeToRefs(useProfileStore())
const page_index = ref(1)
const step = ref(50)
const curr_user = ref('all')
const scroll_container = ref<HTMLDivElement>()
const scroll_container_admin = ref<HTMLDivElement>()
const if_apls_ex = ref(false)
const search = ref('')

const apls_ex = computed(() => {
	if (search.value) return useNuxtApp().$sortByRecency(total_apls_ex.value).filter(apl => apl.fullName.includes(search.value.toUpperCase()))
	let with_code = useNuxtApp().$sortByRecency(total_apls_ex.value).filter(apl => apl.pconf_code)
	let no_code = useNuxtApp().$sortByRecency(total_apls_ex.value).filter(apl => !apl.pconf_code)
	return [...no_code, ...with_code,]
})

const sorted_apl_ex_rec = computed(() => {
	if (!search.value) return useNuxtApp().$sortByRecency(total_apls.value)
	return useNuxtApp().$sortByRecency(total_apls_ex.value).filter(apl => apl.fullName.includes(search.value.toUpperCase()))
})
const sorted_apl_ex_reg = computed(() => {
	if (!search.value) return useNuxtApp().$sortByRecency(total_apls.value).filter(apl => apl.pconf_code)
	return useNuxtApp().$sortByRecency(total_apls_ex.value).filter(apl => apl.fullName.includes(search.value.toUpperCase()))
})
const sorted_apl_ex_unreg = computed(() => {
	if (!search.value) return useNuxtApp().$sortByRecency(total_apls.value).filter(apl => !apl.pconf_code)
	return useNuxtApp().$sortByRecency(total_apls_ex.value).filter(apl => apl.fullName.includes(search.value.toUpperCase()))
})


const loadAplEx = async () => {
	if (role.value && profile.value?.email == 'topsquad3552@gmail.com') {
		console.log('here');

		if (if_apls_ex.value) {
			if_apls_ex.value = false
		} else {
			if_apls_ex.value = true
			return await app_.getTotalAplsEx()
		}
	} else {
		return
	}
}

function NextPage() {
	if (role) if (_curr_filtered_apls.value?.length! == step.value) page_index.value++
	if (!role) if (curr_filtered_apls.value?.length! == step.value) page_index.value++
	scroll_container.value!.scrollTo({ top: 0, behavior: 'smooth' })
	scroll_container_admin.value!.scrollTo({ top: 0, behavior: 'smooth' })
}

function PrevPage(idx: number) {
	if (idx != 1) page_index.value--
	scroll_container.value!.scrollTo({ top: 0, behavior: 'smooth' })
	scroll_container_admin.value!.scrollTo({ top: 0, behavior: 'smooth' })
}

const order_alpha_apls = computed(() => sortAplsByName(all_my_apls.value).slice((page_index.value * step.value) - step.value, page_index.value * step.value))
const order_reverse_apls = computed(() => sortAplsByName(all_my_apls.value).reverse().slice((page_index.value * step.value) - step.value, page_index.value * step.value))
const order_family_apls = computed(() => sortAplsByName(all_my_apls.value).filter(apl => apl.pmarital_status == 'MARRIED' && apl.wards.length > 0).slice((page_index.value * step.value) - step.value, page_index.value * step.value))
const order_single_apls = computed(() => sortAplsByName(all_my_apls.value).filter(apl => apl.pmarital_status == 'UNMARRIED' && apl.wards.length == 0).slice((page_index.value * step.value) - step.value, page_index.value * step.value))
const order_with_kids_apls = computed(() => sortAplsByName(all_my_apls.value).filter(apl => apl.pmarital_status == 'UNMARRIED' && apl.wards.length > 0).slice((page_index.value * step.value) - step.value, page_index.value * step.value))
const order_with_spouse_apls = computed(() => sortAplsByName(all_my_apls.value).filter(apl => apl.pmarital_status == 'MARRIED' && apl.wards.length == 0).slice((page_index.value * step.value) - step.value, page_index.value * step.value))
const order_recency_apls = computed(() => useNuxtApp().$sortByRecency(all_my_apls.value).slice((page_index.value * step.value) - step.value, page_index.value * step.value))
const order_registered_apls = computed(() => useNuxtApp().$sortByRecency(sortAplsByName(all_my_apls.value)).filter(apl => apl.pconf_code).slice((page_index.value * step.value) - step.value, page_index.value * step.value))
const order_unregistered_apls = computed(() => useNuxtApp().$sortByRecency(sortAplsByName(all_my_apls.value)).filter(apl => !apl.pconf_code).slice((page_index.value * step.value) - step.value, page_index.value * step.value))




// const ex_order_recency_apls = computed(() => useNuxtApp().$sortByRecency(sorted_apl_ex.value))
// const ex_order_registered_apls = computed(() => useNuxtApp().$sortByRecency(sorted_apl_ex.value).filter(apl => apl.pconf_code))
// const ex_order_unregistered_apls = computed(() => useNuxtApp().$sortByRecency(sorted_apl_ex.value).filter(apl => !apl.pconf_code))




const _order_alpha_apls = computed(() => sortAplsByName(user_filtered_apls.value).slice((page_index.value * step.value) - step.value, page_index.value * step.value))
const _order_recency_apls = computed(() => useNuxtApp().$sortByRecency(user_filtered_apls.value).slice((page_index.value * step.value) - step.value, page_index.value * step.value))
const _order_reverse_apls = computed(() => sortAplsByName(user_filtered_apls.value).reverse().slice((page_index.value * step.value) - step.value, page_index.value * step.value))
const _order_family_apls = computed(() => sortAplsByName(user_filtered_apls.value).filter(apl => apl.pmarital_status == 'MARRIED' && apl.wards.length > 0).slice((page_index.value * step.value) - step.value, page_index.value * step.value))
const _order_single_apls = computed(() => sortAplsByName(user_filtered_apls.value).filter(apl => apl.pmarital_status == 'UNMARRIED' && apl.wards.length == 0).slice((page_index.value * step.value) - step.value, page_index.value * step.value))
const _order_with_kids_apls = computed(() => sortAplsByName(user_filtered_apls.value).filter(apl => apl.pmarital_status == 'UNMARRIED' && apl.wards.length > 0).slice((page_index.value * step.value) - step.value, page_index.value * step.value))
const _order_with_spouse_apls = computed(() => sortAplsByName(user_filtered_apls.value).filter(apl => apl.pmarital_status == 'MARRIED' && apl.wards.length == 0).slice((page_index.value * step.value) - step.value, page_index.value * step.value))
const _order_registered_apls = computed(() => useNuxtApp().$sortByRecency(sortAplsByName(user_filtered_apls.value)).filter(apl => apl.pconf_code).slice((page_index.value * step.value) - step.value, page_index.value * step.value))
const _order_unregistered_apls = computed(() => useNuxtApp().$sortByRecency(sortAplsByName(user_filtered_apls.value)).filter(apl => !apl.pconf_code).slice((page_index.value * step.value) - step.value, page_index.value * step.value))

const user_filtered_apls = computed(() => {
	if (curr_user.value == 'all') {
		return total_apls.value
	} else {
		return total_apls.value.filter(apl => apl.user_id == curr_user.value)
	}
})

const curr_filtered_apls = computed(() => {
	if (filter_registered.value) return order_registered_apls.value
	if (filter_unregistered.value) return order_unregistered_apls.value
	if (filter_alpha.value) return order_alpha_apls.value
	if (filter_recent.value) return order_recency_apls.value
	if (filter_reverse.value) return order_reverse_apls.value
	if (filter_family.value) return order_family_apls.value
	if (filter_single.value) return order_single_apls.value
	if (filter_with_kids.value) return order_with_kids_apls.value
	if (filter_with_spouse.value) return order_with_spouse_apls.value
})

const _curr_filtered_apls = computed(() => {
	if (filter_registered.value) return _order_registered_apls.value
	if (filter_unregistered.value) return _order_unregistered_apls.value
	if (filter_alpha.value) return _order_alpha_apls.value
	if (filter_recent.value) return _order_recency_apls.value
	if (filter_reverse.value) return _order_reverse_apls.value
	if (filter_family.value) return _order_family_apls.value
	if (filter_single.value) return _order_single_apls.value
	if (filter_with_kids.value) return _order_with_kids_apls.value
	if (filter_with_spouse.value) return _order_with_spouse_apls.value
})

function sortAplsByName(apls: Applicant[]): Applicant[] {
	return apls.sort((a, b) => a.fullName.localeCompare(b.fullName));
}

const typeOfApl = (apl: Applicant): string | undefined => {
	if (apl.pmarital_status == 'MARRIED' && apl.children_number > 0) {
		return '👨‍👩‍👧‍👦 Family'
	}
	else if (apl.pmarital_status == 'MARRIED' && apl.children_number == 0) {
		return '👩🏿‍🤝‍👨🏾 With Spouse Only'
	}
	else if (apl.pmarital_status != 'MARRIED' && apl.children_number > 0) {
		return '👶🏾 With Kids Only'
	}
	else if (apl.pmarital_status != 'MARRIED' && apl.children_number == 0) {
		return '🧍🏾 Single'
	}
}

</script>
