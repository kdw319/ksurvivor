# Project Instructions (K-Survivor)

## Efficiency & Response Protocol (CRITICAL)
- **Immediate Output:** Skip all "Thinking" filler, preambles, and conversational fluff. Start with the solution.
- **Surgical Editing:** Modify only the necessary lines in `index.html`. Do not rewrite large blocks.
- **Concise Reporting:** Use bullet points. Be brief.
- **Streaming Mode:** Act as if `--stream` is always enabled; provide direct, rapid responses.

## Visual Standards
- **Atmosphere:** Mute saturation and brightness on all map presets. Dark/Immersive aesthetic.
- **2.5D Depth:** Characters must have dynamic foot shadows and subtle rim-lighting (glow).

## Game Logic Rules
- **Boss Effects:** Hit-stop and Screen-shake apply ONLY to the Final Boss (Stage Clear). Mid-bosses have no death effects.
- **UI Transitions:** `returnToLobby()` must explicitly hide all in-game overlays (`levelUpUI`, `stageClearUI`, etc.) to prevent scene bleed.

## Android Build & Deployment
- **AAB Export:** Always copy to `C:\Users\kdw31\OneDrive\Desktop\`.
- **Offline Config:** `androidScheme: "http"`, `cleartext: true` in `capacitor.config.json`.
- **Signing:** Use `LASTGIRL_KEY.jks` on Desktop (Pass: pass1234, Alias: lastgirl).
