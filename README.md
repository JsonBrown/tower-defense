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

### Upgrading Towers

Click a placed tower to open its context menu. Every tower has three independent upgrade paths, each with 5 tiers:

- **💪 Power** — raw damage. Capstone (tier 5) adds a crit chance (Arrow), an overcharge chance (Laser), or a bigger beam multiplier (Inferno).
- **⚡ Speed** (Arrow/Laser) — faster fire rate. Capstone fires a second arrow per shot (Arrow) or pushes the laser toward near-continuous fire.
- **🥶 Heat** (Inferno only) — faster heat ramp-up. Capstone unlocks **Cryo Core**: the longer the beam stays locked on a target, the colder (and slower) that enemy gets.
- **🎯 Utility** — more range. Tier 2 unlocks anti-air targeting for Arrow/Laser (Inferno already tracks air). Capstone adds pierce (Arrow hits a 2nd enemy), chain (Laser splits damage to a 2nd enemy), or splash (Inferno beam damages nearby enemies).

**Crosspathing** — you can freely level any path up to tier 2. Once a path goes past tier 2, the other two paths lock at their current tier until you sell the tower — so each tower ends up specialized in one path, with a couple of tiers spent elsewhere.

- **💸 Sell** — remove the tower for 50% of everything invested in it (base cost + all path upgrades).

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
