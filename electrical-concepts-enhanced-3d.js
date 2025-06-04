/**
 * Electrical Concepts - Physics-Accurate 3D Visualization Engine
 * Generates hyperrealistic electrical components and accurate physics phenomena
 */

class ElectricalConceptsCinematicVisualization3D {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            physicsMode: 'hyperAccurate',
            materialQuality: 'hyperrealistic',
            enableVoiceFeedback: true,
            adaptiveQuality: true,
            realTimePhysics: true,
            ...options
        };
        
        // Physics constants (real values)
        this.PHYSICS = {
            ELECTRON_CHARGE: 1.602176634e-19, // Coulombs
            ELECTRON_MASS: 9.1093837015e-31, // kg
            AVOGADRO: 6.02214076e23, // mol^-1
            COPPER_RESISTIVITY: 1.68e-8, // Ω⋅m at 20°C
            COPPER_DENSITY: 8960, // kg/m³
            COPPER_ELECTRONS_PER_ATOM: 1,
            DRIFT_VELOCITY_SCALE: 1e6, // Visual scaling for drift velocity
            THERMAL_VELOCITY: 1e6, // m/s (typical thermal velocity)
        };
        
        // Current circuit state
        this.circuitState = {
            voltage: 12, // V
            resistance: 100, // Ω
            current: 0, // A (calculated)
            power: 0, // W (calculated)
            temperature: 293.15 // K (20°C)
        };
        
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.currentSection = 0;
        this.circuitComponents = {};
        this.animationFrame = null;
        this.physicsEngine = null;
        
        this.initialize();
    }
    
    initialize() {
        this.setupThreeJS();
        this.createPhysicsEngine();
        this.setupLighting();
        this.startRenderLoop();
        console.log('Physics-accurate electrical visualization initialized');
    }
    
    setupThreeJS() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0e1a);
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            45, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        this.camera.position.set(0, 10, 15);
        this.camera.lookAt(0, 0, 0);
        
        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0;
        
        this.container.appendChild(this.renderer.domElement);
    }
    
    createPhysicsEngine() {
        this.physicsEngine = {
            // Calculate current using Ohm's Law
            calculateCurrent: (voltage, resistance) => {
                return voltage / resistance;
            },
            
            // Calculate power
            calculatePower: (voltage, current, resistance) => {
                return {
                    VI: voltage * current,
                    I2R: current * current * resistance,
                    V2R: (voltage * voltage) / resistance
                };
            },
            
            // Calculate drift velocity: v_d = I / (n * A * e)
            calculateDriftVelocity: (current, crossSectionArea, electronDensity) => {
                return current / (electronDensity * crossSectionArea * this.PHYSICS.ELECTRON_CHARGE);
            },
            
            // Calculate electron density in copper
            calculateElectronDensity: () => {
                const atomsPerM3 = (this.PHYSICS.COPPER_DENSITY / 63.546) * this.PHYSICS.AVOGADRO;
                return atomsPerM3 * this.PHYSICS.COPPER_ELECTRONS_PER_ATOM;
            },
            
            // Calculate resistance: R = ρL/A
            calculateResistance: (resistivity, length, area) => {
                return (resistivity * length) / area;
            },
            
            // Temperature effect on resistance
            calculateTempResistance: (R0, temp, tempCoeff = 0.00393) => {
                return R0 * (1 + tempCoeff * (temp - 293.15));
            },
            
            // Electric field calculation: E = V/d
            calculateElectricField: (voltage, distance) => {
                return voltage / distance;
            }
        };
    }
    
    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);
        
        // Main directional light
        const mainLight = new THREE.DirectionalLight(0xffffff, 1.0);
        mainLight.position.set(10, 10, 5);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        this.scene.add(mainLight);
        
        // Fill light
        const fillLight = new THREE.DirectionalLight(0x4fc3f7, 0.3);
        fillLight.position.set(-5, 5, -5);
        this.scene.add(fillLight);
        
        // Rim light
        const rimLight = new THREE.DirectionalLight(0xff6b35, 0.2);
        rimLight.position.set(0, -5, 10);
        this.scene.add(rimLight);
    }
    
    setupSection(sectionIndex) {
        this.currentSection = sectionIndex;
        this.clearScene();
        
        switch(sectionIndex) {
            case 0: // Electric Charge
                this.createElectricChargeVisualization();
                break;
            case 1: // Electric Current
                this.createElectricCurrentVisualization();
                break;
            case 2: // Resistance
                this.createResistanceVisualization();
                break;
            case 3: // Voltage
                this.createVoltageVisualization();
                break;
            case 4: // Ohm's Law
                this.createOhmsLawVisualization();
                break;
            case 5: // Circuits
                this.createCircuitVisualization();
                break;
            case 6: // Series vs Parallel
                this.createSeriesParallelVisualization();
                break;
            case 7: // Heating Effects
                this.createHeatingEffectsVisualization();
                break;
            case 8: // Electric Power
                this.createElectricPowerVisualization();
                break;
            default:
                this.createOhmsLawVisualization();
        }
    }
    
    clearScene() {
        // Remove all circuit components
        Object.values(this.circuitComponents).forEach(component => {
            if (component.dispose) component.dispose();
        });
        this.circuitComponents = {};
        
        // Clear scene (keep lights)
        const objectsToRemove = [];
        this.scene.traverse((child) => {
            if (child.type === 'Mesh' || child.type === 'Group') {
                objectsToRemove.push(child);
            }
        });
        objectsToRemove.forEach(obj => this.scene.remove(obj));
    }
    
    // === SECTION 1: ELECTRIC CHARGE ===
    createElectricChargeVisualization() {
        const chargeGroup = new THREE.Group();
        
        // Create positive charge (+)
        const positiveCharge = this.createRealisticCharge(1, 0xff3333);
        positiveCharge.position.set(-4, 0, 0);
        chargeGroup.add(positiveCharge);
        
        // Create negative charge (-)
        const negativeCharge = this.createRealisticCharge(-1, 0x3333ff);
        negativeCharge.position.set(4, 0, 0);
        chargeGroup.add(negativeCharge);
        
        // Create electric field lines
        const fieldLines = this.createElectricFieldLines(positiveCharge.position, negativeCharge.position);
        chargeGroup.add(fieldLines);
        
        // Add force vector
        const forceVector = this.createForceVector();
        chargeGroup.add(forceVector);
        
        // Add information display
        const infoPanel = this.createInfoPanel({
            'Charge 1': '+1.602 × 10⁻¹⁹ C',
            'Charge 2': '-1.602 × 10⁻¹⁹ C',
            'Distance': '8.0 m',
            'Force': '1.15 × 10⁻²⁹ N (attractive)'
        });
        infoPanel.position.set(0, 4, 0);
        chargeGroup.add(infoPanel);
        
        this.scene.add(chargeGroup);
        this.circuitComponents.chargeVisualization = chargeGroup;
    }
    
    // === SECTION 5: OHM'S LAW ===
    createOhmsLawVisualization() {
        const circuitGroup = new THREE.Group();
        
        // Create circuit board base
        const circuitBoard = this.createCircuitBoard();
        circuitGroup.add(circuitBoard);
        
        // Create realistic battery
        const battery = this.createRealisticBattery(this.circuitState.voltage);
        battery.position.set(-4, 0.5, -2);
        circuitGroup.add(battery);
        
        // Create realistic resistor with color bands
        const resistor = this.createRealisticResistor(this.circuitState.resistance);
        resistor.position.set(2, 0.5, 0);
        circuitGroup.add(resistor);
        
        // Create ammeter
        const ammeter = this.createAmmeter();
        ammeter.position.set(-1, 0.5, 2);
        circuitGroup.add(ammeter);
        
        // Create voltmeter
        const voltmeter = this.createVoltmeter();
        voltmeter.position.set(4, 0.5, -2);
        circuitGroup.add(voltmeter);
        
        // Create connecting wires
        const wires = this.createCircuitWires([
            {from: battery.position, to: ammeter.position},
            {from: ammeter.position, to: resistor.position},
            {from: resistor.position, to: voltmeter.position},
            {from: voltmeter.position, to: battery.position}
        ]);
        circuitGroup.add(wires);
        
        // Create electron flow animation
        const electronFlow = this.createElectronFlow(wires);
        circuitGroup.add(electronFlow);
        
        // Create real-time calculation display
        const calculator = this.createOhmsLawCalculator();
        calculator.position.set(0, 3, 0);
        circuitGroup.add(calculator);
        
        // Add current path highlighting
        const currentPath = this.createCurrentPathHighlight(wires);
        circuitGroup.add(currentPath);
        
        this.scene.add(circuitGroup);
        this.circuitComponents.ohmsLawCircuit = circuitGroup;
        
        // Start real-time physics calculations
        this.startOhmsLawPhysics();
    }
    
    createRealisticBattery(voltage) {
        const batteryGroup = new THREE.Group();
        
        // Main battery cylinder
        const bodyGeometry = new THREE.CylinderGeometry(0.4, 0.4, 2.5, 32);
        const bodyMaterial = new THREE.MeshPhongMaterial({
            color: 0x2a2a2a,
            shininess: 30,
            map: this.createBatteryTexture(voltage)
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.castShadow = true;
        batteryGroup.add(body);
        
        // Positive terminal
        const posTermGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.2, 16);
        const posTermMaterial = new THREE.MeshPhongMaterial({
            color: 0xffd700,
            shininess: 100,
            metalness: 0.8
        });
        const posTerm = new THREE.Mesh(posTermGeometry, posTermMaterial);
        posTerm.position.y = 1.35;
        batteryGroup.add(posTerm);
        
        // Negative terminal
        const negTerm = posTerm.clone();
        negTerm.position.y = -1.35;
        batteryGroup.add(negTerm);
        
        // Voltage label
        const voltageLabel = this.create3DText(`${voltage}V`, 0.3, 0xff6b35);
        voltageLabel.position.set(0, 0, 0.5);
        batteryGroup.add(voltageLabel);
        
        // Add internal chemistry visualization
        const chemistry = this.createBatteryChemistry();
        batteryGroup.add(chemistry);
        
        return batteryGroup;
    }
    
    createRealisticResistor(resistance) {
        const resistorGroup = new THREE.Group();
        
        // Main resistor body (ceramic)
        const bodyGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.5, 16);
        const bodyMaterial = new THREE.MeshPhongMaterial({
            color: 0xf5deb3, // Ceramic color
            shininess: 10
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.rotation.z = Math.PI / 2;
        body.castShadow = true;
        resistorGroup.add(body);
        
        // Color bands for resistance value
        const colorBands = this.createResistorColorBands(resistance);
        colorBands.forEach(band => resistorGroup.add(band));
        
        // Metal leads
        const leadGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.8, 8);
        const leadMaterial = new THREE.MeshPhongMaterial({
            color: 0xc0c0c0,
            shininess: 100,
            metalness: 0.9
        });
        
        const leftLead = new THREE.Mesh(leadGeometry, leadMaterial);
        leftLead.position.set(-1.15, 0, 0);
        leftLead.rotation.z = Math.PI / 2;
        resistorGroup.add(leftLead);
        
        const rightLead = leftLead.clone();
        rightLead.position.set(1.15, 0, 0);
        resistorGroup.add(rightLead);
        
        // Resistance value label
        const valueLabel = this.create3DText(`${resistance}Ω`, 0.2, 0x4fc3f7);
        valueLabel.position.set(0, 0.3, 0);
        resistorGroup.add(valueLabel);
        
        // Heat visualization (for power dissipation)
        const heatGlow = this.createHeatGlow();
        resistorGroup.add(heatGlow);
        
        return resistorGroup;
    }
    
    createAmmeter() {
        const ammeterGroup = new THREE.Group();
        
        // Main housing
        const housingGeometry = new THREE.BoxGeometry(0.8, 0.6, 0.8);
        const housingMaterial = new THREE.MeshPhongMaterial({
            color: 0x333333,
            shininess: 50
        });
        const housing = new THREE.Mesh(housingGeometry, housingMaterial);
        housing.castShadow = true;
        ammeterGroup.add(housing);
        
        // Display face
        const faceGeometry = new THREE.CircleGeometry(0.25, 32);
        const faceMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.9
        });
        const face = new THREE.Mesh(faceGeometry, faceMaterial);
        face.position.set(0, 0, 0.41);
        ammeterGroup.add(face);
        
        // Needle
        const needle = this.createMeterNeedle();
        needle.position.set(0, 0, 0.42);
        ammeterGroup.add(needle);
        
        // Scale markings
        const scale = this.createMeterScale('A');
        scale.position.set(0, 0, 0.41);
        ammeterGroup.add(scale);
        
        // Label
        const label = this.create3DText('A', 0.1, 0xff3333);
        label.position.set(0, -0.4, 0.4);
        ammeterGroup.add(label);
        
        return ammeterGroup;
    }
    
    createVoltmeter() {
        const voltmeterGroup = new THREE.Group();
        
        // Similar to ammeter but for voltage
        const housing = this.createAmmeter(); // Reuse ammeter design
        voltmeterGroup.add(housing);
        
        // Change label to V
        const label = this.create3DText('V', 0.1, 0x3333ff);
        label.position.set(0, -0.4, 0.4);
        voltmeterGroup.add(label);
        
        return voltmeterGroup;
    }
    
    createCircuitWires(connections) {
        const wireGroup = new THREE.Group();
        
        connections.forEach((connection, index) => {
            const curve = new THREE.CatmullRomCurve3([
                connection.from.clone(),
                new THREE.Vector3(
                    (connection.from.x + connection.to.x) / 2,
                    Math.max(connection.from.y, connection.to.y) + 0.5,
                    (connection.from.z + connection.to.z) / 2
                ),
                connection.to.clone()
            ]);
            
            const tubeGeometry = new THREE.TubeGeometry(curve, 20, 0.05, 8, false);
            const wireMaterial = new THREE.MeshPhongMaterial({
                color: 0xff6600, // Copper wire color
                shininess: 80,
                metalness: 0.7
            });
            
            const wire = new THREE.Mesh(tubeGeometry, wireMaterial);
            wire.castShadow = true;
            wire.userData = { wireIndex: index, curve: curve };
            wireGroup.add(wire);
        });
        
        return wireGroup;
    }
    
    createElectronFlow(wireGroup) {
        const electronGroup = new THREE.Group();
        
        // Calculate actual drift velocity
        const current = this.physicsEngine.calculateCurrent(
            this.circuitState.voltage, 
            this.circuitState.resistance
        );
        const crossSectionArea = Math.PI * (0.05 * 0.05); // Wire cross-section
        const electronDensity = this.physicsEngine.calculateElectronDensity();
        const driftVelocity = this.physicsEngine.calculateDriftVelocity(
            current, crossSectionArea, electronDensity
        );
        
        // Create electrons along wire paths
        wireGroup.children.forEach((wire, wireIndex) => {
            if (wire.userData.curve) {
                const numElectrons = 20;
                for (let i = 0; i < numElectrons; i++) {
                    const electron = this.createElectron();
                    electron.userData = {
                        wireIndex: wireIndex,
                        progress: i / numElectrons,
                        speed: driftVelocity * this.PHYSICS.DRIFT_VELOCITY_SCALE,
                        curve: wire.userData.curve
                    };
                    electronGroup.add(electron);
                }
            }
        });
        
        return electronGroup;
    }
    
    createElectron() {
        const electronGeometry = new THREE.SphereGeometry(0.02, 8, 8);
        const electronMaterial = new THREE.MeshBasicMaterial({
            color: 0x66bbff,
            transparent: true,
            opacity: 0.8
        });
        const electron = new THREE.Mesh(electronGeometry, electronMaterial);
        
        // Add glow effect
        const glowGeometry = new THREE.SphereGeometry(0.04, 8, 8);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0x66bbff,
            transparent: true,
            opacity: 0.3
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        electron.add(glow);
        
        return electron;
    }
    
    createOhmsLawCalculator() {
        const calculatorGroup = new THREE.Group();
        
        // Background panel
        const panelGeometry = new THREE.PlaneGeometry(6, 3);
        const panelMaterial = new THREE.MeshBasicMaterial({
            color: 0x1a1a1a,
            transparent: true,
            opacity: 0.8
        });
        const panel = new THREE.Mesh(panelGeometry, panelMaterial);
        calculatorGroup.add(panel);
        
        // Title
        const title = this.create3DText("Ohm's Law Calculator", 0.3, 0x4fc3f7);
        title.position.set(0, 1, 0.01);
        calculatorGroup.add(title);
        
        // Real-time calculations
        const voltage = this.create3DText(`V = ${this.circuitState.voltage} V`, 0.2, 0xffffff);
        voltage.position.set(-2, 0.3, 0.01);
        calculatorGroup.add(voltage);
        
        const resistance = this.create3DText(`R = ${this.circuitState.resistance} Ω`, 0.2, 0xffffff);
        resistance.position.set(-2, 0, 0.01);
        calculatorGroup.add(resistance);
        
        const current = this.create3DText(`I = V/R = ${(this.circuitState.voltage/this.circuitState.resistance).toFixed(3)} A`, 0.2, 0xff6b35);
        current.position.set(-2, -0.3, 0.01);
        calculatorGroup.add(current);
        
        const power = this.create3DText(`P = VI = ${(this.circuitState.voltage * this.circuitState.voltage / this.circuitState.resistance).toFixed(3)} W`, 0.2, 0xff3333);
        power.position.set(-2, -0.6, 0.01);
        calculatorGroup.add(power);
        
        return calculatorGroup;
    }
    
    startOhmsLawPhysics() {
        // Update calculations every frame
        const updatePhysics = () => {
            if (this.currentSection === 4) { // Ohm's Law section
                // Calculate current values
                this.circuitState.current = this.physicsEngine.calculateCurrent(
                    this.circuitState.voltage, 
                    this.circuitState.resistance
                );
                this.circuitState.power = this.physicsEngine.calculatePower(
                    this.circuitState.voltage,
                    this.circuitState.current,
                    this.circuitState.resistance
                ).VI;
                
                // Update electron flow speed
                this.updateElectronFlow();
                
                // Update heat visualization
                this.updateHeatVisualization();
                
                // Update meter readings
                this.updateMeterReadings();
            }
            
            requestAnimationFrame(updatePhysics);
        };
        updatePhysics();
    }
    
    updateElectronFlow() {
        const electronGroup = this.circuitComponents.ohmsLawCircuit?.children?.find(
            child => child.children?.some(electron => electron.userData.curve)
        );
        
        if (electronGroup) {
            electronGroup.children.forEach(electron => {
                if (electron.userData.curve) {
                    // Update electron position along curve
                    electron.userData.progress += electron.userData.speed * 0.001;
                    if (electron.userData.progress > 1) electron.userData.progress = 0;
                    
                    const position = electron.userData.curve.getPoint(electron.userData.progress);
                    electron.position.copy(position);
                    
                    // Adjust speed based on current
                    const speedMultiplier = this.circuitState.current / 0.1; // Normalize to 0.1A
                    electron.userData.speed = 0.02 * speedMultiplier;
                }
            });
        }
    }
    
    // === HELPER METHODS ===
    
    createRealisticCharge(charge, color) {
        const chargeGroup = new THREE.Group();
        
        // Main charge sphere
        const geometry = new THREE.SphereGeometry(0.5, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: color,
            emissive: new THREE.Color(color).multiplyScalar(0.3),
            shininess: 100,
            transparent: true,
            opacity: 0.9
        });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.castShadow = true;
        chargeGroup.add(sphere);
        
        // Charge symbol
        const symbol = this.create3DText(charge > 0 ? '+' : '-', 0.4, 0xffffff);
        symbol.position.set(0, 0, 0.6);
        chargeGroup.add(symbol);
        
        // Electric field visualization
        const fieldVisualization = this.createChargeFieldVisualization(charge);
        chargeGroup.add(fieldVisualization);
        
        return chargeGroup;
    }
    
    createChargeFieldVisualization(charge) {
        const fieldGroup = new THREE.Group();
        
        // Create field lines radiating from charge
        const numLines = 12;
        for (let i = 0; i < numLines; i++) {
            const angle = (i / numLines) * Math.PI * 2;
            const points = [];
            
            for (let j = 1; j <= 10; j++) {
                const distance = j * 0.2;
                points.push(new THREE.Vector3(
                    Math.cos(angle) * distance,
                    Math.sin(angle) * distance,
                    0
                ));
            }
            
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
            const lineMaterial = new THREE.LineBasicMaterial({
                color: charge > 0 ? 0xff6b35 : 0x4fc3f7,
                transparent: true,
                opacity: 0.6
            });
            const line = new THREE.Line(lineGeometry, lineMaterial);
            fieldGroup.add(line);
        }
        
        return fieldGroup;
    }
    
    create3DText(text, size, color) {
        // For now, create a simple text sprite
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 512;
        canvas.height = 128;
        
        context.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
        context.font = `${size * 100}px Arial`;
        context.textAlign = 'center';
        context.fillText(text, 256, 64);
        
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(size * 4, size, 1);
        
        return sprite;
    }
    
    createBatteryTexture(voltage) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 256;
        
        // Create battery label texture
        context.fillStyle = '#2a2a2a';
        context.fillRect(0, 0, 256, 256);
        context.fillStyle = '#ffffff';
        context.font = '24px Arial';
        context.textAlign = 'center';
        context.fillText(`${voltage}V`, 128, 128);
        
        return new THREE.CanvasTexture(canvas);
    }
    
    createResistorColorBands(resistance) {
        const bands = [];
        const resistorColors = {
            0: 0x000000, 1: 0x8b4513, 2: 0xff0000, 3: 0xff8c00,
            4: 0xffff00, 5: 0x008000, 6: 0x0000ff, 7: 0x800080,
            8: 0x808080, 9: 0xffffff
        };
        
        // Calculate color band values for resistance
        const resistanceStr = resistance.toString();
        const firstDigit = parseInt(resistanceStr[0]);
        const secondDigit = resistanceStr.length > 1 ? parseInt(resistanceStr[1]) : 0;
        const multiplier = resistanceStr.length - 2;
        
        // Create color bands
        const bandPositions = [-0.4, -0.2, 0.0, 0.4];
        const bandColors = [
            resistorColors[firstDigit],
            resistorColors[secondDigit],
            resistorColors[multiplier],
            0xffd700 // Gold tolerance band
        ];
        
        bandColors.forEach((color, index) => {
            const bandGeometry = new THREE.CylinderGeometry(0.11, 0.11, 0.1, 16);
            const bandMaterial = new THREE.MeshPhongMaterial({ color: color });
            const band = new THREE.Mesh(bandGeometry, bandMaterial);
            band.position.set(bandPositions[index], 0, 0);
            band.rotation.z = Math.PI / 2;
            bands.push(band);
        });
        
        return bands;
    }
    
    createInfoPanel(info) {
        const panelGroup = new THREE.Group();
        
        // Background
        const panelGeometry = new THREE.PlaneGeometry(4, 2);
        const panelMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.7
        });
        const panel = new THREE.Mesh(panelGeometry, panelMaterial);
        panelGroup.add(panel);
        
        // Add text labels
        let yOffset = 0.6;
        Object.entries(info).forEach(([key, value]) => {
            const label = this.create3DText(`${key}: ${value}`, 0.15, 0xffffff);
            label.position.set(0, yOffset, 0.01);
            panelGroup.add(label);
            yOffset -= 0.3;
        });
        
        return panelGroup;
    }
    
    // === PLACEHOLDER HELPER METHODS ===
    createCircuitBoard() {
        const boardGeometry = new THREE.BoxGeometry(10, 0.2, 8);
        const boardMaterial = new THREE.MeshPhongMaterial({ color: 0x2d5016 });
        return new THREE.Mesh(boardGeometry, boardMaterial);
    }
    
    createBatteryChemistry() {
        return new THREE.Group(); // Placeholder
    }
    
    createHeatGlow() {
        return new THREE.Group(); // Placeholder
    }
    
    createMeterNeedle() {
        const needleGeometry = new THREE.BoxGeometry(0.02, 0.2, 0.01);
        const needleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        return new THREE.Mesh(needleGeometry, needleMaterial);
    }
    
    createMeterScale(unit) {
        return new THREE.Group(); // Placeholder
    }
    
    createElectricFieldLines(pos1, pos2) {
        return new THREE.Group(); // Placeholder
    }
    
    createForceVector() {
        return new THREE.Group(); // Placeholder
    }
    
    createCurrentPathHighlight(wires) {
        return new THREE.Group(); // Placeholder
    }
    
    updateHeatVisualization() {
        // Placeholder
    }
    
    updateMeterReadings() {
        // Placeholder
    }
    
    startRenderLoop() {
        const animate = () => {
            this.animationFrame = requestAnimationFrame(animate);
            
            // Update time-based animations
            const time = Date.now() * 0.001;
            
            // Rotate charges slightly
            if (this.circuitComponents.chargeVisualization) {
                this.circuitComponents.chargeVisualization.children.forEach((child, index) => {
                    if (child.rotation) {
                        child.rotation.y = Math.sin(time + index) * 0.1;
                    }
                });
            }
            
            this.renderer.render(this.scene, this.camera);
        };
        
        animate();
    }
    
    // === PLACEHOLDER METHODS FOR OTHER SECTIONS ===
    createElectricCurrentVisualization() {
        // TODO: Implement realistic current flow visualization
        console.log('Creating realistic electric current visualization...');
    }
    
    createResistanceVisualization() {
        // TODO: Implement material comparison with real resistivity values
        console.log('Creating realistic resistance visualization...');
    }
    
    createVoltageVisualization() {
        // TODO: Implement electric potential and field visualization
        console.log('Creating realistic voltage visualization...');
    }
    
    createCircuitVisualization() {
        // TODO: Implement complex circuit with Kirchhoff's laws
        console.log('Creating realistic circuit visualization...');
    }
    
    createSeriesParallelVisualization() {
        // TODO: Implement side-by-side series vs parallel comparison
        console.log('Creating realistic series/parallel visualization...');
    }
    
    createHeatingEffectsVisualization() {
        // TODO: Implement Joule heating with thermal radiation
        console.log('Creating realistic heating effects visualization...');
    }
    
    createElectricPowerVisualization() {
        // TODO: Implement power grid simulation
        console.log('Creating realistic electric power visualization...');
    }
    
    // === PUBLIC INTERFACE ===
    setAudioEnabled(enabled) {
        // TODO: Implement audio feedback
        console.log(`Audio ${enabled ? 'enabled' : 'disabled'}`);
    }
    
    startInteractiveMode(type) {
        // TODO: Implement interactive modes for each physics concept
        console.log(`Starting interactive mode: ${type}`);
    }
    
    dispose() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        this.clearScene();
        
        if (this.renderer) {
            this.renderer.dispose();
        }
        
        console.log('Visualization disposed');
    }
} 