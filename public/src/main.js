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

let currentState = 'MENU';
let menuSelection = 0; 
let highScores = JSON.parse(localStorage.getItem('roachRaceHighScores')) || [];

let gameSpeed = 6;
let score = 0;
let apples = 0;
let distance = 0;

let obstacles = [];
let collectibles = [];
let obstacleTimer = 0;
let collectibleTimer = 0;
let obstacleInterval = 1500;

// Load font before starting to ensure rendering doesn't glitch on first paint
document.fonts.ready.then(() => {
    console.log("Fonts loaded.");
});

function resetGame() {
    horse = new Horse(canvas.width, canvas.height);
    obstacles = [];
    collectibles = [];
    score = 0;
    apples = 0;
    distance = 0;
    gameSpeed = 5; 
    obstacleInterval = 1500;
    currentState = 'PLAYING';
}

function saveHighScore() {
    const finalScore = Math.floor(score);
    highScores.push(finalScore);
    highScores.sort((a, b) => b - a);
    highScores = highScores.slice(0, 5); 
    localStorage.setItem('roachRaceHighScores', JSON.stringify(highScores));
}

function update(dt) {
    if (currentState === 'MENU') {
        background.update(1.0); 
        
        if (input.consumeUp() || input.consumeDown()) {
            menuSelection = menuSelection === 0 ? 1 : 0;
        }
        
        if (input.consumeEnter()) {
            if (menuSelection === 0) resetGame();
            if (menuSelection === 1) currentState = 'HIGHSCORES';
        }
        
        const startBtn = { x: 300, y: 220, w: 200, h: 40 };
        const scoreBtn = { x: 300, y: 270, w: 200, h: 40 };
        
        if (input.isHovering(startBtn)) menuSelection = 0;
        if (input.isHovering(scoreBtn)) menuSelection = 1;
        
        if (input.consumeClick(startBtn)) resetGame();
        if (input.consumeClick(scoreBtn)) currentState = 'HIGHSCORES';
        
        return;
    }

    if (currentState === 'HIGHSCORES') {
        background.update(0.5);
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
        
        obstacleTimer += dt;
        if (obstacleTimer > obstacleInterval) {
            let type = 'fence';
            if (distance > 1000 && Math.random() > 0.6) {
                type = 'bird';
            }
            obstacles.push(new Obstacle(canvas.width, canvas.height, gameSpeed, type));
            obstacleTimer = 0;
            if (obstacleInterval > 700) obstacleInterval -= 15;
        }

        collectibleTimer += dt;
        if (collectibleTimer > 2000) {
            if (Math.random() > 0.4) {
                collectibles.push(new Collectible(canvas.width, canvas.height));
            }
            collectibleTimer = 0;
        }

        for (let i = obstacles.length - 1; i >= 0; i--) {
            let o = obstacles[i];
            o.update(gameSpeed);
            
            const horseHitBox = { x: horse.x + 15, y: horse.y + 15, width: horse.width - 30, height: horse.height - 30 };
            const obsHitBox = { x: o.x + 10, y: o.y + 10, width: o.width - 20, height: o.height - 20 };
            
            if (checkCollision(horseHitBox, obsHitBox)) {
                saveHighScore();
                currentState = 'GAMEOVER';
            }

            if (o.markedForDeletion) obstacles.splice(i, 1);
        }

        for (let i = collectibles.length - 1; i >= 0; i--) {
            let c = collectibles[i];
            c.update(gameSpeed);
            
            if (checkCollision(horse, c)) {
                c.markedForDeletion = true;
                score += 50; 
                apples++;
            }

            if (c.markedForDeletion) collectibles.splice(i, 1);
        }
        
        distance += gameSpeed * 0.1;
        score += gameSpeed * 0.05;
        gameSpeed += 0.0005; 
    }
}

