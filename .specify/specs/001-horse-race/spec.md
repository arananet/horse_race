# Specification: 001-horse-race - Endless Runner

## Core Requirements
Develop a 2D side-scrolling "endless runner" horse racing game (inspired by Roach Race / Dino Game) playable in the browser using retro 16-bit pixel-art styling.

## User Stories
- As a player, I want the horse to run automatically so that I only need to focus on jumping and dodging.
- As a player, I want to press a button to Jump and Double Jump to avoid ground obstacles and gaps.
- As a player, I want to collect items (e.g., apples) floating in the air to increase my score.
- As a player, I want to see my current score and level progression on the top of the screen.
- As a player, I want the game to pause when I press the pause button.
- As a player, I want to see a "Game Over" screen with a High Scores leaderboard when I hit an obstacle or fall into a gap.

## Functional Requirements
1. **Game Loop:** The game MUST run a continuous 60fps `requestAnimationFrame` loop.
2. **Parallax Background:** The game MUST feature multi-layered parallax scrolling (sky, clouds, mountains, pine trees) to create a sense of speed.
3. **Player Mechanics:** The horse MUST have gravity and collision detection. It can jump and double-jump.
4. **Obstacle Spawning:** The game MUST procedurally generate obstacles (fences, gaps in the ground, birds/flying hazards) at varying intervals.
5. **Collectibles:** The game MUST spawn collectibles (apples) that the player can jump to catch.
6. **State Management:** The game MUST handle states: `START_MENU`, `PLAYING`, `PAUSED`, and `GAME_OVER`.
7. **Score System:** The score MUST increment as distance is covered and when collectibles are gathered. High scores should be saved to `localStorage`.

## Clarifications
*Generated via /speckit.clarify*
- **Q:** What happens when the player hits an obstacle?
- **A:** The game instantly transitions to the `GAME_OVER` state, displaying the final score and a leaderboard.

## Review & Acceptance Checklist
- [ ] Requirements meet the core constitution principles (Vanilla Canvas, 60fps).
- [ ] Jump and double-jump physics are smooth and responsive.
- [ ] Procedural generation of obstacles is fair and playable.
- [ ] Collision detection is pixel-perfect (or uses tight bounding boxes).
