import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {
  C,
  H,
  W,
  clamp01,
  fontLabel,
  fontTitle,
  mix,
  toneColor,
  type Accent,
  type Tone,
} from './theme';
import {
  Arrow as RoughArrow,
  Circle,
  DotGrid,
  Ellipse,
  Line,
  Path,
  Rect,
} from './rough';

export type SceneProps = {
  start: number;
  end: number;
};

export const useSceneTime = (_start: number) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return frame / fps;
};

/** Scene-local reveal helper: p(offsetSeconds, durationSeconds). */
export const useP = (start: number) => {
  const t = useSceneTime(start);
  return {
    t,
    p: (offset: number, dur = 0.6) => clamp01((t - (start + offset)) / dur),
  };
};

export const Stage: React.FC<{
  children: React.ReactNode;
  camera?: {zoom?: number; x?: number; y?: number; rotate?: number};
  full?: boolean;
}> = ({children, camera, full = false}) => {
  const fit = full ? 1 : 1.14;
  const fitY = full ? 0 : -20;
  const zoom = (camera?.zoom ?? 1) * fit;
  const x = camera?.x ?? 0;
  const y = (camera?.y ?? 0) + fitY;
  const rotate = camera?.rotate ?? 0;
  return (
    <AbsoluteFill style={{background: C.bg, overflow: 'hidden'}}>
      <AbsoluteFill
        style={{
          transform: `translate(${x}px, ${y}px) scale(${zoom}) rotate(${rotate}deg)`,
          transformOrigin: '960px 540px',
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const SvgLayer: React.FC<{children: React.ReactNode}> = ({children}) => (
  <svg
    viewBox={`0 0 ${W} ${H}`}
    style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: W,
      height: H,
      overflow: 'visible',
    }}
  >
    {children}
  </svg>
);

export const Text: React.FC<{
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  font?: 'title' | 'label';
  tone?: Tone;
  color?: string;
  align?: 'left' | 'center' | 'right';
  width?: number;
  rotate?: number;
  draw?: number;
  mode?: 'wipe' | 'pop';
  weight?: number;
  letterSpacing?: number;
  lineHeight?: number;
  opacity?: number;
  style?: React.CSSProperties;
}> = ({
  x,
  y,
  children,
  size = 42,
  font = 'label',
  tone = 'ink',
  color,
  align = 'left',
  width,
  rotate = 0,
  draw = 1,
  mode = 'wipe',
  weight,
  letterSpacing = 0.2,
  lineHeight = 1.04,
  opacity = 1,
  style,
}) => {
  const p = clamp01(draw);
  const scale = mode === 'pop' ? 0.9 + 0.1 * p : 1;
  const left =
    align === 'center' && width
      ? x - width / 2
      : align === 'right' && width
        ? x - width
        : x;
  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        width,
        fontFamily: font === 'title' ? fontTitle : fontLabel,
        fontSize: size,
        fontWeight: weight,
        color: color ?? toneColor(tone),
        textAlign: align,
        letterSpacing,
        lineHeight,
        transform: `translateY(${(1 - p) * (mode === 'pop' ? 12 : 6)}px) rotate(${rotate}deg) scale(${scale})`,
        transformOrigin: align === 'center' ? 'center top' : 'left top',
        opacity: opacity * clamp01(p * 2.6),
        clipPath:
          mode === 'wipe'
            ? `inset(-18% ${Math.max(0, 100 - p * 100)}% -18% -18%)`
            : undefined,
        whiteSpace: 'pre-line',
        ...style,
        left,
      }}
    >
      {children}
    </div>
  );
};

const isAccent = (fill?: string): boolean =>
  fill === C.coral ||
  fill === C.teal ||
  fill === C.amber ||
  fill === C.blue ||
  fill === C.violet;

