<template>
	<div
		:class="['transition-all duration-300 ease-in-out absolute left-0 min-h-full rad-gradient w-full z-[1000] pointer-events-none', show ? '-top-0' : '-top-full']">
		<!-- <div class="w-full min-h-[90px] relative"> -->
		<div
			:class="['z-[2000] w-full px-10 py-5 border-b-2 border-black shadow-xl min-w-[40%] font-bold flex items-center gap-2', bg_clr]">
			<div class="">
				<SvgsInfo class="w-20 drop-shadow-xl aspect-square" v-if="type == 'info'" />
				<SvgsSuccess class="w-20 drop-shadow-xl aspect-square" v-if="type == 'success'" />
				<SvgsWarning class="w-20 drop-shadow-xl aspect-square" v-if="type == 'warning'" />
				<SvgsError class="w-20 drop-shadow-xl aspect-square" v-if="type == 'error'" />
			</div>

			<span class="font-bold text-2xl">
				{{ msg }}
			</span>
		</div>
		<!-- </div> -->


	</div>
</template>

<script setup lang="ts">
import { useNotif } from '@/store/notif_service'
import { storeToRefs } from 'pinia'

const { msg, type, show } = storeToRefs(useNotif())
useNotif().$patch({ msg: 'hello', type: 'info' })
const bg_clr = computed(() => {
	if (type.value == 'error') { return 'bg-red-300' }
	else if (type.value == 'success') { return 'bg-green-300' }
	else if (type.value == 'warning') { return 'bg-yellow-300' }
	else if (type.value == 'info') { return 'bg-blue-300' }
})

</script>

<style scoped>
.rad-gradient {
	background: radial-gradient(circle at top, #00000080, transparent 20%);
}
</style>