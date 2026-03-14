// Procedural 8-bit Audio Engine using Web Audio API

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
        playTone(300, 'square', 0.1, 0.05);
        setTimeout(() => playTone(400, 'square', 0.1, 0.05), 50);
    },
    doubleJump: () => {
        playTone(400, 'square', 0.1, 0.05);
        setTimeout(() => playTone(600, 'square', 0.1, 0.05), 50);
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
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.4);
        
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
    }
};

// Procedural 8-bit Motivating Arpeggio Music Generator
let musicInterval;
let isPlaying = false;

// A motivating upbeat progression (Am -> F -> C -> G)
const chords = [
    [440.00, 523.25, 659.25], // A minor (A4, C5, E5)
    [349.23, 440.00, 523.25], // F major (F4, A4, C5)
    [261.63, 329.63, 392.00], // C major (C4, E4, G4)
    [392.00, 493.88, 587.33]  // G major (G4, B4, D5)
];

const bassLine = [220.00, 174.61, 130.81, 196.00]; // A3, F3, C3, G3

export function playMusic() {
    if (!audioCtx) return;
    if (isPlaying) return;
    isPlaying = true;
    
    let step = 0;
    let chordIndex = 0;
    
    musicInterval = setInterval(() => {
        if (!isPlaying) return;
        
        // Change chord every 8 steps (1 bar)
        if (step % 8 === 0) {
            chordIndex = (chordIndex + 1) % chords.length;
        }
        
        const currentChord = chords[chordIndex];
        
        // Fast Arpeggio (driving motivation)
        const note = currentChord[step % 3];
        playTone(note, 'square', 0.1, 0.03); // Quiet, fast melody
        
        // Steady pumping bassline on the beat
        if (step % 2 === 0) {
            playTone(bassLine[chordIndex], 'triangle', 0.15, 0.06);
        }
        
        // Hi-hat / Snare rhythm simulation (white noise-ish via high freq square)
        if (step % 4 === 2) {
            playTone(2000, 'square', 0.05, 0.02);
        }
        
        step++;
    }, 125); // ~120 BPM, 1/8th notes = fast and motivating
}

export function stopMusic() {
    isPlaying = false;
    clearInterval(musicInterval);
}
