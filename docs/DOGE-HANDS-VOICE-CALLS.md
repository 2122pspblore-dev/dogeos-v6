# Doge Hands + AI Voice Calls — implementation plan

## Doge Hands (local computer control)

- Keep the Windows companion agent local-only and bound to loopback; the website must never silently gain remote desktop access.
- Require a clear, per-session consent screen on the Windows device before arming. Show an always-visible **Hands active** indicator and a one-click **Stop / disarm** control.
- Require confirmation for consequential actions (deleting files, sending messages, purchases, installing software, changing security settings); provide a preview of the action first.
- Scope permissions (view screen, mouse/keyboard, file access) independently; default to off and revoke on disconnect/restart.
- Add an action log and emergency stop. Never accept control commands from arbitrary websites/origins.

## AI live voice calls (not person-to-person calling)

- The call button connects only to Doge AI; no phone number, contacts, PSTN, or person-to-person calling feature.
- Use a real-time speech session when a supported provider/key is configured; otherwise show a clear unavailable/configuration state (do not fake a live call).
- UI: Start call, mute mic, end call, connection/listening/speaking state, and permission errors.
- Ask for microphone permission only after the user presses **Start AI call**. End call immediately stops microphone capture and closes the session.
- Let users choose a **masculine** or **feminine** provider voice (provider voice IDs, not merely pitch-shifting). Persist preference locally and explain that available voices depend on provider.
- Never auto-answer, auto-start microphone, or call people.

## Acceptance checks

- No mic permission prompt before the user clicks Start.
- End call releases microphone and stops audio playback.
- Hands remains disarmed until local confirmation; disarm releases held keys/buttons.
- Every external action is visibly consented to and logged.
- Voice selection changes the actual provider voice; unavailable voice/provider is reported honestly.
