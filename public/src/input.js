export class InputHandler {
    constructor(canvasElement) {
        this.keys = {};
        this.consumed = {};
        
        // Mobile tap simulation state
        this.tapped = false;
        this.tapConsumed = false;

        // Keyboard support
        window.addEventListener('keydown', e => {
            if (!this.keys[e.code]) {
                this.keys[e.code] = true;
                this.consumed[e.code] = false;
            }
        });

        window.addEventListener('keyup', e => {
            this.keys[e.code] = false;
        });

        // Touch support (bind to window to capture full screen taps)
        window.addEventListener('touchstart', e => {
            e.preventDefault(); // Prevent zooming/scrolling
            if (!this.tapped) {
                this.tapped = true;
                this.tapConsumed = false;
            }
        }, { passive: false });

        window.addEventListener('touchend', e => {
            e.preventDefault();
            this.tapped = false;
        }, { passive: false });
        
        // Mouse click support for desktop
        window.addEventListener('mousedown', e => {
            if (!this.tapped) {
                this.tapped = true;
                this.tapConsumed = false;
            }
        });
        
        window.addEventListener('mouseup', e => {
            this.tapped = false;
        });
    }

    // Returns true exactly once per press/tap
    consumeJump() {
        // Check keyboard
        if ((this.keys['Space'] && !this.consumed['Space']) || (this.keys['ArrowUp'] && !this.consumed['ArrowUp'])) {
            if (this.keys['Space']) this.consumed['Space'] = true;
            if (this.keys['ArrowUp']) this.consumed['ArrowUp'] = true;
            return true;
        }
        
        // Check touch/mouse
        if (this.tapped && !this.tapConsumed) {
            this.tapConsumed = true;
            return true;
        }

        return false;
    }

    consumePause() {
        if ((this.keys['KeyP'] && !this.consumed['KeyP']) || (this.keys['Escape'] && !this.consumed['Escape'])) {
            if (this.keys['KeyP']) this.consumed['KeyP'] = true;
            if (this.keys['Escape']) this.consumed['Escape'] = true;
            return true;
        }
        return false;
    }
}
