<template>
	<div class="flex gap-5 w-full h-full px-2 py-2">
		<div class="min-w-[100px] min-h-full">
			<navigation />
		</div>
		<div class="w-full min-h-full">
			<slot></slot>
		</div>
	</div>
</template>