# Skill: Dark-Mode Colorful Explainer Animation (MinutePhysics / Thought-Provoking Style)

Generates storyboards, timing sheets, visual scripts, and production prompts matching the visual and pacing style of minimalist hand-drawn conceptual explainer videos — rendered on a dark canvas with a confident, colorful illustration palette.

---

## 1. Visual Identity & Aesthetic Rules

* **Canvas:** Near-black background (`#0B0D10`), zero gradients, zero glows, zero drop shadows.
* **Linework:** Hand-drawn ink style (monoline with subtle organic roughness), consistent stroke weight (`3px–4px`), warm off-white (`#F4EFE5`). Do not use pure white for large areas; it glares on dark screens.
* **Palette (5 accents + 3 neutrals):**
  * Base neutrals: Near-black (`#0B0D10`), warm off-white (`#F4EFE5`), slate panel (`#1A1F26`).
  * Accent A: Coral/Red (`#FF5A5F`) — loss, friction, errors, cost, danger.
  * Accent B: Teal (`#2ED3B7`) — gains, efficiency, fit, success.
  * Accent C: Amber (`#FFB547`) — memory, hardware, heat, caution.
  * Accent D: Blue (`#5B8CFF`) — data, cloud, process, communication.
  * Accent E: Violet (`#B388FF`) — model, weights, abstraction, intelligence.
  * **Per-scene limit:** no more than **3 accent hues** plus neutrals in one scene. The palette can evolve across scenes, but never turn a single frame into a rainbow.
* **Color is functional, not decoration:** Every recurring entity keeps the same hue for the whole video (e.g., model = violet, memory = amber, cloud = blue, success = teal, failure = coral). Do not recolor the same object between beats.
* **Flat color only:** Colored shapes are solid fills — no gradients, no glow, no bloom, no transparency haze. Opacity is only for de-emphasis, never to fake light.
* **Dark mode is not inverted white mode:** Keep the minimalist composition logic, but replace white paper with near-black, charcoal ink with warm off-white, and use saturated flat color to carry the diagram.
* **Typography:**
  * Font Style: Clean handwritten sans or casual lettering (e.g., Caveat, Patrick Hand).
  * Word Density: Maximum 1–5 words per callout. Never transcribe full narration onto screen.
  * Placement: Positioned directly above, below, or adjacent to the associated visual anchor.
  * **Type scale (hard rule, 1920×1080):**
    * Hero words / key numbers: **120–220 px**.
    * Primary diagram labels: **80–120 px**. Hard floor: **64 px**.
    * Secondary/context lines: **40–56 px**. Hard floor: **36 px**.
    * Never shrink a label below the floor to make it fit. Cut words, split the line, or simplify the diagram instead.
    * Test every scene at **50% scale** (960×540). If a label is not instantly readable at that size, it is too small.
* **No grey text on dark:** Primary text is warm off-white (`#F7F3E9`). Secondary labels use warm parchment (`#D6CEC0`) at 80–100% opacity. Never use mid-grey (`#666`, `#777`, `#888`); it disappears into the background and reads as disabled.
* **No top-left scene headings:** Do not repeat the narration as a title + subtitle at the top of content scenes. The narration carries the sentence; the diagram carries short functional labels only. This avoids the “read top-left, then look center” eye ping-pong.
* **Chapter cards are the only exception:** a chapter number + a single motif may be used as a full-screen transition. Keep them sparse and never add a paragraph.

---

## 2. Character & Metaphor Design

* **Characters:** Simple stick or bean figures. Warm off-white outlines with one flat accent fill for clothing or role. Minimal faces (dot eyes, neutral/subtle mouth curve). Distinctions made through simple props (hat, desk, phone).
* **Conceptual Metaphors:**
  * Tasks/Jobs: Circular clusters, dotted outlines fading in/out.
  * Macroeconomics: Balance scales, 2D line graphs, dot grids/arrays (e.g., 1,000 dots).
  * Institutions: Basic geometric building line-art, doorframes representing access/vacancies.
