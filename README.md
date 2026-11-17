# Frontier Command - Blazor WASM PWA

Spiritual successor to Acornsoft's *Starship Command* (1983).

## Features
- Player ship locked at screen center; world rotates and translates around you
- Energy management (actions drain energy, regenerates faster when idle/shields down)
- Shields toggle (S key)
- Limited-range torpedoes (Space)
- Small and large enemies (some cloaked)
- Port and starboard escape capsules (F and G). The pod must clear the playfield, then Star Fleet rates the score and may promote you to a new ship
- Scoring and progressive commands

## Controls
- **Arrow Left / A**: Rotate left
- **Arrow Right / D**: Rotate right
- **Arrow Up / W**: Thrust
- **Arrow Down**: Brake
- **Space**: Fire torpedoes
- **S**: Toggle shields
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
