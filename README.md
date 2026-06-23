# Tower Defense

A browser-based tower defense game built as a single HTML file with no dependencies.

## Play

Open `index.html` directly in a browser, or run the local dev server for live reload on file changes:

```
node serve.js
```

Then open `http://localhost:8080`.

## How to Play

Enemies follow a fixed path from the left edge to the castle on the right. Place towers on any empty grid cell that isn't on the path to stop them. You start with 20 lives and 150 gold.

**Losing a life** — an enemy reaches the castle end of the path.

**Earning gold** — enemies drop gold when killed; a bonus is paid at the end of each wave.

### Towers

| Tower | Cost | Notes |
|-------|------|-------|
| 🏹 Arrow | 50g | Balanced damage and range |
| ⚡ Laser | 80g | Fast fire rate, long range |
| 🔥 Inferno | 150g | Fires a beam that heats up over time — hold fire on one target for maximum damage |

Click a tower button to select it, then click an empty grid cell to place it. Click the same button again or press Escape to cancel.

**Sell (💸)** — select Sell mode and click a tower to remove it for 50% of its cost.

### Controls

- **Start Wave** — sends the next wave of enemies
- **Auto** — automatically starts each wave after a short delay
- **1× / 2×** — toggles double game speed

### Tips

- The Inferno beam starts weak — let it lock on and build heat before switching targets.
- Hover over a cell while a tower is selected to preview its range.
- Sell and reposition towers between waves to adapt to harder enemies.

## Project Structure

```
index.html    — the entire game (HTML, CSS, JS in one file)
serve.js      — dev server with live reload (Node.js, no dependencies)
serve.bat     — Windows convenience launcher for serve.js
legacy/       — earlier prototype versions
```
