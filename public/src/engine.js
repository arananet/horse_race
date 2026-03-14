export class Engine {
    constructor(update, draw) {
        this.update = update;
        this.draw = draw;
        this.lastTime = 0;
        this.accumulatedTime = 0;
        this.timeStep = 1000 / 60; // Target 60 FPS
        this.isRunning = false;
        
        // Ensure 'this' context is preserved inside the loop
        this.loop = this.loop.bind(this);
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            requestAnimationFrame(this.loop);
        }
    }

    stop() {
        this.isRunning = false;
    }

    loop(timestamp) {
        if (!this.isRunning) return;

        let deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        // Prevent "spiral of death" if the tab was inactive and delta gets huge
        if (deltaTime > 250) {
            deltaTime = 250;
        }

        this.accumulatedTime += deltaTime;

        // Fixed timestep for consistent physics across monitor refresh rates
        while (this.accumulatedTime >= this.timeStep) {
            this.update(this.timeStep);
            this.accumulatedTime -= this.timeStep;
        }

        // Render pass
        this.draw();

        // Loop again
        requestAnimationFrame(this.loop);
    }
}
