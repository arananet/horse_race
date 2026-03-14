# Roach Race (Horse Endless Runner) 🏇

A 2D pixel-art side-scrolling endless runner game playable directly in the browser! Inspired by classic arcade runners and the "Roach Race" mini-game.

## Features
- **Retro Pixel Art Style**: Nostalgic 16-bit graphics (mountains, pine trees, clouds).
- **Endless Runner Mechanics**: Auto-scrolling, jumping, double-jumping to avoid fences and gaps.
- **Collectibles**: Grab floating apples for bonus points.
- **Leaderboard**: Local high scores saved between sessions.
- **Browser-Native**: Built with HTML5 Canvas and Vanilla JavaScript for maximum performance (60fps) and compatibility.
- **Spec-Kit Architecture**: Developed using strict Specification-Driven Development (SDD).

## Development
This project follows the Spec-Kit methodology. See `.specify/` for project constitution, plans, and architectural decisions.

### Running Locally
To run the game, serve the `public` directory using any local web server.
```bash
# Using Node.js
npx serve public

# Or using Python
python3 -m http.server -d public
```
