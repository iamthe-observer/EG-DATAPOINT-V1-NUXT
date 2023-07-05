<template>
	<div class="w-[300px] relative aspect-square border-2 border-white rounded-lg mt-3 ml-3">
		<slot />
		<div class="absolute border-t-2 border-l-2 border-white -top-1 -left-1  w-10 aspect-square rounded-xl">
		</div>
		<div class="absolute border-t-2 border-r-2 border-white -top-1 -right-1  w-10 aspect-square rounded-xl">
		</div>
		<div class="absolute border-b-2 border-l-2 border-white -bottom-1 -left-1  w-10 aspect-square rounded-xl">
		</div>
		<div class="absolute border-b-2 border-r-2 border-white -bottom-1 -right-1  w-10 aspect-square rounded-xl">
		</div>
	</div>
</template>