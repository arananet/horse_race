import { drawSprite } from './HorseSprite.js';
import { SFX } from '../audio.js';

export class Horse {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        
        this.scale = 3;
        this.width = 24 * this.scale;  
        this.height = 15 * this.scale; 
        
        this.x = 100; 
        
        this.baseGroundY = 300 - this.height + 6; 
        this.groundY = this.baseGroundY;
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
        this.runCycle += 0.25; 
        this.frame = Math.floor(this.runCycle) % 3;

        if (input.consumeJump()) {
            if (this.jumps === 0 && this.y >= this.groundY - 5) {
                this.vy = this.jumpPower;
                this.jumps++;
                SFX.jump();
            } else if (this.jumps > 0 && this.jumps < this.maxJumps) {
                this.vy = this.jumpPower; 
                this.jumps++;
                SFX.doubleJump();
            }
        }

        this.y += this.vy;
        
        // Falling into a hole check (free fall mode)
        if (this.groundY > this.baseGroundY + 10) {
            this.vy += this.gravity;
            this.frame = 1;
            // No landing logic while groundY is removed
        } else if (this.y < this.groundY) {
            this.vy += this.gravity;
            this.frame = 1; 
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
