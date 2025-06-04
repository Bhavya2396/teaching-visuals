# AI Agent Implementation Guide
## Step-by-Step Instructions for Creating Cinematic Physics Visualizations

### OVERVIEW
This guide provides AI agents with exact instructions to create physics visualizations that match the quality and accuracy of the reference implementation. **CRITICAL: The cinematic experience must flow exactly like `new-main.html`** - this is the gold standard for all implementations.

---

## CRITICAL PREREQUISITE: STUDY REFERENCE IMPLEMENTATION

### **MANDATORY FIRST STEP: Experience `new-main.html`**
Before writing ANY code, AI agents MUST:

1. **Open `new-main.html`** in multiple browsers (Chrome, Firefox, Safari)
2. **Experience the complete flow** from loading to completion on desktop
3. **Test mobile experience** on actual devices or device simulation
4. **Time all transitions** and note exact animation durations
5. **Study interaction patterns**: clicks, hovers, navigation
6. **Understand visual hierarchy**: layout, spacing, typography
7. **Note performance characteristics**: smoothness, responsiveness
8. **Identify key user experience elements**: loading, progress, completion

### **What to Observe in `new-main.html`:**
- **Loading Experience**: Atomic animation timing and visual effects
- **Section Transitions**: How physics concepts flow between sections
- **3D Integration**: Camera movements and object transitions
- **Control Interactions**: Button responses and panel behavior
- **Progress Tracking**: How progress indicators update
- **Content Synchronization**: Text and 3D element coordination
- **Mobile Behavior**: Touch interactions and responsive layout
- **Animation Timing**: Exact durations and easing curves

---

## PHASE 1: PROJECT SETUP AND STRUCTURE

### Step 1.1: File Structure Creation
Create the following file structure exactly (matching `new-main.html` organization):
```
physics-visualizations/
├── [physics-topic]-cinematic.html          # Main HTML file
├── [physics-topic]-enhanced-3d.js          # 3D visualization engine
├── components/
│   ├── realistic-components.js             # Component library
│   ├── physics-calculations.js             # Calculation engine
│   └── visual-effects.js                   # Visual effects
├── assets/
│   ├── textures/                          # Material textures
│   └── models/                            # 3D models (if needed)
└── README.md                              # Documentation
```

### Step 1.2: Dependencies Setup
**Use identical dependency loading pattern as `new-main.html`:**
```html
<!-- THREE.js with multiple fallbacks - EXACT MATCH to new-main.html -->
<script src="https://unpkg.com/three@0.150.1/build/three.min.js"></script>
<script>
    // Fallback loading system - Match new-main.html exactly
    if (typeof THREE === 'undefined') {
        console.log('Primary THREE.js CDN failed, trying fallback...');
        document.write('<script src="https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.min.js"><\/script>');
    }
</script>
<script>
    if (typeof THREE === 'undefined') {
        console.log('Second THREE.js CDN failed, trying third fallback...');
        document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r150/three.min.js"><\/script>');
    }
</script>
```

### Step 1.3: Constants Declaration
Start every JavaScript file with exact physics constants (identical to `new-main.html`):
```javascript
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
        temp_coefficient: 0.00393    // /°C
    }
    // Add other materials as needed
};

const PHYSICS_COLORS = {
    POSITIVE_CHARGE: 0xff3333,
    NEGATIVE_CHARGE: 0x3333ff,
    COPPER: 0xff6600,
    GOLD: 0xffd700,
    ELECTRIC_FIELD: 0x4fc3f7,
    HEAT_GLOW: 0xff4400
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
```

---

## PHASE 2: HTML STRUCTURE IMPLEMENTATION

### Step 2.1: Document Head Setup
**Use this exact HTML head structure (matching `new-main.html`):**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Physics Topic] - Cinematic Physics Experience</title>
    
    <!-- Enhanced Meta Information -->
    <meta name="description" content="Interactive 3D physics visualization with hyperrealistic elements">
    <meta name="keywords" content="physics, [topic], 3D visualization, educational">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E⚡%3C/text%3E%3C/svg%3E">
