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
        
        this.groundY = 300 - this.height + 6; 
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
            if (this.jumps === 0) {
                this.vy = this.jumpPower;
                this.jumps++;
                SFX.jump();
            } else if (this.jumps < this.maxJumps) {
                this.vy = this.jumpPower; // Allow double jump to reset velocity
                this.jumps++;
                SFX.doubleJump();
            }
        }

        this.y += this.vy;
        
        // Don't land if we are over a hole! Main loop will handle the collision detection for falling into holes.
        // We only enforce the ground plane if the main loop tells us we are safe, but for simplicity, 
        // the horse always expects the ground to be at groundY unless it's currently falling into a hole.
        
        // If the horse is completely below the ground, let it fall (happens during a hole collision)
        if (this.y > this.groundY && this.vy > 0) {
            this.vy += this.gravity; // Keep falling
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
