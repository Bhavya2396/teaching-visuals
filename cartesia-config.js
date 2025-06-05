// Cartesia Voice Configuration for Physics Teacher Visuals
// Replace 'YOUR_API_KEY_HERE' with your actual Cartesia API key

const CARTESIA_CONFIG = {
    // API Configuration
    apiKey: 'sk_car_pVpj2PpbQW9ybhSTDSjSNX', // Get your API key from https://cartesia.ai
    baseUrl: 'https://api.cartesia.ai/tts/bytes',
    version: '2025-04-16',
    
    // Voice Settings
    voice: {
        mode: 'id',
        id: '694f9389-aac1-45b6-b726-9d9369183238' // Professional educational voice
    },
    
    // Model Configuration
    model: 'sonic-2', // Ultra-fast, high-quality voice
    
    // Audio Output Format
    outputFormat: {
        container: 'wav',
        encoding: 'pcm_f32le',
        sample_rate: 44100
    },
    
    // Playback Settings
    volume: 0.8,
    fallbackEnabled: true // Use browser TTS if Cartesia fails
};

// Enhanced Cartesia TTS Integration
class CartesiaTTS {
    constructor(config = CARTESIA_CONFIG) {
        this.config = config;
        this.currentAudioElement = null;
        this.isEnabled = true;
        
        // Check API key configuration
        if (this.config.apiKey === 'YOUR_API_KEY_HERE') {
            console.warn('⚠️ Cartesia API key not configured. Using fallback browser TTS.');
            console.info('💡 Get your API key at: https://cartesia.ai');
        }
    }
    
