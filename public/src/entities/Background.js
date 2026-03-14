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
            // Flat light blue sky to match reference precisely
            ctx.fillStyle = '#79C8F8'; 
            ctx.fillRect(xOffset, 0, this.width, this.height);

            // Blocky 8-bit Clouds (white & light grey)
            ctx.fillStyle = '#FFFFFF';
            // Cloud 1
            ctx.fillRect(xOffset + 150, 60, 60, 20);
            ctx.fillRect(xOffset + 130, 80, 100, 20);
            ctx.fillRect(xOffset + 170, 40, 20, 20);
            ctx.fillStyle = '#E0E0E0'; // Cloud shadow
            ctx.fillRect(xOffset + 130, 100, 100, 10);
            
            // Cloud 2
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(xOffset + 500, 30, 80, 20);
            ctx.fillRect(xOffset + 480, 50, 120, 20);
            ctx.fillRect(xOffset + 520, 10, 40, 20);
            ctx.fillStyle = '#E0E0E0';
            ctx.fillRect(xOffset + 480, 70, 120, 10);

        } else if (this.type === 'mountains') {
            // Teal/Blueish mountains in the back
            ctx.fillStyle = '#4A8BB5'; 
            for(let i=0; i<this.width; i+=300) {
                ctx.beginPath();
                ctx.moveTo(xOffset + i, this.height);
                ctx.lineTo(xOffset + i + 150, 0);
                ctx.lineTo(xOffset + i + 300, this.height);
                ctx.fill();
            }
            
            // Darker teal mountains in front
            ctx.fillStyle = '#3978A3';
            for(let i=150; i<this.width; i+=250) {
                ctx.beginPath();
                ctx.moveTo(xOffset + i, this.height);
                ctx.lineTo(xOffset + i + 125, 40);
                ctx.lineTo(xOffset + i + 250, this.height);
                ctx.fill();
            }
        } else if (this.type === 'ground') {
            // Bright green grass strip (Where the horse runs)
            ctx.fillStyle = '#4CAF50'; 
            ctx.fillRect(xOffset, 0, this.width, 30);
            
            // Light green grass triangles/blades sticking up
            ctx.fillStyle = '#81C784';
            for(let i=0; i<this.width; i+=40) {
                ctx.beginPath();
                ctx.moveTo(xOffset + i, 30);
                ctx.lineTo(xOffset + i + 20, 0);
                ctx.lineTo(xOffset + i + 40, 30);
                ctx.fill();
            }

            // Dark dirt base
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(xOffset, 30, this.width, this.height - 30);
        }
    }
}

export class Background {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        
        // Exact Layout based on the reference screenshots:
        // Y=0 to Y=220: Sky & Clouds
        // Y=200 to Y=300: Mountains
        // Y=300 to Y=400: Ground (Grass & Dirt)
        this.layers = [
            new BackgroundLayer('sky', 0.1, 0, width, 220),
            new BackgroundLayer('mountains', 0.3, 150, width, 150),
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