```

### Step 2.2: CSS Implementation
**CRITICAL: Copy the exact CSS from `CINEMATIC_STYLE_GUIDE.md` AND study `new-main.html` styling**, including:
- Color system (CSS variables) - match exactly
- Typography hierarchy - identical font sizes and spacing  
- Component styles - same button and panel designs
- Animation standards - exact timing and easing curves
- Responsive design - same breakpoints and behavior
- Accessibility features - identical keyboard navigation

### Step 2.3: Body Structure
**Use this exact body structure (matching `new-main.html` layout):**
```html
<body>
    <div id="cinematic-experience">
        <!-- Loading Screen - EXACT MATCH to new-main.html -->
        <div id="loading-screen">
            <div class="loading-content">
                <div class="physics-loader">
                    <!-- Atomic loading animation - IDENTICAL to reference -->
                </div>
                <h1 class="loading-title">[Physics Topic]</h1>
                <p class="loading-subtitle">Initializing hyperrealistic physics simulation...</p>
                <div class="progress-container">
                    <div class="progress-bar" id="loading-progress"></div>
                </div>
            </div>
        </div>

        <!-- Control Panel - EXACT styling as new-main.html -->
        <div class="control-panel">
            <button class="control-btn" id="audio-toggle" title="Toggle Audio">🔊</button>
            <button class="control-btn" id="fullscreen-toggle" title="Toggle Fullscreen">📺</button>
            <button class="control-btn" id="settings-toggle" title="Settings">⚙️</button>
        </div>

        <!-- Progress Indicator - IDENTICAL behavior to new-main.html -->
        <div class="progress-indicator">
            <!-- Dynamic dots based on number of sections -->
        </div>

        <!-- 3D Visualization Container - SAME positioning -->
        <div id="visualization-container"></div>

        <!-- Scrollable Content Container - MATCHING layout -->
        <div id="content-container">
            <!-- Physics sections -->
        </div>

        <!-- Completion Modal - IDENTICAL styling -->
        <div class="completion-modal" id="completion-modal">
            <!-- Success completion interface -->
        </div>
    </div>
</body>
```

---

## PHASE 3: 3D VISUALIZATION ENGINE

### Step 3.1: Basic Scene Setup
**Create the main visualization class with exact structure (matching `new-main.html` implementation):**
```javascript
class [PhysicsTopicName]CinematicVisualization3D {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            physicsMode: 'hyperAccurate',
            materialQuality: 'hyperrealistic',
            enableVoiceFeedback: true,
            adaptiveQuality: true,
            realTimePhysics: true,
            // CRITICAL: Match new-main.html timing
            cinematicTiming: CINEMATIC_TIMING,
            ...options
        };
        
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.objects = [];
        this.currentSection = 0;
        
        this.init();
    }
    
    init() {
        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createLighting();
        this.setupEventListeners();
        this.setupCinematicFlow();  // NEW: Match new-main.html flow
        this.startAnimation();
    }
    
    // CRITICAL: Setup cinematic flow matching new-main.html
    setupCinematicFlow() {
        this.cinematicController = {
            currentSection: 0,
            totalSections: this.getSectionCount(),
            transitionInProgress: false,
            
            // Match new-main.html transition timing
            transitionToSection: (sectionIndex) => {
                if (this.transitionInProgress) return;
                
                this.transitionInProgress = true;
                this.fadeOutContent();
                
                setTimeout(() => {
                    this.updatePhysicsVisualization(sectionIndex);
                    this.animateCameraToSection(sectionIndex);
                    this.updateProgressIndicators(sectionIndex);
                    
                    setTimeout(() => {
                        this.fadeInContent();
                        this.transitionInProgress = false;
                    }, CINEMATIC_TIMING.cameraMovement);
                    
                }, CINEMATIC_TIMING.fadeInOut);
            }
        };
    }
}
```

### Step 3.2: Scene Configuration
**Implement scene setup with exact parameters (matching `new-main.html`):**
```javascript
createScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0e1a);  // Match new-main.html background
    this.scene.fog = new THREE.Fog(0x0a0e1a, 10, 100);
}

createCamera() {
    this.camera = new THREE.PerspectiveCamera(
        45,                                    // FOV - Match new-main.html
        window.innerWidth / window.innerHeight, // Aspect
        0.1,                                   // Near
        1000                                   // Far
    );
    
    // CRITICAL: Initial camera position must match new-main.html
    this.camera.position.set(0, 8, 12);
    this.camera.lookAt(0, 0, 0);
    
    // Setup camera animation paths like new-main.html
    this.setupCameraPositions();
}

