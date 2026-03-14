class BackgroundLayer {
    constructor(imageSrc, speedModifier, yOffset, width, height, fallbackColor) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.speedModifier = speedModifier;
        this.yOffset = yOffset;
        this.width = width;
        this.height = height;
        this.x = 0;
        this.fallbackColor = fallbackColor;
        
        this.isLoaded = false;
        this.image.onload = () => {
            this.isLoaded = true;
        };
    }

    update(gameSpeed) {
        this.x -= gameSpeed * this.speedModifier;
        // Loop the image seamlessly
        if (this.x <= -this.width) {
            this.x = 0;
        }
    }

    draw(ctx, canvasWidth) {
        if (this.isLoaded) {
            ctx.drawImage(this.image, this.x, this.yOffset, this.width, this.height);
            ctx.drawImage(this.image, this.x + this.width, this.yOffset, this.width, this.height);
        } else {
            // Draw a more visually appealing procedural placeholder
            ctx.fillStyle = this.fallbackColor;
            ctx.fillRect(this.x, this.yOffset, this.width, this.height);
            ctx.fillRect(this.x + this.width, this.yOffset, this.width, this.height);

            // Add simple procedural details for depth
            if (this.fallbackColor === '#87CEEB') { // Sky
                ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                ctx.fillRect(this.x + 100, this.yOffset + 50, 80, 20);
                ctx.fillRect(this.x + 120, this.yOffset + 40, 40, 40);
                ctx.fillRect(this.x + this.width + 100, this.yOffset + 50, 80, 20);
                ctx.fillRect(this.x + this.width + 120, this.yOffset + 40, 40, 40);
            } else if (this.fallbackColor === '#5F9EA0') { // Mountains
                ctx.fillStyle = '#4682B4';
                ctx.beginPath();
                ctx.moveTo(this.x, this.yOffset + this.height);
                ctx.lineTo(this.x + 200, this.yOffset);
                ctx.lineTo(this.x + 400, this.yOffset + this.height);
                ctx.fill();
                
                ctx.beginPath();
                ctx.moveTo(this.x + this.width, this.yOffset + this.height);
                ctx.lineTo(this.x + this.width + 200, this.yOffset);
                ctx.lineTo(this.x + this.width + 400, this.yOffset + this.height);
                ctx.fill();
            } else if (this.fallbackColor === '#2E8B57') { // Trees
                ctx.fillStyle = '#228B22';
                for(let i=0; i<this.width; i+=60) {
                    ctx.beginPath();
                    ctx.moveTo(this.x + i, this.yOffset + this.height);
                    ctx.lineTo(this.x + i + 30, this.yOffset);
                    ctx.lineTo(this.x + i + 60, this.yOffset + this.height);
                    ctx.fill();
                    
                    ctx.beginPath();
                    ctx.moveTo(this.x + this.width + i, this.yOffset + this.height);
                    ctx.lineTo(this.x + this.width + i + 30, this.yOffset);
                    ctx.lineTo(this.x + this.width + i + 60, this.yOffset + this.height);
                    ctx.fill();
                }
            } else if (this.fallbackColor === '#5C4033') { // Track
                ctx.fillStyle = '#4E3629';
                for(let i=0; i<this.width; i+=40) {
                    ctx.fillRect(this.x + i, this.yOffset + 10, 10, 5);
                    ctx.fillRect(this.x + i + 20, this.yOffset + 25, 15, 5);
                    
                    ctx.fillRect(this.x + this.width + i, this.yOffset + 10, 10, 5);
                    ctx.fillRect(this.x + this.width + i + 20, this.yOffset + 25, 15, 5);
                }
            }
        }
    }
}

export class Background {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        
        // Ensure assets directory exists for these paths
        this.layers = [
            new BackgroundLayer('assets/sky.png', 0.1, 0, width, height, '#87CEEB'),
            new BackgroundLayer('assets/mountains.png', 0.3, height - 200, width, 200, '#5F9EA0'),
            new BackgroundLayer('assets/trees.png', 0.6, height - 100, width, 100, '#2E8B57'),
            new BackgroundLayer('assets/track.png', 1.0, height - 40, width, 40, '#5C4033')
        ];
    }

    update(gameSpeed) {
        this.layers.forEach(layer => layer.update(gameSpeed));
    }

    draw(ctx) {
        this.layers.forEach(layer => layer.draw(ctx, this.width));
    }
}
