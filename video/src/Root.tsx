import React from 'react';
import {Composition} from 'remotion';
import {Video} from './Video';
import {DarkVideo} from './dark/DarkVideo';
import {FPS, H, W} from './lib/theme';
import {DURATION_SECONDS} from './data/timeline';
import {DARK_DURATION_SECONDS} from './dark/timeline';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="AppleExplainerDark"
      component={DarkVideo}
      durationInFrames={Math.ceil(DARK_DURATION_SECONDS * FPS)}
      fps={FPS}
      width={W}
      height={H}
    />
    <Composition
      id="AppleExplainer"
      component={Video}
      durationInFrames={Math.ceil(DURATION_SECONDS * FPS)}
      fps={FPS}
      width={W}
      height={H}
    />
  </>
);
