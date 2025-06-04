// Cinematic 3D Electric Charge Visualization
// Enhanced with accurate physics calculations

class CinematicCharge3D {
    
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
        });
        
        this.charges = [];
        this.fieldLines = [];
        this.particles = [];
        this.forceVectors = [];
        this.time = 0;
        this.clock = new THREE.Clock();
        this.currentSection = 0;
        
        // Physics constants (scaled for visualization)
        this.k = 8.99e9; // Coulomb's constant (scaled)
        this.scaleFactor = 1e5; // Scale factor for visualization
        
        this.init();
        this.createScene();
        this.setupSection(0);
        this.animate();
    }
    
    init() {
        // Enhanced renderer setup
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.setClearColor(0x000511, 1);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // Find canvas container and replace it
        const canvasContainer = document.getElementById('visualization-background');
        const existingCanvas = document.getElementById('charge-canvas');
        
        if (canvasContainer) {
            if (existingCanvas) {
                canvasContainer.removeChild(existingCanvas);
            }
            canvasContainer.appendChild(this.renderer.domElement);
            this.renderer.domElement.id = 'charge-canvas';
            this.renderer.domElement.className = 'fullscreen-canvas';
        } else {
            // Fallback: append to body
            document.body.appendChild(this.renderer.domElement);
            this.renderer.domElement.style.position = 'fixed';
            this.renderer.domElement.style.top = '0';
            this.renderer.domElement.style.left = '0';
            this.renderer.domElement.style.zIndex = '1';
            this.renderer.domElement.style.pointerEvents = 'none';
        }
        
        // Dynamic camera positioning
        this.camera.position.set(0, 5, 15);
        this.camera.lookAt(0, 0, 0);
        
        // Responsive handling
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }
    
    createScene() {
        // Enhanced lighting setup
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        this.scene.add(ambientLight);
        
        // Main directional light
        const directionalLight = new THREE.DirectionalLight(0x4a9eff, 1.5);
        directionalLight.position.set(10, 10, 10);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);
        
        // Cinematic rim lighting
        const rimLight = new THREE.DirectionalLight(0xffffff, 0.5);
        rimLight.position.set(-10, 5, -10);
        this.scene.add(rimLight);
        
        // Particle system for atmosphere
        this.createAtmosphericParticles();
    }
    
    createAtmosphericParticles() {
        const particleCount = 200;
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
            
            velocities[i * 3] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
        }
        
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const material = new THREE.PointsMaterial({
            color: 0x4a9eff,
            size: 0.1,
            opacity: 0.3,
            transparent: true,
            blending: THREE.AdditiveBlending
        });
        
        this.atmosphericParticles = new THREE.Points(geometry, material);
        this.atmosphericParticles.userData.velocities = velocities;
        this.scene.add(this.atmosphericParticles);
    }
    
    // ===== SECTION SETUP METHODS =====
    
    setupSection(sectionIndex) {
        this.clearScene();
        this.currentSection = sectionIndex;
        
        switch(sectionIndex) {
            case 0: this.createIntroSection(); break;
            case 1: this.createNatureSection(); break;
            case 2: this.createRepulsionSection(); break;
            case 3: this.createAttractionSection(); break;
            case 4: this.createMagnitudeSection(); break;
            case 5: this.createDistanceSection(); break;
            case 6: this.createFieldSection(); break;
            case 7: this.createUniversalSection(); break;
        }
        
        // Camera animation for each section
        this.animateCamera(sectionIndex);
    }
    
    createIntroSection() {
        // Single glowing charge in the center
        const charge = this.createEnhancedCharge({
            position: [0, 0, 0],
            charge: 5e-6,
            size: 2.0,
            color: 0xff4444,
            label: "+5μC",
            glow: true,
            pulse: true
        });
        
        this.charges = [charge];
        
        // Create subtle electric field visualization
        this.createRadialField(charge, 0xff4444, 0.2);
    }
    
    createNatureSection() {
        // Show positive and negative charges side by side
        const positiveCharge = this.createEnhancedCharge({
            position: [-4, 0, 0],
            charge: 3e-6,
            size: 1.8,
            color: 0xff4444,
            label: "+3μC",
            glow: true
        });
        
        const negativeCharge = this.createEnhancedCharge({
            position: [4, 0, 0],
            charge: -3e-6,
            size: 1.8,
            color: 0x4488ff,
            label: "-3μC",
            glow: true
        });
        
        this.charges = [positiveCharge, negativeCharge];
        
        // Create individual field patterns
        this.createRadialField(positiveCharge, 0xff4444, 0.15);
        this.createRadialField(negativeCharge, 0x4488ff, 0.15);
    }
    
    createRepulsionSection() {
        // Two positive charges with physics-accurate repulsion
        const charge1 = this.createEnhancedCharge({
            position: [-2, 0, 0],
            charge: 2e-6,
            size: 1.5,
            color: 0xff4444,
            label: "+2μC",
            glow: true
        });
        
        const charge2 = this.createEnhancedCharge({
            position: [2, 0, 0],
            charge: 2e-6,
            size: 1.5,
            color: 0xff4444,
            label: "+2μC",
            glow: true
        });
        
        this.charges = [charge1, charge2];
        
        // Calculate actual repulsive force
        const force = this.calculateCoulombForce(charge1, charge2);
        
        // Create accurate force vectors
        this.createAccurateForceVectors(charge1, charge2, force);
        
        // Create physics-accurate field lines
        this.createAccurateRepulsionField();
        
        // Accurate repulsion animation
        charge1.userData.repelAnimation = true;
        charge2.userData.repelAnimation = true;
        charge1.userData.equilibriumDistance = 4; // meters (scaled)
        charge2.userData.equilibriumDistance = 4;
    }
    
    createAttractionSection() {
        // Positive and negative charges with accurate attraction
        const charge1 = this.createEnhancedCharge({
            position: [-3, 0, 0],
            charge: 3e-6,
            size: 1.6,
            color: 0xff4444,
            label: "+3μC",
            glow: true
        });
        
        const charge2 = this.createEnhancedCharge({
            position: [3, 0, 0],
            charge: -2e-6,
            size: 1.4,
            color: 0x4488ff,
            label: "-2μC",
            glow: true
        });
        
        this.charges = [charge1, charge2];
        
        // Calculate actual attractive force
        const force = this.calculateCoulombForce(charge1, charge2);
        
        // Create accurate force vectors
        this.createAccurateForceVectors(charge1, charge2, force);
        
        // Create physics-accurate attraction field
        this.createAccurateAttractionField();
        
        // Accurate attraction animation
        charge1.userData.attractAnimation = true;
        charge2.userData.attractAnimation = true;
        charge1.userData.equilibriumDistance = 2; // Closer due to attraction
        charge2.userData.equilibriumDistance = 2;
    }
    
    createMagnitudeSection() {
        // Three charges with accurate magnitude relationships
        const charges = [
            { pos: [-6, 0, 0], charge: 1e-6, size: 1.0, label: "+1μC" },
            { pos: [0, 0, 0], charge: 3e-6, size: 1.8, label: "+3μC" },
            { pos: [6, 0, 0], charge: 6e-6, size: 2.4, label: "+6μC" }
        ];
        
        this.charges = charges.map(c => this.createEnhancedCharge({
            position: c.pos,
            charge: c.charge,
            size: c.size,
            color: 0xff4444,
            label: c.label,
            glow: true,
            pulse: true
        }));
        
        // Show accurate field strength visualization
        this.charges.forEach((charge, index) => {
            const chargeValue = Math.abs(charge.userData.charge);
            const fieldStrength = chargeValue * 1e6; // Convert to appropriate scale
            
            // Create field lines proportional to charge magnitude
            const numLines = Math.floor(8 + fieldStrength * 4);
            this.createProportionalRadialField(charge, 0xff4444, fieldStrength * 0.02, numLines);
            
            // Add magnitude indicators
            this.addMagnitudeIndicator(charge, fieldStrength);
        });
    }
    
    createDistanceSection() {
        // Two charges demonstrating inverse square law
        const charge1 = this.createEnhancedCharge({
            position: [-1, 0, 0],
            charge: 2e-6,
            size: 1.5,
            color: 0xff4444,
            label: "+2μC",
            glow: true
        });
        
        const charge2 = this.createEnhancedCharge({
            position: [1, 0, 0],
            charge: 2e-6,
            size: 1.5,
            color: 0xff4444,
            label: "+2μC",
            glow: true
        });
        
        this.charges = [charge1, charge2];
        
        // Animated distance oscillation with accurate force calculation
        charge2.userData.distanceAnimation = true;
        charge2.userData.basePosition = [1, 0, 0];
        
        // Create dynamic force visualization with actual calculations
        this.createDynamicForceVisualization();
        
        // Real-time distance and force display
        this.createAccurateDistanceIndicator();
    }
    
    createFieldSection() {
        // Central charge with comprehensive field visualization
        const centralCharge = this.createEnhancedCharge({
            position: [0, 0, 0],
            charge: 4e-6,
            size: 2.0,
            color: 0xff4444,
            label: "+4μC",
            glow: true,
            pulse: true
        });
        
        this.charges = [centralCharge];
        
        // Comprehensive 3D field lines
        this.create3DElectricField(centralCharge);
        
        // Test charges moving in the field
        this.createTestCharges();
    }
    
    createUniversalSection() {
        // Complex multi-charge system
        const positions = [
            [0, 3, 0], [4, -2, 0], [-4, -2, 0], [0, -4, 0], [3, 1, 2], [-3, 1, -2]
        ];
        const chargeValues = [4e-6, -2e-6, -2e-6, 3e-6, 1e-6, -1e-6];
        const colors = [0xff4444, 0x4488ff, 0x4488ff, 0xff4444, 0xff4444, 0x4488ff];
        const labels = ["+4μC", "-2μC", "-2μC", "+3μC", "+1μC", "-1μC"];
        
        this.charges = positions.map((pos, i) => this.createEnhancedCharge({
            position: pos,
            charge: chargeValues[i],
            size: Math.abs(chargeValues[i]) * 1e6 * 0.3 + 0.8,
            color: colors[i],
            label: labels[i],
            glow: true
        }));
        
        // Complex field interactions
        this.createComplexFieldSystem();
        
        // Gentle orbital motion
        this.charges.forEach((charge, i) => {
            charge.userData.orbitalMotion = true;
            charge.userData.orbitRadius = 0.5;
            charge.userData.orbitSpeed = 0.2 + i * 0.1;
        });
    }
    
    // ===== ENHANCED CHARGE CREATION =====
    
    createEnhancedCharge(config) {
        const group = new THREE.Group();
        
        // Core sphere with enhanced materials
        const geometry = new THREE.SphereGeometry(config.size, 64, 64);
        const material = new THREE.MeshPhongMaterial({
            color: config.color,
            shininess: 100,
            transparent: true,
            opacity: 0.9,
            emissive: config.color,
            emissiveIntensity: 0.1
        });
        
        const sphere = new THREE.Mesh(geometry, material);
        sphere.castShadow = true;
        sphere.receiveShadow = true;
        group.add(sphere);
        
        if (config.glow) {
            // Multi-layer glow effect
            for (let i = 1; i <= 3; i++) {
                const glowGeometry = new THREE.SphereGeometry(config.size * (1 + i * 0.3), 32, 32);
                const glowMaterial = new THREE.MeshBasicMaterial({
                    color: config.color,
                    transparent: true,
                    opacity: 0.1 / i,
                    blending: THREE.AdditiveBlending
                });
                const glow = new THREE.Mesh(glowGeometry, glowMaterial);
                group.add(glow);
            }
        }
        
        // Enhanced charge symbol
        if (config.label) {
            this.addChargeLabel(group, config.label, config.size);
        }
        
        // Position and store data
        group.position.set(...config.position);
        group.userData = { 
            ...config, 
            sphere, 
            basePosition: [...config.position],
            originalSize: config.size
        };
        
        this.scene.add(group);
        return group;
    }
    
    addChargeLabel(group, label, size) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 128;
        
        context.fillStyle = 'rgba(255, 255, 255, 0.9)';
        context.font = 'bold 48px Arial';
        context.textAlign = 'center';
        context.fillText(label, 128, 80);
        
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(size * 2, size, 1);
        sprite.position.set(0, size + 1, 0);
        
        group.add(sprite);
    }
    
    // ===== FIELD VISUALIZATION METHODS =====
    
    createRadialField(charge, color, intensity) {
        const fieldLines = [];
        const numLines = 24;
        
        for (let i = 0; i < numLines; i++) {
            const angle = (i / numLines) * Math.PI * 2;
            const points = [];
            
            for (let j = 1; j <= 20; j++) {
                const distance = j * 0.5;
                const x = charge.position.x + Math.cos(angle) * distance;
                const y = charge.position.y + Math.sin(angle) * distance * 0.5;
                const z = charge.position.z + Math.sin(angle * 2) * distance * 0.2;
                
                points.push(new THREE.Vector3(x, y, z));
            }
            
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
                color: color,
                opacity: intensity,
                transparent: true,
                blending: THREE.AdditiveBlending
            });
            
            const line = new THREE.Line(geometry, material);
            this.scene.add(line);
            fieldLines.push(line);
        }
        
        this.fieldLines.push(...fieldLines);
    }
    
    createForceVectors(charge1, charge2, type) {
        const direction = charge1.position.clone().sub(charge2.position).normalize();
        const color = type === 'repel' ? 0xff4444 : 0x44ff44;
        const length = 3;
        
        // Enhanced arrow geometry
        const arrowGeometry = new THREE.ConeGeometry(0.3, 1, 12);
        const shaftGeometry = new THREE.CylinderGeometry(0.1, 0.1, length, 12);
        
        const material = new THREE.MeshPhongMaterial({ 
            color: color,
            emissive: color,
            emissiveIntensity: 0.2
        });
        
        // Create arrows for both charges
        [charge1, charge2].forEach((charge, index) => {
            const arrowGroup = new THREE.Group();
            
            const shaft = new THREE.Mesh(shaftGeometry, material);
            const arrow = new THREE.Mesh(arrowGeometry, material);
            
            arrow.position.y = length / 2 + 0.5;
            arrowGroup.add(shaft);
            arrowGroup.add(arrow);
            
            arrowGroup.position.copy(charge.position);
            
            if (type === 'repel') {
                arrowGroup.lookAt(charge.position.clone().add(direction.clone().multiplyScalar(index === 0 ? 1 : -1)));
            } else {
                arrowGroup.lookAt(charge.position.clone().add(direction.clone().multiplyScalar(index === 0 ? -1 : 1)));
            }
            
            this.scene.add(arrowGroup);
            this.forceVectors.push(arrowGroup);
        });
    }
    
    createRepulsionField() {
        if (this.charges.length < 2) return;
        
        const charge1 = this.charges[0];
        const charge2 = this.charges[1];
        
        // Create field lines showing repulsion pattern
        for (let i = 0; i < 16; i++) {
            const angle = (i / 16) * Math.PI * 2;
            const points = [];
            
            // Create curved lines that bend away from each other
            for (let j = 0; j <= 20; j++) {
                const t = j / 20;
                const baseX = Math.cos(angle) * (2 + t * 8);
                const baseY = Math.sin(angle) * (2 + t * 8);
                
                // Apply repulsion curvature
                const repelFactor = 1 + t * 2;
                const x = baseX * repelFactor;
                const y = baseY * repelFactor;
                const z = Math.sin(t * Math.PI * 2) * 0.5;
                
                points.push(new THREE.Vector3(x, y, z));
            }
            
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
                color: 0xff6666,
                opacity: 0.4,
                transparent: true,
                blending: THREE.AdditiveBlending
            });
            
            const line = new THREE.Line(geometry, material);
            this.scene.add(line);
            this.fieldLines.push(line);
        }
    }
    
    createAttractionField() {
        if (this.charges.length < 2) return;
        
        const charge1 = this.charges[0];
        const charge2 = this.charges[1];
        
        // Create beautiful curved field lines connecting the charges
        for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * Math.PI * 2;
            const points = [];
            
            // Create field lines that curve between charges
            for (let j = 0; j <= 30; j++) {
                const t = j / 30;
                
                // Interpolate between charges with attractive curvature
                const startPos = charge1.position;
                const endPos = charge2.position;
                
                const x = startPos.x + (endPos.x - startPos.x) * t;
                const y = startPos.y + (endPos.y - startPos.y) * t + Math.sin(t * Math.PI) * 2;
                const z = Math.sin(angle + t * Math.PI) * 0.8;
                
                points.push(new THREE.Vector3(x, y, z));
            }
            
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
                color: 0x66ff66,
                opacity: 0.5,
                transparent: true,
                blending: THREE.AdditiveBlending
            });
            
            const line = new THREE.Line(geometry, material);
            this.scene.add(line);
            this.fieldLines.push(line);
        }
    }
    
    create3DElectricField(centralCharge) {
        // Create comprehensive 3D field visualization
        const numLines = 36;
        const numLayers = 6;
        
        for (let layer = 0; layer < numLayers; layer++) {
            for (let i = 0; i < numLines; i++) {
                const phi = (i / numLines) * Math.PI * 2;
                const theta = (layer / numLayers) * Math.PI;
                
                const points = [];
                
                for (let j = 1; j <= 25; j++) {
                    const distance = j * 0.4;
                    const x = centralCharge.position.x + Math.sin(theta) * Math.cos(phi) * distance;
                    const y = centralCharge.position.y + Math.cos(theta) * distance;
                    const z = centralCharge.position.z + Math.sin(theta) * Math.sin(phi) * distance;
                    
                    points.push(new THREE.Vector3(x, y, z));
                }
                
                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                const material = new THREE.LineBasicMaterial({
                    color: 0x4a9eff,
                    opacity: 0.2,
                    transparent: true,
                    blending: THREE.AdditiveBlending
                });
                
                const line = new THREE.Line(geometry, material);
                this.scene.add(line);
                this.fieldLines.push(line);
            }
        }
    }
    
    createTestCharges() {
        // Small test charges that move in the field
        const testChargePositions = [
            [5, 0, 0], [-5, 0, 0], [0, 5, 0], [0, -5, 0]
        ];
        
        testChargePositions.forEach((pos, index) => {
            const testCharge = this.createEnhancedCharge({
                position: pos,
                charge: 0.5e-6,
                size: 0.3,
                color: 0xffffff,
                label: "",
                glow: true
            });
            
            testCharge.userData.isTestCharge = true;
            testCharge.userData.orbitSpeed = 0.5 + index * 0.1;
            testCharge.userData.orbitRadius = 2;
            
            this.charges.push(testCharge);
        });
    }
    
    createComplexFieldSystem() {
        // Create field interactions between multiple charges
        if (this.charges.length < 3) return;
        
        // Create field lines between each pair of charges
        for (let i = 0; i < this.charges.length; i++) {
            for (let j = i + 1; j < this.charges.length; j++) {
                const charge1 = this.charges[i];
                const charge2 = this.charges[j];
                
                const isAttraction = (charge1.userData.charge * charge2.userData.charge) < 0;
                const color = isAttraction ? 0x66ff66 : 0xff6666;
                
                // Create connection lines
                const points = [];
                for (let k = 0; k <= 20; k++) {
                    const t = k / 20;
                    const x = charge1.position.x + (charge2.position.x - charge1.position.x) * t;
                    const y = charge1.position.y + (charge2.position.y - charge1.position.y) * t;
                    const z = charge1.position.z + (charge2.position.z - charge1.position.z) * t;
                    
                    // Add some curvature
                    const curvature = Math.sin(t * Math.PI) * (isAttraction ? -0.5 : 0.5);
                    points.push(new THREE.Vector3(x, y + curvature, z));
                }
                
                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                const material = new THREE.LineBasicMaterial({
                    color: color,
                    opacity: 0.3,
                    transparent: true,
                    blending: THREE.AdditiveBlending
                });
                
                const line = new THREE.Line(geometry, material);
                this.scene.add(line);
                this.fieldLines.push(line);
            }
        }
    }
    
    createDynamicForceVisualization() {
        // Create dynamic force arrows that change with distance
        this.dynamicForceArrows = [];
        
        if (this.charges.length >= 2) {
            const charge1 = this.charges[0];
            const charge2 = this.charges[1];
            
            // Create force magnitude indicators
            const forceDisplay = this.createForceDisplay();
            this.scene.add(forceDisplay);
            this.dynamicForceArrows.push(forceDisplay);
        }
    }
    
    createForceDisplay() {
        const group = new THREE.Group();
        
        // Create text display for force magnitude
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 512;
        canvas.height = 256;
        
        context.fillStyle = 'rgba(255, 255, 255, 0.9)';
        context.font = 'bold 32px Arial';
        context.textAlign = 'center';
        context.fillText('F = k(q₁q₂)/r²', 256, 128);
        
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(8, 4, 1);
        sprite.position.set(0, 6, 0);
        
        group.add(sprite);
        return group;
    }
    
    createProportionalRadialField(charge, color, intensity, numLines) {
        const fieldLines = [];
        
        for (let i = 0; i < numLines; i++) {
            const angle = (i / numLines) * Math.PI * 2;
            const points = [];
            
            // Start from charge surface
            const startRadius = charge.userData.size * 1.2;
            const startX = charge.position.x + Math.cos(angle) * startRadius;
            const startY = charge.position.y + Math.sin(angle) * startRadius;
            const startZ = charge.position.z;
            
            // Trace field line with accurate electric field calculation
            let currentPos = new THREE.Vector3(startX, startY, startZ);
            points.push(currentPos.clone());
            
            for (let j = 1; j <= 25; j++) {
                const field = this.calculateElectricField(currentPos);
                if (field.length() < 0.001) break;
                
                // Step size inversely proportional to field strength (more detail near charge)
                const stepSize = 0.3 / (1 + field.length() * 0.01);
                field.normalize().multiplyScalar(stepSize);
                
                currentPos.add(field);
                points.push(currentPos.clone());
                
                if (currentPos.distanceTo(charge.position) > 8) break;
            }
            
            if (points.length > 1) {
                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                const material = new THREE.LineBasicMaterial({
                    color: color,
                    opacity: intensity,
                    transparent: true,
                    linewidth: 2
                });
                
                const line = new THREE.Line(geometry, material);
                this.scene.add(line);
                fieldLines.push(line);
            }
        }
        
        this.fieldLines.push(...fieldLines);
    }
    
    addMagnitudeIndicator(charge, magnitude) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 128;
        
        context.fillStyle = 'rgba(255, 255, 255, 0.9)';
        context.font = 'bold 20px Arial';
        context.textAlign = 'center';
        context.fillText(`Q = ${magnitude}μC`, 128, 40);
        context.fillText(`E ∝ Q`, 128, 70);
        context.fillText(`F ∝ Q₁Q₂`, 128, 100);
        
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(3, 1.5, 1);
        sprite.position.set(0, charge.userData.size + 2, 0);
        
        charge.add(sprite);
    }
    
    createAccurateDistanceIndicator() {
        // Create dynamic distance measurement with force calculation
        const group = new THREE.Group();
        
        // Distance line that updates in real-time
        const lineGeometry = new THREE.BufferGeometry();
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            opacity: 0.8,
            transparent: true,
            linewidth: 3
        });
        
        const line = new THREE.Line(lineGeometry, lineMaterial);
        group.add(line);
        
        // Dynamic information display
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 512;
        canvas.height = 256;
        
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(8, 4, 1);
        sprite.position.set(0, -4, 0);
        
        group.add(sprite);
        
        this.scene.add(group);
        this.distanceIndicator = group;
        this.distanceIndicatorSprite = sprite;
        this.distanceIndicatorLine = line;
    }
    
    // Update distance indicator with real-time calculations
    updateDistanceIndicator() {
        if (this.charges.length >= 2 && this.distanceIndicator) {
            const charge1 = this.charges[0];
            const charge2 = this.charges[1];
            const distance = charge1.position.distanceTo(charge2.position);
            
            // Update line geometry
            const points = [charge1.position.clone(), charge2.position.clone()];
            this.distanceIndicatorLine.geometry.setFromPoints(points);
            
            // Calculate actual force
            const force = this.calculateCoulombForce(charge1, charge2);
            const forceMagnitude = force.length();
            
            // Update text display with real physics
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 512;
            canvas.height = 256;
            
            context.fillStyle = 'rgba(0, 0, 0, 0.8)';
            context.fillRect(0, 0, 512, 256);
            
            context.fillStyle = 'rgba(255, 255, 255, 0.9)';
            context.font = 'bold 24px Arial';
            context.textAlign = 'center';
            
            context.fillText(`Distance: r = ${distance.toFixed(2)} m`, 256, 50);
            context.fillText(`Force: F = k(q₁q₂)/r²`, 256, 90);
            context.fillText(`F = ${forceMagnitude.toExponential(2)} N`, 256, 130);
            context.fillText(`1/r² = 1/${(distance*distance).toFixed(2)} = ${(1/(distance*distance)).toFixed(3)}`, 256, 170);
            context.fillText(`Force scales as 1/r²`, 256, 210);
            
            const texture = new THREE.CanvasTexture(canvas);
            this.distanceIndicatorSprite.material.map = texture;
            this.distanceIndicatorSprite.material.needsUpdate = true;
        }
    }
    
    // ===== ANIMATION METHODS =====
    
    animateCamera(sectionIndex) {
        const targetPositions = [
            [0, 5, 15],   // Intro - front view
            [8, 3, 12],   // Nature - angled view
            [0, 8, 18],   // Repulsion - high angle
            [0, 3, 12],   // Attraction - close view
            [0, 10, 20],  // Magnitude - overview
            [12, 5, 15],  // Distance - side view
            [0, 15, 25],  // Field - high overview
            [15, 10, 20]  // Universal - dramatic angle
        ];
        
        const target = targetPositions[sectionIndex] || [0, 5, 15];
        
        // Smooth camera transition
        const startPos = this.camera.position.clone();
        const endPos = new THREE.Vector3(...target);
        
        let progress = 0;
        const animateStep = () => {
            progress += 0.02;
            if (progress <= 1) {
                this.camera.position.lerpVectors(startPos, endPos, this.easeInOutCubic(progress));
                this.camera.lookAt(0, 0, 0);
                requestAnimationFrame(animateStep);
            }
        };
        animateStep();
    }
    
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    // ===== MAIN ANIMATION LOOP =====
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        this.time = this.clock.getElapsedTime();
        
        // Update charges with physics-accurate calculations
        this.updateCharges();
        
        // Update atmospheric particles
        this.updateAtmosphericParticles();
        
        // Update field effects with physics accuracy
        this.updateFieldEffects();
        
        // Update distance indicator for distance section
        if (this.currentSection === 5) {
            this.updateDistanceIndicator();
        }
        
        // Gentle camera sway (reduced for better observation of physics)
        this.camera.position.x += Math.sin(this.time * 0.05) * 0.005;
        this.camera.position.y += Math.cos(this.time * 0.075) * 0.0025;
        this.camera.lookAt(0, 0, 0);
        
        this.renderer.render(this.scene, this.camera);
    }
    
    updateCharges() {
        this.charges.forEach((charge, index) => {
            // Pulse effect based on charge magnitude
            if (charge.userData.pulse) {
                const chargeRatio = Math.abs(charge.userData.charge) / 5e-6; // Normalize to max charge
                const scale = 1 + 0.1 * chargeRatio * Math.sin(this.time * 2 + index);
                charge.userData.sphere.scale.setScalar(scale);
            }
            
            // Physics-accurate repulsion animation
            if (charge.userData.repelAnimation) {
                const otherCharges = this.charges.filter(c => c !== charge);
                let totalForce = new THREE.Vector3(0, 0, 0);
                
                otherCharges.forEach(otherCharge => {
                    const force = this.calculateCoulombForce(charge, otherCharge);
                    const direction = charge.position.clone().sub(otherCharge.position).normalize();
                    totalForce.add(direction.multiplyScalar(force.length()));
                });
                
                // Apply realistic motion with damping
                const damping = 0.95;
                const maxDisplacement = 1.5;
                
                if (!charge.userData.velocity) charge.userData.velocity = new THREE.Vector3(0, 0, 0);
                
                charge.userData.velocity.add(totalForce.multiplyScalar(0.001));
                charge.userData.velocity.multiplyScalar(damping);
                
                const displacement = charge.userData.velocity.clone().multiplyScalar(0.016); // 60fps
                displacement.clampLength(0, maxDisplacement * 0.016);
                
                charge.position.add(displacement);
                
                // Keep charges within bounds
                const maxDistance = 4;
                charge.position.clampLength(0, maxDistance);
            }
            
            // Physics-accurate attraction animation
            if (charge.userData.attractAnimation) {
                const otherCharges = this.charges.filter(c => c !== charge);
                let totalForce = new THREE.Vector3(0, 0, 0);
                
                otherCharges.forEach(otherCharge => {
                    const force = this.calculateCoulombForce(charge, otherCharge);
                    const direction = otherCharge.position.clone().sub(charge.position).normalize();
                    
                    // For opposite charges, force is attractive
                    if (charge.userData.charge * otherCharge.userData.charge < 0) {
                        totalForce.add(direction.multiplyScalar(force.length()));
                    }
                });
                
                // Apply realistic motion with damping
                const damping = 0.98; // Less damping for smoother attraction
                const maxDisplacement = 0.8;
                
                if (!charge.userData.velocity) charge.userData.velocity = new THREE.Vector3(0, 0, 0);
                
                charge.userData.velocity.add(totalForce.multiplyScalar(0.0005));
                charge.userData.velocity.multiplyScalar(damping);
                
                const displacement = charge.userData.velocity.clone().multiplyScalar(0.016);
                displacement.clampLength(0, maxDisplacement * 0.016);
                
                charge.position.add(displacement);
                
                // Prevent charges from getting too close (collision detection)
                otherCharges.forEach(otherCharge => {
                    const distance = charge.position.distanceTo(otherCharge.position);
                    const minDistance = 0.8; // Minimum separation
                    
                    if (distance < minDistance) {
                        const pushDirection = charge.position.clone().sub(otherCharge.position).normalize();
                        const pushDistance = (minDistance - distance) * 0.5;
                        charge.position.add(pushDirection.multiplyScalar(pushDistance));
                    }
                });
            }
            
            // Accurate distance animation showing inverse square law
            if (charge.userData.distanceAnimation) {
                const baseDistance = 1;
                const maxDistance = 5;
                const oscillation = Math.sin(this.time * 0.4); // Slower, more observable
                const distance = baseDistance + (maxDistance - baseDistance) * (oscillation + 1) / 2;
                
                charge.position.x = distance;
                
                // Update force display based on actual distance
                this.updateForceDisplay(distance);
            }
            
            // Accurate orbital motion based on electrostatic equilibrium
            if (charge.userData.orbitalMotion) {
                const radius = charge.userData.orbitRadius || 0.5;
                const speed = charge.userData.orbitSpeed || 0.2;
                
                // Calculate orbital velocity based on electrostatic force balance
                const centralForce = this.calculateOrbitalVelocity(charge, radius);
                const adjustedSpeed = speed * centralForce;
                
                charge.position.x = charge.userData.basePosition[0] + Math.cos(this.time * adjustedSpeed) * radius;
                charge.position.z = charge.userData.basePosition[2] + Math.sin(this.time * adjustedSpeed) * radius;
            }
            
            // Update charge glow based on field strength
            this.updateChargeGlow(charge);
        });
        
        // Update field lines dynamically
        this.updateDynamicFieldLines();
    }
    
    calculateOrbitalVelocity(charge, radius) {
        // Simplified calculation for orbital motion in electric field
        let totalForce = 0;
        
        this.charges.forEach(otherCharge => {
            if (otherCharge !== charge) {
                const distance = charge.position.distanceTo(otherCharge.position);
                if (distance > 0) {
                    const force = Math.abs(this.k * charge.userData.charge * otherCharge.userData.charge) / (distance * distance);
                    totalForce += force;
                }
            }
        });
        
        // Return normalized velocity factor
        return Math.sqrt(totalForce) * 0.1;
    }
    
    updateChargeGlow(charge) {
        const fieldStrength = this.calculateElectricField(charge.position).length();
        const glowIntensity = Math.min(0.5, fieldStrength * 0.0001);
        
        // Update glow layers
        charge.children.forEach((child, index) => {
            if (child.material && child.material.emissiveIntensity !== undefined) {
                child.material.emissiveIntensity = 0.1 + glowIntensity;
            }
            if (child.material && child.material.opacity !== undefined && index > 0) {
                child.material.opacity = 0.1 + glowIntensity * 0.5;
            }
        });
    }
    
    updateDynamicFieldLines() {
        // Update field line opacity based on field strength
        this.fieldLines.forEach(line => {
            if (line.material && line.material.opacity !== undefined) {
                const baseOpacity = 0.3;
                const variation = 0.2 * Math.sin(this.time * 1.5);
                line.material.opacity = baseOpacity + variation;
            }
        });
    }
    
    updateForceDisplay(distance) {
        if (this.charges.length >= 2) {
            const charge1 = this.charges[0];
            const charge2 = this.charges[1];
            
            // Calculate actual force using Coulomb's law
            const force = (this.k * Math.abs(charge1.userData.charge * charge2.userData.charge)) / (distance * distance);
            const forceScaled = force * this.scaleFactor;
            
            // Update force display
            if (this.dynamicForceArrows && this.dynamicForceArrows.length > 0) {
                const forceDisplay = this.dynamicForceArrows[0];
                const sprite = forceDisplay.children.find(child => child.isSprite);
                
                if (sprite) {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.width = 512;
                    canvas.height = 256;
                    
                    context.fillStyle = 'rgba(255, 255, 255, 0.9)';
                    context.font = 'bold 32px Arial';
                    context.textAlign = 'center';
                    context.fillText(`F = ${forceScaled.toExponential(2)} N`, 256, 100);
                    context.fillText(`r = ${distance.toFixed(2)} m`, 256, 150);
                    context.fillText(`F ∝ 1/r² = 1/${(distance*distance).toFixed(2)}`, 256, 200);
                    
                    const texture = new THREE.CanvasTexture(canvas);
                    sprite.material.map = texture;
                    sprite.material.needsUpdate = true;
                }
            }
        }
    }
    
    updateAtmosphericParticles() {
        if (this.atmosphericParticles) {
            const positions = this.atmosphericParticles.geometry.attributes.position.array;
            const velocities = this.atmosphericParticles.userData.velocities;
            
            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += velocities[i];
                positions[i + 1] += velocities[i + 1];
                positions[i + 2] += velocities[i + 2];
                
                // Wrap around boundaries
                if (Math.abs(positions[i]) > 25) velocities[i] *= -1;
                if (Math.abs(positions[i + 1]) > 25) velocities[i + 1] *= -1;
                if (Math.abs(positions[i + 2]) > 25) velocities[i + 2] *= -1;
            }
            
            this.atmosphericParticles.geometry.attributes.position.needsUpdate = true;
        }
    }
    
    updateFieldEffects() {
        // Add dynamic field line effects, particle streams, etc.
        this.fieldLines.forEach(line => {
            if (line.material.opacity) {
                line.material.opacity = 0.3 + 0.2 * Math.sin(this.time * 2);
            }
        });
    }
    
    // ===== UTILITY METHODS =====
    
    clearScene() {
        // Remove all charges
        this.charges.forEach(charge => this.scene.remove(charge));
        this.charges = [];
        
        // Remove field lines
        this.fieldLines.forEach(line => this.scene.remove(line));
        this.fieldLines = [];
        
        // Remove force vectors
        this.forceVectors.forEach(vector => this.scene.remove(vector));
        this.forceVectors = [];
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Calculate electric field at a point due to all charges
    calculateElectricField(position) {
        let field = new THREE.Vector3(0, 0, 0);
        
        this.charges.forEach(charge => {
            const chargePos = charge.position.clone();
            const r = position.clone().sub(chargePos);
            const distance = r.length();
            
            if (distance > 0.1) { // Avoid singularity
                const magnitude = (this.k * charge.userData.charge) / (distance * distance);
                const direction = r.normalize();
                field.add(direction.multiplyScalar(magnitude * this.scaleFactor));
            }
        });
        
        return field;
    }
    
    // Calculate force between two charges using Coulomb's law
    calculateCoulombForce(charge1, charge2) {
        const r = charge1.position.clone().sub(charge2.position);
        const distance = r.length();
        
        if (distance === 0) return new THREE.Vector3(0, 0, 0);
        
        const forceMagnitude = (this.k * charge1.userData.charge * charge2.userData.charge) / (distance * distance);
        const forceDirection = r.normalize();
        
        return forceDirection.multiplyScalar(forceMagnitude * this.scaleFactor);
    }

    // Accurate force vector visualization
    createAccurateForceVectors(charge1, charge2, force) {
        const forceScale = 0.001; // Scale force for visualization
        
        // Force on charge1
        const force1Direction = charge1.position.clone().sub(charge2.position).normalize();
        const force1Magnitude = force.length() * forceScale;
        this.createForceArrow(charge1.position, force1Direction, force1Magnitude, 0xff4444);
        
        // Force on charge2 (equal and opposite)
        const force2Direction = force1Direction.clone().negate();
        this.createForceArrow(charge2.position, force2Direction, force1Magnitude, 0xff4444);
    }
    
    createForceArrow(position, direction, magnitude, color) {
        const group = new THREE.Group();
        
        // Arrow shaft length proportional to force magnitude
        const shaftLength = Math.min(magnitude, 3); // Cap at 3 units
        const shaftGeometry = new THREE.CylinderGeometry(0.05, 0.05, shaftLength, 8);
        const arrowGeometry = new THREE.ConeGeometry(0.2, 0.5, 8);
        
        const material = new THREE.MeshPhongMaterial({ 
            color: color,
            emissive: color,
            emissiveIntensity: 0.3
        });
        
        const shaft = new THREE.Mesh(shaftGeometry, material);
        const arrow = new THREE.Mesh(arrowGeometry, material);
        
        shaft.position.y = shaftLength / 2;
        arrow.position.y = shaftLength + 0.25;
        
        group.add(shaft);
        group.add(arrow);
        
        // Position and orient the arrow
        group.position.copy(position);
        group.lookAt(position.clone().add(direction));
        
        this.scene.add(group);
        this.forceVectors.push(group);
        
        // Add force magnitude label
        this.addForceLabel(group, magnitude);
    }
    
    addForceLabel(arrow, magnitude) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 64;
        
        context.fillStyle = 'rgba(255, 255, 255, 0.9)';
        context.font = 'bold 24px Arial';
        context.textAlign = 'center';
        context.fillText(`F = ${(magnitude * 1000).toFixed(1)}N`, 128, 40);
        
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(2, 1, 1);
        sprite.position.set(0, 2, 0);
        
        arrow.add(sprite);
    }

    // Accurate electric field line creation
    createAccurateRepulsionField() {
        if (this.charges.length < 2) return;
        
        const charge1 = this.charges[0];
        const charge2 = this.charges[1];
        
        // Create field lines starting from each charge
        this.charges.forEach(charge => {
            for (let i = 0; i < 12; i++) {
                const angle = (i / 12) * Math.PI * 2;
                const fieldLine = this.traceFieldLine(
                    charge.position.clone().add(new THREE.Vector3(
                        Math.cos(angle) * 0.2,
                        Math.sin(angle) * 0.2,
                        0
                    )),
                    20,
                    0.1,
                    true // Repulsion - field lines diverge
                );
                
                if (fieldLine.length > 1) {
                    this.createFieldLineVisual(fieldLine, 0xff6666, 0.6);
                }
            }
        });
    }
    
    createAccurateAttractionField() {
        if (this.charges.length < 2) return;
        
        // Create field lines from positive to negative charge
        const positiveCharge = this.charges.find(c => c.userData.charge > 0);
        const negativeCharge = this.charges.find(c => c.userData.charge < 0);
        
        if (positiveCharge && negativeCharge) {
            // Field lines from positive to negative
            for (let i = 0; i < 16; i++) {
                const angle = (i / 16) * Math.PI * 2;
                const startPoint = positiveCharge.position.clone().add(new THREE.Vector3(
                    Math.cos(angle) * 0.2,
                    Math.sin(angle) * 0.2,
                    0
                ));
                
                const fieldLine = this.traceFieldLineToTarget(
                    startPoint,
                    negativeCharge.position,
                    30,
                    0.1
                );
                
                if (fieldLine.length > 1) {
                    this.createFieldLineVisual(fieldLine, 0x66ff66, 0.7);
                }
            }
        }
    }
    
    // Trace field line using accurate electric field calculation
    traceFieldLine(startPoint, maxSteps, stepSize, isRepulsion = false) {
        const points = [startPoint.clone()];
        let currentPoint = startPoint.clone();
        
        for (let step = 0; step < maxSteps; step++) {
            const field = this.calculateElectricField(currentPoint);
            
            if (field.length() < 0.001) break; // Field too weak
            
            // Normalize and scale field direction
            field.normalize().multiplyScalar(stepSize);
            
            // For repulsion, follow field direction; for attraction, it's handled differently
            currentPoint.add(field);
            points.push(currentPoint.clone());
            
            // Stop if we've moved too far
            if (currentPoint.distanceTo(startPoint) > 10) break;
        }
        
        return points;
    }
    
    // Trace field line to a target (for attraction)
    traceFieldLineToTarget(startPoint, targetPoint, maxSteps, stepSize) {
        const points = [startPoint.clone()];
        let currentPoint = startPoint.clone();
        
        for (let step = 0; step < maxSteps; step++) {
            const field = this.calculateElectricField(currentPoint);
            
            if (field.length() < 0.001) break;
            
            // Normalize and scale
            field.normalize().multiplyScalar(stepSize);
            currentPoint.add(field);
            points.push(currentPoint.clone());
            
            // Stop if we're close to target
            if (currentPoint.distanceTo(targetPoint) < 0.5) {
                points.push(targetPoint.clone());
                break;
            }
        }
        
        return points;
    }
    
    createFieldLineVisual(points, color, opacity) {
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
            color: color,
            opacity: opacity,
            transparent: true,
            linewidth: 2
        });
        
        const line = new THREE.Line(geometry, material);
        this.scene.add(line);
        this.fieldLines.push(line);
        
        // Add arrow indicators along the line
        this.addFieldLineArrows(points, color);
    }
    
    addFieldLineArrows(points, color) {
        const arrowInterval = Math.max(1, Math.floor(points.length / 3));
        
        for (let i = arrowInterval; i < points.length - 1; i += arrowInterval) {
            const currentPoint = points[i];
            const nextPoint = points[i + 1];
            const direction = nextPoint.clone().sub(currentPoint).normalize();
            
            const arrowGeometry = new THREE.ConeGeometry(0.05, 0.2, 6);
            const arrowMaterial = new THREE.MeshBasicMaterial({ color: color });
            const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
            
            arrow.position.copy(currentPoint);
            arrow.lookAt(nextPoint);
            
            this.scene.add(arrow);
            this.fieldLines.push(arrow);
        }
    }
}

// Create global instance
window.CinematicCharge3D = CinematicCharge3D; 