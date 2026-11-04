import React from 'react';
import {C, mix, pan, push} from '../theme';
import {Arrow, Circle, Line, Path, Rect} from '../rough';
import {
  Bar,
  ChapterCard,
  Chip,
  Panel,
  Phone,
  Stage,
  Text,
  Token,
  Wall,
  useP,
  type SceneProps,
} from '../ui';

/* 01 — A model in your pocket */
export const Hero: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(6, end - start), 0.035)};

  const nodes: [number, number, number, string][] = [
    [430, 250, 24, C.coral],
    [300, 300, 18, C.teal],
    [560, 300, 18, C.teal],
    [240, 450, 18, C.teal],
    [235, 600, 18, C.teal],
    [620, 450, 18, C.teal],
    [615, 600, 18, C.teal],
    [320, 800, 18, C.teal],
    [430, 850, 24, C.coral],
    [540, 800, 18, C.teal],
  ];
  const ring: [number, number, number, number][] = [
    [430, 250, 300, 300],
    [300, 300, 240, 450],
    [240, 450, 235, 600],
    [235, 600, 320, 800],
    [320, 800, 430, 850],
    [430, 850, 540, 800],
    [540, 800, 615, 600],
    [615, 600, 620, 450],
    [620, 450, 560, 300],
    [560, 300, 430, 250],
  ];
  const spokes: [number, number, number, number][] = [
    [430, 250, 430, 350],
    [300, 300, 360, 350],
    [560, 300, 500, 350],
    [240, 450, 260, 460],
    [235, 600, 260, 580],
    [620, 450, 600, 460],
    [615, 600, 600, 580],
    [320, 800, 360, 690],
    [430, 850, 430, 690],
    [540, 800, 500, 690],
  ];

  return (
    <Stage camera={camera} full>
      <Phone x={170} y={80} w={560} h={920} draw={p(0.15, 1.1)} seed={201}>
        <Chip
          x={300}
          y={390}
          w={260}
          h={260}
          fill={C.violet}
          label="3B"
          labelSize={68}
          draw={p(1.0, 0.8)}
          seed={210}
        />
        {ring.map(([x1, y1, x2, y2], i) => (
          <Line
            key={`r${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={C.ink}
            strokeWidth={2}
            draw={p(1.7 + i * 0.04, 0.5)}
            seed={220 + i}
            opacity={0.85}
          />
        ))}
        {spokes.map(([x1, y1, x2, y2], i) => (
          <Line
            key={`s${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={C.ink}
            strokeWidth={2.2}
            draw={p(2.0 + i * 0.035, 0.5)}
            seed={240 + i}
            opacity={0.85}
          />
        ))}
        <Line x1={430} y1={250} x2={430} y2={350} stroke={C.coral} strokeWidth={4} draw={p(2.3, 0.5)} seed={260} />
        <Line x1={620} y1={450} x2={600} y2={460} stroke={C.coral} strokeWidth={4} draw={p(2.4, 0.5)} seed={261} />
        {nodes.map(([cx, cy, d, fill], i) => (
          <Circle
            key={`n${i}`}
            cx={cx}
            cy={cy}
            d={d}
            fill={fill}
            stroke={C.bg}
            strokeWidth={2}
            draw={p(2.5 + i * 0.05, 0.45)}
            seed={280 + i}
          />
        ))}
      </Phone>

      <Text x={820} y={220} size={215} font="title" weight={700} draw={p(3.2, 0.7)}>
        3 BILLION
      </Text>
      <Text x={820} y={460} size={172} font="title" weight={700} color={C.coral} draw={p(3.8, 0.7)}>
        PARAMETERS
      </Text>
      <Text x={820} y={650} size={108} font="title" weight={700} draw={p(4.4, 0.7)}>
        IN YOUR POCKET
      </Text>
      <Line
        x1={824}
        y1={810}
        x2={824 + 700 * p(4.9, 0.7)}
        y2={806}
        stroke={C.teal}
        strokeWidth={8}
        draw={p(4.9, 0.7)}
        seed={300}
      />
          </Stage>
  );
};

/* 02 — One model, three jobs */
export const ThreeJobs: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {y: 50};
  const cards = [
    {x: 160, label: 'SUMMARIZE', accent: C.teal, n: '01'},
    {x: 730, label: 'FIND FACTS', accent: C.amber, n: '02'},
    {x: 1300, label: 'SORT', accent: C.coral, n: '03'},
  ];
  return (
    <Stage camera={camera}>
                  {cards.map((card, i) => (
        <React.Fragment key={card.label}>
          <Panel
            x={card.x}
            y={310}
            w={460}
            h={480}
            fill={C.panel}
            draw={p(0.8 + i * 0.35, 0.7)}
            seed={320 + i}
          />
          <Circle
            cx={card.x + 92}
            cy={410}
            d={82}
            fill={card.accent}
            stroke={C.ink}
            strokeWidth={3}
            draw={p(1.0 + i * 0.35, 0.6)}
            seed={330 + i}
          />
          <Text
            x={card.x + 92}
            y={380}
            size={54}
            align="center"
            width={82}
            color={C.bg}
            draw={p(1.0 + i * 0.35, 0.6)}
            style={{left: card.x + 51}}
          >
            {card.n}
          </Text>
          <Text
            x={card.x + 34}
            y={530}
            size={54}
            color={card.accent}
            draw={p(1.2 + i * 0.35, 0.6)}
          >
            {card.label}
          </Text>
          {i === 0 && (
            <>
              {[0, 1, 2, 3].map((line) => (
                <Line
                  key={line}
                  x1={card.x + 42}
                  y1={630 + line * 30}
                  x2={card.x + (line === 3 ? 270 : 390)}
                  y2={626 + line * 30}
                  stroke={C.ink}
                  strokeWidth={5}
                  draw={p(1.6, 0.6)}
                  seed={340 + line}
                  opacity={0.8}
                />
              ))}
            </>
          )}
          {i === 1 && (
            <>
              <Circle cx={card.x + 330} cy={680} d={100} stroke={C.ink} strokeWidth={5} draw={p(1.6, 0.6)} seed={350} />
              <Line x1={card.x + 385} y1={735} x2={card.x + 430} y2={780} stroke={C.ink} strokeWidth={8} draw={p(1.6, 0.6)} seed={351} />
              <Line x1={card.x + 50} y1={650} x2={card.x + 250} y2={650} stroke={C.amber} strokeWidth={7} draw={p(1.8, 0.5)} seed={352} />
              <Line x1={card.x + 50} y1={700} x2={card.x + 210} y2={700} stroke={C.amber} strokeWidth={7} draw={p(1.9, 0.5)} seed={353} />
            </>
          )}
          {i === 2 && (
            <>
              {[0, 1, 2].map((bar) => (
                <Rect
                  key={bar}
                  x={card.x + 55 + bar * 105}
                  y={750 - (70 + bar * 40)}
                  w={70}
                  h={70 + bar * 40}
                  fill={bar === 2 ? C.coral : C.panel2}
                  stroke={C.ink}
                  strokeWidth={3}
                  draw={p(1.6 + bar * 0.12, 0.5)}
                  seed={360 + bar}
                />
              ))}
              <Arrow x1={card.x + 55} y1={770} x2={card.x + 365} y2={770} color={C.coral} width={4} draw={p(2.1, 0.5)} seed={365} />
            </>
          )}
        </React.Fragment>
      ))}
    </Stage>
  );
};

