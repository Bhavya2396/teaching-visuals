# Cinematic Physics Style Guide
## Complete Visual Design Reference for AI Agents

### 1. DESIGN PHILOSOPHY

#### 1.1 Core Principles
- **Hyperrealistic Accuracy**: Every element must match real-world physics and components
- **Cinematic Presentation**: Hollywood-quality visual effects with smooth animations
- **Educational Clarity**: Complex concepts presented in visually intuitive ways
- **Professional Aesthetics**: Laboratory-grade equipment appearance
- **Interactive Engagement**: User can manipulate and explore all elements
- **🎬 NEW-MAIN.HTML FLOW**: **Experience must flow exactly like `new-main.html`**

#### 1.2 Visual Hierarchy
1. **Primary Focus**: 3D physics visualization (center stage)
2. **Secondary Elements**: Control panels, progress indicators
3. **Tertiary Elements**: Labels, equations, supplementary information
4. **Background**: Subtle gradients that don't compete with content

#### 1.3 Cinematic Experience Standards (NEW-MAIN.HTML)
**CRITICAL**: All visual implementations must replicate the exact experience of `new-main.html`:

##### Essential Flow Requirements:
- **Loading Experience**: Atomic animation (3s duration) with nucleus and electron orbits
- **Section Transitions**: Smooth fade-out/fade-in (0.8s) with physics continuity
- **3D Camera Movement**: Cinematic paths between sections (2s transitions)
- **Content Synchronization**: Text and 3D elements appear synchronized
- **Progress Tracking**: Smooth dot updates matching section changes
- **Interactive Response**: Immediate feedback (<200ms) on all user interactions
- **Mobile Behavior**: Identical touch interactions and responsive layout

### 2. COLOR SYSTEM

#### 2.1 Primary Color Palette
```css
/* Physics-Accurate Colors - Match new-main.html exactly */
:root {
    /* Electrical Properties */
    --positive-charge: #ff3333;        /* Red for positive */
    --negative-charge: #3333ff;        /* Blue for negative */
    --neutral-charge: #666666;         /* Gray for neutral */
    
    /* Material Colors (Exact Matches) */
    --copper-color: #ff6600;           /* Copper conductors */
    --gold-color: #ffd700;             /* Gold terminals */
    --silver-color: #c0c0c0;           /* Silver contacts */
    --ceramic-color: #f5deb3;          /* Resistor bodies */
    --pcb-green: #2d5016;              /* Circuit boards */
    
    /* Energy Visualization */
    --electric-field: #4fc3f7;         /* Electric field lines */
    --magnetic-field: #ff6b35;         /* Magnetic field */
    --heat-glow: #ff4400;              /* Joule heating */
    --electron-flow: #66bbff;          /* Current flow */
    
    /* Interface Colors */
    --primary-accent: #4fc3f7;         /* Main interactive elements */
    --secondary-accent: #ff6b35;       /* Secondary highlights */
    --success-color: #00ff88;          /* Completed states */
    --warning-color: #ffaa00;          /* Caution indicators */
    --danger-color: #ff4444;           /* Error states */
}
```

#### 2.2 Background Gradients
```css
/* Main Background - Match new-main.html exactly */
.primary-background {
    background: radial-gradient(
        circle at center,
        #1a2040 0%,     /* Deep blue center */
        #0a0e1a 100%    /* Nearly black edges */
    );
}

/* Section Backgrounds */
.section-background {
    background: rgba(10, 14, 26, 0.85);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Control Panel Background */
.control-background {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
}
```

### 3. TYPOGRAPHY SYSTEM

#### 3.1 Font Hierarchy
```css
/* Primary Typography - Match new-main.html exactly */
.main-heading {
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.2;
    background: linear-gradient(45deg, #ffffff, #4fc3f7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.section-heading {
    font-size: 1.3rem;
    font-weight: 600;
    opacity: 0.9;
    letter-spacing: 0.02em;
}

.body-text {
    font-size: 1.2rem;
    line-height: 1.8;
    opacity: 0.9;
    font-weight: 400;
}

.equation-text {
    font-family: 'Courier New', monospace;
    font-size: 2rem;
    font-weight: 600;
    color: #4fc3f7;
    text-align: center;
}

.label-text {
    font-size: 0.9rem;
    font-weight: 500;
    opacity: 0.8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}
```

