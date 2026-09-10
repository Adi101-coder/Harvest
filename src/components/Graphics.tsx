type Node = { x: number; y: number; label: string; figure: string }

const marketNodes: Node[] = [
  { x: 72, y: 168, label: '2030', figure: '$7–15B' },
  { x: 300, y: 118, label: '2035', figure: '$138B' },
  { x: 548, y: 42, label: '2050', figure: '$5T' },
]

export function MarketCurve({
  active,
  onSelect,
}: {
  active: number
  onSelect?: (index: number) => void
}) {
  return (
    <svg className="draw" viewBox="0 0 620 230" role="img" aria-label="Humanoid market path from 2030 to 2050">
      <defs>
        <linearGradient id="mfill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#c48a2a" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#c48a2a" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M36 188 H584" stroke="#e4d8c4" strokeWidth="1" fill="none" />
      <path
        d="M72 168 C 170 164 220 142 300 118 C 390 90 460 62 548 42 L 548 188 L 72 188 Z"
        fill="url(#mfill)"
      />
      <path
        d="M72 168 C 170 164 220 142 300 118 C 390 90 460 62 548 42"
        fill="none"
        stroke="#c48a2a"
        strokeWidth="2.4"
      />
      {marketNodes.map((node, index) => (
        <g
          key={node.label}
          className={active === index ? 'is-on' : ''}
          style={{ cursor: onSelect ? 'pointer' : undefined }}
          onClick={() => onSelect?.(index)}
        >
          <circle cx={node.x} cy={node.y} r={active === index ? 9 : 6} fill={active === index ? '#c48a2a' : '#f5f2ea'} stroke="#c48a2a" strokeWidth="2" />
          <text x={node.x} y={node.y + 28} textAnchor="middle" fill="#8a8174" fontSize="11">
            {node.label}
          </text>
          <text x={node.x} y={node.y - 16} textAnchor="middle" fill="#2a2a2a" fontSize="13" fontWeight="700">
            {node.figure}
          </text>
        </g>
      ))}
    </svg>
  )
}

export function DryWell() {
  return (
    <svg className="draw" viewBox="0 0 260 200" aria-hidden="true">
      <rect x="78" y="28" width="104" height="148" rx="8" fill="#efe6d6" stroke="#d8c9b0" />
      <rect x="90" y="108" width="80" height="56" rx="4" fill="#c48a2a" opacity="0.22" />
      <path d="M90 150 H170" stroke="#c48a2a" strokeWidth="2" />
      <text x="130" y="172" textAnchor="middle" fill="#8a8174" fontSize="8">WATERLINE</text>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={96 + (i % 2) * 6}
          y={40 + i * 12}
          width="56"
          height="8"
          rx="1"
          fill={i > 2 ? '#d8c9b0' : '#2a2a2a'}
          opacity={1 - i * 0.14}
        />
      ))}
      <path d="M188 46 l18 -10 M188 58 l22 -4 M188 70 l16 6" stroke="#c48a2a" strokeWidth="1.4" fill="none" />
    </svg>
  )
}

export function FieldBot() {
  return (
    <svg className="draw" viewBox="0 0 260 200" aria-hidden="true">
      <path d="M20 168 H240" stroke="#d8c9b0" />
      {[40, 70, 100, 130, 160, 190].map((x) => (
        <path key={x} d={`M${x} 168 V156`} stroke="#c48a2a" strokeWidth="2" />
      ))}
      <circle cx="132" cy="58" r="14" fill="#20231f" />
      <rect x="120" y="72" width="24" height="36" rx="6" fill="#c48a2a" />
      <path d="M120 86 L96 112 M144 86 L168 108" stroke="#20231f" strokeWidth="5" strokeLinecap="round" />
      <path d="M126 108 L118 148 M138 108 L150 148" stroke="#20231f" strokeWidth="5" strokeLinecap="round" />
      <path d="M146 64 L210 40 L210 86 Z" fill="#c8ec5a" opacity="0.18" stroke="#7ea31f" />
      <circle cx="214" cy="48" r="3" fill="#c8ec5a" />
      <circle cx="202" cy="62" r="2.4" fill="#c8ec5a" />
      <circle cx="218" cy="74" r="2" fill="#c8ec5a" />
    </svg>
  )
}

