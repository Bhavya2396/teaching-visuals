/**
 * Electric Current - Enhanced 3D Visualization Engine
 * Following REALISTIC_COMPONENTS_LIBRARY.js and CINEMATIC_STYLE_GUIDE.md standards
 * CRITICAL: Experience must flow exactly like new-main.html
 */

// Import THREE.js as ES module
import * as THREE from 'three';

// CRITICAL: Use exact CODATA 2018 values - Match new-main.html
const PHYSICS_CONSTANTS = {
    ELECTRON_CHARGE: 1.602176634e-19,     // C (exact)
    COULOMB_CONSTANT: 8.9875517923e9,     // N⋅m²/C²
    AVOGADRO: 6.02214076e23,              // mol⁻¹ (exact)
    BOLTZMANN: 1.380649e-23,              // J/K (exact)
    PLANCK: 6.62607015e-34,               // J⋅s (exact)
    SPEED_OF_LIGHT: 299792458             // m/s (exact)
};

const MATERIAL_PROPERTIES = {
    COPPER: {
        resistivity: 1.68e-8,        // Ω⋅m at 20°C
        density: 8960,               // kg/m³
        electrons_per_atom: 1,
        temp_coefficient: 0.00393,   // /°C
        thermal_conductivity: 401    // W/(m⋅K)
    }
};

const PHYSICS_COLORS = {
    POSITIVE_CHARGE: 0xff3333,
    NEGATIVE_CHARGE: 0x3333ff,
    COPPER: 0xff6600,
    GOLD: 0xffd700,
    SILVER: 0xc0c0c0,
    CERAMIC: 0xf5deb3,
    PCB_GREEN: 0x2d5016,
    ELECTRIC_FIELD: 0x4fc3f7,
    HEAT_GLOW: 0xff4400,
    ELECTRON_FLOW: 0x66bbff
};

// CRITICAL: Match new-main.html timing exactly
const CINEMATIC_TIMING = {
    loadingDuration: 3000,           // 3 seconds loading sequence
    sectionTransition: 800,          // 0.8s between sections
    cameraMovement: 2000,            // 2s camera transitions
    interactionResponse: 200,        // Max UI feedback delay
    progressUpdate: 'smooth',        // Smooth progress indicators
    fadeInOut: 400,                  // Content fade transitions
    buttonHover: 150,                // Control button hover
    modalAppear: 300                 // Settings/completion modal
};

/**
 * Realistic Component Creation Functions (from REALISTIC_COMPONENTS_LIBRARY.js)
 */

