import { Engine } from './engine.js';
import { InputHandler } from './input.js';
import { Background } from './entities/Background.js';
import { Horse } from './entities/Horse.js';
import { Obstacle } from './entities/Obstacle.js';
import { Collectible } from './entities/Collectible.js';
import { checkCollision } from './physics.js';
import { initAudio, playMusic, stopMusic, SFX } from './audio.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d', { alpha: false });

canvas.width = 800;
canvas.height = 400;

const input = new InputHandler(canvas);
const background = new Background(canvas.width, canvas.height);
let horse = new Horse(canvas.width, canvas.height);

let currentState = 'MENU';
let menuSelection = 0; 
let highScores = JSON.parse(localStorage.getItem('horseRaceHighScores')) || [];

let gameSpeed = 6;
let score = 0;
let apples = 0;
let distance = 0;

let obstacles = [];
let collectibles = [];
let obstacleTimer = 0;
let collectibleTimer = 0;
let obstacleInterval = 1500;
let didInitAudio = false;

const GROUND_Y = 320;

function resetGame() {
    horse = new Horse(canvas.width, canvas.height);
    horse.baseGroundY = GROUND_Y - horse.height + 6;
    horse.groundY = horse.baseGroundY;
    horse.y = horse.groundY;
    
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
    localStorage.setItem('horseRaceHighScores', JSON.stringify(highScores));
}

function ensureAudio() {
    if (!didInitAudio) {
        initAudio();
        playMusic();
        didInitAudio = true;
    }
}

function triggerGameOver() {
    SFX.hit();
    saveHighScore();
    currentState = 'GAMEOVER';
}

function update(dt) {
    if (currentState === 'MENU') {
        background.update(1.0); 
        if (input.consumeUp() || input.consumeDown()) {
            menuSelection = menuSelection === 0 ? 1 : 0;
            ensureAudio();
        }
        // Removed consumeEnter since consumeJump now handles it
        
        const startBtn = { x: 200, y: 200, w: 400, h: 50 };
        const scoreBtn = { x: 200, y: 260, w: 400, h: 50 };
        if (input.isHovering(startBtn)) menuSelection = 0;
        if (input.isHovering(scoreBtn)) menuSelection = 1;
        
        if (input.consumeClick(scoreBtn)) {
            ensureAudio();
            currentState = 'HIGHSCORES';
        } else if (input.consumeClick(startBtn) || input.consumeJump()) {
            // Mobile fallback: tapping anywhere triggers jump, which starts the game
            ensureAudio();
            resetGame();
        }
        return;
    }

    if (currentState === 'HIGHSCORES') {
        background.update(0.5);
        if (input.consumeEnter() || input.consumeJump()) currentState = 'MENU';
        return;
    }

    if (currentState === 'PAUSED') {
        if (input.consumePause()) currentState = 'PLAYING';
        return;
    }

    if (currentState === 'GAMEOVER') {
        horse.y += horse.gravity * 2; 
        if (input.consumeJump() || input.consumeEnter()) currentState = 'MENU';
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
            const r = Math.random();
            if (distance > 1000) {
                if (r > 0.7) { type = 'bird'; SFX.eagle(); }
                else if (r > 0.4) { type = 'hole'; }
                else if (r > 0.2) { type = 'slime'; } // Added Slime Enemy placeholder
            } else if (distance > 500 && r > 0.7) {
                type = 'hole';
            }
            const obs = new Obstacle(canvas.width, canvas.height, gameSpeed, type);
            obs.y = type === 'hole' ? GROUND_Y : GROUND_Y - obs.height + 5;
            obstacles.push(obs);
            obstacleTimer = 0;
            if (obstacleInterval > 700) obstacleInterval -= 15;
        }

        collectibleTimer += dt;
        if (collectibleTimer > 2000) {
            if (Math.random() > 0.4) {
                const apple = new Collectible(canvas.width, canvas.height);
                apple.baseY = GROUND_Y - 80 - (Math.random() > 0.5 ? 60 : 0);
                collectibles.push(apple);
            }
            collectibleTimer = 0;
        }

        let isOverHole = false;
        for (let i = obstacles.length - 1; i >= 0; i--) {
            let o = obstacles[i];
            o.update(gameSpeed);
            if (o.type === 'hole') {
                const horseCenterX = horse.x + (horse.width / 2);
                if (horseCenterX > o.x && horseCenterX < o.x + o.width) {
                    if (horse.y >= horse.baseGroundY - 5) isOverHole = true;
                }
            } else {
                const horseHitBox = { x: horse.x + 10, y: horse.y + 10, width: horse.width - 20, height: horse.height - 15 };
                const obsHitBox = { x: o.x + 5, y: o.y + 5, width: o.width - 10, height: o.height - 10 };
                if (checkCollision(horseHitBox, obsHitBox)) triggerGameOver();
            }
            if (o.markedForDeletion) obstacles.splice(i, 1);
        }

        if (isOverHole || horse.groundY > horse.baseGroundY) {
            horse.groundY = canvas.height + 200;
            if (horse.y > 350) triggerGameOver();
        } else {
            horse.groundY = horse.baseGroundY;
        }

        for (let i = collectibles.length - 1; i >= 0; i--) {
            let c = collectibles[i];
            c.update(gameSpeed);
            if (checkCollision(horse, c)) {
                c.markedForDeletion = true;
                score += 50; 
                apples++;
                SFX.apple(); 
            }
            if (c.markedForDeletion) collectibles.splice(i, 1);
        }
        
        distance += gameSpeed * 0.1;
        score += gameSpeed * 0.05;
        gameSpeed += 0.0005; 
    }
}

function drawMenu() {
    // Menu Background Tint
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = 'center';
    const title = 'HORSE RACE';
    ctx.font = 'bold 50px "Press Start 2P", Courier';

    ctx.fillStyle = '#000080';
    ctx.fillText(title, canvas.width / 2 + 5, 125);

    ctx.fillStyle = '#ff4500';
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'white';
    ctx.strokeText(title, canvas.width / 2, 120);
    ctx.fillText(title, canvas.width / 2, 120);
    
    ctx.font = 'bold 20px "Press Start 2P", Courier';
    ctx.lineWidth = 3;
    
    const startColor = menuSelection === 0 ? 'white' : '#ccc';
    const scoreColor = menuSelection === 1 ? 'white' : '#ccc';
    
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

    // Credits shifted to the bottom center and isolated as requested
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '12px "Press Start 2P", Courier';
    ctx.strokeText('Developed by Eduardo Arana and Soda 🥤', canvas.width / 2, canvas.height - 30);
    ctx.fillText('Developed by Eduardo Arana and Soda 🥤', canvas.width / 2, canvas.height - 30);
    
    if (!didInitAudio) {
        ctx.fillStyle = 'yellow';
        ctx.font = '10px "Press Start 2P", Courier';
        ctx.fillText('(Click anywhere to enable audio)', canvas.width / 2, 280);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw(ctx);
    
    if (currentState === 'MENU') {
        drawMenu();
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
    
    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';
    ctx.strokeText('LVL 1', 20, 40);
    ctx.fillText('LVL 1', 20, 40);
    
    if (currentState === 'PAUSED') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '40px "Press Start 2P", Courier';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
    }

    if (currentState === 'GAMEOVER') {
        ctx.fillStyle = 'rgba(139, 0, 0, 0.5)'; 
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