export const Panel: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  fill?: string;
  stroke?: string;
  draw?: number;
  seed?: number;
  label?: string;
  sub?: string;
  labelSize?: number;
  subSize?: number;
  align?: 'left' | 'center';
  children?: React.ReactNode;
  radius?: number;
}> = ({
  x,
  y,
  w,
  h,
  fill = C.panel,
  stroke = C.ink,
  draw = 1,
  seed = 10,
  label,
  sub,
  labelSize = 42,
  subSize = 28,
  align = 'left',
  children,
}) => {
  const textColor = isAccent(fill) ? C.bg : C.text;
  const center = align === 'center' ? x + w / 2 : x + 24;
  return (
    <>
      <Rect
        x={x}
        y={y}
        w={w}
        h={h}
        fill={fill}
        stroke={stroke}
        strokeWidth={3}
        draw={draw}
        seed={seed}
        roughness={1.4}
      />
      {label && (
        <Text
          x={center}
          y={y + 30}
          size={labelSize}
          align={align}
          width={align === 'center' ? w : undefined}
          draw={draw}
          color={textColor}
          style={align === 'center' ? {left: x} : undefined}
        >
          {label}
        </Text>
      )}
      {sub && (
        <Text
          x={center}
          y={y + h - subSize - 22}
          size={subSize}
          align={align}
          width={align === 'center' ? w : undefined}
          draw={draw}
          color={isAccent(fill) ? C.bg : C.dim}
          style={align === 'center' ? {left: x} : undefined}
        >
          {sub}
        </Text>
      )}
      {children}
    </>
  );
};

export const Phone: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  draw?: number;
  screenFill?: string;
  stroke?: string;
  seed?: number;
  children?: React.ReactNode;
  notch?: boolean;
}> = ({
  x,
  y,
  w = 360,
  h = 720,
  draw = 1,
  screenFill = C.screen,
  stroke = C.ink,
  seed = 20,
  children,
  notch = true,
}) => {
  const r = w * 0.13;
  const body = `M ${x + r} ${y} H ${x + w - r} Q ${x + w} ${y} ${x + w} ${y + r} V ${
    y + h - r
  } Q ${x + w} ${y + h} ${x + w - r} ${y + h} H ${x + r} Q ${x} ${y + h} ${x} ${
    y + h - r
  } V ${y + r} Q ${x} ${y} ${x + r} ${y} Z`;
  const sx = x + w * 0.045;
  const sy = y + h * 0.075;
  const sw = w * 0.91;
  const sh = h * 0.85;
  const screen = `M ${sx + r * 0.45} ${sy} H ${sx + sw - r * 0.45} Q ${
    sx + sw
  } ${sy} ${sx + sw} ${sy + r * 0.45} V ${sy + sh - r * 0.45} Q ${
    sx + sw
  } ${sy + sh} ${sx + sw - r * 0.45} ${sy + sh} H ${sx + r * 0.45} Q ${sx} ${
    sy + sh
  } ${sx} ${sy + sh - r * 0.45} V ${sy + r * 0.45} Q ${sx} ${sy} ${
    sx + r * 0.45
  } ${sy} Z`;
  return (
    <>
      <Path
        d={body}
        fill={C.panel}
        stroke={stroke}
        strokeWidth={5}
        draw={draw}
        seed={seed}
        roughness={1.1}
      />
      <Path
        d={screen}
        fill={screenFill}
        stroke={stroke}
        strokeWidth={2.4}
        draw={Math.max(0, (draw - 0.2) / 0.8)}
        seed={seed + 1}
        roughness={0.9}
      />
      {notch && (
        <Line
          x1={x + w * 0.38}
          y1={y + h * 0.045}
          x2={x + w * 0.62}
          y2={y + h * 0.045}
          stroke={stroke}
          strokeWidth={5}
          draw={draw}
          seed={seed + 2}
        />
      )}
      <Line
        x1={x + w * 0.36}
        y1={y + h - h * 0.032}
        x2={x + w * 0.64}
        y2={y + h - h * 0.032}
        stroke={stroke}
        strokeWidth={4}
        draw={Math.max(0, (draw - 0.3) / 0.7)}
        seed={seed + 3}
      />
      {children}
    </>
  );
};

