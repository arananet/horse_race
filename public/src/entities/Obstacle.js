export class Obstacle {
    constructor(gameWidth, gameHeight, speed, type = 'fence') {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.type = type;
        
        if (type === 'fence') {
            this.width = 40;
            this.height = 40;
            this.y = 300 - this.height + 5; 
        } else if (type === 'bird') {
            this.width = 30;
            this.height = 20;
            this.y = 300 - 150 - Math.random() * 50; 
            this.wingCycle = Math.random() * 10;
        } else if (type === 'hole') {
            this.width = 80; // A gap in the ground
            this.height = 100; // Deep hole
            this.y = 300; // Starts exactly at the grass line
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
            ctx.fillStyle = '#1A1A1A'; 
            ctx.fillRect(this.x + 5, this.y, 10, this.height); 
            ctx.fillRect(this.x + 25, this.y, 10, this.height); 
            ctx.fillRect(this.x, this.y + 10, this.width, 8); 
            ctx.fillRect(this.x, this.y + 25, this.width, 8); 
        } else if (this.type === 'bird') {
            ctx.fillStyle = '#1A1A1A'; 
            ctx.fillRect(this.x + 10, this.y + 5, 15, 10); 
            ctx.fillRect(this.x + 5, this.y + 5, 5, 5); 
            ctx.fillRect(this.x + 25, this.y + 8, 5, 5); 
            
            ctx.fillStyle = '#F00'; 
            ctx.fillRect(this.x + 27, this.y + 9, 2, 2);
            
            ctx.fillStyle = '#1A1A1A';
            const flap = Math.sin(this.wingCycle) > 0 ? -10 : 5;
            ctx.fillRect(this.x + 12, this.y + 5 + flap, 10, 8);
        } else if (this.type === 'hole') {
            // Draw a black void over the ground
            ctx.fillStyle = '#000000';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            
            // Add some dirt edges to the hole
            ctx.fillStyle = '#6B4A31';
            ctx.fillRect(this.x - 5, this.y + 10, 5, 20);
            ctx.fillRect(this.x + this.width, this.y + 20, 5, 15);
        }
    }
}
