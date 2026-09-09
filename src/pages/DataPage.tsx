import { useMemo, useState } from 'react'
import { ContactScene, DryWell, FieldBot, Flywheel, MarketCurve, SignalGlyph, SpaceScene } from '../components/Graphics'
import './InfoPages.css'

const years = [
  {
    year: '2030',
    figure: '$7–15B',
    extra: 'Factories + warehouses',
    copy: 'Revenue around $7–15B, led by factories and warehouse automation — the first rooms humanoids can enter without redesigning the building.',
  },
  {
    year: '2035',
    figure: '$138B',
    extra: '6.5 million units',
    copy: 'Goldman’s updated case is about 6.5 million units and ~$138B in market size. Scale starts, and so does the data problem.',
  },
  {
    year: '2050',
    figure: '$5T',
    extra: '~1 billion humanoids',
    copy: 'Morgan Stanley’s long-run picture is ~1 billion humanoids in use and about $5T in yearly revenue if they become common work and home machines.',
  },
]

const channels = [
  {
    id: 'vision',
    label: 'Vision',
    value: '2.8 PB',
    copy: 'Stereo RGB, depth and segmentation from uncontrolled field environments — the data robots cannot scrape from the internet.',
  },
  {
    id: 'force',
    label: 'Force',
    value: '840M',
    copy: 'High-frequency force and torque traces from picking, handling and contact. Physical intelligence starts at the fingertip.',
  },
  {
    id: 'motion',
    label: 'Motion',
    value: '16.4M',
    copy: 'Synchronized joint trajectories and locomotion sequences for whole-body control in real terrain, not a lab floor.',
  },
] as const

const demandMarks = [
  { label: '2026 target', hours: 1_000_000, text: '1 million hours is the common 2026 target.' },
  { label: 'Ambitious labs', hours: 10_000_000, text: 'Some say 10 million+ hours.' },
  { label: 'General purpose', hours: 100_000_000, text: 'A few cite 100 million hours for general-purpose humanoids.' },
]

const reasons = [
  {
    title: 'Human spaces',
    place: 'home' as const,
    copy: 'Humanoids fit homes, factories and offices, so the data maps to the environments that actually matter.',
  },
  {
    title: 'The mix models need',
    place: 'office' as const,
    copy: 'Useful traces combine cameras, joint states, force/tactile signals, actions and language — the mix VLA models and world models need.',
  },
  {
    title: 'Sim still misses mess',
    place: 'factory' as const,
    copy: 'Simulation scales cheaply but still misses messy real contact: cloth, liquids, tight insertion. Real robot trajectories remain the highest-fidelity signal.',
  },
  {
    title: 'A flywheel text never had',
    place: 'factory' as const,
    copy: 'Deployed robots can later generate more data while working — a loop web scraping never produced.',
  },
]

const flywheelCopy = [
  'A robot, edge device or existing capture writes synchronized vision, force and motion.',
  'Labs train VLA and world models on licensed field traces, not scraped pages.',
  'The body goes to work in a warehouse, greenhouse or home.',
  'The working robot writes the next hours. Supply compounds. Text never did this.',
]

function formatHours(value: number) {
  if (value >= 1_000_000) return `${value / 1_000_000}M`
  return `${Math.round(value / 1000)}k`
}

function logWidth(hours: number, maxHours: number) {
  const min = Math.log10(80_000)
  const max = Math.log10(maxHours)
  return Math.max(6, ((Math.log10(hours) - min) / (max - min)) * 100)
}

