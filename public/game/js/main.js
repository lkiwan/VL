// Omar & Chaymae - Romantic 3D Scene
// Main Three.js Application

let scene, camera, renderer, controls;
let island, water, characters, pacman;
let photoFrames = [];
let hearts = [];
let flowers = [];
let particles = [];
let clock = new THREE.Clock();
let sceneReady = false;

// Photo paths
const photos = [
    'photos/photo1.jpeg',
    'photos/photo2.jpeg',
    'photos/photo3.jpeg',
    'photos/photo4.jpeg',
    'photos/photo5.jpeg',
    'photos/photo6.jpeg',
    'photos/photo7.jpeg',
    'photos/photo8.jpeg',
    'photos/photo9.jpeg'
];

// ==========================================
// LOADING SCREEN
// ==========================================
function initLoadingScreen() {
    const helloText = document.getElementById('hello-text');
    const clickPrompt = document.getElementById('click-prompt');
    const loadingScreen = document.getElementById('loading-screen');

    // Simplified entrance
    setTimeout(() => {
        clickPrompt.classList.remove('hidden');
        clickPrompt.classList.add('show');
    }, 2000);

    // Click to enter
    loadingScreen.addEventListener('click', () => {
        loadingScreen.classList.add('fade-out');
        if (window.startBackgroundMusic) window.startBackgroundMusic();

        setTimeout(() => {
            loadingScreen.style.display = 'none';
            startCinematic();
        }, 1500);
    });
}

// ==========================================
// CINEMATIC INTRO
// ==========================================
function startCinematic() {
    document.getElementById('controls-hint').classList.remove('hidden');
    document.getElementById('controls-hint').classList.add('show');

    // Camera animation
    const startPos = { x: 0, y: 50, z: 100 };
    const endPos = { x: 30, y: 15, z: 40 };

    camera.position.set(startPos.x, startPos.y, startPos.z);

    const duration = 5000;
    const startTime = Date.now();

    function animateCamera() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease out cubic)
        const eased = 1 - Math.pow(1 - progress, 3);

        camera.position.x = startPos.x + (endPos.x - startPos.x) * eased;
        camera.position.y = startPos.y + (endPos.y - startPos.y) * eased;
        camera.position.z = startPos.z + (endPos.z - startPos.z) * eased;

        camera.lookAt(0, 2, 0);

        if (progress < 1) {
            requestAnimationFrame(animateCamera);
        } else {
            controls.enabled = true;
            // Show love message after camera settles
            setTimeout(showLoveMessage, 2000);
        }
    }

    animateCamera();
}

function showLoveMessage() {
    const loveMessage = document.getElementById('love-message');
    loveMessage.classList.remove('hidden');
    loveMessage.classList.add('show');

    // Create floating hearts
    const heartsContainer = document.querySelector('.hearts-container');
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '&#10084;';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 6 + 's';
        heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        heartsContainer.appendChild(heart);
    }
}

// ==========================================
// THREE.JS SCENE SETUP
// ==========================================
function initScene() {
    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1a0a15, 0.008);

    // Camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 50, 100);

    // Renderer
    const canvas = document.getElementById('scene-canvas');
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = false; // Disabled for performance
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8;

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enabled = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 100;
    controls.minDistance = 15;
    controls.maxPolarAngle = Math.PI / 2.1;
    controls.target.set(0, 2, 0);

    // Create scene elements
    createSky();
    createLighting();
    createWater();
    createIsland();
    createFlowers();
    createSilhouettes();
    createPicnicSetup();
    createPhotoFrames();
    createPacman();
    createMessageInABottle();
    createWhale();
    createHeartParticles();

    setupInteraction();

    // Window resize
    window.addEventListener('resize', onWindowResize);

    sceneReady = true;
}

