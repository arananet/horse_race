class BackgroundLayer {
    constructor(type, speedModifier, yOffset, width, height) {
        this.type = type;
        this.speedModifier = speedModifier;
        this.yOffset = yOffset;
        this.width = width;
        this.height = height;
        this.x = 0;
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
        if (this.type === 'sky') {
            // Sky gradient
            const grad = ctx.createLinearGradient(0, 0, 0, this.height);
            grad.addColorStop(0, '#4A90E2'); // Deep sky blue
            grad.addColorStop(1, '#87CEEB'); // Light sky blue
            ctx.fillStyle = grad;
            ctx.fillRect(xOffset, 0, this.width, this.height);

            // Pixelated clouds
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillRect(xOffset + 100, 40, 80, 20);
            ctx.fillRect(xOffset + 120, 20, 60, 40);
            ctx.fillRect(xOffset + 400, 80, 100, 20);
            ctx.fillRect(xOffset + 420, 60, 60, 40);
            ctx.fillRect(xOffset + 600, 30, 70, 15);
            ctx.fillRect(xOffset + 610, 20, 50, 30);
        } else if (this.type === 'mountains') {
            ctx.fillStyle = '#4682B4'; // Steel blue
            for(let i=0; i<this.width; i+=150) {
                ctx.beginPath();
                ctx.moveTo(xOffset + i, this.height);
                ctx.lineTo(xOffset + i + 75, 0);
                ctx.lineTo(xOffset + i + 150, this.height);
                ctx.fill();
            }
            // Lighter mountains in front
            ctx.fillStyle = '#5F9EA0'; // Cadet blue
            for(let i=75; i<this.width; i+=150) {
                ctx.beginPath();
                ctx.moveTo(xOffset + i, this.height);
                ctx.lineTo(xOffset + i + 75, 50);
                ctx.lineTo(xOffset + i + 150, this.height);
                ctx.fill();
            }
        } else if (this.type === 'trees') {
            ctx.fillStyle = '#228B22'; // Forest green
            for(let i=0; i<this.width; i+=40) {
                // Trunk
                ctx.fillStyle = '#8B4513';
                ctx.fillRect(xOffset + i + 15, this.height - 20, 10, 20);
                // Leaves (pixelated triangle)
                ctx.fillStyle = '#006400'; // Dark green
                ctx.fillRect(xOffset + i + 5, this.height - 40, 30, 20);
                ctx.fillRect(xOffset + i + 10, this.height - 60, 20, 20);
                ctx.fillRect(xOffset + i + 15, this.height - 80, 10, 20);
            }
        } else if (this.type === 'ground') {
            // Grass surface
            ctx.fillStyle = '#32CD32'; // Lime green
            ctx.fillRect(xOffset, 0, this.width, 20);
            
            // Grass detailing
            ctx.fillStyle = '#228B22';
            for(let i=0; i<this.width; i+=30) {
                ctx.fillRect(xOffset + i, 5, 4, 15);
            }

            // Dirt/Rock layer beneath
            ctx.fillStyle = '#654321'; // Dark brown
            ctx.fillRect(xOffset, 20, this.width, this.height - 20);

            // Rocks in dirt
            ctx.fillStyle = '#4E3629';
            for(let i=0; i<this.width; i+=40) {
                ctx.fillRect(xOffset + i, 30 + (i%3)*10, 15, 15);
                ctx.fillStyle = '#8B4513';
                ctx.fillRect(xOffset + i + 20, 50 + (i%2)*15, 10, 10);
                ctx.fillStyle = '#4E3629';
            }
        }
    }
}

export class Background {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        
        // Layout:
        // Sky: 0 to 250
        // Mountains: 100 to 250 (150px tall)
        // Trees: 170 to 300 (130px tall)
        // Ground: 300 to 400 (100px tall)
        this.layers = [
            new BackgroundLayer('sky', 0.1, 0, width, 250),
            new BackgroundLayer('mountains', 0.2, 100, width, 150),
            new BackgroundLayer('trees', 0.5, 170, width, 130),
            new BackgroundLayer('ground', 1.0, 300, width, 100)
        ];
    }

    update(gameSpeed) {
        this.layers.forEach(layer => layer.update(gameSpeed));
    }

    draw(ctx) {
        this.layers.forEach(layer => layer.draw(ctx));
    }
}
