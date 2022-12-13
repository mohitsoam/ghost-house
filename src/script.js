import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

/**
 * Basics
 */
// Debugging Panel
const gui = new dat.GUI();
dat.GUI.toggleHide();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

// door textures
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

// walls textures
const bricksColorTexture = textureLoader.load("/textures/bricks/color.jpg");
const bricksAmbientOcclusionTexture = textureLoader.load(
  "/textures/bricks/ambientOcclusion.jpg"
);
const bricksNormalTexture = textureLoader.load("/textures/bricks/normal.jpg");
const bricksRoughnessTexture = textureLoader.load(
  "/textures/bricks/roughness.jpg"
);

// grass textures
const grassColorTexture = textureLoader.load("/textures/grass/color.jpg");
const grassAmbientOcclusionTexture = textureLoader.load(
  "/textures/grass/ambientOcclusion.jpg"
);
const grassNormalTexture = textureLoader.load("/textures/grass/normal.jpg");
const grassRoughnessTexture = textureLoader.load(
  "/textures/grass/roughness.jpg"
);

grassColorTexture.repeat.set(16, 16);
grassAmbientOcclusionTexture.repeat.set(16, 16);
grassNormalTexture.repeat.set(16, 16);
grassRoughnessTexture.repeat.set(16, 16);

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

/**
 * Text
 */
const fontLoader = new FontLoader();
fontLoader.load("/fonts/Child Witch_Regular.json", (font) => {
  const textGeometry = new TextGeometry("Ghost House", {
    font: font,
    size: 0.1,
    height: 0.2,
    curveSegments: 5, // 12
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.004,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  textGeometry.center();

  const material = new THREE.MeshStandardMaterial()
  material.transparent = true;
  material.opacity = 0.9; 
  const text = new THREE.Mesh(textGeometry, material);
  text.position.x = -3.1;
  text.position.y = 9.62;
  text.position.z = 12.6;
  text.rotation.x = -0.3;
  text.rotation.y = -0.2;
  scene.add(text);
});

const spotLight = new THREE.SpotLight( 0xd6b72d, 0.8, 0.3, Math.PI / 2);
spotLight.position.set( -3.1, 9.62, 12.9 );
spotLight.lookAt( -3.1, 9.62, 12.6 );
scene.add( spotLight )

/**
 * House
 */
// House container
const house = new THREE.Group();
scene.add(house);

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  })
);
walls.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
);
walls.position.y = 1.25;
house.add(walls);

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);
roof.rotation.y = Math.PI * 0.25;
roof.position.y = 2.5 + 0.5;
house.add(roof);

// Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  })
);
door.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);

door.position.y = 1;
door.position.z = 2 + 0.01;
house.add(door);

// Chimney
const chimney = new THREE.Mesh(
  new THREE.BoxGeometry(0.3, 0.6, 0.3),
  new THREE.MeshStandardMaterial({ color: "#777777" })
);
chimney.position.x = 1.5;
chimney.position.y = 3.1;
house.add(chimney);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);

house.add(bush1, bush2, bush3, bush4);

// Graves
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });

for (let i = 0; i < 70; i++) {
  const angle = Math.random() * Math.PI * 2; // random angle
  const radius = 4 + Math.random() * 10; // Random radius
  const x = Math.cos(angle) * radius; // Get the x position using cosinus
  const z = Math.sin(angle) * radius; // Get the z position using sinus

  // create the mesh
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);

  // Position
  grave.position.set(x, 0.3, z);

  // Rotation
  grave.rotation.z = (Math.random() - 0.5) * 0.4;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;

  // Shadow
  grave.castShadow = true;
  grave.receiveShadow = true;

  // Add to the graves container
  graves.add(grave);
}

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40), // originally 20x20
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  })
);
floor.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Ghosts
 */
// Ghost Material
const ghostMaterial = new THREE.MeshStandardMaterial();
ghostMaterial.roughness = 0.7;
ghostMaterial.opacity = 0.5;
ghostMaterial.transparent = true;

const facialFeaturesMaterial = new THREE.MeshBasicMaterial({ color: 0x111111 });
facialFeaturesMaterial.side = THREE.DoubleSide;
const facialFeaturesGeometry = new THREE.CircleGeometry(0.06, 32);

// Ghost 1
const ghost1 = new THREE.Group();

// Ghost Body
const body1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  ghostMaterial
);
body1.scale.y = 1.1;

// Ghost Left Eye
const leftEye1 = new THREE.Mesh(facialFeaturesGeometry, facialFeaturesMaterial);
leftEye1.scale.x = 0.6;
leftEye1.position.x = -0.15;
leftEye1.position.y = 0.15;
leftEye1.position.z = 0.475;

// Ghost Right Eye
const rightEye1 = new THREE.Mesh(
  facialFeaturesGeometry,
  facialFeaturesMaterial
);
rightEye1.scale.x = 0.6;
rightEye1.position.x = 0.15;
rightEye1.position.y = 0.15;
rightEye1.position.z = 0.475;