    async speak(text) {
        if (!this.isEnabled) {
            console.log('🔇 Cartesia audio disabled');
            return;
        }
        
        if (!this.config.apiKey || this.config.apiKey === 'YOUR_API_KEY_HERE') {
            console.log('🔄 Using fallback TTS (API key not configured)');
            this.fallbackToWebSpeech(text);
            return;
        }
        
        try {
            // Stop any currently playing audio
            this.stop();
            
            // Show loading indicator (optional)
            this.showLoadingIndicator();
            
            // Prepare API request
            const payload = {
                transcript: text,
                model_id: this.config.model,
                voice: this.config.voice,
                output_format: this.config.outputFormat
            };
            
            console.log('🎤 Generating speech with Cartesia...');
            
            // Make API request
            const response = await fetch(this.config.baseUrl, {
                method: 'POST',
                headers: {
                    'Cartesia-Version': this.config.version,
                    'Authorization': `Bearer ${this.config.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            
            if (!response.ok) {
                throw new Error(`Cartesia API error: ${response.status} ${response.statusText}`);
            }
            
            // Process audio response
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            
            // Create and configure audio element
            this.currentAudioElement = new Audio(audioUrl);
            this.currentAudioElement.volume = this.config.volume;
            
            // Set up event listeners
            this.currentAudioElement.addEventListener('loadstart', () => {
                console.log('🎵 Audio loading...');
                this.hideLoadingIndicator();
            });
            
            this.currentAudioElement.addEventListener('canplay', () => {
                console.log('✅ Audio ready to play');
            });
            
            this.currentAudioElement.addEventListener('ended', () => {
                console.log('🏁 Audio playback finished');
                URL.revokeObjectURL(audioUrl);
                this.currentAudioElement = null;
            });
            
            this.currentAudioElement.addEventListener('error', (e) => {
                console.error('❌ Audio playback error:', e);
                URL.revokeObjectURL(audioUrl);
                this.currentAudioElement = null;
                
                if (this.config.fallbackEnabled) {
                    console.log('🔄 Falling back to browser TTS');
                    this.fallbackToWebSpeech(text);
                }
            });
            
            // Start playback
            await this.currentAudioElement.play();
            console.log('▶️ Playing Cartesia-generated audio');
            
        } catch (error) {
            console.error('❌ Cartesia TTS error:', error);
            this.hideLoadingIndicator();
            
            if (this.config.fallbackEnabled) {
                console.log('🔄 Falling back to browser TTS');
                this.fallbackToWebSpeech(text);
            }
        }
    }
    
    fallbackToWebSpeech(text) {
        if (!this.isEnabled) return;
        
        // Cancel any existing speech
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = this.config.volume;
        
        // Try to use a high-quality voice
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => 
            voice.name.includes('Google') || 
            voice.name.includes('Microsoft') || 
            voice.name.includes('Alex') ||
            voice.name.includes('Samantha') ||
            voice.name.includes('Daniel') ||
            voice.lang.includes('en-US')
        );
        
        if (preferredVoice) {
            utterance.voice = preferredVoice;
            console.log(`🎭 Using voice: ${preferredVoice.name}`);
        }
        
        utterance.onstart = () => console.log('▶️ Browser TTS started');
        utterance.onend = () => console.log('🏁 Browser TTS finished');
        utterance.onerror = (e) => console.error('❌ Browser TTS error:', e);
        
        window.speechSynthesis.speak(utterance);
    }
    
    stop() {
        // Stop Cartesia audio
        if (this.currentAudioElement) {
            this.currentAudioElement.pause();
            this.currentAudioElement = null;
            console.log('⏹️ Stopped Cartesia audio');
        }
        
        // Stop browser TTS
        if (window.speechSynthesis && window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            console.log('⏹️ Stopped browser TTS');
        }
        
        this.hideLoadingIndicator();
    }
    
    toggle() {
        this.isEnabled = !this.isEnabled;
        console.log(`🔊 Audio ${this.isEnabled ? 'enabled' : 'disabled'}`);
        
        if (!this.isEnabled) {
            this.stop();
        }
        
        return this.isEnabled;
    }
    
    showLoadingIndicator() {
        // Add visual loading indicator if needed
        const existingIndicator = document.getElementById('tts-loading');
        if (!existingIndicator) {
            const indicator = document.createElement('div');
            indicator.id = 'tts-loading';
            indicator.innerHTML = '🎤 Generating speech...';
            indicator.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(74, 158, 255, 0.9);
                color: white;
                padding: 10px 15px;
                border-radius: 20px;
                font-size: 0.9rem;
                z-index: 9999;
                backdrop-filter: blur(10px);
                box-shadow: 0 4px 15px rgba(74, 158, 255, 0.3);
            `;
            document.body.appendChild(indicator);
        }
    }
    
    hideLoadingIndicator() {
        const indicator = document.getElementById('tts-loading');
        if (indicator) {
            indicator.remove();
        }
    }
}

// Create global TTS instance
window.cartesiaTTS = new CartesiaTTS();

// Enhanced audio scripts for educational content
const PHYSICS_AUDIO_SCRIPTS = {
    // General
    welcome: "Welcome to Physics Teacher Visuals, an interactive learning platform for electrical physics concepts.",
    
    // Charge
    charge_intro: "Electric charge is the fundamental property of matter that causes it to experience electrical forces. There are two types of electric charge: positive and negative. Like charges repel each other, while opposite charges attract.",
    charge_interaction: "Observe how charged particles interact. Positive charges are shown in red, negative charges in blue. Notice how like charges push away from each other, while opposite charges pull together with electrical force.",
    
    // Current
    current_intro: "Electric current is the flow of electric charge through a conductor. Current flows from positive to negative terminals, carrying electrical energy that powers our devices and lights our homes.",
    current_flow: "Watch the flow of electrons through this conductor. Current is measured in amperes, representing the amount of charge flowing past a point each second. The faster the flow, the higher the current.",
    
    // Voltage
    voltage_intro: "Voltage, or potential difference, is the electrical pressure that drives current through a circuit. It's the difference in electrical potential energy between two points, measured in volts.",
    voltage_analogy: "Think of voltage like water pressure in pipes. Higher voltage means stronger electrical pressure, which can push more current through the same resistance.",
    
    // Resistance
    resistance_intro: "Electrical resistance opposes the flow of current through a material. Different materials have different resistance values. Conductors have low resistance, while insulators have very high resistance.",
    resistance_effect: "Observe how resistance affects current flow. Higher resistance reduces current, like a narrow pipe restricting water flow. Ohm's Law describes this precise relationship.",
    
    // Ohm's Law
    ohms_intro: "Ohm's Law is the fundamental relationship in electrical circuits: Voltage equals Current times Resistance. This simple equation V = I × R governs most electrical calculations.",
    ohms_relationship: "See how changing voltage, current, or resistance affects the others. This interactive demonstration shows the mathematical relationship that Georg Ohm discovered in 1827.",
    
    // DC vs AC
    dc_vs_ac_intro: "Direct Current flows in one direction continuously, while Alternating Current changes direction periodically. Both types are essential in our electrical world.",
    current_wars: "The Current Wars of the 1880s saw Edison promoting DC while Tesla championed AC. Tesla's AC system won for power grids, but today we use both types strategically."
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CartesiaTTS, CARTESIA_CONFIG, PHYSICS_AUDIO_SCRIPTS };
} 