export function SignalGlyph({ kind }: { kind: 'vision' | 'force' | 'motion' | 'language' }) {
  if (kind === 'vision') {
    return (
      <svg className="glyph" viewBox="0 0 72 72" aria-hidden="true">
        <circle cx="36" cy="36" r="22" fill="#efe6d6" />
        <circle cx="36" cy="36" r="10" fill="#20231f" />
        <circle cx="32" cy="32" r="3" fill="#9befff" />
      </svg>
    )
  }
  if (kind === 'force') {
    return (
      <svg className="glyph" viewBox="0 0 72 72" aria-hidden="true">
        <path d="M20 50 L36 18 L52 50 Z" fill="#c48a2a" />
        <path d="M36 28 V48" stroke="#f5f2ea" strokeWidth="3" />
      </svg>
    )
  }
  if (kind === 'motion') {
    return (
      <svg className="glyph" viewBox="0 0 72 72" aria-hidden="true">
        <path d="M16 48 C28 20 44 20 56 48" fill="none" stroke="#20231f" strokeWidth="3" />
        <circle cx="22" cy="46" r="4" fill="#c48a2a" />
        <circle cx="36" cy="28" r="4" fill="#c48a2a" />
        <circle cx="50" cy="46" r="4" fill="#c48a2a" />
      </svg>
    )
  }
  return (
    <svg className="glyph" viewBox="0 0 72 72" aria-hidden="true">
      <rect x="16" y="22" width="40" height="28" rx="6" fill="#efe6d6" stroke="#20231f" />
      <path d="M24 32 H48 M24 40 H40" stroke="#c48a2a" strokeWidth="2" />
    </svg>
  )
}

export function Flywheel({ active }: { active: number }) {
  const steps = ['Collect', 'Train', 'Deploy', 'Recapture']
  return (
    <svg className="draw flywheel" viewBox="-32 -16 344 312" role="img" aria-label="Robot data flywheel">
      <circle cx="140" cy="140" r="88" fill="none" stroke="#e4d8c4" strokeWidth="18" />
      <circle
        cx="140"
        cy="140"
        r="88"
        fill="none"
        stroke="#c48a2a"
        strokeWidth="18"
        strokeDasharray="138 414"
        strokeDashoffset={-active * 138}
        transform="rotate(-90 140 140)"
      />
      <circle cx="140" cy="140" r="54" fill="#20231f" />
      <text x="140" y="136" textAnchor="middle" fill="#c8ec5a" fontSize="11" letterSpacing="1.4">DATA</text>
      <text x="140" y="152" textAnchor="middle" fill="#f5f2ea" fontSize="12" fontWeight="700">FLYWHEEL</text>
      {steps.map((label, index) => {
        const angle = ((index * 90 - 90) * Math.PI) / 180
        const x = 140 + Math.cos(angle) * 118
        const y = 140 + Math.sin(angle) * 118
        return (
          <text
            key={label}
            x={x}
            y={y}
            textAnchor="middle"
            fill={active === index ? '#c48a2a' : '#8a8174'}
            fontSize="11"
            fontWeight={active === index ? 700 : 400}
          >
            {label}
          </text>
        )
      })}
    </svg>
  )
}

export function SpaceScene({ place }: { place: 'home' | 'factory' | 'office' }) {
  return (
    <svg className="draw" viewBox="0 0 280 160" aria-hidden="true">
      <rect x="16" y="28" width="248" height="112" rx="10" fill="#efe6d6" />
      {place === 'home' ? (
        <>
          <path d="M40 88 H110 V128 H40 Z" fill="#d8c9b0" />
          <rect x="150" y="56" width="86" height="72" rx="4" fill="#c48a2a" opacity="0.35" />
          <circle cx="84" cy="64" r="10" fill="#20231f" />
        </>
      ) : null}
      {place === 'factory' ? (
        <>
          <rect x="36" y="70" width="70" height="58" fill="#c48a2a" />
          <rect x="118" y="48" width="48" height="80" fill="#20231f" />
          <rect x="180" y="64" width="64" height="64" fill="#d8c9b0" />
        </>
      ) : null}
      {place === 'office' ? (
        <>
          <rect x="40" y="78" width="200" height="8" fill="#d8c9b0" />
          <rect x="52" y="54" width="40" height="24" fill="#20231f" />
          <rect x="120" y="54" width="40" height="24" fill="#20231f" />
          <rect x="188" y="54" width="40" height="24" fill="#20231f" />
        </>
      ) : null}
    </svg>
  )
}

export function ContactScene({ mode }: { mode: 'sim' | 'real' }) {
  return (
    <svg className="draw" viewBox="0 0 280 160" aria-hidden="true">
      {mode === 'sim' ? (
        <>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path key={`v${i}`} d={`M${36 + i * 40} 24 V136`} stroke="#e4d8c4" />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <path key={`h${i}`} d={`M20 ${40 + i * 28} H260`} stroke="#e4d8c4" />
          ))}
          <rect x="108" y="56" width="64" height="48" fill="none" stroke="#c48a2a" strokeDasharray="4 3" />
        </>
      ) : (
        <>
          <path d="M24 120 C70 70 110 140 160 96 C200 64 230 110 256 88" fill="none" stroke="#c48a2a" strokeWidth="3" />
          <path d="M40 130 C90 150 140 110 200 138" fill="none" stroke="#20231f" strokeWidth="2" />
          <circle cx="168" cy="92" r="7" fill="#20231f" />
        </>
      )}
    </svg>
  )
}

