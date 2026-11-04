import fs from 'node:fs';
import path from 'node:path';
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';

const onlyArg = process.argv.find((a) => a.startsWith('--only='));
const only = onlyArg ? new Set(onlyArg.slice('--only='.length).split(',')) : null;

const timeline = fs.readFileSync('src/dark/timeline.ts', 'utf8');
const scenes = [...timeline.matchAll(/\{id: '([^']+)', start: ([\d.]+), end: ([\d.]+)/g)].map(
  (m) => ({id: m[1], start: Number(m[2]), end: Number(m[3])}),
);
if (!scenes.length) throw new Error('No scenes parsed from timeline.ts');

const list = only ? scenes.filter((s) => only.has(s.id)) : scenes;
if (!list.length) throw new Error('No matching scenes');

const outDir = path.resolve('out/dark-qa');
fs.mkdirSync(outDir, {recursive: true});

const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const composition = await selectComposition({
  serveUrl,
  id: 'AppleExplainerDark',
});

const fps = composition.fps;
console.log(`Rendering ${list.length} dark QA stills at ${composition.width}×${composition.height}`);

let i = 0;
for (const scene of list) {
  i++;
  const frame = Math.max(0, Math.round((scene.end - 0.45) * fps));
  const output = path.join(outDir, `${scene.id}.png`);
  await renderStill({
    composition,
    serveUrl,
    output,
    frame,
    imageFormat: 'png',
    browserExecutable: '/usr/bin/google-chrome',
  });
  console.log(`[${String(i).padStart(2, '0')}/${list.length}] ${scene.id} @ frame ${frame}`);
}
console.log('DONE');
