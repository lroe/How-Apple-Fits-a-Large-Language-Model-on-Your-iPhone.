import React from 'react';
import {C, mix, pan, push} from '../theme';
import {Arrow, Circle, Line, Path, Rect} from '../rough';
import {
  Bar,
  Book,
  ChapterCard,
  Check,
  Chip,
  Cross,
  Panel,
  Person,
  Phone,
  Stage,
  Text,
  Token,
  useP,
  type SceneProps,
} from '../ui';

const HatIcon: React.FC<{
  x: number;
  y: number;
  w?: number;
  color: string;
  draw?: number;
  seed?: number;
}> = ({x, y, w = 90, color, draw = 1, seed = 1500}) => (
  <>
    <Rect
      x={x - w * 0.28}
      y={y - 46}
      w={w * 0.56}
      h={50}
      fill={color}
      stroke={C.ink}
      strokeWidth={3}
      draw={draw}
      seed={seed}
    />
    <Line
      x1={x - w / 2}
      y1={y + 6}
      x2={x + w / 2}
      y2={y + 6}
      stroke={C.ink}
      strokeWidth={5}
      draw={draw}
      seed={seed + 1}
    />
    <Line
      x1={x - w * 0.28}
      y1={y - 18}
      x2={x + w * 0.28}
      y2={y - 18}
      stroke={C.ink}
      strokeWidth={2.5}
      draw={draw}
      seed={seed + 2}
    />
  </>
);

/* 28 — Trick 2: no repeated homework */
export const Trick2: React.FC<SceneProps> = ({start, end}) => {
  const {t} = useP(start);
  return (
    <ChapterCard
      start={start}
      t={t}
      number="02"
      title="NO REPEATED HOMEWORK"
      kicker="the other half of memory"
      accent="teal"
      motif={
        <>
          <Book x={1250} y={370} w={230} h={300} fill={C.panel2} draw={1} seed={1510} />
          {[0, 1, 2].map((i) => (
            <Line
              key={i}
              x1={1300}
              y1={470 + i * 55}
              x2={1430 - i * 20}
              y2={466 + i * 55}
              stroke={C.teal}
              strokeWidth={4}
              draw={1}
              seed={1511 + i}
            />
          ))}
          <Line x1={1300} y1={640} x2={1380} y2={640} stroke={C.amber} strokeWidth={4} draw={1} seed={1514} />
        </>
      }
    />
  );
};

/* 29 — Look it up, do not redo it */
export const KV: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {x: pan(t, start, Math.min(6, end - start), -30, 24)};
  return (
    <Stage camera={camera}>
            
      <Panel x={120} y={310} w={300} h={420} fill={C.panel} label="EARLIER TOKENS" draw={p(0.8, 0.8)} seed={1520} labelSize={30} />
      {['the', 'phone', 'runs', 'a', 'model'].map((w, i) => (
        <Token
          key={w}
          x={150}
          y={390 + i * 62}
          w={240}
          h={48}
          label={w}
          fill={i % 2 === 0 ? C.teal : C.panel2}
          draw={p(1.0 + i * 0.1, 0.5)}
          seed={1530 + i}
          size={28}
        />
      ))}

      <Panel x={680} y={340} w={520} h={280} fill={C.panel2} label="MODEL" draw={p(1.2, 0.8)} seed={1540} labelSize={54} align="center" />
      <Text x={940} y={520} size={34} align="center" width={520} tone="dim" draw={p(1.4, 0.6)} style={{left: 680}}>
        reads the note, not the whole history
      </Text>

      <Panel x={1420} y={370} w={300} h={200} fill={C.teal} label="NEXT TOKEN" draw={p(1.6, 0.8)} seed={1550} labelSize={34} align="center" />
      <Arrow x1={430} y1={470} x2={650} y2={470} color={C.ink} width={4} draw={p(1.4, 0.6)} seed={1560} />
      <Arrow x1={1210} y1={470} x2={1390} y2={470} color={C.ink} width={4} draw={p(1.8, 0.6)} seed={1561} />

      <Panel x={680} y={720} w={520} h={220} fill={C.panel} draw={p(2.0, 0.8)} seed={1570} />
      <Text x={710} y={740} size={40} color={C.amber} draw={p(2.2, 0.6)}>
        KV CACHE
      </Text>
      <Text x={710} y={810} size={30} tone="dim" draw={p(2.4, 0.6)}>
        a notebook of past attention
      </Text>
      <Arrow x1={940} y1={690} x2={940} y2={620} color={C.amber} width={4} draw={p(2.3, 0.6)} seed={1580} />
    </Stage>
  );
};