/* 03 — Everything shares it */
export const Sharing: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(5, end - start), 0.035)};
  return (
    <Stage camera={camera}>
                  <Phone x={760} y={250} w={400} h={620} draw={p(0.8, 0.9)} seed={370}>
        {[
          {y: 330, h: 130, label: 'APPS', color: C.teal},
          {y: 500, h: 130, label: 'OS', color: C.amber},
          {y: 670, h: 130, label: 'MODEL', color: C.violet},
        ].map((layer, i) => (
          <React.Fragment key={layer.label}>
            <Rect
              x={800}
              y={layer.y}
              w={320}
              h={layer.h}
              fill={layer.color}
              stroke={C.ink}
              strokeWidth={3}
              draw={p(1.2 + i * 0.3, 0.6)}
              seed={380 + i}
            />
            <Text
              x={960}
              y={layer.y + 36}
              size={46}
              align="center"
              width={320}
              color={C.bg}
              draw={p(1.35 + i * 0.3, 0.6)}
              style={{left: 800}}
            >
              {layer.label}
            </Text>
          </React.Fragment>
        ))}
      </Phone>
      <Bar
        x={540}
        y={920}
        w={840}
        h={66}
        value={1}
        fill={C.teal}
        draw={p(2.6, 0.7)}
        label="ONE MEMORY"
        seed={390}
      />
      <Text x={1460} y={390} size={150} font="title" weight={700} color={C.teal} draw={p(1.8, 0.7)}>
        8 GB
      </Text>
      <Text x={1470} y={540} size={40} tone="dim" draw={p(2.1, 0.7)}>
        shared by all three
      </Text>
      <Path
        d="M 1420 330 V 850 M 1420 330 H 1350 M 1420 850 H 1350"
        stroke={C.teal}
        strokeWidth={4}
        draw={p(2.2, 0.8)}
        seed={395}
        opacity={0.7}
      />
    </Stage>
  );
};