export const Chip: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  fill?: string;
  label?: string;
  sub?: string;
  draw?: number;
  seed?: number;
  pins?: boolean;
  labelSize?: number;
}> = ({
  x,
  y,
  w = 240,
  h = 180,
  fill = C.violet,
  label,
  sub,
  draw = 1,
  seed = 30,
  pins = true,
  labelSize = 48,
}) => {
  const pin = 18;
  const points = [0.2, 0.4, 0.6, 0.8];
  return (
    <>
      <Rect
        x={x}
        y={y}
        w={w}
        h={h}
        fill={fill}
        stroke={C.ink}
        strokeWidth={4}
        draw={draw}
        seed={seed}
        roughness={1.2}
      />
      {pins && (
        <>
          {points.map((px, i) => (
            <React.Fragment key={`t${i}`}>
              <Line
                x1={x + w * px}
                y1={y - pin}
                x2={x + w * px}
                y2={y}
                stroke={C.ink}
                strokeWidth={3}
                draw={draw}
                seed={seed + 1 + i}
              />
              <Line
                x1={x + w * px}
                y1={y + h}
                x2={x + w * px}
                y2={y + h + pin}
                stroke={C.ink}
                strokeWidth={3}
                draw={draw}
                seed={seed + 6 + i}
              />
            </React.Fragment>
          ))}
          {points.map((py, i) => (
            <React.Fragment key={`s${i}`}>
              <Line
                x1={x - pin}
                y1={y + h * py}
                x2={x}
                y2={y + h * py}
                stroke={C.ink}
                strokeWidth={3}
                draw={draw}
                seed={seed + 11 + i}
              />
              <Line
                x1={x + w}
                y1={y + h * py}
                x2={x + w + pin}
                y2={y + h * py}
                stroke={C.ink}
                strokeWidth={3}
                draw={draw}
                seed={seed + 16 + i}
              />
            </React.Fragment>
          ))}
        </>
      )}
      {label && (
        <Text
          x={x + w / 2}
          y={y + h * 0.35}
          size={labelSize}
          align="center"
          width={w}
          draw={draw}
          color={C.bg}
          style={{left: x}}
        >
          {label}
        </Text>
      )}
      {sub && (
        <Text
          x={x + w / 2}
          y={y + h * 0.62}
          size={24}
          align="center"
          width={w}
          draw={draw}
          color={C.bg}
          style={{left: x}}
        >
          {sub}
        </Text>
      )}
    </>
  );
};

export const Token: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  fill: string;
  draw?: number;
  seed?: number;
  size?: number;
  rotate?: number;
}> = ({x, y, w, h, label, fill, draw = 1, seed = 40, size = 64, rotate = 0}) => (
  <g transform={`rotate(${rotate} ${x + w / 2} ${y + h / 2})`}>
    <Rect
      x={x}
      y={y}
      w={w}
      h={h}
      fill={fill}
      stroke={C.ink}
      strokeWidth={4}
      draw={draw}
      seed={seed}
      roughness={1.5}
    />
    <Text
      x={x + w / 2}
      y={y + h * 0.26}
      size={size}
      align="center"
      width={w}
      draw={draw}
      color={C.bg}
      style={{left: x}}
    >
      {label}
    </Text>
  </g>
);

export const Wall: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  draw?: number;
  seed?: number;
}> = ({x, y, w, h, fill, draw = 1, seed = 50}) => {
  const rows = 5;
  const rowH = h / rows;
  const patterns = [
    [1 / 3, 2 / 3],
    [1 / 6, 3 / 6, 5 / 6],
    [1 / 3, 2 / 3],
    [1 / 6, 3 / 6, 5 / 6],
    [1 / 3, 2 / 3],
  ];
  return (
    <>
      <Rect
        x={x}
        y={y}
        w={w}
        h={h}
        fill={fill}
        stroke={C.ink}
        strokeWidth={4}
        draw={draw}
        seed={seed}
        roughness={1.5}
      />
      {Array.from({length: rows - 1}).map((_, i) => (
        <Line
          key={`h${i}`}
          x1={x + 2}
          y1={y + rowH * (i + 1)}
          x2={x + w - 2}
          y2={y + rowH * (i + 1)}
          stroke={C.ink}
          strokeWidth={3}
          draw={draw}
          seed={seed + 1 + i}
        />
      ))}
      {patterns.map((joints, row) =>
        joints.map((j, i) => (
          <Line
            key={`v${row}-${i}`}
            x1={x + w * j}
            y1={y + rowH * row + 2}
            x2={x + w * j}
            y2={y + rowH * (row + 1) - 2}
            stroke={C.ink}
            strokeWidth={3}
            draw={draw}
            seed={seed + 10 + row * 4 + i}
          />
        )),
      )}
    </>
  );
};

