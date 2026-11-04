# Apple on-device LLM — dark-mode Remotion preview

Repo: https://github.com/lroe/How-Apple-Fits-a-Large-Language-Model-on-Your-iPhone.

A 57-scene, 12:12 explainer built from `audio.wav` and word-level Whisper timing, remade from scratch with the dark-mode / flat-color direction in `../skill-dark.md`.

## Preview

```bash
cd /home/jeevankumar/Videos/apple/video
npm install
npm run studio
```

Open **http://localhost:3000** and select **`AppleExplainerDark`**. The original light cut is still available as `AppleExplainer` for comparison.

- Canvas: 1920×1080
- FPS: 30
- Duration: 21,965 frames / 732.16 s
- Audio: `public/audio.wav`
- Transitions: 4-frame fade through black, next visual pre-rolled

**No final video has been rendered.** Still frames only were rendered for preview and QA.

## Preview stills

```bash
node render-dark-qa.mjs
```

This renders one final-state still per scene into `out/dark-qa/`. The 57-frame overview is `out/dark-preview-sheet.png`.

## Design rules

- Near-black canvas (`#0B0D10`), warm off-white ink (`#F4EFE5`), never mid-grey text.
- Five flat accents: coral, teal, amber, blue, violet. Max three accents per scene.
- No gradients, glows, bloom, or drop shadows.
- Big type: hero 120–220 px, primary labels 80–120 px, secondary 40–56 px.
- Content scenes have no top-left/top-right headings. The narration and the diagram labels carry the scene.
- One central illustration per scene; labels sit on the objects they describe.
- Camera moves are selective: slow push-ins, pull-backs, and pans only where the beat needs emphasis.
- 2D vector rigging is used for articulated motion (the chef/helper arm, the librarian’s reach); gears use hierarchical rotation.

## Files

```
src/dark/theme.ts          dark palette, easing, camera helpers
src/dark/ui.tsx            Stage, camera, text, panels, phone, chip, wall, rig
src/dark/rough.tsx         Rough.js primitives for the dark theme
src/dark/scenes/           new scene components grouped by chapter
src/dark/timeline.ts       57 scene ranges for the dark cut
src/dark/DarkVideo.tsx     audio, font loading, fade-through-black playback
render-dark-qa.mjs         preview still renderer
out/dark-qa/               final-state still for every scene
out/dark-preview-sheet.png 57-frame overview contact sheet
```

The production timing sheet is at `../storyboard.md`.

## 1080p render (Colab)

Open `colab_render.ipynb` in Colab. The repo is public, so it clones directly with **no token** and runs `render.mjs`, which now targets **`AppleExplainerDark`**.

- Output: **1920×1080**, 30 fps, H.264 CRF 18, AAC 320 kbps
- Every completed frame prints as `[frame 00000/21965] ... %`
- A 12-frame 1080p test runs first
- Rendering is CPU-heavy; expect **1–3 hours** on a free Colab CPU runtime and less on High-RAM / more vCPUs
- Need 4K later? Run `node render.mjs --4k` (larger file, slower render)

Command used under the hood:

```bash
CONCURRENCY=4 node render.mjs
```

## Optional final render

Only if you explicitly want the MP4:

```bash
npx remotion render src/index.ts AppleExplainerDark out/apple-explainer-dark.mp4 \
  --browser-executable=/usr/bin/google-chrome
```
