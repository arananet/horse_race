export class Obstacle {
    constructor(gameWidth, gameHeight, speed, type = 'fence') {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.type = type;
        
        this.isLoaded = false;
        this.image = new Image();
        
        if (type === 'fence') {
            this.width = 48;
            this.height = 48;
            this.y = 300 - this.height + 5; 
            this.image.src = 'assets/fence.png';
        } else if (type === 'bird') {
            this.width = 48;
            this.height = 48;
            this.y = 300 - 150 - Math.random() * 50; 
            this.wingCycle = Math.random() * 10;
            this.image.src = 'assets/bird.png'; // Should exist if generated
        } else if (type === 'hole') {
            this.width = 120;
            this.height = 100;
            this.y = 300;
        }
        
        this.image.onload = () => { this.isLoaded = true; };
        
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
        if (this.isLoaded && this.type !== 'hole') {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            if (this.type === 'fence') {
                ctx.fillStyle = '#1A1A1A'; 
                ctx.fillRect(this.x + 5, this.y, 10, this.height); 
                ctx.fillRect(this.x + 25, this.y, 10, this.height); 
                ctx.fillRect(this.x, this.y + 15, this.width, 8); 
            } else if (this.type === 'bird') {
                ctx.fillStyle = '#1A1A1A';
                ctx.fillRect(this.x + 10, this.y + 5, 15, 10);
            } else if (this.type === 'hole') {
                ctx.fillStyle = '#000';
                ctx.fillRect(this.x, this.y, this.width, this.height);
                ctx.fillStyle = '#FFD700'; 
                ctx.fillRect(this.x - 15, this.y, 15, 10);
                ctx.fillRect(this.x + this.width, this.y, 15, 10);
            }
        }
    }
}
