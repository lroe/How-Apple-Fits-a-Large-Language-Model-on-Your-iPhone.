import React from 'react';
import {C, oscillate, pan, push} from '../theme';
import {Arrow, Circle, Line, Path, Rect} from '../rough';
import {
  ChapterCard,
  Check,
  Chip,
  Cloud,
  Cross,
  Gear,
  Grid,
  Panel,
  Phone,
  Stage,
  Text,
  Token,
  useP,
  type SceneProps,
} from '../ui';

/* 38 — Trick 4: keep the chips happy */
export const Trick4: React.FC<SceneProps> = ({start, end}) => {
  const {t} = useP(start);
  return (
    <ChapterCard
      start={start}
      t={t}
      number="04"
      title="KEEP THE CHIPS HAPPY"
      kicker="feed the data right"
      accent="blue"
      motif={<Chip x={1230} y={390} w={340} h={230} fill={C.blue} label="NE" draw={1} seed={1900} labelSize={78} />}
    />
  );
};

/* 39 — Three chips, one plan */
export const Hardware: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(6, end - start), 0.03)};
  const chips = [
    {y: 260, label: 'CPU', sub: 'general work', color: C.teal},
    {y: 500, label: 'GPU', sub: 'many numbers', color: C.amber},
    {y: 740, label: 'NE', sub: 'ML, efficiently', color: C.blue},
  ];
  return (
    <Stage camera={camera}>
            
      <Panel x={160} y={400} w={360} h={260} fill={C.panel} label="MODEL" sub="3B" draw={p(0.8, 0.8)} seed={1910} labelSize={44} subSize={50} align="center" />
      {chips.map((chip, i) => (
        <React.Fragment key={chip.label}>
          <Chip
            x={900}
            y={chip.y}
            w={420}
            h={160}
            fill={chip.color}
            label={chip.label}
            sub={chip.sub}
            draw={p(1.1 + i * 0.25, 0.7)}
            seed={1920 + i}
            labelSize={56}
          />
          <Arrow
            x1={540}
            y1={530}
            x2={870}
            y2={chip.y + 80}
            color={C.ink}
            width={3.5}
            curve={i === 0 ? 30 : i === 2 ? -30 : 0}
            draw={p(1.3 + i * 0.25, 0.6)}
            seed={1930 + i}
          />
        </React.Fragment>
      ))}
    </Stage>
  );
};

/* 40 — Split it, do not copy it */
export const Layouts: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {x: pan(t, start, Math.min(4, end - start), -24, 20)};
  return (
    <Stage camera={camera}>
            
      <Text x={220} y={300} size={40} tone="dim" draw={p(0.7, 0.6)}>
        ONE ARRAY
      </Text>
      {Array.from({length: 12}).map((_, i) => (
        <Rect
          key={i}
          x={240 + i * 80}
          y={360}
          w={64}
          h={80}
          fill={i < 4 ? C.teal : i < 8 ? C.amber : C.coral}
          stroke={C.ink}
          strokeWidth={2.4}
          draw={p(0.8 + i * 0.04, 0.5)}
          seed={1940 + i}
        />
      ))}
      <Arrow x1={350} y1={480} x2={350} y2={670} color={C.ink} width={3.5} draw={p(1.4, 0.6)} seed={1960} />
      <Arrow x1={620} y1={480} x2={620} y2={670} color={C.ink} width={3.5} draw={p(1.5, 0.6)} seed={1961} />
      <Arrow x1={870} y1={480} x2={870} y2={670} color={C.ink} width={3.5} draw={p(1.6, 0.6)} seed={1962} />
      {[
        {x: 240, label: 'CPU', color: C.teal},
        {x: 500, label: 'GPU', color: C.amber},
        {x: 760, label: 'NE', color: C.coral},
      ].map((c, i) => (
        <React.Fragment key={c.label}>
          <Panel x={c.x} y={690} w={220} h={120} fill={c.color} label={c.label} draw={p(1.6 + i * 0.2, 0.6)} seed={1970 + i} labelSize={44} align="center" />
        </React.Fragment>
      ))}

      <Panel x={1200} y={390} w={420} h={300} fill={C.panel} draw={p(1.8, 0.8)} seed={1990} />
      <Rect x={1270} y={460} w={130} h={160} fill={C.panel2} stroke={C.ink} strokeWidth={3} draw={p(2.0, 0.6)} seed={1991} />
      <Rect x={1420} y={460} w={130} h={160} fill={C.panel2} stroke={C.ink} strokeWidth={3} draw={p(2.1, 0.6)} seed={1992} />
      <Text x={1345} y={520} size={44} align="center" width={100} draw={p(2.0, 0.5)} style={{left: 1295}}>
        copy
      </Text>
      <Text x={1495} y={520} size={44} align="center" width={100} draw={p(2.1, 0.5)} style={{left: 1445}}>
        copy
      </Text>
      <Cross x={1410} y={390} size={80} color={C.coral} draw={p(2.4, 0.6)} />
      <Text x={1200} y={740} size={38} color={C.coral} draw={p(2.5, 0.6)}>
        no extra copies
      </Text>
    </Stage>
  );
};

