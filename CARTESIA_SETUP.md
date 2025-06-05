# Cartesia Voice Integration Setup

## Overview
All physics teacher visual pages now use Cartesia's high-quality text-to-speech API for professional narration. The system automatically falls back to browser TTS if Cartesia is not configured.

## Setup Instructions

### 1. Get Your Cartesia API Key
1. Visit [https://cartesia.ai](https://cartesia.ai)
2. Sign up for an account
3. Navigate to your dashboard
4. Generate an API key

### 2. Configure the API Key
1. Open `cartesia-config.js` in your project
2. Replace `'YOUR_API_KEY_HERE'` with your actual API key:
   ```javascript
   apiKey: 'your-actual-api-key-here'
   ```

### 3. Test the Integration
1. Open any physics page in your browser
2. The page should automatically start narrating with high-quality voice
3. Check the browser console for status messages:
   - ✅ "Playing Cartesia-generated audio" = Working correctly
   - ⚠️ "Using fallback TTS" = API key not configured, using browser TTS

## Features

### High-Quality Voice
- Professional educational voice optimized for learning
- Ultra-fast 90ms response time with Sonic-2 model
- Natural pronunciation of technical terms

### Automatic Fallback
- If Cartesia API is unavailable, automatically uses browser TTS
- No interruption to the learning experience
- Seamless switching between voice systems

### Smart Audio Management
- Stops previous audio when starting new narration
- Visual loading indicators during speech generation
- Proper cleanup of audio resources

## Pages with Cartesia Integration

All physics pages now support Cartesia voice:

1. **Electric Charge** (`electrical-charge-illustration.html`)
   - Charge interactions and conservation laws
   
2. **Electric Current** (`electrical-current-flow.html`)
   - Current flow and electron movement
   
3. **Voltage & Potential** (`voltage-potential-difference.html`)
   - Electrical pressure and energy concepts
   
4. **Electrical Resistance** (`resistance-enhanced.html`)
   - Resistance effects and color codes
   
5. **Ohm's Law** (`ohms-law-new.html`)
   - Mathematical relationships in circuits
   
6. **DC vs AC Current** (`dc-vs-ac.html`)
   - Current types and historical context

## Configuration Options

You can customize the voice settings in `cartesia-config.js`:

```javascript
const CARTESIA_CONFIG = {
    // Voice selection
    voice: {
        mode: 'id',
        id: '694f9389-aac1-45b6-b726-9d9369183238' // Professional educational voice
    },
    
    // Model selection
    model: 'sonic-2', // Ultra-fast, high-quality
    // model: 'sonic-turbo', // Even faster (40ms response)
    
    // Audio quality
    outputFormat: {
        container: 'wav',
        encoding: 'pcm_f32le',
        sample_rate: 44100
    },
    
    // Playback settings
    volume: 0.8,
    fallbackEnabled: true
};
```

## Troubleshooting

### No Audio Playing
1. Check if API key is configured correctly
2. Verify internet connection
3. Check browser console for error messages
4. Ensure audio is not muted in browser

### Poor Audio Quality
1. Verify you're using the correct voice ID
2. Check your internet connection speed
3. Try switching to `sonic-turbo` model for faster response

### API Errors
1. Verify API key is valid and active
2. Check Cartesia account usage limits
3. Ensure proper API endpoint configuration

## Cost Considerations

- Cartesia charges per character of text converted
- Educational content typically uses 50-200 characters per narration
- Consider usage patterns when deploying to production
- Fallback TTS ensures functionality even without API credits

## Support

For Cartesia API issues:
- Visit [Cartesia Documentation](https://docs.cartesia.ai)
- Contact support@cartesia.ai

For integration issues:
- Check browser console for detailed error messages
- Verify all files are properly linked
- Test with fallback TTS to isolate issues 