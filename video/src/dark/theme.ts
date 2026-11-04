import React from 'react';

export const W = 1920;
export const H = 1080;
export const FPS = 30;

/**
 * skill-dark palette.
 * Near-black canvas, warm off-white ink, five flat accents.
 * No gradients, no glow, no drop shadows.
 */
export const C = {
  bg: '#0B0D10',
  panel: '#151A21',
  panel2: '#1C232C',
  screen: '#050607',
  ink: '#F4EFE5',
  text: '#F7F3E9',
  dim: '#D6CEC0',
  muted: '#A9A296',
  coral: '#FF5A5F',
  teal: '#2ED3B7',
  amber: '#FFB547',
  blue: '#5B8CFF',
  violet: '#B388FF',
} as const;

/** Alias so the existing rough.js primitives can be reused unchanged. */
export const COLORS = C;

export type Accent = 'coral' | 'teal' | 'amber' | 'blue' | 'violet';
export type Tone = Accent | 'ink' | 'dim' | 'muted';

export const accentColor = (accent: Accent) => C[accent];
export const toneColor = (tone: Tone = 'ink') => C[tone];

export const fontTitle = '"Caveat", "Patrick Hand", cursive';
export const fontLabel = '"Patrick Hand", "Caveat", cursive';
export const fontMono = '"Patrick Hand", monospace';

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;

export const easeOut = (t: number) => 1 - Math.pow(1 - clamp01(t), 3);
export const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
export const easeIn = (t: number) => Math.pow(clamp01(t), 3);

/** Progress 0..1 for a reveal at an absolute cue time. */
export const progress = (
  t: number,
  cue: number,
  dur = 0.6,
  ease: (v: number) => number = easeOut,
) => ease(clamp01((t - cue) / Math.max(0.001, dur)));

/** Slow push-in, used sparingly. */
export const push = (
  t: number,
  start: number,
  dur = 4,
  amount = 0.05,
) => 1 + amount * easeInOut(clamp01((t - start) / dur));

/** Slow lateral pan. */
export const pan = (
  t: number,
  start: number,
  dur: number,
  from: number,
  to: number,
) => mix(from, to, easeInOut(clamp01((t - start) / dur)));

/** Eased sine for rigged limbs and mechanical motion. */
export const oscillate = (
  t: number,
  amplitude: number,
  speed = 0.5,
  phase = 0,
) => Math.sin((t * speed + phase) * Math.PI * 2) * amplitude;

/** Camera context keeps scene code declarative but is not required. */
export const SceneContext = React.createContext<{
  sceneStart: number;
  sceneEnd: number;
}>({sceneStart: 0, sceneEnd: 0});
