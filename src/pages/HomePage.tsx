import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'

const stats = [
  { value: '23 DOF', label: 'Height' },
  { value: '35kg', label: 'Weight' },
  { value: '2h field', subValue: 'runtime', label: 'Endurance' },
]

const homeSections = [
  { href: '#home', label: 'Home' },
  { href: '#rwa', label: 'RAW datasets' },
  { href: '#nvidia', label: 'NVIDIA program' },
  { href: '#tokenization', label: 'Tokenization' },
  { href: '#process', label: 'Process' },
  { href: '#live', label: 'Live updates' },
]

const dataTypes = [
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
]

const processSteps = [
  {
    number: '01',
    title: 'Collect',
    copy: 'Connect a robot, edge device or existing capture through the Harvest SDK. Data is buffered locally, then uploaded encrypted.',
  },
  {
    number: '02',
    title: 'Verify',
    copy: 'Quality, completeness and provenance are scored before a dataset can enter the marketplace. Junk never ships.',
  },
  {
    number: '03',
    title: 'Tokenize',
    copy: 'Verified datasets become programmable assets. Holders set license terms and keep a cryptographic trail of origin.',
  },
  {
    number: '04',
    title: 'Sell',
    copy: 'Labs license the data. Contributors receive settlement when it is used — not a one-off dump, a usage market.',
  },
]

const seedEvents = [
  { location: 'Salinas, CA', task: 'Lettuce inspection', records: '18,240', time: 'now' },
  { location: 'Nagano, JP', task: 'Apple manipulation', records: '9,816', time: '12s' },
  { location: 'Almería, ES', task: 'Greenhouse navigation', records: '24,093', time: '31s' },
  { location: 'Pune, IN', task: 'Crop health scan', records: '12,457', time: '48s' },
]

const signals = [
  {
    id: 'cameras',
    label: 'Cameras',
    copy: 'Stereo RGB, depth and segmentation from the rooms and lines robots actually work in.',
  },
  {
    id: 'joints',
    label: 'Joints',
    copy: 'Synchronized DOF traces with the body still balancing — not a disembodied arm on a table.',
  },
  {
    id: 'force',
    label: 'Force',
    copy: 'Contact, torque and tactile. Cloth, liquids and tight insertion still live here, not in sim.',
  },
  {
    id: 'language',
    label: 'Language',
    copy: 'Task labels tied to the action. The mix VLA and world models actually train on.',
  },
]

