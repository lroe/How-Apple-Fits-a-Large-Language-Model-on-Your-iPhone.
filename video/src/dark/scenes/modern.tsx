import React from 'react';
import {C, oscillate, pan, push} from '../theme';
import {Arrow, Circle, Line, Rect} from '../rough';
import {
  Bar,
  Book,
  Chip,
  Cloud,
  Grid,
  Panel,
  Person,
  Phone,
  RiggedArm,
  Stage,
  Text,
  useP,
  type SceneProps,
} from '../ui';

/* 48 — New in 2026 */
export const New2026: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {x: pan(t, start, Math.min(6, end - start), -20, 24)};
  return (
    <Stage camera={camera}>
            
      <Panel x={180} y={330} w={480} h={460} fill={C.teal} label="AFM3 CORE" draw={p(0.8, 0.8)} seed={2300} labelSize={46} />
      <Text x={210} y={470} size={120} font="title" weight={700} color={C.bg} draw={p(1.0, 0.7)}>
        3B
      </Text>
      <Text x={210} y={720} size={30} color={C.bg} draw={p(1.2, 0.6)}>
        on-device
      </Text>

      <Panel x={760} y={330} w={480} h={460} fill={C.amber} label="CORE ADVANCED" draw={p(1.0, 0.8)} seed={2310} labelSize={38} />
      <Text x={790} y={470} size={120} font="title" weight={700} color={C.bg} draw={p(1.2, 0.7)}>
        20B
      </Text>
      <Text x={790} y={720} size={30} color={C.bg} draw={p(1.4, 0.6)}>
        sparse, server-side
      </Text>

      <Panel x={1340} y={330} w={400} h={460} fill={C.panel} draw={p(1.2, 0.8)} seed={2320} />
      <Text x={1540} y={470} size={150} font="title" weight={700} align="center" width={400} draw={p(1.4, 0.7)} style={{left: 1340}}>
        2026
      </Text>
      <Text x={1540} y={720} size={34} align="center" width={400} tone="dim" draw={p(1.6, 0.6)} style={{left: 1340}}>
        the next step
      </Text>

          </Stage>
  );
};

/* 49 — Dense vs sparse */
export const Sparse: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(7, end - start), 0.03)};
  return (
    <Stage camera={camera}>
            
      <Panel x={200} y={300} w={620} h={560} fill={C.panel} draw={p(0.8, 0.8)} seed={2330} />
      <Text x={230} y={330} size={44} color={C.coral} draw={p(1.0, 0.6)}>
        DENSE
      </Text>
      <Grid
        x={280}
        y={430}
        cols={6}
        rows={6}
        cell={56}
        gap={10}
        fill={() => C.coral}
        draw={p(1.1, 0.9)}
        seed={2340}
      />
      <Text x={200} y={880} size={34} tone="dim" draw={p(1.6, 0.6)}>
        every token uses every expert
      </Text>

      <Panel x={1100} y={300} w={620} h={560} fill={C.panel} draw={p(1.0, 0.8)} seed={2350} />
      <Text x={1130} y={330} size={44} color={C.teal} draw={p(1.2, 0.6)}>
        SPARSE
      </Text>
      <Grid
        x={1180}
        y={430}
        cols={6}
        rows={6}
        cell={56}
        gap={10}
        fill={(r, c) => ((r === 1 && c === 2) || (r === 3 && c === 4) || (r === 4 && c === 1) ? C.teal : C.panel2)}
        draw={p(1.3, 0.9)}
        seed={2360}
      />
      <Text x={1100} y={880} size={34} tone="dim" draw={p(1.8, 0.6)}>
        only a few experts wake
      </Text>

          </Stage>
  );
};

/* 50 — A hospital of experts */
export const Hospital: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(3, end - start), 0.04)};
  return (
    <Stage camera={camera}>
            
      <Rect x={560} y={260} w={800} h={620} fill={C.panel} stroke={C.ink} strokeWidth={5} draw={p(0.8, 0.8)} seed={2370} />
      <Rect x={760} y={220} w={400} h={60} fill={C.panel2} stroke={C.ink} strokeWidth={3} draw={p(0.9, 0.6)} seed={2371} />
      <Text x={960} y={235} size={34} align="center" width={400} color={C.amber} draw={p(1.0, 0.6)} style={{left: 760}}>
        HOSPITAL
      </Text>
      {Array.from({length: 8}).map((_, r) =>
        Array.from({length: 6}).map((__, c) => {
          const lit = (r === 1 && c === 1) || (r === 3 && c === 4) || (r === 5 && c === 2);
          return (
            <Rect
              key={`${r}-${c}`}
              x={610 + c * 120}
              y={320 + r * 64}
              w={72}
              h={40}
              fill={lit ? C.amber : C.panel2}
              stroke={C.ink}
              strokeWidth={2}
              draw={p(1.0 + (r * 6 + c) * 0.015, 0.5)}
              seed={2380 + r * 6 + c}
            />
          );
        }),
      )}
      <Text x={960} y={950} size={34} align="center" width={1700} tone="dim" draw={p(1.8, 0.7)}>
        hundreds inside · two or three on duty
      </Text>
    </Stage>
  );
};

