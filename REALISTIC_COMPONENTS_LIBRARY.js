/**
 * Realistic Components Library for Physics Visualizations
 * Complete reference implementation for AI agents
 * Version: 1.0.0
 */

// Physics constants and material properties
const PHYSICS_CONSTANTS = {
    ELECTRON_CHARGE: 1.602176634e-19,
    ELECTRON_MASS: 9.1093837015e-31,
    AVOGADRO: 6.02214076e23,
    COULOMB_CONSTANT: 8.9875517923e9
};

const MATERIAL_PROPERTIES = {
    COPPER: { resistivity: 1.68e-8, density: 8960, electrons_per_atom: 1 },
    ALUMINUM: { resistivity: 2.65e-8, density: 2700, electrons_per_atom: 3 },
    GOLD: { resistivity: 2.44e-8, density: 19300, electrons_per_atom: 1 },
    SILVER: { resistivity: 1.59e-8, density: 10490, electrons_per_atom: 1 }
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

/**
 * ============================================================================
 * ELECTRICAL COMPONENTS - EXACT IMPLEMENTATIONS
 * ============================================================================
 */

/**
 * Creates a hyperrealistic battery with proper proportions and materials
 * @param {number} voltage - Battery voltage (1.5, 3.7, 9, 12, etc.)
 * @param {string} type - Battery type ('AA', 'D', '9V', 'lithium', 'car')
 * @param {Object} options - Additional configuration
 * @returns {THREE.Group} Complete battery assembly
 */
function createRealisticBattery(voltage, type = 'AA', options = {}) {
    const batteryGroup = new THREE.Group();
    batteryGroup.userData.type = 'battery';
    batteryGroup.userData.voltage = voltage;
    
    // Real battery dimensions (in meters)
    const specifications = {
        'AA': { radius: 0.0075, height: 0.0505, color: 0x2a2a2a },
        'D': { radius: 0.0165, height: 0.0615, color: 0x2a2a2a },
        '9V': { width: 0.026, height: 0.048, depth: 0.017, color: 0x1a1a1a },
        'lithium': { radius: 0.009, height: 0.0185, color: 0x4a4a4a },
        'car': { width: 0.26, height: 0.17, depth: 0.21, color: 0x000000 }
    };
    
    const spec = specifications[type] || specifications['AA'];
    
    if (type === '9V' || type === 'car') {
        // Rectangular battery
        const bodyGeometry = new THREE.BoxGeometry(spec.width, spec.height, spec.depth);
        const bodyMaterial = new THREE.MeshPhongMaterial({
            color: spec.color,
            shininess: 30,
            transparent: true,
            opacity: 0.9
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        batteryGroup.add(body);
        
        // Terminals for rectangular batteries
        if (type === '9V') {
            // Small terminals on top
            const posTermGeometry = new THREE.CylinderGeometry(0.003, 0.003, 0.008, 8);
            const posTermMaterial = new THREE.MeshPhongMaterial({ color: PHYSICS_COLORS.GOLD, shininess: 100 });
            const posTerm = new THREE.Mesh(posTermGeometry, posTermMaterial);
            posTerm.position.set(0.006, spec.height/2 + 0.004, 0);
            batteryGroup.add(posTerm);
            
            const negTerm = posTerm.clone();
            negTerm.position.set(-0.006, spec.height/2 + 0.004, 0);
            negTerm.material = new THREE.MeshPhongMaterial({ color: PHYSICS_COLORS.SILVER, shininess: 80 });
            batteryGroup.add(negTerm);
        } else {
            // Car battery terminals
            const terminalSize = 0.02;
            const posTermGeometry = new THREE.CylinderGeometry(terminalSize, terminalSize, 0.015, 8);
            const posTermMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 50 });
            const posTerm = new THREE.Mesh(posTermGeometry, posTermMaterial);
            posTerm.position.set(spec.width*0.25, spec.height/2 + 0.008, 0);
            batteryGroup.add(posTerm);
            
            const negTerm = posTerm.clone();
            negTerm.position.set(-spec.width*0.25, spec.height/2 + 0.008, 0);
            negTerm.material = new THREE.MeshPhongMaterial({ color: 0x000000, shininess: 50 });
            batteryGroup.add(negTerm);
        }
    } else {
        // Cylindrical battery
        const bodyGeometry = new THREE.CylinderGeometry(spec.radius, spec.radius, spec.height, 16);
        const bodyMaterial = new THREE.MeshPhongMaterial({
            color: spec.color,
            shininess: 30,
            map: createBatteryTexture(type, voltage)
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        batteryGroup.add(body);
        
        // Positive terminal (always slightly larger)
        const posTermGeometry = new THREE.CylinderGeometry(spec.radius*0.3, spec.radius*0.3, spec.radius*0.3, 8);
        const posTermMaterial = new THREE.MeshPhongMaterial({
            color: PHYSICS_COLORS.GOLD,
            shininess: 100,
            metalness: 0.8
        });
        const posTerm = new THREE.Mesh(posTermGeometry, posTermMaterial);
        posTerm.position.y = spec.height/2 + spec.radius*0.15;
        batteryGroup.add(posTerm);
        
        // Negative terminal (flat)
        const negTermGeometry = new THREE.CylinderGeometry(spec.radius*0.8, spec.radius*0.8, spec.radius*0.1, 12);
        const negTermMaterial = new THREE.MeshPhongMaterial({
            color: PHYSICS_COLORS.SILVER,
            shininess: 80,
            metalness: 0.7
        });
        const negTerm = new THREE.Mesh(negTermGeometry, negTermMaterial);
        negTerm.position.y = -(spec.height/2 + spec.radius*0.05);
        batteryGroup.add(negTerm);
    }
    
    // Voltage label
    const voltageLabel = createPhysicsText(`${voltage}V`, spec.radius || spec.width/4, 0xffffff);
    voltageLabel.position.set(0, 0, (spec.radius || spec.depth/2) + 0.001);
    batteryGroup.add(voltageLabel);
    
    // Brand marking (generic)
    const brandLabel = createPhysicsText('PHYSICS', (spec.radius || spec.width/4) * 0.7, 0xcccccc);
    brandLabel.position.set(0, -(spec.radius || spec.height/4), (spec.radius || spec.depth/2) + 0.001);
    batteryGroup.add(brandLabel);
    
    return batteryGroup;
}

/**
 * Creates a hyperrealistic resistor with accurate color coding
 * @param {number} resistance - Resistance value in ohms
 * @param {number} tolerance - Tolerance percentage (1, 2, 5, 10)
 * @param {number} wattage - Power rating in watts (0.125, 0.25, 0.5, 1, 2, 5)
 * @returns {THREE.Group} Complete resistor assembly
 */
function createRealisticResistor(resistance, tolerance = 5, wattage = 0.25) {
    const resistorGroup = new THREE.Group();
    resistorGroup.userData.type = 'resistor';
    resistorGroup.userData.resistance = resistance;
    resistorGroup.userData.tolerance = tolerance;
    resistorGroup.userData.wattage = wattage;
    
    // Size based on wattage rating (real dimensions)
    const sizeSpecs = {
        0.125: { radius: 0.0008, length: 0.002 },
        0.25: { radius: 0.001, length: 0.003 },
        0.5: { radius: 0.0015, length: 0.004 },
        1: { radius: 0.002, length: 0.006 },
        2: { radius: 0.0025, length: 0.008 },
        5: { radius: 0.003, length: 0.012 }
    };
    
    const size = sizeSpecs[wattage] || sizeSpecs[0.25];
    
    // Ceramic body
    const bodyGeometry = new THREE.CylinderGeometry(size.radius, size.radius, size.length, 16);
    const bodyMaterial = new THREE.MeshPhongMaterial({
        color: PHYSICS_COLORS.CERAMIC,
        shininess: 20,
        map: createCeramicTexture()
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.rotation.z = Math.PI / 2;
    resistorGroup.add(body);
    
    // Calculate color bands
    const colorBands = calculateResistorColorBands(resistance, tolerance);
    
    // Create color bands
    colorBands.forEach((color, index) => {
        const bandGeometry = new THREE.CylinderGeometry(size.radius * 1.05, size.radius * 1.05, size.length * 0.08, 12);
        const bandMaterial = new THREE.MeshPhongMaterial({ 
            color: color,
            shininess: 50
        });
        const band = new THREE.Mesh(bandGeometry, bandMaterial);
        
        // Position bands correctly
        const bandSpacing = size.length * 0.15;
        const startPos = -size.length * 0.3;
        band.position.set(startPos + (index * bandSpacing), 0, 0);
        band.rotation.z = Math.PI / 2;
        resistorGroup.add(band);
    });
    
    // Metal leads (tinned copper)
    const leadGeometry = new THREE.CylinderGeometry(size.radius * 0.2, size.radius * 0.2, size.length * 0.8, 8);
    const leadMaterial = new THREE.MeshPhongMaterial({
        color: PHYSICS_COLORS.SILVER,
        shininess: 100,
        metalness: 0.9
    });
    
    const leftLead = new THREE.Mesh(leadGeometry, leadMaterial);
    leftLead.position.set(-(size.length * 0.9), 0, 0);
    leftLead.rotation.z = Math.PI / 2;
    resistorGroup.add(leftLead);
    
    const rightLead = leftLead.clone();
    rightLead.position.set(size.length * 0.9, 0, 0);
    resistorGroup.add(rightLead);
    
    // Value label (readable)
    const valueText = formatResistanceValue(resistance);
    const valueLabel = createPhysicsText(valueText, size.radius * 2, 0x000000);
    valueLabel.position.set(0, size.radius * 1.5, 0);
    resistorGroup.add(valueLabel);
    
    return resistorGroup;
}

/**
 * Creates realistic copper wire with proper insulation and gauge
 * @param {Array} points - Array of THREE.Vector3 points defining wire path
 * @param {number} gauge - AWG wire gauge (12, 14, 16, 18, 20, 22)
 * @param {string} insulationColor - Insulation color ('red', 'black', 'white', 'green')
 * @returns {THREE.Group} Complete wire assembly
 */
function createRealisticWire(points, gauge = 22, insulationColor = 'red') {
    const wireGroup = new THREE.Group();
    wireGroup.userData.type = 'wire';
    wireGroup.userData.gauge = gauge;
    
    // AWG specifications (real dimensions)
    const awgSpecs = {
        12: { diameter: 0.002053, current: 20, insulation: 0.0003 },
        14: { diameter: 0.001628, current: 15, insulation: 0.00025 },
        16: { diameter: 0.001291, current: 13, insulation: 0.0002 },
        18: { diameter: 0.001024, current: 10, insulation: 0.00015 },
        20: { diameter: 0.000812, current: 7, insulation: 0.0001 },
        22: { diameter: 0.000644, current: 5, insulation: 0.00008 }
    };
    
    const spec = awgSpecs[gauge] || awgSpecs[22];
    
    // Insulation colors
    const insulationColors = {
        'red': 0xff0000,
        'black': 0x000000,
        'white': 0xffffff,
        'green': 0x00ff00,
        'blue': 0x0000ff,
        'yellow': 0xffff00
    };
    
    // Create wire curve
    const curve = new THREE.CatmullRomCurve3(points);
    
    // Copper conductor core
    const conductorGeometry = new THREE.TubeGeometry(curve, 32, spec.diameter/2, 8, false);
    const conductorMaterial = new THREE.MeshPhongMaterial({
        color: PHYSICS_COLORS.COPPER,
        shininess: 80,
        metalness: 0.7
    });
    const conductor = new THREE.Mesh(conductorGeometry, conductorMaterial);
    wireGroup.add(conductor);
    
    // Insulation layer
    const insulationGeometry = new THREE.TubeGeometry(curve, 32, (spec.diameter/2) + spec.insulation, 8, false);
    const insulationMaterial = new THREE.MeshPhongMaterial({
        color: insulationColors[insulationColor] || insulationColors['red'],
        shininess: 10,
        transparent: true,
        opacity: 0.8
    });
    const insulation = new THREE.Mesh(insulationGeometry, insulationMaterial);
    wireGroup.add(insulation);
    
    // Store curve for electron flow animation
    wireGroup.userData.curve = curve;
    wireGroup.userData.currentCapacity = spec.current;
    
    return wireGroup;
}

/**
 * Creates a hyperrealistic ammeter with digital display
 * @param {number} current - Current reading in amperes
 * @param {string} type - Meter type ('analog', 'digital')
 * @returns {THREE.Group} Complete ammeter assembly
 */
function createRealisticAmmeter(current, type = 'digital') {
    const ammeterGroup = new THREE.Group();
    ammeterGroup.userData.type = 'ammeter';
    ammeterGroup.userData.reading = current;
    
    // Meter housing
    const housingGeometry = new THREE.BoxGeometry(0.08, 0.06, 0.04);
    const housingMaterial = new THREE.MeshPhongMaterial({
        color: 0x2a2a2a,
        shininess: 30
    });
    const housing = new THREE.Mesh(housingGeometry, housingMaterial);
    ammeterGroup.add(housing);
    
    if (type === 'digital') {
        // Digital display
        const displayGeometry = new THREE.PlaneGeometry(0.06, 0.03);
        const displayMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000,
            map: createDigitalDisplay(current.toFixed(3) + 'A')
        });
        const display = new THREE.Mesh(displayGeometry, displayMaterial);
        display.position.set(0, 0, 0.021);
        ammeterGroup.add(display);
    } else {
        // Analog meter face
        const faceGeometry = new THREE.CircleGeometry(0.025, 32);
        const faceMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: createAnalogMeterFace('AMPERES')
        });
        const face = new THREE.Mesh(faceGeometry, faceMaterial);
        face.position.set(0, 0, 0.021);
        ammeterGroup.add(face);
        
        // Meter needle
        const needleGeometry = new THREE.BoxGeometry(0.02, 0.001, 0.0005);
        const needleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const needle = new THREE.Mesh(needleGeometry, needleMaterial);
        needle.position.set(0, 0, 0.022);
        // Rotate needle based on current value
        needle.rotation.z = (current / 10) * Math.PI; // Assuming 0-10A scale
        ammeterGroup.add(needle);
    }
    
    // Input terminals
    const terminalGeometry = new THREE.CylinderGeometry(0.003, 0.003, 0.01, 8);
    const terminalMaterial = new THREE.MeshPhongMaterial({
        color: PHYSICS_COLORS.COPPER,
        shininess: 100
    });
    
    const posTerminal = new THREE.Mesh(terminalGeometry, terminalMaterial);
    posTerminal.position.set(-0.03, -0.04, 0);
    posTerminal.rotation.x = Math.PI / 2;
    ammeterGroup.add(posTerminal);
    
    const negTerminal = posTerminal.clone();
    negTerminal.position.set(0.03, -0.04, 0);
    ammeterGroup.add(negTerminal);
    
    // Labels
    const label = createPhysicsText('A', 0.01, 0xffffff);
    label.position.set(0, 0.04, 0.021);
    ammeterGroup.add(label);
    
    return ammeterGroup;
}

/**
 * Creates a hyperrealistic voltmeter with proper connections
 * @param {number} voltage - Voltage reading in volts
 * @param {string} type - Meter type ('analog', 'digital')
 * @returns {THREE.Group} Complete voltmeter assembly
 */
function createRealisticVoltmeter(voltage, type = 'digital') {
    const voltmeterGroup = new THREE.Group();
    voltmeterGroup.userData.type = 'voltmeter';
    voltmeterGroup.userData.reading = voltage;
    
    // Similar to ammeter but with voltage-specific features
    const housingGeometry = new THREE.BoxGeometry(0.08, 0.06, 0.04);
    const housingMaterial = new THREE.MeshPhongMaterial({
        color: 0x1a1a3a, // Slightly different color
        shininess: 30
    });
    const housing = new THREE.Mesh(housingGeometry, housingMaterial);
    voltmeterGroup.add(housing);
    
    if (type === 'digital') {
        const displayGeometry = new THREE.PlaneGeometry(0.06, 0.03);
        const displayMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000,
            map: createDigitalDisplay(voltage.toFixed(1) + 'V')
        });
        const display = new THREE.Mesh(displayGeometry, displayMaterial);
        display.position.set(0, 0, 0.021);
        voltmeterGroup.add(display);
    }
    
    // Probe connections (for parallel measurement)
    const probeGeometry = new THREE.CylinderGeometry(0.002, 0.002, 0.015, 8);
    const probeMaterial = new THREE.MeshPhongMaterial({
        color: 0xff0000, // Red probe
        shininess: 100
    });
    
    const redProbe = new THREE.Mesh(probeGeometry, probeMaterial);
    redProbe.position.set(-0.025, -0.04, 0);
    redProbe.rotation.x = Math.PI / 2;
    voltmeterGroup.add(redProbe);
    
    const blackProbe = redProbe.clone();
    blackProbe.material = new THREE.MeshPhongMaterial({ color: 0x000000, shininess: 100 });
    blackProbe.position.set(0.025, -0.04, 0);
    voltmeterGroup.add(blackProbe);
    
    const label = createPhysicsText('V', 0.01, 0xffffff);
    label.position.set(0, 0.04, 0.021);
    voltmeterGroup.add(label);
    
    return voltmeterGroup;
}