#### 3.2 Physics Text Standards
```css
/* Component Labels */
.component-label {
    font-family: 'Arial', sans-serif;
    font-weight: bold;
    color: #ffffff;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
    text-align: center;
}

/* Measurement Displays */
.measurement-display {
    font-family: 'Courier New', monospace;
    font-weight: bold;
    color: #00ff00;
    background: #000000;
    padding: 0.2em 0.4em;
    border-radius: 0.2em;
}

/* Scientific Notation */
.scientific-notation {
    font-family: 'Times New Roman', serif;
    font-style: italic;
}
```

### 4. COMPONENT DESIGN STANDARDS

#### 4.1 Button Styles
```css
/* Interactive Buttons - Match new-main.html exactly */
.physics-button {
    padding: 0.8rem 1.5rem;
    border: 2px solid #4fc3f7;
    background: transparent;
    color: #4fc3f7;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.physics-button:hover {
    background: #4fc3f7;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(79, 195, 247, 0.3);
}

.physics-button:active {
    transform: translateY(0);
    box-shadow: 0 5px 15px rgba(79, 195, 247, 0.3);
}

/* Control Panel Buttons - EXACT match to new-main.html */
.control-btn {
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.control-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
}
```

#### 4.2 Progress Indicators
```css
/* Progress Dots - Match new-main.html behavior exactly */
.progress-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
}

.progress-dot.active {
    background: #4fc3f7;
    box-shadow: 0 0 15px #4fc3f7;
    transform: scale(1.3);
}

.progress-dot:hover::after {
    content: attr(data-section);
    position: absolute;
    left: 2rem;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.9rem;
    white-space: nowrap;
    pointer-events: none;
    z-index: 1000;
}
```

#### 4.3 Information Panels
```css
/* Equation Panels */
.equation-panel {
    background: rgba(79, 195, 247, 0.1);
    border: 1px solid rgba(79, 195, 247, 0.3);
    border-radius: 15px;
    padding: 1.5rem;
    margin: 2rem 0;
    position: relative;
}

.equation-panel::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    background: linear-gradient(45deg, #4fc3f7, #ff6b35);
    border-radius: 15px;
    z-index: -1;
    opacity: 0.3;
}

/* Information Cards */
.info-card {
    background: linear-gradient(135deg, #1a2040, #2a3060);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
}

.info-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #4fc3f7, #ff6b35);
}
```

### 5. ANIMATION STANDARDS

#### 5.1 Transition Timing
```css
/* Standard Transitions - Match new-main.html exactly */
:root {
    --transition-fast: 0.2s ease-out;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease-in-out;
    --transition-extra-slow: 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    
    /* CRITICAL: new-main.html specific timings */
    --section-transition: 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    --camera-movement: 2s cubic-bezier(0.25, 0.1, 0.25, 1);
    --loading-duration: 3s ease-in-out;
    --fade-in-out: 0.4s ease;
    --button-hover: 0.15s ease;
    --modal-appear: 0.3s ease;
}

/* Physics Animations */
.physics-element {
    transition: transform var(--transition-normal),
                opacity var(--transition-normal),
                scale var(--transition-fast);
}

.section-transition {
    transition: all var(--section-transition);
}
```

#### 5.2 Loading Animations
```css
/* Atomic Loading Animation - EXACT match to new-main.html */
@keyframes nucleusPulse {
    0%, 100% { 
        transform: translate(-50%, -50%) scale(1);
        box-shadow: 0 0 20px #4fc3f7;
    }
    50% { 
        transform: translate(-50%, -50%) scale(1.2);
        box-shadow: 0 0 30px #4fc3f7;
    }
}

@keyframes orbitRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

@keyframes electronGlow {
    0%, 100% { 
        box-shadow: 0 0 10px #ff6b35;
        opacity: 1;
    }
    50% { 
        box-shadow: 0 0 20px #ff6b35;
        opacity: 0.7;
    }
}

/* Loading Screen Styling - Match new-main.html */
.loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, #1a2040 0%, #0a0e1a 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    transition: opacity var(--loading-duration);
}

.physics-loader {
    position: relative;
    width: 120px;
    height: 120px;
}

.nucleus {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    background: #4fc3f7;
    border-radius: 50%;
    animation: nucleusPulse 2s infinite;
}

.electron-orbit {
    position: absolute;
    top: 50%;
    left: 50%;
    border: 2px solid rgba(255, 107, 53, 0.3);
    border-radius: 50%;
    animation: orbitRotate 3s linear infinite;
}

.electron {
    position: absolute;
    width: 8px;
    height: 8px;
    background: #ff6b35;
    border-radius: 50%;
    animation: electronGlow 1.5s infinite;
}
```

