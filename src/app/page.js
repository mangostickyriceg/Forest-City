'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';


const object_path = "forest_city.obj"

export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create a light source
    const light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    // Load the OBJ model
    const loader = new OBJLoader();
    loader.load(
      object_path,
      (object) => {
        scene.add(object);
        object.scale.set(0.01, 0.01, 0.01)

        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate);

          // Rotate the cube
          object.rotation.y += 0.01;

          renderer.render(scene, camera);
        };
        animate();
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('An error occurred while loading the model:', error);
      }
    );

    // Set camera position
    camera.position.z = 10;
    camera.position.y = 3;
    camera.rotation.x -= 0.01;

    // Clean up on unmount
    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
}