// ==========================================
// SKY
// ==========================================
function createSky() {
    // Gradient sky dome
    const skyGeometry = new THREE.SphereGeometry(400, 32, 32);
    const skyMaterial = new THREE.ShaderMaterial({
        uniforms: {
            topColor: { value: new THREE.Color(0x0a0015) },
            bottomColor: { value: new THREE.Color(0x2a1030) },
            horizonColor: { value: new THREE.Color(0x4a1040) },
            offset: { value: 20 },
            exponent: { value: 0.6 }
        },
        vertexShader: `
            varying vec3 vWorldPosition;
            void main() {
                vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                vWorldPosition = worldPosition.xyz;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 topColor;
            uniform vec3 bottomColor;
            uniform vec3 horizonColor;
            uniform float offset;
            uniform float exponent;
            varying vec3 vWorldPosition;
            void main() {
                float h = normalize(vWorldPosition + offset).y;
                float t = max(pow(max(h, 0.0), exponent), 0.0);
                vec3 color = mix(horizonColor, topColor, t);
                color = mix(bottomColor, color, smoothstep(-0.1, 0.2, h));
                gl_FragColor = vec4(color, 1.0);
            }
        `,
        side: THREE.BackSide
    });

    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(sky);

    // Stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 500;
    const positions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const radius = 350 + Math.random() * 50;

        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = Math.abs(radius * Math.cos(phi)); // Only upper hemisphere
        positions[i + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1.5,
        transparent: true,
        opacity: 0.8
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
}

// ==========================================
// LIGHTING
// ==========================================
function createLighting() {
    // Ambient light (moonlight feel)
    const ambient = new THREE.AmbientLight(0x3a2050, 0.4);
    scene.add(ambient);

    // Main directional light (moon)
    const moonLight = new THREE.DirectionalLight(0x8080ff, 0.5);
    moonLight.position.set(-50, 100, 50);
    moonLight.castShadow = true;
    moonLight.shadow.mapSize.width = 2048;
    moonLight.shadow.mapSize.height = 2048;
    moonLight.shadow.camera.near = 10;
    moonLight.shadow.camera.far = 200;
    moonLight.shadow.camera.left = -50;
    moonLight.shadow.camera.right = 50;
    moonLight.shadow.camera.top = 50;
    moonLight.shadow.camera.bottom = -50;
    scene.add(moonLight);

    // Warm point light for romantic atmosphere
    const warmLight1 = new THREE.PointLight(0xff6688, 1.2, 40);
    warmLight1.position.set(0, 5, 0);
    scene.add(warmLight1);
}

// ==========================================
// WATER
// ==========================================
function createWater() {
    const waterGeometry = new THREE.PlaneGeometry(500, 500, 30, 30);

    const waterMaterial = new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0 },
            uColor1: { value: new THREE.Color(0x0a1030) },
            uColor2: { value: new THREE.Color(0x1a2050) }
        },
        vertexShader: `
            uniform float uTime;
            varying vec2 vUv;
            varying float vElevation;
            void main() {
                vUv = uv;
                vec3 pos = position;
                float elevation = sin(pos.x * 0.05 + uTime) * cos(pos.y * 0.05 + uTime) * 1.5;
                elevation += sin(pos.x * 0.1 + uTime * 1.5) * 0.5;
                pos.z = elevation;
                vElevation = elevation;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            varying vec2 vUv;
            varying float vElevation;
            void main() {
                float mixStrength = (vElevation + 2.0) / 4.0;
                vec3 color = mix(uColor1, uColor2, mixStrength);

                // Add shimmer
                float shimmer = sin(vUv.x * 50.0) * sin(vUv.y * 50.0) * 0.05;
                color += shimmer;

                gl_FragColor = vec4(color, 0.9);
            }
        `,
        transparent: true
    });

    water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.rotation.x = -Math.PI / 2;
    water.position.y = -0.5;
    scene.add(water);
}

// ==========================================
// ISLAND
// ==========================================
function createIsland() {
    // Main island body
    const islandGeometry = new THREE.CylinderGeometry(12, 15, 4, 32, 8);

    // Modify vertices for natural look
    const positions = islandGeometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = positions.getZ(i);

        // Add noise
        const noise = Math.sin(x * 0.5) * Math.cos(z * 0.5) * 0.5;
        positions.setY(i, y + noise * (y > 0 ? 1 : 0.2));
    }
    islandGeometry.computeVertexNormals();

    const islandMaterial = new THREE.MeshStandardMaterial({
        color: 0x2a5a30,
        roughness: 0.9,
        metalness: 0.1
    });

    island = new THREE.Mesh(islandGeometry, islandMaterial);
    island.position.y = 0;
    island.receiveShadow = true;
    island.castShadow = true;
    scene.add(island);

    // Grass layer on top
    const grassGeometry = new THREE.CircleGeometry(11, 32);
    const grassMaterial = new THREE.MeshStandardMaterial({
        color: 0x3a8040,
        roughness: 1,
        metalness: 0
    });

    const grass = new THREE.Mesh(grassGeometry, grassMaterial);
    grass.rotation.x = -Math.PI / 2;
    grass.position.y = 2.1;
    grass.receiveShadow = true;
    scene.add(grass);

    // Beach/sand edge
    const beachGeometry = new THREE.TorusGeometry(11.5, 1, 8, 32);
    const beachMaterial = new THREE.MeshStandardMaterial({
        color: 0xc4a35a,
        roughness: 0.95
    });

    const beach = new THREE.Mesh(beachGeometry, beachMaterial);
    beach.rotation.x = Math.PI / 2;
    beach.position.y = 1.5;
    scene.add(beach);
}

