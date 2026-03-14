export class Obstacle {
    constructor(gameWidth, gameHeight, speed, type = 'fence') {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.type = type;
        
        // Define sizes based on type
        if (type === 'fence') {
            this.width = 30;
            this.height = 50;
            this.y = gameHeight - 40 - this.height; // Floor level
        } else if (type === 'bird') {
            this.width = 40;
            this.height = 30;
            this.y = gameHeight - 150 - Math.random() * 50; // In the air
        }
        
        this.x = gameWidth;
        this.speed = speed;
        this.markedForDeletion = false;
    }

    update(gameSpeed) {
        this.x -= gameSpeed * 1.0; // Same speed as ground
        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
        }
    }

    draw(ctx) {
        if (this.type === 'fence') {
            ctx.fillStyle = '#A0522D'; // Sienna/Wood color
            ctx.fillRect(this.x, this.y, this.width, this.height);
            // Planks
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(this.x - 5, this.y + 10, this.width + 10, 10);
            ctx.fillRect(this.x - 5, this.y + 30, this.width + 10, 10);
        } else if (this.type === 'bird') {
            ctx.fillStyle = 'red';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
