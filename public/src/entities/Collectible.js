export class Collectible {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        
        // Exact sizes to match the 16-bit look in the screenshots
        this.width = 24;
        this.height = 24;
        
        // Ground is 300, spawn above it
        this.y = 300 - 80 - (Math.random() > 0.5 ? 60 : 0); 
        this.x = gameWidth;
        
        this.markedForDeletion = false;
        this.floatCycle = Math.random() * 10;
        this.baseY = this.y;
    }

    update(gameSpeed) {
        this.x -= gameSpeed * 1.0;
        this.floatCycle += 0.1;
        this.y = this.baseY + Math.sin(this.floatCycle) * 3; // Bob up and down
        
        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
        }
    }

    draw(ctx) {
        // Red Apple Body
        ctx.fillStyle = '#E60000'; // Bright Red
        ctx.fillRect(this.x + 4, this.y + 4, 16, 16);
        ctx.fillRect(this.x + 2, this.y + 6, 20, 12);
        
        // Top indentation
        ctx.fillStyle = '#87CEEB'; // Matches Sky background to cut out shape
        ctx.fillRect(this.x + 10, this.y + 4, 4, 2);
        
        // Stem
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(this.x + 10, this.y, 4, 6);
        
        // Leaf
        ctx.fillStyle = '#00CC00';
        ctx.fillRect(this.x + 14, this.y + 2, 6, 4);
    }
}