// ==========================================
// FLOWERS
// ==========================================
function createFlowers() {
    const flowerColors = [0xff6b8a, 0xff8fa3, 0xffb6c1, 0xff69b4, 0xffc0cb, 0xff1493];

    for (let i = 0; i < 25; i++) {
        const flower = createFlower(flowerColors[Math.floor(Math.random() * flowerColors.length)]);

        // Random position on island
        const angle = Math.random() * Math.PI * 2;
        const radius = 3 + Math.random() * 7;
        flower.position.x = Math.cos(angle) * radius;
        flower.position.z = Math.sin(angle) * radius;
        flower.position.y = 2.1;

        flower.rotation.y = Math.random() * Math.PI * 2;
        flower.scale.setScalar(0.3 + Math.random() * 0.4);

        flowers.push(flower);
        scene.add(flower);

        // Make the 3rd flower interactive for Letter 3
        if (i === 2) {
            makeInteractive(flower, 'letter3');
            // Make it slightly bigger/special
            flower.scale.setScalar(0.8);
            const glow = new THREE.PointLight(0xffff00, 1, 5);
            glow.position.y = 1;
            flower.add(glow);
        }
    }
}

function createFlower(color) {
    const group = new THREE.Group();

    // Stem
    const stemGeometry = new THREE.CylinderGeometry(0.05, 0.08, 1.5, 8);
    const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.y = 0.75;
    group.add(stem);

    // Petals
    const petalGeometry = new THREE.SphereGeometry(0.3, 8, 8);
    petalGeometry.scale(1, 0.3, 0.5);

    const petalMaterial = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.5
    });

    for (let i = 0; i < 6; i++) {
        const petal = new THREE.Mesh(petalGeometry, petalMaterial);
        const angle = (i / 6) * Math.PI * 2;
        petal.position.x = Math.cos(angle) * 0.25;
        petal.position.z = Math.sin(angle) * 0.25;
        petal.position.y = 1.5;
        petal.rotation.z = Math.PI / 4;
        petal.rotation.y = angle;
        group.add(petal);
    }

    // Center
    const centerGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const centerMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
    const center = new THREE.Mesh(centerGeometry, centerMaterial);
    center.position.y = 1.5;
    group.add(center);

    return group;
}

// ==========================================
// SILHOUETTE CHARACTERS
// ==========================================
function createSilhouettes() {
    const characterGroup = new THREE.Group();

    // Create Omar silhouette (left)
    const omar = createHumanSilhouette(false);
    omar.position.set(-1.5, 2.1, 0);
    omar.rotation.y = Math.PI / 6;
    characterGroup.add(omar);

    // Make Omar interactive for Letter 1
    makeInteractive(omar, 'letter1');

    // Create Chaymae silhouette (right)
    const chaymae = createHumanSilhouette(true);
    chaymae.position.set(1.5, 2.1, 0);
    chaymae.rotation.y = -Math.PI / 6;
    characterGroup.add(chaymae);

    // Heart between them
    const heartBetween = createHeart3D(0xff3366);
    heartBetween.position.set(0, 4.5, 0);
    heartBetween.scale.setScalar(0.4);
    characterGroup.add(heartBetween);

    characters = characterGroup;
    scene.add(characterGroup);
}