const gapTargets = [
  { label: 'the 2026 1M-hour target', hours: '1M', gap: '~2.5×', fill: 18 },
  { label: 'what ambitious labs want', hours: '10M+', gap: '~25×', fill: 42 },
  { label: 'general-purpose scale', hours: '100M', gap: '~250×', fill: 100 },
]

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null)
  const [activeData, setActiveData] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [hours, setHours] = useState(400)
  const [events, setEvents] = useState(seedEvents)
  const [streaming, setStreaming] = useState(true)
  const [activeSignal, setActiveSignal] = useState(0)
  const [gapIndex, setGapIndex] = useState(0)

  useEffect(() => {
    const id = window.location.hash.replace('#', '')
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [])

  useEffect(() => {
    if (!streaming) return
    const locations = ['Iowa, US', 'Queensland, AU', 'Limburg, NL', 'Punjab, IN']
    const tasks = ['Soil sampling', 'Berry picking', 'Yield mapping', 'Autonomous weeding']
    const timer = window.setInterval(() => {
      setEvents((current) => [
        {
          location: locations[Math.floor(Math.random() * locations.length)],
          task: tasks[Math.floor(Math.random() * tasks.length)],
          records: Math.floor(8000 + Math.random() * 22000).toLocaleString(),
          time: 'now',
        },
        ...current.slice(0, 3),
      ])
    }, 3200)
    return () => window.clearInterval(timer)
  }, [streaming])

  const onMove = (event: PointerEvent<HTMLElement>) => {
    const box = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - box.left) / box.width - 0.5
    const y = (event.clientY - box.top) / box.height - 0.5
    heroRef.current?.style.setProperty('--mx', `${x * 24}px`)
    heroRef.current?.style.setProperty('--my', `${y * 12}px`)
  }

  return (
    <div className="page">
      <nav className="section-nav" aria-label="Home sections">
        {homeSections.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="product-showcase">
        <section
          id="home"
          className="hero"
          ref={heroRef}
          onPointerMove={onMove}
          onPointerLeave={() => {
            heroRef.current?.style.setProperty('--mx', '0px')
            heroRef.current?.style.setProperty('--my', '0px')
          }}
        >
          <div className="hero__mark-wrap" aria-hidden="true">
            <span className="hero__mark hero__mark--left">HARVEST</span>
            <span className="hero__mark hero__mark--right">G1</span>
          </div>
          <img className="hero__robot" src="/cowboys.png" alt="HARVEST G1 field robot" />
          <div className="hero__copy">
            <p>Intelligent robot</p>
            <h1>RWA Field Data Robot</h1>
            <div className="stats">
              {stats.map((item) => (
                <article key={item.label}>
                  <div className="stats__value">
                    <strong>{item.value}</strong>
                    {'subValue' in item && item.subValue ? (
                      <strong className="stats__sub">{item.subValue}</strong>
                    ) : null}
                  </div>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="design" className="perception">
          <span className="frame tl" aria-hidden="true" />
          <span className="frame tr" aria-hidden="true" />
          <span className="frame bl" aria-hidden="true" />
          <span className="frame br" aria-hidden="true" />

          <div className="perception__grid">
            <svg className="perception__leaders" viewBox="0 0 880 125" preserveAspectRatio="none" aria-hidden="true">
              <path d="M132 22 H172 V42 H182" />
              <path d="M132 96 H172 V74 H182" />
              <path d="M798 24 H838 V72 H768" />
            </svg>

            <div className="perception__left">
              <p className="perception__callout perception__callout--left">
                Advanced perception and motors in interfacial centers maslicision state
              </p>
              <img className="perception__img perception__img--lens" src="/left1.png" alt="" />
            </div>

            <div className="perception__copy">
              <p className="kicker">Fullfillable equipment</p>
              <h2>Advanced Perception and Dynamic Interaction</h2>
              <p>
                The program integrates hardware force rensors and motor electric current to meet the end force
                requirements, achieving better sensitivity and reliability. Foot waterproof and dustproof, easy to
                replace after wear and tear
              </p>
            </div>

            <div className="perception__right">
              <p className="perception__callout perception__callout--right">Data exploded sensor module</p>
              <img className="perception__img perception__img--module" src="/right.png" alt="" />
            </div>
          </div>
        </section>

        <section id="specs" className="specs">
          <p className="specs__mark" aria-hidden="true">HARVEST-G1</p>
          <svg className="specs__lines" viewBox="0 0 1000 640" aria-hidden="true">
            <path d="M330 150 H410 L470 205" />
            <path d="M770 90 H640 L545 185" />
            <path d="M190 520 H340 L430 480" />
            <path d="M810 540 H660 L570 495" />
          </svg>
          <img className="specs__robot" src="/specsrobotnew.png" alt="HARVEST G1 full body" />
          <p className="note note-tl">
            HARVEST
            <small>Extiation grade cross roller bearings.</small>
          </p>
          <p className="note note-tr">Integrated force sensors at each sensors and motor electric sensors</p>
          <p className="note note-bl">Persom sensors sensors and son motor electric sensors</p>
          <p className="note note-br">Docallant precader with tear medules</p>
          <p className="note note-ft">industrial grade cross roller bearings</p>
        </section>
      </div>

      <section id="tech" className="spec-grid">
        <article className="spec spec--gold spec--signals">
          <p>Real-world action</p>
          <h3>The mix you cannot scrape</h3>
          <div className="signal-list" role="tablist" aria-label="Capture channels">
            {signals.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeSignal === index}
                className={activeSignal === index ? 'is-on' : ''}
                onClick={() => setActiveSignal(index)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="signal-copy" aria-live="polite">{signals[activeSignal].copy}</p>
        </article>

        <article className="spec spec--cream spec--power">
          <p>Electrica machinery</p>
          <h3>Stable Environmental Adaptation</h3>
          <div>
            <strong>12500mAh</strong>
            <span>Smart Cell</span>
          </div>
          <div>
            <strong>2.5 hours</strong>
            <span>quick charge</span>
          </div>
        </article>

        <div className="spec-stack">
          <article className="spec spec--cream spec--precise">
            <p>Precise Manipulation</p>
            <div className="spec-split">
              <div>
                <strong>2-4 hours</strong>
                <span>e.g. vnencial contenders</span>
              </div>
              <div>
                <strong>2 hours</strong>
                <span>variable force</span>
              </div>
            </div>
          </article>
          <article className="spec spec--cream spec--loco">
            <p>Adaptive Locomotion</p>
            <ExplodedGraphic />
          </article>
        </div>

        <article className="spec spec--gold spec--gap">
          <p>Industry supply</p>
          <h3>~400k hrs</h3>
          <p className="gap-lead">Real robot hours across the whole industry. Text models trained on the equivalent of tens to hundreds of billions of hours.</p>
          <div className="gap-targets" role="tablist" aria-label="Demand targets">
            {gapTargets.map((item, index) => (
              <button
                key={item.label}
                type="button"
                role="tab"
                aria-selected={gapIndex === index}
                className={gapIndex === index ? 'is-on' : ''}
                onClick={() => setGapIndex(index)}
              >
                {item.hours}
              </button>
            ))}
          </div>
          <div className="gap-meter" aria-hidden="true">
            <i className="gap-meter__need" style={{ width: `${gapTargets[gapIndex].fill}%` }} />
            <i className="gap-meter__have" />
          </div>
          <p className="gap-stat">
            <strong>{gapTargets[gapIndex].gap}</strong>
            <span>short of {gapTargets[gapIndex].label}</span>
          </p>
        </article>
      </section>

      <section id="contact" className="growth">
        <h2>RWA HUMANOIDS GROWTH PROJECTION</h2>
        <div className="growth__grid">
          <article>
            <span>2030</span>
            <p>Revenue around <em>$7–15B</em>, led by factories and warehouse automation.</p>
          </article>
          <article>
            <span>2035</span>
            <p>Goldman’s updated case: 6.5 million units and <em>$138B</em> in market size.</p>
          </article>
          <article>
            <span>2050</span>
            <p>Morgan Stanley’s long-run picture: ~1 billion humanoids, about <em>$5T</em> in yearly revenue.</p>
          </article>
        </div>
      </section>

      <section id="rwa" className="story">
        <div className="story__head">
          <p className="kicker">01 — Importance of RAW datasets</p>
          <h2>Robots cannot learn the world from the internet.</h2>
        </div>
        <p className="story__lead">
          Embodied models need synchronized records of how machines see, move and touch. That data is scarce,
          messy, and currently locked inside a few labs. Harvest makes real-world captures a public market.
        </p>
        <div className="rwa-lab">
          <div className="rwa-lab__tabs" role="tablist" aria-label="Dataset types">
            {dataTypes.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeData === index}
                className={activeData === index ? 'is-on' : ''}
                onClick={() => setActiveData(index)}
              >
                0{index + 1} {item.label}
              </button>
            ))}
          </div>
          <div className="rwa-lab__body" aria-live="polite">
            <span>NETWORK VOLUME</span>
            <strong>{dataTypes[activeData].value}</strong>
            <p>{dataTypes[activeData].copy}</p>
          </div>
        </div>
        <Link className="story-more" to="/data">Read the full RWA brief</Link>
      </section>

      <section id="nvidia" className="story nvidia">
        <div className="nvidia-card">
          <p className="kicker kicker--light">02 — NVIDIA program</p>
          <div className="nvidia-card__grid">
            <div>
              <h2>Built for the stack that trains physical AI.</h2>
              <p>
                Harvest pipelines are designed to sit next to NVIDIA simulation and accelerated-compute workflows —
                so field captures can move into Isaac-class training loops without a custom glue layer every time.
              </p>
              <a href="https://www.nvidia.com/en-us/startups/" target="_blank" rel="noreferrer">
                NVIDIA for Startups ↗
              </a>
            </div>
            <ul>
              <li>
                <strong>Isaac-ready captures</strong>
                <span>Bridge real interactions into simulation-grade assets.</span>
              </li>
              <li>
                <strong>GPU-scale processing</strong>
                <span>Multimodal field logs processed at training throughput.</span>
              </li>
              <li>
                <strong>OpenUSD-shaped worlds</strong>
                <span>Reusable scene structure, not a pile of unlabeled clips.</span>
              </li>
            </ul>
          </div>
        </div>
        <Link className="story-more" to="/docs">Open the NVIDIA program</Link>
      </section>

      <section id="tokenization" className="story">
        <div className="story__head">
          <p className="kicker">03 — Holders data tokenization</p>
          <h2>The people who capture the world should hold the asset.</h2>
        </div>
        <p className="story__lead">
          Verified machine experience becomes a licensed data token. Holders keep provenance, set permissions,
          and participate when a lab trains on what they collected.
        </p>
        <div className="token-box">
          <label htmlFor="hours">
            Verified task hours <strong>{hours} hrs</strong>
          </label>
          <input
            id="hours"
            type="range"
            min="50"
            max="2000"
            step="50"
            value={hours}
            onChange={(event) => setHours(Number(event.target.value))}
            style={{ '--range': `${((hours - 50) / 1950) * 100}%` } as CSSProperties}
          />
          <div className="token-box__value">
            <span>ILLUSTRATIVE LICENSE VALUE</span>
            <strong>${Math.round(hours * 2.75).toLocaleString()}<small> / cycle</small></strong>
          </div>
          <p>Estimate only. Actual value depends on quality, scarcity, task demand and license terms.</p>
        </div>
        <Link className="story-more" to="/about">How holders keep the asset</Link>
      </section>

      <section id="process" className="story">
        <div className="story__head">
          <p className="kicker">04 — Dataset selling / collecting process</p>
          <h2>From fieldwork to a fair sale.</h2>
        </div>
        <div className="process">
          <div className="process__list">
            {processSteps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                className={activeStep === index ? 'is-on' : ''}
                onClick={() => setActiveStep(index)}
              >
                <span>{step.number}</span>
                {step.title}
              </button>
            ))}
          </div>
          <div className="process__detail" aria-live="polite">
            <span>{processSteps[activeStep].number}</span>
            <h3>{processSteps[activeStep].title}</h3>
            <p>{processSteps[activeStep].copy}</p>
            <button
              type="button"
              className="next"
              onClick={() => setActiveStep((current) => (current + 1) % processSteps.length)}
            >
              Next stage
            </button>
          </div>
        </div>
        <Link className="story-more" to="/marketplace">See collect → sell in full</Link>
      </section>

      <section id="live" className="story">
        <div className="live">
          <div className="live__top">
            <div>
              <p className="kicker kicker--light">05 — Realtime humanoid live updates</p>
              <h2>Humanoids, learning live.</h2>
            </div>
            <button
              type="button"
              className={streaming ? 'stream is-on' : 'stream'}
              onClick={() => setStreaming((on) => !on)}
            >
              {streaming ? 'Live demo' : 'Demo paused'}
            </button>
          </div>
          <div className="live__feed">
            {events.map((event, index) => (
              <article key={`${event.location}-${event.time}-${index}`} className={index === 0 ? 'is-new' : ''}>
                <div>
                  <strong>{event.task}</strong>
                  <span>{event.location}</span>
                </div>
                <div>
                  <strong>{event.records}</strong>
                  <span>{event.time}</span>
                </div>
              </article>
            ))}
          </div>
          <p className="live__note">Simulated telemetry for the landing page. Connect a live robot feed to replace this demo.</p>
          <Link className="story-more story-more--light" to="/marketplace#live">Open live marketplace feed</Link>
        </div>
      </section>
    </div>
  )
}

function ExplodedGraphic() {
  return (
    <svg className="exploded" viewBox="0 0 160 140" aria-hidden="true">
      <rect x="18" y="88" width="70" height="28" rx="6" fill="#c4a46a" />
      <circle cx="53" cy="102" r="10" fill="#1d1d1d" />
      <rect x="46" y="58" width="28" height="18" rx="3" fill="#c4a46a" />
      <rect x="50" y="32" width="36" height="22" rx="3" fill="#163027" />
      <rect x="56" y="38" width="24" height="10" fill="#1a4d88" />
      <rect x="78" y="8" width="58" height="34" rx="6" fill="#c4a46a" />
    </svg>
  )
}