/* 41 — Moving boxes */
export const MovingBoxes: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {x: pan(t, start, Math.min(6, end - start), 20, -24)};
  return (
    <Stage camera={camera}>
            
      <Text x={160} y={320} size={42} color={C.coral} draw={p(0.7, 0.6)}>
        COPY EACH STEP
      </Text>
      <Line x1={160} y1={380} x2={1760} y2={380} stroke={C.ink} strokeWidth={3} draw={p(0.8, 0.6)} seed={2000} opacity={0.35} />
      {[0, 1, 2, 3].map((i) => (
        <React.Fragment key={i}>
          <Rect x={200 + i * 380} y={430} w={110} h={90} fill={C.coral} stroke={C.ink} strokeWidth={3} draw={p(1.0 + i * 0.15, 0.5)} seed={2010 + i} />
          <Arrow x1={320 + i * 380} y1={475} x2={420 + i * 380} y2={475} color={C.ink} width={3} draw={p(1.1 + i * 0.15, 0.5)} seed={2020 + i} />
        </React.Fragment>
      ))}
      <Circle cx={1680} cy={475} d={110} stroke={C.ink} strokeWidth={4} draw={p(1.8, 0.6)} seed={2030} />
      <Text x={1680} y={455} size={34} align="center" width={120} color={C.coral} draw={p(2.0, 0.5)} style={{left: 1620}}>
        hours
      </Text>

      <Text x={160} y={650} size={42} color={C.teal} draw={p(2.2, 0.6)}>
        PACKED, ONE TRIP
      </Text>
      <Line x1={160} y1={710} x2={1760} y2={710} stroke={C.ink} strokeWidth={3} draw={p(2.3, 0.6)} seed={2040} opacity={0.35} />
      <Rect x={260} y={760} w={260} h={150} fill={C.teal} stroke={C.ink} strokeWidth={3} draw={p(2.4, 0.7)} seed={2050} />
      {[0, 1, 2].map((i) => (
        <Rect key={i} x={300 + i * 60} y={790} w={40} h={40} fill={C.panel2} stroke={C.ink} strokeWidth={2} draw={p(2.5 + i * 0.1, 0.5)} seed={2060 + i} />
      ))}
      <Arrow x1={540} y1={835} x2={1500} y2={835} color={C.teal} width={5} draw={p(2.8, 0.7)} seed={2070} />
      <Check x={1600} y={835} size={60} color={C.teal} draw={p(3.0, 0.6)} />
          </Stage>
  );
};

/* 42 — Trick 5: ask for help */
export const Trick5: React.FC<SceneProps> = ({start, end}) => {
  const {t} = useP(start);
  return (
    <ChapterCard
      start={start}
      t={t}
      number="05"
      title="ASK FOR HELP"
      kicker="phone first, cloud second"
      accent="blue"
      motif={<Cloud x={1220} y={360} w={430} h={270} fill={C.panel} stroke={C.blue} draw={1} seed={2080} />}
    />
  );
};