/* 30 — The notebook grows */
export const CacheGrows: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(7, end - start), 0.035)};
  const cache = mix(0.1, 0.82, p(2.5, 4.5));
  return (
    <Stage camera={camera}>
            
      <Text x={300} y={300} size={56} draw={p(0.8, 0.6)}>
        PHONE MEMORY
      </Text>
      <Bar x={300} y={400} w={1320} h={110} value={1} fill={C.panel2} draw={p(0.9, 0.8)} track={C.panel} seed={1590} />
      <Rect x={302} y={402} w={1316 * 0.28} h={106} fill={C.teal} stroke={C.ink} strokeWidth={2.5} draw={p(1.0, 0.7)} seed={1591} />
      <Text x={320} y={425} size={30} color={C.bg} draw={p(1.1, 0.6)}>
        WEIGHTS · FIXED
      </Text>
      <Rect x={302 + 1316 * 0.28} y={402} w={1316 * cache} h={106} fill={C.amber} stroke={C.ink} strokeWidth={2.5} draw={p(1.2, 0.7)} seed={1592} />
      <Text x={320 + 1316 * 0.28} y={425} size={30} color={C.bg} draw={p(1.4, 0.6)}>
        KV CACHE
      </Text>

      <Line x1={300 + 1320 * 0.8} y1={370} x2={300 + 1320 * 0.8} y2={550} stroke={C.coral} strokeWidth={5} dash={[12, 8]} draw={p(1.8, 0.7)} seed={1600} />
      <Text x={300 + 1320 * 0.8 + 16} y={340} size={36} color={C.coral} draw={p(2.0, 0.6)}>
        memory limit
      </Text>

      <Text x={300} y={640} size={150} font="title" weight={700} color={C.coral} draw={p(2.8, 0.7)}>
        {Math.round(28 + cache * 100)}%
      </Text>
      <Text x={620} y={720} size={44} color={C.coral} draw={p(3.0, 0.7)}>
        over budget
      </Text>

          </Stage>
  );
};

/* 31 — Eight floors, five notebooks */
export const Building: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {y: mix(30, -40, p(0, 5))};
  const floors = Array.from({length: 8});
  return (
    <Stage camera={camera}>
            
      <Rect x={500} y={230} w={520} h={730} fill={C.panel} stroke={C.ink} strokeWidth={4} draw={p(0.8, 0.8)} seed={1610} />
      {floors.map((_, i) => {
        const y = 240 + i * 90;
        const shared = i <= 2;
        const source = i === 3;
        return (
          <React.Fragment key={i}>
            <Rect
              x={512}
              y={y + 8}
              w={496}
              h={74}
              fill={source ? C.amber : shared ? C.teal : C.panel2}
              stroke={C.ink}
              strokeWidth={2.5}
              draw={p(1.0 + i * 0.08, 0.5)}
              seed={1620 + i}
            />
            <Text x={540} y={y + 30} size={36} color={shared ? C.bg : C.ink} draw={p(1.1 + i * 0.08, 0.5)}>
              floor {8 - i}
            </Text>
            <Book x={900} y={y + 18} w={48} h={54} fill={source ? C.coral : C.panel} draw={p(1.2 + i * 0.08, 0.5)} seed={1630 + i} />
          </React.Fragment>
        );
      })}

      {[0, 1, 2].map((i) => (
        <Arrow
          key={i}
          x1={1050}
          y1={280 + i * 90}
          x2={1130}
          y2={640}
          color={C.teal}
          width={4}
          curve={40 + i * 20}
          draw={p(2.2 + i * 0.2, 0.6)}
          seed={1650 + i}
        />
      ))}
      <Text x={1160} y={470} size={40} color={C.teal} draw={p(2.6, 0.7)}>
        read floor 5
      </Text>
      <Text x={1160} y={530} size={30} tone="dim" draw={p(2.8, 0.7)}>
        instead of storing three copies
      </Text>

      <Text x={1180} y={730} size={170} font="title" weight={700} color={C.coral} draw={p(3.0, 0.7)}>
        37.5%
      </Text>
      <Text x={1190} y={880} size={44} tone="dim" draw={p(3.2, 0.7)}>
        less cache
      </Text>
    </Stage>
  );
};

