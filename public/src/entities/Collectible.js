export class Collectible {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        
        this.width = 32;
        this.height = 32;
        
        this.y = gameHeight - 100 - (Math.random() > 0.5 ? 80 : 0); 
        this.x = gameWidth;
        
        this.image = new Image();
        this.image.src = 'assets/apple.png';
        this.isLoaded = false;
        this.image.onload = () => { this.isLoaded = true; };

        this.markedForDeletion = false;
        this.floatCycle = Math.random() * 10;
        this.baseY = this.y;
    }

    update(gameSpeed) {
        this.x -= gameSpeed * 1.0;
        this.floatCycle += 0.1;
        this.y = this.baseY + Math.sin(this.floatCycle) * 5; // Bob up and down
        
        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
        }
    }

    draw(ctx) {
        if (this.isLoaded) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            // Procedural Apple
            ctx.fillStyle = '#DC143C'; // Crimson
            ctx.beginPath();
            ctx.arc(this.x + this.width/2, this.y + this.height/2, 12, 0, Math.PI * 2);
            ctx.fill();
            // Leaf
            ctx.fillStyle = '#228B22';
            ctx.beginPath();
            ctx.arc(this.x + this.width/2 + 5, this.y + this.height/2 - 12, 5, 0, Math.PI * 2);
            ctx.fill();
            // Stem
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(this.x + this.width/2, this.y + this.height/2 - 15, 2, 5);
        }
    }
}
