export class Horse {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        
        // Sizing for AABB Collision Box
        this.width = 50;
        this.height = 50;
        
        // Position
        this.x = 100; // Fixed x position for endless runner
        this.groundY = gameHeight - 40 - this.height; // Floor is 40px up from bottom
        this.y = this.groundY;
        
        // Physics
        this.vy = 0; // Vertical Velocity
        this.gravity = 0.8; 
        this.jumpPower = -14; // High jump negative velocity
        
        // Double Jump State
        this.jumps = 0;
        this.maxJumps = 2; // Can jump mid-air once
    }

    update(input) {
        // Jump Logic (Spacebar or Up Arrow)
        if (input.consume('Space') || input.consume('ArrowUp')) {
            if (this.jumps < this.maxJumps) {
                this.vy = this.jumpPower;
                this.jumps++;
            }
        }

        // Apply Gravity
        this.y += this.vy;
        
        // Collision with ground
        if (this.y < this.groundY) {
            this.vy += this.gravity;
        } else {
            this.y = this.groundY;
            this.vy = 0;
            this.jumps = 0; // Reset jumps
        }
    }

    draw(ctx) {
        // Placeholder Pixel Art (Brown Box with Eyes and Legs)
        ctx.fillStyle = '#8B4513'; // SaddleBrown
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Head/Neck
        ctx.fillRect(this.x + this.width - 10, this.y - 15, 20, 20);
        
        // Eye
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x + this.width, this.y - 10, 4, 4);

        // Legs (Running animation placeholder)
        ctx.fillStyle = '#5C4033'; // DarkBrown
        ctx.fillRect(this.x + 10, this.y + this.height, 8, 15); // Back leg
        ctx.fillRect(this.x + this.width - 15, this.y + this.height, 8, 15); // Front leg
    }
}