export const Bar: React.FC<{
  x: number;
  y: number;
  w: number;
  h?: number;
  value: number;
  fill?: string;
  draw?: number;
  label?: string;
  labelColor?: string;
  seed?: number;
  track?: string;
}> = ({
  x,
  y,
  w,
  h = 70,
  value,
  fill = C.teal,
  draw = 1,
  label,
  labelColor = C.bg,
  seed = 60,
  track = C.panel2,
}) => (
  <>
    <Rect
      x={x}
      y={y}
      w={w}
      h={h}
      fill={track}
      stroke={C.ink}
      strokeWidth={3}
      draw={draw}
      seed={seed}
      roughness={1.2}
    />
    <Rect
      x={x + 2}
      y={y + 2}
      w={Math.max(0, (w - 4) * clamp01(value) * draw)}
      h={h - 4}
      fill={fill}
      stroke="none"
      draw={draw}
      seed={seed + 1}
      roughness={1.0}
    />
    {label && (
      <Text
        x={x + 16}
        y={y + h * 0.24}
        size={28}
        draw={draw}
        color={labelColor}
      >
        {label}
      </Text>
    )}
  </>
);

export const Grid: React.FC<{
  x: number;
  y: number;
  cols: number;
  rows: number;
  cell: number;
  gap?: number;
  fill: (row: number, col: number) => string;
  stroke?: string;
  draw?: number;
  seed?: number;
  dim?: number;
}> = ({
  x,
  y,
  cols,
  rows,
  cell,
  gap = 6,
  fill,
  stroke = C.ink,
  draw = 1,
  dim = 0.22,
}) => {
  const total = rows * cols;
  return (
    <SvgLayer>
      {Array.from({length: rows}).map((_, r) =>
        Array.from({length: cols}).map((__, c) => {
          const i = r * cols + c;
          const d = clamp01((draw - (i / total) * 0.35) / 0.65);
          return (
            <rect
              key={`${r}-${c}`}
              x={x + c * (cell + gap)}
              y={y + r * (cell + gap)}
              width={cell}
              height={cell}
              fill={fill(r, c)}
              stroke={stroke}
              strokeOpacity={dim}
              strokeWidth={1.4}
              opacity={d}
            />
          );
        }),
      )}
      <rect
        x={x - 8}
        y={y - 8}
        width={cols * (cell + gap) - gap + 16}
        height={rows * (cell + gap) - gap + 16}
        fill="none"
        stroke={stroke}
        strokeWidth={3}
        opacity={draw}
      />
    </SvgLayer>
  );
};

export const Cloud: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  fill?: string;
  stroke?: string;
  draw?: number;
  seed?: number;
  children?: React.ReactNode;
}> = ({
  x,
  y,
  w = 360,
  h = 200,
  fill = C.panel,
  stroke = C.ink,
  draw = 1,
  seed = 80,
  children,
}) => {
  const d = `M ${x + w * 0.18} ${y + h * 0.78}
    C ${x - w * 0.03} ${y + h * 0.78} ${x - w * 0.01} ${y + h * 0.48} ${x + w * 0.18} ${y + h * 0.46}
    C ${x + w * 0.14} ${y + h * 0.16} ${x + w * 0.43} ${y + h * 0.03} ${x + w * 0.56} ${y + h * 0.23}
    C ${x + w * 0.7} ${y + h * 0.04} ${x + w * 0.96} ${y + h * 0.14} ${x + w * 0.92} ${y + h * 0.43}
    C ${x + w * 1.07} ${y + h * 0.47} ${x + w * 1.05} ${y + h * 0.8} ${x + w * 0.9} ${y + h * 0.82}
    Z`;
  return (
    <>
      <Path
        d={d}
        fill={fill}
        stroke={stroke}
        strokeWidth={3.5}
        draw={draw}
        seed={seed}
      />
      {children}
    </>
  );
};

export const Gear: React.FC<{
  x: number;
  y: number;
  r?: number;
  fill?: string;
  stroke?: string;
  draw?: number;
  rotate?: number;
  teeth?: number;
  seed?: number;
}> = ({
  x,
  y,
  r = 110,
  fill = C.panel2,
  stroke = C.ink,
  draw = 1,
  rotate = 0,
  teeth = 10,
}) => {
  const pts: [number, number][] = [];
  for (let i = 0; i < teeth * 2; i++) {
    const a = (i / (teeth * 2)) * Math.PI * 2;
    const rr = i % 2 === 0 ? r : r * 0.82;
    pts.push([Math.cos(a) * rr, Math.sin(a) * rr]);
  }
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ') + ' Z';
  return (
    <SvgLayer>
      <g transform={`translate(${x} ${y}) rotate(${rotate})`} opacity={draw}>
        <path d={d} fill={fill} stroke={stroke} strokeWidth={3.5} strokeLinejoin="round" />
        <circle cx={0} cy={0} r={r * 0.25} fill={C.bg} stroke={stroke} strokeWidth={3} />
      </g>
    </SvgLayer>
  );
};

