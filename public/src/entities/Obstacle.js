export class Obstacle {
    constructor(gameWidth, gameHeight, speed, type = 'fence') {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.type = type;
        
        // Define sizes based on type
        if (type === 'fence') {
            this.width = 40;
            this.height = 60;
            this.y = gameHeight - 40 - this.height; // Floor level
            this.image = new Image();
            this.image.src = 'assets/fence.png';
        } else if (type === 'bird') {
            this.width = 48;
            this.height = 48;
            this.y = gameHeight - 150 - Math.random() * 50; // In the air
            this.image = new Image();
            this.image.src = 'assets/bird.png';
        }
        
        this.isLoaded = false;
        if (this.image) {
            this.image.onload = () => { this.isLoaded = true; };
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
        if (this.isLoaded) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            if (this.type === 'fence') {
                ctx.fillStyle = '#A0522D';
                ctx.fillRect(this.x, this.y, this.width, this.height);
            } else if (this.type === 'bird') {
                ctx.fillStyle = 'red';
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }
    }
}