function createHumanSilhouette(isFemale) {
    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({
        color: 0x1a1a2e,
        roughness: 0.8,
        metalness: 0.2
    });

    // Head
    const headGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const head = new THREE.Mesh(headGeometry, material);
    head.position.y = 2.4;
    head.castShadow = true;
    group.add(head);

    // Body/Torso (sitting)
    const torsoGeometry = new THREE.CylinderGeometry(0.35, 0.45, 1.2, 16);
    const torso = new THREE.Mesh(torsoGeometry, material);
    torso.position.y = 1.4;
    torso.castShadow = true;
    group.add(torso);

    // Hair for female
    if (isFemale) {
        const hairGeometry = new THREE.SphereGeometry(0.45, 32, 32);
        hairGeometry.scale(1, 1.1, 1);
        const hairMaterial = new THREE.MeshStandardMaterial({
            color: 0x0a0a15,
            roughness: 0.9
        });
        const hair = new THREE.Mesh(hairGeometry, hairMaterial);
        hair.position.y = 2.5;
        hair.position.z = -0.1;
        group.add(hair);

        // Long hair
        const longHairGeometry = new THREE.CylinderGeometry(0.3, 0.15, 1.2, 16);
        const longHair = new THREE.Mesh(longHairGeometry, hairMaterial);
        longHair.position.y = 1.8;
        longHair.position.z = -0.3;
        group.add(longHair);
    }

    // Legs (sitting position)
    const legGeometry = new THREE.CylinderGeometry(0.18, 0.15, 1, 12);
    const leftLeg = new THREE.Mesh(legGeometry, material);
    leftLeg.position.set(-0.25, 0.4, 0.3);
    leftLeg.rotation.x = Math.PI / 3;
    leftLeg.castShadow = true;
    group.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeometry, material);
    rightLeg.position.set(0.25, 0.4, 0.3);
    rightLeg.rotation.x = Math.PI / 3;
    rightLeg.castShadow = true;
    group.add(rightLeg);

    return group;
}

// ==========================================
// PICNIC SETUP
// ==========================================
function createPicnicSetup() {
    // Blanket
    const blanketGeometry = new THREE.CircleGeometry(3, 32);
    const blanketMaterial = new THREE.MeshStandardMaterial({
        color: 0xcc4455,
        roughness: 0.9,
        side: THREE.DoubleSide
    });

    const blanket = new THREE.Mesh(blanketGeometry, blanketMaterial);
    blanket.rotation.x = -Math.PI / 2;
    blanket.position.y = 2.15;
    blanket.receiveShadow = true;
    scene.add(blanket);

    // Basket
    const basketGeometry = new THREE.CylinderGeometry(0.4, 0.5, 0.6, 16);
    const basketMaterial = new THREE.MeshStandardMaterial({
        color: 0x8b4513,
        roughness: 0.8
    });

    const basket = new THREE.Mesh(basketGeometry, basketMaterial);
    basket.position.set(-2, 2.5, 1);
    basket.castShadow = true;
    scene.add(basket);

    // Candles with glow
    for (let i = 0; i < 3; i++) {
        const candle = createCandle();
        const angle = (i / 3) * Math.PI * 2 + Math.PI / 3;
        candle.position.x = Math.cos(angle) * 2.5;
        candle.position.z = Math.sin(angle) * 2.5;
        candle.position.y = 2.2;
        scene.add(candle);
    }
}

function createCandle() {
    const group = new THREE.Group();

    // Candle body
    const candleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 8);
    const candleMaterial = new THREE.MeshBasicMaterial({ color: 0xfff8dc });
    const candle = new THREE.Mesh(candleGeometry, candleMaterial);
    candle.position.y = 0.25;
    group.add(candle);

    // Flame (simple glow)
    const flameGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const flameMaterial = new THREE.MeshBasicMaterial({
        color: 0xff8833,
        transparent: true,
        opacity: 0.9
    });
    const flame = new THREE.Mesh(flameGeometry, flameMaterial);
    flame.position.y = 0.55;
    group.add(flame);

    return group;
}

