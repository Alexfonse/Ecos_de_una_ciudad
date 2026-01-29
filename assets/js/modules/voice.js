/**
 * Voice Module
 * Handles text-to-speech functionality for Don Gaitaloma.
 */

const voiceConfig = new SpeechSynthesisUtterance();
const pigeonSound = new Audio('assets/audio/paloma.mp3'); // Updated path for root
let availableVoices = [];
let isSoundEnabled = true;

// Initial Config
voiceConfig.lang = 'es-CO';
voiceConfig.volume = 1;
voiceConfig.rate = 0.9;
voiceConfig.pitch = 0.95;
pigeonSound.volume = 0.3;

function loadVoices() {
    availableVoices = window.speechSynthesis.getVoices();
    const selectedVoice = 
      availableVoices.find(v => v.name.includes('Google') && v.lang.startsWith('es')) ||
      availableVoices.find(v => v.name.includes('Microsoft') && v.lang.startsWith('es')) ||
      availableVoices.find(v => v.lang === 'es-CO') ||
      availableVoices.find(v => v.lang.startsWith('es'));

    if (selectedVoice) {
      voiceConfig.voice = selectedVoice;
      console.log(`Voice selected: ${selectedVoice.name}`);
    }
}

// Browser Events
if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
    window.addEventListener('beforeunload', () => window.speechSynthesis.cancel());
}

export const VoiceModule = {
    speak: (text) => {
        if (!isSoundEnabled) return;
        window.speechSynthesis.cancel();
        voiceConfig.text = text;
        window.speechSynthesis.speak(voiceConfig);
    },
    
    playSound: (name) => {
        if (!isSoundEnabled) return;
        if (name === 'pigeon') { // Renamed from 'paloma'
            try {
                pigeonSound.currentTime = 0;
                pigeonSound.play();
            } catch (e) {
                console.warn("Could not play pigeon sound:", e);
            }
        }
    },
    
    toggleSound: () => {
        isSoundEnabled = !isSoundEnabled;
        if (!isSoundEnabled) window.speechSynthesis.cancel();
        return isSoundEnabled;
    }
};