// Ghost Mouth
const mouth1 = new THREE.Mesh(facialFeaturesGeometry, facialFeaturesMaterial);
mouth1.scale.x = 2;
mouth1.scale.y = 0.5;
mouth1.position.y = -0.15;
mouth1.position.z = 0.49;

ghost1.add(body1, leftEye1, rightEye1, mouth1);
scene.add(ghost1);

// Ghost 2
const ghost2 = new THREE.Group();

// Ghost Body
const body2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  ghostMaterial
);
body2.scale.y = 1.1;

// Ghost Left Eye
const leftEye2 = new THREE.Mesh(facialFeaturesGeometry, facialFeaturesMaterial);
leftEye2.scale.x = 0.6;
leftEye2.position.x = -0.15;
leftEye2.position.y = 0.15;
leftEye2.position.z = 0.475;

// Ghost Right Eye
const rightEye2 = new THREE.Mesh(
  facialFeaturesGeometry,
  facialFeaturesMaterial
);
rightEye2.scale.x = 0.6;
rightEye2.position.x = 0.15;
rightEye2.position.y = 0.15;
rightEye2.position.z = 0.475;

// Ghost Mouth
const mouth2 = new THREE.Mesh(facialFeaturesGeometry, facialFeaturesMaterial);
mouth2.scale.x = 2;
mouth2.scale.y = 0.5;
mouth2.position.y = -0.15;
mouth2.position.z = 0.49;

ghost2.add(body2, leftEye2, rightEye2, mouth2);
scene.add(ghost2);

// Ghost 3
const ghost3 = new THREE.Group();

// Ghost Body
const body3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  ghostMaterial
);
body3.scale.y = 1.1;

// Ghost Left Eye
const leftEye3 = new THREE.Mesh(facialFeaturesGeometry, facialFeaturesMaterial);
leftEye3.scale.x = 0.6;
leftEye3.position.x = -0.15;
leftEye3.position.y = 0.15;
leftEye3.position.z = 0.475;

// Ghost Right Eye
const rightEye3 = new THREE.Mesh(
  facialFeaturesGeometry,
  facialFeaturesMaterial
);
rightEye3.scale.x = 0.6;
rightEye3.position.x = 0.15;
rightEye3.position.y = 0.15;
rightEye3.position.z = 0.475;

// Ghost Mouth
const mouth3 = new THREE.Mesh(facialFeaturesGeometry, facialFeaturesMaterial);
mouth3.scale.x = 2;
mouth3.scale.y = 0.5;
mouth3.position.y = -0.15;
mouth3.position.z = 0.49;

ghost3.add(body3, leftEye3, rightEye3, mouth3);
scene.add(ghost3);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.12);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.12);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

// Door light (added to the house)
const doorLight = new THREE.PointLight("#ff7d46", 1, 7);
doorLight.position.set(0, 2.2, 2.7);
house.add(doorLight);

/**
 * Fog
 */
const fog = new THREE.Fog("#262837", 1, 15);
scene.fog = fog;

/** Shadows */
chimney.castShadow = true;
chimney.receiveShadow = true;

moonLight.castShadow = true;
doorLight.castShadow = true;

walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;

walls.receiveShadow = true;
bush1.receiveShadow = true;
bush2.receiveShadow = true;
bush3.receiveShadow = true;
bush4.receiveShadow = true;

floor.receiveShadow = true;

moonLight.shadow.mapSize.width = 256;
moonLight.shadow.mapSize.height = 256;
moonLight.shadow.camera.far = 15;

doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = -3.31;
camera.position.y = 9.78;
camera.position.z = 13.39;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.zoomSpeed = 0.25;

controls.maxDistance = 18;
controls.minDistance = 4;
controls.maxPolarAngle = Math.PI / 2 - 0.02;
controls.minPolarAngle = Math.PI / 4;
controls.minZoom = 20;
controls.panSpeed = 0;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setClearColor("#262837");
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/**
 * Animate
 */
const clock = new THREE.Clock();

const render = () => {
  const elapsedTime = clock.getElapsedTime();

  // Lights
  spotLight.position.x += Math.cos(elapsedTime ) / 400;

  // Ghosts
  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.z = Math.sin(ghost1Angle) * 4;
  ghost1.position.y = Math.sin(elapsedTime * 3);

  const ghost2Angle = -elapsedTime * 0.32;
  ghost2.position.x = Math.cos(ghost2Angle) * 5;
  ghost2.position.z = Math.sin(ghost2Angle) * 5;
  ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  const ghost3Angle = elapsedTime * 0.18;
  ghost3.position.x =
    Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
  ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
  ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(render);
};

render();

/** 
 * Instructions
 */
const instructions = document.createElement("div");
instructions.setAttribute("id", "instructions");
instructions.innerText = 'SCROLL TO ZOOM';
instructions.style.color = "white";
document.body.append(instructions);

setTimeout(() => {
  instructions.style.display = "none"
}, 3500)

