// Cinematic Experience Controller
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let currentSection = 0;
    let totalSections = document.querySelectorAll('.cinematic-section').length;
    let isLoading = true;
    let cinematicCharge3D = null;
    let voiceFeedbackEnabled = true;
    let currentVoice = null;

    // DOM Elements
    const loadingScreen = document.getElementById('loading-screen');
    const scrollHint = document.getElementById('scroll-hint');
    const progressFill = document.getElementById('progress-fill');
    const scrollableContent = document.getElementById('scrollable-content');
    const audioControl = document.getElementById('audio-control');
    const muteBtn = document.getElementById('mute-btn');

    // Voice feedback content
    const voiceFeedback = {
        sections: [
            "Welcome to the Electric Charge visualization. Let's explore the fundamental force that powers our world.",
            "Electric charge comes in two types: positive and negative. These charges create forces that shape matter itself.",
            "Like charges repel each other. Watch as these positive charges push against each other.",
            "Opposite charges attract. Notice how positive and negative charges pull together.",
            "The size of the charge matters. Larger charges create stronger forces.",
            "Distance affects the force between charges. The force weakens with distance according to the inverse square law.",
            "Electric fields surround every charge, creating a landscape of force that extends through space.",
            "Understanding electric charge is key to understanding the universe, from atoms to lightning."
        ]
    };

    // Optimal camera positions for each section
    const optimalCameraPositions = [
        { position: [0, 5, 15], lookAt: [0, 0, 0] },   // Intro - front view
        { position: [8, 3, 12], lookAt: [0, 0, 0] },   // Nature - angled view
        { position: [0, 8, 18], lookAt: [0, 0, 0] },   // Repulsion - high angle
        { position: [0, 3, 12], lookAt: [0, 0, 0] },   // Attraction - close view
        { position: [0, 10, 20], lookAt: [0, 0, 0] },  // Magnitude - overview
        { position: [12, 5, 15], lookAt: [0, 0, 0] },  // Distance - side view
        { position: [0, 15, 25], lookAt: [0, 0, 0] },  // Field - high overview
        { position: [15, 10, 20], lookAt: [0, 0, 0] }  // Universal - dramatic angle
    ];

    // Initialize 3D visualization
    function initVisualization() {
        cinematicCharge3D = new CinematicCharge3D();
    }

    // Loading screen management
    function hideLoadingScreen() {
        isLoading = false;
        loadingScreen.classList.remove('active');
        scrollHint.classList.add('visible');
    }

    // Set optimal viewing position
    function setOptimalPosition() {
        if (cinematicCharge3D && optimalCameraPositions[currentSection]) {
            const optimal = optimalCameraPositions[currentSection];
            
            // Smoothly animate camera to optimal position
            animateCameraToPosition(optimal.position, optimal.lookAt);
            
            // Scroll to the current section
            scrollToSection(currentSection);
            
            // Show visual feedback
            showPositionFeedback();
        }
    }

    // Animate camera to specific position
    function animateCameraToPosition(targetPos, lookAtPos) {
        if (!cinematicCharge3D) return;
        
        const camera = cinematicCharge3D.camera;
        const startPos = camera.position.clone();
        const endPos = new THREE.Vector3(...targetPos);
        const lookAtTarget = new THREE.Vector3(...lookAtPos);
        
        let progress = 0;
        const duration = 1000; // 1 second
        const startTime = performance.now();
        
        function animateStep(currentTime) {
            progress = Math.min((currentTime - startTime) / duration, 1);
            const easedProgress = easeInOutCubic(progress);
            
            // Interpolate camera position
            camera.position.lerpVectors(startPos, endPos, easedProgress);
            camera.lookAt(lookAtTarget);
            
            if (progress < 1) {
                requestAnimationFrame(animateStep);
            }
        }
        
        requestAnimationFrame(animateStep);
    }

    // Smooth scroll to section
    function scrollToSection(sectionIndex) {
        const sectionHeight = window.innerHeight;
        const targetScroll = sectionIndex * sectionHeight;
        
        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    }

    // Show visual feedback for optimal positioning
    function showPositionFeedback() {
        // Create temporary feedback element
        const feedback = document.createElement('div');
        feedback.textContent = '📐 Optimal viewing position set';
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(74, 158, 255, 0.9);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            font-size: 16px;
            font-weight: bold;
            z-index: 10000;
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(feedback);
        
        // Fade in
        requestAnimationFrame(() => {
            feedback.style.opacity = '1';
        });
        
        // Remove after 2 seconds
        setTimeout(() => {
            feedback.style.opacity = '0';
            setTimeout(() => {
                if (feedback.parentNode) {
                    feedback.parentNode.removeChild(feedback);
                }
            }, 300);
        }, 2000);
    }

    // Easing function
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    // Section management
    function updateSection(index) {
        if (index < 0 || index >= totalSections) return;
        
        // Update current section
        currentSection = index;
        
        // Update visualization
        if (cinematicCharge3D) {
            cinematicCharge3D.setupSection(currentSection);
        }

        // Update active section styling
        document.querySelectorAll('.cinematic-section').forEach((section, i) => {
            if (i === currentSection) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });

        // Play voice feedback
        playVoiceFeedback(currentSection);
    }

    // Scroll handling
    function handleScroll() {
        if (isLoading) return;

        // Calculate scroll progress
        const scrollPercent = (window.scrollY / (scrollableContent.scrollHeight - window.innerHeight)) * 100;
        progressFill.style.width = `${scrollPercent}%`;

        // Calculate current section based on scroll position
        const newSection = Math.floor((scrollPercent / 100) * totalSections);
        if (newSection !== currentSection) {
            updateSection(newSection);
        }

        // Hide scroll hint after user starts scrolling
        if (window.scrollY > 50) {
            scrollHint.classList.remove('visible');
        }
    }

    // Keyboard handling
    function handleKeyPress(event) {
        switch(event.code) {
            case 'Space':
                event.preventDefault(); // Prevent default spacebar scroll
                setOptimalPosition();
                break;
            case 'ArrowUp':
                event.preventDefault();
                if (currentSection > 0) {
                    updateSection(currentSection - 1);
                    scrollToSection(currentSection);
                }
                break;
            case 'ArrowDown':
                event.preventDefault();
                if (currentSection < totalSections - 1) {
                    updateSection(currentSection + 1);
                    scrollToSection(currentSection);
                }
                break;
            case 'KeyR':
                // Reset to default camera position
                if (cinematicCharge3D) {
                    cinematicCharge3D.animateCamera(currentSection);
                }
                break;
        }
    }

    // Voice feedback
    function playVoiceFeedback(sectionIndex) {
        if (!voiceFeedbackEnabled) return;

        if ('speechSynthesis' in window) {
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();

            const text = voiceFeedback.sections[sectionIndex];
            const utterance = new SpeechSynthesisUtterance(text);
            currentVoice = utterance;

            // Configure voice
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            utterance.volume = 1.0;
            utterance.lang = 'en-US';

            // Get available voices
            let voices = window.speechSynthesis.getVoices();
            if (voices.length === 0) {
                window.speechSynthesis.onvoiceschanged = () => {
                    voices = window.speechSynthesis.getVoices();
                    const preferredVoice = voices.find(voice => 
                        voice.name.includes('Google') || voice.name.includes('Female') || voice.name.includes('en-US')
                    );
                    if (preferredVoice) utterance.voice = preferredVoice;
                    window.speechSynthesis.speak(utterance);
                };
            } else {
                const preferredVoice = voices.find(voice => 
                    voice.name.includes('Google') || voice.name.includes('Female') || voice.name.includes('en-US')
                );
                if (preferredVoice) utterance.voice = preferredVoice;
                window.speechSynthesis.speak(utterance);
            }

            // Handle voice events
            utterance.onend = () => {
                currentVoice = null;
            };

            utterance.onerror = (event) => {
                console.error('Speech synthesis error:', event);
                currentVoice = null;
            };
        }
    }

    // Audio control
    function toggleAudio() {
        voiceFeedbackEnabled = !voiceFeedbackEnabled;
        muteBtn.classList.toggle('muted');

        if (!voiceFeedbackEnabled) {
            window.speechSynthesis.cancel();
            currentVoice = null;
        } else {
            playVoiceFeedback(currentSection);
        }
    }

    // Event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('resize', () => {
        if (cinematicCharge3D) {
            cinematicCharge3D.onWindowResize();
        }
    });

    muteBtn.addEventListener('click', toggleAudio);

    // Handle visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && currentVoice) {
            window.speechSynthesis.pause();
        } else if (!document.hidden && currentVoice) {
            window.speechSynthesis.resume();
        }
    });

    // Initialize everything
    initVisualization();
    
    // Hide loading screen after a delay
    setTimeout(hideLoadingScreen, 2000);

    // Start with first section
    updateSection(0);
    
    // Show keyboard controls hint
    setTimeout(() => {
        showKeyboardHint();
    }, 3000);
    
    function showKeyboardHint() {
        const hint = document.createElement('div');
        hint.innerHTML = `
            <div style="margin-bottom: 10px;"><strong>Keyboard Controls:</strong></div>
            <div>🔧 <strong>Spacebar</strong> - Optimal viewing position</div>
            <div>⬆️ <strong>↑</strong> - Previous section</div>
            <div>⬇️ <strong>↓</strong> - Next section</div>
            <div>🔄 <strong>R</strong> - Reset camera</div>
        `;
        hint.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px;
            border-radius: 10px;
            font-size: 14px;
            z-index: 10000;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(74, 158, 255, 0.5);
            max-width: 280px;
            line-height: 1.4;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;
        
        document.body.appendChild(hint);
        
        // Fade in
        requestAnimationFrame(() => {
            hint.style.opacity = '1';
        });
        
        // Remove after 8 seconds
        setTimeout(() => {
            hint.style.opacity = '0';
            setTimeout(() => {
                if (hint.parentNode) {
                    hint.parentNode.removeChild(hint);
                }
            }, 500);
        }, 8000);
    }
}); 