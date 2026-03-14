export class Obstacle {
    constructor(gameWidth, gameHeight, speed, type = 'fence') {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.type = type;
        
        // Ground line is exactly at y=300
        if (type === 'fence') {
            this.width = 40;
            this.height = 40;
            this.y = 300 - this.height; 
        } else if (type === 'bird') {
            this.width = 30;
            this.height = 20;
            this.y = 300 - 150 - Math.random() * 50; 
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
            // Pixel-art wooden fence matching the reference style
            ctx.fillStyle = '#D2691E'; // Chocolate
            ctx.fillRect(this.x + 5, this.y, 10, this.height); // Post 1
            ctx.fillRect(this.x + 25, this.y, 10, this.height); // Post 2
            ctx.fillStyle = '#A0522D'; // Sienna
            ctx.fillRect(this.x, this.y + 10, this.width, 8); // Plank 1
            ctx.fillRect(this.x, this.y + 25, this.width, 8); // Plank 2
        } else if (this.type === 'bird') {
            ctx.fillStyle = '#222'; 
            ctx.fillRect(this.x + 10, this.y + 5, 15, 10); 
            ctx.fillRect(this.x + 5, this.y + 5, 5, 5); 
            ctx.fillRect(this.x + 25, this.y + 8, 5, 5); 
            
            ctx.fillStyle = '#FFD700';
            ctx.fillRect(this.x + 30, this.y + 8, 5, 4);
            
            ctx.fillStyle = '#555';
            const flap = Math.sin(this.wingCycle) > 0 ? -10 : 5;
            ctx.fillRect(this.x + 12, this.y + 5 + flap, 10, 8);
        }
    }
}