/**
 * Creates a realistic LED with proper semiconductor properties
 * @param {string} color - LED color ('red', 'green', 'blue', 'white', 'yellow')
 * @param {number} current - Operating current in amperes
 * @returns {THREE.Group} Complete LED assembly
 */
function createRealisticLED(color = 'red', current = 0.02) {
    const ledGroup = new THREE.Group();
    ledGroup.userData.type = 'led';
    ledGroup.userData.color = color;
    ledGroup.userData.current = current;
    
    // LED package colors
    const packageColors = {
        'red': 0xff0000,
        'green': 0x00ff00,
        'blue': 0x0000ff,
        'white': 0xffffff,
        'yellow': 0xffff00,
        'orange': 0xff8800
    };
    
    // LED dome (5mm standard)
    const domeGeometry = new THREE.SphereGeometry(0.0025, 16, 16);
    const domeMaterial = new THREE.MeshPhongMaterial({
        color: packageColors[color] || packageColors['red'],
        transparent: true,
        opacity: 0.7,
        emissive: new THREE.Color(packageColors[color] || packageColors['red']).multiplyScalar(current * 10)
    });
    const dome = new THREE.Mesh(domeGeometry, domeMaterial);
    dome.position.y = 0.003;
    ledGroup.add(dome);
    
    // LED body
    const bodyGeometry = new THREE.CylinderGeometry(0.0025, 0.0025, 0.006, 16);
    const bodyMaterial = new THREE.MeshPhongMaterial({
        color: 0x2a2a2a,
        shininess: 20
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    ledGroup.add(body);
    
    // Leads
    const leadGeometry = new THREE.CylinderGeometry(0.0003, 0.0003, 0.015, 8);
    const leadMaterial = new THREE.MeshPhongMaterial({
        color: PHYSICS_COLORS.SILVER,
        shininess: 100
    });
    
    // Anode (longer lead)
    const anode = new THREE.Mesh(leadGeometry, leadMaterial);
    anode.position.set(0.001, -0.01, 0);
    ledGroup.add(anode);
    
    // Cathode (shorter lead)
    const cathode = anode.clone();
    cathode.scale.y = 0.8;
    cathode.position.set(-0.001, -0.009, 0);
    ledGroup.add(cathode);
    
    // Light emission effect
    if (current > 0) {
        const glowGeometry = new THREE.SphereGeometry(0.005, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: packageColors[color] || packageColors['red'],
            transparent: true,
            opacity: 0.3
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.y = 0.003;
        ledGroup.add(glow);
    }
    
    return ledGroup;
}

/**
 * ============================================================================
 * HELPER FUNCTIONS - EXACT IMPLEMENTATIONS
 * ============================================================================
 */

/**
 * Calculates resistor color bands based on resistance value and tolerance
 * @param {number} resistance - Resistance in ohms
 * @param {number} tolerance - Tolerance percentage
 * @returns {Array} Array of color values
 */
function calculateResistorColorBands(resistance, tolerance) {
    const colorCodes = {
        0: 0x000000, // Black
        1: 0x8b4513, // Brown
        2: 0xff0000, // Red
        3: 0xff8c00, // Orange
        4: 0xffff00, // Yellow
        5: 0x008000, // Green
        6: 0x0000ff, // Blue
        7: 0x800080, // Violet
        8: 0x808080, // Gray
        9: 0xffffff  // White
    };
    
    const toleranceColors = {
        1: 0x8b4513,   // Brown
        2: 0xff0000,   // Red
        5: 0xffd700,   // Gold
        10: 0xc0c0c0   // Silver
    };
    
    // Convert resistance to significant digits and multiplier
    let resistanceStr = resistance.toString();
    let multiplier = 0;
    
    // Find multiplier (number of trailing zeros)
    while (resistanceStr.endsWith('0') && resistanceStr.length > 2) {
        resistanceStr = resistanceStr.slice(0, -1);
        multiplier++;
    }
    
    // Get first two significant digits
    const firstDigit = parseInt(resistanceStr[0]);
    const secondDigit = parseInt(resistanceStr[1] || '0');
    
    return [
        colorCodes[firstDigit],
        colorCodes[secondDigit], 
        colorCodes[multiplier],
        toleranceColors[tolerance] || toleranceColors[5]
    ];
}

/**
 * Formats resistance values with proper units (Ω, kΩ, MΩ)
 * @param {number} resistance - Resistance in ohms
 * @returns {string} Formatted resistance string
 */
function formatResistanceValue(resistance) {
    if (resistance >= 1e6) {
        return (resistance / 1e6).toFixed(1) + 'MΩ';
    } else if (resistance >= 1e3) {
        return (resistance / 1e3).toFixed(1) + 'kΩ';
    } else {
        return resistance.toFixed(0) + 'Ω';
    }
}

/**
 * Creates a 3D text sprite for component labeling
 * @param {string} text - Text to display
 * @param {number} size - Text size
 * @param {number} color - Text color (hex)
 * @returns {THREE.Sprite} Text sprite
 */
function createPhysicsText(text, size, color) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 128;
    
    context.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
    context.font = `bold ${size * 400}px Arial`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, 256, 64);
    
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(size * 8, size * 2, 1);
    
    return sprite;
}

/**
 * Creates a battery texture with realistic labeling
 * @param {string} type - Battery type
 * @param {number} voltage - Battery voltage
 * @returns {THREE.CanvasTexture} Battery texture
 */
function createBatteryTexture(type, voltage) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 512;
    
    // Background
    context.fillStyle = '#2a2a2a';
    context.fillRect(0, 0, 256, 512);
    
    // Labels
    context.fillStyle = '#ffffff';
    context.font = 'bold 32px Arial';
    context.textAlign = 'center';
    context.fillText(`${voltage}V`, 128, 200);
    context.font = '24px Arial';
    context.fillText(type.toUpperCase(), 128, 250);
    context.fillText('ALKALINE', 128, 300);
    
    return new THREE.CanvasTexture(canvas);
}

