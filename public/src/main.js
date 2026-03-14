import { Engine } from './engine.js';
import { InputHandler } from './input.js';
import { Background } from './entities/Background.js';
import { Horse } from './entities/Horse.js';
import { Obstacle } from './entities/Obstacle.js';
import { checkCollision } from './physics.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d', { alpha: false });

canvas.width = 800;
canvas.height = 400;

const input = new InputHandler();
const background = new Background(canvas.width, canvas.height);
let horse = new Horse(canvas.width, canvas.height);

let gameSpeed = 6;
let score = 0;
let isPaused = false;
let isGameOver = false;

let obstacles = [];
let obstacleTimer = 0;
let obstacleInterval = 2000;

function resetGame() {
    horse = new Horse(canvas.width, canvas.height);
    obstacles = [];
    score = 0;
    gameSpeed = 6;
    isGameOver = false;
    isPaused = false;
    obstacleInterval = 2000;
}

function update(dt) {
    if (input.consume('KeyP') || input.consume('Escape')) {
        if (!isGameOver) isPaused = !isPaused;
    }

    if (isGameOver) {
        if (input.consume('Space') || input.consume('Enter')) {
            resetGame();
        }
        return;
    }

    if (!isPaused) {
        background.update(gameSpeed);
        horse.update(input);
        
        // Spawn Obstacles
        obstacleTimer += dt;
        if (obstacleTimer > obstacleInterval) {
            const type = Math.random() > 0.8 ? 'bird' : 'fence';
            obstacles.push(new Obstacle(canvas.width, canvas.height, gameSpeed, type));
            obstacleTimer = 0;
            // Spawns get closer together as you survive longer
            if (obstacleInterval > 800) obstacleInterval -= 20;
        }

        // Update Obstacles and Check Collisions
        for (let i = obstacles.length - 1; i >= 0; i--) {
            let o = obstacles[i];
            o.update(gameSpeed);
            
            // Collision Detection
            if (checkCollision(horse, o)) {
                isGameOver = true;
            }

            if (o.markedForDeletion) {
                obstacles.splice(i, 1);
            }
        }
        
        score += gameSpeed * 0.05;
        gameSpeed += 0.001; 
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw(ctx);
    horse.draw(ctx);
    
    obstacles.forEach(o => o.draw(ctx));
    
    // UI Setup
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px "Courier New"';
    
    // Score
    ctx.textAlign = 'right';
    ctx.fillText(`SCORE: ${Math.floor(score).toString().padStart(5, '0')}`, canvas.width - 20, 30);
    
    ctx.textAlign = 'left';
    ctx.font = '14px "Courier New"';
    ctx.fillText('SPACE/UP: Double Jump | P/ESC: Pause', 20, canvas.height - 10);
    
    if (isPaused) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 40px "Courier New"';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
    }

    if (isGameOver) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.font = 'bold 50px "Courier New"';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 20);
        
        ctx.font = 'bold 20px "Courier New"';
        ctx.fillText(`Final Score: ${Math.floor(score)}`, canvas.width / 2, canvas.height / 2 + 20);
        ctx.font = '16px "Courier New"';
        ctx.fillText('Press SPACE to Restart', canvas.width / 2, canvas.height / 2 + 60);
    }
}

const engine = new Engine(update, draw);
engine.start();
console.log("Horse Race Engine Started (60fps Target).");
