import { useState } from 'react'
import type { CSSProperties } from 'react'
import { ProvenanceChain, TokenSeal } from '../components/Graphics'
import './InfoPages.css'

const rights = [
  { title: 'Who can train', copy: 'Named labs, a class of labs, or a single model line. Not a public dump.' },
  { title: 'For how long', copy: 'A cycle, a year, or until the holder revokes. Usage is metered.' },
  { title: 'On what task', copy: 'Pick-and-place only, loco-manipulation, or the full mix. Scarcity prices the rest.' },
]

const holders = [
  {
    title: 'Field operators',
    copy: 'The crew that ran the robot keeps a claim on the hours, not just a day rate.',
  },
  {
    title: 'Fleet owners',
    copy: 'A greenhouse or warehouse that already captures can list without becoming a data company.',
  },
  {
    title: 'Labs that recapture',
    copy: 'Deployed robots write the next dataset. That loop is an asset, not a byproduct.',
  },
]

export default function AboutPage() {
  const [hours, setHours] = useState(400)
  const [right, setRight] = useState(0)

  return (
    <div className="info">
      <header className="info__hero">
        <p>03 — Holders data tokenization</p>
        <h1>The people who capture the world should hold the asset.</h1>
        <p className="info__lead">
          Verified machine experience becomes a licensed data token. Holders keep provenance, set permissions,
          and participate when a lab trains on what they collected.
        </p>
      </header>

      <section className="token-layout">
        <TokenSeal />
        <section className="panel token-panel">
          <p className="info-kicker">Illustrative value</p>
          <label htmlFor="about-hours">
            Verified task hours <strong>{hours} hrs</strong>
          </label>
          <input
            id="about-hours"
            type="range"
            min="50"
            max="2000"
            step="50"
            value={hours}
            onChange={(event) => setHours(Number(event.target.value))}
            style={{ '--range': `${((hours - 50) / 1950) * 100}%` } as CSSProperties}
          />
          <div className="token-out">
            <span>ESTIMATED LICENSE VALUE / CYCLE</span>
            <strong>${Math.round(hours * 2.75).toLocaleString()}</strong>
          </div>
          <p>
            Estimate only. Actual value depends on quality, scarcity, task demand and license terms.
          </p>
        </section>
      </section>

      <section className="panel">
        <p className="info-kicker">Provenance stays attached</p>
        <p className="info__lead">Capture, hash, score, tokenize, license. The trail does not fall off at sale.</p>
        <ProvenanceChain />
      </section>

      <section>
        <p className="info-kicker">Permissions holders set</p>
        <div className="reason-grid">
          {rights.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={right === index ? 'reason is-on' : 'reason'}
              onClick={() => setRight(index)}
            >
              <strong>{item.title}</strong>
              {right === index ? <p>{item.copy}</p> : null}
            </button>
          ))}
        </div>
      </section>

      <section className="stack-grid">
        {holders.map((item) => (
          <article key={item.title}>
            <strong>{item.title}</strong>
            <p>{item.copy}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
