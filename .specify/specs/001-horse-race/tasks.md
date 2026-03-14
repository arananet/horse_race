# Tasks: 001-horse-race MVP

## Setup & Infrastructure
- [ ] Create `public/index.html` with scalable `<canvas>`.
- [ ] Add basic styling in `public/style.css` to enforce `image-rendering: pixelated` and center the game.
- [ ] Setup `public/src/` for JavaScript ES6 modules.

## Core Engine
- [ ] Implement `public/src/engine.js` with `requestAnimationFrame` loop, delta time calculation, `update()`, and `draw()` hooks.
- [ ] Implement `public/src/assets.js` to load images sequentially before game start.

## Game Logic & Entities
- [ ] Create `public/src/entities/Background.js` to handle parallax scrolling across 3 distinct layers at different speeds.
- [ ] Create `public/src/entities/Horse.js` capable of animating frames from a spritesheet.

## Integration
- [ ] Combine all modules in `public/src/main.js`.
- [ ] Procure or generate placeholder pixel-art assets (horse run cycle, sky, mountains, track) into `public/assets/`.
- [ ] Start the game loop and render the scene successfully in the browser.
