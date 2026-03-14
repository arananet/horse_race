class BackgroundLayer {
    constructor(color, speedModifier, yOffset, width, height) {
        this.color = color; // Placeholder for Image
        this.speedModifier = speedModifier;
        this.yOffset = yOffset;
        this.width = width;
        this.height = height;
        this.x = 0;
    }

    update(gameSpeed) {
        this.x -= gameSpeed * this.speedModifier;
        // Loop the image seamlessly
        if (this.x <= -this.width) {
            this.x = 0;
        }
    }

    draw(ctx, canvasWidth) {
        // We draw the layer twice next to each other to create the illusion of an infinite loop
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.yOffset, this.width, this.height);
        ctx.fillRect(this.x + this.width, this.yOffset, this.width, this.height);
    }
}

export class Background {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        
        // Multi-layered Parallax Setup
        // Each layer moves at a different speed relative to `gameSpeed`
        // 1. Sky (Stationary/Slowest)
        // 2. Mountains (Medium)
        // 3. Pine Trees (Fast)
        // 4. Ground/Track (Fastest)
        this.layers = [
            new BackgroundLayer('#87CEEB', 0.1, 0, width, height),            // Sky
            new BackgroundLayer('#5F9EA0', 0.3, height - 200, width, 200),     // Mountains
            new BackgroundLayer('#2E8B57', 0.6, height - 100, width, 100),     // Trees
            new BackgroundLayer('#5C4033', 1.0, height - 40, width, 40)        // Ground Dirt Track
        ];
    }

    update(gameSpeed) {
        this.layers.forEach(layer => layer.update(gameSpeed));
    }

    draw(ctx) {
        this.layers.forEach(layer => layer.draw(ctx, this.width));
    }
}