export default function DataPage() {
  const [year, setYear] = useState(1)
  const [side, setSide] = useState<'text' | 'rwa'>('text')
  const [demand, setDemand] = useState(0)
  const [scale, setScale] = useState<'linear' | 'log'>('linear')
  const [reason, setReason] = useState(0)
  const [spin, setSpin] = useState(0)
  const [channel, setChannel] = useState(0)
  const [space, setSpace] = useState<'home' | 'factory' | 'office'>('factory')
  const [contact, setContact] = useState<'sim' | 'real'>('real')

  const supply = 400_000
  const need = demandMarks[demand].hours
  const gap = Math.round(need / supply)
  const llmHours = 50_000_000_000
  const maxHours = scale === 'log' ? llmHours : need
  const supplyWidth = scale === 'log' ? logWidth(supply, maxHours) : Math.max(3.2, (supply / need) * 100)
  const needWidth = scale === 'log' ? logWidth(need, maxHours) : 100
  const llmWidth = scale === 'log' ? 100 : 100
  const cells = useMemo(() => {
    const filled = Math.max(1, Math.round((supply / need) * 80))
    return Array.from({ length: 80 }, (_, index) => index < filled)
  }, [need])

  return (
    <div className="info">
      <nav className="info-nav" aria-label="Data sections">
        <a href="#brief">Brief</a>
        <a href="#market">Market</a>
        <a href="#finite">Finite text</a>
        <a href="#gap">Supply gap</a>
        <a href="#why">Why it matters</a>
        <a href="#signals">Signals</a>
      </nav>

      <header id="brief" className="info__hero">
        <p>01 — Importance of RAW datasets</p>
        <h1>Robots cannot learn the world from the internet.</h1>
        <p className="info__lead">
          Embodied models need synchronized records of how machines see, move and touch. That data is scarce,
          messy, and currently locked inside a few labs. Harvest makes real-world captures a public market.
        </p>
      </header>

      <section className="panel capture-strip">
        <div className="rwa-lab">
          <div className="rwa-lab__tabs" role="tablist" aria-label="Dataset types">
            {channels.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={channel === index}
                className={channel === index ? 'is-on' : ''}
                onClick={() => setChannel(index)}
              >
                0{index + 1} {item.label}
              </button>
            ))}
          </div>
          <div className="rwa-lab__body" aria-live="polite">
            <SignalGlyph kind={channels[channel].id} />
            <span>NETWORK VOLUME</span>
            <strong>{channels[channel].value}</strong>
            <p>{channels[channel].copy}</p>
          </div>
        </div>
      </section>

      <section id="market" className="panel">
        <p className="info-kicker">Market path</p>
        <h2>The body business is not a side quest.</h2>
        <p className="info__lead">
          These are industry forecasts, not Harvest bookings. They are why labs are buying hours now.
        </p>
        <MarketCurve active={year} onSelect={setYear} />
        <div className="year-tabs" role="tablist">
          {years.map((item, index) => (
            <button
              key={item.year}
              type="button"
              role="tab"
              aria-selected={year === index}
              className={year === index ? 'is-on' : ''}
              onClick={() => setYear(index)}
            >
              {item.year}
            </button>
          ))}
        </div>
        <div className="year-stage" aria-live="polite">
          <strong>{years[year].figure}</strong>
          <em>{years[year].extra}</em>
          <p>{years[year].copy}</p>
        </div>
      </section>

      <section id="finite" className="split-story">
        <div className="toggle">
          <button type="button" className={side === 'text' ? 'is-on' : ''} onClick={() => setSide('text')}>
            Why internet text is finite
          </button>
          <button type="button" className={side === 'rwa' ? 'is-on' : ''} onClick={() => setSide('rwa')}>
            Why companies are pivoting
          </button>
        </div>
        <div className="split-visual">
          {side === 'text' ? <DryWell /> : <FieldBot />}
          {side === 'text' ? (
            <div className="copy-block">
              <h2>The cheap text well is nearly empty.</h2>
              <p>
                Big AI labs already trained on most of the useful public internet: websites, books, code, papers.
              </p>
              <p>
                New web text is often AI-written, locked, or low quality. Extra scraping helps little. AI companies
                cannot keep scaling the same way.
              </p>
            </div>
          ) : (
            <div className="copy-block">
              <h2>The next unused data is real-world action.</h2>
              <p>
                Cameras, joints, force, and what the robot actually did. That data cannot be scraped. It has to be
                collected in the physical world.
              </p>
              <p>
                Labs are pouring money into humanoid fleets and RWA datasets because text alone cannot teach models
                to act.
              </p>
            </div>
          )}
        </div>
      </section>

      <section id="gap" className="panel gap-studio">
        <p className="info-kicker">Supply is tiny vs demand</p>
        <h2>A 10×–200× gap.</h2>
        <p className="info__lead">
          High-quality real robot data across the whole industry is still around 300,000–500,000 hours. Language
          models trained on the equivalent of tens to hundreds of billions of hours of text/video.
        </p>

        <div className="gap-controls">
          <div className="chip-row" role="tablist" aria-label="Demand targets">
            {demandMarks.map((item, index) => (
              <button
                key={item.label}
                type="button"
                className={demand === index ? 'is-on' : ''}
                onClick={() => setDemand(index)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="toggle tight">
            <button type="button" className={scale === 'linear' ? 'is-on' : ''} onClick={() => setScale('linear')}>
              Linear
            </button>
            <button type="button" className={scale === 'log' ? 'is-on' : ''} onClick={() => setScale('log')}>
              Log scale
            </button>
          </div>
        </div>

        <div className="gap-chart">
          <div className="gap-chart__row">
            <span>Supply now</span>
            <div className="bar">
              <i style={{ width: `${supplyWidth}%` }} />
            </div>
            <b>~400k hrs</b>
          </div>
          <div className="gap-chart__row">
            <span>What labs want</span>
            <div className="bar bar--need">
              <i style={{ width: `${needWidth}%` }} />
            </div>
            <b>{formatHours(need)} hrs</b>
          </div>
          {scale === 'log' ? (
            <div className="gap-chart__row">
              <span>LLM text/video</span>
              <div className="bar bar--llm">
                <i style={{ width: `${llmWidth}%` }} />
              </div>
              <b>10B–100B+</b>
            </div>
          ) : null}
        </div>

        <div className="hour-grid" aria-hidden="true">
          {cells.map((on, index) => (
            <i key={index} className={on ? 'is-on' : ''} />
          ))}
        </div>
        <p className="grid-caption">
          Each square is a slice of the selected target. Gold is the ~400k hours the industry actually has.
        </p>

        <p className="gap-note">
          {demandMarks[demand].text} Against ~400k hours of real robot data, that is roughly a{' '}
          <strong>{gap}×</strong> gap.
        </p>
        <p className="scale-note">
          Linear is how the shortage feels. Log is how you compare 400k hours to a billion-hour language corpus
          without the robot bar vanishing.
        </p>
      </section>

      <section id="why">
        <p className="info-kicker">Why RWA / humanoid datasets matter</p>
        <div className="reason-grid">
          {reasons.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={reason === index ? 'reason is-on' : 'reason'}
              onClick={() => setReason(index)}
            >
              <span>0{index + 1}</span>
              <strong>{item.title}</strong>
              {reason === index ? <p>{item.copy}</p> : null}
            </button>
          ))}
        </div>

        <div className="why-stage">
          <div>
            <p className="info-kicker">Human spaces</p>
            <div className="chip-row">
              {(['home', 'factory', 'office'] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  className={space === item ? 'is-on' : ''}
                  onClick={() => setSpace(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <SpaceScene place={space} />
          </div>
          <div>
            <p className="info-kicker">Sim vs contact</p>
            <div className="chip-row">
              <button type="button" className={contact === 'sim' ? 'is-on' : ''} onClick={() => setContact('sim')}>
                Clean sim
              </button>
              <button type="button" className={contact === 'real' ? 'is-on' : ''} onClick={() => setContact('real')}>
                Real mess
              </button>
            </div>
            <ContactScene mode={contact} />
          </div>
        </div>
      </section>

      <section className="panel fly-panel">
        <div>
          <p className="info-kicker">The loop text never had</p>
          <h2>Collect, train, deploy, recapture.</h2>
          <p className="info__lead">{flywheelCopy[spin]}</p>
          <div className="chip-row">
            {['Collect', 'Train', 'Deploy', 'Recapture'].map((item, index) => (
              <button
                key={item}
                type="button"
                className={spin === index ? 'is-on' : ''}
                onClick={() => setSpin(index)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <Flywheel active={spin} />
      </section>
    </div>
  )
}