#### 5.3 3D Animation Standards
```javascript
// Smooth camera transitions - Match new-main.html exactly
const cameraTransition = {
    duration: 2000,              // 2s camera movement
    easing: 'easeInOutCubic',   // Smooth easing
    autoRotate: true,
    damping: 0.05
};

// Physics-based motion
const physicsMotion = {
    gravity: 9.81,           // m/s²
    friction: 0.02,          // Realistic friction
    restitution: 0.8,        // Bounce factor
    airResistance: 0.01      // Air resistance
};

// Electron flow animation - Match new-main.html
const electronFlow = {
    speed: 1e-4,             // Scaled drift velocity
    particles: 50,           // Particles per wire
    thermal: 0.1,            // Thermal motion amplitude
    glow: true,              // Enable particle glow
    direction: 'opposite'    // Opposite to conventional current
};

// Section transition timing - CRITICAL: Match new-main.html
const sectionTransitions = {
    fadeOut: 400,            // Content fade out
    cameraMove: 2000,        // Camera transition
    fadeIn: 400,             // Content fade in
    total: 2800              // Total transition time
};
```

### 6. LIGHTING SETUP

#### 6.1 Three.js Lighting Configuration
```javascript
// Standard lighting setup for all scenes - Match new-main.html exactly
function createCinematicLighting(scene) {
    // Ambient light (soft fill)
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);
    
    // Main directional light (key light)
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.0);
    mainLight.position.set(10, 10, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 50;
    scene.add(mainLight);
    
    // Fill light (blue tint)
    const fillLight = new THREE.DirectionalLight(0x4fc3f7, 0.3);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);
    
    // Rim light (warm accent)
    const rimLight = new THREE.DirectionalLight(0xff6b35, 0.2);
    rimLight.position.set(0, -5, 10);
    scene.add(rimLight);
    
    // Spot light for drama (optional)
    const spotLight = new THREE.SpotLight(0xffffff, 0.5);
    spotLight.position.set(0, 20, 0);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.1;
    spotLight.decay = 2;
    spotLight.distance = 200;
    scene.add(spotLight);
}
```

#### 6.2 Material Lighting Response
```javascript
// Standard material configurations - Match new-main.html quality
const materialTemplates = {
    metal: {
        shininess: 100,
        metalness: 0.8,
        roughness: 0.2,
        envMapIntensity: 1.0
    },
    
    ceramic: {
        shininess: 20,
        metalness: 0.0,
        roughness: 0.8,
        envMapIntensity: 0.3
    },
    
    glass: {
        shininess: 100,
        metalness: 0.0,
        roughness: 0.0,
        transparent: true,
        opacity: 0.9,
        refractionRatio: 0.98
    },
    
    plastic: {
        shininess: 30,
        metalness: 0.0,
        roughness: 0.6,
        envMapIntensity: 0.5
    }
};
```

### 7. RESPONSIVE DESIGN PATTERNS

#### 7.1 Breakpoint System
```css
/* Responsive Breakpoints - Match new-main.html exactly */
:root {
    --mobile-max: 767px;
    --tablet-max: 1023px;
    --desktop-min: 1024px;
    --large-desktop-min: 1440px;
}

/* Mobile Styles */
@media (max-width: 767px) {
    .main-heading {
        font-size: 2rem;
    }
    
    .control-panel {
        top: 1rem;
        right: 1rem;
        gap: 0.5rem;
    }
    
    .control-btn {
        width: 40px;
        height: 40px;
        font-size: 1rem;
    }
    
    .section-content {
        padding: 2rem 1rem;
    }
    
    .interactive-controls {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    /* CRITICAL: Mobile experience must match new-main.html */
    .progress-indicator {
        bottom: 2rem;
        left: 1rem;
        right: 1rem;
    }
    
    .physics-loader {
        width: 80px;
        height: 80px;
    }
}

/* Tablet Styles */
@media (min-width: 768px) and (max-width: 1023px) {
    .main-heading {
        font-size: 2.5rem;
    }
    
    .section-content {
        padding: 2.5rem;
    }
}

/* Desktop Styles */
@media (min-width: 1024px) {
    .main-heading {
        font-size: 3rem;
    }
    
    .section-content {
        padding: 3rem;
    }
}
```

