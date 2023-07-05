<template>
	<div class="__newApl relative w-full grid grid-cols-12 gap-2 px-5 py-2">
		<avatarSelect class="col-span-2 row-span-2" />
		<!-- name -->
		<div class="flex gap-4 col-span-10 pl-7 justify-center">
			<TextInput>First Name</TextInput>
			<TextInput>Middle Name</TextInput>
			<TextInput>Last Name</TextInput>
		</div>

		<div class="flex gap-4 col-span-10 pl-7 justify-center">
			<TextInput>Date of Birth</TextInput>
			<TextInput>Gender</TextInput>
			<TextInput>City of Birth</TextInput>
		</div>

		<!-- <div class="flex gap-4 col-span-12 justify-center">
			<TextInput>Confirmation Code</TextInput>
		</div> -->

		<div class="flex gap-4 col-span-12 justify-center">
			<TextInput>Country of Birth</TextInput>
			<TextInput>Phone Number</TextInput>
			<TextInput>Next of Kin's Phone Number</TextInput>
		</div>

		<div class="flex gap-4 col-span-12 justify-center">
			<TextInput>Email</TextInput>
		</div>

		<div class="flex gap-4 col-span-12 justify-center">
			<TextInput>Passport Number</TextInput>
			<TextInput>Passport Expiration Date</TextInput>
		</div>

		<div class="flex gap-4 col-span-12 justify-center">
			<TextInput>Residential Address</TextInput>
			<TextInput>Country where you like today</TextInput>
		</div>

		<div class="flex gap-4 col-span-12 justify-center">
			<TextInput>Facebook</TextInput>
			<TextInput>Instagram</TextInput>
			<TextInput>Twitter</TextInput>
			<TextInput>Other...</TextInput>
		</div>

		<div class="flex gap-4 col-span-12 justify-center">
			<TextInput>Marital Status</TextInput>
			<TextInput>Highest Level of Education</TextInput>
			<TextInput>Number of Children</TextInput>
		</div>

	</div>
</template>