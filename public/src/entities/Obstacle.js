export class Obstacle {
    constructor(gameWidth, gameHeight, speed, type = 'fence') {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.type = type;
        
        if (type === 'fence') {
            this.width = 40;
            this.height = 60;
            this.y = gameHeight - 40 - this.height; 
            this.image = new Image();
            this.image.src = 'assets/fence.png';
        } else if (type === 'bird') {
            this.width = 48;
            this.height = 48;
            this.y = gameHeight - 150 - Math.random() * 50;
            this.image = new Image();
            this.image.src = 'assets/bird.png';
            this.wingCycle = Math.random() * 10;
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
        this.x -= gameSpeed * 1.0;
        if (this.type === 'bird') this.wingCycle += 0.2;
        
        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
        }
    }

    draw(ctx) {
        if (this.isLoaded) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            if (this.type === 'fence') {
                ctx.fillStyle = '#8B4513';
                ctx.fillRect(this.x + 5, this.y, 10, this.height); // Post 1
                ctx.fillRect(this.x + 25, this.y, 10, this.height); // Post 2
                ctx.fillStyle = '#A0522D';
                ctx.fillRect(this.x, this.y + 15, this.width, 10); // Plank 1
                ctx.fillRect(this.x, this.y + 35, this.width, 10); // Plank 2
            } else if (this.type === 'bird') {
                ctx.fillStyle = '#B22222'; // Dark red
                ctx.beginPath();
                ctx.arc(this.x + 20, this.y + 20, 15, 0, Math.PI * 2);
                ctx.fill();
                // Beak
                ctx.fillStyle = '#FFD700';
                ctx.beginPath();
                ctx.moveTo(this.x, this.y + 20);
                ctx.lineTo(this.x + 10, this.y + 15);
                ctx.lineTo(this.x + 10, this.y + 25);
                ctx.fill();
                // Wing
                ctx.fillStyle = '#800000';
                const wingOffset = Math.sin(this.wingCycle) * 15;
                ctx.beginPath();
                ctx.moveTo(this.x + 25, this.y + 20);
                ctx.lineTo(this.x + 40, this.y + 20 + wingOffset);
                ctx.lineTo(this.x + 35, this.y + 10);
                ctx.fill();
            }
        }
    }
}