// ==========================================
// PHOTO SNOW BUBBLES IN SKY
// ==========================================
function createPhotoFrames() {
    const loader = new THREE.TextureLoader();

    photos.forEach((photoPath, index) => {
        loader.load(photoPath, (texture) => {
            const bubbleGroup = new THREE.Group();
            const bubbleRadius = 3;

            // Create circular photo
            const photoGeometry = new THREE.CircleGeometry(bubbleRadius - 0.3, 32);
            const photoMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.DoubleSide
            });
            const photo = new THREE.Mesh(photoGeometry, photoMaterial);
            bubbleGroup.add(photo);

            // Simple bubble ring
            const ringGeometry = new THREE.TorusGeometry(bubbleRadius, 0.12, 8, 24);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0xaaddff,
                transparent: true,
                opacity: 0.7
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            bubbleGroup.add(ring);

            // One sparkle highlight
            const sparkleGeometry = new THREE.SphereGeometry(0.15, 6, 6);
            const sparkleMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.8
            });
            const sparkle = new THREE.Mesh(sparkleGeometry, sparkleMaterial);
            sparkle.position.set(bubbleRadius * 0.5, bubbleRadius * 0.5, 0.2);
            bubbleGroup.add(sparkle);

            // Position in sky
            const angle = (index / photos.length) * Math.PI * 2;
            const radius = 15 + Math.random() * 20;
            const height = 20 + Math.random() * 25;

            bubbleGroup.position.x = Math.cos(angle) * radius;
            bubbleGroup.position.z = Math.sin(angle) * radius;
            bubbleGroup.position.y = height;

            photoFrames.push({
                mesh: bubbleGroup,
                baseY: height,
                phase: index * 0.7,
                driftX: (Math.random() - 0.5) * 0.008,
                driftZ: (Math.random() - 0.5) * 0.008,
                fallSpeed: 0.008 + Math.random() * 0.008,
                rotationSpeed: (Math.random() - 0.5) * 0.005
            });

            // Make the first photo interactive for Letter 2
            if (index === 0) {
                makeInteractive(bubbleGroup, 'letter2');
                // Highlight the interactive one
                const glow = new THREE.PointLight(0xff00ff, 1, 10);
                bubbleGroup.add(glow);
            }

            scene.add(bubbleGroup);
        }, undefined, (error) => {
            console.log('Error loading photo:', photoPath, error);
        });

        // Make the first photo interactive (outside the callback to ensure logic runs, 
        // but since meshes are created inside async callback, we need to handle it there.
        // Actually, let's modify the callback above to tag the first one.)
    });
}

// ==========================================
// PACMAN WITH HEARTS
// ==========================================
function createPacman() {
    const pacmanGroup = new THREE.Group();

    // Pacman body
    const pacmanGeometry = new THREE.SphereGeometry(1.5, 32, 32, 0, Math.PI * 1.7);
    const pacmanMaterial = new THREE.MeshStandardMaterial({
        color: 0xffff00,
        roughness: 0.3,
        metalness: 0.1,
        side: THREE.DoubleSide
    });

    const pacmanMesh = new THREE.Mesh(pacmanGeometry, pacmanMaterial);
    pacmanMesh.rotation.y = Math.PI / 2;
    pacmanMesh.rotation.z = Math.PI / 2;
    pacmanGroup.add(pacmanMesh);

    // Eye
    const eyeGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye.position.set(0.3, 0.8, 0.8);
    pacmanGroup.add(eye);

    pacmanGroup.position.set(8, 10, 0);

    pacman = {
        mesh: pacmanGroup,
        angle: 0,
        mouthOpen: 0
    };

    scene.add(pacmanGroup);

    // Letter 4: Pacman
    makeInteractive(pacmanGroup, 'letter4');

    // Create hearts for pacman to "eat"
    for (let i = 0; i < 6; i++) {
        const heart = createHeart3D(0xff3366);
        const angle = (i / 15) * Math.PI * 2;
        const radius = 15 + Math.sin(i) * 3;

        heart.position.x = Math.cos(angle) * radius;
        heart.position.z = Math.sin(angle) * radius;
        heart.position.y = 10 + Math.sin(i * 2) * 2;
        heart.scale.setScalar(0.4);

        hearts.push({
            mesh: heart,
            baseY: heart.position.y,
            phase: i * 0.3,
            angle: angle,
            radius: radius
        });

        scene.add(heart);
    }
}

function createHeart3D(color) {
    const heartShape = new THREE.Shape();

    const x = 0, y = 0;
    heartShape.moveTo(x, y + 0.5);
    heartShape.bezierCurveTo(x, y + 0.5, x - 0.5, y, x - 0.5, y);
    heartShape.bezierCurveTo(x - 0.5, y - 0.5, x, y - 0.5, x, y - 1);
    heartShape.bezierCurveTo(x, y - 0.5, x + 0.5, y - 0.5, x + 0.5, y);
    heartShape.bezierCurveTo(x + 0.5, y, x, y + 0.5, x, y + 0.5);

    const extrudeSettings = {
        depth: 0.4,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 2,
        bevelSize: 0.1,
        bevelThickness: 0.1
    };

    const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    const material = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.3,
        metalness: 0.2,
        emissive: color,
        emissiveIntensity: 0.2
    });

    const heart = new THREE.Mesh(geometry, material);
    heart.rotation.x = Math.PI;
    heart.rotation.z = Math.PI;

    return heart;
}

