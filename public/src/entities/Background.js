class BackgroundLayer {
    constructor(type, speedModifier, yOffset, width, height, fallbackColor) {
        this.type = type;
        this.speedModifier = speedModifier;
        this.yOffset = yOffset;
        this.width = width;
        this.height = height;
        this.x = 0;
        this.fallbackColor = fallbackColor;

        this.image = new Image();
        this.image.src = type === 'full' ? 'assets/full_bg.png' : `assets/${type}.png`;
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
        ctx.save();
        ctx.translate(this.x, this.yOffset);
        this.renderPattern(ctx, 0);
        this.renderPattern(ctx, this.width);
        ctx.restore();
    }

    renderPattern(ctx, xOffset) {
        if (this.isLoaded) {
            ctx.drawImage(this.image, xOffset, 0, this.width, this.height);
        } else {
            ctx.fillStyle = this.fallbackColor;
            ctx.fillRect(xOffset, 0, this.width, this.height);
        }
    }
}

export class Background {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.layers = [
            new BackgroundLayer('full', 1.0, 0, width, height, '#6E93B6')
        ];
    }

    update(gameSpeed) {
        this.layers.forEach(layer => layer.update(gameSpeed));
    }

    draw(ctx) {
        this.layers.forEach(layer => layer.draw(ctx));
    }
}