* **Color-coded entities:** Give each major concept a fixed hue and keep it stable across the scene. Color should help the viewer track “who is who,” not just make the frame busier.
* **Color blocking:** Fill roughly **20–40%** of each major object with flat accent color; leave the rest as off-white linework and slate. This keeps the dark canvas dominant while making the illustration feel colorful.
* **One hero color per beat:** The active object or force gets the strongest accent. Supporting objects stay slate/off-white or use a quieter second hue.

---

## 3. Timing, Synchronization & Pacing Rules

* **Spoken-Sync Trigger:** Visual elements draw or pop on the exact syllable they are spoken.
* **Sequential Stagger:** Break complex concepts into discrete visual components introduced one-by-one (e.g., Task 1 $\rightarrow$ Task 2 $\rightarrow$ ATM arm pulls Task 1).
* **The "Breathing Room" Rule (Crucial):**
  * Never transition immediately after an asset appears.
  * Hold the completed frame for **1.5 to 3.0 seconds** or more as needed after narration of that point concludes. We need to ensure the user is able to process everything.
  * Viewers need time to read callouts, register the relationship, and absorb the insight before movement resumes.
* **Minimum Processing Hold (hard rule):**
  * The final visual reveal in a scene must have at least **2.0 seconds** of screen time before the cut. If narration makes that impossible, move the reveal earlier when it is contextual, or extend the scene into the next natural pause.
  * Never cut on the same word that completes a diagram.
  * If the final narration line is only a hand-off ("let's run the numbers", "adapters fix that"), move that copy into the next scene instead of leaving it 0.1–0.8 s on screen.
  * Dense scenes (multi-part diagrams, math, architecture) need the **final state held 2.5–3.5 s**. Simplify the last beat rather than rushing the cut.
* **Transitions = short fade through black (hard rule):**
  * Use a **4–6 frame** fade through black at 30 fps (0.13–0.2 s). Do not use a left-to-right wipe; it makes the cut feel mechanical.
  * Pre-roll the next scene's first visual so the dark gap is only a blink, never a blank scene. Never expose an empty canvas for more than ~0.2 s.
  * If a scene truly needs a chapter card, keep a motif on screen so the card is never an empty text slide.
  * Verify with a still at **scene start + 0.4 s**. If it is more than ~80% empty, move the first visual earlier.

---

## 4. Composition & Negative Space

* **Negative Space:** Keep 60%–80% of the canvas empty **as breathing room around one large focal composition — never by shrinking the subject into a corner.** In dark mode, empty space is the near-black canvas; it should feel intentional, not dead.
* **Groundline / Baseline:** Anchor figures and buildings to an uninterrupted bottom horizontal guideline in off-white or slate.
* **Focal Point Isolation:** Keep 1 active focus zone per beat (left, center, or right). Do not animate multiple unrelated quadrants simultaneously.
* **Transitions:** Short fade through black (4–6 frames), lateral pan along the groundline, or sudden clear-to-black. No left-to-right wipes, flashy zooms, or rotations.
* **Text is a primary visual, not a caption:** Labels should feel like part of the diagram, not fine print underneath it. Size them to be read at phone size, not just on a desktop monitor.
* **Use the space you have:** When a scene has only one or two elements, scale the drawing and its labels up. A small object floating in a large empty canvas is not minimalism; it is wasted space. Let the active composition occupy roughly 60–75% of the canvas width.
* **Scale labels to their anchor:** A short label under a shape should be roughly **20–25% of that shape's height** (subject to the hard floor above) and should fill **60–80% of its available width band**. Do not leave a tiny word under a big object.
* **Small text is a bug, not restraint:** If a label reads like a footnote, it is too small. Increase it before adding more decoration or more whitespace.
* **2-second readability test:** At the end of a scene, every label should be readable in about 2 seconds. If the viewer has to lean in, the type is too small.
* **Grayscale test:** Squint or convert the frame to grayscale. If two colored objects become the same value, their contrast is too weak — adjust the hues or add an off-white outline.
* **No neon shortcut:** Dark mode does not need glow to feel alive. Crisp off-white linework, flat saturated fills, and confident scale do the work.
* **Calibration example:** In the two-wall scene, `space` / `speed` at 54 px read as footnotes; they should be **88–96 px**. The line `memory size, and how fast data moves` at 31 px should be **40–44 px**.

