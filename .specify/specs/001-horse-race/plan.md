# Technical Plan: 001-horse-race MVP

## Architecture & Tech Stack
- HTML5 Canvas, Vanilla JavaScript (ES6+ Modules), HTML/CSS (No build tools initially, just static files served).
- Pixel-Art Assets (`image-rendering: pixelated` in CSS to keep them crisp).
- Main Game Loop utilizing `window.requestAnimationFrame()`.

## Component Breakdown

1. **Asset Loader (`assets.js`)**:
    - Preloads images, spritesheets, and audio before starting the game.
2. **Game Loop Engine (`engine.js`)**:
    - Handles `update()` and `draw()` functions with delta time calculation.
3. **Entities (`entities/`)**:
    - `Horse.js`: Handles horse state, animation frames, physics (speed, jumping, stamina).
    - `Background.js`: Handles parallax scrolling layers (sky, mountains, track).
4. **Input Handler (`input.js`)**:
    - Captures keyboard/mouse events for interactive elements.
5. **Main Entry (`main.js`)**:
    - Initializes the game state, canvas context, and starts the loop once assets are loaded.

## Implementation Steps

1. Scaffold the basic HTML/CSS structure to host a scalable, centered canvas with correct rendering settings.
2. Build the `AssetLoader` to fetch temporary placeholder pixel-art sprites (a running horse and a layered background).
3. Implement the core `requestAnimationFrame` loop with proper delta-time decoupling.
4. Create the `Background` class with 3-layer parallax scrolling.
5. Create the `Horse` class that parses a simple spritesheet and animates a running cycle on the track.
6. Combine everything in `main.js` and render the scene.
