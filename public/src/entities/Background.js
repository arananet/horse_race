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
        this.image.onload = () => { this.isLoaded = true; };
    }

    update(gameSpeed) {
        this.x -= gameSpeed * this.speedModifier;
        if (this.x <= -this.width) {
            this.x = 0;
        }
    }

    draw(ctx) {
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
        
        // Using the high-quality assets from the zip file
        this.layers = [
            new BackgroundLayer('assets/Background/BGBack.png', 0.05, 0, width, height, '#79C8F8'),
            new BackgroundLayer('assets/Background/CloudsBack.png', 0.1, 0, width, height, 'transparent'),
            new BackgroundLayer('assets/Background/BGFront.png', 0.2, 0, width, height, 'transparent'),
            new BackgroundLayer('assets/Background/CloudsFront.png', 0.4, 0, width, height, 'transparent'),
            new BackgroundLayer('assets/Foreground/Trees.png', 0.6, 0, width, height, 'transparent'),
            new BackgroundLayer('assets/track.png', 1.0, 300, width, 100, '#6B4A31') // Keep generated track for now
        ];
    }

    update(gameSpeed) {
        this.layers.forEach(layer => layer.update(gameSpeed));
    }

    draw(ctx) {
        this.layers.forEach(layer => layer.draw(ctx));
    }
}