export const Person: React.FC<{
  x: number;
  y: number;
  h?: number;
  fill?: string;
  draw?: number;
  face?: 'neutral' | 'happy' | 'worried';
  arms?: 'none' | 'out' | 'up';
  hat?: 'none' | 'chef' | 'cap';
  seed?: number;
}> = ({
  x,
  y,
  h = 160,
  fill = C.panel2,
  draw = 1,
  face = 'neutral',
  arms = 'out',
  hat = 'none',
  seed = 100,
}) => {
  const w = h * 0.58;
  const cy = y + h / 2;
  const eyeY = y + h * 0.38;
  return (
    <>
      <Ellipse
        cx={x}
        cy={cy}
        w={w}
        h={h}
        fill={fill}
        stroke={C.ink}
        strokeWidth={3.2}
        draw={draw}
        seed={seed}
      />
      {arms !== 'none' && (
        <>
          <Line
            x1={x - w * 0.38}
            y1={y + h * 0.58}
            x2={x - w * 0.78}
            y2={arms === 'up' ? y + h * 0.3 : y + h * 0.66}
            stroke={C.ink}
            strokeWidth={3}
            draw={Math.max(0, (draw - 0.3) / 0.7)}
            seed={seed + 1}
          />
          <Line
            x1={x + w * 0.38}
            y1={y + h * 0.58}
            x2={x + w * 0.78}
            y2={arms === 'up' ? y + h * 0.3 : y + h * 0.66}
            stroke={C.ink}
            strokeWidth={3}
            draw={Math.max(0, (draw - 0.3) / 0.7)}
            seed={seed + 2}
          />
        </>
      )}
      <Line
        x1={x - w * 0.18}
        y1={y + h * 0.82}
        x2={x - w * 0.22}
        y2={y + h * 0.98}
        stroke={C.ink}
        strokeWidth={3}
        draw={Math.max(0, (draw - 0.5) / 0.5)}
        seed={seed + 3}
      />
      <Line
        x1={x + w * 0.18}
        y1={y + h * 0.82}
        x2={x + w * 0.22}
        y2={y + h * 0.98}
        stroke={C.ink}
        strokeWidth={3}
        draw={Math.max(0, (draw - 0.5) / 0.5)}
        seed={seed + 4}
      />
      <Circle
        cx={x - w * 0.12}
        cy={eyeY}
        d={7}
        fill={C.ink}
        stroke={C.ink}
        draw={draw}
        seed={seed + 5}
      />
      <Circle
        cx={x + w * 0.12}
        cy={eyeY}
        d={7}
        fill={C.ink}
        stroke={C.ink}
        draw={draw}
        seed={seed + 6}
      />
      {face === 'happy' ? (
        <Path
          d={`M ${x - 8} ${eyeY + 14} Q ${x} ${eyeY + 26} ${x + 8} ${eyeY + 14}`}
          stroke={C.ink}
          strokeWidth={2.6}
          draw={draw}
          seed={seed + 7}
        />
      ) : face === 'worried' ? (
        <Path
          d={`M ${x - 8} ${eyeY + 22} Q ${x} ${eyeY + 14} ${x + 8} ${eyeY + 22}`}
          stroke={C.ink}
          strokeWidth={2.6}
          draw={draw}
          seed={seed + 7}
        />
      ) : (
        <Line
          x1={x - 7}
          y1={eyeY + 18}
          x2={x + 7}
          y2={eyeY + 18}
          stroke={C.ink}
          strokeWidth={2.4}
          draw={draw}
          seed={seed + 7}
        />
      )}
      {hat === 'chef' && (
        <Path
          d={`M ${x - w * 0.35} ${y + h * 0.08} Q ${x - w * 0.42} ${y - h * 0.1} ${x - w * 0.12} ${y - h * 0.14} Q ${x} ${y - h * 0.28} ${x + w * 0.12} ${y - h * 0.14} Q ${x + w * 0.42} ${y - h * 0.1} ${x + w * 0.35} ${y + h * 0.08} Z`}
          fill={C.ink}
          stroke={C.ink}
          strokeWidth={2.2}
          draw={draw}
          seed={seed + 8}
        />
      )}
      {hat === 'cap' && (
        <Path
          d={`M ${x - w * 0.34} ${y + h * 0.1} Q ${x} ${y - h * 0.14} ${x + w * 0.34} ${y + h * 0.1} Z`}
          fill={C.ink}
          stroke={C.ink}
          strokeWidth={2.2}
          draw={draw}
          seed={seed + 8}
        />
      )}
    </>
  );
};

