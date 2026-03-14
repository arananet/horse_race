export class Obstacle {
    constructor(gameWidth, gameHeight, speed, type = 'fence') {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.type = type;
        
        // Ground starts at 300
        if (type === 'fence') {
            this.width = 40;
            this.height = 60;
            this.y = 300 - this.height; // Rest on the grass
        } else if (type === 'bird') {
            this.width = 30;
            this.height = 20;
            this.y = 300 - 150 - Math.random() * 50; // In the air
            this.wingCycle = Math.random() * 10;
        }
        
        this.x = gameWidth;
        this.speed = speed;
        this.markedForDeletion = false;
    }

    update(gameSpeed) {
        this.x -= gameSpeed * 1.0;
        if (this.type === 'bird') this.wingCycle += 0.3;
        
        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
        }
    }

    draw(ctx) {
        if (this.type === 'fence') {
            // Draw pixel-art wooden fence
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(this.x + 5, this.y, 8, this.height); // Post 1
            ctx.fillRect(this.x + 25, this.y, 8, this.height); // Post 2
            ctx.fillStyle = '#A0522D';
            ctx.fillRect(this.x, this.y + 15, this.width, 8); // Plank 1
            ctx.fillRect(this.x, this.y + 35, this.width, 8); // Plank 2
        } else if (this.type === 'bird') {
            // Pixel art bird
            ctx.fillStyle = '#222'; // Black/Grey bird
            ctx.fillRect(this.x + 10, this.y + 5, 15, 10); // Body
            ctx.fillRect(this.x + 5, this.y + 5, 5, 5); // Tail
            ctx.fillRect(this.x + 25, this.y + 8, 5, 5); // Head
            
            // Beak
            ctx.fillStyle = '#FFD700';
            ctx.fillRect(this.x + 30, this.y + 8, 5, 4);
            
            // Wing flapping
            ctx.fillStyle = '#555';
            const flap = Math.sin(this.wingCycle) > 0 ? -10 : 5;
            ctx.fillRect(this.x + 12, this.y + 5 + flap, 10, 8);
        }
    }
}
