<template>
	<div>
		<div class="glowing-div"></div>
		<div class="static-trigger"></div>
	</div>
</template>

<script setup lang="js">
onMounted(() => {
	const div = document.querySelector('.glowing-div');
	const statics = document.querySelectorAll('.static-trigger');
	const rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
	const cutoff = 2 * rootFontSize; // 2rem
	let static_shadows = [];

	function computeShadows(pos, rect, cutoff) {
		if (!pos) return [];
		const dist_left = Math.abs(pos.x - rect.left);
		const dist_right = Math.abs(pos.x - rect.right);
		const dist_top = Math.abs(pos.y - rect.top);
		const dist_bottom = Math.abs(pos.y - rect.bottom);
		const dists = {
			left: dist_left,
			right: dist_right,
			top: dist_top,
			bottom: dist_bottom
		};
		const min_dist = Math.min(...Object.values(dists));
		if (min_dist > cutoff) return [];
		const intensity = 1 - (min_dist / cutoff);
		const blur = 20 * intensity;
		const offset = blur / 2;
		const spread = -blur / 4;
		const alpha = intensity;
		const color = `rgba(0, 255, 255, ${alpha})`; // Cyan glow
		const closest_sides = Object.keys(dists).filter(key => dists[key] === min_dist);
		return closest_sides.map(side => {
			let h_offset = 0;
			let v_offset = 0;
			switch (side) {
				case 'left':
					h_offset = -offset;
					break;
				case 'right':
					h_offset = offset;
					break;
				case 'top':
					v_offset = -offset;
					break;
				case 'bottom':
					v_offset = offset;
					break;
			}
			return `${h_offset}px ${v_offset}px ${blur}px ${spread}px ${color}`;
		});
	}

	function updateStatics() {
		const rect = div.getBoundingClientRect();
		static_shadows = Array.from(statics).flatMap(el => {
			const s_rect = el.getBoundingClientRect();
			const pos = {
				x: s_rect.left + s_rect.width / 2,
				y: s_rect.top + s_rect.height / 2
			};
			return computeShadows(pos, rect, cutoff);
		});
	}

	function updateGlow(mousePos) {
		const rect = div.getBoundingClientRect();
		const mouse_shadows = computeShadows(mousePos, rect, cutoff);
		const all_shadows = [...static_shadows, ...mouse_shadows].join(', ');
		div.style.boxShadow = all_shadows || 'none';
	}

	document.addEventListener('mousemove', (e) => {
		updateGlow({ x: e.clientX, y: e.clientY });
	});

	window.addEventListener('resize', () => {
		updateStatics();
		updateGlow(null);
	});

	// Initial setup
	updateStatics();
	updateGlow(null);

})
</script>

<style scoped>
.glowing-div {
	position: absolute;
	left: 400px;
	top: 200px;
	width: 200px;
	height: 200px;
	background: #333;
	border-radius: 8px;
}

.static-trigger {
	position: absolute;
	left: 350px;
	top: 250px;
	width: 50px;
	height: 50px;
	background: red;
	border-radius: 50%;
}
</style>