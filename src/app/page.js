'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const object_path = "forest_city.obj";

export default function Home() {
	const canvasRef = useRef(null);

	useEffect(() => {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef.current });
		renderer.setSize(window.innerWidth, window.innerHeight);

		const light = new THREE.AmbientLight(0xffffff);
		scene.add(light);

		const loader = new OBJLoader();
		loader.load(
			object_path,
			(object) => {
				scene.add(object);
				object.scale.set(0.01, 0.01, 0.01);
				camera.position.z = 10;
				camera.position.y = 2;
				camera.rotation.x -= 0.1;

				const animate = () => {
					requestAnimationFrame(animate);
					object.rotation.y += 0.001;
					renderer.render(scene, camera);
				};

				animate();

				// Add scroll event listener
				const onScroll = () => {
					// Calculate zoom factor based on scroll position
					const scrollY = window.scrollY * 0.1
					const zoomFactor = 1 + scrollY
					// Update camera position
					camera.position.z = 10 / zoomFactor;
				};

				window.addEventListener('scroll', onScroll);
				return () => window.removeEventListener('scroll', onScroll);
			},
			(xhr) => { console.log((xhr.loaded / xhr.total) * 100 + '% loaded'); },
			(error) => { console.error('An error occurred while loading the model:', error); }
		);

		return () => renderer.dispose();
	}, []);

	return (
		<div>
			<canvas ref={canvasRef} />
		</div>
	);
}