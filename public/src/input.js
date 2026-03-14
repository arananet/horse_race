export class InputHandler {
    constructor() {
        this.keys = {};
        this.consumed = {};

        window.addEventListener('keydown', e => {
            if (!this.keys[e.code]) {
                this.keys[e.code] = true;
                this.consumed[e.code] = false; // Mark as fresh press
            }
        });

        window.addEventListener('keyup', e => {
            this.keys[e.code] = false;
        });
    }

    // Returns true as long as the key is held
    isHeld(code) {
        return !!this.keys[code];
    }

    // Returns true exactly once per key press (good for jumping)
    consume(code) {
        if (this.keys[code] && !this.consumed[code]) {
            this.consumed[code] = true;
            return true;
        }
        return false;
    }
}
