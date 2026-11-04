import React from 'react';
import {C, fontLabel, oscillate, pan, push} from '../theme';
import {Arrow, Circle, Line, Path, Rect} from '../rough';
import {
  Bar,
  Check,
  Chip,
  Cross,
  Panel,
  Person,
  Phone,
  RiggedArm,
  Stage,
  Text,
  Wall,
  useP,
  type SceneProps,
} from '../ui';

/* 09 — Wall one: space */
export const Space: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(5, end - start), 0.035)};
  const barX = 250;
  const barY = 560;
  const barW = 1420;
  const barH = 170;
  return (
    <Stage camera={camera}>
      <Text x={1180} y={150} size={220} font="title" weight={700} color={C.coral} draw={p(0.2, 0.7)}>
        6 GB
      </Text>
      <Text x={1200} y={440} size={44} tone="dim" draw={p(0.5, 0.6)}>
        of 16-bit weights
      </Text>

      <Text x={barX} y={barY - 100} size={52} draw={p(0.7, 0.6)}>
        8 GB MEMORY
      </Text>
      <Rect x={barX} y={barY} w={barW} h={barH} fill={C.panel2} stroke={C.ink} strokeWidth={4} draw={p(0.8, 0.8)} seed={600} />
      <Rect x={barX + 2} y={barY + 2} w={(barW - 4) * 0.75} h={barH - 4} fill={C.coral} stroke={C.ink} strokeWidth={2.5} draw={p(0.9, 0.7)} seed={601} />
      <Rect x={barX + 2 + (barW - 4) * 0.75} y={barY + 2} w={(barW - 4) * 0.25} h={barH - 4} fill={C.teal} stroke={C.ink} strokeWidth={2.5} draw={p(1.3, 0.6)} seed={602} />
      <Text x={barX + 40} y={barY + 55} size={40} color={C.bg} draw={p(1.1, 0.6)}>
        6 GB · 16-BIT WEIGHTS
      </Text>
      <Text x={barX + (barW - 4) * 0.75 + 24} y={barY + 55} size={32} color={C.bg} draw={p(1.4, 0.6)}>
        2 GB LEFT
      </Text>

      <Line x1={barX} y1={barY + barH + 50} x2={barX + barW} y2={barY + barH + 50} stroke={C.ink} strokeWidth={3} draw={p(1.6, 0.6)} seed={603} opacity={0.5} />
      <Text x={barX} y={barY + barH + 80} size={52} tone="dim" draw={p(1.8, 0.6)}>
        6 GB of 8 GB
      </Text>

    </Stage>
  );
};

/* 10 — And everything else */
export const OtherMemory: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {x: pan(t, start, Math.min(6, end - start), -20, 20)};
  const chunks = [
    {label: 'PROMPT', value: 0.26, color: C.teal},
    {label: 'CALCULATIONS', value: 0.22, color: C.amber},
    {label: 'TEMP RESULTS', value: 0.2, color: C.coral},
    {label: 'OS', value: 0.17, color: C.teal},
    {label: 'APPS', value: 0.15, color: C.amber},
  ];
  let cursor = 0;
  return (
    <Stage camera={camera}>
      <Text x={1180} y={200} size={220} font="title" weight={700} color={C.teal} draw={p(0.2, 0.7)}>
        2 GB
      </Text>
      <Text x={1200} y={520} size={44} tone="dim" draw={p(0.5, 0.6)}>
        left for everything else
      </Text>

      <Rect
        x={250}
        y={620}
        w={1420}
        h={170}
        fill={C.panel2}
        stroke={C.ink}
        strokeWidth={4}
        draw={p(0.8, 0.8)}
        seed={620}
      />
      {chunks.map((chunk, i) => {
        const x = 252 + 1416 * cursor;
        const w = 1416 * chunk.value;
        cursor += chunk.value;
        return (
          <React.Fragment key={chunk.label}>
            <Rect
              x={x}
              y={622}
              w={w - 4}
              h={166}
              fill={chunk.color}
              stroke={C.ink}
              strokeWidth={2.5}
              draw={p(0.9 + i * 0.18, 0.6)}
              seed={630 + i}
            />
            <Text
              x={x + w / 2}
              y={650}
              size={chunk.label === 'CALCULATIONS' || chunk.label === 'TEMP RESULTS' ? 26 : 30}
              align="center"
              width={w}
              color={C.bg}
              draw={p(1.0 + i * 0.18, 0.6)}
              style={{left: x}}
            >
              {chunk.label}
            </Text>
          </React.Fragment>
        );
      })}

      <Line x1={250} y1={830} x2={1670} y2={830} stroke={C.ink} strokeWidth={3} draw={p(2.0, 0.6)} seed={650} opacity={0.5} />
      <Text x={250} y={870} size={46} tone="dim" draw={p(2.2, 0.6)}>
        one shared pool
      </Text>
    </Stage>
  );
};

