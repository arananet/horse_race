import { drawSprite } from './HorseSprite.js';

export class Horse {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        
        // Match the scale from the drawSprite function (15 rows * 3 scale)
        this.scale = 3;
        this.width = 24 * this.scale;  // 72
        this.height = 15 * this.scale; // 45
        
        // Position
        this.x = 150; // Move slightly further to the right to match the reference image
        
        // The ground grass line is at y=300, and the horse runs exactly on top of it
        this.groundY = 300 - this.height; 
        this.y = this.groundY;
        
        // Physics
        this.vy = 0; 
        this.gravity = 0.6; 
        this.jumpPower = -12; 
        
        this.jumps = 0;
        this.maxJumps = 2; 
        
        // Animation
        this.runCycle = 0;
        this.frame = 0;
    }

    update(input) {
        this.runCycle += 0.2; 
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
        drawSprite(ctx, this.frame, this.x, this.y, this.scale);
    }
}