/**
 * Creates ceramic texture for resistors
 * @returns {THREE.CanvasTexture} Ceramic texture
 */
function createCeramicTexture() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 128;
    canvas.height = 128;
    
    // Base ceramic color
    context.fillStyle = '#f5deb3';
    context.fillRect(0, 0, 128, 128);
    
    // Add some texture noise
    for (let i = 0; i < 1000; i++) {
        const x = Math.random() * 128;
        const y = Math.random() * 128;
        const brightness = Math.random() * 0.2 - 0.1;
        context.fillStyle = `rgba(${245 + brightness * 255}, ${222 + brightness * 255}, ${179 + brightness * 255}, 0.3)`;
        context.fillRect(x, y, 1, 1);
    }
    
    return new THREE.CanvasTexture(canvas);
}

/**
 * Creates digital display texture
 * @param {string} text - Display text
 * @returns {THREE.CanvasTexture} Display texture
 */
function createDigitalDisplay(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 128;
    
    // Black background
    context.fillStyle = '#000000';
    context.fillRect(0, 0, 256, 128);
    
    // Green digits
    context.fillStyle = '#00ff00';
    context.font = 'bold 48px monospace';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, 128, 64);
    
    return new THREE.CanvasTexture(canvas);
}

/**
 * Creates analog meter face
 * @param {string} unit - Unit label
 * @returns {THREE.CanvasTexture} Meter face texture
 */
