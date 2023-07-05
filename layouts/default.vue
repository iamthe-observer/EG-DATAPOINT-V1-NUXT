<template>
	<div class="flex gap-5 w-full h-full px-5 py-8">
		<div class="min-w-[100px] min-h-full pb-2">
			<navigation />
		</div>
		<div class="w-full min-h-full">
			<slot></slot>
		</div>
	</div>
</template>