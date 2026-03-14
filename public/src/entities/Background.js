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
        
        // Track if image is loaded
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
            ctx.fillStyle = this.fallbackColor;
            ctx.fillRect(this.x, this.yOffset, this.width, this.height);
            ctx.fillRect(this.x + this.width, this.yOffset, this.width, this.height);
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
