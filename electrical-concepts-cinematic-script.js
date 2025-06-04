// Cinematic Electrical Concepts Controller Script
// Complete educational experience with voice feedback and interactions

class ElectricalConceptsCinematicController {
    constructor() {
        this.currentSection = 0;
        this.totalSections = 9;
        this.isLoading = true;
        this.isMuted = false;
        this.scrolling = false;
        this.visualization = null;
        
        // Educational content for voice feedback
        this.sectionContent = {
            0: {
                title: "Electric Charge",
                content: "Electric charge is the fundamental property that creates all electrical phenomena. Positive and negative charges interact through Coulomb's force, following the inverse square law. Like charges repel, opposite charges attract, creating the foundation for all electrical effects.",
                keyPoints: ["Coulomb's law: F equals k times q1 times q2 divided by r squared", "Two types: positive and negative", "Conservation of charge", "Electric field visualization"]
            },
            1: {
                title: "Electric Current",
                content: "Electric current is the flow of electric charge through a conductor. Measured in amperes, current represents billions of electrons drifting through materials, creating the electricity that powers our modern world.",
                keyPoints: ["Current equals charge divided by time", "Electron drift velocity", "Direction convention", "Ampere measurement unit"]
            },
            2: {
                title: "Electrical Resistance", 
                content: "Resistance is the opposition to current flow, caused by electrons colliding with atoms in materials. Different materials have different resistivities, affecting how easily current can pass through them.",
                keyPoints: ["Resistance equals resistivity times length divided by area", "Material properties", "Temperature effects", "Collision mechanisms"]
            },
            3: {
                title: "Electric Voltage",
                content: "Voltage is the electric potential difference that drives current through circuits. Like water pressure in pipes, voltage provides the energy needed to push charges through resistance, measured in volts.",
                keyPoints: ["Voltage equals work divided by charge", "Potential difference", "Electric field relationship", "Energy per unit charge"]
            },
            4: {
                title: "Ohm's Law",
                content: "Ohm's Law reveals the fundamental relationship between voltage, current, and resistance. This simple equation - voltage equals current times resistance - governs the behavior of all linear electrical circuits.",
                keyPoints: ["V equals I times R", "Linear relationship", "Circuit analysis foundation", "Power calculations"]
            },
            5: {
                title: "Electric Circuits",
                content: "Circuits provide complete pathways for current flow. From simple loops to complex networks, circuits channel electrical energy to perform useful work, following Kirchhoff's laws for current and voltage.",
                keyPoints: ["Complete current path", "Kirchhoff's current law", "Energy conversion", "Circuit elements"]
            },
            6: {
                title: "Series vs Parallel",
                content: "Resistors can be connected in series or parallel, creating dramatically different behaviors. Series circuits share current while parallel circuits share voltage, each configuration having unique advantages.",
                keyPoints: ["Series: total resistance adds", "Parallel: reciprocal resistance adds", "Current and voltage division", "Practical applications"]
            },
            7: {
                title: "Heating Effects",
                content: "When current flows through resistance, electrical energy transforms into heat energy through Joule heating. This effect powers light bulbs and heaters but also causes unwanted losses in electrical systems.",
                keyPoints: ["Power equals I squared times R", "Energy transformation", "Heat generation", "Efficiency considerations"]
            },
            8: {
                title: "Electric Power",
                content: "Electric power is the rate of energy transfer in electrical systems. From power grids that light cities to batteries that power devices, understanding electrical power is essential for our technological world.",
                keyPoints: ["Power equals voltage times current", "Energy per unit time", "Watts measurement", "Power efficiency"]
            }
        };
        
        this.init();
    }
    
    init() {
        this.setupLoading();
        this.setupScrollListeners();
        this.setupKeyboardControls();
        this.setupAudioControls();
        this.initializeVisualization();
    }
    
    setupLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        const progressBar = document.querySelector('.loading-progress');
        
        let progress = 0;
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 15 + 5;
            progressBar.style.width = Math.min(progress, 100) + '%';
            
