import { useEffect, useState } from 'react'
import { StageGlyph } from '../components/Graphics'
import './InfoPages.css'

const steps = [
  {
    number: '01',
    title: 'Collect',
    stage: 'collect' as const,
    copy: 'Connect a robot, edge device or existing capture through the Harvest SDK. Data is buffered locally, then uploaded encrypted. Nothing useful leaves the site until you say so.',
  },
  {
    number: '02',
    title: 'Verify',
    stage: 'verify' as const,
    copy: 'Quality, completeness and provenance are scored before a dataset can enter the marketplace. Junk never ships. Holders see the score before they tokenize.',
  },
  {
    number: '03',
    title: 'Tokenize',
    stage: 'tokenize' as const,
    copy: 'Verified datasets become programmable assets. Holders set license terms and keep a cryptographic trail of origin.',
  },
  {
    number: '04',
    title: 'Sell',
    stage: 'sell' as const,
    copy: 'Labs license the data. Contributors receive settlement when it is used — not a one-off dump, a usage market.',
  },
]

const checks = [
  { label: 'Sync', copy: 'Vision, joints and force share a clock. Desynced traces are rejected.' },
  { label: 'Coverage', copy: 'Task hours, viewpoints and contact events have to clear a floor.' },
  { label: 'Provenance', copy: 'Device, operator and site stay attached. Anonymous dumps do not list.' },
  { label: 'License', copy: 'Holders set who can train, for how long, and on what class of model.' },
]

const seedEvents = [
  { location: 'Iowa, US', task: 'Soil sampling', records: '10,948', time: 'now' },
  { location: 'Limburg, NL', task: 'Soil sampling', records: '20,551', time: 'now' },
  { location: 'Punjab, IN', task: 'Berry picking', records: '25,585', time: 'now' },
  { location: 'Queensland, AU', task: 'Autonomous weeding', records: '10,037', time: 'now' },
]

export default function MarketplacePage() {
  const [step, setStep] = useState(0)
  const [events, setEvents] = useState(seedEvents)
  const [streaming, setStreaming] = useState(true)

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

  return (
    <div className="info">
      <header className="info__hero">
        <p>04 — Dataset selling / collecting</p>
        <h1>From fieldwork to a fair sale.</h1>
        <p className="info__lead">
          One pipeline: collect, verify, tokenize, sell. The people who capture the world keep the asset.
        </p>
      </header>

      <section className="stage-row">
        {steps.map((item, index) => (
          <button
            key={item.number}
            type="button"
            className={step === index ? 'stage is-on' : 'stage'}
            onClick={() => setStep(index)}
          >
            <StageGlyph stage={item.stage} />
            <span>{item.number}</span>
            <strong>{item.title}</strong>
          </button>
        ))}
      </section>

      <section className="process-board">
        <div className="process-board__nav">
          {steps.map((item, index) => (
            <button
              key={item.number}
              type="button"
              className={step === index ? 'is-on' : ''}
              onClick={() => setStep(index)}
            >
              <span>{item.number}</span>
              {item.title}
            </button>
          ))}
        </div>
        <div className="process-board__body" aria-live="polite">
          <span>{steps[step].number}</span>
          <h2>{steps[step].title}</h2>
          <p>{steps[step].copy}</p>
          <button
            type="button"
            className="text-btn"
            onClick={() => setStep((current) => (current + 1) % steps.length)}
          >
            Next stage
          </button>
        </div>
      </section>

      <section className="panel">
        <p className="info-kicker">What verification actually checks</p>
        <div className="check-grid">
          {checks.map((item) => (
            <article key={item.label}>
              <strong>{item.label}</strong>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="live" className="live-panel">
        <div className="live__top">
          <div>
            <p className="info-kicker light">05 — Realtime humanoid live updates</p>
            <h2>Humanoids, learning live.</h2>
          </div>
          <button
            type="button"
            className={streaming ? 'text-btn is-on' : 'text-btn'}
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
        <p className="live__note">Simulated telemetry. Connect a live robot feed to replace this demo.</p>
      </section>
    </div>
  )
}