#### 7.2 3D Viewport Scaling
```javascript
// Responsive 3D scaling - Match new-main.html behavior
function updateVisualizationScale() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;
    
    // Scale factor based on screen size (match new-main.html)
    let scaleFactor = 1;
    if (width < 768) {
        scaleFactor = 0.7; // Mobile
    } else if (width < 1024) {
        scaleFactor = 0.85; // Tablet
    }
    
    // Update camera settings
    camera.aspect = aspect;
    camera.fov = 45 / scaleFactor;
    camera.updateProjectionMatrix();
    
    // Scale 3D objects
    scene.children.forEach(child => {
        if (child.userData.scalable) {
            child.scale.setScalar(scaleFactor);
        }
    });
    
    renderer.setSize(width, height);
}
```

### 8. ACCESSIBILITY STANDARDS

#### 8.1 Color Contrast Requirements
```css
/* High contrast mode support */
@media (prefers-contrast: high) {
    :root {
        --primary-accent: #ffffff;
        --background-color: #000000;
        --text-color: #ffffff;
    }
    
    .physics-button {
        border-width: 3px;
        background: #000000;
    }
    
    .progress-dot {
        border: 2px solid #ffffff;
    }
}

/* Reduced motion support - CRITICAL for new-main.html compatibility */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    .physics-element {
        transform: none !important;
    }
    
    /* Disable cinematic transitions while maintaining functionality */
    .section-transition {
        transition: opacity 0.3s ease !important;
    }
}
```

#### 8.2 Screen Reader Support
```css
/* Screen reader only text */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

/* Focus indicators - Match new-main.html */
.physics-button:focus,
.control-btn:focus,
.progress-dot:focus {
    outline: 3px solid #4fc3f7;
    outline-offset: 2px;
}
```

### 9. PERFORMANCE OPTIMIZATION

#### 9.1 CSS Performance
```css
/* GPU acceleration triggers */
.gpu-accelerated {
    transform: translateZ(0);
    will-change: transform, opacity;
    backface-visibility: hidden;
}

/* Efficient animations - Match new-main.html performance */
.efficient-animation {
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Minimize repaints */
.no-repaint {
    contain: layout style paint;
}
```

#### 9.2 Loading Strategy
```css
/* Critical CSS inlining */
.critical-styles {
    /* Only essential above-the-fold styles */
    display: block;
    position: relative;
    margin: 0;
    padding: 0;
}

/* Lazy loading indicators */
.loading-placeholder {
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.1) 25%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.1) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
}

@keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}
```

### 10. QUALITY ASSURANCE CHECKLIST

#### 10.1 Visual Quality Standards
- [ ] **Cinematic Experience**: Flows exactly like `new-main.html`
- [ ] All colors match physics constants and real components
- [ ] Typography is legible at all screen sizes
- [ ] Animations are smooth (60fps on desktop, 30fps mobile)
- [ ] Loading states provide clear feedback
- [ ] Interactive elements have proper hover/focus states
- [ ] Accessibility requirements are met
- [ ] Cross-browser compatibility tested
- [ ] Performance targets achieved
- [ ] 3D elements are recognizable and accurate
- [ ] Physics calculations are displayed correctly

#### 10.2 Implementation Verification
- [ ] **Experience Match**: User cannot distinguish from `new-main.html`
- [ ] CSS variables used consistently
- [ ] Responsive breakpoints work correctly
- [ ] Dark mode support implemented
- [ ] High contrast mode support
- [ ] Reduced motion preferences respected
- [ ] Touch interactions work on mobile
- [ ] Keyboard navigation functional
- [ ] Screen reader announcements clear
- [ ] Error states handled gracefully
- [ ] Loading times acceptable on slow connections

#### 10.3 New-Main.HTML Compliance Verification
**CRITICAL FINAL CHECK**: 
1. **Side-by-Side Comparison**: Open `new-main.html` and implementation together
2. **Timing Verification**: All animations match reference timing exactly
3. **Interaction Testing**: UI responses feel identical
4. **Mobile Testing**: Touch behavior matches reference
5. **Visual Quality**: Cannot distinguish visual difference
6. **Performance**: Loading and transitions feel equally smooth

**IMPLEMENTATION FAILS IF**: Any difference is detectable between implementation and `new-main.html` 