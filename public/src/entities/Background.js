class BackgroundLayer {
    constructor(imageSrc, speedModifier, yOffset, width, height, fallbackColor, isTiled = false) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.speedModifier = speedModifier;
        this.yOffset = yOffset;
        this.width = width;
        this.height = height;
        this.x = 0;
        this.fallbackColor = fallbackColor;
        this.isTiled = isTiled;
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
        } else if (this.fallbackColor !== 'transparent') {
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
        
        // Exact Layout based on the provided Assets and Mockup
        this.layers = [
            new BackgroundLayer('assets/Background/BGBack.png', 0.05, 0, width, height, '#79C8F8'),
            new BackgroundLayer('assets/Background/CloudsBack.png', 0.1, 0, width, height, 'transparent'),
            new BackgroundLayer('assets/Background/BGFront.png', 0.2, 0, width, height, 'transparent'),
            new BackgroundLayer('assets/Background/CloudsFront.png', 0.4, 0, width, height, 'transparent'),
            new BackgroundLayer('assets/Foreground/Trees.png', 0.6, 0, width, height, 'transparent'),
            // We use the full height for forest layers and place ground at the very bottom
            new BackgroundLayer('assets/Foreground/Tileset.png', 1.0, 320, 800, 80, '#6B4A31', true) 
        ];
    }

    update(gameSpeed) {
        this.layers.forEach(layer => layer.update(gameSpeed));
    }

    draw(ctx) {
        this.layers.forEach(layer => layer.draw(ctx));
    }
}