createRenderer() {
    this.renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x0a0e1a, 0.0);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    
    this.container.appendChild(this.renderer.domElement);
}

// NEW: Setup camera positions for each section (match new-main.html)
setupCameraPositions() {
    this.cameraPositions = [
        { position: new THREE.Vector3(0, 8, 12), target: new THREE.Vector3(0, 0, 0) },
        { position: new THREE.Vector3(10, 5, 8), target: new THREE.Vector3(0, 0, 0) },
        { position: new THREE.Vector3(-8, 10, 6), target: new THREE.Vector3(0, 0, 0) },
        // Add more positions as needed
    ];
}
```

### Step 3.3: Lighting System
**Implement the exact cinematic lighting setup (matching `new-main.html`):**
```javascript
createLighting() {
    // EXACT lighting setup from new-main.html
    // Ambient light (soft fill)
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    this.scene.add(ambientLight);
    
    // Main directional light (key light)
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.0);
    mainLight.position.set(10, 10, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 50;
    mainLight.shadow.camera.left = -20;
    mainLight.shadow.camera.right = 20;
    mainLight.shadow.camera.top = 20;
    mainLight.shadow.camera.bottom = -20;
    this.scene.add(mainLight);
    
    // Fill light (blue tint)
    const fillLight = new THREE.DirectionalLight(0x4fc3f7, 0.3);
    fillLight.position.set(-5, 5, -5);
    this.scene.add(fillLight);
    
    // Rim light (warm accent)
    const rimLight = new THREE.DirectionalLight(0xff6b35, 0.2);
    rimLight.position.set(0, -5, 10);
    this.scene.add(rimLight);
}
```

---

## PHASE 4: REALISTIC COMPONENT CREATION

### Step 4.1: Component Creation Framework
**Use this exact framework for all components (maintaining `new-main.html` quality):**
```javascript
createRealistic[ComponentName](parameters) {
    const componentGroup = new THREE.Group();
    componentGroup.userData.type = '[component-type]';
    componentGroup.userData.parameters = parameters;
    
    try {
        // 1. Calculate real physics properties
        const physicsData = this.calculate[ComponentName]Physics(parameters);
        
        // 2. Create geometry with real dimensions
        const geometry = this.create[ComponentName]Geometry(physicsData);
        
        // 3. Apply realistic materials (match new-main.html quality)
        const materials = this.create[ComponentName]Materials(physicsData);
        
        // 4. Assemble component
        const component = new THREE.Mesh(geometry, materials);
        componentGroup.add(component);
        
        // 5. Add labels and information
        this.add[ComponentName]Labels(componentGroup, physicsData);
        
        // 6. Store physics data for calculations
        componentGroup.userData.physics = physicsData;
        
        // 7. Setup cinematic animations (NEW: match new-main.html)
        this.setup[ComponentName]Animations(componentGroup);
        
        return componentGroup;
        
    } catch (error) {
        console.error(`Error creating ${componentName}:`, error);
        return this.createFallback[ComponentName](parameters);
    }
}
```

### Step 4.2: Physics Calculation Integration
**Every component must calculate real physics (identical accuracy to `new-main.html`):**
```javascript
calculateBatteryPhysics(voltage, type) {
    return {
        voltage: voltage,
        capacity: this.getBatteryCapacity(type),
        internal_resistance: this.getBatteryInternalResistance(type),
        chemistry: this.getBatteryChemistry(type),
        dimensions: this.getBatteryDimensions(type),
        current_capability: this.getBatteryCurrentCapability(type),
        energy_density: this.getBatteryEnergyDensity(type)
    };
}

