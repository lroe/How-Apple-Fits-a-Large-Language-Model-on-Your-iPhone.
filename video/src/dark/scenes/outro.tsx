import React from 'react';
import {C, pan, push} from '../theme';
import {Arrow, Circle, Line, Path, Rect} from '../rough';
import {
  Book,
  Check,
  Chip,
  Cloud,
  Cross,
  Panel,
  Phone,
  RecapCard,
  Stage,
  Text,
  useP,
  type SceneProps,
} from '../ui';

/* 56 — Six things to remember */
export const SixThings: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {x: pan(t, start, Math.min(10, end - start), 0, -26)};
  const active = Math.min(5, Math.floor(Math.max(0, t - start - 1) / 6.5));
  const items = [
    {n: '01', label: 'FEWER BITS', color: C.teal},
    {n: '02', label: 'SLIMMER CACHE', color: C.amber},
    {n: '03', label: 'SHARED ADAPTERS', color: C.coral},
    {n: '04', label: 'RIGHT CHIP', color: C.teal},
    {n: '05', label: 'SAFE CLOUD', color: C.amber},
    {n: '06', label: 'MEASURE THE WASTE', color: C.coral},
  ];
  return (
    <Stage camera={camera}>
                  {items.map((item, i) => {
        const x = 150 + (i % 3) * 560;
        const y = 300 + Math.floor(i / 3) * 320;
        return (
          <React.Fragment key={item.n}>
            <RecapCard
              x={x}
              y={y}
              w={520}
              h={270}
              n={item.n}
              label={item.label}
              active={i === active}
              draw={p(0.8 + i * 0.18, 0.7)}
              seed={2700 + i}
            >
              {i === 0 && (
                <Text x={x + 430} y={y + 70} size={34} color={item.color} draw={p(1.0, 0.5)}>
                  0 / 1
                </Text>
              )}
              {i === 1 && <Book x={x + 410} y={y + 45} w={64} h={84} fill={item.color} draw={p(1.0, 0.5)} seed={2711} />}
              {i === 2 && (
                <>
                  <Path
                    d={`M ${x + 400} ${y + 100} V ${y + 62} Q ${x + 430} ${y + 18} ${x + 460} ${y + 62} V ${y + 100} Z`}
                    fill={item.color}
                    stroke={item.color}
                    strokeWidth={4}
                    draw={p(1.0, 0.5)}
                    seed={2712}
                  />
                  <Line x1={x + 380} y1={y + 100} x2={x + 480} y2={y + 100} stroke={item.color} strokeWidth={7} draw={p(1.0, 0.5)} seed={2715} />
                </>
              )}
              {i === 3 && <Chip x={x + 390} y={y + 55} w={116} h={76} fill={item.color} draw={p(1.0, 0.5)} seed={2713} pins />}
              {i === 4 && <Cloud x={x + 370} y={y + 55} w={140} h={82} fill={C.panel} stroke={item.color} draw={p(1.0, 0.5)} seed={2714} />}
              {i === 5 && <Check x={x + 435} y={y + 100} size={48} color={item.color} draw={p(1.2, 0.5)} />}
            </RecapCard>
          </React.Fragment>
        );
      })}
          </Stage>
  );
};

/* 57 — Look for waste */
export const WrapUp: React.FC<SceneProps> = ({start, end}) => {
  const {t, p} = useP(start);
  const camera = {zoom: push(t, start, Math.min(8, end - start), 0.035)};
  const cuts = [
    {label: 'SMALLER WEIGHTS', color: C.teal, y: 330},
    {label: 'SLIMMER CACHE', color: C.amber, y: 440},
    {label: 'SAFE CLOUD PATH', color: C.coral, y: 550},
  ];
  return (
    <Stage camera={camera}>
      <Phone x={200} y={320} w={300} h={560} draw={p(0.8, 0.9)} seed={2720}>
        <Text x={350} y={520} size={46} align="center" width={300} draw={p(1.2, 0.6)} style={{left: 200}}>
          the model
        </Text>
        <Text x={350} y={590} size={46} align="center" width={300} draw={p(1.4, 0.6)} style={{left: 200}}>
          stays
        </Text>
      </Phone>

      {cuts.map((cut, i) => (
        <React.Fragment key={cut.label}>
          <Panel
            x={600}
            y={cut.y}
            w={370}
            h={74}
            fill={cut.color}
            label={cut.label}
            draw={p(1.6 + i * 0.3, 0.6)}
            seed={2740 + i}
            labelSize={24}
            align="center"
          />
        </React.Fragment>
      ))}

      <Rect x={640} y={690} w={340} h={240} fill={C.panel2} stroke={C.ink} strokeWidth={4} draw={p(1.5, 0.8)} seed={2730} />
      <Line x1={680} y1={690} x2={660} y2={650} stroke={C.ink} strokeWidth={4} draw={p(1.6, 0.5)} seed={2731} />
      <Line x1={940} y1={690} x2={960} y2={650} stroke={C.ink} strokeWidth={4} draw={p(1.6, 0.5)} seed={2732} />
      <Text x={810} y={790} size={36} align="center" width={340} draw={p(2.0, 0.6)} style={{left: 640}}>
        CUT LIST
      </Text>

      <Panel x={1120} y={300} w={640} h={480} fill={C.panel} draw={p(3.2, 0.8)} seed={2760} />
      <Text x={1440} y={370} size={96} align="center" width={640} draw={p(3.5, 0.7)} style={{left: 1120}} weight={700}>
        LOOK FOR
      </Text>
      <Text x={1440} y={490} size={96} align="center" width={640} color={C.teal} draw={p(3.7, 0.7)} style={{left: 1120}} weight={700}>
        WASTE.
      </Text>
      <Text x={1440} y={640} size={34} align="center" width={640} tone="dim" draw={p(4.0, 0.6)} style={{left: 1120}}>
        that is the whole trick
      </Text>
    </Stage>
  );
};
