# Cinematic Physics Visualization Standards
## Complete Reference for AI Agents

### 1. VISUAL QUALITY STANDARDS

#### 1.1 3D Graphics Requirements
- **Rendering Engine**: THREE.js with WebGL
- **Shadow Quality**: PCFSoftShadowMap, 2048x2048 resolution
- **Antialiasing**: Enabled for all renderers
- **Lighting Model**: Physically-based rendering with:
  - Ambient light: 0x404040, intensity 0.4
  - Main directional light: 0xffffff, intensity 1.0, position (10, 10, 5)
  - Fill light: 0x4fc3f7, intensity 0.3, position (-5, 5, -5)
  - Rim light: 0xff6b35, intensity 0.2, position (0, -5, 10)

#### 1.2 Material Standards
```javascript
// Metallic materials (copper, gold, silver)
metallic: {
    shininess: 80-100,
    metalness: 0.7-0.9,
    reflectivity: 0.3-0.8
}

// Ceramic materials (resistors, insulators)
ceramic: {
    color: 0xf5deb3,
    shininess: 10-30,
    roughness: 0.8
}

// Glass materials (bulbs, displays)
glass: {
    transparent: true,
    opacity: 0.8-0.95,
    shininess: 100,
    refractionRatio: 0.98
}
```

#### 1.3 Color Palette
```javascript
const PHYSICS_COLORS = {
    // Primary physics colors
    POSITIVE_CHARGE: 0xff3333,
    NEGATIVE_CHARGE: 0x3333ff,
    NEUTRAL: 0x666666,
    
    // Material colors
    COPPER: 0xff6600,
    GOLD: 0xffd700,
    SILVER: 0xc0c0c0,
    CERAMIC: 0xf5deb3,
    PCB_GREEN: 0x2d5016,
    
    // Energy/field colors
    ELECTRIC_FIELD: 0x4fc3f7,
    MAGNETIC_FIELD: 0xff6b35,
    HEAT_GLOW: 0xff4400,
    ELECTRON_FLOW: 0x66bbff
};
```

### 2. PHYSICS ACCURACY REQUIREMENTS

#### 2.1 Fundamental Constants (EXACT VALUES)
```javascript
const PHYSICS_CONSTANTS = {
    ELECTRON_CHARGE: 1.602176634e-19,     // Coulombs (exact)
    ELECTRON_MASS: 9.1093837015e-31,      // kg
    PROTON_MASS: 1.67262192369e-27,       // kg
    AVOGADRO: 6.02214076e23,              // mol^-1 (exact)
    BOLTZMANN: 1.380649e-23,              // J/K (exact)
    PLANCK: 6.62607015e-34,               // J⋅s (exact)
    SPEED_OF_LIGHT: 299792458,            // m/s (exact)
    VACUUM_PERMITTIVITY: 8.8541878128e-12, // F/m
    COULOMB_CONSTANT: 8.9875517923e9       // N⋅m²/C²
};
```

#### 2.2 Material Properties (REAL VALUES)
```javascript
const MATERIAL_PROPERTIES = {
    COPPER: {
        resistivity: 1.68e-8,        // Ω⋅m at 20°C
        density: 8960,               // kg/m³
        electrons_per_atom: 1,
        temp_coefficient: 0.00393,   // /°C
        thermal_conductivity: 401    // W/(m⋅K)
    },
    SILICON: {
        resistivity: 2.3e3,          // Ω⋅m (intrinsic)
        density: 2329,               // kg/m³
        bandgap: 1.12                // eV
    },
    ALUMINUM: {
        resistivity: 2.65e-8,        // Ω⋅m at 20°C
        density: 2700,               // kg/m³
        electrons_per_atom: 3
    }
};
```

### 3. COMPONENT SPECIFICATIONS

#### 3.1 Battery Standards
```javascript
createRealisticBattery(voltage, type = 'cylindrical') {
    // Dimensions based on real battery types
    const specifications = {
        'AA': { radius: 0.007, height: 0.0505 },
        'D': { radius: 0.017, height: 0.0615 },
        '9V': { width: 0.026, height: 0.048, depth: 0.017 },
        'car': { width: 0.26, height: 0.17, depth: 0.21 }
    };
    
    // Must include:
    // - Realistic proportions
    // - Positive terminal (gold/brass)
    // - Negative terminal (steel/aluminum)
    // - Voltage label clearly visible
    // - Brand markings (generic)
    // - Internal chemistry visualization (optional)
}
```

#### 3.2 Resistor Standards
```javascript
createRealisticResistor(resistance, tolerance = 5, wattage = 0.25) {
    // Standard color codes (exact implementation)
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
    
    // Tolerance colors
    const toleranceColors = {
        1: 0x8b4513,   // Brown (1%)
        2: 0xff0000,   // Red (2%)
        5: 0xffd700,   // Gold (5%)
        10: 0xc0c0c0   // Silver (10%)
    };
    
    // Must include:
    // - Accurate color band calculation
    // - Ceramic body with proper proportions
    // - Metal leads (tinned copper)
    // - Size based on wattage rating
}
```

