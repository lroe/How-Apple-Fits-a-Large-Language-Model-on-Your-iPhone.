import React from 'react';
import {C, fontLabel, pan, push} from '../theme';
import {Arrow, Circle, Ellipse, Line, Path, Rect} from '../rough';
import {
  Bar,
  Check,
  Chip,
  Cross,
  Grid,
  Panel,
  Phone,
  Stage,
  Text,
  Token,
  useP,
  type SceneProps,
} from '../ui';

/* 15 — Trick 1: smaller numbers */
export const Trick1: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(4, end - start), 0.045)};
  return (
    <Stage camera={camera}>
      <Text x={120} y={180} size={300} font="title" weight={700} color={C.coral} draw={p(0.1, 0.7)}>
        01
      </Text>
      <Text x={470} y={210} size={108} weight={700} draw={p(0.3, 0.7)}>
        SMALLER NUMBERS
      </Text>
      <Text x={476} y={330} size={46} tone="dim" draw={p(0.5, 0.7)}>
        fewer bits per weight
      </Text>
      <Line x1={476} y1={390} x2={476 + 620 * p(0.6, 0.7)} y2={386} stroke={C.coral} strokeWidth={8} draw={p(0.6, 0.7)} seed={1000} />

      <Panel x={220} y={520} w={500} h={260} fill={C.teal} label="16 BITS" draw={p(0.9, 0.8)} seed={1010} labelSize={64} />
      <Text x={220} y={810} size={34} color={C.dim} draw={p(1.1, 0.6)}>
        accurate, but heavy
      </Text>
      <Arrow x1={760} y1={650} x2={980} y2={650} color={C.ink} width={5} draw={p(1.3, 0.6)} seed={1020} />
      <Text x={870} y={590} size={38} align="center" width={220} tone="dim" draw={p(1.5, 0.6)} style={{left: 760}}>
        shrink
      </Text>

      <Panel x={1020} y={560} w={300} h={180} fill={C.coral} label="2 BITS" draw={p(1.6, 0.8)} seed={1030} labelSize={56} />
      <Text x={1020} y={810} size={34} color={C.dim} draw={p(1.8, 0.6)}>
        a tiny note
      </Text>
      <Text x={1400} y={550} size={150} font="title" weight={700} color={C.amber} draw={p(2.0, 0.7)}>
        8×
      </Text>
      <Text x={1410} y={720} size={44} tone="dim" draw={p(2.2, 0.7)}>
        smaller
      </Text>
          </Stage>
  );
};

/* 16 — A thousand shades */
export const Crayons: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {x: pan(t, start, Math.min(7, end - start), -24, 18)};
  const colors = [C.teal, C.amber, C.coral, C.blue, C.violet];
  return (
    <Stage camera={camera}>
            
      <Panel x={170} y={380} w={540} h={500} fill={C.panel} draw={p(0.8, 0.8)} seed={1040} />
      <Text x={200} y={410} size={58} draw={p(1.0, 0.6)}>
        1,000 SHADES
      </Text>
      {Array.from({length: 24}).map((_, i) => (
        <Line
          key={i}
          x1={210}
          y1={500 + i * 12}
          x2={660}
          y2={488 + i * 12}
          stroke={colors[i % colors.length]}
          strokeWidth={7}
          draw={p(1.2 + i * 0.02, 0.5)}
          seed={1050 + i}
          opacity={0.9}
        />
      ))}

      <Panel x={1210} y={380} w={460} h={500} fill={C.panel} draw={p(1.0, 0.8)} seed={1080} />
      <Text x={1240} y={410} size={58} draw={p(1.2, 0.6)}>
        16 SHADES
      </Text>
      {Array.from({length: 16}).map((_, i) => (
        <Rect
          key={i}
          x={1260 + (i % 4) * 92}
          y={500 + Math.floor(i / 4) * 76}
          w={70}
          h={56}
          fill={colors[i % colors.length]}
          stroke={C.ink}
          strokeWidth={2.5}
          draw={p(1.4 + i * 0.04, 0.5)}
          seed={1090 + i}
        />
      ))}

      <Arrow x1={740} y1={620} x2={1180} y2={620} color={C.coral} width={5} draw={p(2.4, 0.6)} seed={1110} />
      <Text x={960} y={700} size={40} align="center" width={300} color={C.coral} draw={p(2.6, 0.6)} style={{left: 810}}>
        still looks great
      </Text>
          </Stage>
  );
};

