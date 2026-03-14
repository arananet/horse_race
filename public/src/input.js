export class InputHandler {
    constructor(canvasElement) {
        this.keys = {};
        this.consumed = {};
        
        // Mobile tap simulation state
        this.tapped = false;
        this.tapConsumed = false;
        
        // Mouse coordinate tracking for menu clicks
        this.mouseX = 0;
        this.mouseY = 0;
        this.clickConsumed = false;

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
                
                // Map touch to mouse coordinates for UI clicks
                const touch = e.touches[0];
                const rect = canvasElement.getBoundingClientRect();
                const scaleX = canvasElement.width / rect.width;
                const scaleY = canvasElement.height / rect.height;
                this.mouseX = (touch.clientX - rect.left) * scaleX;
                this.mouseY = (touch.clientY - rect.top) * scaleY;
                this.clickConsumed = false;
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
                
                const rect = canvasElement.getBoundingClientRect();
                const scaleX = canvasElement.width / rect.width;
                const scaleY = canvasElement.height / rect.height;
                this.mouseX = (e.clientX - rect.left) * scaleX;
                this.mouseY = (e.clientY - rect.top) * scaleY;
                this.clickConsumed = false;
            }
        });
        
        window.addEventListener('mouseup', e => {
            this.tapped = false;
        });
        
        window.addEventListener('mousemove', e => {
            const rect = canvasElement.getBoundingClientRect();
            const scaleX = canvasElement.width / rect.width;
            const scaleY = canvasElement.height / rect.height;
            this.mouseX = (e.clientX - rect.left) * scaleX;
            this.mouseY = (e.clientY - rect.top) * scaleY;
        });
    }

    consumeJump() {
        if ((this.keys['Space'] && !this.consumed['Space']) || (this.keys['ArrowUp'] && !this.consumed['ArrowUp'])) {
            if (this.keys['Space']) this.consumed['Space'] = true;
            if (this.keys['ArrowUp']) this.consumed['ArrowUp'] = true;
            return true;
        }
        
        if (this.tapped && !this.tapConsumed) {
            this.tapConsumed = true;
            return true;
        }

        return false;
    }
    
    consumeClick(rect) {
        if (this.tapped && !this.clickConsumed) {
            if (this.mouseX >= rect.x && this.mouseX <= rect.x + rect.w &&
                this.mouseY >= rect.y && this.mouseY <= rect.y + rect.h) {
                this.clickConsumed = true;
                this.tapConsumed = true;
                return true;
            }
        }
        return false;
    }
    
    isHovering(rect) {
        return (this.mouseX >= rect.x && this.mouseX <= rect.x + rect.w &&
                this.mouseY >= rect.y && this.mouseY <= rect.y + rect.h);
    }

    consumePause() {
        if ((this.keys['KeyP'] && !this.consumed['KeyP']) || (this.keys['Escape'] && !this.consumed['Escape'])) {
            if (this.keys['KeyP']) this.consumed['KeyP'] = true;
            if (this.keys['Escape']) this.consumed['Escape'] = true;
            return true;
        }
        return false;
    }
    
    consumeUp() {
        if (this.keys['ArrowUp'] && !this.consumed['ArrowUp']) {
            this.consumed['ArrowUp'] = true;
            return true;
        }
        return false;
    }
    
    consumeDown() {
        if (this.keys['ArrowDown'] && !this.consumed['ArrowDown']) {
            this.consumed['ArrowDown'] = true;
            return true;
        }
        return false;
    }
    
    consumeEnter() {
        if (this.keys['Enter'] && !this.consumed['Enter']) {
            this.consumed['Enter'] = true;
            return true;
        }
        return false;
    }
}