/* 11 — Wall two: speed */
export const Speed: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {x: pan(t, start, Math.min(6, end - start), -30, 20)};
  return (
    <Stage camera={camera}>
            
      <Panel x={150} y={340} w={340} h={240} fill={C.panel} label="MEMORY" draw={p(0.8, 0.7)} seed={660} labelSize={46} />
      {[0, 1, 2].map((i) => (
        <Arrow
          key={i}
          x1={510}
          y1={390 + i * 70}
          x2={740}
          y2={390 + i * 70}
          color={i === 1 ? C.coral : C.ink}
          width={i === 1 ? 5 : 3}
          draw={p(1.2 + i * 0.18, 0.6)}
          seed={670 + i}
        />
      ))}
      <Text x={625} y={300} size={32} align="center" width={240} tone="dim" draw={p(1.6, 0.6)} style={{left: 505}}>
        again & again
      </Text>

      <Chip x={770} y={340} w={300} h={240} fill={C.amber} label="CHIP" draw={p(1.0, 0.7)} seed={680} labelSize={52} />
      <Arrow x1={1110} y1={460} x2={1260} y2={460} color={C.ink} width={4} draw={p(1.9, 0.6)} seed={681} />

      <Circle cx={1440} cy={460} d={220} stroke={C.ink} strokeWidth={5} draw={p(1.4, 0.8)} seed={690} />
      {[0, 1, 2, 3].map((i) => (
        <Line
          key={i}
          x1={1440}
          y1={460}
          x2={1440 + 72 * Math.cos((i * Math.PI) / 2)}
          y2={460 + 72 * Math.sin((i * Math.PI) / 2)}
          stroke={C.ink}
          strokeWidth={4}
          draw={p(1.5, 0.6)}
          seed={691 + i}
          opacity={0.6}
        />
      ))}
      <Line
        x1={1440}
        y1={460}
        x2={1440 + 95 * Math.sin(((18 + oscillate(t, 8, 0.35)) * Math.PI) / 180)}
        y2={460 - 95 * Math.cos(((18 + oscillate(t, 8, 0.35)) * Math.PI) / 180)}
        stroke={C.coral}
        strokeWidth={7}
        draw={p(1.7, 0.6)}
        seed={695}
      />
      <Circle cx={1440} cy={460} d={18} fill={C.coral} stroke={C.ink} strokeWidth={2} draw={p(1.7, 0.5)} seed={696} />
      <Text x={1440} y={640} size={64} align="center" width={300} color={C.coral} draw={p(2.3, 0.7)} style={{left: 1290}}>
        WAITING
      </Text>

    </Stage>
  );
};

/* 12 — The chef and the helper */
export const Chef: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(6, end - start), 0.03)};
  const sway = oscillate(t, 12, 0.32);
  return (
    <Stage camera={camera}>
            
      <Person x={540} y={480} h={280} fill={C.panel2} hat="chef" face="happy" arms="out" draw={p(0.8, 0.8)} seed={700} />
      <Text x={540} y={800} size={46} align="center" width={300} draw={p(1.2, 0.6)} style={{left: 390}}>
        FAST CHEF
      </Text>

      <Person x={1380} y={500} h={260} fill={C.panel} hat="cap" face="worried" arms="none" draw={p(1.0, 0.8)} seed={710} />
      <Text x={1380} y={810} size={44} align="center" width={320} draw={p(1.4, 0.6)} style={{left: 1220}}>
        SLOW HELPER
      </Text>

      <RiggedArm
        x={1310}
        y={660}
        upper={120}
        lower={100}
        shoulder={160 + sway * 0.6}
        elbow={50 + sway * 0.3}
        draw={p(1.5, 0.8)}
        handFill={C.amber}
        seed={720}
      >
        <g transform="rotate(-8)" opacity={p(1.8, 0.6)}>
          <rect x={-32} y={-24} width={64} height={48} fill={C.amber} stroke={C.ink} strokeWidth={3} />
        </g>
      </RiggedArm>
      <Text x={1110} y={780} size={26} align="center" width={220} tone="dim" draw={p(2.0, 0.5)} style={{left: 1000}}>
        ingredients
      </Text>

      <Circle cx={900} cy={250} d={150} stroke={C.ink} strokeWidth={5} draw={p(1.6, 0.8)} seed={730} />
      <Line
        x1={900}
        y1={250}
        x2={900 + 60 * Math.sin((oscillate(t, 20, 0.15) * Math.PI) / 180)}
        y2={250 - 60 * Math.cos((oscillate(t, 20, 0.15) * Math.PI) / 180)}
        stroke={C.coral}
        strokeWidth={7}
        draw={p(1.8, 0.6)}
        seed={731}
      />
      <Circle cx={900} cy={250} d={14} fill={C.coral} stroke={C.ink} strokeWidth={2} draw={p(1.8, 0.5)} seed={732} />
      <Text x={900} y={330} size={38} align="center" width={200} color={C.coral} draw={p(2.2, 0.6)} style={{left: 800}}>
        waiting
      </Text>

          </Stage>
  );
};

