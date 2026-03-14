export class Horse {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        
        this.width = 64;
        this.height = 64;
        
        this.x = 100; 
        this.groundY = gameHeight - 40 - this.height; 
        this.y = this.groundY;
        
        this.vy = 0; 
        this.gravity = 0.8; 
        this.jumpPower = -14; 
        
        this.jumps = 0;
        this.maxJumps = 2; 
        
        this.image = new Image();
        this.image.src = 'assets/horse.png';
        this.isLoaded = false;
        this.image.onload = () => {
            this.isLoaded = true;
        };
        
        // Animation state for procedural fallback
        this.runCycle = 0;
    }

    update(input) {
        this.runCycle += 0.2; // Speed of leg animation

        if (input.consumeJump()) {
            if (this.jumps < this.maxJumps) {
                this.vy = this.jumpPower;
                this.jumps++;
            }
        }

        this.y += this.vy;
        
        if (this.y < this.groundY) {
            this.vy += this.gravity;
        } else {
            this.y = this.groundY;
            this.vy = 0;
            this.jumps = 0; 
        }
    }

    draw(ctx) {
        if (this.isLoaded) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            // Much better procedural horse
            // Body
            ctx.fillStyle = '#654321'; // Darker brown
            ctx.fillRect(this.x + 10, this.y + 20, 40, 25);
            // Saddle
            ctx.fillStyle = '#8B0000'; // Dark red
            ctx.fillRect(this.x + 20, this.y + 15, 15, 5);
            // Neck & Head
            ctx.fillStyle = '#654321';
            ctx.fillRect(this.x + 40, this.y + 5, 15, 20);
            ctx.fillRect(this.x + 45, this.y + 5, 20, 10); // Snout
            // Eye
            ctx.fillStyle = '#000';
            ctx.fillRect(this.x + 50, this.y + 8, 4, 4);
            // Mane / Tail
            ctx.fillStyle = '#000';
            ctx.fillRect(this.x + 35, this.y + 5, 5, 15); // Mane
            ctx.fillRect(this.x + 5, this.y + 20, 5, 15); // Tail
            
            // Animated Legs based on runCycle
            ctx.fillStyle = '#3e2723';
            const legOffset1 = Math.sin(this.runCycle) * 10;
            const legOffset2 = Math.cos(this.runCycle) * 10;
            
            if (this.y < this.groundY) {
                // Jumping pose (legs tucked)
                ctx.fillRect(this.x + 10, this.y + 40, 8, 10);
                ctx.fillRect(this.x + 40, this.y + 40, 8, 10);
            } else {
                // Running pose
                ctx.fillRect(this.x + 15 + legOffset1, this.y + 45, 6, 15); // Back leg 1
                ctx.fillRect(this.x + 10 - legOffset1, this.y + 45, 6, 15); // Back leg 2
                ctx.fillRect(this.x + 40 + legOffset2, this.y + 45, 6, 15); // Front leg 1
                ctx.fillRect(this.x + 45 - legOffset2, this.y + 45, 6, 15); // Front leg 2
            }
        }
    }
}