/* 04 — No slowdown, no heat */
export const NoSlow: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(5, end - start), 0.03)};
  const gauges = [
    {x: 330, y: 360, label: 'SPEED', color: C.teal, angle: -35},
    {x: 1590, y: 360, label: 'HEAT', color: C.amber, angle: 28},
    {x: 330, y: 780, label: 'BATTERY', color: C.coral, angle: -18},
  ];
  return (
    <Stage camera={camera}>
                  <Phone x={780} y={260} w={360} h={600} draw={p(0.7, 0.9)} seed={400}>
        <Text x={960} y={440} size={64} align="center" width={360} draw={p(1.2, 0.6)} style={{left: 780}}>
          still fast
        </Text>
        <Text x={960} y={530} size={34} align="center" width={360} tone="dim" draw={p(1.5, 0.6)} style={{left: 780}}>
          no fan, no freeze
        </Text>
      </Phone>
      {gauges.map((g, i) => (
        <React.Fragment key={g.label}>
          <Circle
            cx={g.x}
            cy={g.y}
            d={170}
            stroke={C.ink}
            strokeWidth={4}
            draw={p(1.0 + i * 0.25, 0.6)}
            seed={410 + i}
          />
          <Line
            x1={g.x}
            y1={g.y}
            x2={g.x + 62 * Math.cos((g.angle * Math.PI) / 180)}
            y2={g.y + 62 * Math.sin((g.angle * Math.PI) / 180)}
            stroke={g.color}
            strokeWidth={8}
            draw={p(1.4 + i * 0.25, 0.6)}
            seed={420 + i}
          />
          <Circle cx={g.x} cy={g.y} d={16} fill={g.color} stroke={C.ink} strokeWidth={2} draw={p(1.4 + i * 0.25, 0.5)} seed={430 + i} />
          <Text x={g.x} y={g.y + 120} size={42} align="center" width={240} draw={p(1.6 + i * 0.25, 0.6)} style={{left: g.x - 120}}>
            {g.label}
          </Text>
        </React.Fragment>
      ))}
      <Line x1={330} y1={640} x2={1590} y2={640} stroke={C.ink} strokeWidth={2} draw={p(2.4, 0.6)} seed={440} opacity={0.2} />
    </Stage>
  );
};

/* 05 — How? */
export const HowQuestion: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(3, end - start), 0.05)};
  return (
    <Stage camera={camera}>
      <Text x={150} y={380} size={300} font="title" weight={700} draw={p(0.1, 0.7)}>
        HOW
      </Text>
      <Text x={760} y={420} size={280} font="label" weight={700} color={C.coral} draw={p(0.25, 0.7)}>
        ?
      </Text>
      <Text x={170} y={760} size={54} tone="dim" draw={p(0.8, 0.7)}>
        not one big trick
      </Text>
      <Phone x={1260} y={250} w={300} h={620} draw={p(0.5, 0.9)} seed={450} />
      <Circle cx={1030} cy={610} d={180} fill={C.panel2} stroke={C.ink} strokeWidth={3} draw={p(0.7, 0.7)} seed={451} />
      <Circle cx={995} cy={585} d={9} fill={C.ink} stroke={C.ink} draw={p(0.9, 0.5)} seed={452} />
      <Circle cx={1065} cy={585} d={9} fill={C.ink} stroke={C.ink} draw={p(0.9, 0.5)} seed={453} />
      <Path d="M 1000 630 Q 1030 650 1060 630" stroke={C.ink} strokeWidth={3} draw={p(1.0, 0.5)} seed={454} />
    </Stage>
  );
};