/* 17 — Paint by numbers */
export const PaintByNumber: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(7, end - start), 0.03)};
  const petals = [
    [700, 430, 0],
    [830, 500, 60],
    [830, 610, 120],
    [700, 680, 180],
    [570, 610, 240],
    [570, 500, 300],
  ] as const;
  return (
    <Stage camera={camera}>
      {petals.map(([x, y], i) => (
        <React.Fragment key={i}>
          <Ellipse
            cx={x}
            cy={y}
            w={240}
            h={160}
            fill={i % 2 === 0 ? C.teal : C.coral}
            stroke={C.ink}
            strokeWidth={3.5}
            draw={p(0.2 + i * 0.1, 0.6)}
            seed={1120 + i}
          />
          <Text
            x={x}
            y={y - 26}
            size={58}
            align="center"
            width={240}
            color={C.bg}
            draw={p(0.3 + i * 0.1, 0.6)}
            style={{left: x - 120}}
          >
            {i % 2 === 0 ? '1' : '2'}
          </Text>
        </React.Fragment>
      ))}
      <Circle cx={700} cy={555} d={210} fill={C.amber} stroke={C.ink} strokeWidth={4} draw={p(0.1, 0.6)} seed={1130} />
      <Text x={700} y={530} size={64} align="center" width={210} color={C.bg} draw={p(0.2, 0.6)} style={{left: 595}}>
        3
      </Text>

      <Panel x={1180} y={300} w={500} h={480} fill={C.panel} draw={p(0.8, 0.8)} seed={1140} />
      <Text x={1210} y={330} size={56} draw={p(1.0, 0.6)}>
        PALETTE
      </Text>
      {[
        {c: C.teal, n: '1'},
        {c: C.coral, n: '2'},
        {c: C.amber, n: '3'},
      ].map((item, i) => (
        <React.Fragment key={item.n}>
          <Circle cx={1300} cy={450 + i * 100} d={74} fill={item.c} stroke={C.ink} strokeWidth={3} draw={p(1.2 + i * 0.15, 0.5)} seed={1150 + i} />
          <Text x={1400} y={425 + i * 100} size={48} draw={p(1.25 + i * 0.15, 0.5)}>
            {item.n}
          </Text>
        </React.Fragment>
      ))}
      <Text x={1180} y={840} size={34} tone="dim" draw={p(2.2, 0.6)}>
        same idea, fewer colors
      </Text>
    </Stage>
  );
};

/* 18 — A tiny lookup table */
export const LookupTable: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {x: pan(t, start, Math.min(5, end - start), -30, 20)};
  return (
    <Stage camera={camera}>
            
      {[0, 1, 2].map((g) => (
        <React.Fragment key={g}>
          <Panel
            x={150}
            y={300 + g * 170}
            w={420}
            h={130}
            fill={C.panel}
            draw={p(0.8 + g * 0.2, 0.7)}
            seed={1160 + g}
          />
          {[0, 1, 2, 3].map((i) => (
            <Rect
              key={i}
              x={190 + i * 88}
              y={340 + g * 170}
              w={64}
              h={50}
              fill={[C.teal, C.amber, C.coral][g]}
              stroke={C.ink}
              strokeWidth={2.5}
              draw={p(1.0 + g * 0.2 + i * 0.04, 0.5)}
              seed={1170 + g * 4 + i}
            />
          ))}
          <Text x={150} y={470 + g * 170} size={28} tone="dim" draw={p(1.2 + g * 0.2, 0.5)}>
            group {g + 1}
          </Text>
        </React.Fragment>
      ))}

      <Arrow x1={620} y1={500} x2={820} y2={500} color={C.ink} width={4} draw={p(1.8, 0.6)} seed={1190} />
      <Panel x={840} y={320} w={420} h={390} fill={C.panel2} draw={p(1.9, 0.8)} seed={1191} />
      {['00', '01', '10', '11'].map((v, i) => (
        <Text
          key={v}
          x={900}
          y={370 + i * 72}
          size={44}
          color={i === 0 ? C.teal : C.ink}
          draw={p(2.0 + i * 0.1, 0.5)}
        >
          {v}
        </Text>
      ))}
      <Text x={840} y={740} size={32} tone="dim" draw={p(2.4, 0.6)}>
        four notes, many weights
      </Text>

      <Arrow x1={1290} y1={500} x2={1460} y2={500} color={C.coral} width={5} draw={p(2.5, 0.6)} seed={1200} />
      <Panel x={1480} y={420} w={260} h={160} fill={C.teal} label="00" draw={p(2.6, 0.7)} seed={1201} labelSize={64} />
      <Text x={1480} y={620} size={32} tone="dim" draw={p(2.8, 0.6)}>
        the shared note
      </Text>
    </Stage>
  );
};

