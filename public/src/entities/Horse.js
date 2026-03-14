import { drawSprite } from './HorseSprite.js';

export class Horse {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        
        this.scale = 3;
        this.width = 24 * this.scale;  // 72
        this.height = 15 * this.scale; // 45
        
        this.x = 100; // Pulling back slightly to give more reaction time
        
        // Ground grass line is at y=300
        // We set the horse's bottom to rest exactly on that line
        this.groundY = 300 - this.height + 6; // +6 sinks the hooves slightly into the grass for depth
        this.y = this.groundY;
        
        this.vy = 0; 
        this.gravity = 0.6; 
        this.jumpPower = -12; 
        
        this.jumps = 0;
        this.maxJumps = 2; 
        
        this.runCycle = 0;
        this.frame = 0;
    }

    update(input) {
        this.runCycle += 0.25; // Faster leg animation to match the runner vibe
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
            this.frame = 1; // Tucked legs while jumping
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