            if (progress >= 100) {
                clearInterval(loadingInterval);
                setTimeout(() => {
                    loadingScreen.classList.remove('active');
                    this.isLoading = false;
                    this.startExperience();
                }, 500);
            }
        }, 200);
    }
    
    startExperience() {
        this.speakContent(0);
        this.showKeyboardHint();
    }
    
    setupScrollListeners() {
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            if (this.isLoading || this.scrolling) return;
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
            }, 100);
        });
        
        this.updateScrollProgress();
    }
    
    handleScroll() {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollTop / documentHeight;
        
        const newSection = Math.floor(scrollProgress * this.totalSections);
        const clampedSection = Math.max(0, Math.min(newSection, this.totalSections - 1));
        
        if (clampedSection !== this.currentSection) {
            this.transitionToSection(clampedSection);
        }
        
        this.updateScrollProgress();
        this.updateSectionVisibility();
    }
    
    transitionToSection(sectionIndex) {
        if (this.scrolling) return;
        
        this.scrolling = true;
        this.currentSection = sectionIndex;
        
        // Update 3D visualization
        if (this.visualization) {
            this.visualization.setupSection(sectionIndex);
        }
        
        // Speak new content
        this.speakContent(sectionIndex);
        
        // Update UI
        this.updateSectionVisibility();
        this.updateScrollHint();
        
        // Check for completion
        if (sectionIndex === this.totalSections - 1) {
            setTimeout(() => {
                this.showCompletion();
            }, 3000);
        }
        
        setTimeout(() => {
            this.scrolling = false;
        }, 1000);
    }
    
    speakContent(sectionIndex) {
        if (this.isMuted || !('speechSynthesis' in window)) return;
        
        // Cancel any ongoing speech
        speechSynthesis.cancel();
        
        const section = this.sectionContent[sectionIndex];
        if (!section) return;
        
        const utterance = new SpeechSynthesisUtterance(
            `${section.title}. ${section.content}`
        );
        
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 0.8;
        
        // Find a suitable voice
        const voices = speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => 
            voice.name.includes('Alex') || 
            voice.name.includes('Google US English') ||
            voice.lang.startsWith('en-US')
        );
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }
        
        speechSynthesis.speak(utterance);
    }
    
    setupKeyboardControls() {
        document.addEventListener('keydown', (event) => {
            if (this.isLoading) return;
            
            switch(event.key) {
                case ' ': // Spacebar - optimal viewing
                    event.preventDefault();
                    this.setOptimalView();
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    this.navigateSection('up');
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    this.navigateSection('down');
                    break;
                case 'ArrowLeft':
                    event.preventDefault();
                    this.navigateSection('up');
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    this.navigateSection('down');
                    break;
                case 'r':
                case 'R':
                    this.resetCamera();
                    break;
                case 'e':
                case 'E':
                    this.toggleElectronVisibility();
                    break;
                case 'm':
                case 'M':
                    this.toggleMute();
                    break;
                case 'h':
                case 'H':
                    this.showHelp();
                    break;
            }
        });
    }
    
    setOptimalView() {
        if (!this.visualization) return;
        
        // Optimal camera positions for each section
        const optimalPositions = {
            0: [0, 5, 15],   // Charge interaction overview
            1: [8, 3, 12],   // Current flow side view
            2: [10, 5, 15],  // Resistance comparison view
            3: [5, 5, 15],   // Voltage field view
            4: [0, 5, 15],   // Ohm's law central view
            5: [0, 8, 20],   // Circuit overview
            6: [0, 10, 25],  // Series/parallel comparison
            7: [0, 6, 18],   // Heating effects view
            8: [15, 8, 20]   // Power applications view
        };
        
        const targetPos = optimalPositions[this.currentSection] || [0, 5, 15];
        
        // Smooth camera transition
        const camera = this.visualization.camera;
        const startPos = camera.position.clone();
        const endPos = new THREE.Vector3(...targetPos);
        
        let progress = 0;
        const animateCamera = () => {
            progress += 0.02;
            if (progress <= 1) {
                camera.position.lerpVectors(startPos, endPos, this.easeInOutCubic(progress));
                camera.lookAt(0, 0, 0);
                requestAnimationFrame(animateCamera);
            }
        };
        animateCamera();
        
        // Show confirmation
        this.showTemporaryMessage("📸 Optimal view set!");
        
        // Update scroll position to match section
        const targetScroll = (this.currentSection / (this.totalSections - 1)) * 
            (document.documentElement.scrollHeight - window.innerHeight);
        
        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    }
    
    navigateSection(direction) {
        let newSection;
        if (direction === 'up') {
            newSection = Math.max(0, this.currentSection - 1);
        } else {
            newSection = Math.min(this.totalSections - 1, this.currentSection + 1);
        }
        
        if (newSection !== this.currentSection) {
            // Smooth scroll to new section
            const targetScroll = (newSection / (this.totalSections - 1)) * 
                (document.documentElement.scrollHeight - window.innerHeight);
            
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
            });
        }
    }
    
    resetCamera() {
        if (!this.visualization) return;
        
        const camera = this.visualization.camera;
        const startPos = camera.position.clone();
        const endPos = new THREE.Vector3(0, 5, 15);
        
        let progress = 0;
        const animateReset = () => {
            progress += 0.02;
            if (progress <= 1) {
                camera.position.lerpVectors(startPos, endPos, this.easeInOutCubic(progress));
                camera.lookAt(0, 0, 0);
                requestAnimationFrame(animateReset);
            }
        };
        animateReset();
        
        this.showTemporaryMessage("🔄 Camera reset!");
    }
    
    toggleElectronVisibility() {
        if (!this.visualization) return;
        
        const electrons = this.visualization.electrons;
        electrons.forEach(electron => {
            electron.visible = !electron.visible;
        });
        
        const isVisible = electrons.length > 0 ? electrons[0].visible : true;
        this.showTemporaryMessage(`👁️ Electrons ${isVisible ? 'shown' : 'hidden'}!`);
    }
    
    setupAudioControls() {
        const muteBtn = document.getElementById('mute-btn');
        if (muteBtn) {
            muteBtn.addEventListener('click', () => {
                this.toggleMute();
            });
        }
    }
    
    toggleMute() {
        this.isMuted = !this.isMuted;
        
        const muteBtn = document.getElementById('mute-btn');
        if (muteBtn) {
            muteBtn.classList.toggle('muted', this.isMuted);
        }
        
        if (this.isMuted) {
            speechSynthesis.cancel();
        }
        
        this.showTemporaryMessage(`🔊 Audio ${this.isMuted ? 'muted' : 'unmuted'}!`);
    }
    
    updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (scrollTop / documentHeight) * 100;
        
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            progressFill.style.width = Math.min(scrollProgress, 100) + '%';
        }
    }
    
    updateSectionVisibility() {
        const sections = document.querySelectorAll('.cinematic-section');
        sections.forEach((section, index) => {
            if (index === this.currentSection) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }
    
    updateScrollHint() {
        const scrollHint = document.getElementById('scroll-hint');
        if (scrollHint) {
            if (this.currentSection === this.totalSections - 1) {
                scrollHint.classList.remove('visible');
            } else {
                scrollHint.classList.add('visible');
            }
        }
    }
    
    showKeyboardHint() {
        const hint = document.createElement('div');
        hint.className = 'keyboard-hint';
        hint.innerHTML = `
            <div class="hint-content">
                <h3>⌨️ Keyboard Controls</h3>
                <div class="controls-grid">
                    <div><kbd>SPACE</kbd> Optimal View</div>
                    <div><kbd>↑/↓</kbd> Navigate</div>
                    <div><kbd>R</kbd> Reset Camera</div>
                    <div><kbd>E</kbd> Toggle Electrons</div>
                    <div><kbd>M</kbd> Mute/Unmute</div>
                    <div><kbd>H</kbd> Show Help</div>
                </div>
                <p>Use SPACEBAR for best viewing angle of each concept!</p>
            </div>
        `;
        
        hint.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 20, 40, 0.95);
            border: 2px solid #4a9eff;
            border-radius: 15px;
            padding: 20px;
            color: white;
            font-family: 'Arial', sans-serif;
            text-align: center;
            z-index: 10000;
            max-width: 400px;
            backdrop-filter: blur(10px);
            animation: fadeInScale 0.5s ease-out;
        `;
        
        document.body.appendChild(hint);
        
        setTimeout(() => {
            hint.style.animation = 'fadeOutScale 0.5s ease-out forwards';
            setTimeout(() => {
                document.body.removeChild(hint);
            }, 500);
        }, 5000);
    }
    
    showHelp() {
        const help = document.createElement('div');
        help.className = 'help-overlay';
        help.innerHTML = `
            <div class="help-content">
                <h2>⚡ Electrical Concepts Guide</h2>
                <div class="help-sections">
                    <div class="help-section">
                        <h3>🔋 What You'll Learn</h3>
                        <ul>
                            <li>Electric charge interactions (Coulomb's law)</li>
                            <li>Current flow and electron motion</li>
                            <li>Resistance and material properties</li>
                            <li>Voltage and electric potential</li>
                            <li>Ohm's law and circuit analysis</li>
                            <li>Series vs parallel configurations</li>
                            <li>Joule heating effects</li>
                            <li>Electric power calculations</li>
                        </ul>
                    </div>
                    <div class="help-section">
                        <h3>🎮 Navigation</h3>
                        <ul>
                            <li><kbd>SCROLL</kbd> Progress through sections</li>
                            <li><kbd>SPACE</kbd> Set optimal camera view</li>
                            <li><kbd>ARROW KEYS</kbd> Navigate sections</li>
                            <li><kbd>R</kbd> Reset camera position</li>
                            <li><kbd>E</kbd> Toggle electron visibility</li>
                        </ul>
                    </div>
                </div>
                <button onclick="this.parentElement.parentElement.remove()">Close Help</button>
            </div>
        `;
        
        help.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            color: white;
            font-family: 'Arial', sans-serif;
        `;
        
        document.body.appendChild(help);
    }
    
    showTemporaryMessage(message) {
        const messageEl = document.createElement('div');
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(74, 158, 255, 0.9);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            font-family: 'Arial', sans-serif;
            font-weight: bold;
            z-index: 9999;
            animation: slideInRight 0.3s ease-out, slideOutRight 0.3s ease-out 2s forwards;
        `;
        
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 2500);
    }
    
    showCompletion() {
        const completionScreen = document.getElementById('completion-screen');
        if (completionScreen) {
            completionScreen.style.display = 'flex';
            
            // Setup completion buttons
            const restartBtn = document.getElementById('restart-btn');
            const exploreBtn = document.getElementById('explore-btn');
            
            if (restartBtn) {
                restartBtn.addEventListener('click', () => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    completionScreen.style.display = 'none';
                    this.currentSection = 0;
                    this.transitionToSection(0);
                });
            }
            
            if (exploreBtn) {
                exploreBtn.addEventListener('click', () => {
                    window.location.href = 'index.html';
                });
            }
        }
        
        // Completion speech
        if (!this.isMuted) {
            const completionText = "Congratulations! You've completed the comprehensive electrical concepts journey. You now understand the fundamental principles that govern all electrical phenomena, from basic charge interactions to complex power systems.";
            
            const utterance = new SpeechSynthesisUtterance(completionText);
            utterance.rate = 0.9;
            utterance.pitch = 1.0;
            utterance.volume = 0.8;
            
            speechSynthesis.speak(utterance);
        }
    }
    
    initializeVisualization() {
        try {
            if (typeof CinematicElectricalConcepts3D !== 'undefined') {
                this.visualization = new CinematicElectricalConcepts3D();
            } else {
                console.warn('CinematicElectricalConcepts3D not found, retrying...');
                setTimeout(() => this.initializeVisualization(), 1000);
            }
        } catch (error) {
            console.error('Failed to initialize visualization:', error);
            setTimeout(() => this.initializeVisualization(), 2000);
        }
    }
    
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
}

// Add required CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInScale {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    
    @keyframes fadeOutScale {
        from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .keyboard-hint kbd {
        background: #333;
        border: 1px solid #666;
        border-radius: 3px;
        padding: 2px 6px;
        font-family: monospace;
        font-size: 12px;
    }
    
    .controls-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin: 15px 0;
        text-align: left;
    }
    
    .help-content {
        background: rgba(0, 20, 40, 0.95);
        border: 2px solid #4a9eff;
        border-radius: 15px;
        padding: 30px;
        max-width: 800px;
        max-height: 80vh;
        overflow-y: auto;
    }
    
    .help-sections {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        margin: 20px 0;
    }
    
    .help-section h3 {
        color: #4a9eff;
        margin-bottom: 10px;
    }
    
    .help-section ul {
        list-style-type: none;
        padding: 0;
    }
    
    .help-section li {
        padding: 5px 0;
        border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    
    .help-content button {
        background: #4a9eff;
        color: white;
        border: none;
        padding: 10px 30px;
        border-radius: 25px;
        cursor: pointer;
        font-size: 16px;
        margin-top: 20px;
    }
    
    .help-content button:hover {
        background: #3a8eef;
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ElectricalConceptsCinematicController();
    });
} else {
    new ElectricalConceptsCinematicController();
} 