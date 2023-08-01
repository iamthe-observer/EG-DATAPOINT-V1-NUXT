<template>
	<div class="w-full relative h-full rounded-2xl pb-2">
		<div id="style-1"
			class="w-full h-full rounded-2xl bg-neutral-800 col-span-full row-span-full pb-2 overflow-y-auto scrollbar text-justify pr-1 pl-3 py-3 relative">

			<!-- Search -->
			<Search :visible="if_search" />

			<!-- heading -->
			<div class="flex w-full justify-between sticky top-0">
				<div @click="useSearchStore().setIfSearch(true)" v-if="!if_search" ref="search_bar"
					class="z-[200] w-full flex justify-end rounded-xl search_bar bg-neutral-900 drop-shadow-2xl transition-all duration-300 ease-out outline outline-2 outline-neutral-600">
					<input ref="search_bar_input" type="text" class="flex-1 bg-transparent px-2"
						placeholder="Click here to search!">
					<div class="w-10 p-2">
						<SvgsSearch class=" w-full h-full aspect-square" />
					</div>
				</div>
			</div>
			<!-- heading end -->

			<!-- content -->
			<div>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eligendi fuga, libero dicta commodi atque facilis
				soluta, delectus esse perspiciatis aliquid minus, voluptatibus eos neque. A, ab ipsum! Sapiente fugiat ad dolorem
				voluptas odit optio eos incidunt? Deleniti nihil totam libero saepe repudiandae corporis quos praesentium iusto
				perspiciatis inventore dolorem adipisci quas mollitia nostrum, explicabo magni soluta exercitationem animi?
				Ratione ab, provident porro optio beatae labore ipsa deleniti id aspernatur libero maiores suscipit cupiditate
				dolores possimus ipsam ad debitis qui officiis fugit. Odio accusantium facere exercitationem amet perspiciatis vel
				aperiam magni minima, nobis natus quas sint autem officia accusamus, beatae tenetur voluptatum, maiores corrupti
				tempora porro voluptates unde delectus veritatis numquam. Doloremque, cumque hic perspiciatis voluptatum corrupti,
				laudantium veniam quos nam quisquam natus adipisci eveniet consequuntur alias molestiae, fugit odio? Voluptatem id
				repudiandae iusto laboriosam porro excepturi molestiae omnis sit, eveniet exercitationem, sunt rerum placeat non
				quaerat sequi veritatis? Necessitatibus, eaque veniam. Nostrum, quas similique at, dicta corporis officiis ea
				aspernatur officia, sapiente earum nobis aliquam! Ducimus exercitationem, tempora amet, quibusdam cupiditate
				molestiae iste vero consequuntur obcaecati molestias tenetur ab iure, nisi at et harum debitis asperiores
				distinctio libero quia ut eligendi architecto nobis sed! Quod blanditiis harum nesciunt neque laudantium explicabo
				vero ipsam voluptate veritatis repudiandae dolorum ullam culpa architecto sed nulla fuga voluptatem, quia amet
				accusantium? Facilis in praesentium quia laborum suscipit! Possimus rem exercitationem atque facilis repudiandae
				ipsum a corporis, enim deserunt asperiores ad ex! Inventore veniam, mollitia accusamus non quia placeat ullam cum
				veritatis dolore sapiente laborum maiores nesciunt quasi velit atque pariatur dignissimos debitis delectus. Vitae
				sequi eius minus placeat? Mollitia iure maiores repellat cumque ducimus non eum labore maxime nostrum voluptatem
				at natus doloremque praesentium possimus repudiandae provident culpa suscipit deserunt, ad beatae aspernatur enim
				exercitationem quae! Cum fugiat recusandae earum aliquid fuga non sunt nobis quas, numquam ex, in culpa quidem
				modi provident similique dolorum sed! Debitis alias ipsam commodi sapiente nesciunt fugit dicta accusamus deleniti
				quis. Amet quidem, reprehenderit provident quo repellat autem similique voluptates doloribus perferendis sapiente,
				nihil dolore quae expedita quasi! Ad facilis laudantium minus! Numquam exercitationem aspernatur sunt sapiente
				nostrum nisi maxime nulla sit ad fugit odit vero aut quia, et repudiandae optio dolores enim. Error dicta, nobis
				tenetur odio fugit beatae ipsa! Facilis nulla nisi dolorum sit quibusdam, a adipisci, repellendus cumque ullam
				quas possimus similique, est deleniti qui quae. Veritatis quaerat sit qui architecto? Laudantium eaque, quam
				pariatur illo ea numquam mollitia molestiae repellat, tempora, corrupti explicabo odio debitis ullam voluptatem
				fuga! Incidunt optio nisi ut ducimus quam, laudantium iste ex modi, aliquam aliquid error, quis rem minus
				repellendus cumque eaque doloribus voluptatum hic officiis quidem? Nam voluptates odit vitae deleniti quam est,
				reprehenderit exercitationem pariatur nisi dignissimos ullam! Debitis consequatur aliquid et quo cupiditate sed
				id, labore earum molestias illo error atque, numquam deserunt, voluptatum vel? Praesentium soluta pariatur
				doloribus possimus quia iure dolorum, delectus, ipsa libero deserunt nobis. Harum ipsa iure tempora cupiditate
				provident quidem expedita quisquam quasi nemo atque placeat ducimus deleniti incidunt nesciunt eos ullam
				voluptatem ratione, recusandae sequi alias cum totam repellat sed. Officiis deleniti ex debitis nisi at est
				laborum accusantium, reprehenderit et fugiat, sit dolor non molestiae vero sapiente, adipisci quo! Quia iste eaque
				minus adipisci, temporibus blanditiis numquam ad perferendis. Animi dolore laudantium praesentium facilis sunt
				aliquid maxime quisquam aliquam at vel, id in accusamus non vitae velit cumque placeat perferendis exercitationem
				magni ullam. Facere aliquam in, at, beatae quo omnis ipsam repellat itaque optio eligendi eum? Praesentium
				inventore voluptate sed quam, architecto aspernatur unde dolores commodi nesciunt ab est ex id delectus quia
				pariatur distinctio? Placeat perspiciatis id, quaerat omnis doloribus earum nisi nostrum, aut esse voluptates
				libero est? Sapiente, ea rerum porro alias exercitationem quaerat dicta odit necessitatibus sit in, officia nam
				amet praesentium magnam qui veniam sunt quasi totam incidunt tenetur, possimus illum reiciendis excepturi
				repellat. Iure, obcaecati! Quidem nam aspernatur impedit dicta vero ex, quas, sed voluptatem quae corporis dolores
				illo, explicabo aliquid assumenda veniam quod rerum fuga voluptatum eos distinctio soluta excepturi similique
				illum! Sit amet nisi tempora eveniet voluptas. Repellat blanditiis rerum laborum dicta nobis nisi nesciunt atque
				tempore quibusdam aspernatur accusantium fugiat debitis libero impedit facilis vel numquam deserunt velit,
				consectetur architecto quam! Magni ipsam quae ipsum neque debitis commodi laborum necessitatibus aut accusantium
				quo maiores explicabo possimus nostrum, alias amet. Molestias, sit mollitia? Quisquam ad vitae debitis facilis
				similique nemo fuga voluptatibus quos minus temporibus assumenda, mollitia, iusto labore voluptas ullam! Rem, cum
				deleniti? Quibusdam nisi optio tempora enim. Vitae modi pariatur corrupti reiciendis facilis cumque! Voluptates
				non numquam et expedita vitae alias tempore asperiores quam similique sequi distinctio esse doloribus architecto
				perspiciatis sunt, eaque illum iusto quo est maiores illo. Ab illo incidunt officiis placeat maxime quia id,
				repellendus omnis assumenda itaque. Eum ex unde iure. A officiis nobis similique? Repellendus harum, cum placeat
				neque exercitationem cupiditate voluptates! Labore beatae optio tenetur inventore, ad cumque odit sed a, quia
				voluptatibus officia earum voluptate quas, illo nemo! Possimus aliquam at ipsum sit molestias, eum unde amet
				dolorum eos sed! Unde repellendus architecto mollitia odit doloribus illum blanditiis obcaecati dolor nam? Nostrum
				voluptate alias quas sint deserunt illum impedit qui corporis voluptas laudantium ex, ducimus dolorem sit, soluta
				id! Aliquam nihil recusandae ipsa vitae quae, minus repudiandae suscipit. Dolorum consectetur illum eligendi
				dolore quaerat hic optio voluptate dolor. Deserunt, quaerat cum sapiente perspiciatis quas explicabo neque
				officiis recusandae, nulla tenetur itaque architecto animi, nesciunt minima aut! Optio eveniet magnam nisi, quod
				id obcaecati. Nemo, aliquam at. Quod, eos eveniet? Est modi incidunt possimus reiciendis neque quidem eaque saepe
				rerum non aut obcaecati eligendi doloremque nemo, sint quas, fugit, animi quaerat nisi totam veritatis cupiditate!
				Commodi sint rem modi vero dicta error dolores. Aliquam officiis debitis magni ipsam earum. Praesentium optio
				atque similique totam aliquam quisquam recusandae commodi corrupti beatae doloremque deleniti iusto pariatur fuga
				harum adipisci labore, minima ex provident animi modi excepturi, odit eos dolore. Et placeat porro aperiam? Non
				eius magnam velit est architecto sed eum ea tempore nostrum excepturi.
			</div>
		</div>


	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSearchStore } from '@/store/search';
import { useTitle } from '@vueuse/core';

useTitle('EG Datapoint | Database')

const { if_search } = storeToRefs(useSearchStore())
const search_bar = ref<HTMLDivElement>()
const search_bar_input = ref<HTMLInputElement>()

onBeforeUnmount(() => {
	useSearchStore().setIfSearch(false)
})
</script>