/* 19 — How short is a note? */
export const Bits: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(7, end - start), 0.03)};
  return (
    <Stage camera={camera}>
            
      <Panel x={220} y={300} w={420} h={400} fill={C.panel} draw={p(0.8, 0.8)} seed={1210} />
      <Text x={250} y={330} size={64} draw={p(1.0, 0.6)}>
        2 BITS
      </Text>
      {['00', '01', '10', '11'].map((v, i) => (
        <Text key={v} x={270 + (i % 2) * 180} y={440 + Math.floor(i / 2) * 100} size={70} color={C.teal} draw={p(1.1 + i * 0.1, 0.5)}>
          {v}
        </Text>
      ))}
      <Text x={250} y={720} size={50} color={C.teal} draw={p(1.6, 0.6)}>
        4 values
      </Text>

      <Panel x={760} y={300} w={420} h={400} fill={C.panel} draw={p(1.0, 0.8)} seed={1220} />
      <Text x={790} y={330} size={64} draw={p(1.2, 0.6)}>
        4 BITS
      </Text>
      <Grid
        x={810}
        y={420}
        cols={4}
        rows={4}
        cell={58}
        gap={10}
        fill={(r, c) => ((r + c) % 3 === 0 ? C.coral : (r + c) % 3 === 1 ? C.amber : C.teal)}
        draw={p(1.3, 0.8)}
        seed={1230}
      />
      <Text x={790} y={720} size={50} color={C.coral} draw={p(1.9, 0.6)}>
        16 values
      </Text>

      <Text x={1320} y={360} size={160} font="title" weight={700} color={C.amber} draw={p(2.3, 0.7)}>
        8×
      </Text>
      <Text x={1330} y={530} size={46} tone="dim" draw={p(2.5, 0.7)}>
        smaller than 16-bit
      </Text>
      <Bar x={1320} y={650} w={420} h={50} value={0.12} fill={C.coral} draw={p(2.7, 0.7)} label="" seed={1240} />
      <Bar x={1320} y={720} w={420} h={50} value={1} fill={C.teal} draw={p(2.8, 0.7)} label="" seed={1241} />
      <Text x={1320} y={790} size={30} tone="dim" draw={p(3.0, 0.6)}>
        2-bit note vs 16-bit weight
      </Text>
    </Stage>
  );
};

/* 20 — Mixed sizes */
export const MixedBits: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {x: pan(t, start, Math.min(5, end - start), -20, 20)};
  return (
    <Stage camera={camera}>
            
      <Grid
        x={420}
        y={290}
        cols={10}
        rows={10}
        cell={46}
        gap={8}
        fill={(r, c) => ((r * 7 + c * 3) % 5 < 3 ? C.teal : C.coral)}
        draw={p(0.8, 1.0)}
        seed={1250}
      />
      <Text x={420} y={850} size={38} tone="dim" draw={p(1.8, 0.6)}>
        10 × 10 weights
      </Text>

      <Text x={1180} y={350} size={170} font="title" weight={700} color={C.amber} draw={p(1.5, 0.7)}>
        3.7
      </Text>
      <Text x={1190} y={540} size={54} draw={p(1.8, 0.7)}>
        average bits
      </Text>
      <Text x={1190} y={640} size={42} tone="dim" draw={p(2.1, 0.7)}>
        per weight
      </Text>
      <Text x={1190} y={760} size={36} tone="dim" draw={p(2.4, 0.7)}>
        2-bit cells + 4-bit cells
      </Text>
    </Stage>
  );
};