/* 32 — Do not forget the cache */
export const CacheLesson: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(4, end - start), 0.04)};
  return (
    <Stage camera={camera}>
      <Panel x={180} y={320} w={300} h={440} fill={C.panel} draw={p(0.7, 0.8)} seed={1660} />
      {Array.from({length: 9}).map((_, i) => (
        <Line key={i} x1={210} y1={380 + i * 38} x2={450} y2={376 + i * 38} stroke={C.ink} strokeWidth={3} draw={p(0.9 + i * 0.05, 0.5)} seed={1670 + i} opacity={0.65} />
      ))}
      <Text x={180} y={800} size={40} tone="dim" draw={p(1.4, 0.6)}>
        long document
      </Text>

      <Arrow x1={520} y1={540} x2={620} y2={540} color={C.coral} width={5} draw={p(1.5, 0.6)} seed={1680} />
      <Rect x={650} y={460} w={900} h={140} fill={C.panel2} stroke={C.ink} strokeWidth={4} draw={p(1.6, 0.8)} seed={1681} />
      <Rect x={652} y={462} w={313} h={136} fill={C.teal} stroke={C.ink} strokeWidth={2.5} draw={p(1.7, 0.7)} seed={1682} />
      <Rect x={965} y={462} w={628} h={136} fill={C.coral} stroke={C.ink} strokeWidth={2.5} draw={p(1.9, 0.7)} seed={1683} />
      <Text x={680} y={505} size={30} color={C.bg} draw={p(1.8, 0.6)}>
        weights
      </Text>
      <Text x={1000} y={505} size={30} color={C.bg} draw={p(2.0, 0.6)}>
        cache
      </Text>
      <Line x1={1550} y1={430} x2={1550} y2={630} stroke={C.coral} strokeWidth={4} dash={[10, 7]} draw={p(2.2, 0.6)} seed={1684} />
      <Text x={1550} y={400} size={30} color={C.coral} draw={p(2.3, 0.6)}>
        over budget
      </Text>
      <Cross x={1640} y={650} size={60} color={C.coral} draw={p(2.5, 0.6)} />
    </Stage>
  );
};

/* 33 — Trick 3: one brain, many hats */
export const Trick3: React.FC<SceneProps> = ({start, end}) => {
  const {t} = useP(start);
  return (
    <ChapterCard
      start={start}
      t={t}
      number="03"
      title="ONE BRAIN, MANY HATS"
      kicker="one hat per job"
      accent="amber"
      motif={
        <>
          <Person x={1280} y={470} h={250} fill={C.panel2} face="happy" arms="none" draw={1} seed={1690} />
          {[
            {x: 1140, c: C.teal},
            {x: 1280, c: C.coral},
            {x: 1420, c: C.violet},
          ].map((h, i) => (
            <HatIcon key={i} x={h.x} y={420} w={100} color={h.c} draw={1} seed={1700 + i * 3} />
          ))}
          <Line x1={1060} y1={450} x2={1500} y2={450} stroke={C.ink} strokeWidth={4} draw={1} seed={1720} />
        </>
      }
    />
  );
};

/* 34 — One phone, many features */
export const ManyFeatures: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {x: pan(t, start, Math.min(6, end - start), -24, 24)};
  const features = [
    {label: 'SUMMARIES', color: C.teal},
    {label: 'REWRITE', color: C.amber},
    {label: 'KEY FACTS', color: C.coral},
  ];
  return (
    <Stage camera={camera}>
            
      {features.map((f, i) => (
        <React.Fragment key={f.label}>
          <Panel
            x={160 + i * 560}
            y={300}
            w={480}
            h={150}
            fill={f.color}
            label={f.label}
            draw={p(0.8 + i * 0.2, 0.7)}
            seed={1730 + i}
            labelSize={38}
            align="center"
          />
          <Arrow
            x1={400 + i * 560}
            y1={480}
            x2={400 + i * 560}
            y2={590}
            color={C.ink}
            width={3}
            draw={p(1.2 + i * 0.2, 0.5)}
            seed={1740 + i}
          />
          <Panel
            x={160 + i * 560}
            y={610}
            w={480}
            h={190}
            fill={C.panel}
            label="BASE MODEL"
            sub="3B"
            draw={p(1.4 + i * 0.2, 0.7)}
            seed={1750 + i}
            labelSize={34}
            subSize={54}
            align="center"
          />
        </React.Fragment>
      ))}

      <Cross x={800} y={900} size={50} color={C.coral} draw={p(2.4, 0.6)} />
      <Text x={960} y={875} size={38} align="center" width={500} color={C.coral} draw={p(2.5, 0.6)} style={{left: 710}}>
        three copies
      </Text>
          </Stage>
  );
};

/* 35 — One actor, many hats */
export const Adapters: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(6, end - start), 0.03)};
  return (
    <Stage camera={camera}>
            
      <Panel x={180} y={330} w={620} h={280} fill={C.panel} label="BASE MODEL" sub="3B PARAMETERS" draw={p(0.8, 0.8)} seed={1760} labelSize={48} />
      <Panel x={840} y={390} w={260} h={160} fill={C.teal} label="ADAPTER" draw={p(1.2, 0.7)} seed={1770} labelSize={34} align="center" />
      <Line x1={800} y1={470} x2={840} y2={470} stroke={C.teal} strokeWidth={5} draw={p(1.4, 0.5)} seed={1771} />
      <Text x={840} y={590} size={30} tone="dim" draw={p(1.6, 0.6)}>
        a few parameters
      </Text>

      <Person x={1360} y={560} h={260} fill={C.panel2} face="happy" arms="out" draw={p(1.0, 0.8)} seed={1780} />
      {[C.teal, C.amber, C.coral].map((c, i) => (
        <HatIcon key={i} x={1260 + i * 110} y={500} w={90} color={c} draw={p(1.6 + i * 0.15, 0.5)} seed={1790 + i * 3} />
      ))}
      <Line x1={1180} y1={520} x2={1540} y2={520} stroke={C.ink} strokeWidth={3} draw={p(1.5, 0.5)} seed={1800} />
      <Text x={1360} y={870} size={42} align="center" width={500} draw={p(2.0, 0.6)} style={{left: 1110}}>
        SAME ACTOR
      </Text>
          </Stage>
  );
};

