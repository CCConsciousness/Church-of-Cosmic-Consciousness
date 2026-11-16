# CCC Digital Mystery School — Prototype 1.0

A free, static, installable Progressive Web App. No paid dependencies or account required.

## Test locally
Run `python3 -m http.server 8000` inside this folder and visit `http://localhost:8000`. Service workers work on localhost or HTTPS, not arbitrary `file://` paths.

## Publish for free on GitHub Pages
1. Create a public GitHub repository.
2. Upload all files from this folder to its root.
3. Open repository Settings → Pages → Deploy from a branch → main → /(root) → Save.
4. Open the Pages HTTPS address on Android Chrome and select Install app or Add to Home screen.

## Current limitations
Book catalog entries are descriptive placeholders: no PDFs are included or linked. Stage progress is an introductory checklist, not a complete course. Notes and progress are stored on the device; export notes before clearing browser data. Offline caching includes app shell only, not books. This is a prototype and not an official organizational seal or final brand asset.

## Next steps
Connect approved CCC publications, create full lesson navigation, implement progress backup, add accessibility and mobile device tests, and consider an organization-approved icon.


## Prototype 1.1 — Cosmic Decoder
The Decoder includes four curated examples (Lotus, Garden of Eden, Indra’s Net, Tao). For other passages it provides clearly labeled inquiry prompts, NOT automated translations. The offline version has no AI service and cannot interpret arbitrary scripture accurately. To update an existing GitHub Pages deployment, upload/replace the files in this archive and wait for deployment; reopen or refresh the installed app online to receive the new service-worker version.