/* 21 — Run the numbers */
export const RunNumbers: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(6, end - start), 0.03)};
  return (
    <Stage camera={camera}>
            
      <Text x={300} y={310} size={58} draw={p(0.9, 0.7)}>
        3B × 3.7 = 11.1B bits
      </Text>
      <Text x={300} y={410} size={58} draw={p(1.4, 0.7)}>
        11.1B ÷ 8 = 1.39 GB
      </Text>
      <Text x={300} y={520} size={58} color={C.teal} draw={p(1.9, 0.7)}>
        less than one quarter
      </Text>

      <Bar x={300} y={650} w={620} h={64} value={1.39 / 5.9} fill={C.teal} draw={p(2.2, 0.8)} label="1.39 GB" labelColor={C.bg} seed={1260} />
      <Bar x={980} y={650} w={620} h={64} value={1} fill={C.coral} draw={p(2.4, 0.8)} label="5.9 GB" labelColor={C.bg} seed={1261} />
      <Text x={300} y={760} size={34} tone="dim" draw={p(2.6, 0.6)}>
        quantised model
      </Text>
      <Text x={980} y={760} size={34} tone="dim" draw={p(2.7, 0.6)}>
        16-bit model
      </Text>
          </Stage>
  );
};

/* 22 — Not every part is equal */
export const Sensitivity: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {x: pan(t, start, Math.min(6, end - start), -20, 24)};
  return (
    <Stage camera={camera}>
            
      <Panel x={200} y={300} w={700} h={480} fill={C.panel} draw={p(0.8, 0.8)} seed={1270} />
      <Text x={230} y={330} size={50} draw={p(1.0, 0.6)}>
        PACKING BOX
      </Text>
      {[0, 1, 2, 3].map((i) => (
        <Ellipse
          key={i}
          cx={300 + i * 120}
          cy={560}
          w={90}
          h={70}
          fill={C.teal}
          stroke={C.ink}
          strokeWidth={3}
          draw={p(1.2 + i * 0.12, 0.5)}
          seed={1280 + i}
        />
      ))}
      <Path
        d="M 620 500 Q 660 420 720 500 L 710 660 Q 670 710 630 660 Z"
        fill={C.coral}
        stroke={C.ink}
        strokeWidth={3}
        draw={p(1.6, 0.7)}
        seed={1290}
      />
      <Text x={300} y={700} size={34} color={C.teal} draw={p(1.8, 0.6)}>
        SOCKS → 2 BITS
      </Text>
      <Text x={610} y={700} size={34} color={C.coral} draw={p(2.0, 0.6)}>
        VASE → 4 BITS
      </Text>

      <Arrow x1={900} y1={520} x2={1120} y2={520} color={C.ink} width={5} draw={p(2.2, 0.6)} seed={1300} />
      <Text x={1010} y={440} size={38} align="center" width={260} color={C.amber} draw={p(2.4, 0.6)} style={{left: 880}}>
        squeeze gently
      </Text>

      <Text x={1200} y={360} size={90} font="title" weight={700} color={C.amber} draw={p(2.6, 0.7)}>
        SENSITIVITY
      </Text>
      <Text x={1210} y={500} size={42} tone="dim" draw={p(2.8, 0.7)}>
        some weights matter more
      </Text>
    </Stage>
  );
};