/* 43 — Phone first, cloud second */
export const PhoneVsCloud: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {x: pan(t, start, Math.min(6, end - start), -20, 24)};
  return (
    <Stage camera={camera}>
            
      <Phone x={180} y={280} w={340} h={580} draw={p(0.8, 0.9)} seed={2090}>
        {['SUMMARIZE', 'FIND FACTS', 'SORT'].map((label, i) => (
          <Token
            key={label}
            x={215}
            y={380 + i * 110}
            w={270}
            h={72}
            label={label}
            fill={i === 0 ? C.teal : i === 1 ? C.amber : C.coral}
            draw={p(1.1 + i * 0.18, 0.6)}
            seed={2100 + i}
            size={26}
          />
        ))}
      </Phone>
      <Text x={180} y={900} size={38} tone="dim" draw={p(1.8, 0.6)}>
        3B on-device model
      </Text>

      <Arrow x1={560} y1={550} x2={1080} y2={550} color={C.coral} width={6} draw={p(2.0, 0.6)} seed={2110} />
      <Text x={820} y={470} size={40} align="center" width={300} color={C.coral} draw={p(2.2, 0.6)} style={{left: 670}}>
        hard job
      </Text>

      <Cloud x={1120} y={300} w={560} h={360} fill={C.panel} stroke={C.blue} draw={p(1.6, 0.8)} seed={2120} />
      <Text x={1400} y={380} size={48} align="center" width={520} color={C.blue} draw={p(1.8, 0.6)} style={{left: 1140}}>
        PRIVATE CLOUD
      </Text>
      <Text x={1400} y={450} size={48} align="center" width={520} color={C.blue} draw={p(1.9, 0.6)} style={{left: 1140}}>
        COMPUTE
      </Text>
      <Text x={1400} y={520} size={30} align="center" width={520} tone="dim" draw={p(2.2, 0.6)} style={{left: 1140}}>
        only when the phone cannot
      </Text>

          </Stage>
  );
};

/* 44 — A protected space */
export const PCC: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(4, end - start), 0.04)};
  return (
    <Stage camera={camera}>
            
      <Cloud x={520} y={280} w={880} h={520} fill={C.panel} stroke={C.blue} draw={p(0.8, 0.9)} seed={2130} />
      <Rect x={760} y={430} w={400} h={260} fill={C.panel2} stroke={C.ink} strokeWidth={4} draw={p(1.2, 0.7)} seed={2140} />
      {Array.from({length: 6}).map((_, i) => (
        <Line key={i} x1={790} y1={470 + i * 34} x2={1130} y2={466 + i * 34} stroke={C.teal} strokeWidth={4} draw={p(1.4 + i * 0.08, 0.5)} seed={2150 + i} opacity={0.7} />
      ))}
      <Text x={960} y={700} size={40} align="center" width={420} color={C.teal} draw={p(2.0, 0.6)} style={{left: 750}}>
        verified server
      </Text>

      <Rect x={920} y={830} w={80} h={70} fill={C.amber} stroke={C.ink} strokeWidth={3} draw={p(2.2, 0.6)} seed={2160} />
      <Path d="M 935 830 V 805 Q 960 770 985 805 V 830" stroke={C.amber} strokeWidth={6} draw={p(2.3, 0.6)} seed={2161} />
      <Text x={960} y={960} size={34} align="center" width={300} color={C.amber} draw={p(2.4, 0.6)} style={{left: 810}}>
        locked
      </Text>

      {[0, 1].map((i) => (
        <React.Fragment key={i}>
          <Arrow x1={220 + i * 80} y1={440 + i * 80} x2={470} y2={440 + i * 80} color={C.coral} width={5} draw={p(2.6 + i * 0.15, 0.6)} seed={2170 + i} />
          <Cross x={370} y={440 + i * 80} size={44} color={C.coral} draw={p(2.8 + i * 0.15, 0.5)} />
        </React.Fragment>
      ))}
      <Text x={220} y={580} size={36} color={C.coral} draw={p(3.0, 0.6)}>
        outsiders
      </Text>
          </Stage>
  );
};