function drawMenu() {
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ff4500';
    ctx.font = '50px "Press Start 2P", Courier';
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'white';
    ctx.strokeText('ROACH RACE', canvas.width / 2, 120);
    ctx.fillText('ROACH RACE', canvas.width / 2, 120);
    
    ctx.fillStyle = '#000080';
    ctx.fillText('ROACH RACE', canvas.width / 2 + 5, 125);
    
    ctx.font = '20px "Press Start 2P", Courier';
    ctx.lineWidth = 3;
    
    const startColor = menuSelection === 0 ? 'white' : '#888';
    const scoreColor = menuSelection === 1 ? 'white' : '#888';
    
    ctx.fillStyle = startColor;
    ctx.strokeStyle = 'black';
    ctx.strokeText('START GAME', canvas.width / 2, 240);
    ctx.fillText('START GAME', canvas.width / 2, 240);
    
    if (menuSelection === 0) {
        ctx.fillStyle = '#ff4500';
        ctx.fillText('►', canvas.width / 2 - 120, 240);
    }
    
    ctx.fillStyle = scoreColor;
    ctx.strokeText('HIGH SCORES', canvas.width / 2, 290);
    ctx.fillText('HIGH SCORES', canvas.width / 2, 290);
    
    if (menuSelection === 1) {
        ctx.fillStyle = '#ff4500';
        ctx.fillText('►', canvas.width / 2 - 130, 290);
    }

    // Credits String
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '10px "Press Start 2P", Courier';
    ctx.strokeText('Developed by Eduardo Arana & Soda 🥤', canvas.width / 2, canvas.height - 20);
    ctx.fillText('Developed by Eduardo Arana & Soda 🥤', canvas.width / 2, canvas.height - 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw(ctx);
    
    if (currentState === 'MENU') {
        drawMenu();
        horse.draw(ctx);
        return;
    }

    if (currentState === 'HIGHSCORES') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(100, 50, canvas.width - 200, canvas.height - 100);
        
        ctx.fillStyle = '#ff4500';
        ctx.textAlign = 'center';
        ctx.font = '30px "Press Start 2P", Courier';
        ctx.fillText('TOP JOCKEYS', canvas.width / 2, 110);
        
        ctx.fillStyle = 'white';
        ctx.font = '16px "Press Start 2P", Courier';
        if (highScores.length === 0) {
            ctx.fillText('No scores yet.', canvas.width / 2, 180);
        } else {
            highScores.forEach((s, idx) => {
                ctx.fillText(`${idx + 1}. ${s.toString().padStart(5, '0')}`, canvas.width / 2, 170 + (idx * 35));
            });
        }
        
        ctx.fillStyle = '#aaaaaa';
        ctx.font = '12px "Press Start 2P", Courier';
        ctx.fillText('Tap or Space to return', canvas.width / 2, 330);
        return;
    }

    collectibles.forEach(c => c.draw(ctx));
    obstacles.forEach(o => o.draw(ctx));
    horse.draw(ctx);
    
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.font = '16px "Press Start 2P", Courier';
    
    ctx.textAlign = 'right';
    ctx.strokeText(`SCORE: ${Math.floor(score).toString().padStart(5, '0')}`, canvas.width - 20, 40);
    ctx.fillText(`SCORE: ${Math.floor(score).toString().padStart(5, '0')}`, canvas.width - 20, 40);
    
    ctx.fillStyle = '#32CD32'; 
    ctx.strokeText(`APPLES: ${apples}`, canvas.width - 20, 70);
    ctx.fillText(`APPLES: ${apples}`, canvas.width - 20, 70);
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.textAlign = 'left';
    ctx.font = '10px "Press Start 2P", Courier';
    ctx.fillText('TAP/SPACE: Jump | P: Pause', 20, canvas.height - 20);
    
    if (currentState === 'PAUSED') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '40px "Press Start 2P", Courier';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
    }

    if (currentState === 'GAMEOVER') {
        ctx.fillStyle = 'rgba(139, 0, 0, 0.7)'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.textAlign = 'center';
        
        ctx.font = '50px "Press Start 2P", Courier';
        ctx.strokeText('WASTED', canvas.width / 2, canvas.height / 2 - 30);
        ctx.fillText('WASTED', canvas.width / 2, canvas.height / 2 - 30);
        
        ctx.font = '20px "Press Start 2P", Courier';
        ctx.strokeText(`Final Score: ${Math.floor(score)}`, canvas.width / 2, canvas.height / 2 + 30);
        ctx.fillText(`Final Score: ${Math.floor(score)}`, canvas.width / 2, canvas.height / 2 + 30);
        
        ctx.fillStyle = '#aaaaaa';
        ctx.font = '14px "Press Start 2P", Courier';
        ctx.fillText('Tap or Space to Menu', canvas.width / 2, canvas.height / 2 + 80);
    }
}

const engine = new Engine(update, draw);
engine.start();
console.log("Horse Race Engine Started.");