/* 06 — A pile of small decisions */
export const Decisions: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {};
  const items = [
    {x: 150, y: 300, n: '01', label: 'BITS', color: C.teal},
    {x: 720, y: 300, n: '02', label: 'CACHE', color: C.amber},
    {x: 1290, y: 300, n: '03', label: 'ADAPTERS', color: C.coral},
    {x: 150, y: 620, n: '04', label: 'CHIPS', color: C.teal},
    {x: 720, y: 620, n: '05', label: 'CLOUD', color: C.amber},
    {x: 1290, y: 620, n: '06', label: 'TRAINING', color: C.coral},
  ];
  return (
    <Stage camera={camera}>
                  {items.map((item, i) => (
        <React.Fragment key={item.label}>
          <Panel
            x={item.x}
            y={item.y}
            w={480}
            h={270}
            fill={C.panel}
            draw={p(0.8 + i * 0.22, 0.7)}
            seed={460 + i}
          />
          <Text x={item.x + 28} y={item.y + 22} size={50} color={item.color} draw={p(0.95 + i * 0.22, 0.6)} weight={700}>
            {item.n}
          </Text>
          <Text x={item.x + 28} y={item.y + 105} size={50} draw={p(1.1 + i * 0.22, 0.6)}>
            {item.label}
          </Text>
          <Line
            x1={item.x + 28}
            y1={item.y + 195}
            x2={item.x + 28 + 160 * p(1.3 + i * 0.22, 0.5)}
            y2={item.y + 195}
            stroke={item.color}
            strokeWidth={5}
            draw={p(1.3 + i * 0.22, 0.5)}
            seed={480 + i}
          />
        </React.Fragment>
      ))}
    </Stage>
  );
};

/* 07 — Tokens, not words */
export const Tokens: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(7, end - start), 0.03)};
  const blocks = [
    {x: 320, w: 210, label: 'APPLE', fill: C.teal},
    {x: 548, w: 160, label: 'FITS', fill: C.amber},
    {x: 726, w: 92, label: 'A', fill: C.coral},
    {x: 836, w: 220, label: 'MODEL', fill: C.teal},
    {x: 1074, w: 280, label: 'ON YOUR', fill: C.amber},
    {x: 1372, w: 228, label: 'PHONE', fill: C.coral},
  ];
  return (
    <Stage camera={camera}>
                  {blocks.map((b, i) => (
        <Token
          key={b.label}
          x={b.x}
          y={300}
          w={b.w}
          h={110}
          label={b.label}
          fill={b.fill}
          draw={p(0.9 + i * 0.18, 0.6)}
          seed={500 + i}
          size={52}
          rotate={i % 2 === 0 ? -1.2 : 0.8}
        />
      ))}
      <Text x={960} y={470} size={38} align="center" width={500} tone="dim" draw={p(2.2, 0.6)}>
        in
      </Text>
      <Arrow x1={960} y1={505} x2={960} y2={590} color={C.ink} width={3} draw={p(2.3, 0.6)} seed={520} />
      {[0, 1, 2].map((i) => (
        <React.Fragment key={i}>
          <Rect
            x={560}
            y={610 + i * 82}
            w={800}
            h={58}
            fill={C.panel2}
            stroke={C.ink}
            strokeWidth={2.5}
            draw={p(2.4 + i * 0.18, 0.6)}
            seed={530 + i}
          />
          <Text
            x={610}
            y={622 + i * 82}
            size={32}
            tone="dim"
            draw={p(2.55 + i * 0.18, 0.6)}
          >
            layer {i + 1}
          </Text>
          {blocks.slice(0, 3).map((b, j) => (
            <Circle
              key={j}
              cx={1100 + j * 60}
              cy={639 + i * 82}
              d={20}
              fill={[C.teal, C.amber, C.coral][j]}
              stroke={C.ink}
              strokeWidth={2}
              draw={p(2.6 + i * 0.18 + j * 0.03, 0.5)}
              seed={540 + i * 3 + j}
            />
          ))}
        </React.Fragment>
      ))}
      <Arrow x1={960} y1={870} x2={960} y2={930} color={C.ink} width={3} draw={p(3.2, 0.6)} seed={560} />
      <Token x={740} y={950} w={440} h={86} label="NEXT TOKEN" fill={C.teal} draw={p(3.3, 0.7)} seed={561} size={44} />
    </Stage>
  );
};

/* 08 — Two walls */
export const TwoWalls: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: 1.04 - 0.04 * p(0, 2.2)};
  return (
    <Stage camera={camera}>
      <Wall x={300} y={250} w={500} h={520} fill={C.teal} draw={p(0.2, 0.6)} seed={570} />
      <Wall x={1120} y={250} w={500} h={520} fill={C.amber} draw={p(0.35, 0.6)} seed={580} />
      <Text x={550} y={820} size={130} align="center" width={500} draw={p(0.5, 0.5)} weight={700}>
        SPACE
      </Text>
      <Text x={1370} y={820} size={130} align="center" width={500} draw={p(0.65, 0.5)} weight={700}>
        SPEED
      </Text>
    </Stage>
  );
};