/* 51 — Big model, small bill */
export const TwentyB: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(6, end - start), 0.03)};
  return (
    <Stage camera={camera}>
      <Text x={150} y={260} size={170} font="title" weight={700} draw={p(0.8, 0.7)}>
        20B
      </Text>
      <Text x={160} y={450} size={44} tone="dim" draw={p(1.0, 0.7)}>
        total parameters
      </Text>
      <Text x={620} y={260} size={150} font="title" weight={700} color={C.teal} draw={p(1.2, 0.7)}>
        1–4B
      </Text>
      <Text x={630} y={450} size={44} tone="dim" draw={p(1.4, 0.7)}>
        awake per token
      </Text>

      <Bar x={150} y={550} w={760} h={70} value={1} fill={C.coral} draw={p(1.6, 0.8)} label="20B TOTAL" seed={2400} />
      <Bar x={150} y={660} w={760} h={70} value={0.2} fill={C.teal} draw={p(1.9, 0.8)} label="1–4B ACTIVE" seed={2401} />

      <Panel x={1000} y={320} w={700} h={560} fill={C.panel} draw={p(1.6, 0.8)} seed={2410} />
      <Text x={1030} y={350} size={36} color={C.amber} draw={p(1.8, 0.6)}>
        HOSPITAL
      </Text>
      <Grid
        x={1050}
        y={430}
        cols={6}
        rows={4}
        cell={64}
        gap={14}
        fill={(r, c) => ((r === 1 && c === 1) || (r === 2 && c === 3) || (r === 0 && c === 4) ? C.amber : C.panel2)}
        draw={p(1.9, 0.8)}
        seed={2420}
      />
      <Text x={1050} y={780} size={32} tone="dim" draw={p(2.4, 0.6)}>
        only a few are active
      </Text>
    </Stage>
  );
};

/* 52 — Load only what you need */
export const Storage: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {x: pan(t, start, Math.min(6, end - start), -20, 24)};
  return (
    <Stage camera={camera}>
            
      <Panel x={180} y={330} w={640} h={520} fill={C.panel} label="FLASH STORAGE" draw={p(0.8, 0.8)} seed={2430} labelSize={38} />
      <Grid
        x={260}
        y={440}
        cols={6}
        rows={6}
        cell={54}
        gap={10}
        fill={(r, c) => ((r === 0 && c === 1) || (r === 2 && c === 4) || (r === 4 && c === 2) ? C.coral : C.panel2)}
        draw={p(1.0, 0.9)}
        seed={2440}
      />

      <Arrow x1={860} y1={570} x2={1040} y2={570} color={C.ink} width={4} draw={p(1.8, 0.6)} seed={2450} />
      <Panel x={1080} y={380} w={620} h={380} fill={C.panel} label="PHONE MEMORY" draw={p(1.9, 0.8)} seed={2460} labelSize={38} />
      {[0, 1, 2].map((i) => (
        <Rect
          key={i}
          x={1140 + i * 180}
          y={510}
          w={140}
          h={110}
          fill={C.coral}
          stroke={C.ink}
          strokeWidth={3}
          draw={p(2.1 + i * 0.2, 0.6)}
          seed={2470 + i}
        />
      ))}
      <Text x={1080} y={800} size={32} tone="dim" draw={p(2.6, 0.6)}>
        loaded per prompt, not per token
      </Text>
    </Stage>
  );
};