/* 13 — The rest of the phone */
export const PhoneLimits: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(5, end - start), 0.03)};
  return (
    <Stage camera={camera}>
            
      <Phone x={800} y={280} w={320} h={600} draw={p(0.8, 0.9)} seed={740}>
        <Text x={960} y={440} size={62} align="center" width={320} draw={p(1.3, 0.6)} style={{left: 800}}>
          everyday
        </Text>
        <Text x={960} y={520} size={62} align="center" width={320} draw={p(1.5, 0.6)} style={{left: 800}}>
          phone
        </Text>
      </Phone>

      <Circle cx={330} cy={380} d={170} stroke={C.ink} strokeWidth={4} draw={p(1.0, 0.7)} seed={750} />
      <Rect x={290} y={370} w={80} h={40} fill={C.teal} stroke={C.ink} strokeWidth={3} draw={p(1.1, 0.6)} seed={751} />
      <Line x1={370} y1={390} x2={392} y2={390} stroke={C.teal} strokeWidth={4} draw={p(1.1, 0.5)} seed={752} />
      <Text x={330} y={500} size={42} align="center" width={280} draw={p(1.3, 0.6)} style={{left: 190}}>
        BATTERY
      </Text>

      <Circle cx={1590} cy={380} d={170} stroke={C.ink} strokeWidth={4} draw={p(1.2, 0.7)} seed={760} />
      <Path d="M 1560 430 Q 1590 350 1620 430" stroke={C.amber} strokeWidth={7} draw={p(1.3, 0.6)} seed={761} />
      <Text x={1590} y={500} size={42} align="center" width={280} draw={p(1.5, 0.6)} style={{left: 1450}}>
        HEAT
      </Text>

      <Circle cx={330} cy={760} d={170} stroke={C.ink} strokeWidth={4} draw={p(1.4, 0.7)} seed={770} />
      <Check x={292} y={770} size={70} color={C.teal} draw={p(1.6, 0.6)} />
      <Text x={330} y={880} size={42} align="center" width={300} draw={p(1.8, 0.6)} style={{left: 180}}>
        RESPONSIVE
      </Text>

      <Cross x={1590} y={760} size={100} color={C.coral} draw={p(1.8, 0.6)} />
      <Text x={1590} y={880} size={42} align="center" width={300} color={C.coral} draw={p(2.0, 0.6)} style={{left: 1440}}>
        NEVER FREEZE
      </Text>
    </Stage>
  );
};

/* 14 — Every trick goes after one */
export const WallsRecap: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: 1.04 - 0.04 * p(0, 3.2)};
  return (
    <Stage camera={camera}>
            
      <Wall x={300} y={360} w={380} h={380} fill={C.teal} draw={p(0.8, 0.8)} seed={780} />
      <Wall x={1240} y={360} w={380} h={380} fill={C.amber} draw={p(0.9, 0.8)} seed={781} />
      <Text x={490} y={790} size={74} align="center" width={380} draw={p(1.3, 0.7)} style={{left: 300}}>
        MEMORY SIZE
      </Text>
      <Text x={1430} y={790} size={74} align="center" width={380} draw={p(1.5, 0.7)} style={{left: 1240}}>
        DATA SPEED
      </Text>

      <Text x={960} y={300} size={64} align="center" width={300} color={C.coral} draw={p(1.0, 0.7)} style={{left: 810}}>
        EVERY TRICK
      </Text>
      <Arrow x1={960} y1={390} x2={960} y2={510} color={C.coral} width={6} draw={p(1.3, 0.6)} seed={790} />
      <Arrow x1={960} y1={510} x2={700} y2={510} color={C.teal} width={5} draw={p(1.5, 0.6)} seed={791} />
      <Arrow x1={960} y1={510} x2={1220} y2={510} color={C.amber} width={5} draw={p(1.6, 0.6)} seed={792} />
          </Stage>
  );
};