/** Hierarchical 2D rig: parent transform -> child transform. */
export const Rig: React.FC<{
  x: number;
  y: number;
  rotate?: number;
  scale?: number;
  children: React.ReactNode;
}> = ({x, y, rotate = 0, scale = 1, children}) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
    {children}
  </g>
);

/** A two-joint arm that stays connected at shoulder, elbow, and hand. */
export const RiggedArm: React.FC<{
  x: number;
  y: number;
  upper?: number;
  lower?: number;
  shoulder?: number;
  elbow?: number;
  color?: string;
  handFill?: string;
  draw?: number;
  seed?: number;
  children?: React.ReactNode;
}> = ({
  x,
  y,
  upper = 110,
  lower = 95,
  shoulder = -10,
  elbow = -25,
  color = C.ink,
  handFill = C.panel2,
  draw = 1,
  seed = 120,
  children,
}) => (
  <SvgLayer>
    <g transform={`translate(${x} ${y}) rotate(${shoulder})`} opacity={draw}>
      <path
        d={`M 0 0 Q ${upper * 0.55} -3 ${upper} 0`}
        fill="none"
        stroke={color}
        strokeWidth={5}
        strokeLinecap="round"
      />
      <circle cx={0} cy={0} r={9} fill={C.bg} stroke={color} strokeWidth={3} />
      <g transform={`translate(${upper} 0) rotate(${elbow})`}>
        <path
          d={`M 0 0 Q ${lower * 0.55} 3 ${lower} 0`}
          fill="none"
          stroke={color}
          strokeWidth={5}
          strokeLinecap="round"
        />
        <circle cx={0} cy={0} r={7} fill={C.bg} stroke={color} strokeWidth={3} />
        <circle cx={lower} cy={0} r={13} fill={handFill} stroke={color} strokeWidth={3} />
        {children}
      </g>
    </g>
  </SvgLayer>
);

export const Book: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  fill?: string;
  draw?: number;
  seed?: number;
}> = ({x, y, w = 70, h = 110, fill = C.panel2, draw = 1, seed = 130}) => (
  <>
    <Rect
      x={x}
      y={y}
      w={w}
      h={h}
      fill={fill}
      stroke={C.ink}
      strokeWidth={3}
      draw={draw}
      seed={seed}
      roughness={1.1}
    />
    <Line
      x1={x + 12}
      y1={y + 4}
      x2={x + 12}
      y2={y + h - 4}
      stroke={C.ink}
      strokeWidth={2.2}
      draw={draw}
      seed={seed + 1}
    />
    <Line
      x1={x + 24}
      y1={y + h * 0.3}
      x2={x + w - 8}
      y2={y + h * 0.3}
      stroke={C.ink}
      strokeWidth={2}
      draw={draw}
      seed={seed + 2}
      opacity={0.5}
    />
  </>
);

export const Crayon: React.FC<{
  x: number;
  y: number;
  h?: number;
  color: string;
  draw?: number;
  seed?: number;
}> = ({x, y, h = 190, color, draw = 1, seed = 140}) => {
  const w = 34;
  return (
    <>
      <Path
        d={`M ${x - w / 2} ${y} L ${x + w / 2} ${y} L ${x + w / 2} ${
          y + h - 38
        } L ${x} ${y + h} L ${x - w / 2} ${y + h - 38} Z`}
        fill={color}
        stroke={C.ink}
        strokeWidth={2.8}
        draw={draw}
        seed={seed}
      />
      <Line
        x1={x - w / 2}
        y1={y + 16}
        x2={x + w / 2}
        y2={y + 16}
        stroke={C.ink}
        strokeWidth={2.4}
        draw={draw}
        seed={seed + 1}
      />
    </>
  );
};