function createAnalogMeterFace(unit) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 256;
    
    // White background
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, 256, 256);
    
    // Scale markings
    context.strokeStyle = '#000000';
    context.lineWidth = 2;
    for (let i = 0; i <= 10; i++) {
        const angle = (i / 10) * Math.PI - Math.PI/2;
        const x1 = 128 + Math.cos(angle) * 100;
        const y1 = 128 + Math.sin(angle) * 100;
        const x2 = 128 + Math.cos(angle) * 90;
        const y2 = 128 + Math.sin(angle) * 90;
        
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        
        // Numbers
        context.fillStyle = '#000000';
        context.font = '16px Arial';
        context.textAlign = 'center';
        context.fillText(i.toString(), 128 + Math.cos(angle) * 80, 128 + Math.sin(angle) * 80);
    }
    
    // Unit label
    context.font = '20px Arial';
    context.fillText(unit, 128, 200);
    
    return new THREE.CanvasTexture(canvas);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createRealisticBattery,
        createRealisticResistor,
        createRealisticWire,
        createRealisticAmmeter,
        createRealisticVoltmeter,
        createRealisticLED,
        calculateResistorColorBands,
        formatResistanceValue,
        createPhysicsText,
        PHYSICS_CONSTANTS,
        MATERIAL_PROPERTIES,
        PHYSICS_COLORS
    };
} 