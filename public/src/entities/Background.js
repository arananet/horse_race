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
            ctx.fillStyle = '#6E93B6'; // The exact blue/grey from the new screenshot
            ctx.fillRect(xOffset, 0, this.width, this.height);

            // Blocky 8-bit Clouds (white)
            ctx.fillStyle = '#FFFFFF';
            // Cloud 1
            ctx.fillRect(xOffset + 150, 40, 40, 20);
            ctx.fillRect(xOffset + 130, 60, 80, 20);
            ctx.fillRect(xOffset + 110, 80, 120, 20);
            
            // Cloud 2
            ctx.fillRect(xOffset + 500, 20, 40, 20);
            ctx.fillRect(xOffset + 480, 40, 80, 20);
            ctx.fillRect(xOffset + 460, 60, 120, 20);

        } else if (this.type === 'mountains') {
            // Dark grey/blueish mountains from the reference
            ctx.fillStyle = '#3A5266'; 
            for(let i=0; i<this.width; i+=250) {
                ctx.beginPath();
                ctx.moveTo(xOffset + i, this.height);
                ctx.lineTo(xOffset + i + 125, 0);
                ctx.lineTo(xOffset + i + 250, this.height);
                ctx.fill();
            }
            
            // Lighter grey mountains in front
            ctx.fillStyle = '#4D6B82';
            for(let i=125; i<this.width; i+=200) {
                ctx.beginPath();
                ctx.moveTo(xOffset + i, this.height);
                ctx.lineTo(xOffset + i + 100, 40);
                ctx.lineTo(xOffset + i + 200, this.height);
                ctx.fill();
            }
        } else if (this.type === 'ground') {
            // Black/Dark silhouette skyline base right above the grass
            ctx.fillStyle = '#000000';
            ctx.fillRect(xOffset, -15, this.width, 15);
            
            // Grass
            ctx.fillStyle = '#609D51'; // Grass green from reference
            ctx.fillRect(xOffset, 0, this.width, 30);
            
            // Grass detailing triangles
            ctx.fillStyle = '#79BB69'; // Lighter green triangles
            for(let i=0; i<this.width; i+=30) {
                ctx.beginPath();
                ctx.moveTo(xOffset + i, 30);
                ctx.lineTo(xOffset + i + 15, 0);
                ctx.lineTo(xOffset + i + 30, 30);
                ctx.fill();
            }

            // Dirt base
            ctx.fillStyle = '#6B4A31'; // Dark reddish brown
            ctx.fillRect(xOffset, 30, this.width, this.height - 30);
            
            // Dark brown dirt detailing line below the grass
            ctx.fillStyle = '#4A3121';
            ctx.fillRect(xOffset, 30, this.width, 10);
        }
    }
}

export class Background {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        
        this.layers = [
            new BackgroundLayer('sky', 0.1, 0, width, 220),
            new BackgroundLayer('mountains', 0.3, 100, width, 200), // Pushed mountains down to match ref
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