calculateResistorPhysics(resistance, tolerance, wattage) {
    return {
        resistance: resistance,
        tolerance: tolerance,
        wattage: wattage,
        color_bands: this.calculateColorBands(resistance, tolerance),
        dimensions: this.getResistorDimensions(wattage),
        max_voltage: Math.sqrt(resistance * wattage),
        max_current: Math.sqrt(wattage / resistance),
        temperature_coefficient: this.getTemperatureCoefficient(resistance)
    };
}
```

### Step 4.3: Material System
**Implement realistic materials for each component type (matching `new-main.html` visual quality):**
```javascript
createRealisticMaterials() {
    return {
        copper: new THREE.MeshPhongMaterial({
            color: PHYSICS_COLORS.COPPER,
            shininess: 80,
            metalness: 0.7,
            roughness: 0.3,
            envMapIntensity: 0.8
        }),
        
        gold: new THREE.MeshPhongMaterial({
            color: PHYSICS_COLORS.GOLD,
            shininess: 100,
            metalness: 0.9,
            roughness: 0.1,
            envMapIntensity: 1.0
        }),
        
        ceramic: new THREE.MeshPhongMaterial({
            color: PHYSICS_COLORS.CERAMIC,
            shininess: 20,
            roughness: 0.8,
            map: this.createCeramicTexture()
        }),
        
        glass: new THREE.MeshPhongMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.9,
            shininess: 100,
            refractionRatio: 0.98
        })
    };
}
```

---

## PHASE 5: PHYSICS ACCURACY IMPLEMENTATION

### Step 5.1: Real-Time Calculations
**Implement live physics calculations that update the visualization (matching `new-main.html` responsiveness):**
```javascript
updatePhysicsState(newParameters) {
    // Calculate using exact physics equations
    const current = newParameters.voltage / newParameters.resistance;
    const power = newParameters.voltage * current;
    const heat = this.calculateJouleHeating(current, newParameters.resistance);
    
    // Update component states with cinematic timing
    this.updateCurrentFlow(current);
    this.updatePowerDissipation(power);
    this.updateTemperature(heat);
    this.updateFieldVisualization(newParameters);
    
    // Validate physics laws
    this.validateEnergyConservation();
    this.validateKirchhoffLaws();
    
    // Update displays with smooth transitions (match new-main.html)
    this.updateMeasurementDisplays(current, newParameters.voltage, power);
}
```

### Step 5.2: Validation System
**Always validate physics accuracy (maintaining `new-main.html` standards):**
```javascript
validatePhysicsAccuracy() {
    const validationResults = {
        energy_conservation: this.checkEnergyConservation(),
        kirchhoff_current: this.checkKirchhoffCurrentLaw(),
        kirchhoff_voltage: this.checkKirchhoffVoltageLaw(),
        reasonable_values: this.checkReasonableValues(),
        unit_consistency: this.checkUnitConsistency()
    };
    
    // Log any physics violations
    Object.entries(validationResults).forEach(([test, result]) => {
        if (!result.passed) {
            console.warn(`Physics validation failed: ${test}`, result);
        }
    });
    
    return validationResults;
}
```

### Step 5.3: Error Handling
**Implement comprehensive error handling (graceful like `new-main.html`):**
```javascript
handlePhysicsError(error, context) {
    console.error(`Physics error in ${context}:`, error);
    
    // Attempt graceful degradation (never break user experience)
    switch (error.type) {
        case 'DIVISION_BY_ZERO':
            return this.handleDivisionByZero(error);
        case 'NEGATIVE_RESISTANCE':
            return this.handleNegativeResistance(error);
        case 'UNREASONABLE_VALUES':
            return this.handleUnreasonableValues(error);
        default:
            return this.createFallbackVisualization(context);
    }
}
```

---

## PHASE 6: USER INTERFACE AND INTERACTIONS

### Step 6.1: Control System
**Implement the exact control interface (matching `new-main.html` behavior):**
```javascript
setupControlInterface() {
    // Audio toggle - EXACT behavior as new-main.html
    document.getElementById('audio-toggle').addEventListener('click', () => {
        this.audioEnabled = !this.audioEnabled;
        this.updateAudioIcon();
        if (this.audioEnabled) {
            this.startVoiceNarration();
        } else {
            this.stopVoiceNarration();
        }
    });
    
    // Fullscreen toggle - IDENTICAL to new-main.html
    document.getElementById('fullscreen-toggle').addEventListener('click', () => {
        this.toggleFullscreen();
    });
    
    // Settings panel - SAME behavior as reference
    document.getElementById('settings-toggle').addEventListener('click', () => {
        this.showSettingsPanel();
    });
}
```

### Step 6.2: Navigation System
**Implement smooth section navigation (exactly matching `new-main.html` flow):**
```javascript
navigateToSection(sectionIndex) {
    if (sectionIndex < 0 || sectionIndex >= this.totalSections) return;
    
    // CRITICAL: Use exact timing from new-main.html
    this.currentSection = sectionIndex;
    
    // Update progress indicators with same animation
    this.updateProgressIndicators(sectionIndex);
    
    // Create section-specific visualization
    this.setupSectionVisualization(sectionIndex);
    
    // Smooth camera transition (match new-main.html timing)
    this.animateCameraToSection(sectionIndex);
    
    // Update content (same fade timing)
    this.updateContentSection(sectionIndex);
    
    // Voice narration (if enabled)
    if (this.audioEnabled) {
        this.narrateSection(sectionIndex);
    }
}