export function MixRing() {
  const real = 32
  const sim = 8
  const total = real + sim
  const r = 54
  const c = 2 * Math.PI * r
  const realLen = (real / total) * c
  return (
    <svg className="draw" viewBox="0 0 220 220" role="img" aria-label="GR00T mix, 32 thousand real hours and 8 thousand sim hours">
      <circle cx="110" cy="110" r={r} fill="none" stroke="#efe6d6" strokeWidth="22" />
      <circle
        cx="110"
        cy="110"
        r={r}
        fill="none"
        stroke="#c48a2a"
        strokeWidth="22"
        strokeDasharray={`${realLen} ${c}`}
        transform="rotate(-90 110 110)"
      />
      <text x="110" y="104" textAnchor="middle" fill="#2a2a2a" fontSize="22" fontWeight="800">32K</text>
      <text x="110" y="124" textAnchor="middle" fill="#8a8174" fontSize="11">real / human</text>
      <text x="110" y="200" textAnchor="middle" fill="#8a8174" fontSize="11">+ 8K hours sim · extra ego video in 1.7</text>
    </svg>
  )
}

export function TokenSeal() {
  return (
    <svg className="draw" viewBox="0 0 220 200" aria-hidden="true">
      <circle cx="110" cy="96" r="62" fill="#20231f" />
      <circle cx="110" cy="96" r="48" fill="none" stroke="#c8ec5a" strokeWidth="2" />
      <text x="110" y="92" textAnchor="middle" fill="#c8ec5a" fontSize="11">LICENSE</text>
      <text x="110" y="112" textAnchor="middle" fill="#f5f2ea" fontSize="16" fontWeight="800">TOKEN</text>
      <path d="M110 158 L96 188 H124 Z" fill="#c48a2a" />
    </svg>
  )
}

export function StageGlyph({ stage }: { stage: 'collect' | 'verify' | 'tokenize' | 'sell' }) {
  const paths = {
    collect: 'M36 18 V54 M20 36 H52',
    verify: 'M20 38 L32 50 L54 22',
    tokenize: 'M22 24 H50 V48 H22 Z M28 32 H44',
    sell: 'M18 36 H54 M42 24 L54 36 L42 48',
  }
  return (
    <svg className="glyph" viewBox="0 0 72 72" aria-hidden="true">
      <circle cx="36" cy="36" r="28" fill="#efe6d6" />
      <path d={paths[stage]} fill="none" stroke="#20231f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function TamBars({
  active,
  onSelect,
}: {
  active: number
  onSelect?: (index: number) => void
}) {
  const bars = [
    { label: 'Physical work', h: 86, v: '$40T' },
    { label: 'Physical AI', h: 100, v: '$50T' },
    { label: 'NVIDIA now', h: 18, v: '$10B' },
    { label: 'Decade path', h: 34, v: '~$100B' },
  ]
  return (
    <svg className="draw" viewBox="0 0 360 180" aria-hidden="true">
      {bars.map((bar, index) => {
        const x = 28 + index * 86
        const y = 140 - bar.h
        const on = active === index
        return (
          <g
            key={bar.label}
            style={{ cursor: onSelect ? 'pointer' : undefined }}
            onClick={() => onSelect?.(index)}
          >
            <rect x={x} y={y} width="54" height={bar.h} rx="6" fill={on ? '#c48a2a' : '#efe6d6'} />
            <text x={x + 27} y={y - 8} textAnchor="middle" fill="#2a2a2a" fontSize="11" fontWeight="700">{bar.v}</text>
            <text x={x + 27} y="158" textAnchor="middle" fill="#8a8174" fontSize="9">{bar.label}</text>
          </g>
        )
      })}
    </svg>
  )
}

export function ProvenanceChain() {
  return (
    <svg className="draw" viewBox="0 0 520 90" aria-hidden="true">
      {['Capture', 'Hash', 'Score', 'Token', 'License'].map((label, index) => (
        <g key={label} transform={`translate(${18 + index * 100} 18)`}>
          <rect width="84" height="54" rx="10" fill="#efe6d6" />
          <text x="42" y="32" textAnchor="middle" fill="#2a2a2a" fontSize="11" fontWeight="700">{label}</text>
          {index < 4 ? <path d="M88 27 H98" stroke="#c48a2a" strokeWidth="2" /> : null}
        </g>
      ))}
    </svg>
  )
}