/* 23 — Two parts, two sizes */
export const DecoderEmbed: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(7, end - start), 0.03)};
  return (
    <Stage camera={camera}>
            
      <Panel x={180} y={300} w={680} h={520} fill={C.panel} draw={p(0.8, 0.8)} seed={1310} />
      <Text x={210} y={330} size={56} color={C.teal} draw={p(1.0, 0.6)}>
        DECODER · 2-BIT
      </Text>
      {['the', 'model', 'writes', 'one', 'token'].map((w, i) => (
        <Token
          key={w}
          x={230 + i * 122}
          y={430 + (i % 2) * 80}
          w={108}
          h={62}
          label={w}
          fill={i % 2 === 0 ? C.teal : C.panel2}
          draw={p(1.2 + i * 0.12, 0.5)}
          seed={1320 + i}
          size={28}
        />
      ))}
      <Text x={210} y={740} size={34} tone="dim" draw={p(2.0, 0.6)}>
        one token at a time
      </Text>

      <Panel x={1000} y={300} w={740} h={520} fill={C.panel} draw={p(1.0, 0.8)} seed={1340} />
      <Text x={1030} y={330} size={56} color={C.coral} draw={p(1.2, 0.6)}>
        EMBEDDING · 4-BIT
      </Text>
      {Array.from({length: 5}).map((_, i) => (
        <React.Fragment key={i}>
          <Rect
            x={1040}
            y={420 + i * 64}
            w={120}
            h={44}
            fill={C.panel2}
            stroke={C.ink}
            strokeWidth={2.5}
            draw={p(1.3 + i * 0.08, 0.5)}
            seed={1350 + i}
          />
          {Array.from({length: 6}).map((__, j) => (
            <Rect
              key={j}
              x={1190 + j * 54}
              y={420 + i * 64}
              w={42}
              h={44}
              fill={j % 2 === 0 ? C.coral : C.amber}
              stroke={C.ink}
              strokeWidth={1.6}
              draw={p(1.35 + i * 0.08 + j * 0.02, 0.4)}
              seed={1360 + i * 6 + j}
            />
          ))}
          <Text x={1052} y={432 + i * 64} size={22} tone="dim" draw={p(1.4 + i * 0.08, 0.4)}>
            word {i + 1}
          </Text>
        </React.Fragment>
      ))}
      <Text x={1030} y={760} size={34} tone="dim" draw={p(2.2, 0.6)}>
        a dictionary of numbers
      </Text>
    </Stage>
  );
};

/* 24 — The catch */
export const Catch: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(6, end - start), 0.05)};
  return (
    <Stage camera={camera}>
            
      <Panel x={700} y={340} w={520} h={300} fill={C.teal} label="16-BIT MODEL" draw={p(0.8, 0.8)} seed={1380} labelSize={42} />
      <Grid
        x={780}
        y={425}
        cols={8}
        rows={5}
        cell={34}
        gap={7}
        fill={() => C.panel2}
        draw={p(0.9, 0.8)}
        seed={1381}
        dim={0.1}
      />
      <Arrow x1={420} y1={490} x2={650} y2={490} color={C.coral} width={6} draw={p(1.2, 0.6)} seed={1390} />
      <Arrow x1={1500} y1={490} x2={1270} y2={490} color={C.coral} width={6} draw={p(1.2, 0.6)} seed={1391} />
      <Text x={420} y={420} size={40} color={C.coral} draw={p(1.4, 0.6)}>
        squeeze
      </Text>
      <Text x={1310} y={420} size={40} color={C.coral} draw={p(1.4, 0.6)}>
        squeeze
      </Text>

      {Array.from({length: 7}).map((_, i) => (
        <Cross
          key={i}
          x={760 + (i % 4) * 120}
          y={730 + Math.floor(i / 4) * 90}
          size={46}
          color={C.coral}
          draw={p(1.8 + i * 0.12, 0.5)}
        />
      ))}
      <Text x={960} y={920} size={48} align="center" width={1600} color={C.coral} draw={p(2.8, 0.7)}>
        errors pile up in the answer
      </Text>
    </Stage>
  );
};

/* 25 — Squeeze while learning */
export const QATLoop: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(7, end - start), 0.03)};
  const nodes = [
    {x: 500, y: 430, label: 'TRY A TASK', color: C.teal},
    {x: 960, y: 700, label: 'SPOT THE ERROR', color: C.coral},
    {x: 1420, y: 430, label: 'NUDGE WEIGHTS', color: C.amber},
  ];
  return (
    <Stage camera={camera}>
            
      {nodes.map((node, i) => (
        <React.Fragment key={node.label}>
          <Panel
            x={node.x - 220}
            y={node.y - 80}
            w={440}
            h={160}
            fill={node.color}
            label={node.label}
            draw={p(0.8 + i * 0.25, 0.7)}
            seed={1400 + i}
            labelSize={38}
            align="center"
          />
        </React.Fragment>
      ))}
      <Arrow x1={740} y1={450} x2={900} y2={620} color={C.ink} width={4} curve={-50} draw={p(1.7, 0.6)} seed={1410} />
      <Arrow x1={1080} y1={640} x2={1290} y2={470} color={C.ink} width={4} curve={-50} draw={p(1.9, 0.6)} seed={1411} />
      <Arrow x1={1320} y1={350} x2={620} y2={350} color={C.ink} width={4} curve={-80} draw={p(2.1, 0.6)} seed={1412} />
      <Text x={960} y={560} size={44} align="center" width={300} color={C.teal} draw={p(2.4, 0.6)} style={{left: 810}}>
        REPEAT
      </Text>
          </Stage>
  );
};