// ==========================================
// MESSAGE IN A BOTTLE (Letter 5)
// ==========================================
function createMessageInABottle() {
    const group = new THREE.Group();

    // Bottle body
    const bottleGeometry = new THREE.CylinderGeometry(0.3, 0.3, 1.2, 16);
    const bottleMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xaaddff,
        transparent: true,
        opacity: 0.6,
        roughness: 0,
        metalness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0
    });
    const bottle = new THREE.Mesh(bottleGeometry, bottleMaterial);
    group.add(bottle);

    // Neck
    const neckGeometry = new THREE.CylinderGeometry(0.1, 0.3, 0.4, 16);
    const neck = new THREE.Mesh(neckGeometry, bottleMaterial);
    neck.position.y = 0.8;
    group.add(neck);

    // Cork
    const corkGeometry = new THREE.CylinderGeometry(0.12, 0.1, 0.3, 16);
    const corkMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const cork = new THREE.Mesh(corkGeometry, corkMaterial);
    cork.position.y = 1.1;
    group.add(cork);

    // Paper inside
    const paperGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.8, 16, 1, true);
    const paperMaterial = new THREE.MeshStandardMaterial({
        color: 0xfff8dc,
        side: THREE.DoubleSide
    });
    const paper = new THREE.Mesh(paperGeometry, paperMaterial);
    paper.position.y = 0;
    group.add(paper);

    // Position in water
    group.position.set(15, 0, 15);
    group.rotation.x = Math.PI / 4;
    group.rotation.z = Math.PI / 6;

    scene.add(group);

    // Tag for Letter 5
    makeInteractive(group, 'letter5');

    // Add simple bobbing animation in update loop via userData reference if needed, 
    // or just store in a global variable.
    window.bottle = group;
}

// ==========================================
// WHALE
// ==========================================
function createWhale() {
    const whaleGroup = new THREE.Group();

    // Body
    const bodyGeometry = new THREE.SphereGeometry(4, 32, 32);
    bodyGeometry.scale(1, 0.6, 2);
    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x336699,
        roughness: 0.4,
        metalness: 0.1
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    whaleGroup.add(body);

    // Tail
    const tailGroup = new THREE.Group();
    tailGroup.position.z = -7;

    const tailPeduncleGeometry = new THREE.ConeGeometry(2, 4, 32);
    tailPeduncleGeometry.rotateX(-Math.PI / 2);
    const tailPeduncle = new THREE.Mesh(tailPeduncleGeometry, bodyMaterial);
    tailGroup.add(tailPeduncle);

    // Flukes
    const flukeGeometry = new THREE.BoxGeometry(6, 0.5, 2);
    const fluke = new THREE.Mesh(flukeGeometry, bodyMaterial);
    fluke.position.z = -2;
    tailGroup.add(fluke);

    whaleGroup.add(tailGroup);

    // Fins
    const finGeometry = new THREE.BoxGeometry(3, 0.5, 1.5);
    const leftFin = new THREE.Mesh(finGeometry, bodyMaterial);
    leftFin.position.set(3, -1, 1);
    leftFin.rotation.z = 0.5;
    leftFin.rotation.y = 0.5;
    whaleGroup.add(leftFin);

    const rightFin = new THREE.Mesh(finGeometry, bodyMaterial);
    rightFin.position.set(-3, -1, 1);
    rightFin.rotation.z = -0.5;
    rightFin.rotation.y = -0.5;
    whaleGroup.add(rightFin);

    whaleGroup.position.set(-40, -5, -40); // Start underwater/far

    scene.add(whaleGroup);

    window.whale = {
        mesh: whaleGroup,
        tail: tailGroup,
        angle: 0,
        speed: 0.05
    };
}