#### 3.3 Wire Standards
```javascript
createRealisticWire(gauge = 22, length = 1, insulation = true) {
    // AWG specifications
    const awgSpecs = {
        12: { diameter: 0.002053, current_capacity: 20 },
        14: { diameter: 0.001628, current_capacity: 15 },
        16: { diameter: 0.001291, current_capacity: 13 },
        18: { diameter: 0.001024, current_capacity: 10 },
        20: { diameter: 0.000812, current_capacity: 7 },
        22: { diameter: 0.000644, current_capacity: 5 }
    };
    
    // Must include:
    // - Proper conductor diameter
    // - Insulation thickness
    // - Copper core color
    // - Stranded vs solid options
    // - Voltage rating markings
}
```

### 4. ANIMATION STANDARDS

#### 4.1 Electron Flow Visualization
```javascript
calculateElectronFlow(current, wire_properties) {
    // Real drift velocity calculation
    const drift_velocity = current / (
        wire_properties.electron_density * 
        wire_properties.cross_section * 
        PHYSICS_CONSTANTS.ELECTRON_CHARGE
    );
    
    // Visual scaling (for visibility)
    const visual_speed = drift_velocity * 1e12;
    
    // Animation requirements:
    // - Electrons must flow opposite to conventional current
    // - Speed proportional to actual drift velocity
    // - Particle density represents current magnitude
    // - Thermal motion superimposed on drift
}
```

#### 4.2 Field Visualization
```javascript
createElectricFieldLines(charges) {
    // Field lines must:
    // - Start on positive charges
    // - End on negative charges
    // - Never cross each other
    // - Density proportional to field strength
    // - Follow actual field equations
    
    charges.forEach(charge => {
        const field_lines = calculateFieldLines(charge);
        // Render with proper density and curvature
    });
}
```

### 5. INTERACTION STANDARDS

#### 5.1 User Controls
- **Mouse Controls**: Orbit, zoom, pan (THREE.js OrbitControls)
- **Keyboard Navigation**: Arrow keys, WASD, spacebar
- **Touch Support**: Pinch-to-zoom, two-finger pan
- **Accessibility**: Screen reader support, keyboard navigation

#### 5.2 Real-time Calculations
```javascript
class PhysicsCalculator {
    updateOhmsLaw(voltage, resistance) {
        const current = voltage / resistance;
        const power = voltage * current;
        
        // Update displays immediately
        this.updateCurrentDisplay(current);
        this.updatePowerDisplay(power);
        this.updateElectronFlow(current);
        this.updateHeatVisualization(power);
    }
}
```

### 6. PERFORMANCE REQUIREMENTS

#### 6.1 Frame Rate Targets
- **Desktop**: 60 FPS minimum
- **Mobile**: 30 FPS minimum
- **Low-end devices**: Graceful degradation

#### 6.2 Memory Management
```javascript
// Proper disposal pattern
dispose() {
    this.objects.forEach(obj => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
            if (Array.isArray(obj.material)) {
                obj.material.forEach(mat => mat.dispose());
            } else {
                obj.material.dispose();
            }
        }
    });
    
    if (this.renderer) {
        this.renderer.dispose();
    }
}
```

### 7. CODE QUALITY STANDARDS

#### 7.1 Documentation Requirements
```javascript
/**
 * Creates a realistic electrical component with accurate physics
 * @param {number} value - Component value (resistance, voltage, etc.)
 * @param {Object} options - Configuration options
 * @param {string} options.material - Material type ('ceramic', 'metal', etc.)
 * @param {number} options.scale - Size multiplier
 * @returns {THREE.Group} Complete 3D component
 */
createComponent(value, options = {}) {
    // Implementation with full error checking
}
```

#### 7.2 Error Handling
```javascript
// All methods must include:
try {
    // Component creation
} catch (error) {
    console.error(`Error creating component: ${error.message}`);
    return this.createFallbackComponent();
}
```

### 8. TESTING REQUIREMENTS

#### 8.1 Physics Validation
- All calculations must match theoretical values within 0.1%
- Component behaviors must follow real-world physics
- Field visualizations must match Maxwell's equations

#### 8.2 Visual Validation
- Components must be recognizable to electrical engineers
- Colors must match industry standards
- Proportions must be realistic

### 9. DEPLOYMENT CHECKLIST

- [ ] All physics constants are exact values
- [ ] Component dimensions are realistic
- [ ] Colors match electrical standards
- [ ] Animations are physically accurate
- [ ] Error handling is comprehensive
- [ ] Performance meets targets
- [ ] Accessibility features work
- [ ] Mobile compatibility tested
- [ ] Memory leaks prevented
- [ ] Documentation is complete 