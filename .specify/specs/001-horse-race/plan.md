# Technical Plan: 001-horse-race Endless Runner

## Architecture & Tech Stack
- HTML5 Canvas for rendering (2D Context).
- Vanilla JavaScript (ES6+ Modules) for game logic and physics.
- Local Storage for High Scores persistence.
- Pixel-Art Assets (`image-rendering: pixelated` in CSS).

## Component Breakdown

1. **Asset Loader (`assets.js`)**:
    - Preloads spritesheets: Horse run cycle, horse jump/fall, apples, fences, trees, sky, mountains, and UI elements.
2. **Game Loop Engine (`engine.js`)**:
    - High-performance `requestAnimationFrame` loop with delta time (dt) calculation for consistent speeds across refresh rates.
    - Manages `currentState`: `MENU`, `PLAYING`, `PAUSED`, `GAMEOVER`.
3. **Entities (`entities/`)**:
    - `Horse.js`: State machine (running, jumping, double-jumping, falling, dead), physics (gravity, velocity), bounding box for collisions.
    - `Background.js`: Parallax layers (Sky, Clouds, Mountains, Pine Trees, Ground Track).
    - `ObstacleSpawner.js`: Spawns fences, gaps in the track, and flying hazards procedurally.
    - `CollectibleSpawner.js`: Spawns apples in arcs or high-jump positions.
4. **Collision Engine (`physics.js`)**:
    - AABB (Axis-Aligned Bounding Box) collision detection between the horse, obstacles, and collectibles.
5. **Input Handler (`input.js`)**:
    - Captures `Space`/`Up Arrow` for Jump/Double-Jump.
    - Captures `P` or `Escape` for Pause.
6. **UI Renderer (`ui.js`)**:
    - Renders the Score (top right), Level (top left), Pause overlay, and the Game Over High Score leaderboard.

## Implementation Steps

1. **Phase 1: Setup & Loop** - Scaffold the Canvas and the main game loop structure.
2. **Phase 2: Environment** - Implement the scrolling ground and the multi-layer parallax background (mountains, trees, clouds).
3. **Phase 3: The Horse** - Implement the running animation, gravity, jump, and double-jump mechanics.
4. **Phase 4: Obstacles & Collisions** - Add procedural fences/gaps and AABB collision detection to trigger Game Over.
5. **Phase 5: Collectibles & Score** - Spawn apples, handle collection collisions, and increment the UI score tracker.
6. **Phase 6: Polish & UI** - Add the Start Screen, Pause Menu, Game Over Screen with LocalStorage high scores, and final visual tweaks.