// ==========================================
// PARTICLE EFFECTS
// ==========================================
function createHeartParticles() {
    // Snow particles
    const snowGeometry = new THREE.BufferGeometry();
    const snowCount = 150;
    const snowPositions = new Float32Array(snowCount * 3);
    const snowSizes = new Float32Array(snowCount);

    for (let i = 0; i < snowCount; i++) {
        snowPositions[i * 3] = (Math.random() - 0.5) * 100;
        snowPositions[i * 3 + 1] = Math.random() * 60;
        snowPositions[i * 3 + 2] = (Math.random() - 0.5) * 100;
        snowSizes[i] = Math.random() * 0.5 + 0.2;
    }

    snowGeometry.setAttribute('position', new THREE.BufferAttribute(snowPositions, 3));
    snowGeometry.setAttribute('size', new THREE.BufferAttribute(snowSizes, 1));

    const snowMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.4,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true
    });

    const snowSystem = new THREE.Points(snowGeometry, snowMaterial);
    snowSystem.userData.isSnow = true;
    particles.push(snowSystem);
    scene.add(snowSystem);

    // Floating petals/particles (pink)
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 50;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 80;
        positions[i + 1] = Math.random() * 40 + 5;
        positions[i + 2] = (Math.random() - 0.5) * 80;

        // Pink/red colors
        colors[i] = 0.8 + Math.random() * 0.2;
        colors[i + 1] = 0.3 + Math.random() * 0.3;
        colors[i + 2] = 0.4 + Math.random() * 0.3;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
        size: 0.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    particles.push(particleSystem);
    scene.add(particleSystem);
}

// ==========================================
// INTERACTION SYSTEM
// ==========================================
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let interactiveObjects = [];

function setupInteraction() {
    window.addEventListener('click', onMouseClick, false);
    window.addEventListener('touchstart', onTouchStart, false); // Mobile support
}

function onTouchStart(event) {
    if (event.touches.length > 0) {
        event.clientX = event.touches[0].clientX;
        event.clientY = event.touches[0].clientY;
        onMouseClick(event);
    }
}

function onMouseClick(event) {
    // Start music on first interaction
    if (window.startBackgroundMusic) window.startBackgroundMusic();

    // Calculate mouse position in normalized device coordinates (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(interactiveObjects, true);

    if (intersects.length > 0) {
        // Find the first object that has a letter ID or is part of a group that does
        let object = intersects[0].object;
        let targetLetterId = null;

        // Traverse up to find the group/mesh with userData
        while (object) {
            if (object.userData && object.userData.letterId) {
                targetLetterId = object.userData.letterId;
                break;
            }
            object = object.parent;
        }

        if (targetLetterId) {
            // Find index
            const index = window.letters.findIndex(l => l.id === targetLetterId);
            if (index !== -1) {
                window.showLetter(index);
            }
        }
    }
}

// Helper to make an object interactive
function makeInteractive(object, letterId) {
    object.userData.letterId = letterId;
    object.userData.isInteractive = true;
    object.userData.baseScale = object.scale.clone();
    interactiveObjects.push(object);
}


