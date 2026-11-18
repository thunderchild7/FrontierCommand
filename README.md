# Frontier Command - Blazor WASM PWA

Spiritual successor to Acornsoft's *Starship Command* (1983).

## Features
- Player ship locked at screen center; world rotates and translates around you
- Energy management. Thrust, braking, torpedoes, shields, and damage draw from four recharging banks. Very low energy shuts off shields and scanners until the banks recover
- Shields and the long-range scanner are mutually exclusive. S toggles them manually. Q lets the ship switch automatically when a contact gets close
- Limited-range torpedoes (Space)
- Small and large enemies (some cloaked)
- Port and starboard escape capsules (F and G). The pod must clear the playfield, then Star Fleet rates the score and may promote you to a new ship
- Scoring and progressive commands. Torpedoes award 8 for a small ship and 12 for a large one. Ramming awards 2 and 3

## Controls
- **Arrow Left / A**: Rotate left
- **Arrow Right / D**: Rotate right
- **Arrow Up / W**: Thrust
- **Arrow Down**: Brake
- **Space**: Fire torpedoes
- **S**: Toggle shields and scanners (leaves AUTO)
- **Q**: Toggle automatic shields
- **F**: Launch the port escape capsule
- **G**: Launch the starboard escape capsule
- **R**: Restart

## Run the PWA
The published static files are in `/workspace/artifacts/publish/wwwroot`.

To serve locally:
```bash
cd /workspace/artifacts/publish/wwwroot
python3 -m http.server 8080
```

Then open http://localhost:8080 in a browser. It is a Progressive Web App (installable).

## Development
Requires .NET 8 SDK.
```bash
cd FrontierCommand
dotnet run
```

Built as a Blazor WebAssembly Progressive Web App.