/* 53 — The basement library */
export const Library: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(3, end - start), 0.04)};
  const reach = oscillate(t, 5, 0.25);
  return (
    <Stage camera={camera}>
            
      <Rect x={420} y={250} w={760} h={500} fill={C.panel} stroke={C.ink} strokeWidth={4} draw={p(0.7, 0.8)} seed={2480} />
      {[0, 1, 2, 3, 4].map((row) => (
        <React.Fragment key={row}>
          <Line x1={430} y1={380 + row * 90} x2={1170} y2={380 + row * 90} stroke={C.ink} strokeWidth={4} draw={p(0.9 + row * 0.1, 0.5)} seed={2490 + row} />
          {Array.from({length: 5}).map((_, i) => (
            <Book
              key={i}
              x={460 + i * 135}
              y={300 + row * 90}
              w={62}
              h={70}
              fill={[C.teal, C.amber, C.coral, C.violet, C.blue][(i + row) % 5]}
              draw={p(1.0 + row * 0.1 + i * 0.03, 0.5)}
              seed={2500 + row * 5 + i}
            />
          ))}
        </React.Fragment>
      ))}

      <Rect x={540} y={820} w={560} h={120} fill={C.panel2} stroke={C.ink} strokeWidth={4} draw={p(1.8, 0.7)} seed={2520} />
      {[0, 1, 2].map((i) => (
        <Book key={i} x={620 + i * 90} y={770} w={60} h={80} fill={i === 0 ? C.teal : i === 1 ? C.amber : C.coral} draw={p(2.0 + i * 0.15, 0.5)} seed={2530 + i} />
      ))}

      <Person x={1400} y={440} h={280} fill={C.panel2} face="happy" arms="none" draw={p(1.2, 0.8)} seed={2540} />
      <RiggedArm
        x={1320}
        y={560}
        upper={130}
        lower={120}
        shoulder={-105 + reach}
        elbow={-20 + reach * 0.4}
        draw={p(1.5, 0.8)}
        handFill={C.amber}
        seed={2550}
      >
        <rect x={-18} y={-34} width={36} height={64} fill={C.teal} stroke={C.ink} strokeWidth={3} />
      </RiggedArm>
      <Text x={1400} y={790} size={40} align="center" width={360} draw={p(2.2, 0.6)} style={{left: 1220}}>
        the librarian
      </Text>
          </Stage>
  );
};

/* 54 — Google Cloud joins in */
export const Nvidia: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(4, end - start), 0.04)};
  return (
    <Stage camera={camera}>
            
      <Cloud x={420} y={260} w={1080} h={540} fill={C.panel} stroke={C.blue} draw={p(0.8, 0.9)} seed={2560} />
      <Text x={960} y={380} size={38} align="center" width={900} color={C.blue} draw={p(1.0, 0.6)} style={{left: 510}}>
        PRIVATE CLOUD COMPUTE
      </Text>
      <Panel x={680} y={450} w={560} h={260} fill={C.panel2} draw={p(1.1, 0.8)} seed={2570} />
      <Chip x={760} y={480} w={400} h={140} fill={C.amber} label="NVIDIA GPU" draw={p(1.3, 0.7)} seed={2580} labelSize={38} />
      <Text x={960} y={740} size={30} align="center" width={700} tone="dim" draw={p(1.8, 0.6)} style={{left: 610}}>
        Google Cloud infrastructure
      </Text>

          </Stage>
  );
};

/* 55 — Match power to the job */
export const ZoomOut: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: 1.06 - 0.06 * p(0, 5)};
  const tiers = [
    {x: 250, y: 640, w: 280, h: 220, label: 'PHONE', color: C.teal, size: 50},
    {x: 760, y: 480, w: 340, h: 280, label: 'STRONGER DEVICE', color: C.amber, size: 38},
    {x: 1320, y: 300, w: 400, h: 340, label: 'CLOUD', color: C.blue, size: 50},
  ];
  return (
    <Stage camera={camera}>
            
      {tiers.map((tier, i) => (
        <React.Fragment key={tier.label}>
          <Panel
            x={tier.x}
            y={tier.y}
            w={tier.w}
            h={tier.h}
            fill={tier.color}
            label={tier.label}
            draw={p(0.8 + i * 0.3, 0.7)}
            seed={2590 + i}
            labelSize={tier.size}
            align="center"
          />
          {i < tiers.length - 1 && (
            <Arrow
              x1={tier.x + tier.w}
              y1={tier.y + tier.h / 2}
              x2={tiers[i + 1].x}
              y2={tiers[i + 1].y + tiers[i + 1].h / 2}
              color={C.ink}
              width={5}
              draw={p(1.3 + i * 0.3, 0.6)}
              seed={2600 + i}
            />
          )}
        </React.Fragment>
      ))}

            <Text x={1300} y={720} size={38} tone="dim" draw={p(2.7, 0.7)}>
        big jobs get more room
      </Text>

    </Stage>
  );
};