// ==========================================
// ANIMATION LOOP
// ==========================================
function animate() {
    requestAnimationFrame(animate);

    if (!sceneReady) return;

    const time = clock.getElapsedTime();

    // Update water
    if (water) {
        water.material.uniforms.uTime.value = time * 0.5;
    }

    // Animate flowers (gentle sway)
    flowers.forEach((flower, i) => {
        flower.rotation.z = Math.sin(time + i) * 0.1;
    });

    // Animate photo snow bubbles (floating down like snow)
    photoFrames.forEach((photo) => {
        // Gentle falling motion
        photo.mesh.position.y -= photo.fallSpeed;

        // Sway side to side like snow
        photo.mesh.position.x += Math.sin(time * 0.5 + photo.phase) * 0.02 + photo.driftX;
        photo.mesh.position.z += Math.cos(time * 0.3 + photo.phase) * 0.02 + photo.driftZ;

        // Gentle rotation
        photo.mesh.rotation.y += photo.rotationSpeed;
        photo.mesh.rotation.x = Math.sin(time * 0.5 + photo.phase) * 0.1;

        // Reset to top when bubble falls too low
        if (photo.mesh.position.y < 5) {
            photo.mesh.position.y = 40 + Math.random() * 15;
            photo.mesh.position.x = (Math.random() - 0.5) * 60;
            photo.mesh.position.z = (Math.random() - 0.5) * 60;
        }
    });

    // Animate Pacman
    if (pacman) {
        pacman.angle += 0.005;
        const pacRadius = 15;
        pacman.mesh.position.x = Math.cos(pacman.angle) * pacRadius;
        pacman.mesh.position.z = Math.sin(pacman.angle) * pacRadius;

        // Face direction of movement
        pacman.mesh.rotation.y = -pacman.angle + Math.PI / 2;

        // Mouth animation
        pacman.mouthOpen = (Math.sin(time * 8) + 1) / 2;
    }

    // Animate hearts
    hearts.forEach((heart) => {
        heart.mesh.position.y = heart.baseY + Math.sin(time * 2 + heart.phase) * 0.5;
        heart.mesh.rotation.y = time + heart.phase;
        heart.mesh.rotation.z = Math.sin(time + heart.phase) * 0.2;
    });

    // Animate particles (snow and petals)
    particles.forEach((p, pIndex) => {
        const positions = p.geometry.attributes.position.array;
        const isSnow = p.userData.isSnow;

        for (let i = 0; i < positions.length; i += 3) {
            // Fall down
            positions[i + 1] -= isSnow ? 0.05 : 0.02;

            // Sway side to side (snow sways more)
            if (isSnow) {
                positions[i] += Math.sin(time * 2 + i * 0.1) * 0.02;
                positions[i + 2] += Math.cos(time * 1.5 + i * 0.1) * 0.02;
            }

            // Reset when too low
            if (positions[i + 1] < 0) {
                positions[i + 1] = 50 + Math.random() * 10;
                positions[i] = (Math.random() - 0.5) * 100;
                positions[i + 2] = (Math.random() - 0.5) * 100;
            }
        }
        p.geometry.attributes.position.needsUpdate = true;
    });

    // Animate heart between characters
    if (characters && characters.children[2]) {
        characters.children[2].scale.setScalar(0.4 + Math.sin(time * 2) * 0.05);
    }

    // Animate Bottle
    if (window.bottle) {
        window.bottle.position.y = Math.sin(time * 1.5) * 0.5 - 0.5;
        window.bottle.rotation.x = Math.PI / 4 + Math.sin(time) * 0.1;
        window.bottle.rotation.z = Math.PI / 6 + Math.cos(time * 0.8) * 0.1;
    }

    // Animate Whale
    if (window.whale) {
        const w = window.whale;
        // Circular path far out
        w.angle += 0.002;
        const radius = 80;
        w.mesh.position.x = Math.sin(w.angle) * radius;
        w.mesh.position.z = Math.cos(w.angle) * radius;
        w.mesh.rotation.y = w.angle + Math.PI;

        // Bobbing (breaching slightly)
        w.mesh.position.y = -2 + Math.sin(time * 0.5) * 4;

        // Tail animation
        w.tail.rotation.x = Math.sin(time * 2) * 0.2;
    }

    controls.update();
    renderer.render(scene, camera);
}

function triggerFinale() {
    // Launch fireworks
    const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff];
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createFirework(
                (Math.random() - 0.5) * 100,
                20 + Math.random() * 40,
                (Math.random() - 0.5) * 100,
                colors[Math.floor(Math.random() * colors.length)]
            );
        }, i * 100);
    }

    // Show final huge message
    const msg = document.getElementById('love-message');
    msg.innerHTML = '<h1>Happy Valentine\'s Day<br>My Love</h1><p>You are my everything.</p>';
    msg.classList.remove('hidden');
    msg.classList.add('show');
}

function createFirework(x, y, z, color) {
    const geometry = new THREE.BufferGeometry();
    const count = 100;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const r = Math.random() * 2; // blast radius
        positions[i] = r * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = r * Math.cos(phi);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ size: 0.5, color: color });
    const points = new THREE.Points(geometry, material);
    points.position.set(x, y, z);
    scene.add(points);

    // Simple explosion animation cleanup
    let scale = 1;
    const interval = setInterval(() => {
        scale += 0.1;
        points.scale.setScalar(scale);
        material.opacity -= 0.02;
        if (material.opacity <= 0) {
            clearInterval(interval);
            scene.remove(points);
        }
    }, 50);
}

// ==========================================
// UTILITIES
// ==========================================
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// ==========================================
// INITIALIZE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initScene();
    initLoadingScreen();
    animate();
});