/* 26 — The four-crayon test */
export const CrayonTest: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {x: pan(t, start, Math.min(6, end - start), -20, 24)};
  return (
    <Stage camera={camera}>
            
      <Panel x={220} y={300} w={620} h={500} fill={C.panel} draw={p(0.8, 0.8)} seed={1420} />
      <Text x={250} y={330} size={46} draw={p(1.0, 0.6)}>
        PRACTICE · 1,000
      </Text>
      {[0, 1, 2, 3, 4].map((i) => (
        <Path
          key={i}
          d={`M ${280 + i * 20} ${560 + (i % 2) * 20} Q ${420 + i * 10} ${420 + i * 12} ${560} ${600 - i * 18}`}
          stroke={[C.teal, C.amber, C.coral, C.blue, C.violet][i]}
          strokeWidth={6}
          draw={p(1.2 + i * 0.1, 0.5)}
          seed={1430 + i}
        />
      ))}
      <Text x={250} y={720} size={30} tone="dim" draw={p(1.8, 0.6)}>
        every shade available
      </Text>

      <Panel x={1080} y={300} w={620} h={500} fill={C.panel} draw={p(1.0, 0.8)} seed={1440} />
      <Text x={1110} y={330} size={46} draw={p(1.2, 0.6)}>
        TEST DAY · 4
      </Text>
      {[C.teal, C.amber, C.coral, C.violet].map((c, i) => (
        <Circle key={i} cx={1150 + i * 80} cy={430} d={46} fill={c} stroke={C.ink} strokeWidth={3} draw={p(1.3 + i * 0.1, 0.5)} seed={1450 + i} />
      ))}
      <Path
        d="M 1150 630 Q 1250 520 1350 610 Q 1450 700 1580 570"
        stroke={C.teal}
        strokeWidth={6}
        draw={p(1.8, 0.6)}
        seed={1460}
      />
      <Path
        d="M 1160 680 Q 1260 600 1360 660 Q 1460 720 1560 640"
        stroke={C.coral}
        strokeWidth={6}
        draw={p(1.95, 0.6)}
        seed={1461}
      />
      <Check x={1500} y={720} size={54} color={C.teal} draw={p(2.3, 0.6)} />
      <Text x={1110} y={750} size={30} tone="dim" draw={p(2.1, 0.6)}>
        less polished — still good
      </Text>
    </Stage>
  );
};

/* 27 — Train for the size */
export const DevLesson: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(3, end - start), 0.04)};
  return (
    <Stage camera={camera}>
            
      <Panel x={260} y={330} w={620} h={220} fill={C.panel} label="SHRINK LATER" draw={p(0.7, 0.7)} seed={1470} labelSize={44} />
      <Cross x={790} y={440} size={60} color={C.coral} draw={p(1.0, 0.6)} />
      <Text x={260} y={590} size={34} tone="dim" draw={p(1.2, 0.6)}>
        accurate first, damaged later
      </Text>

      <Panel x={1040} y={330} w={620} h={220} fill={C.panel} label="TRAIN SMALL" draw={p(0.9, 0.7)} seed={1480} labelSize={44} />
      <Check x={1570} y={440} size={60} color={C.teal} draw={p(1.2, 0.6)} />
      <Text x={1040} y={590} size={34} tone="dim" draw={p(1.4, 0.6)}>
        learns to work at the target size
      </Text>

      <Arrow x1={880} y1={800} x2={1040} y2={800} color={C.teal} width={5} draw={p(1.8, 0.6)} seed={1490} />
      <Text x={960} y={870} size={44} align="center" width={600} color={C.teal} draw={p(2.0, 0.7)} style={{left: 660}}>
        the better path
      </Text>
    </Stage>
  );
};
