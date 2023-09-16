<template>
	<div class="absolute inset-0 w-full h-full transition-opacity 1500 ease-out opacity-0 canvas_container block z-[-1]">
	</div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const { x: mouseX, y: mouseY } = useMouse()

onMounted(() => {
	const canvas: HTMLDivElement = document.querySelector(".canvas_container")!;
	canvas.style.opacity = (1).toString();

	// Scene, Camera, Renderer
	let renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(new THREE.Color("#1c1624"))
	let scene = new THREE.Scene();
	let aspect = window.innerWidth / window.innerHeight;
	let camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1500);

	// Scene, Camera, Renderer Configuration
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.querySelector('.canvas_container')!.appendChild(renderer.domElement);
	let orbitControls = new OrbitControls(camera, renderer.domElement);

	camera.position.set(1, 1, 1);
	orbitControls.enabled = true;

	scene.add(camera);

	// On window resize, adjust camera aspect ratio and renderer size
	window.addEventListener('resize', function () {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	});

	// light source
	const color = 0xffffff, intensity = 1;
	const light = new THREE.DirectionalLight(color, intensity);
	light.position.set(-1, 2, 4);
	scene.add(light);

	const boxWidth = 1, boxHeight = 1, boxDepth = 1;
	const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
	const material = new THREE.MeshLambertMaterial({ color: 0x44aa88 });
	const cube = new THREE.Mesh(geometry, material);
	scene.add(cube);

	// Main render function
	let render = function () {
		cube.rotation.y = mouseX.value * 0.005;
		cube.rotation.x = mouseY.value * 0.005;

		requestAnimationFrame(render);
		renderer.render(scene, camera);
	};

	render();



})
</script>