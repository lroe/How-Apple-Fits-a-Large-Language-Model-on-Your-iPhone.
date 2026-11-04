# Apple on-device LLM — Remotion preview

Minimalist hand-drawn explainer built from `audio.wav` (12:12.16) and `audio.srt`, with word-level Whisper timing.

## Preview

```bash
cd /home/jeevankumar/Videos/apple/video
npm install
npm run studio
```

Studio is currently served at **http://localhost:3000** (composition `AppleExplainer`).

- Canvas: 1920×1080
- FPS: 30
- Duration: 21,965 frames / 732.16 s
- Audio: `public/audio.wav`

**No final video has been rendered.** Still frames only were rendered for layout QA.

## Design rules

- Pure white paper, charcoal ink (`#1A1A1A`), muted crimson (`#D9433B`), muted sage (`#3C8D75`), pale sand (`#EFE4CC`).
- Caveat for display type; Patrick Hand for labels.
- Secondary text is **dark charcoal `#3D3A35`**, never grey.
- Word-level sync: every reveal uses an absolute cue from `src/data/words.json`; frame = seconds × 30.
- Arrows are drawn with the arrowhead tip exactly at the target edge. Source/target anchors are explicit in scene code.
- Layout zones are fixed; QA frames were rendered at the end of each scene to check collisions.

## Files

```
src/data/timeline.ts     57 scene definitions / exact time ranges
src/data/words.json      2266 word timestamps
src/scenes/              scene components grouped by chapter
src/components/          Stage, ChapterCard, sketch primitives
src/lib/rough.tsx        Rough.js path generation + arrow geometry
out/qa/                  still-frame QA renders for every scene
out/preview-sheet.png    57-frame overview contact sheet
```

The production timing sheet is at `../storyboard.md`.

## Optional final render

Only if you explicitly want the MP4:

```bash
npx remotion render src/index.ts AppleExplainer out/apple-explainer.mp4 \
  --browser-executable=/usr/bin/google-chrome
```
