import { Engine } from './engine.js';
import { InputHandler } from './input.js';
import { Background } from './entities/Background.js';
import { Horse } from './entities/Horse.js';
import { Obstacle } from './entities/Obstacle.js';
import { Collectible } from './entities/Collectible.js';
import { checkCollision } from './physics.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d', { alpha: false });

canvas.width = 800;
canvas.height = 400;

const input = new InputHandler(canvas);
const background = new Background(canvas.width, canvas.height);
let horse = new Horse(canvas.width, canvas.height);

let gameSpeed = 6;
let score = 0;
let apples = 0;
let isPaused = false;
let isGameOver = false;

let obstacles = [];
let collectibles = [];
let obstacleTimer = 0;
let collectibleTimer = 0;
let obstacleInterval = 2000;

function resetGame() {
    horse = new Horse(canvas.width, canvas.height);
    obstacles = [];
    collectibles = [];
    score = 0;
    apples = 0;
    gameSpeed = 6;
    isGameOver = false;
    isPaused = false;
    obstacleInterval = 2000;
}

function update(dt) {
    if (input.consumePause()) {
        if (!isGameOver) isPaused = !isPaused;
    }

    if (isGameOver) {
        if (input.consumeJump()) {
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
            if (obstacleInterval > 800) obstacleInterval -= 20;
        }

        // Spawn Collectibles
        collectibleTimer += dt;
        if (collectibleTimer > 3000) {
            if (Math.random() > 0.5) {
                collectibles.push(new Collectible(canvas.width, canvas.height));
            }
            collectibleTimer = 0;
        }

        // Update Obstacles and Check Collisions
        for (let i = obstacles.length - 1; i >= 0; i--) {
            let o = obstacles[i];
            o.update(gameSpeed);
            
            // Death Box (AABB)
            // Making the hit box slightly smaller than visual to feel "fair"
            const horseHitBox = { x: horse.x + 10, y: horse.y + 10, width: horse.width - 20, height: horse.height - 20 };
            const obsHitBox = { x: o.x + 5, y: o.y + 5, width: o.width - 10, height: o.height - 10 };
            
            if (checkCollision(horseHitBox, obsHitBox)) {
                isGameOver = true;
            }

            if (o.markedForDeletion) obstacles.splice(i, 1);
        }

        // Update Collectibles
        for (let i = collectibles.length - 1; i >= 0; i--) {
            let c = collectibles[i];
            c.update(gameSpeed);
            
            if (checkCollision(horse, c)) {
                c.markedForDeletion = true;
                score += 100;
                apples++;
            }

            if (c.markedForDeletion) collectibles.splice(i, 1);
        }
        
        score += gameSpeed * 0.05;
        gameSpeed += 0.001; 
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw(ctx);
    
    collectibles.forEach(c => c.draw(ctx));
    obstacles.forEach(o => o.draw(ctx));
    
    horse.draw(ctx);
    
    // UI Setup
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px "Courier New"';
    
    // Score
    ctx.textAlign = 'right';
    ctx.fillText(`SCORE: ${Math.floor(score).toString().padStart(5, '0')}`, canvas.width - 20, 30);
    ctx.fillText(`APPLES: ${apples}`, canvas.width - 20, 60);
    
    // Mobile friendly controls text
    ctx.textAlign = 'left';
    ctx.font = '14px "Courier New"';
    ctx.fillText('TAP/SPACE: Double Jump', 20, canvas.height - 10);
    
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
        ctx.fillText('Tap or Space to Restart', canvas.width / 2, canvas.height / 2 + 60);
    }
}

const engine = new Engine(update, draw);
engine.start();
console.log("Horse Race Engine Started (60fps Target).");
