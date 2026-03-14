export class Collectible {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        
        this.width = 24;
        this.height = 24;
        
        // Ground is 300, spawn above it
        this.y = 300 - 100 - (Math.random() > 0.5 ? 60 : 0); 
        this.x = gameWidth;
        
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
        // Procedural Pixel Art Apple
        ctx.fillStyle = '#DC143C'; // Crimson
        // Main apple body (blocky circle)
        ctx.fillRect(this.x + 4, this.y + 4, 16, 16);
        ctx.fillRect(this.x + 2, this.y + 8, 20, 8);
        
        // Leaf
        ctx.fillStyle = '#228B22';
        ctx.fillRect(this.x + 12, this.y - 2, 8, 6);
        
        // Stem
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(this.x + 10, this.y, 4, 6);
        
        // Highlight
        ctx.fillStyle = '#FFC0CB';
        ctx.fillRect(this.x + 16, this.y + 6, 4, 4);
    }
}
