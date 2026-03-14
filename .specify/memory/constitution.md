# 🏛️ Horse Race Constitution

## Vision
To build a high-performance, lightweight 2D side-scrolling pixel-art horse racing game that runs flawlessly in any modern web browser. The game must evoke retro nostalgia through its visual style and tight mechanics.

## Principles
1. **Performance First:** The game loop must run consistently at 60 FPS. Avoid unnecessary garbage collection pauses by reusing objects (object pooling) when possible.
2. **Vanilla is King:** Unless absolutely necessary, prefer Vanilla HTML5 Canvas (`CanvasRenderingContext2D`) and plain JavaScript over heavy game frameworks to keep the bundle size minimal and understanding of the core loop clear.
3. **Responsive Pixel Art:** The canvas must scale correctly across different screen sizes while maintaining crisp, aliased pixel edges (no blurry scaling).
4. **Architectural Separation:** Game Logic (Entities, Physics, State) must be decoupled from Rendering Logic. The architecture should follow a standard Update-Render loop.

## Technical Mandates
- **Language:** TypeScript/JavaScript (ES6 Modules).
- **Graphics:** 2D Canvas Context with `image-rendering: pixelated`.
- **Assets:** Spritesheets must be loaded completely before the game loop starts.
- **Audio:** Web Audio API (if applicable) for low-latency SFX.
