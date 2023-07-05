<template>
	<div class="__dashboard w-full h-full grid grid-cols-12 gap-1 rounded-2xl pb-2">
		<div
			class="w-full h-full rounded-2xl bg-neutral-800 col-span-full row-span-full pb-2 overflow-y-scroll scrollbar-hidden text-justify px-0 relative">

			<h1
				class="px-5 py-5 rounded-2xl bg-neutral-700  text-3xl w-full flex justify-between items-center sticky top-0 mb-2 shadow-lg">
				<span class="">Add a new Applicant</span>

				<div class="text-md">
					<div class="join grid grid-cols-2 rounded-2xl">
						<button class="join-item btn bg-neutral-600 border-none">Previous page</button>
						<button class="join-item btn bg-neutral-800 border-none">Next</button>
					</div>
				</div>
			</h1>
			<!-- text fields -->
			<div class="__newApl w-full grid grid-cols-12 gap-1 px-5">

				<avatarSelect />
			</div>

		</div>
	</div>
</template>

<style scoped>
.griddy {
	display: grid;
}
</style>