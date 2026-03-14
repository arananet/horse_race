export class Collectible {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        
        this.width = 32;
        this.height = 32;
        
        // Spawn either high (requires double jump) or medium (requires single jump)
        this.y = gameHeight - 100 - (Math.random() > 0.5 ? 80 : 0); 
        this.x = gameWidth;
        
        this.image = new Image();
        this.image.src = 'assets/apple.png';
        this.isLoaded = false;
        this.image.onload = () => { this.isLoaded = true; };

        this.markedForDeletion = false;
    }

    update(gameSpeed) {
        this.x -= gameSpeed * 1.0;
        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
        }
    }

    draw(ctx) {
        if (this.isLoaded) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = '#32CD32'; // Green placeholder
            ctx.beginPath();
            ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}