function createRealisticBattery(voltage = 9, type = '9V') {
    const batteryGroup = new THREE.Group();
    batteryGroup.userData.type = 'battery';
    batteryGroup.userData.voltage = voltage;
    
    // 9V Battery dimensions (real world)
    const width = 0.026, height = 0.048, depth = 0.017;
    
    // Black plastic body
    const bodyGeometry = new THREE.BoxGeometry(width, height, depth);
    const bodyMaterial = new THREE.MeshPhongMaterial({
        color: 0x1a1a1a,
        shininess: 30,
        transparent: true,
        opacity: 0.9
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    batteryGroup.add(body);
    
    // Positive terminal (small)
    const posTermGeometry = new THREE.CylinderGeometry(0.003, 0.003, 0.008, 8);
    const posTermMaterial = new THREE.MeshPhongMaterial({ 
        color: PHYSICS_COLORS.GOLD, 
        shininess: 100 
    });
    const posTerm = new THREE.Mesh(posTermGeometry, posTermMaterial);
    posTerm.position.set(0.006, height/2 + 0.004, 0);
    batteryGroup.add(posTerm);
    
    // Negative terminal (larger)
    const negTermGeometry = new THREE.CylinderGeometry(0.005, 0.005, 0.008, 8);
    const negTermMaterial = new THREE.MeshPhongMaterial({ 
        color: PHYSICS_COLORS.SILVER, 
        shininess: 80 
    });
    const negTerm = new THREE.Mesh(negTermGeometry, negTermMaterial);
    negTerm.position.set(-0.006, height/2 + 0.004, 0);
    batteryGroup.add(negTerm);
    
    // Voltage label
    const voltageLabel = createPhysicsText(`${voltage}V`, 0.004, 0xffffff);
    voltageLabel.position.set(0, 0, depth/2 + 0.001);
    batteryGroup.add(voltageLabel);
    
    return batteryGroup;
}

function createRealisticResistor(resistance, tolerance = 5, wattage = 0.25) {
    const resistorGroup = new THREE.Group();
    resistorGroup.userData.type = 'resistor';
    resistorGroup.userData.resistance = resistance;
    
    // Size based on wattage
    const size = wattage <= 0.25 ? 
        { radius: 0.001, length: 0.003 } : 
        { radius: 0.0015, length: 0.004 };
    
    // Ceramic body
    const bodyGeometry = new THREE.CylinderGeometry(size.radius, size.radius, size.length, 16);
    const bodyMaterial = new THREE.MeshPhongMaterial({
        color: PHYSICS_COLORS.CERAMIC,
        shininess: 20
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.rotation.z = Math.PI / 2;
    resistorGroup.add(body);
    
    // Color bands for resistance value
    const colorBands = calculateResistorColorBands(resistance, tolerance);
    colorBands.forEach((color, index) => {
        const bandGeometry = new THREE.CylinderGeometry(size.radius * 1.05, size.radius * 1.05, size.length * 0.08, 12);
        const bandMaterial = new THREE.MeshPhongMaterial({ color: color, shininess: 50 });
        const band = new THREE.Mesh(bandGeometry, bandMaterial);
        
        const bandSpacing = size.length * 0.15;
        band.position.x = -size.length/2 + bandSpacing * (index + 1);
        band.rotation.z = Math.PI / 2;
        resistorGroup.add(band);
    });
    
    // Wire leads
    const wireGeometry = new THREE.CylinderGeometry(0.0002, 0.0002, 0.01, 8);
    const wireMaterial = new THREE.MeshPhongMaterial({ color: PHYSICS_COLORS.COPPER, shininess: 80 });
    
    const leftWire = new THREE.Mesh(wireGeometry, wireMaterial);
    leftWire.position.set(-size.length/2 - 0.005, 0, 0);
    leftWire.rotation.z = Math.PI / 2;
    resistorGroup.add(leftWire);
    
    const rightWire = new THREE.Mesh(wireGeometry, wireMaterial);
    rightWire.position.set(size.length/2 + 0.005, 0, 0);
    rightWire.rotation.z = Math.PI / 2;
    resistorGroup.add(rightWire);
    
    return resistorGroup;
}

function createRealisticWire(startPoint, endPoint, gauge = 22, color = 'red') {
    const wireGroup = new THREE.Group();
    
    // Wire core (copper) - Fixed: Use MeshStandardMaterial for metalness
    const wireRadius = getWireRadius(gauge);
    const wireLength = startPoint.distanceTo(endPoint);
    
    const coreGeometry = new THREE.CylinderGeometry(wireRadius * 0.8, wireRadius * 0.8, wireLength, 12);
    const coreMaterial = new THREE.MeshStandardMaterial({
        color: PHYSICS_COLORS.COPPER,
        roughness: 0.2,
        metalness: 0.8
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    
    // Position wire between points
    const direction = new THREE.Vector3().subVectors(endPoint, startPoint);
    const orientation = new THREE.Matrix4().lookAt(startPoint, endPoint, new THREE.Object3D().up);
    core.applyMatrix4(orientation);
    core.position.copy(startPoint.clone().add(direction.clone().multiplyScalar(0.5)));
    
    wireGroup.add(core);
    
    // Insulation
    const insulationColors = {
        'red': 0xff0000,
        'black': 0x000000,
        'blue': 0x0000ff,
        'green': 0x00ff00,
        'yellow': 0xffff00,
        'white': 0xffffff
    };
    
    const insulationGeometry = new THREE.CylinderGeometry(wireRadius, wireRadius, wireLength, 12);
    const insulationMaterial = new THREE.MeshPhongMaterial({
        color: insulationColors[color] || 0xff0000,
        shininess: 10,
        transparent: true,
        opacity: 0.8
    });
    const insulation = new THREE.Mesh(insulationGeometry, insulationMaterial);
    insulation.applyMatrix4(orientation);
    insulation.position.copy(core.position);
    
    wireGroup.add(insulation);
    
    return wireGroup;
}

function createRealisticAmmeter(current = 0, type = 'digital') {
    const meterGroup = new THREE.Group();
    meterGroup.userData.type = 'ammeter';
    meterGroup.userData.current = current;
    
    // Meter body
    const bodyGeometry = new THREE.BoxGeometry(0.04, 0.03, 0.015);
    const bodyMaterial = new THREE.MeshPhongMaterial({
        color: 0x2a2a2a,
        shininess: 30
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    meterGroup.add(body);
    
    // Display screen - Fixed: Use MeshPhongMaterial for emissive
    const screenGeometry = new THREE.PlaneGeometry(0.025, 0.015);
    const screenMaterial = new THREE.MeshPhongMaterial({
        color: 0x001100,
        emissive: 0x002200,
        emissiveIntensity: 0.5
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(0, 0, 0.008);
    meterGroup.add(screen);
    
    // Current reading
    const currentText = createDigitalDisplay(`${current.toFixed(3)}A`);
    currentText.position.set(0, 0, 0.009);
    currentText.scale.set(0.002, 0.002, 0.002);
    meterGroup.add(currentText);
    
    // Terminal posts
    const terminalGeometry = new THREE.CylinderGeometry(0.002, 0.002, 0.005, 8);
    const terminalMaterial = new THREE.MeshPhongMaterial({
        color: PHYSICS_COLORS.GOLD,
        shininess: 100
    });
    
    const posTerminal = new THREE.Mesh(terminalGeometry, terminalMaterial);
    posTerminal.position.set(0.015, -0.02, 0);
    meterGroup.add(posTerminal);
    
    const negTerminal = new THREE.Mesh(terminalGeometry, terminalMaterial);
    negTerminal.position.set(-0.015, -0.02, 0);
    meterGroup.add(negTerminal);
    
    return meterGroup;
}

function createRealisticLED(color = 'red', current = 0.02) {
    const ledGroup = new THREE.Group();
    ledGroup.userData.type = 'led';
    ledGroup.userData.current = current;
    
    // LED package body
    const bodyGeometry = new THREE.CylinderGeometry(0.0025, 0.0025, 0.004, 8);
    const bodyMaterial = new THREE.MeshPhongMaterial({
        color: 0xf0f0f0,
        shininess: 60,
        transparent: true,
        opacity: 0.9
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    ledGroup.add(body);
    
    // LED dome - Fixed: Use MeshPhongMaterial for emissive
    const domeGeometry = new THREE.SphereGeometry(0.002, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2);
    const ledColors = {
        'red': 0xff0000,
        'green': 0x00ff00,
        'blue': 0x0000ff,
        'white': 0xffffff,
        'yellow': 0xffff00
    };
    
    const domeMaterial = new THREE.MeshPhongMaterial({
        color: ledColors[color] || 0xff0000,
        shininess: 100,
        transparent: true,
        opacity: 0.8,
        emissive: current > 0 ? ledColors[color] || 0xff0000 : 0x000000,
        emissiveIntensity: current * 10
    });
    const dome = new THREE.Mesh(domeGeometry, domeMaterial);
    dome.position.y = 0.002;
    ledGroup.add(dome);
    
    // LED leads
    const leadGeometry = new THREE.CylinderGeometry(0.0003, 0.0003, 0.008, 6);
    const leadMaterial = new THREE.MeshPhongMaterial({
        color: PHYSICS_COLORS.SILVER,
        shininess: 80
    });
    
    const anode = new THREE.Mesh(leadGeometry, leadMaterial);
    anode.position.set(0.001, -0.006, 0);
    ledGroup.add(anode);
    
    const cathode = new THREE.Mesh(leadGeometry, leadMaterial);
    cathode.position.set(-0.001, -0.006, 0);
    ledGroup.add(cathode);
    
    return ledGroup;
}

/**
 * Helper Functions
 */

function calculateResistorColorBands(resistance, tolerance) {
    const colors = [
        0x000000, // Black - 0
        0x964B00, // Brown - 1
        0xff0000, // Red - 2
        0xffa500, // Orange - 3
        0xffff00, // Yellow - 4
        0x00ff00, // Green - 5
        0x0000ff, // Blue - 6
        0x8a2be2, // Violet - 7
        0x808080, // Gray - 8
        0xffffff  // White - 9
    ];
    
    const toleranceColors = {
        1: 0x964B00,   // Brown
        2: 0xff0000,   // Red
        5: 0xffd700,   // Gold
        10: 0xc0c0c0   // Silver
    };
    
    // Convert resistance to bands
    let value = resistance;
    let multiplier = 0;
    
    while (value >= 100) {
        value /= 10;
        multiplier++;
    }
    
    const digit1 = Math.floor(value / 10);
    const digit2 = Math.floor(value % 10);
    
    return [
        colors[digit1],
        colors[digit2],
        colors[multiplier],
        toleranceColors[tolerance] || 0xffd700
    ];
}

function getWireRadius(gauge) {
    // AWG to metric conversion (approximate)
    const awgToRadius = {
        12: 0.001, 14: 0.0008, 16: 0.0006, 18: 0.0005,
        20: 0.0004, 22: 0.0003, 24: 0.0002, 26: 0.00015
    };
    return awgToRadius[gauge] || 0.0003;
}

function createPhysicsText(text, size, color) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 128;
    
    context.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
    context.font = `bold ${Math.floor(size * 10000)}px Arial`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, 128, 64);
    
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(size * 10, size * 5, 1);
    
    return sprite;
}

function createDigitalDisplay(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 50;
    
    context.fillStyle = '#00ff00';
    context.font = 'bold 20px monospace';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, 100, 25);
    
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    
    return sprite;
}

/**
 * Main Enhanced 3D Visualization Class
 */
class EnhancedCurrentVisualization {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.currentSection = 0;
        this.totalSections = 8;
        
        // Physics components
        this.battery = null;
        this.resistor = null;
        this.ammeter = null;
        this.led = null;
        this.wires = [];
        this.electrons = [];
        
        // Animation controls
        this.animationId = null;
        this.currentFlow = 0.1; // Amperes
        this.electronSpeed = 0.02;
        
        // Camera positions for each section
        this.cameraPositions = [
            { position: new THREE.Vector3(0, 0.1, 0.2), target: new THREE.Vector3(0, 0, 0) },
            { position: new THREE.Vector3(-0.1, 0.08, 0.15), target: new THREE.Vector3(-0.05, 0, 0) },
            { position: new THREE.Vector3(0, 0.12, 0.18), target: new THREE.Vector3(0, 0, 0) },
            { position: new THREE.Vector3(0.08, 0.1, 0.15), target: new THREE.Vector3(0.04, 0, 0) },
            { position: new THREE.Vector3(-0.06, 0.06, 0.12), target: new THREE.Vector3(-0.03, 0, 0) },
            { position: new THREE.Vector3(0, 0.15, 0.16), target: new THREE.Vector3(0, 0, 0) },
            { position: new THREE.Vector3(0.1, 0.12, 0.2), target: new THREE.Vector3(0, 0, 0) },
            { position: new THREE.Vector3(0, 0.2, 0.25), target: new THREE.Vector3(0, 0, 0) }
        ];
        
        this.init();
    }
    
    init() {
        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createLighting();
        this.createRealisticCircuit();
        this.startAnimation();
    }
    
    createScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0e1a);
        this.scene.fog = new THREE.Fog(0x0a0e1a, 0.5, 2);
    }
    
    createCamera() {
        const canvas = document.getElementById('charge-canvas');
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.001,
            10
        );
        this.camera.position.copy(this.cameraPositions[0].position);
        this.camera.lookAt(this.cameraPositions[0].target);
    }
    
    createRenderer() {
        const canvas = document.getElementById('charge-canvas');
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvas,
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x0a0e1a, 0.0);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
    }
    
    createLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);
        
        // Main light
        const mainLight = new THREE.DirectionalLight(0xffffff, 1.0);
        mainLight.position.set(0.2, 0.2, 0.1);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        this.scene.add(mainLight);
        
        // Fill light
        const fillLight = new THREE.DirectionalLight(0x4fc3f7, 0.3);
        fillLight.position.set(-0.1, 0.1, -0.1);
        this.scene.add(fillLight);
        
        // Rim light
        const rimLight = new THREE.DirectionalLight(0xff6b35, 0.2);
        rimLight.position.set(0, -0.1, 0.2);
        this.scene.add(rimLight);
    }
    
    createRealisticCircuit() {
        // Create 9V battery
        this.battery = createRealisticBattery(9, '9V');
        this.battery.position.set(-0.08, 0, 0);
        this.scene.add(this.battery);
        
        // Create 220Ω resistor
        this.resistor = createRealisticResistor(220, 5, 0.25);
        this.resistor.position.set(0, 0, 0);
        this.scene.add(this.resistor);
        
        // Create ammeter
        this.ammeter = createRealisticAmmeter(this.currentFlow);
        this.ammeter.position.set(0.06, 0, 0);
        this.ammeter.rotation.y = Math.PI / 2;
        this.scene.add(this.ammeter);
        
        // Create LED
        this.led = createRealisticLED('red', this.currentFlow);
        this.led.position.set(0.04, 0, -0.03);
        this.scene.add(this.led);
        
        // Create connecting wires
        this.createCircuitWires();
        
        // Create electron flow visualization
        this.createElectronFlow();
    }
    
    createCircuitWires() {
        // Wire from battery positive to resistor
        const wire1 = createRealisticWire(
            new THREE.Vector3(-0.07, 0, 0),
            new THREE.Vector3(-0.015, 0, 0),
            22, 'red'
        );
        this.wires.push(wire1);
        this.scene.add(wire1);
        
        // Wire from resistor to ammeter
        const wire2 = createRealisticWire(
            new THREE.Vector3(0.015, 0, 0),
            new THREE.Vector3(0.045, 0, 0),
            22, 'red'
        );
        this.wires.push(wire2);
        this.scene.add(wire2);
        
        // Wire from ammeter to LED
        const wire3 = createRealisticWire(
            new THREE.Vector3(0.06, -0.015, 0),
            new THREE.Vector3(0.04, -0.015, 0),
            22, 'red'
        );
        this.wires.push(wire3);
        this.scene.add(wire3);
        
        // Wire from LED to battery negative
        const wire4 = createRealisticWire(
            new THREE.Vector3(0.04, -0.015, 0),
            new THREE.Vector3(-0.07, -0.015, 0),
            22, 'black'
        );
        this.wires.push(wire4);
        this.scene.add(wire4);
    }
    
    createElectronFlow() {
        // Create circuit path for electron flow
        const circuitPath = [
            new THREE.Vector3(-0.07, 0, 0),     // Battery positive
            new THREE.Vector3(-0.015, 0, 0),    // Resistor input
            new THREE.Vector3(0.015, 0, 0),     // Resistor output
            new THREE.Vector3(0.045, 0, 0),     // Ammeter input
            new THREE.Vector3(0.06, -0.015, 0), // Ammeter output
            new THREE.Vector3(0.04, -0.015, 0), // LED positive
            new THREE.Vector3(-0.07, -0.015, 0) // Battery negative
        ];
        
        // Create curve for smooth electron movement
        this.circuitCurve = new THREE.CatmullRomCurve3(circuitPath);
        this.circuitCurve.closed = true;
        
        // Create electrons
        const electronCount = 30;
        for (let i = 0; i < electronCount; i++) {
            const electronGeometry = new THREE.SphereGeometry(0.0005, 8, 8);
            const electronMaterial = new THREE.MeshPhongMaterial({
                color: PHYSICS_COLORS.ELECTRON_FLOW,
                emissive: new THREE.Color(PHYSICS_COLORS.ELECTRON_FLOW).multiplyScalar(0.3)
            });
            
            const electron = new THREE.Mesh(electronGeometry, electronMaterial);
            electron.userData.t = i / electronCount;
            
            const position = this.circuitCurve.getPointAt(electron.userData.t);
            electron.position.copy(position);
            
            this.electrons.push(electron);
            this.scene.add(electron);
        }
    }
    
    updateSection(sectionIndex) {
        this.currentSection = sectionIndex;
        
        // Update physics based on section
        switch(sectionIndex) {
            case 0: // Current Fundamentals
                this.currentFlow = 0.1;
                this.electronSpeed = 0.02;
                break;
            case 1: // Electron Drift
                this.electronSpeed = 0.01; // Slower to show drift
                break;
            case 2: // Ohm's Law
                this.currentFlow = 0.15;
                this.electronSpeed = 0.025;
                break;
            case 3: // Power Dissipation
                this.addHeatVisualization();
                break;
            case 4: // Current Direction
                this.showCurrentDirection();
                break;
            case 5: // Current Density
                this.showCurrentDensity();
                break;
            case 6: // AC vs DC
                this.demonstrateAC();
                break;
            case 7: // Technology Foundation
                this.showCompleteSystem();
                break;
        }
        
        // Update component values
        this.updateComponentValues();
        
        // Animate camera
        this.animateCameraToSection(sectionIndex);
    }
    
    updateComponentValues() {
        // Update ammeter reading
        if (this.ammeter) {
            // Remove old display
            const oldDisplay = this.ammeter.children.find(child => 
                child.userData && child.userData.type === 'display'
            );
            if (oldDisplay) {
                this.ammeter.remove(oldDisplay);
            }
            
            // Add new display
            const newDisplay = createDigitalDisplay(`${this.currentFlow.toFixed(3)}A`);
            newDisplay.position.set(0, 0, 0.009);
            newDisplay.scale.set(0.002, 0.002, 0.002);
            newDisplay.userData.type = 'display';
            this.ammeter.add(newDisplay);
        }
        
        // Update LED brightness
        if (this.led) {
            const dome = this.led.children.find(child => 
                child.geometry && child.geometry.type === 'SphereGeometry'
            );
            if (dome) {
                dome.material.emissiveIntensity = this.currentFlow * 10;
            }
        }
    }
    
    addHeatVisualization() {
        // Add heat glow to resistor
        if (this.resistor) {
            const body = this.resistor.children[0];
            body.material.emissive = new THREE.Color(PHYSICS_COLORS.HEAT_GLOW).multiplyScalar(0.1);
        }
    }
    
    showCurrentDirection() {
        // Create arrows showing current direction
        const arrowGeometry = new THREE.ConeGeometry(0.001, 0.003, 8);
        const arrowMaterial = new THREE.MeshPhongMaterial({
            color: 0xffff00,
            emissive: new THREE.Color(0xffff00).multiplyScalar(0.2)
        });
        
        for (let i = 0; i < 5; i++) {
            const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
            const t = i / 5;
            const position = this.circuitCurve.getPointAt(t);
            arrow.position.copy(position);
            arrow.position.y += 0.01;
            this.scene.add(arrow);
        }
    }
    
    showCurrentDensity() {
        // Increase electron density visualization
        this.electrons.forEach((electron, index) => {
            if (index % 2 === 0) {
                electron.scale.setScalar(1.5);
            }
        });
    }
    
    demonstrateAC() {
        // Show AC oscillation
        this.acMode = true;
    }
    
    showCompleteSystem() {
        // Reset to clean state for finale
        if (this.resistor) {
            const body = this.resistor.children[0];
            body.material.emissive = new THREE.Color(0x000000);
        }
        this.electrons.forEach(electron => {
            electron.scale.setScalar(1);
        });
        this.acMode = false;
    }
    
    animateCameraToSection(sectionIndex) {
        if (!this.cameraPositions[sectionIndex]) return;
        
        const targetPos = this.cameraPositions[sectionIndex];
        const startPos = this.camera.position.clone();
        const startTarget = new THREE.Vector3(0, 0, 0);
        
        // Simple linear interpolation for camera movement
        const duration = CINEMATIC_TIMING.cameraMovement;
        const startTime = Date.now();
        
        const animateCamera = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease in-out cubic
            const eased = progress < 0.5 ? 
                4 * progress * progress * progress : 
                1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            this.camera.position.lerpVectors(startPos, targetPos.position, eased);
            this.camera.lookAt(startTarget.lerp(targetPos.target, eased));
            
            if (progress < 1) {
                requestAnimationFrame(animateCamera);
            }
        };
        
        animateCamera();
    }
    
    animateElectrons() {
        this.electrons.forEach(electron => {
            // Update position along circuit
            const speed = this.acMode ? 
                this.electronSpeed * Math.sin(Date.now() * 0.003) :
                this.electronSpeed;
                
            electron.userData.t += speed;
            
            if (electron.userData.t > 1) electron.userData.t = 0;
            if (electron.userData.t < 0) electron.userData.t = 1;
            
            const newPosition = this.circuitCurve.getPointAt(electron.userData.t);
            electron.position.copy(newPosition);
            
            // Add thermal motion
            electron.position.x += Math.sin(Date.now() * 0.01 + electron.userData.t * 20) * 0.0002;
            electron.position.y += Math.cos(Date.now() * 0.008 + electron.userData.t * 15) * 0.0002;
            electron.position.z += Math.sin(Date.now() * 0.012 + electron.userData.t * 25) * 0.0001;
            
            // Pulsing glow
            const glowIntensity = 0.3 + Math.sin(Date.now() * 0.01 + electron.userData.t * 10) * 0.1;
            electron.material.emissive = new THREE.Color(PHYSICS_COLORS.ELECTRON_FLOW).multiplyScalar(glowIntensity);
        });
    }
    
    startAnimation() {
        const animate = () => {
            this.animationId = requestAnimationFrame(animate);
            
            // Animate electrons
            this.animateElectrons();
            
            // Pulse LED if current is flowing
            if (this.led && this.currentFlow > 0) {
                const dome = this.led.children.find(child => 
                    child.geometry && child.geometry.type === 'SphereGeometry'
                );
                if (dome) {
                    const pulse = 0.8 + Math.sin(Date.now() * 0.02) * 0.2;
                    dome.material.emissiveIntensity = this.currentFlow * 10 * pulse;
                }
            }
            
            this.renderer.render(this.scene, this.camera);
        };
        
        animate();
    }
    
    handleResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    dispose() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        this.scene.traverse((object) => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => material.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });
        
        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}

// Initialize visualization
let currentVisualization = null;

// Wait for DOM and THREE.js to load
function initVisualization() {
    const canvas = document.getElementById('charge-canvas');
    if (canvas) {
        currentVisualization = new EnhancedCurrentVisualization();
        
        // Handle resize
        window.addEventListener('resize', () => {
            if (currentVisualization) {
                currentVisualization.handleResize();
            }
        });
        
        console.log('Enhanced current visualization initialized');
    } else {
        setTimeout(initVisualization, 100);
    }
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVisualization);
} else {
    initVisualization();
}

// Handle cleanup
window.addEventListener('beforeunload', () => {
    if (currentVisualization) {
        currentVisualization.dispose();
    }
});

// Export for use in other scripts
window.currentVisualization = currentVisualization; 