---

## 5. Storyboard Generation Workflow

When given a narration script or conceptual topic:

1. **Task-Level Breakdown:** Segment narration into 3–7 second visual beats.
2. **Visual Metaphor Mapping:** Assign concrete, minimal metaphors to abstract economic/technical claims.
3. **Screen Text Selection:** Select $\le 3$ anchor words per beat for on-screen emphasis.
4. **Timing & Hold Allocation:** Mark exact sync points (`[SYNC]`) and pause/hold durations (`[HOLD: Xs]`).

---

## 6. Output Template

For each video scene, format output as follows:

```markdown
### Scene [Number]: [Scene Title]
**Audio Timestamp:** [MM:SS - MM:SS]
**Narration:** "[Exact transcript segment]"

* **Visual Description:** (1-2 sentences on visual layout, assets, and color roles)
* **On-Screen Text:** "[Exact text]" | Position: [e.g., Top-Center] | Color: [e.g., Coral]
* **Animation Sequence:**
  1. `[00:00.0 - Word]` Draw [Asset A] on baseline.
  2. `[00:02.0 - Word]` Fade/slide [Asset B] into [Asset A].
  3. `[00:03.5 - Word]` Label pops up with small bounce.
* **Post-Animation Hold:** [X.X seconds] (Static frame hold to ensure comprehension before transition)
* **Transition Out:** [Cut / Groundline Pan Left / Fade to Black]
```

#### 1. Linework & Metaphor Engine: **Rough.js**

- **Why:** You cannot rely on static SVGs if you want the MinutePhysics organic hand-drawn feel. [Rough.js](https://www.google.com/url?sa=E&q=https%3A%2F%2Froughjs.com%2F) is a lightweight canvas/SVG library that takes geometric shapes, lines, and paths and renders them with adjustable "roughness", "bowing", and sketchy pen strokes.

- **LLM Friendliness:** Very high. Instead of complex spline coordinates, the LLM simply calls:

    codeTsx

    ```
    rc.line(x1, y1, x2, y2, { roughness: 1.5, stroke: '#F4EFE5', strokeWidth: 3 });
    rc.circle(x, y, diameter, { fill: '#2ED3B7', fillWeight: 3, roughness: 1.2 });
    ```

#### 2. Animation & Timing Runtime: **Remotion (React + TypeScript)**

- **Why:**

    - Unlike traditional CSS/browser animations which can drop frames, Remotion renders frame-by-frame (fps = 30 or 60).

    - Has built-in hooks like interpolate() and spring() for pop-ins and linear writes.

    - Native handling of audio timing via useCurrentFrame().

- **Implementing the "Draw-in" Effect:** For SVG line strokes, an LLM animates strokeDashoffset from the path’s total length to 0.

#### 3. Typography: **Google Fonts (Caveat or Patrick Hand)**

- Embed the fonts directly via @remotion/google-fonts or local @font-face.

- Set styling to warm off-white (#F7F3E9) for primary text and warm parchment (#D6CEC0) for secondary text, with max 1–5 words per callout.

#### 4. Audio-Sync Pipeline (Upstream): **OpenAI Whisper (Word-Level Timestamps)**

- Before the LLM animates, the raw voiceover is transcribed with word-level JSON timestamps (e.g., via Whisper timestamp_granularities=["word"]).

- The LLM receives the transcript with timestamps and converts them to frame numbers:

    ```
    Target Frame=Timestamp (seconds)×FPSTarget Frame=Timestamp (seconds)×FPS
    ```
