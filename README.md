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

**Earning gold** — enemies drop gold when killed; a bonus is paid at the end of each wave (shown in a banner as the wave clears).

The game has light sound effects (tower placement, upgrades, kills, wave start/clear, abilities, losing a life) synthesized on the fly — no audio files, so nothing to load.

### Towers

| Tower | Cost | Notes |
|-------|------|-------|
| 🏹 Arrow | 50g | Balanced damage and range |
| ⚡ Laser | 80g | Fast fire rate, long range |
| 🔥 Inferno | 150g | Fires a beam that heats up over time — hold fire on one target for maximum damage |
| 🧊 Frost | 110g | Slows every enemy it hits — pairs well with any other tower to keep targets in range longer |

Click a tower button to select it, then click an empty grid cell to place it. Click the same button again or press Escape to cancel.

### Upgrading Towers

Click a placed tower to open its context menu. Every tower has three independent upgrade paths, each with 5 tiers, and each path shows exactly what its next tier grants (e.g. "+20% dmg" or "unlocks anti-air targeting") right below its upgrade button:

- **💪 Power** — raw damage. Capstone (tier 5) adds a crit chance (Arrow), an overcharge chance (Laser), a bigger beam multiplier (Inferno), or bonus damage against already-slowed enemies (Frost).
- **⚡ Speed** (Arrow/Laser) — faster fire rate. Capstone fires a second arrow per shot (Arrow) or pushes the laser toward near-continuous fire.
- **🥶 Heat** (Inferno only) — faster heat ramp-up. Capstone unlocks **Cryo Core**: the longer the beam stays locked on a target, the colder (and slower) that enemy gets.
- **❄️ Chill** (Frost only) — stronger slow on hit. Capstone adds a chance to fully freeze the target in place for a moment.
- **🎯 Utility** — more range. Tier 2 unlocks anti-air targeting (Inferno already tracks air). Capstone adds pierce (Arrow hits a 2nd enemy), chain (Laser splits damage to a 2nd enemy), splash (Inferno beam damages nearby enemies), or a slow nova (Frost pulses a lighter slow to nearby enemies).

**Crosspathing** — a tower can only ever have levels in 2 of its 3 paths: once you've put a point into two different paths, the untouched third locks for good. And once either of those two paths goes past tier 2, the other locks at its current tier — so every tower ends up committed to one main path, with a couple of tiers spent in a secondary.

- **💸 Sell** — remove the tower for 50% of everything invested in it (base cost + all path upgrades).

### Active Abilities

Maxing out **Arrow**'s or **Frost**'s **💪 Power** path (tier 5) unlocks a manually-triggered active ability on top of its passive capstone bonus:

| Tower | Ability | Effect |
|-------|---------|--------|
| 🏹 Arrow | 🎯 Volley | Instantly strikes every enemy currently in range for a full hit each |
| 🧊 Frost | 🧊 Deep Freeze | Fully freezes every enemy in range for a few seconds |

An **✨ Abilities** tab appears on the right edge of the screen — like the 🏗️ Towers tab on the left — the moment you've unlocked your first one, listing every tower that currently has an ability ready along with an **Activate!** button and a live cooldown countdown. It stays hidden entirely until then.

Use abilities to swing a fight — clear a cluster before it reaches a chokepoint, burst down a shielded enemy or boss, or buy time against a big wave.

### Enemies

| Enemy | Notes |
|-------|-------|
| Ground | Standard enemy, no special traits |
| ✈️ Air | Flying — only hit by towers with anti-air targeting (from wave 3) |
| 🏃 Sprinter | Low HP but very fast (from wave 3) |
| 🛡️ Shielded | Absorbs a chunk of incoming damage before its health bar starts dropping (from wave 4) |
| 🟢 Ooze | Splits into 2 weaker oozes on death (from wave 5) |
| 💉 Medic | Periodically heals nearby enemies — a priority kill target (from wave 6) |
| 🐴 Trojan Horse | Hides 3 units — kill it and they scatter (from wave 2) |
| 💀 Boss | Appears every 5 waves starting at wave 10, cycling through 3 variants: **Classic** (hides trojans and ground units on death), **Armored** (takes 35% reduced damage, hides ground units), **Swarm** (periodically spawns flying minions while alive, hides more on death) |

### Controls

- **Start Wave** — sends the next wave of enemies
- **Auto** — automatically starts each wave after a short delay
- **1× / 2×** — toggles double game speed

### Game Over

When your lives hit 0, a Game Over panel shows your final wave and kill count, your best-ever result (saved locally in your browser), and a **🔄 Restart** button that resets the game in place — no page refresh needed.

### Tips

- The Inferno beam starts weak — let it lock on and build heat before switching targets.
- Frost towers don't hit hard on their own — pair them with a heavy hitter and let the slow keep targets in range.
- Hover over a cell while a tower is selected to preview its range.
- Sell and reposition towers between waves to adapt to harder enemies.
- Kill Medics first — every heal pulse they land undoes several hits' worth of your damage.
- Watch for a gold "!" popup and a distinct sound — that's a crit or overcharge hit landing.

## Project Structure

```
index.html    — the entire game (HTML, CSS, JS in one file)
serve.js      — dev server with live reload (Node.js, no dependencies)
serve.bat     — Windows convenience launcher for serve.js
legacy/       — earlier prototype versions
```
