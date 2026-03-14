export class Obstacle {
    constructor(gameWidth, gameHeight, speed, type = 'fence') {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.type = type;
        
        if (type === 'fence') {
            this.width = 40;
            this.height = 40;
            // Sink slightly into the grass
            this.y = 300 - this.height + 5; 
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
            ctx.fillStyle = '#1A1A1A'; // Black silhouette to match the horse
            ctx.fillRect(this.x + 5, this.y, 10, this.height); 
            ctx.fillRect(this.x + 25, this.y, 10, this.height); 
            ctx.fillRect(this.x, this.y + 10, this.width, 8); 
            ctx.fillRect(this.x, this.y + 25, this.width, 8); 
        } else if (this.type === 'bird') {
            ctx.fillStyle = '#1A1A1A'; // Black silhouette
            ctx.fillRect(this.x + 10, this.y + 5, 15, 10); 
            ctx.fillRect(this.x + 5, this.y + 5, 5, 5); 
            ctx.fillRect(this.x + 25, this.y + 8, 5, 5); 
            
            ctx.fillStyle = '#F00'; // Red eye
            ctx.fillRect(this.x + 27, this.y + 9, 2, 2);
            
            ctx.fillStyle = '#1A1A1A';
            const flap = Math.sin(this.wingCycle) > 0 ? -10 : 5;
            ctx.fillRect(this.x + 12, this.y + 5 + flap, 10, 8);
        }
    }
}
