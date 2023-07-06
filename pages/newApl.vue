<template>
	<div class="w-full h-full flex flex-col rounded-2xl pb-2">
		<div
			class="w-full h-full rounded-2xl bg-neutral-800 col-span-full row-span-full pb-2 overflow-y-scroll scrollbar-hidden text-justify px-0 relative">

			<h1
				class="px-5 py-5 rounded-2xl bg-neutral-700 text-2xl w-full flex justify-between items-center sticky top-0 mb-2 shadow-lg z-10">
				<span class="">Add a new Applicant</span>

				<steps class="text-sm" />

				<div class="text-md">
					<div class="join grid grid-cols-2 rounded-2xl">
						<button class="join-item btn bg-neutral-600 border-none">Previous page</button>
						<button class="join-item btn bg-neutral-800 border-none">Next</button>
					</div>
				</div>
			</h1>
			<!-- text fields -->
			<FieldSetPrimeApl />
			<!-- <FieldSetSecApl /> -->
			<!-- <FieldSetWardApl /> -->
		</div>
	</div>
</template>

<style scoped>
.griddy {
	display: grid;
}
</style>