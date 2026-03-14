import { drawSprite } from './HorseSprite.js';

export class Horse {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        
        // Sizing for AABB Collision Box
        this.width = 64;
        this.height = 60; // 15 rows * 4 scale
        
        // Layout: Ground starts at y=300
        this.x = 100; 
        this.groundY = 300 - this.height; 
        this.y = this.groundY;
        
        this.vy = 0; 
        this.gravity = 0.8; 
        this.jumpPower = -14; 
        
        this.jumps = 0;
        this.maxJumps = 2; 
        
        // Animation
        this.runCycle = 0;
        this.frame = 0;
    }

    update(input) {
        this.runCycle += 0.15; 
        this.frame = Math.floor(this.runCycle) % 3;

        if (input.consumeJump()) {
            if (this.jumps < this.maxJumps) {
                this.vy = this.jumpPower;
                this.jumps++;
            }
        }

        this.y += this.vy;
        
        if (this.y < this.groundY) {
            this.vy += this.gravity;
            this.frame = 1; // Use contracted frame when jumping
        } else {
            this.y = this.groundY;
            this.vy = 0;
            this.jumps = 0; 
        }
    }

    draw(ctx) {
        // Draw using the embedded pixel-art matrix
        drawSprite(ctx, this.frame, this.x, this.y, 4);
    }
}
