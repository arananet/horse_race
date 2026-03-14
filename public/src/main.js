import { Engine } from './engine.js';
import { InputHandler } from './input.js';
import { Background } from './entities/Background.js';
import { Horse } from './entities/Horse.js';

// Setup Canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d', { alpha: false }); // Optimize for no transparency on base layer

// Base dimensions (Retro 16-bit aspect ratio)
canvas.width = 800;
canvas.height = 400;

// Initialize Core Game Objects
const input = new InputHandler();
const background = new Background(canvas.width, canvas.height);
const horse = new Horse(canvas.width, canvas.height);

// Game State
let gameSpeed = 6;
let score = 0;
let isPaused = false;

// 1. Logic Update Pass (called 60 times a second by Engine fixed timestep)
function update(dt) {
    if (input.consume('KeyP') || input.consume('Escape')) {
        isPaused = !isPaused;
    }

    if (!isPaused) {
        background.update(gameSpeed);
        horse.update(input);
        
        // Endless runner score increases over time
        score += gameSpeed * 0.05;
        
        // Progressively increase speed over time
        gameSpeed += 0.001; 
    }
}

// 2. Rendering Pass
function draw() {
    // Clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Environment
    background.draw(ctx);
    
    // Draw Player
    horse.draw(ctx);
    
    // Draw UI
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px "Courier New"';
    ctx.textAlign = 'right';
    
    // Score Top Right
    ctx.fillText(`SCORE: ${Math.floor(score).toString().padStart(5, '0')}`, canvas.width - 20, 30);
    
    // Controls Info Bottom Left
    ctx.textAlign = 'left';
    ctx.font = '14px "Courier New"';
    ctx.fillText('SPACE/UP: Double Jump | P/ESC: Pause', 20, canvas.height - 10);
    
    // Pause Overlay
    if (isPaused) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'white';
        ctx.font = 'bold 40px "Courier New"';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
    }
}

// Start Game Loop
const engine = new Engine(update, draw);
engine.start();

console.log("Horse Race Engine Started (60fps Target).");