export const ChapterCard: React.FC<{
  start: number;
  number: string;
  title: string;
  kicker: string;
  accent: Accent;
  motif?: React.ReactNode;
  t: number;
}> = ({start, number, title, kicker, accent, motif, t}) => {
  const p = (offset: number, dur = 0.6) =>
    clamp01((t - (start + offset)) / dur);
  const color = C[accent];
  const camera = {zoom: 1 + 0.025 * clamp01((t - start) / 4), y: 100};
  return (
    <Stage camera={camera} full>
      <Text x={130} y={160} size={300} font="title" color={color} draw={p(0.05, 0.5)} weight={700}>
        {number}
      </Text>
      <Text x={470} y={180} size={90} width={1100} draw={p(0.15, 0.5)} weight={700}>
        {title}
      </Text>
      <Text x={476} y={325} size={42} tone="dim" draw={p(0.3, 0.5)}>
        {kicker}
      </Text>
      <Line
        x1={476}
        y1={385}
        x2={476 + 540 * p(0.4, 0.5)}
        y2={379}
        stroke={color}
        strokeWidth={8}
        draw={p(0.4, 0.5)}
        seed={900}
      />
      {motif}
    </Stage>
  );
};

export const RecapCard: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  n: string;
  label: string;
  active?: boolean;
  draw?: number;
  seed?: number;
  children?: React.ReactNode;
}> = ({x, y, w, h, n, label, active = false, draw = 1, seed = 160, children}) => (
  <>
    <Rect
      x={x}
      y={y}
      w={w}
      h={h}
      fill={active ? C.panel2 : C.panel}
      stroke={active ? C.teal : C.ink}
      strokeWidth={active ? 5 : 3}
      draw={draw}
      seed={seed}
      roughness={1.3}
    />
    <Text x={x + 24} y={y + 22} size={54} color={active ? C.teal : C.dim} draw={draw} weight={700}>
      {n}
    </Text>
    <Text x={x + 24} y={y + h - 72} size={40} draw={draw}>
      {label}
    </Text>
    {children}
  </>
);

export const Check: React.FC<{x: number; y: number; size?: number; color?: string; draw?: number}> = ({
  x,
  y,
  size = 34,
  color = C.teal,
  draw = 1,
}) => (
  <Path
    d={`M ${x} ${y} L ${x + size * 0.36} ${y + size * 0.42} L ${x + size} ${y - size * 0.38}`}
    stroke={color}
    strokeWidth={6}
    draw={draw}
    seed={170}
    roughness={0.8}
  />
);

export const Cross: React.FC<{x: number; y: number; size?: number; color?: string; draw?: number}> = ({
  x,
  y,
  size = 34,
  color = C.coral,
  draw = 1,
}) => (
  <>
    <Line
      x1={x - size / 2}
      y1={y - size / 2}
      x2={x + size / 2}
      y2={y + size / 2}
      stroke={color}
      strokeWidth={5}
      draw={draw}
      seed={171}
    />
    <Line
      x1={x + size / 2}
      y1={y - size / 2}
      x2={x - size / 2}
      y2={y + size / 2}
      stroke={color}
      strokeWidth={5}
      draw={draw}
      seed={172}
    />
  </>
);

export const Magnifier: React.FC<{
  x: number;
  y: number;
  r?: number;
  color?: string;
  draw?: number;
  seed?: number;
}> = ({x, y, r = 60, color = C.ink, draw = 1, seed = 180}) => (
  <>
    <Circle
      cx={x}
      cy={y}
      d={r * 2}
      stroke={color}
      strokeWidth={5}
      draw={draw}
      seed={seed}
    />
    <Line
      x1={x + r * 0.7}
      y1={y + r * 0.7}
      x2={x + r * 1.45}
      y2={y + r * 1.45}
      stroke={color}
      strokeWidth={8}
      draw={draw}
      seed={seed + 1}
    />
  </>
);

export const Arrow = RoughArrow;

export const Divider: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  draw?: number;
  seed?: number;
}> = ({x1, y1, x2, y2, color = C.ink, draw = 1, seed = 190}) => (
  <Line
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
    stroke={color}
    strokeWidth={3}
    draw={draw}
    seed={seed}
    roughness={2}
  />
);