/* 36 — Freeze the base */
export const LoRA: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(5, end - start), 0.035)};
  return (
    <Stage camera={camera}>
            
      <Panel x={200} y={340} w={560} h={330} fill={C.teal} label="FROZEN 3B BASE" draw={p(0.8, 0.8)} seed={1810} labelSize={44} />
      <Cross x={700} y={420} size={44} color={C.bg} draw={p(1.1, 0.6)} />
      <Text x={240} y={740} size={38} tone="dim" draw={p(1.3, 0.6)}>
        no gradients, no updates
      </Text>

      <Panel x={900} y={340} w={300} h={120} fill={C.coral} label="A" draw={p(1.4, 0.7)} seed={1820} labelSize={44} align="center" />
      <Panel x={900} y={510} w={300} h={120} fill={C.amber} label="B" draw={p(1.6, 0.7)} seed={1821} labelSize={44} align="center" />
      <Text x={900} y={680} size={32} tone="dim" draw={p(1.8, 0.6)}>
        train only these
      </Text>

      <Arrow x1={760} y1={430} x2={880} y2={400} color={C.ink} width={4} draw={p(1.7, 0.5)} seed={1830} />
      <Arrow x1={760} y1={580} x2={880} y2={570} color={C.ink} width={4} draw={p(1.8, 0.5)} seed={1831} />

      <Text x={1260} y={390} size={90} font="title" weight={700} color={C.teal} draw={p(2.2, 0.7)}>
        FAR
      </Text>
      <Text x={1260} y={500} size={90} font="title" weight={700} color={C.teal} draw={p(2.3, 0.7)}>
        CHEAPER
      </Text>
      <Text x={1260} y={620} size={32} tone="dim" draw={p(2.5, 0.7)}>
        than full training
      </Text>
    </Stage>
  );
};

/* 37 — One base, swap the hats */
export const SwapAdapters: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {x: pan(t, start, Math.min(6, end - start), -12, 12)};
  const cards = [
    {label: 'SUMMARIES', color: C.teal, y: 620},
    {label: 'REWRITE', color: C.amber, y: 720},
    {label: 'KEY FACTS', color: C.coral, y: 820},
  ];
  return (
    <Stage camera={camera}>
      <Panel x={220} y={320} w={880} h={420} fill={C.panel} label="PHONE MEMORY" draw={p(0.8, 0.8)} seed={1840} labelSize={42} />
      <Rect x={260} y={440} w={600} h={86} fill={C.teal} stroke={C.ink} strokeWidth={3} draw={p(1.0, 0.7)} seed={1850} />
      <Text x={282} y={462} size={30} color={C.bg} draw={p(1.1, 0.6)}>
        BASE MODEL · 3 GB
      </Text>
      <Rect x={900} y={440} w={160} h={86} fill={C.amber} stroke={C.ink} strokeWidth={3} draw={p(1.3, 0.7)} seed={1851} />
      <Text x={980} y={452} size={26} align="center" width={160} color={C.bg} draw={p(1.4, 0.6)} style={{left: 900}}>
        ADAPTER
      </Text>
      <Text x={980} y={480} size={22} align="center" width={160} color={C.bg} draw={p(1.5, 0.6)} style={{left: 900}}>
        SLOT
      </Text>
      <Text x={980} y={560} size={24} align="center" width={200} color={C.amber} draw={p(1.7, 0.6)} style={{left: 880}}>
        tens of MB
      </Text>
      <Text x={260} y={610} size={30} tone="dim" draw={p(1.8, 0.6)}>
        fixed base + swap small adapters
      </Text>

      {cards.map((card, i) => (
        <React.Fragment key={card.label}>
          <Panel
            x={1280}
            y={card.y}
            w={440}
            h={76}
            fill={card.color}
            label={card.label}
            draw={p(1.6 + i * 0.2, 0.6)}
            seed={1860 + i}
            labelSize={30}
            align="center"
          />
          <Arrow x1={1260} y1={card.y + 38} x2={1070} y2={483} color={C.ink} width={3} draw={p(1.8 + i * 0.2, 0.5)} seed={1870 + i} />
        </React.Fragment>
      ))}
    </Stage>
  );
};
