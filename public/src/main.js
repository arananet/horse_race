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

// State Machine: MENU, PLAYING, PAUSED, GAMEOVER, HIGHSCORES
let currentState = 'MENU';
let menuSelection = 0; // 0 = Start, 1 = High Scores

let gameSpeed = 6;
let score = 0;
let apples = 0;

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
    obstacleInterval = 2000;
    currentState = 'PLAYING';
}

function update(dt) {
    if (currentState === 'MENU') {
        background.update(2.0); // Scroll background slowly on menu
        
        if (input.consumeUp() || input.consumeDown()) {
            menuSelection = menuSelection === 0 ? 1 : 0;
        }
        
        if (input.consumeEnter()) {
            if (menuSelection === 0) resetGame();
            if (menuSelection === 1) currentState = 'HIGHSCORES';
        }
        
        // Mouse/Touch controls for Menu
        const startBtn = { x: 300, y: 220, w: 200, h: 40 };
        const scoreBtn = { x: 300, y: 270, w: 200, h: 40 };
        
        if (input.isHovering(startBtn)) menuSelection = 0;
        if (input.isHovering(scoreBtn)) menuSelection = 1;
        
        if (input.consumeClick(startBtn)) resetGame();
        if (input.consumeClick(scoreBtn)) currentState = 'HIGHSCORES';
        
        return;
    }

    if (currentState === 'HIGHSCORES') {
        background.update(1.0);
        if (input.consumeEnter() || input.consumeJump()) {
            currentState = 'MENU';
        }
        return;
    }

    if (currentState === 'PAUSED') {
        if (input.consumePause()) currentState = 'PLAYING';
        return;
    }

    if (currentState === 'GAMEOVER') {
        if (input.consumeJump() || input.consumeEnter()) {
            currentState = 'MENU';
        }
        return;
    }

    if (currentState === 'PLAYING') {
        if (input.consumePause()) {
            currentState = 'PAUSED';
            return;
        }

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

        for (let i = obstacles.length - 1; i >= 0; i--) {
            let o = obstacles[i];
            o.update(gameSpeed);
            
            const horseHitBox = { x: horse.x + 10, y: horse.y + 10, width: horse.width - 20, height: horse.height - 20 };
            const obsHitBox = { x: o.x + 5, y: o.y + 5, width: o.width - 10, height: o.height - 10 };
            
            if (checkCollision(horseHitBox, obsHitBox)) {
                // Save High Score logic could go here
                currentState = 'GAMEOVER';
            }

            if (o.markedForDeletion) obstacles.splice(i, 1);
        }

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

function drawMenu() {
    ctx.textAlign = 'center';
    
    // Draw Title (Roach Race Style)
    ctx.fillStyle = '#ff4500'; // Orange/Red
    ctx.font = 'bold 60px "Courier New"';
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'white';
    ctx.strokeText('ROACH RACE', canvas.width / 2, 120);
    ctx.fillText('ROACH RACE', canvas.width / 2, 120);
    
    // Blue sub-shadow for retro 3D feel
    ctx.fillStyle = '#000080';
    ctx.fillText('ROACH RACE', canvas.width / 2 + 4, 124);
    
    // Menu Options
    ctx.font = 'bold 30px "Courier New"';
    
    const startColor = menuSelection === 0 ? 'white' : '#aaaaaa';
    const scoreColor = menuSelection === 1 ? 'white' : '#aaaaaa';
    
    ctx.fillStyle = startColor;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.strokeText('START GAME', canvas.width / 2, 250);
    ctx.fillText('START GAME', canvas.width / 2, 250);
    
    // Draw cursor carrot for Start
    if (menuSelection === 0) {
        ctx.fillStyle = 'orange';
        ctx.fillText('🥕', canvas.width / 2 - 120, 250);
    }
    
    ctx.fillStyle = scoreColor;
    ctx.strokeText('HIGH SCORES', canvas.width / 2, 300);
    ctx.fillText('HIGH SCORES', canvas.width / 2, 300);
    
    // Draw cursor carrot for Scores
    if (menuSelection === 1) {
        ctx.fillStyle = 'orange';
        ctx.fillText('🥕', canvas.width / 2 - 130, 300);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw(ctx);
    
    if (currentState === 'MENU') {
        drawMenu();
        // Draw a decorative horse on the menu
        horse.draw(ctx);
        return;
    }

    if (currentState === 'HIGHSCORES') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);
        
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.font = 'bold 40px "Courier New"';
        ctx.fillText('HIGH SCORES', canvas.width / 2, 110);
        
        ctx.font = '20px "Courier New"';
        ctx.fillText('1. 00000', canvas.width / 2, 170);
        ctx.fillText('2. 00000', canvas.width / 2, 210);
        ctx.fillText('3. 00000', canvas.width / 2, 250);
        
        ctx.fillStyle = 'orange';
        ctx.fillText('Press SPACE to return', canvas.width / 2, 320);
        return;
    }

    // In-Game Rendering
    collectibles.forEach(c => c.draw(ctx));
    obstacles.forEach(o => o.draw(ctx));
    horse.draw(ctx);
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px "Courier New"';
    ctx.textAlign = 'right';
    ctx.fillText(`SCORE: ${Math.floor(score).toString().padStart(5, '0')}`, canvas.width - 20, 30);
    ctx.fillText(`APPLES: ${apples}`, canvas.width - 20, 60);
    
    ctx.textAlign = 'left';
    ctx.font = '14px "Courier New"';
    ctx.fillText('TAP/SPACE: Double Jump', 20, canvas.height - 10);
    
    if (currentState === 'PAUSED') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 40px "Courier New"';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
    }

    if (currentState === 'GAMEOVER') {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.font = 'bold 50px "Courier New"';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 20);
        
        ctx.font = 'bold 20px "Courier New"';
        ctx.fillText(`Final Score: ${Math.floor(score)}`, canvas.width / 2, canvas.height / 2 + 20);
        ctx.font = '16px "Courier New"';
        ctx.fillText('Tap or Space to Menu', canvas.width / 2, canvas.height / 2 + 60);
    }
}

const engine = new Engine(update, draw);
engine.start();
console.log("Horse Race Engine Started (60fps Target).");
