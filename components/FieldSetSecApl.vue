<template>
	<div class="__newApl relative w-full grid grid-cols-12 gap-2 px-5 py-2">
		<avatarSelect class="col-span-2 row-span-2" />
		<!-- name -->
		<div class="flex gap-4 col-span-10 pl-6 justify-center">
			<TextInput>First Name</TextInput>
			<TextInput>Middle Name</TextInput>
			<TextInput>Last Name</TextInput>
		</div>

		<div class="flex gap-4 col-span-10 pl-6 justify-center">
			<TextInput>Date of Birth</TextInput>
			<TextInput>Gender</TextInput>
			<TextInput>City of Birth</TextInput>
		</div>

		<div class="flex gap-4 col-span-12 justify-center">
			<TextInput>Country of Birth</TextInput>
			<TextInput>Phone Number</TextInput>
		</div>
	</div>
</template>

<script setup lang="ts">
import { SecApplicant } from 'interfaces/interfaces';

const apl = reactive<SecApplicant>({
	slastName: '',
	sfirstName: '',
	sotherName: '',
	scity_ob: '',
	scountry_ob: '',
	sgender: '',
	sdob: '',
})
</script>