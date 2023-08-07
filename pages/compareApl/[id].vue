<template>
	<div class="w-full h-full overflow-hidden flex pb-2">
		<div class="w-full h-full bg-neutral-8000 dark:bg-neutral-510 dark:shadow-xlx rounded-2xl flex flex-col gap-2">
			<h1 class="w-full bg-white min-h-[50px] rounded-xl dark:shadow-xl">

			</h1>
			<section class="flex gap-2 w-full flex-1 rounded-xl overflow-x-hidden overflow-y-auto">

				<div :ref="`cont${idx}`"
					v-for="(apl, idx) in [request.modified_apl, total_apls.find(apl => apl.apl_id == request.modified_apl?.apl_id)]"
					:key="`cont${idx}`"
					:class="[`cont${idx}`, 'flex-1 rounded-lg bg-neutral-800 dark:bg-neutral-50 dark:shadow-xl overflow-y-auto p-2']"
					@scroll="syncScroll">

					<div class="flex flex-col">
						<header class="">Last Name</header>
						<p class="">{{ apl?.plastName }}</p>
					</div>
					<div class="flex flex-col">
						<header class="">First Name</header>
						<p class="">{{ apl?.pfirstName }}</p>
					</div>
					<div class="flex flex-col">
						<header class="">Other Name</header>
						<p class="">{{ apl?.potherName }}</p>
					</div>

					Lorem ipsum dolor sit amet consectetur adipisicing elit. At exercitationem alias illum beatae necessitatibus
					officia explicabo maxime, eligendi accusantium amet enim, sit culpa distinctio quod pariatur repellendus illo!
					Blanditiis velit dolor harum quam amet magni illo quis provident voluptas consequatur error labore, id maiores
					assumenda sed nostrum sunt enim necessitatibus est explicabo modi doloribus quod? Commodi magni nobis eius
					dolores cupiditate labore ea nemo officia sapiente dolore, doloribus possimus, nesciunt, illum voluptates ex
					tempora animi aut ad et culpa optio saepe incidunt. Optio eius sunt quod, cupiditate rem repellendus voluptatem
					possimus ex? Voluptatem, quia eum mollitia numquam dolores nihil consequuntur minus? Hic suscipit sapiente vero!
					Earum facere eos natus dolorem, commodi veniam, fuga quos consectetur iure, nisi iusto amet distinctio
					voluptatum voluptatem placeat iste? Esse mollitia ducimus similique, non nemo ipsam quod ea est aliquam culpa
					commodi molestias iure eum enim, modi quas praesentium quasi animi eaque minus voluptas! Commodi repellendus ea
					reprehenderit cum dolor sit, saepe voluptatibus magnam nulla numquam ipsam magni sint in laboriosam odit
					suscipit accusamus quasi vitae totam quaerat deleniti. Rem possimus quidem fugiat sit temporibus omnis libero
					aperiam laudantium nisi qui et cumque veritatis voluptas atque minima cum, mollitia minus? Molestias nihil
					laudantium illum dignissimos recusandae, fuga vero sapiente quae! Accusantium laborum laudantium illo suscipit
					alias voluptatibus, animi, minus odio eligendi recusandae modi rem fugit quibusdam. Voluptatem excepturi quo
					voluptate magnam, architecto, repellendus, quaerat temporibus laudantium iure ducimus reprehenderit odit dicta
					suscipit numquam itaque aliquid vero. Repudiandae dignissimos voluptatem porro nesciunt. Provident dicta quod
					facere nam aliquid voluptatem? A quisquam, et perferendis dolore nam, sint aperiam, voluptatum fuga officia
					error odit necessitatibus iusto assumenda. Ducimus exercitationem vitae, dolores, reprehenderit nam, excepturi
					laboriosam sapiente adipisci animi cupiditate harum omnis nemo. Asperiores voluptatum vitae soluta deserunt
					quasi voluptate itaque nam inventore hic neque illo natus ratione magnam quod quibusdam cumque minus officia
					dignissimos, eum aliquid. Dignissimos fuga minus cumque explicabo quo nesciunt dolore illo accusantium deserunt
					ipsa consequuntur labore, eaque ut reprehenderit ullam magni. Accusamus magnam facere blanditiis dolorem eaque
					at ipsum laborum voluptatem, aliquid tenetur explicabo, quam consequatur quidem, repellat recusandae. Tempora
					saepe quos aspernatur ut? Accusamus nostrum tenetur, perspiciatis necessitatibus beatae neque? Tempora velit
					soluta animi earum nesciunt, aliquid iste iusto ducimus praesentium dolorem quos inventore quidem. Perferendis
					ullam ipsam animi ratione tempora! Asperiores consectetur assumenda ducimus architecto quisquam unde praesentium
					nisi maxime, quidem fugit voluptatibus voluptates labore. Corporis doloribus voluptatem odit repellat saepe eos
					asperiores? Ex aliquam voluptatem vel, quia eveniet laborum illo doloribus expedita possimus amet incidunt esse
					harum in odit veritatis animi doloremque porro magnam. Sunt dolorum eos, ut amet omnis aperiam hic nisi sed odit
					rem enim tempora officia exercitationem, fugit voluptas earum in, ad incidunt. Dicta rerum fuga blanditiis
					quisquam cum facere eos provident, quibusdam saepe sequi officiis error iusto atque! Dolores porro optio
					repellat! Dolorem libero iure molestiae inventore, asperiores, qui ea consequuntur laborum animi, quod magnam
					labore autem adipisci fuga soluta voluptate incidunt expedita quae omnis. Nisi corrupti quam eaque, cumque
					reprehenderit hic! Illo nulla corrupti ipsum blanditiis?

				</div>

			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAplStore } from '@/store/apl';
import { useAppStore } from '@/store/app';
import { storeToRefs } from 'pinia';
const apl_ = useAplStore()
const app_ = useAppStore()
const { curr_compared_request: request } = storeToRefs(apl_)
const { total_apls } = storeToRefs(app_)

const cont1 = ref()
const cont2 = ref()
onMounted(() => {
	if (!request.value.modified_apl) useNuxtApp().$router.push({ path: '/database' })
})

function syncScroll(event: any) {
	const scrollPosition = event.target.scrollTop;
	for (const container of [cont1, cont2]) {
		if (container !== event.target.className) {
			const otherContainer = document.querySelector(`.${container}`);
			otherContainer!.scrollTop = scrollPosition;
		}
	}
}
</script>

<style scoped></style>