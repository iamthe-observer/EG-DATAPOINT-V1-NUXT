<template>
	<div
		class="w-full h-full flex flex-col self-end bg-gradient-to-b to-[rgba(0,0,0,0.5)] from-black dark:from-white from-[50%] overflow-y-auto"
		id="style-1">
		<!-- top -->
		<div class="min-h-[80px] w-full"></div>
		<!-- bottom -->

		<div class="flex-1 flex py-10 flex-col items-center gap-5">
			<!-- results cards -->
			<SearchResultsCard @recent-search="handleRecentSearch" v-for="(result, i) in search_results" :result="result!" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { Applicant } from '@/interfaces/interfaces';
import { SearchParams, useSearchStore } from '@/store/search';

defineProps<{
	search_results: Applicant[] | null
}>()

function handleRecentSearch(evt: SearchParams) {
	useSearchStore().setRecentSearch(evt);
}
</script>

<style scoped></style>