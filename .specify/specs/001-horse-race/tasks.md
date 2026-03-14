# Tasks: 001-horse-race Endless Runner

## Phase 1: Setup & Infrastructure
- [ ] Create `public/index.html` with scalable `<canvas>` and UI overlays (Start, Pause, GameOver).
- [ ] Add basic styling in `public/style.css` to enforce `image-rendering: pixelated`.
- [ ] Setup `public/src/` for JavaScript ES6 modules.

## Phase 2: Core Engine
- [ ] Implement `public/src/engine.js` with `requestAnimationFrame` loop, delta time calculation, `update()`, and `draw()` hooks.
- [ ] Implement `public/src/input.js` to capture Keyboard (`Space`, `Up`, `P`, `Esc`).
- [ ] Implement `public/src/assets.js` to preload images sequentially before game start.

## Phase 3: Game Logic & Entities
- [ ] Create `public/src/physics.js` for basic AABB collision detection and gravity calculations.
- [ ] Create `public/src/entities/Background.js` to handle parallax scrolling across 3 distinct layers at different speeds (Sky, Mountains, Trees, Ground).
- [ ] Create `public/src/entities/Horse.js` capable of animating frames from a spritesheet, jumping, and double-jumping with gravity logic.
- [ ] Create `public/src/entities/ObstacleSpawner.js` to procedurally spawn fences and ground gaps.
- [ ] Create `public/src/entities/CollectibleSpawner.js` to spawn apples in the air for score bonuses.

## Phase 4: Integration & UI
- [ ] Implement `public/src/ui.js` to render Score, Level, and High Scores (using `localStorage`).
- [ ] Combine all modules in `public/src/main.js` to handle game states (`MENU`, `PLAYING`, `PAUSED`, `GAMEOVER`).
- [ ] Run the game loop and render the scene successfully in the browser.