/* 45 — Locked all the way there */
export const Encryption: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {x: pan(t, start, Math.min(6, end - start), -24, 24)};
  return (
    <Stage camera={camera}>
            
      <Phone x={160} y={320} w={280} h={520} draw={p(0.8, 0.9)} seed={2180} />
      <Text x={160} y={880} size={36} tone="dim" draw={p(1.2, 0.6)}>
        your iPhone
      </Text>

      <Arrow x1={460} y1={570} x2={660} y2={570} color={C.amber} width={5} draw={p(1.4, 0.6)} seed={2190} />
      <Rect x={700} y={470} w={220} h={160} fill={C.amber} stroke={C.ink} strokeWidth={4} draw={p(1.5, 0.7)} seed={2191} />
      <Path d="M 700 470 L 810 560 L 920 470" stroke={C.bg} strokeWidth={5} draw={p(1.7, 0.6)} seed={2192} opacity={0.55} />
      <Text x={810} y={430} size={36} align="center" width={260} color={C.amber} draw={p(1.7, 0.6)} style={{left: 680}}>
        ENCRYPTED
      </Text>
      <Text x={810} y={670} size={28} align="center" width={280} tone="dim" draw={p(1.9, 0.6)} style={{left: 670}}>
        locked envelope
      </Text>

      <Arrow x1={940} y1={570} x2={1140} y2={570} color={C.amber} width={5} draw={p(2.0, 0.6)} seed={2200} />
      <Panel x={1180} y={400} w={480} h={340} fill={C.panel} label="VERIFIED SERVER" draw={p(2.1, 0.8)} seed={2210} labelSize={40} />
      {Array.from({length: 5}).map((_, i) => (
        <Line key={i} x1={1220} y1={500 + i * 40} x2={1620} y2={496 + i * 40} stroke={C.teal} strokeWidth={4} draw={p(2.3 + i * 0.08, 0.5)} seed={2220 + i} opacity={0.7} />
      ))}

          </Stage>
  );
};

/* 46 — Many experts, a few awake */
export const MoE: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(7, end - start), 0.03)};
  return (
    <Stage camera={camera}>
            
      <Panel x={160} y={380} w={260} h={180} fill={C.teal} label="PROMPT" draw={p(0.8, 0.7)} seed={2230} labelSize={40} align="center" />
      <Arrow x1={450} y1={470} x2={620} y2={470} color={C.ink} width={4} draw={p(1.1, 0.6)} seed={2240} />

      <Grid
        x={660}
        y={300}
        cols={4}
        rows={4}
        cell={80}
        gap={14}
        fill={(r, c) => ((r === 1 && c === 0) || (r === 2 && c === 2) || (r === 3 && c === 1) ? C.amber : C.panel2)}
        draw={p(1.2, 0.9)}
        seed={2250}
      />
      <Text x={660} y={760} size={38} tone="dim" draw={p(1.8, 0.6)}>
        expert grid
      </Text>

      {[0, 1, 2].map((i) => (
        <React.Fragment key={i}>
          <Arrow x1={1080} y1={470} x2={1220} y2={300 + i * 160} color={C.ink} width={3.5} curve={i === 1 ? 0 : i === 0 ? 20 : -20} draw={p(1.9 + i * 0.15, 0.5)} seed={2270 + i} />
          <Panel x={1240} y={250 + i * 160} w={400} h={100} fill={i === 1 ? C.teal : C.panel} label={`TRACK ${i + 1}`} draw={p(2.0 + i * 0.15, 0.6)} seed={2280 + i} labelSize={30} align="center" />
        </React.Fragment>
      ))}
      <Text x={1240} y={760} size={34} tone="dim" draw={p(2.6, 0.7)}>
        a few experts, in parallel
      </Text>
    </Stage>
  );
};

/* 47 — Two gears */
export const TwoGears: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: 1.04 - 0.04 * p(0, 3)};
  const spin = oscillate(t, 20, 0.12);
  return (
    <Stage camera={camera}>
            
      <Gear x={760} y={560} r={180} fill={C.panel2} stroke={C.teal} rotate={spin} draw={p(0.8, 0.9)} seed={2290} />
      <Gear x={1060} y={560} r={130} fill={C.panel2} stroke={C.blue} rotate={-spin * 1.4 + 10} draw={p(1.1, 0.9)} seed={2291} />
      <Text x={760} y={800} size={54} align="center" width={360} draw={p(1.5, 0.6)} style={{left: 580}}>
        PHONE
      </Text>
      <Text x={1060} y={770} size={54} align="center" width={360} draw={p(1.7, 0.6)} style={{left: 880}}>
        CLOUD
      </Text>
      <Text x={760} y={870} size={30} align="center" width={360} tone="dim" draw={p(1.9, 0.6)} style={{left: 580}}>
        when you can
      </Text>
      <Text x={1060} y={840} size={30} align="center" width={300} tone="dim" draw={p(2.0, 0.6)} style={{left: 910}}>
        when you must
      </Text>
    </Stage>
  );
};
