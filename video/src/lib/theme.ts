import React from 'react';

export const W = 1920;
export const H = 1080;
export const FPS = 30;

export const COLORS = {
  ink: '#1A1A1A',
  paper: '#FFFFFF',
  red: '#D9433B',
  sage: '#3C8D75',
  sand: '#EFE4CC',
  sandDeep: '#E4D4B4',
  faint: '#3D3A35',
};

export type Tone = 'ink' | 'red' | 'sage' | 'sand' | 'faint';

export const toneColor = (tone: Tone = 'ink') => COLORS[tone];

export const fontTitle = '"Caveat", "Patrick Hand", cursive';
export const fontLabel = '"Patrick Hand", "Caveat", cursive';
export const fontMono = '"Patrick Hand", monospace';

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export const easeOut = (t: number) => 1 - Math.pow(1 - clamp01(t), 3);
export const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** Progress 0..1 for a reveal that starts at `start` seconds and lasts `dur`. */
export const progress = (
  localSeconds: number,
  start: number,
  dur = 0.55,
  ease: (t: number) => number = easeOut,
) => ease(clamp01((localSeconds - start) / Math.max(0.001, dur)));

export const mix = (a: number, b: number, t: number) => a + (b - a) * t;

export const CueContext = React.createContext<{
  sceneStart: number;
  sceneEnd: number;
}>({sceneStart: 0, sceneEnd: 0});
