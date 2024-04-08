/* eslint-disable no-undef, no-unused-vars */

import * as THREE from "./three";

import { OrbitControls } from "./three/examples/jsm/controls/OrbitControls.js";

// Create renderer.
const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create scene.
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x292f33);

// Create camera.
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight
);
camera.position.z = -50;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//--
// Add some objects here!
const group = new THREE.Group();
scene.add(group);

// sun at center
const sunGeo = new THREE.SphereGeometry(10, 16, 16);
const sunMat = new THREE.MeshBasicMaterial({ color: 0xd4ab53 });
const sun = new THREE.Mesh(sunGeo, sunMat);
group.add(sun);

let wireframe = new THREE.WireframeGeometry(sunGeo);
let line = new THREE.LineSegments(wireframe);
line.material.color.setHex(0xa88436);
group.add(line);

// planet1
const planetGroup1 = new THREE.Group();
group.add(planetGroup1);
planetGroup1.position.x = 20;
planetGroup1.rotation.z = Math.PI / 8;

const planetGeo1 = new THREE.SphereGeometry(2.5, 8, 4);
const planetMat1 = new THREE.MeshBasicMaterial({ color: 0x066b50 });
const planet1 = new THREE.Mesh(planetGeo1, planetMat1);
planetGroup1.add(planet1);
let wireframe2 = new THREE.WireframeGeometry(planetGeo1);
let line2 = new THREE.LineSegments(wireframe2);
line2.material.color.setHex(0x054534);
planetGroup1.add(line2);

// planet1's orbit path
const planetOrbitGeo1 = new THREE.TorusGeometry(20, 0.1, 5, 100, 6.3);
const planetOrbitMat1 = new THREE.MeshBasicMaterial({ color: 0x3b4347 });
const planetOrbit1 = new THREE.Mesh(planetOrbitGeo1, planetOrbitMat1);
group.add(planetOrbit1);
planetOrbit1.rotation.x = Math.PI / 2;

// planet1's moon
const moonGroup1 = new THREE.Group();
planetGroup1.add(moonGroup1);
moonGroup1.position.x = 4;

const moonGeo1 = new THREE.SphereGeometry(0.5, 8, 8);
const moonMat1 = new THREE.MeshBasicMaterial({ color: 0x999999 });
const moon1 = new THREE.Mesh(moonGeo1, moonMat1);
moonGroup1.add(moon1);
let wireframe3 = new THREE.WireframeGeometry(moonGeo1);
let line3 = new THREE.LineSegments(wireframe3);
line3.material.color.setHex(0x666666);
moonGroup1.add(line3);

// planet1 moon's orbit path
const moon1OrbitGeo = new THREE.TorusGeometry(4, 0.1, 5, 100, 6.3);
const moon1OrbitMat = new THREE.MeshBasicMaterial({ color: 0x3b4347 });
const moon1Orbit = new THREE.Mesh(moon1OrbitGeo, moon1OrbitMat);
planetGroup1.add(moon1Orbit);
moon1Orbit.rotation.x = Math.PI / 2;

// planet2
const planetGroup2 = new THREE.Group();
group.add(planetGroup2);
planetGroup2.position.z = -25;
// planetGroup2.position.y = 5;
planetGroup2.rotation.y = 0.5;

const planetGeo2 = new THREE.SphereGeometry(3, 8, 6);
const planetMat2 = new THREE.MeshBasicMaterial({ color: 0x8e5ae8 });
const planet2 = new THREE.Mesh(planetGeo2, planetMat2);
planetGroup2.add(planet2);
let wireframe4 = new THREE.WireframeGeometry(planetGeo2);
let line4 = new THREE.LineSegments(wireframe4);
line4.material.color.setHex(0x24edb7);
planetGroup2.add(line4);

// planet2's orbit path
const planetOrbitGeo2 = new THREE.TorusGeometry(25, 0.1, 5, 100, 6.3);
const planetOrbitMat2 = new THREE.MeshBasicMaterial({ color: 0x3b4347 });
const planetOrbit2 = new THREE.Mesh(planetOrbitGeo2, planetOrbitMat2);
group.add(planetOrbit2);
planetOrbit2.rotation.x = Math.PI / 2;
// planetOrbit2.rotation.y = 0.5;

// planet2's ring
const ringGroup = new THREE.Group();
planetGroup2.add(ringGroup);
// ringGroup.position.x = -1.4;
ringGroup.rotation.x = Math.PI / 4;
ringGroup.rotation.y = -Math.PI / 16;

const ringGeo = new THREE.TorusGeometry(4, 0.5, 4, 64, 6.3);
const ringMat = new THREE.MeshBasicMaterial({ color: 0x8e5ae8 });
const ring = new THREE.Mesh(ringGeo, ringMat);
ringGroup.add(ring);
let wireframe5 = new THREE.WireframeGeometry(ringGeo);
let line5 = new THREE.LineSegments(wireframe5);
line5.material.color.setHex(0xb84628);
ringGroup.add(line5);

// all solar system perspective
group.rotation.x = -Math.PI / 4;
group.rotation.z = Math.PI / 8;

let frame = 0;

// Animation loop.
const tick = () => {
	group.rotation.y += 0.002;

	planetGroup1.rotation.y += 0.005;
	planetGroup1.rotation.x += 0.003;
	planetGroup1.position.x = Math.sin(frame / 400) * 20;
	planetGroup1.position.z = Math.cos(frame / 400) * 20;

	moonGroup1.rotation.y += 0.01;
	moonGroup1.position.x = Math.sin(frame / 250) * 4;
	moonGroup1.position.z = Math.cos(frame / 250) * 4;

	planetGroup2.rotation.y += 0.003;
	planetGroup2.rotation.x += 0.003;

	planetGroup2.position.x = -Math.sin(frame / 750) * 25;
	planetGroup2.position.z = -Math.cos(frame / 750) * 25;

	ringGroup.rotation.x += 0.005;

	frame += 1;
	controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(tick);
};
tick();

// Window resize listener.
window.addEventListener("resize", () => {
	const w = window.innerWidth;
	const h = window.innerHeight;
	camera.aspect = w / h;
	camera.updateProjectionMatrix();
	renderer.setSize(w, h);
});
