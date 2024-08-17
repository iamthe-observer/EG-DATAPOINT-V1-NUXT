<template>
	<div class="col-span-3 row-span-15 px-2 flex flex-col items-center gap-5">
		<!-- registered apls -->
		<div
			class="bg-neutral-800 dark:bg-neutral-50 w-full h-fit rounded-xl flex flex-col items-center justify-between gap-2 px-3 py-1 relative shadow-lg">
			<h2 class="text-2xl flex justify-between w-full sticky top-0">
				<span class="font-semibold text-neutral-500">Registered Apls</span>
				<span v-if="!role" class="font-semibold">{{ registered_apls.length }}/{{ all_my_apls.length }}</span>
				<span v-else class="font-semibold">{{ admin_registered_apls.length }}<span
						class="font-semibold text-neutral-400">
						out of {{ total_apls.length }}</span></span>
			</h2>
		</div>

		<!-- incomplete apls pics -->
		<div class="bg-neutral-800 dark:bg-neutral-50 w-full h-full rounded-xl flex flex-col items-center gap-4 px-3 py-3 relative overflow-y-auto shadow-lg"
			id="style-2">
			<h2
				class="text-2xl flex justify-between w-full sticky top-0 bg-neutral-900 dark:bg-neutral-200 rounded-lg px-2 py-1 shadow-lg">
				<span class="font-semibold">Incomplete Apls Pics</span>
				<span class="font-semibold">{{ incomplete_apl_pics.length }}</span>
			</h2>

			<div v-if="incomplete_apl_pics.length" class="w-full flex gap-2 items-center group cursor-pointer"
				v-for="(apl_pics, i) in incomplete_apl_pics" :key="i"
				@click="() => { $router.push(`/applicant/${apl_pics.apl.apl_id}`); useViewAplStore().setID(apl_pics.apl.apl_id!) }">
				<span class="group-hover:text-neutral-400 w-full truncate">{{ apl_pics.apl.fullName }}</span> <span
					v-if="role" class="pl-3">{{
						getUserForApl(apl_pics.apl.user_id) }}</span>
			</div>

			<div v-else
				class="w-full h-full flex flex-col items-center justify-center text-center font-bold text-neutral-500">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-20 aspect-square" viewBox="0 0 256 256">
					<g fill="#888">
						<path d="M224 128a96 96 0 1 1-96-96a96 96 0 0 1 96 96Z" opacity=".2" />
						<path
							d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88ZM80 108a12 12 0 1 1 12 12a12 12 0 0 1-12-12Zm104 0a8 8 0 0 1-8 8h-24a8 8 0 0 1 0-16h24a8 8 0 0 1 8 8Zm-9.08 48c-10.29 17.79-27.39 28-46.92 28s-36.63-10.2-46.92-28a8 8 0 1 1 13.84-8c7.47 12.91 19.21 20 33.08 20s25.61-7.1 33.08-20a8 8 0 1 1 13.84 8Z" />
					</g>
				</svg>
				All Pictures <br /> Uploaded
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app';
import { useAplStore } from '@/store/apl'
import { Applicant } from '@/interfaces/interfaces';
import { useViewAplStore } from '@/store/viewApl';
import { useProfileStore } from '@/store/profile'

// interface Paths {
// 	[key: string]: string[]; // Or whatever type the values in the `paths` object should be
// }

const appStore = useAppStore();
const { all_my_apls, total_apls } = storeToRefs(appStore);
const { role, profiles } = storeToRefs(useProfileStore());

const registered_apls = computed(() => {
	return all_my_apls.value.filter((apl) => apl.pconf_code)
});
const admin_registered_apls = computed(() => {
	return total_apls.value.filter((apl) => apl.pconf_code)
});

const getUserForApl = (user_id: string) => {
	const profile = profiles.value.find(x => x.id == user_id)
	return profile?.username
}

const incomplete_apl_pics = computed(() => {
	const filtered: { apl: Applicant, type: string }[] = []

	if (role.value) {
		for (let ii = 0; ii < total_apls.value.length; ii++) {
			const apl = total_apls.value[ii];
			const type = useAplStore().typeOfApl(apl)

			const val = ifPics(apl, type)
			if (val) {
				filtered.push(val)
			}
		}

		return filtered

	} else {
		for (let ii = 0; ii < all_my_apls.value.length; ii++) {
			const apl = all_my_apls.value[ii];
			const type = useAplStore().typeOfApl(apl)

			const val = ifPics(apl, type)
			if (val) {
				filtered.push(val)
			}
		}

		return filtered
		// for (let ii = 0; ii < all_my_apls.value.length; ii++) {
		// 	const apl = all_my_apls.value[ii];
		// 	const paths: Paths = apl.aplImg_path
		// }
	}
})

function hasUuid(apl: Applicant) {
	const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

	for (const wardPath of apl.aplImg_path.wardsPath) {
		if (!uuidRegex.test(wardPath)) {
			return true;
		}
	}

	return false;
}

function ifPics(apl: Applicant, type: "Family"
	| "With Kids Only"
	| "With Spouse Only"
	| "Single"
	| undefined) {
	const if_uuid = hasUuid(apl)
	if (type == 'Family') {
		if (apl.aplImg_path.primePath.length == 0 || apl.aplImg_path.secPath.length == 0 || apl.aplImg_path.wardsPath.length == 0 || if_uuid) {
			return { apl, type }
		} else {
			return null
		}
	} else if (type == 'Single') {
		if (apl.aplImg_path.primePath.length == 0) {
			return { apl, type }
		} else {
			return null
		}
	} else if (type == 'With Kids Only') {
		if (apl.aplImg_path.primePath.length == 0 || apl.aplImg_path.wardsPath.length == 0 || if_uuid) {
			return { apl, type }
		} else {
			return null
		}
	} else if (type == 'With Spouse Only') {
		if (apl.aplImg_path.primePath.length == 0 || apl.aplImg_path.secPath.length == 0) {
			return { apl, type }
		} else {
			return null
		}
	}
}
</script>

<style scoped></style>