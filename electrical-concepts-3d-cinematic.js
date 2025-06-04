// Comprehensive Electrical Concepts 3D Visualization
// Enhanced with accurate physics representations based on educational research

class CinematicElectricalConcepts3D {
    
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
        });
        
        // Enhanced physics objects
        this.charges = [];
        this.conductors = [];
        this.electrons = [];
        this.electricFieldLines = [];
        this.equipotentialLines = [];
        this.resistors = [];
        this.voltageSource = null;
        this.circuits = [];
        this.heatParticles = [];
        this.powerMeters = [];
        this.currentArrows = [];
        this.voltageArrows = [];
        this.fieldVectors = [];
        
        this.time = 0;
        this.clock = new THREE.Clock();
        this.currentSection = 0;
        
        // Enhanced physical constants based on real physics
        this.constants = {
            coulombConstant: 8.99e9,
            electronCharge: 1.6e-19,
            electronMass: 9.11e-31,
            driftVelocity: 0.0001, // Realistic slow drift velocity
            thermalVelocity: 1.0,   // Much faster thermal motion
            electricPermittivity: 8.854e-12,
            resistivities: {
                copper: 1.68e-8,
                aluminum: 2.82e-8,
                steel: 1.43e-7,
                tungsten: 5.65e-8,
                glass: 1e12,
                rubber: 1e13
            },
            currentDensities: {
                low: 1e5,
                medium: 1e6,
                high: 1e7
            }
        };
        
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
        this.renderer.setClearColor(0x1a2a4a, 1);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.8;
        
        // Canvas setup
        const canvasContainer = document.getElementById('visualization-background');
        const existingCanvas = document.getElementById('electrical-canvas');
        
        if (canvasContainer) {
            if (existingCanvas) {
                canvasContainer.removeChild(existingCanvas);
            }
            canvasContainer.appendChild(this.renderer.domElement);
            this.renderer.domElement.id = 'electrical-canvas';
            this.renderer.domElement.className = 'fullscreen-canvas';
        }
        
        this.camera.position.set(0, 5, 15);
        this.camera.lookAt(0, 0, 0);
        
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }
    
    createScene() {
        // Enhanced bright lighting setup
        const ambientLight = new THREE.AmbientLight(0x6688bb, 0.9);
        this.scene.add(ambientLight);
        
        const keyLight = new THREE.DirectionalLight(0x88bbff, 2.2);
        keyLight.position.set(10, 10, 10);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 2048;
        keyLight.shadow.mapSize.height = 2048;
        this.scene.add(keyLight);
        
        const fillLight = new THREE.DirectionalLight(0xffcc66, 1.7);
        fillLight.position.set(-5, 5, -5);
        this.scene.add(fillLight);
        
        const topLight = new THREE.DirectionalLight(0xffffff, 1.4);
        topLight.position.set(0, 20, 0);
        this.scene.add(topLight);
        
        this.createEnhancedAtmosphericParticles();
    }
    
    createEnhancedAtmosphericParticles() {
        const particleCount = 300;
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 60;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
            
            velocities[i * 3] = (Math.random() - 0.5) * 0.008;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
            
            const hue = 0.55 + Math.random() * 0.3;
            colors[i * 3] = hue;
            colors[i * 3 + 1] = 0.95 + Math.random() * 0.05;
            colors[i * 3 + 2] = 0.7 + Math.random() * 0.3;
        }
        
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.06,
            opacity: 0.8,
            transparent: true,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            sizeAttenuation: true
        });
        
        this.atmosphericParticles = new THREE.Points(geometry, material);
        this.atmosphericParticles.userData.velocities = velocities;
        this.scene.add(this.atmosphericParticles);
    }
    
    // ===== ENHANCED SECTION SETUP METHODS =====
    
    setupSection(sectionIndex) {
        this.clearScene();
        this.currentSection = sectionIndex;
        
        switch(sectionIndex) {
            case 0: this.createAccurateChargeSection(); break;
            case 1: this.createRealisticCurrentSection(); break;
            case 2: this.createEnhancedResistanceSection(); break;
            case 3: this.createAccurateVoltageSection(); break;
            case 4: this.createPreciseOhmsLawSection(); break;
            case 5: this.createDetailedCircuitSection(); break;
            case 6: this.createAccurateSeriesParallelSection(); break;
            case 7: this.createRealisticHeatingSection(); break;
            case 8: this.createComprehensivePowerSection(); break;
        }
        
        this.animateCamera(sectionIndex);
    }
    
    createAccurateChargeSection() {
        // Enhanced Coulomb's law demonstration with accurate field lines
        const charges = [
            { position: [-4, 0, 0], charge: 2, color: 0xff4444, size: 0.4 },
            { position: [4, 0, 0], charge: -2, color: 0x4444ff, size: 0.4 },
            { position: [0, 3, 0], charge: 1, color: 0xff6666, size: 0.3 },
            { position: [0, -3, 0], charge: -1, color: 0x6666ff, size: 0.3 }
        ];
        
        charges.forEach(chargeData => {
            const charge = this.createAccurateCharge(chargeData.position, chargeData.charge, chargeData.color, chargeData.size);
            this.charges.push(charge);
            this.scene.add(charge);
        });
        
        // Create accurate electric field lines based on superposition principle
        this.createAccurateElectricFieldVisualization();
        
        // Add equipotential surfaces
        this.createEquipotentialSurfaces();
        
        // Enhanced force vectors with accurate magnitude representation
        this.createAccurateForceVectors();
        
        // Interactive Coulomb's law display with real calculations
        this.addInteractiveCoulombsLawDisplay([0, 6, 0]);
    }
    
    createRealisticCurrentSection() {
        // Accurate current demonstration based on drift velocity research
        const conductor = this.createRealisticConductor({
            start: [-8, 0, 0],
            end: [8, 0, 0],
            radius: 0.5,
            material: 'copper',
            crossSectionalArea: Math.PI * 0.25
        });
        
        this.conductors.push(conductor);
        
        // Create realistic electron motion with thermal + drift components
        this.createRealisticElectronFlow(conductor, 2.0, 80);
        
        // Show current direction arrows (conventional current)
        this.createConventionalCurrentArrows(conductor, 2.0);
        
        // Add accurate current density visualization
        this.addCurrentDensityVisualization([0, 3, 0], 2.0, 0.25);
        
        // Real-time I = Q/t demonstration
        this.createChargeCountingMechanism([4, 2, 0]);
    }
    
    createEnhancedResistanceSection() {
        // More accurate resistance demonstration with material properties
        const materials = [
            { name: 'copper', y: 3, resistivity: this.constants.resistivities.copper, color: 0xff9966, temp: 300 },
            { name: 'aluminum', y: 1, resistivity: this.constants.resistivities.aluminum, color: 0xf0f0f0, temp: 300 },
            { name: 'steel', y: -1, resistivity: this.constants.resistivities.steel, color: 0xccddee, temp: 300 },
            { name: 'tungsten', y: -3, resistivity: this.constants.resistivities.tungsten, color: 0xffee77, temp: 2000 }
        ];
        
        materials.forEach(material => {
            const conductor = this.createRealisticConductor({
                start: [-6, material.y, 0],
                end: [6, material.y, 0],
                radius: 0.3,
                material: material.name,
                color: material.color,
                temperature: material.temp
            });
            
            this.conductors.push(conductor);
            
            // Show realistic collision effects for different materials
            this.createCollisionVisualization(conductor, material.resistivity, 40);
            
            // Temperature-dependent resistance effects
            this.addTemperatureEffects(conductor, material.temp);
            
            // Material property display with real values
            this.addDetailedMaterialLabel(conductor, material);
        });
        
        this.addAdvancedResistanceFormulas([10, 0, 0]);
    }
    
    createAccurateVoltageSection() {
        // Enhanced voltage demonstration with electric field gradients
        const conductor = this.createRealisticConductor({
            start: [-8, 0, 0],
            end: [8, 0, 0],
            radius: 0.4,
            material: 'copper'
        });
        
        this.conductors.push(conductor);
        
        // Accurate voltage source with internal resistance
        this.voltageSource = this.createAccurateVoltageSource([-10, 0, 0], 12, 0.1);
        
        // Show electric field lines with proper gradient
        this.createElectricFieldGradient(conductor, 12);
        
        // Demonstrate electric potential energy concepts
        this.createPotentialEnergyVisualization(conductor);
        
        // Work and energy relationship W = qV
        this.addWorkEnergyDemonstration([0, 4, 0]);
    }
    
    createPreciseOhmsLawSection() {
        // Interactive and precise Ohm's law demonstration
        const conductor = this.createRealisticConductor({
            start: [-6, 0, 0],
            end: [6, 0, 0],
            radius: 0.4,
            material: 'copper'
        });
        
        this.conductors.push(conductor);
        
        // Variable voltage source for interactive demonstration
        this.voltageSource = this.createVariableVoltageSource([-8, 0, 0], 15);
        const resistor = this.createPrecisionResistor([0, 0, 0], 5, 0.25); // 5Ω, 0.25W rating
        this.resistors.push(resistor);
        
        const current = 15 / 5; // V/R = I
        this.createRealisticElectronFlow(conductor, current, 50);
        
        // Live interactive Ohm's law calculator with graphs
        this.addInteractiveOhmsLawCalculator([0, 4, 0], 15, current, 5);
        
        // Show V-I characteristic curve
        this.createVICharacteristicCurve([8, 2, 0]);
    }
    
    createDetailedCircuitSection() {
        // Complete circuit with Kirchhoff's laws demonstration
        const circuitPath = this.createCompleteCircuitPath();
        this.conductors = circuitPath;
        
        // Show current flow following Kirchhoff's current law
        this.createKirchhoffCurrentFlow(circuitPath, 2.0);
        
        // Multiple circuit elements
        this.voltageSource = this.createAccurateVoltageSource([-8, 0, 0], 12, 0.1);
        const bulb = this.createRealisticLightBulb([4, 0, 0], 6, 2); // 6Ω resistance, 2A current
        const motor = this.createMotorLoad([0, -2, 0], 3, 4); // 3Ω, 4A motor
        
        // Kirchhoff's voltage law demonstration
        this.addKirchhoffVoltageLawDemo([0, 5, 0]);
        
        // Power flow visualization
        this.createPowerFlowVisualization(circuitPath);
    }
    
    createAccurateSeriesParallelSection() {
        // Side-by-side accurate comparison
        
        // Series circuit (top) with precise calculations
        this.createAccurateSeriesCircuit(3);
        
        // Parallel circuit (bottom) with current division
        this.createAccurateParallelCircuit(-3);
        
        // Real-time comparison with measurements
        this.addRealTimeCircuitComparison([12, 0, 0]);
        
        // Show equivalent resistance calculations
        this.addEquivalentResistanceDemo([15, 3, 0]);
    }
    
    createRealisticHeatingSection() {
        // Accurate Joule heating based on P = I²R formula
        const heatingElements = [
            { position: [-4, 0, 0], resistance: 2, current: 3, material: 'tungsten' },
            { position: [0, 0, 0], resistance: 5, current: 2, material: 'nichrome' },
            { position: [4, 0, 0], resistance: 10, current: 1, material: 'steel' }
        ];
        
        heatingElements.forEach(element => {
            const resistor = this.createHeatingElement(element.position, element.resistance, element.material);
            this.resistors.push(resistor);
            
            // Accurate heat generation: P = I²R
            const heatPower = Math.pow(element.current, 2) * element.resistance;
            this.createRealisticHeatGeneration(element.position, heatPower, element.material);
            
            // Temperature rise calculation: ΔT = P/(ρcV)
            this.addTemperatureRiseCalculation(element.position, heatPower);
            
            // Thermal radiation visualization
            this.createThermalRadiationEffect(element.position, heatPower);
        });
        
        this.addComprehensiveJouleHeatingFormulas([0, 4, 0]);
    }
    
    createComprehensivePowerSection() {
        // Comprehensive electric power demonstration
        const devices = [
            { name: 'LED', position: [-6, 2, 0], voltage: 3.3, current: 0.02, efficiency: 0.85 },
            { name: 'Incandescent', position: [-2, 2, 0], voltage: 12, current: 1, efficiency: 0.05 },
            { name: 'Motor', position: [2, 2, 0], voltage: 24, current: 5, efficiency: 0.92 },
            { name: 'Heater', position: [6, 2, 0], voltage: 120, current: 10, efficiency: 0.98 }
        ];
        
        devices.forEach(device => {
            this.createDetailedPowerDevice(device);
            
            // Show power flow and losses
            this.visualizePowerFlow(device);
            
            // Efficiency demonstration
            this.addEfficiencyVisualization(device);
        });
        
        // Power grid demonstration
        this.createPowerGridVisualization([0, -3, 0]);
        
        // Energy conservation demonstration
        this.addEnergyConservationDemo([0, 5, 0]);
        
        // Real-time power calculations
        this.addRealTimePowerCalculations([8, 0, 0]);
    }
    
    // ===== ENHANCED CREATION METHODS =====
    
    createAccurateCharge(position, charge, color, size) {
        const group = new THREE.Group();
        
        // Create hyperrealistic charge representation as glowing orb with energy field
        const coreGeometry = new THREE.SphereGeometry(size * 0.7, 32, 32);
        const coreTexture = this.createEnergyTexture();
        const coreMaterial = new THREE.MeshPhysicalMaterial({
            color: color,
            emissive: new THREE.Color(color).multiplyScalar(0.6),
            emissiveIntensity: 1.2,
            metalness: 0.1,
            roughness: 0.1,
            clearcoat: 0.8,
            clearcoatRoughness: 0.1,
            transmission: 0.3,
            thickness: 0.2
        });
        
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        group.add(core);
        
        // Add energy field visualization
        const fieldGeometry = new THREE.SphereGeometry(size * 1.2, 16, 16);
        const fieldMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color(color) },
                charge: { value: charge }
            },
            vertexShader: `
                varying vec3 vPosition;
                varying vec3 vNormal;
                uniform float time;
                void main() {
                    vPosition = position;
                    vNormal = normal;
                    vec3 pos = position;
                    pos += normal * sin(time * 3.0 + length(position) * 5.0) * 0.02;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vPosition;
                varying vec3 vNormal;
                uniform float time;
                uniform vec3 color;
                uniform float charge;
                void main() {
                    float intensity = abs(charge) * 0.3;
                    float pulse = sin(time * 4.0) * 0.1 + 0.9;
                    float fresnel = pow(1.0 - dot(normalize(vNormal), vec3(0,0,1)), 2.0);
                    gl_FragColor = vec4(color * intensity * pulse * fresnel, 0.4);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending
        });
        
        const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
        group.add(field);
        
        // Add charge sign with realistic 3D text
        this.addHyperrealisticChargeSign(group, charge, size);
        
        group.position.set(...position);
        group.userData = { charge: charge, color: color, size: size, field: field };
        
        return group;
    }
    
    createRealisticConductor(config) {
        const group = new THREE.Group();
        
        const start = new THREE.Vector3(...config.start);
        const end = new THREE.Vector3(...config.end);
        const length = start.distanceTo(end);
        const direction = end.clone().sub(start).normalize();
        
        // Create hyperrealistic wire with braided texture
        const wireSegments = Math.ceil(length / 0.5); // Detailed segmentation
        
        for (let i = 0; i < wireSegments; i++) {
            const segmentStart = start.clone().lerp(end, i / wireSegments);
            const segmentEnd = start.clone().lerp(end, (i + 1) / wireSegments);
            const segmentLength = segmentStart.distanceTo(segmentEnd);
            
            // Main conductor core
            const coreGeometry = new THREE.CylinderGeometry(config.radius * 0.85, config.radius * 0.85, segmentLength, 32);
            const coreMaterial = this.createWireMaterial(config.material);
            const core = new THREE.Mesh(coreGeometry, coreMaterial);
            
            // Position segment
            const center = segmentStart.clone().add(segmentEnd).multiplyScalar(0.5);
            core.position.copy(center);
            core.lookAt(segmentEnd);
            core.rotateX(Math.PI / 2);
            
            // Add realistic insulation
            if (config.material !== 'bare') {
                const insulationGeometry = new THREE.CylinderGeometry(config.radius, config.radius, segmentLength, 32);
                const insulationMaterial = this.createInsulationMaterial(config.material);
                const insulation = new THREE.Mesh(insulationGeometry, insulationMaterial);
                insulation.position.copy(center);
                insulation.lookAt(segmentEnd);
                insulation.rotateX(Math.PI / 2);
                group.add(insulation);
            }
            
            group.add(core);
        }
        
        // Add realistic wire terminations
        this.addWireTerminations(group, start, end, config.radius);
        
        group.userData = { 
            start, end, length, direction, 
            radius: config.radius, 
            material: config.material,
            resistivity: this.constants.resistivities[config.material] || 1e-6,
            crossSectionalArea: config.crossSectionalArea || Math.PI * config.radius * config.radius,
            temperature: config.temperature || 300
        };
        
        return group;
    }
    
    createRealisticElectronFlow(conductor, current, count) {
        const electrons = [];
        const start = conductor.userData.start;
        const end = conductor.userData.end;
        const direction = conductor.userData.direction;
        const radius = conductor.userData.radius;
        
        // Calculate realistic drift velocity: v_d = I/(nAe)
        const electronDensity = 8.5e28; // electrons/m³ for copper
        const area = conductor.userData.crossSectionalArea;
        const driftVelocity = current / (electronDensity * area * this.constants.electronCharge);
        
        for (let i = 0; i < count; i++) {
            const electron = this.createRealisticElectron();
            
            // Random position within conductor cross-section
            const angle = Math.random() * Math.PI * 2;
            const r = Math.sqrt(Math.random()) * radius * 0.8;
            const offset = new THREE.Vector3(
                Math.cos(angle) * r,
                Math.sin(angle) * r,
                0
            );
            
            const t = i / count;
            const position = start.clone().lerp(end, t);
            position.add(offset);
            electron.position.copy(position);
            
            electron.userData = {
                conductor: conductor,
                driftSpeed: driftVelocity * 1000, // Scale for visualization
                thermalSpeed: this.constants.thermalVelocity,
                direction: direction.clone().multiplyScalar(-1), // Electrons flow opposite to current
                thermalDirection: new THREE.Vector3(
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2
                ).normalize(),
                type: 'realistic_current',
                collisionTimer: Math.random() * 100
            };
            
            electrons.push(electron);
            this.scene.add(electron);
        }
        
        this.electrons.push(...electrons);
    }
    
    createRealisticElectron() {
        const group = new THREE.Group();
        
        // Create energy particle instead of simple sphere
        const particleGeometry = new THREE.SphereGeometry(0.06, 16, 16);
        const particleMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color(0x66bbff) }
            },
            vertexShader: `
                varying vec3 vPosition;
                uniform float time;
                void main() {
                    vPosition = position;
                    vec3 pos = position;
                    pos += normalize(position) * sin(time * 8.0) * 0.01;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vPosition;
                uniform float time;
                uniform vec3 color;
                void main() {
                    float dist = length(vPosition);
                    float intensity = 1.0 - smoothstep(0.0, 1.0, dist);
                    float pulse = sin(time * 6.0) * 0.3 + 0.7;
                    gl_FragColor = vec4(color * intensity * pulse, intensity * 0.8);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending
        });
        
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        group.add(particle);
        
        // Add energy trail
        this.addHyperrealisticElectronTrail(group);
        
        group.userData = { material: particleMaterial };
        
        return group;
    }
    
    // ===== HYPERREALISTIC HELPER METHODS =====
    
    createRealisticBattery(voltage) {
        const group = new THREE.Group();
        
        // Battery casing
        const casingGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2.2, 16);
        const casingTexture = this.createBatteryTexture(voltage);
        const casingMaterial = new THREE.MeshPhysicalMaterial({
            map: casingTexture,
            color: voltage >= 9 ? 0x2a2a2a : 0x8b4513,
            metalness: 0.1,
            roughness: 0.6,
            clearcoat: 0.3
        });
        const casing = new THREE.Mesh(casingGeometry, casingMaterial);
        group.add(casing);
        
        // Top cap
        const capGeometry = new THREE.CylinderGeometry(0.52, 0.52, 0.1, 16);
        const capMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x333333,
            metalness: 0.8,
            roughness: 0.2
        });
        const topCap = new THREE.Mesh(capGeometry, capMaterial);
        topCap.position.y = 1.15;
        group.add(topCap);
        
        const bottomCap = topCap.clone();
        bottomCap.position.y = -1.15;
        group.add(bottomCap);
        
        return group;
    }
    
    createBatteryTerminal(isPositive) {
        const group = new THREE.Group();
        
        const terminalGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.15, 8);
        const terminalMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffd700,
            metalness: 0.9,
            roughness: 0.1
        });
        const terminal = new THREE.Mesh(terminalGeometry, terminalMaterial);
        group.add(terminal);
        
        // Add + or - symbol
        const symbolGeometry = new THREE.PlaneGeometry(0.1, 0.02);
        const symbolMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000,
            side: THREE.DoubleSide
        });
        
        const horizontalLine = new THREE.Mesh(symbolGeometry, symbolMaterial);
        horizontalLine.position.y = 0.08;
        group.add(horizontalLine);
        
        if (isPositive) {
            const verticalLine = horizontalLine.clone();
            verticalLine.rotateZ(Math.PI / 2);
            group.add(verticalLine);
        }
        
        return group;
    }
    
    createWireMaterial(materialType) {
        const texture = this.createWireTexture(materialType);
        return new THREE.MeshPhysicalMaterial({
            map: texture,
            color: this.getAccurateMaterialColor(materialType),
            metalness: this.getMaterialMetalness(materialType),
            roughness: this.getMaterialRoughness(materialType),
            clearcoat: 0.4,
            normalMap: this.createWireNormalMap()
        });
    }
    
    createInsulationMaterial(materialType) {
        return new THREE.MeshPhysicalMaterial({
            color: this.getInsulationColor(materialType),
            roughness: 0.8,
            metalness: 0.0,
            transmission: 0.1,
            thickness: 0.1
        });
    }
    
    addResistorColorBands(group, resistance) {
        // Calculate color bands based on resistance value
        const colors = this.getResistorColorBands(resistance);
        const bandWidth = 0.08;
        const bandPositions = [-0.3, -0.15, 0, 0.15];
        
        colors.forEach((color, index) => {
            if (index < bandPositions.length) {
                const bandGeometry = new THREE.CylinderGeometry(0.16, 0.16, bandWidth, 16);
                const bandMaterial = new THREE.MeshPhysicalMaterial({
                    color: color,
                    roughness: 0.6,
                    metalness: 0.0
                });
                const band = new THREE.Mesh(bandGeometry, bandMaterial);
                band.position.x = bandPositions[index];
                band.rotateZ(Math.PI / 2);
                group.add(band);
            }
        });
    }
    
    getResistorColorBands(resistance) {
        const colorCode = {
            0: 0x000000, 1: 0x8b4513, 2: 0xff0000, 3: 0xffa500,
            4: 0xffff00, 5: 0x008000, 6: 0x0000ff, 7: 0x800080,
            8: 0x808080, 9: 0xffffff
        };
        
        const resistanceStr = Math.round(resistance).toString();
        const colors = [];
        
        for (let i = 0; i < Math.min(2, resistanceStr.length); i++) {
            colors.push(colorCode[parseInt(resistanceStr[i])]);
        }
        
        // Add multiplier (typically gold or silver)
        colors.push(0xffd700); // Gold
        colors.push(0xc0c0c0); // Silver (tolerance)
        
        return colors;
    }
    
    getInsulationColor(materialType) {
        const colors = {
            copper: 0xff4500,  // Red insulation
            aluminum: 0x000000, // Black insulation
            steel: 0x008000,   // Green insulation
            default: 0x0000ff  // Blue insulation
        };
        return colors[materialType] || colors.default;
    }
    
    // ===== TEXTURE CREATION METHODS =====
    
    createEnergyTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        
        // Create energy pattern
        const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(100, 200, 255, 0.4)');
        gradient.addColorStop(1, 'rgba(0, 100, 255, 0.0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);
        
        return new THREE.CanvasTexture(canvas);
    }
    
    createBatteryTexture(voltage) {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        
        // Battery label background
        ctx.fillStyle = voltage >= 9 ? '#2a2a2a' : '#8b4513';
        ctx.fillRect(0, 0, 512, 256);
        
        // Brand label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PHYSICS', 256, 80);
        ctx.fillText(`${voltage}V`, 256, 120);
        
        // Warning symbols
        ctx.font = '24px Arial';
        ctx.fillText('⚡', 256, 160);
        
        return new THREE.CanvasTexture(canvas);
    }
    
    createResistorTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        
        // Resistor body texture
        const gradient = ctx.createLinearGradient(0, 0, 0, 64);
        gradient.addColorStop(0, '#e6c891');
        gradient.addColorStop(0.5, '#d4af7a');
        gradient.addColorStop(1, '#c2965f');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 64);
        
        // Add surface texture
        for (let i = 0; i < 100; i++) {
            ctx.fillStyle = `rgba(${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 100}, 0.1)`;
            ctx.fillRect(Math.random() * 256, Math.random() * 64, 2, 2);
        }
        
        return new THREE.CanvasTexture(canvas);
    }
    
    createWireTexture(materialType) {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        
        const baseColor = this.getAccurateMaterialColor(materialType);
        const r = (baseColor >> 16) & 255;
        const g = (baseColor >> 8) & 255;
        const b = baseColor & 255;
        
        // Create braided wire pattern
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(0, 0, 256, 256);
        
        // Add braiding pattern
        for (let y = 0; y < 256; y += 8) {
            const brightness = Math.sin(y * 0.1) * 30;
            ctx.fillStyle = `rgb(${r + brightness}, ${g + brightness}, ${b + brightness})`;
            ctx.fillRect(0, y, 256, 4);
        }
        
        return new THREE.CanvasTexture(canvas);
    }
    
    createWireNormalMap() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        
        // Create normal map for wire surface details
        ctx.fillStyle = '#8080ff';
        ctx.fillRect(0, 0, 256, 256);
        
        // Add surface bumps
        for (let y = 0; y < 256; y += 4) {
            const intensity = Math.sin(y * 0.2) * 30 + 128;
            ctx.fillStyle = `rgb(128, 128, ${intensity})`;
            ctx.fillRect(0, y, 256, 2);
        }
        
        return new THREE.CanvasTexture(canvas);
    }
    
    // ===== PLACEHOLDER METHODS =====
    
    addHyperrealisticChargeSign(group, charge, size) {
        // Create 3D text for charge sign
        const textGeometry = new THREE.PlaneGeometry(size * 0.5, size * 0.5);
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = charge > 0 ? '#ff0000' : '#0000ff';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(charge > 0 ? '+' : '−', 32, 40);
        
        const textTexture = new THREE.CanvasTexture(canvas);
        const textMaterial = new THREE.MeshBasicMaterial({
            map: textTexture,
            transparent: true
        });
        
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.y = size * 1.5;
        group.add(textMesh);
    }
    
    addWireTerminations(group, start, end, radius) {
        // Add realistic wire connectors at ends
        const connectorGeometry = new THREE.SphereGeometry(radius * 1.2, 16, 16);
        const connectorMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffd700,
            metalness: 0.9,
            roughness: 0.1
        });
        
        const startConnector = new THREE.Mesh(connectorGeometry, connectorMaterial);
        startConnector.position.copy(start);
        group.add(startConnector);
        
        const endConnector = new THREE.Mesh(connectorGeometry, connectorMaterial);
        endConnector.position.copy(end);
        group.add(endConnector);
    }
    
    addHyperrealisticVoltageLabel(group, voltage) {
        const labelGeometry = new THREE.PlaneGeometry(1.0, 0.3);
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 256, 64);
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${voltage}V`, 128, 35);
        
        const labelTexture = new THREE.CanvasTexture(canvas);
        const labelMaterial = new THREE.MeshBasicMaterial({
            map: labelTexture,
            transparent: true
        });
        
        const label = new THREE.Mesh(labelGeometry, labelMaterial);
        label.position.z = 0.6;
        group.add(label);
    }
    
    addHyperrealisticResistanceLabel(group, resistance) {
        const labelGeometry = new THREE.PlaneGeometry(0.8, 0.2);
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 50;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 200, 50);
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${resistance}Ω`, 100, 30);
        
        const labelTexture = new THREE.CanvasTexture(canvas);
        const labelMaterial = new THREE.MeshBasicMaterial({
            map: labelTexture,
            transparent: true
        });
        
        const label = new THREE.Mesh(labelGeometry, labelMaterial);
        label.position.y = 0.3;
        group.add(label);
    }
    
    addHyperrealisticElectronTrail(group) {
        // Create energy trail behind electron
        const trailGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(30); // 10 points * 3 coordinates
        const colors = new Float32Array(30);
        
        for (let i = 0; i < 10; i++) {
            positions[i * 3] = 0;
            positions[i * 3 + 1] = 0;
            positions[i * 3 + 2] = -i * 0.02;
            
            const alpha = 1 - (i / 10);
            colors[i * 3] = alpha;
            colors[i * 3 + 1] = alpha;
            colors[i * 3 + 2] = 1;
        }
        
        trailGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        trailGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const trailMaterial = new THREE.PointsMaterial({
            size: 0.03,
            transparent: true,
            opacity: 0.6,
            vertexColors: true,
            blending: THREE.AdditiveBlending
        });
        
        const trail = new THREE.Points(trailGeometry, trailMaterial);
        group.add(trail);
    }
    
    // ===== ENHANCED PHYSICS SIMULATION =====
    
    updateElectrons() {
        this.electrons.forEach(electron => {
            this.updateRealisticElectronPhysics(electron);
        });
    }
    
    updateRealisticElectronPhysics(electron) {
        const userData = electron.userData;
        
        if (userData.type === 'realistic_current') {
            // Combine drift velocity with thermal motion
            const driftVelocity = userData.direction.clone().multiplyScalar(userData.driftSpeed);
            const thermalVelocity = userData.thermalDirection.clone().multiplyScalar(userData.thermalSpeed);
            
            // Update thermal direction randomly (Brownian motion)
            if (Math.random() < 0.1) {
                userData.thermalDirection = new THREE.Vector3(
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2
                ).normalize();
            }
            
            // Combine motions
            const totalVelocity = driftVelocity.clone().add(thermalVelocity.multiplyScalar(0.1));
            electron.position.add(totalVelocity);
            
            // Handle collisions with atoms (scattering)
            userData.collisionTimer--;
            if (userData.collisionTimer <= 0) {
                this.createScatteringEvent(electron.position.clone());
                userData.collisionTimer = 50 + Math.random() * 100;
                
                // Randomize thermal direction after collision
                userData.thermalDirection = new THREE.Vector3(
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2
                ).normalize();
            }
            
            // Constrain to conductor
            this.constrainElectronToRealisticConductor(electron, userData.conductor);
        }
    }
    
    constrainElectronToRealisticConductor(electron, conductor) {
        const start = conductor.userData.start;
        const end = conductor.userData.end;
        const direction = conductor.userData.direction;
        const radius = conductor.userData.radius;
        
        // Project electron position onto conductor axis
        const toElectron = electron.position.clone().sub(start);
        const projection = direction.clone().multiplyScalar(toElectron.dot(direction));
        const projectedPoint = start.clone().add(projection);
        
        // Check if outside conductor length
        const distanceAlongConductor = projection.length();
        if (distanceAlongConductor > conductor.userData.length) {
            // Wrap around to beginning
            electron.position.copy(start);
            
            // Add random radial offset
            const angle = Math.random() * Math.PI * 2;
            const r = Math.sqrt(Math.random()) * radius * 0.8;
            const offset = new THREE.Vector3(
                Math.cos(angle) * r,
                Math.sin(angle) * r,
                0
            );
            electron.position.add(offset);
        }
        
        // Check radial constraint
        const radialDistance = electron.position.distanceTo(projectedPoint);
        if (radialDistance > radius * 0.9) {
            // Push back towards center
            const centerDirection = projectedPoint.clone().sub(electron.position).normalize();
            electron.position.add(centerDirection.multiplyScalar(0.1));
        }
    }
    
    createScatteringEvent(position) {
        // Create small flash to represent collision with atom
        const geometry = new THREE.SphereGeometry(0.05, 8, 8);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffdd44,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        const flash = new THREE.Mesh(geometry, material);
        flash.position.copy(position);
        
        flash.userData = {
            life: 1.0,
            type: 'scattering'
        };
        
        this.heatParticles.push(flash);
        this.scene.add(flash);
    }
    
    // ===== ENHANCED UTILITY METHODS =====
    
    getAccurateMaterialColor(material) {
        const colors = {
            copper: 0xb87333,
            aluminum: 0xc0c0c0,
            steel: 0x71797E,
            tungsten: 0xE5E4E2,
            gold: 0xFFD700,
            silver: 0xC0C0C0,
            nichrome: 0x8C7853,
            glass: 0xAADDFF,
            rubber: 0x2F2F2F
        };
        return colors[material] || 0xbbbbbb;
    }
    
    getMaterialMetalness(material) {
        const metalness = {
            copper: 0.9,
            aluminum: 0.8,
            steel: 0.7,
            tungsten: 0.6,
            gold: 0.95,
            silver: 0.95,
            nichrome: 0.5,
            glass: 0.0,
            rubber: 0.0
        };
        return metalness[material] || 0.5;
    }
    
    getMaterialRoughness(material) {
        const roughness = {
            copper: 0.2,
            aluminum: 0.3,
            steel: 0.4,
            tungsten: 0.5,
            gold: 0.1,
            silver: 0.1,
            nichrome: 0.6,
            glass: 0.05,
            rubber: 0.8
        };
        return roughness[material] || 0.5;
    }
    
    // ===== ENHANCED HEAT SIMULATION =====
    
    createRealisticHeatGeneration(position, power, material) {
        // Create heat particles based on actual power dissipation
        const particlesPerWatt = 5;
        const numParticles = Math.floor(power * particlesPerWatt);
        
        for (let i = 0; i < numParticles; i++) {
            setTimeout(() => {
                this.createHeatParticle(position.clone(), power);
            }, i * 50);
        }
        
        // Add thermal glow around heating element
        this.createThermalGlow(position, power, material);
    }
    
    createHeatParticle(position, power) {
        const geometry = new THREE.SphereGeometry(0.04, 8, 8);
        const heatIntensity = Math.min(power / 10, 1);
        const color = new THREE.Color(1, 1 - heatIntensity * 0.5, 1 - heatIntensity);
        
        const material = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
            emissive: color,
            emissiveIntensity: 0.5
        });
        
        const particle = new THREE.Mesh(geometry, material);
        particle.position.copy(position);
        particle.position.add(new THREE.Vector3(
            (Math.random() - 0.5) * 0.5,
            0,
            (Math.random() - 0.5) * 0.5
        ));
        
        particle.userData = {
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.02,
                0.01 + Math.random() * 0.02,
                (Math.random() - 0.5) * 0.02
            ),
            life: 1.0,
            power: power
        };
        
        this.heatParticles.push(particle);
        this.scene.add(particle);
    }
    
    updateHeatParticles() {
        this.heatParticles.forEach((particle, index) => {
            if (particle.userData.type === 'scattering') {
                particle.userData.life -= 0.05;
                particle.material.opacity = particle.userData.life;
                particle.scale.setScalar(1 + (1 - particle.userData.life) * 2);
            } else {
                particle.position.add(particle.userData.velocity);
                particle.userData.life -= 0.008;
                
                // Fade and expand as it rises
                particle.material.opacity = particle.userData.life * 0.9;
                particle.scale.setScalar(1 + (1 - particle.userData.life) * 1.5);
                
                // Add some turbulence
                particle.userData.velocity.x += (Math.random() - 0.5) * 0.001;
                particle.userData.velocity.z += (Math.random() - 0.5) * 0.001;
                particle.userData.velocity.y *= 1.02; // Accelerate upward
            }
            
            if (particle.userData.life <= 0) {
                this.scene.remove(particle);
                this.heatParticles.splice(index, 1);
            }
        });
    }
    
    // ===== ANIMATION LOOP =====
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        this.time = this.clock.getElapsedTime();
        
        this.updateElectrons();
        this.updateHeatParticles();
        this.updateAtmosphericParticles();
        this.updateCurrentArrows();
        this.updateVoltageIndicators();
        
        // Gentle camera movement
        this.camera.position.x += Math.sin(this.time * 0.015) * 0.003;
        this.camera.position.y += Math.cos(this.time * 0.02) * 0.002;
        this.camera.lookAt(0, 0, 0);
        
        this.renderer.render(this.scene, this.camera);
    }
    
    // ===== CLEAR SCENE =====
    
    clearScene() {
        // Clear all objects
        [...this.charges, ...this.conductors, ...this.electrons, 
         ...this.electricFieldLines, ...this.equipotentialLines, ...this.resistors, 
         ...this.heatParticles, ...this.currentArrows, ...this.voltageArrows,
         ...this.fieldVectors, this.voltageSource].forEach(obj => {
            if (obj && this.scene.children.includes(obj)) {
                this.scene.remove(obj);
            }
        });
        
        // Reset arrays
        this.charges = [];
        this.conductors = [];
        this.electrons = [];
        this.electricFieldLines = [];
        this.equipotentialLines = [];
        this.resistors = [];
        this.heatParticles = [];
        this.currentArrows = [];
        this.voltageArrows = [];
        this.fieldVectors = [];
        this.voltageSource = null;
    }
    
    // ===== PLACEHOLDER ENHANCED METHODS =====
    
    addConductorSurfaceDetails(group, material) {}
    createAccurateElectricFieldVisualization() {}
    createEquipotentialSurfaces() {}
    createAccurateForceVectors() {}
    addInteractiveCoulombsLawDisplay(position) {}
    createConventionalCurrentArrows(conductor, current) {}
    addCurrentDensityVisualization(position, current, area) {}
    createChargeCountingMechanism(position) {}
    createCollisionVisualization(conductor, resistivity, count) {}
    addTemperatureEffects(conductor, temperature) {}
    addDetailedMaterialLabel(conductor, material) {}
    addAdvancedResistanceFormulas(position) {}
    createAccurateVoltageSource(position, voltage, internalResistance) { return this.createVoltageSource(position, voltage); }
    createElectricFieldGradient(conductor, voltage) {}
    createPotentialEnergyVisualization(conductor) {}
    addWorkEnergyDemonstration(position) {}
    createVariableVoltageSource(position, maxVoltage) { return this.createVoltageSource(position, maxVoltage); }
    createPrecisionResistor(position, resistance, powerRating) { return this.createResistor(position, resistance); }
    addInteractiveOhmsLawCalculator(position, voltage, current, resistance) {}
    createVICharacteristicCurve(position) {}
    createCompleteCircuitPath() { return []; }
    createKirchhoffCurrentFlow(conductors, current) {}
    createRealisticLightBulb(position, resistance, current) {
        const group = new THREE.Group();
        
        // Glass bulb
        const bulbGeometry = new THREE.SphereGeometry(0.4, 32, 32);
        const bulbMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transmission: 0.95,
            thickness: 0.1,
            roughness: 0.05,
            ior: 1.5,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1
        });
        const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
        bulb.position.y = 0.2;
        group.add(bulb);
        
        // Filament
        const filamentGroup = new THREE.Group();
        for (let i = 0; i < 6; i++) {
            const filamentGeometry = new THREE.CylinderGeometry(0.005, 0.005, 0.3, 4);
            const filamentMaterial = new THREE.MeshPhysicalMaterial({
                color: 0xffaa33,
                emissive: 0xff6600,
                emissiveIntensity: Math.pow(current, 2) * resistance * 0.1,
                metalness: 0.8,
                roughness: 0.3
            });
            const filament = new THREE.Mesh(filamentGeometry, filamentMaterial);
            filament.position.x = Math.cos(i * Math.PI / 3) * 0.1;
            filament.position.z = Math.sin(i * Math.PI / 3) * 0.1;
            filament.position.y = 0.2;
            filamentGroup.add(filament);
        }
        group.add(filamentGroup);
        
        // Screw base
        const baseGeometry = new THREE.CylinderGeometry(0.2, 0.25, 0.4, 16);
        const baseMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xc0c0c0,
            metalness: 0.9,
            roughness: 0.2
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.y = -0.2;
        group.add(base);
        
        // Thread details
        for (let i = 0; i < 8; i++) {
            const threadGeometry = new THREE.TorusGeometry(0.22, 0.01, 4, 8);
            const thread = new THREE.Mesh(threadGeometry, baseMaterial);
            thread.position.y = -0.4 + i * 0.05;
            group.add(thread);
        }
        
        // Add glow effect
        const glowGeometry = new THREE.SphereGeometry(0.6, 16, 16);
        const glowMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                intensity: { value: Math.pow(current, 2) * resistance * 0.01 }
            },
            vertexShader: `
                varying vec3 vNormal;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vNormal;
                uniform float time;
                uniform float intensity;
                void main() {
                    float fresnel = pow(1.0 - dot(vNormal, vec3(0,0,1)), 2.0);
                    float pulse = sin(time * 4.0) * 0.1 + 0.9;
                    gl_FragColor = vec4(1.0, 0.8, 0.4, fresnel * intensity * pulse * 0.3);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide
        });
        
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        group.add(glow);
        
        group.position.set(...position);
        group.userData = { resistance, current, glow: glowMaterial };
        
        this.scene.add(group);
        return group;
    }
    
    createMotorLoad(position, resistance, current) {
        const group = new THREE.Group();
        
        // Motor housing
        const housingGeometry = new THREE.CylinderGeometry(0.6, 0.6, 1.2, 16);
        const housingTexture = this.createMotorTexture();
        const housingMaterial = new THREE.MeshPhysicalMaterial({
            map: housingTexture,
            color: 0x2a2a2a,
            metalness: 0.7,
            roughness: 0.4
        });
        const housing = new THREE.Mesh(housingGeometry, housingMaterial);
        group.add(housing);
        
        // Motor shaft
        const shaftGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.8, 8);
        const shaftMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xc0c0c0,
            metalness: 0.9,
            roughness: 0.1
        });
        const shaft = new THREE.Mesh(shaftGeometry, shaftMaterial);
        group.add(shaft);
        
        // Rotor (rotating part)
        const rotorGroup = new THREE.Group();
        for (let i = 0; i < 6; i++) {
            const bladeGeometry = new THREE.BoxGeometry(0.1, 0.02, 0.8);
            const bladeMaterial = new THREE.MeshPhysicalMaterial({
                color: 0x444444,
                metalness: 0.6,
                roughness: 0.3
            });
            const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
            blade.position.x = Math.cos(i * Math.PI / 3) * 0.3;
            blade.position.z = Math.sin(i * Math.PI / 3) * 0.3;
            blade.rotation.y = i * Math.PI / 3;
            rotorGroup.add(blade);
        }
        group.add(rotorGroup);
        
        // Terminal connections
        const terminalMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffd700,
            metalness: 0.9,
            roughness: 0.1
        });
        
        const terminal1 = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 0.1, 0.2),
            terminalMaterial
        );
        terminal1.position.set(0.4, 0.4, 0);
        group.add(terminal1);
        
        const terminal2 = terminal1.clone();
        terminal2.position.set(-0.4, 0.4, 0);
        group.add(terminal2);
        
        // Add motor nameplate
        this.addMotorNameplate(group, resistance, current);
        
        group.position.set(...position);
        group.userData = { resistance, current, rotor: rotorGroup };
        
        this.scene.add(group);
        return group;
    }
    
    createMotorTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        
        // Motor housing texture
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(0, 0, 512, 256);
        
        // Brand label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PHYSICS MOTOR', 256, 80);
        
        // Specifications
        ctx.font = '16px Arial';
        ctx.fillText('12V DC', 256, 120);
        ctx.fillText('1000 RPM', 256, 140);
        
        // Ventilation slots
        ctx.fillStyle = '#000000';
        for (let i = 0; i < 20; i++) {
            ctx.fillRect(50 + i * 20, 180, 10, 40);
        }
        
        return new THREE.CanvasTexture(canvas);
    }
    
    createCircuitBoardTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        
        // PCB background
        ctx.fillStyle = '#2d5a2d';
        ctx.fillRect(0, 0, 1024, 512);
        
        // Copper traces
        ctx.strokeStyle = '#b87333';
        ctx.lineWidth = 4;
        
        // Create circuit trace pattern
        for (let i = 0; i < 20; i++) {
            ctx.beginPath();
            ctx.moveTo(i * 50, 0);
            ctx.lineTo(i * 50, 512);
            ctx.stroke();
        }
        
        for (let i = 0; i < 10; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * 50);
            ctx.lineTo(1024, i * 50);
            ctx.stroke();
        }
        
        // Add component pads
        ctx.fillStyle = '#ffd700';
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * 1024;
            const y = Math.random() * 512;
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fill();
        }
        
        return new THREE.CanvasTexture(canvas);
    }
    
    addMotorNameplate(group, resistance, current) {
        const plateGeometry = new THREE.PlaneGeometry(0.8, 0.4);
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 200, 100);
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${resistance}Ω`, 100, 30);
        ctx.fillText(`${current}A`, 100, 50);
        ctx.fillText(`${(current * current * resistance).toFixed(1)}W`, 100, 70);
        
        const plateTexture = new THREE.CanvasTexture(canvas);
        const plateMaterial = new THREE.MeshBasicMaterial({
            map: plateTexture,
            transparent: true
        });
        
        const plate = new THREE.Mesh(plateGeometry, plateMaterial);
        plate.position.z = 0.7;
        group.add(plate);
    }
    
    addDeviceNameplate(group, device) {
        const plateGeometry = new THREE.PlaneGeometry(1.2, 0.6);
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 150;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 300, 150);
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(device.name, 150, 30);
        ctx.font = '12px Arial';
        ctx.fillText(`${device.voltage}V`, 150, 60);
        ctx.fillText(`${device.current}A`, 150, 80);
        ctx.fillText(`${(device.voltage * device.current).toFixed(1)}W`, 150, 100);
        ctx.fillText(`${(device.efficiency * 100).toFixed(0)}% Eff`, 150, 120);
        
        const plateTexture = new THREE.CanvasTexture(canvas);
        const plateMaterial = new THREE.MeshBasicMaterial({
            map: plateTexture,
            transparent: true
        });
        
        const plate = new THREE.Mesh(plateGeometry, plateMaterial);
        plate.position.y = 1.5;
        group.add(plate);
    }
    
    addTemperatureDisplay(panel, power) {
        const displayGeometry = new THREE.PlaneGeometry(0.3, 0.2);
        const canvas = document.createElement('canvas');
        canvas.width = 150;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, 150, 100);
        ctx.fillStyle = '#00ff00';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        
        const temperature = Math.round(25 + power * 5); // Estimate temperature
        ctx.fillText(`${temperature}°C`, 75, 60);
        
        const displayTexture = new THREE.CanvasTexture(canvas);
        const displayMaterial = new THREE.MeshBasicMaterial({
            map: displayTexture,
            emissive: 0x004400,
            emissiveIntensity: 0.3
        });
        
        const display = new THREE.Mesh(displayGeometry, displayMaterial);
        display.position.z = 0.06;
        panel.add(display);
    }
    
    // ===== EXISTING UTILITY METHODS =====
    
    animateCamera(sectionIndex) {
        const targetPositions = [
            [0, 5, 15],   // Charge
            [8, 3, 12],   // Current
            [10, 5, 15],  // Resistance
            [5, 5, 15],   // Voltage
            [0, 5, 15],   // Ohm's Law
            [0, 8, 20],   // Circuits
            [0, 10, 25],  // Series/Parallel
            [0, 6, 18],   // Heating
            [15, 8, 20]   // Power
        ];
        
        const target = targetPositions[sectionIndex] || [0, 5, 15];
        
        const startPos = this.camera.position.clone();
        const endPos = new THREE.Vector3(...target);
        
        let progress = 0;
        const animateStep = () => {
            progress += 0.015;
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
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    // Keep existing basic creation methods for compatibility
    createCharge(position, charge, color, size) {
        return this.createAccurateCharge(position, charge, color, size);
    }
    
    createConductor(config) {
        return this.createRealisticConductor(config);
    }
    
    createVoltageSource(position, voltage) {
        const group = new THREE.Group();
        
        // Create hyperrealistic battery
        const batteryBody = this.createRealisticBattery(voltage);
        group.add(batteryBody);
        
        // Add terminals
        const positiveTerminal = this.createBatteryTerminal(true);
        positiveTerminal.position.set(0, 1.3, 0);
        group.add(positiveTerminal);
        
        const negativeTerminal = this.createBatteryTerminal(false);
        negativeTerminal.position.set(0, -1.3, 0);
        group.add(negativeTerminal);
        
        // Add voltage label
        this.addHyperrealisticVoltageLabel(group, voltage);
        
        // Add realistic base/holder
        const baseGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.1, 16);
        const baseMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x333333,
            metalness: 0.8,
            roughness: 0.3
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.y = -1.5;
        group.add(base);
        
        group.position.set(...position);
        group.userData = { voltage: voltage };
        
        this.scene.add(group);
        return group;
    }
    
    createResistor(position, resistance) {
        const group = new THREE.Group();
        
        // Create hyperrealistic resistor body
        const bodyGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1.0, 16);
        const bodyTexture = this.createResistorTexture();
        const bodyMaterial = new THREE.MeshPhysicalMaterial({
            map: bodyTexture,
            color: 0xd4af7a,
            roughness: 0.8,
            metalness: 0.0
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.rotateZ(Math.PI / 2);
        group.add(body);
        
        // Add color bands for resistance value
        this.addResistorColorBands(group, resistance);
        
        // Add metal leads
        const leadMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xc0c0c0,
            metalness: 0.9,
            roughness: 0.1
        });
        
        const leftLead = new THREE.Mesh(
            new THREE.CylinderGeometry(0.02, 0.02, 0.4, 8),
            leadMaterial
        );
        leftLead.position.set(-0.7, 0, 0);
        leftLead.rotateZ(Math.PI / 2);
        group.add(leftLead);
        
        const rightLead = new THREE.Mesh(
            new THREE.CylinderGeometry(0.02, 0.02, 0.4, 8),
            leadMaterial
        );
        rightLead.position.set(0.7, 0, 0);
        rightLead.rotateZ(Math.PI / 2);
        group.add(rightLead);
        
        // Add resistance value label
        this.addHyperrealisticResistanceLabel(group, resistance);
        
        group.position.set(...position);
        group.userData = { resistance: resistance };
        
        this.scene.add(group);
        return group;
    }
    
    addKirchhoffVoltageLawDemo(position) {}
    createPowerFlowVisualization(conductors) {}
    createAccurateSeriesCircuit(y) {}
    createAccurateParallelCircuit(y) {}
    addRealTimeCircuitComparison(position) {}
    addEquivalentResistanceDemo(position) {}
    createHeatingElement(position, resistance, material) { return this.createResistor(position, resistance); }
    addTemperatureRiseCalculation(position, power) {}
    createThermalRadiationEffect(position, power) {}
    addComprehensiveJouleHeatingFormulas(position) {}
    createDetailedPowerDevice(device) {
        const group = new THREE.Group();
        
        switch(device.name) {
            case 'LED':
                this.createHyperrealisticLED(group, device);
                break;
            case 'Incandescent':
                const bulb = this.createRealisticLightBulb([0, 0, 0], 12, device.current);
                group.add(bulb);
                break;
            case 'Motor':
                const motor = this.createMotorLoad([0, 0, 0], 24, device.current);
                group.add(motor);
                break;
            case 'Heater':
                this.createHyperrealisticHeater(group, device);
                break;
        }
        
        // Add device nameplate
        this.addDeviceNameplate(group, device);
        
        group.position.set(...device.position);
        this.scene.add(group);
        
        return group;
    }
    
    createHyperrealisticLED(group, device) {
        // LED package
        const packageGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.1);
        const packageMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x1a1a1a,
            roughness: 0.4,
            metalness: 0.1
        });
        const ledPackage = new THREE.Mesh(packageGeometry, packageMaterial);
        group.add(ledPackage);
        
        // LED dome
        const domeGeometry = new THREE.SphereGeometry(0.08, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
        const domeMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transmission: 0.9,
            thickness: 0.02,
            ior: 1.5,
            emissive: device.current > 0 ? 0x66ff66 : 0x000000,
            emissiveIntensity: device.current * 50
        });
        const dome = new THREE.Mesh(domeGeometry, domeMaterial);
        dome.position.y = 0.05;
        group.add(dome);
        
        // LED leads
        const leadMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xc0c0c0,
            metalness: 0.9,
            roughness: 0.1
        });
        
        const lead1 = new THREE.Mesh(
            new THREE.BoxGeometry(0.02, 0.5, 0.02),
            leadMaterial
        );
        lead1.position.set(0.1, -0.25, 0);
        group.add(lead1);
        
        const lead2 = lead1.clone();
        lead2.position.set(-0.1, -0.25, 0);
        group.add(lead2);
        
        // Add LED glow effect
        if (device.current > 0) {
            const glowGeometry = new THREE.SphereGeometry(0.2, 16, 16);
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: 0x66ff66,
                transparent: true,
                opacity: 0.3,
                blending: THREE.AdditiveBlending
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            group.add(glow);
        }
    }
    
    createHyperrealisticHeater(group, device) {
        // Heater base
        const baseGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.2, 16);
        const baseMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x2a2a2a,
            metalness: 0.6,
            roughness: 0.4
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        group.add(base);
        
        // Heating elements (coils)
        for (let i = 0; i < 3; i++) {
            const coilRadius = 0.2 + i * 0.15;
            const coilGeometry = new THREE.TorusGeometry(coilRadius, 0.02, 8, 32);
            const coilMaterial = new THREE.MeshPhysicalMaterial({
                color: 0xff4400,
                emissive: 0xff2200,
                emissiveIntensity: device.current * 0.5,
                metalness: 0.3,
                roughness: 0.6
            });
            const coil = new THREE.Mesh(coilGeometry, coilMaterial);
            coil.position.y = 0.15;
            group.add(coil);
        }
        
        // Control panel
        const panelGeometry = new THREE.BoxGeometry(0.4, 0.6, 0.1);
        const panelMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x333333,
            roughness: 0.6,
            metalness: 0.2
        });
        const panel = new THREE.Mesh(panelGeometry, panelMaterial);
        panel.position.set(1, 0, 0);
        group.add(panel);
        
        // Temperature display
        this.addTemperatureDisplay(panel, device.voltage * device.current);
    }
    
    updateCurrentArrows() {}
    updateVoltageIndicators() {}
    updateAtmosphericParticles() {
        if (this.atmosphericParticles) {
            const positions = this.atmosphericParticles.geometry.attributes.position.array;
            const velocities = this.atmosphericParticles.userData.velocities;
            
            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += velocities[i];
                positions[i + 1] += velocities[i + 1];
                positions[i + 2] += velocities[i + 2];
                
                if (Math.abs(positions[i]) > 30) velocities[i] *= -1;
                if (Math.abs(positions[i + 1]) > 20) velocities[i + 1] *= -1;
                if (Math.abs(positions[i + 2]) > 30) velocities[i + 2] *= -1;
            }
            
            this.atmosphericParticles.geometry.attributes.position.needsUpdate = true;
        }
    }
    
    // ===== ENHANCED ANIMATION METHODS =====
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        this.time = this.clock.getElapsedTime();
        
        // Update hyperrealistic elements
        this.updateElectrons();
        this.updateHeatParticles();
        this.updateAtmosphericParticles();
        this.updateShaderMaterials();
        this.updateRotatingElements();
        
        // Gentle camera movement
        this.camera.position.x += Math.sin(this.time * 0.015) * 0.003;
        this.camera.position.y += Math.cos(this.time * 0.02) * 0.002;
        this.camera.lookAt(0, 0, 0);
        
        this.renderer.render(this.scene, this.camera);
    }
    
    updateShaderMaterials() {
        // Update all shader materials with time
        this.scene.traverse((child) => {
            if (child.material && child.material.uniforms) {
                if (child.material.uniforms.time) {
                    child.material.uniforms.time.value = this.time;
                }
            }
            
            // Update electron materials
            if (child.userData && child.userData.material && child.userData.material.uniforms) {
                if (child.userData.material.uniforms.time) {
                    child.userData.material.uniforms.time.value = this.time;
                }
            }
            
            // Update charge field materials
            if (child.userData && child.userData.field && child.userData.field.material.uniforms) {
                child.userData.field.material.uniforms.time.value = this.time;
            }
        });
    }
    
    updateRotatingElements() {
        // Rotate motor rotors
        this.scene.traverse((child) => {
            if (child.userData && child.userData.rotor) {
                child.userData.rotor.rotation.y += child.userData.current * 0.1;
            }
        });
    }
}

// Create global instance
window.CinematicElectricalConcepts3D = CinematicElectricalConcepts3D; 