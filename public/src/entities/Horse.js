export class Horse {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        
        // Sizing for AABB Collision Box
        this.width = 64;
        this.height = 64;
        
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
        
        // Sprite
        this.image = new Image();
        this.image.src = 'assets/horse.png';
        this.isLoaded = false;
        this.image.onload = () => {
            this.isLoaded = true;
        };
    }

    update(input) {
        // Unified Jump Logic (Keyboard Space/Up or Mobile Touch)
        if (input.consumeJump()) {
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
        if (this.isLoaded) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            // Placeholder Pixel Art (Brown Box)
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillRect(this.x + this.width - 10, this.y - 15, 20, 20); // Head
        }
    }
}
