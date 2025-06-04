/**
 * Electric Current - Cinematic Experience Controller
 * Following AI_AGENT_IMPLEMENTATION_GUIDE.md and new-main.html patterns exactly
 * CRITICAL: Experience must flow exactly like new-main.html
 */

class CinematicCurrentExperience {
    constructor() {
        this.currentSection = 0;
        this.totalSections = 8;
        this.isLoading = true;
        this.isAudioEnabled = true;
        this.isComplete = false;
        
        // Audio context for narration
        this.audioContext = null;
        this.narrationAudio = null;
        
        // Section tracking
        this.sectionProgress = 0;
        this.lastScrollTime = 0;
        this.scrollThrottle = 100;
        
        // Timing constants (fallback if not defined in HTML)
        this.timing = window.CINEMATIC_TIMING || {
            loadingDuration: 3000,
            sectionTransition: 800,
            cameraMovement: 2000,
            interactionResponse: 200,
            progressUpdate: 'smooth',
            fadeInOut: 400,
            buttonHover: 150,
            modalAppear: 300
        };
        
        // Initialize experience
        this.init();
    }
    
    init() {
        this.initializeAudio();
        this.setupEventListeners();
        this.startLoadingSequence();
        this.initializeScrollHandling();
    }
    
    initializeAudio() {
        // Initialize Web Audio API for narration
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.log('Audio not available:', error);
        }
    }
    
    setupEventListeners() {
        // Audio control button
        const muteBtn = document.getElementById('mute-btn');
        if (muteBtn) {
            muteBtn.addEventListener('click', () => this.toggleAudio());
        }
        
        // Completion screen buttons
        const restartBtn = document.getElementById('restart-btn');
        const exploreBtn = document.getElementById('explore-btn');
        
        if (restartBtn) {
            restartBtn.addEventListener('click', () => this.restartExperience());
        }
        
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => this.exploreMore());
        }
        
        // Keyboard navigation
        window.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Handle resize
        window.addEventListener('resize', () => this.handleResize());
        
        // Handle visibility change
        document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
    }
    
    startLoadingSequence() {
        const loadingScreen = document.getElementById('loading-screen');
        const progressBar = document.querySelector('.loading-progress');
        
        if (!loadingScreen || !progressBar) return;
        
        // Simulate loading with realistic progress
        let progress = 0;
        const loadingInterval = setInterval(() => {
            // Non-linear progress that feels natural
            if (progress < 30) {
                progress += Math.random() * 5;
            } else if (progress < 60) {
                progress += Math.random() * 3;
            } else if (progress < 90) {
                progress += Math.random() * 2;
            } else if (progress < 99) {
                progress += 0.5;
            }
            
            progressBar.style.width = `${Math.min(progress, 99)}%`;
            
            // Complete loading after timer
            if (progress >= 99) {
                clearInterval(loadingInterval);
                
                // Final progress
                setTimeout(() => {
                    progressBar.style.width = '100%';
                    
                    // Hide loading screen
                    setTimeout(() => {
                        this.completeLoading();
                    }, 200);
                }, 100);
            }
        }, 50);
        
        // Ensure loading completes even if progress stalls
        setTimeout(() => {
            clearInterval(loadingInterval);
            this.completeLoading();
        }, this.timing.loadingDuration);
    }
    
    completeLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            
            // CRITICAL: Enable scrolling by removing loading class from body
            document.body.classList.remove('loading');
            
            // Remove from DOM after transition
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                this.isLoading = false;
                this.startMainExperience();
            }, this.timing.loadingDuration);
        }
    }
    
    startMainExperience() {
        // Initialize 3D visualization
        if (window.currentVisualization && typeof window.currentVisualization.updateSection === 'function') {
            window.currentVisualization.updateSection(0);
        }
        
        // Start narration for first section
        this.playNarration(0);
        
        // Update scroll hint
        this.updateScrollHint();
        
        // Initialize progress
        this.updateProgress();
        
        console.log('Cinematic current experience started - scrolling enabled');
    }
    
    initializeScrollHandling() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking && !this.isLoading) {
                requestAnimationFrame(() => {
                    this.updateSectionBasedOnScroll();
                    this.updateProgress();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        // Passive scroll listener for better performance
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Touch handling for mobile
        let touchStartY = 0;
        
        window.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        window.addEventListener('touchmove', (e) => {
            if (!this.isLoading) {
                const touchY = e.touches[0].clientY;
                const deltaY = touchStartY - touchY;
                
                if (Math.abs(deltaY) > 50) {
                    const direction = deltaY > 0 ? 1 : -1;
                    this.navigateSection(direction);
                    touchStartY = touchY;
                }
            }
        }, { passive: true });
        
        // Immediate scroll handling if already loaded
        if (!this.isLoading) {
            this.updateSectionBasedOnScroll();
            this.updateProgress();
        }
    }
    
    updateSectionBasedOnScroll() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const sectionHeight = windowHeight;
        
        // Calculate current section
        const newSection = Math.floor(scrollPosition / sectionHeight);
        const clampedSection = Math.max(0, Math.min(newSection, this.totalSections - 1));
        
        if (clampedSection !== this.currentSection) {
            this.transitionToSection(clampedSection);
        }
        
        // Update section progress for smooth animations
        const sectionOffset = scrollPosition % sectionHeight;
        this.sectionProgress = sectionOffset / sectionHeight;
    }
    
    transitionToSection(newSection) {
        if (newSection === this.currentSection) return;
        
        const oldSection = this.currentSection;
        this.currentSection = newSection;
        
        // Update visual indicators
        this.updateSectionVisuals(oldSection, newSection);
        
        // Update 3D visualization
        if (window.currentVisualization && typeof window.currentVisualization.updateSection === 'function') {
            window.currentVisualization.updateSection(newSection);
        }
        
        // Play section narration
        this.playNarration(newSection);
        
        // Update scroll hint
        this.updateScrollHint();
        
        // Check for completion
        if (newSection === this.totalSections - 1) {
            this.checkForCompletion();
        }
        
        console.log(`Transitioned to section ${newSection + 1}`);
    }
    
    updateSectionVisuals(oldSection, newSection) {
        // Update section active states
        const sections = document.querySelectorAll('.cinematic-section');
        
        sections.forEach((section, index) => {
            if (index === newSection) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }
    
    updateProgress() {
        const progressFill = document.getElementById('progress-fill');
        if (!progressFill) return;
        
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        const scrollProgress = (scrollTop / (documentHeight - windowHeight)) * 100;
        progressFill.style.width = `${Math.min(Math.max(scrollProgress, 0), 100)}%`;
    }
    
    updateScrollHint() {
        const scrollHint = document.getElementById('scroll-hint');
        if (!scrollHint) return;
        
        // Hide hint after first section or near completion
        if (this.currentSection > 0 || this.sectionProgress > 0.8) {
            scrollHint.classList.remove('visible');
        } else {
            scrollHint.classList.add('visible');
        }
    }
    
    playNarration(sectionIndex) {
        if (!this.isAudioEnabled) return;
        
        // Narration text for each section
        const narrationTexts = [
            "Electric current is the flow of electric charge through a conductor. Watch as electrons move through copper wire, creating the invisible river of energy that powers our modern world.",
            "Individual electrons move slowly through the conductor - just millimeters per second. But their collective motion creates current that propagates at nearly the speed of light.",
            "Voltage drives current through resistance. This fundamental relationship governs all electrical circuits - from the simplest LED to complex computer processors.",
            "When current flows through resistance, electrical energy converts to heat. This power relationship determines everything from LED brightness to electric heating elements.",
            "By convention, current flows from positive to negative terminals. But electrons actually move in the opposite direction - a historical artifact that still influences circuit analysis today.",
            "Current density measures how much current flows through each square meter of conductor. Higher density creates more heat and determines safe operating limits for electrical systems.",
            "Direct current flows steadily in one direction, while alternating current reverses direction periodically. AC powers our homes because it efficiently travels long distances and transforms voltage levels.",
            "Electric current is the lifeblood of modern technology. From neural signals in your brain to vast power grids spanning continents, understanding current unlocks the secrets of our electric age."
        ];
        
        const text = narrationTexts[sectionIndex];
        if (text && 'speechSynthesis' in window) {
            // Cancel any existing speech
            speechSynthesis.cancel();
            
            // Create new utterance
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            utterance.pitch = 1.0;
            utterance.volume = 0.7;
            
            // Use a suitable voice if available
            const voices = speechSynthesis.getVoices();
            const preferredVoice = voices.find(voice => 
                voice.lang.startsWith('en') && voice.name.includes('Google')
            ) || voices.find(voice => voice.lang.startsWith('en'));
            
            if (preferredVoice) {
                utterance.voice = preferredVoice;
            }
            
            speechSynthesis.speak(utterance);
        }
    }
    
    toggleAudio() {
        this.isAudioEnabled = !this.isAudioEnabled;
        const muteBtn = document.getElementById('mute-btn');
        
        if (muteBtn) {
            if (this.isAudioEnabled) {
                muteBtn.classList.remove('muted');
            } else {
                muteBtn.classList.add('muted');
                speechSynthesis.cancel();
            }
        }
    }
    
    navigateSection(direction) {
        const newSection = this.currentSection + direction;
        
        if (newSection >= 0 && newSection < this.totalSections) {
            // Smooth scroll to section
            const targetY = newSection * window.innerHeight;
            
            window.scrollTo({
                top: targetY,
                behavior: 'smooth'
            });
        }
    }
    
    handleKeyboard(event) {
        if (this.isLoading) return;
        
        switch (event.key) {
            case 'ArrowDown':
            case ' ':
                event.preventDefault();
                this.navigateSection(1);
                break;
                
            case 'ArrowUp':
                event.preventDefault();
                this.navigateSection(-1);
                break;
                
            case 'Home':
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
                
            case 'End':
                event.preventDefault();
                window.scrollTo({ 
                    top: document.documentElement.scrollHeight, 
                    behavior: 'smooth' 
                });
                break;
                
            case 'm':
            case 'M':
                this.toggleAudio();
                break;
                
            case 'Escape':
                if (this.isComplete) {
                    this.hideCompletion();
                }
                break;
        }
    }
    
    checkForCompletion() {
        // Check if user has spent enough time on final section
        setTimeout(() => {
            if (this.currentSection === this.totalSections - 1 && !this.isComplete) {
                this.showCompletion();
            }
        }, 3000);
    }
    
    showCompletion() {
        this.isComplete = true;
        const completionScreen = document.getElementById('completion-screen');
        
        if (completionScreen) {
            completionScreen.classList.add('active');
            
            // Play completion narration
            if (this.isAudioEnabled && 'speechSynthesis' in window) {
                const completionText = "Congratulations! You've completed your journey through electric current. You now understand the fundamental force that powers our modern world.";
                const utterance = new SpeechSynthesisUtterance(completionText);
                utterance.rate = 0.9;
                utterance.pitch = 1.1;
                utterance.volume = 0.8;
                
                setTimeout(() => {
                    speechSynthesis.speak(utterance);
                }, 1000);
            }
        }
    }
    
    hideCompletion() {
        this.isComplete = false;
        const completionScreen = document.getElementById('completion-screen');
        
        if (completionScreen) {
            completionScreen.classList.remove('active');
        }
    }
    
    restartExperience() {
        this.hideCompletion();
        this.currentSection = 0;
        this.sectionProgress = 0;
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Reset 3D visualization
        if (window.currentVisualization && typeof window.currentVisualization.updateSection === 'function') {
            window.currentVisualization.updateSection(0);
        }
        
        // Play first section narration
        setTimeout(() => {
            this.playNarration(0);
        }, 1000);
    }
    
    exploreMore() {
        // In a real implementation, this would navigate to other physics topics
        window.open('https://en.wikipedia.org/wiki/Electric_current', '_blank');
    }
    
    handleResize() {
        // Update section calculations
        setTimeout(() => {
            this.updateSectionBasedOnScroll();
            this.updateProgress();
        }, 100);
        
        // Notify 3D visualization
        if (window.currentVisualization && typeof window.currentVisualization.handleResize === 'function') {
            window.currentVisualization.handleResize();
        }
    }
    
    handleVisibilityChange() {
        if (document.hidden) {
            // Pause animations and audio when tab is hidden
            speechSynthesis.pause();
        } else {
            // Resume when tab becomes visible
            if (this.isAudioEnabled) {
                speechSynthesis.resume();
            }
        }
    }
    
    dispose() {
        // Clean up event listeners and resources
        speechSynthesis.cancel();
        
        if (this.audioContext) {
            this.audioContext.close();
        }
    }
}

// Initialize cinematic experience when DOM is ready
let cinematicExperience = null;

function initializeCinematicExperience() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            cinematicExperience = new CinematicCurrentExperience();
        });
    } else {
        cinematicExperience = new CinematicCurrentExperience();
    }
}

// Start initialization
initializeCinematicExperience();

// Handle cleanup
window.addEventListener('beforeunload', () => {
    if (cinematicExperience) {
        cinematicExperience.dispose();
    }
});

// Export for debugging
if (typeof window !== 'undefined') {
    window.cinematicExperience = cinematicExperience;
} 