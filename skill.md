# Skill: Minimalist Explainer Animation (MinutePhysics / Thought-Provoking Style)

Generates storyboards, timing sheets, visual scripts, and production prompts matching the visual and pacing style of minimalist hand-drawn conceptual explainer videos.

---

## 1. Visual Identity & Aesthetic Rules

* **Canvas:** Pure white background (`#FFFFFF`), zero gradients, zero drop shadows.
* **Linework:** Hand-drawn ink style (charcoal/monoline with subtle organic roughness), consistent stroke weight (`3px–4px`), charcoal black (`#1A1A1A`).
* **Palette (3-Color Max):**
  * Base: Black & White
  * Functional Accent A: Muted Crimson/Red (`#D9433B`) — loss, layoffs, negative balance, friction.
  * Functional Accent B: Muted Sage/Teal (`#3C8D75`) — gains, employment, replacement, balance.
  * Neutral Fill: Pale warm sand  — subtle object fills (desks, buildings).
* **Typography:**
  * Font Style: Clean handwritten sans or casual lettering (e.g., Caveat, Patrick Hand).
  * Word Density: Maximum 1–5 words per callout. Never transcribe full narration onto screen.
  * Placement: Positioned directly above, below, or adjacent to the associated visual anchor.
  * **No grey text:** Secondary labels, eyebrows, and subtitles must stay dark charcoal (`#1A1A1A` at 80–100% opacity, or `#3D3A35`). Never use light grey or washed-out text; it reads as disabled and disappears on projectors.
  *

---

## 2. Character & Metaphor Design

* **Characters:** Simple stick or bean figures. Minimal faces (dot eyes, neutral/subtle mouth curve). Distinctions made through simple props (hat, desk, phone).
* **Conceptual Metaphors:**
  * Tasks/Jobs: Circular clusters, dotted outlines fading in/out.
  * Macroeconomics: Balance scales, 2D line graphs, dot grids/arrays (e.g., 1,000 dots).
  * Institutions: Basic geometric building line-art, doorframes representing access/vacancies.

---

## 3. Timing, Synchronization & Pacing Rules

* **Spoken-Sync Trigger:** Visual elements draw or pop on the exact syllable they are spoken.
* **Sequential Stagger:** Break complex concepts into discrete visual components introduced one-by-one (e.g., Task 1 $\rightarrow$ Task 2 $\rightarrow$ ATM arm pulls Task 1).
* **The "Breathing Room" Rule (Crucial):**
  * Never transition immediately after an asset appears.
  * Hold the completed frame for **1.5 to 3.0 seconds** or more as needed  after narration of that point concludes. we need to ensure the user is able to process everything.
  * Viewers need time to read callouts, register the relationship, and absorb the insight before movement resumes.
* **Minimum Processing Hold (hard rule):**
  * The final visual reveal in a scene must have at least **2.0 seconds** of screen time before the cut. If narration makes that impossible, move the reveal earlier when it is contextual, or extend the scene into the next natural pause.
  * Never cut on the same word that completes a diagram.
  * If the final narration line is only a hand-off ("let's run the numbers", "adapters fix that"), move that copy into the next scene instead of leaving it 0.1–0.8 s on screen.
  * Dense scenes (multi-part diagrams, math, architecture) need the **final state held 2.5–3.5 s**. Simplify the last beat rather than rushing the cut.

---

## 4. Composition & Negative Space

* **Negative Space:** Keep 60%–80% of the canvas empty at all times.
* **Groundline / Baseline:** Anchor figures and buildings to an uninterrupted bottom horizontal guideline.
* **Focal Point Isolation:** Keep 1 active focus zone per beat (left, center, or right). Do not animate multiple unrelated quadrants simultaneously.
* **Transitions:** Clean wipe, lateral pan along the groundline, or sudden clear-to-white. Avoid flashy camera zooms or rotations.
* keep font size big

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

* **Visual Description:** (1-2 sentences on visual layout and assets)
* **On-Screen Text:** "[Exact text]" | Position: [e.g., Top-Center] | Color: [e.g., Crimson]
* **Animation Sequence:**
  1. `[00:00.0 - Word]` Draw [Asset A] on baseline.
  2. `[00:02.0 - Word]` Fade/slide [Asset B] into [Asset A].
  3. `[00:03.5 - Word]` Label pops up with small bounce.
* **Post-Animation Hold:** [X.X seconds] (Static frame hold to ensure comprehension before transition)
* **Transition Out:** [Cut / Groundline Pan Left / Fade to White]
  
  
  
  

#### 1. Linework & Metaphor Engine: **Rough.js**

- **Why:** You cannot rely on static SVGs if you want the MinutePhysics organic hand-drawn feel. [Rough.js](https://www.google.com/url?sa=E&q=https%3A%2F%2Froughjs.com%2F) is a lightweight canvas/SVG library that takes geometric shapes, lines, and paths and renders them with adjustable "roughness", "bowing", and sketchy pen strokes.
    
- **LLM Friendliness:** Very high. Instead of complex spline coordinates, the LLM simply calls:
    
    codeTsx
    
    ```
    rc.line(x1, y1, x2, y2, { roughness: 1.5, stroke: '#1A1A1A', strokeWidth: 3 });
    rc.circle(x, y, diameter, { fill: '#3C8D75', fillWeight: 3, roughness: 1.2 });
    ```
    

#### 2. Animation & Timing Runtime: **Remotion (React + TypeScript)**

- **Why:**
    
    - Unlike traditional CSS/browser animations which can drop frames, Remotion renders frame-by-frame (fps = 30 or 60).
        
    - Has built-in hooks like interpolate() and spring() for pop-ins and linear writes.
        
    - Native handling of audio timing via useCurrentFrame().
        
- **Implementing the "Draw-in" Effect:** For SVG line strokes, an LLM animates strokeDashoffset from the path’s total length to 0.
    

#### 3. Typography: **Google Fonts (Caveat or Patrick Hand)**

- Embed the fonts directly via @remotion/google-fonts or local @font-face.
    
- Set styling strictly to #1A1A1A with max 1–5 words per callout.
    

#### 4. Audio-Sync Pipeline (Upstream): **OpenAI Whisper (Word-Level Timestamps)**

- Before the LLM animates, the raw voiceover is transcribed with word-level JSON timestamps (e.g., via Whisper timestamp_granularities=["word"]).
    
- The LLM receives the transcript with timestamps and converts them to frame numbers:  
    
    ```
    Target Frame=Timestamp (seconds)×FPSTarget Frame=Timestamp (seconds)×FPS
    ```