// NEW: Camera animation matching new-main.html
animateCameraToSection(sectionIndex) {
    const targetPosition = this.cameraPositions[sectionIndex];
    if (!targetPosition) return;
    
    // Use exact timing and easing from new-main.html
    const tween = new TWEEN.Tween(this.camera.position)
        .to(targetPosition.position, CINEMATIC_TIMING.cameraMovement)
        .easing(TWEEN.Easing.Cubic.InOut)
        .start();
        
    const lookTween = new TWEEN.Tween(this.controls.target)
        .to(targetPosition.target, CINEMATIC_TIMING.cameraMovement)
        .easing(TWEEN.Easing.Cubic.InOut)
        .start();
}
```

### Step 6.3: Interactive Elements
**Add interactive elements that maintain physics accuracy and match `new-main.html` responsiveness:**
```javascript
addInteractiveElements() {
    // Component manipulation
    this.objects.forEach(object => {
        if (object.userData.interactive) {
            this.addComponentInteraction(object);
        }
    });
    
    // Parameter controls with immediate response (like new-main.html)
    this.createParameterControls();
    
    // Real-time calculation displays
    this.createCalculationDisplays();
    
    // Physics validation feedback
    this.createValidationFeedback();
}
```

---

## PHASE 7: PERFORMANCE OPTIMIZATION

### Step 7.1: Rendering Optimization
**Implement performance optimizations (maintaining `new-main.html` performance):**
```javascript
optimizePerformance() {
    // Adaptive quality (match new-main.html performance targets)
    this.adaptiveQuality = new AdaptiveQualityManager({
        targetFPS: 60,
        minFPS: 30,
        qualityLevels: ['ultra', 'high', 'medium', 'low']
    });
    
    // Object pooling
    this.objectPool = new ObjectPool();
    
    // Frustum culling
    this.enableFrustumCulling();
    
    // Level of detail
    this.setupLODSystem();
    
    // Memory management
    this.setupMemoryManagement();
}
```

### Step 7.2: Memory Management
**Prevent memory leaks (identical to `new-main.html` approach):**
```javascript
dispose() {
    // Dispose geometries
    this.objects.forEach(object => {
        if (object.geometry) {
            object.geometry.dispose();
        }
    });
    
    // Dispose materials
    this.materials.forEach(material => {
        material.dispose();
    });
    
    // Dispose textures
    this.textures.forEach(texture => {
        texture.dispose();
    });
    
    // Dispose renderer
    if (this.renderer) {
        this.renderer.dispose();
    }
    
    // Clear references
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.objects = [];
}
```

---

## PHASE 8: TESTING AND VALIDATION

### Step 8.1: Cinematic Experience Validation
**CRITICAL: Compare directly with `new-main.html`:**
```javascript
runCinematicExperienceTests() {
    return {
        // Primary test: Does it feel identical to new-main.html?
        experiential_match: this.testExperientialMatch(),
        
        // Timing validation
        loading_timing: this.validateLoadingTiming(),
        transition_timing: this.validateTransitionTiming(),
        animation_smoothness: this.validateAnimationSmoothness(),
        
        // Interaction validation
        control_responsiveness: this.validateControlResponsiveness(),
        mobile_experience: this.validateMobileExperience(),
        
        // Visual validation
        visual_quality_match: this.validateVisualQualityMatch(),
        component_recognition: this.validateComponentRecognition()
    };
}
```

### Step 8.2: Physics Validation Tests
Run these tests for every implementation:
```javascript
runPhysicsValidationTests() {
    const tests = [
        () => this.testOhmsLaw(),
        () => this.testEnergyConservation(),
        () => this.testKirchhoffLaws(),
        () => this.testMaterialProperties(),
        () => this.testTemperatureEffects(),
        () => this.testFrequencyResponse(),
        () => this.testSemiconductorBehavior(),
        () => this.testFieldCalculations()
    ];
    
    const results = tests.map(test => {
        try {
            return { test: test.name, result: test(), passed: true };
        } catch (error) {
            return { test: test.name, error: error.message, passed: false };
        }
    });
    
    console.log('Physics Validation Results:', results);
    return results;
}
```

### Step 8.3: Visual Quality Tests
**Validate visual quality (comparing to `new-main.html` benchmark):**
```javascript
runVisualQualityTests() {
    return {
        frame_rate: this.measureFrameRate(),
        component_recognition: this.testComponentRecognition(),
        color_accuracy: this.testColorAccuracy(),
        lighting_quality: this.testLightingQuality(),
        material_realism: this.testMaterialRealism(),
        animation_smoothness: this.testAnimationSmoothness(),
        // NEW: Compare with new-main.html visual benchmark
        reference_comparison: this.compareWithNewMainHTML()
    };
}
```

### Step 8.4: Accessibility Tests
**Ensure accessibility compliance (matching `new-main.html` standards):**
```javascript
runAccessibilityTests() {
    return {
        keyboard_navigation: this.testKeyboardNavigation(),
        screen_reader_support: this.testScreenReaderSupport(),
        color_contrast: this.testColorContrast(),
        reduced_motion: this.testReducedMotionSupport(),
        focus_management: this.testFocusManagement()
    };
}
```

---

## PHASE 9: DEPLOYMENT CHECKLIST

### Step 9.1: Pre-Deployment Validation
**Before deployment, verify (with `new-main.html` as benchmark):**
- [ ] **Cinematic Experience**: Flows exactly like `new-main.html`
- [ ] All physics constants are exact CODATA values
- [ ] Component dimensions match real-world specifications
- [ ] Colors match electrical engineering standards
- [ ] Calculations are accurate to 0.1% tolerance
- [ ] Performance meets frame rate targets
- [ ] Cross-browser compatibility verified
- [ ] Mobile responsiveness tested
- [ ] Accessibility standards met
- [ ] Memory leaks prevented
- [ ] Error handling comprehensive

### Step 9.2: Documentation Requirements
Include complete documentation:
- [ ] Physics equations referenced
- [ ] Material property sources cited
- [ ] Component specification sources
- [ ] Calculation accuracy verified
- [ ] Performance benchmarks recorded
- [ ] Browser compatibility matrix
- [ ] Known limitations documented
- [ ] **Comparison with `new-main.html` documented**
- [ ] Future enhancement roadmap

### Step 9.3: Quality Assurance Sign-off
**Final verification (against `new-main.html` standard):**
- [ ] **Cinematic experience indistinguishable from `new-main.html`**
- [ ] Physics accuracy validated by domain expert
- [ ] Visual quality approved by design team
- [ ] Performance benchmarks met
- [ ] Accessibility compliance verified
- [ ] Security review completed
- [ ] Load testing passed
- [ ] User acceptance testing completed
- [ ] Documentation review completed

---

## EMERGENCY FALLBACK PROCEDURES

### If Experience Doesn't Match `new-main.html`:
1. **Return to `new-main.html`** and re-study the exact experience
2. **Identify specific differences** in timing, animations, or interactions
3. **Adjust implementation** to match reference exactly
4. **Test side-by-side** until indistinguishable

### If THREE.js Fails to Load:
1. Display enhanced text-based fallback
2. Include static diagrams
3. Maintain interactive calculations
4. Provide download links for offline viewing

### If Performance is Poor:
1. Activate adaptive quality system
2. Reduce particle counts
3. Simplify materials
4. Lower shadow quality
5. Disable expensive effects

### If Physics Calculations Fail:
1. Use cached reference values
2. Display error message with explanation
3. Provide manual calculation tools
4. Link to external calculators

---

## SUCCESS CRITERIA

A successful implementation must achieve:
- **Cinematic Experience**: **Indistinguishable from `new-main.html`**
- **Physics Accuracy**: All calculations within 0.1% of theoretical values
- **Visual Quality**: Components recognizable to domain experts
- **Performance**: 60fps desktop, 30fps mobile minimum
- **Accessibility**: WCAG 2.1 AA compliance
- **Reliability**: Zero crashes during normal operation
- **Educational Value**: Complex concepts made visually intuitive

**CRITICAL SUCCESS REQUIREMENT**: A user cannot distinguish the experience from `new-main.html` in any way.

Follow this guide exactly to ensure consistent, high-quality results across all AI agent implementations that perfectly match the reference experience. 