// Procedural 8-bit Audio Engine using Web Audio API
// No external MP3/WAV files required! Everything generated in browser.

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;

export function initAudio() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playTone(freq, type, duration, vol = 0.1) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

export const SFX = {
    jump: () => {
        playTone(300, 'square', 0.1, 0.1);
        setTimeout(() => playTone(400, 'square', 0.1, 0.1), 50);
    },
    doubleJump: () => {
        playTone(400, 'square', 0.1, 0.1);
        setTimeout(() => playTone(600, 'square', 0.1, 0.1), 50);
    },
    apple: () => {
        playTone(600, 'sine', 0.1, 0.1);
        setTimeout(() => playTone(800, 'sine', 0.2, 0.1), 50);
    },
    hit: () => {
        playTone(150, 'sawtooth', 0.2, 0.2);
        setTimeout(() => playTone(100, 'sawtooth', 0.3, 0.2), 50);
    },
    eagle: () => {
        // High pitched descending screech
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.4);
        
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
    }
};

// Procedural 8-bit Music Generator
let musicOsc1, musicOsc2, musicGain;
let musicInterval;
let isPlaying = false;

const scale = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25]; // C Major
const bass = [130.81, 146.83, 164.81, 174.61, 196.00, 220.00, 246.94, 261.63];

export function playMusic() {
    if (!audioCtx) return;
    if (isPlaying) return;
    isPlaying = true;
    
    let step = 0;
    musicInterval = setInterval(() => {
        if (!isPlaying) return;
        
        // Melody
        if (Math.random() > 0.3) {
            const note = scale[Math.floor(Math.random() * scale.length)];
            playTone(note, 'square', 0.15, 0.05);
        }
        
        // Bassline every 2 steps
        if (step % 2 === 0) {
            const b = bass[Math.floor(Math.random() * 4)]; // Just root notes
            playTone(b, 'triangle', 0.2, 0.08);
        }
        
        step++;
    }, 200); // 150 BPM
}

export function stopMusic() {
    isPlaying = false;
    clearInterval(musicInterval);
}
