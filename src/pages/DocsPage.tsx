import { useState } from 'react'
import type { SyntheticEvent } from 'react'
import { MixRing, TamBars } from '../components/Graphics'
import './InfoPages.css'

function lockPlayback(event: SyntheticEvent<HTMLVideoElement>) {
  event.currentTarget.playbackRate = 1.15
}

const claims = [
  {
    title: 'Physical work TAM',
    figure: '$40T',
    copy: 'Jensen Huang has used figures around $40T for physical work — TAM talk, not NVIDIA revenue.',
  },
  {
    title: 'Broader physical AI',
    figure: '$50T',
    copy: 'A ~$50T frame covering factories, transport and robots. Opportunity size, not a bookings forecast.',
  },
  {
    title: 'NVIDIA Physical AI now',
    figure: '$10B',
    copy: 'Physical AI (robots, cars, drones) is already about $10B a year on NVIDIA’s own business.',
  },
  {
    title: 'Decade path',
    figure: '~$100B',
    copy: 'Huang has said it can grow ~10× in a decade. Still small vs NVIDIA’s ~$300B total, but a named growth line.',
  },
]

const tasks = [
  {
    title: 'Pick-and-place',
    copy: 'Apple to plate/basket, bottle to cabinet, can/cup to drawer, fruit to basket. The reference skill for the G1 end-to-end course: see, grasp, move, place, while the body stays balanced. The atom of factory and home work.',
  },
  {
    title: 'Tabletop manipulation',
    copy: 'NVIDIA’s public task list is mostly tabletop plus industrial manipulation — drawers, cabinets, parts that have to go somewhere specific.',
  },
  {
    title: 'Loco-manipulation',
    copy: 'Move the body, then use the hands. Balance is not a side quest; it is part of the skill.',
  },
]

const pyramid = [
  {
    index: '01',
    title: 'Internet + human ego video',
    short: 'Ego video',
    tag: 'Base · cheap scale',
    copy: 'Semantics, and how people use objects. Cheap scale at the base.',
  },
  {
    index: '02',
    title: 'Synthetic trajectories',
    short: 'Isaac / Cosmos',
    tag: 'Volume without a lab',
    copy: 'Isaac + Cosmos / MimicGen / GR00T-Dreams. Volume without occupying a real lab.',
  },
  {
    index: '03',
    title: 'Real teleop',
    short: 'Real teleop',
    tag: 'Peak · scarce',
    copy: 'Fourier GR1 and Unitree G1. The scarce, high-value peak.',
  },
]

const stack = [
  {
    title: 'Isaac-ready captures',
    copy: 'Bridge real interactions into simulation-grade assets.',
  },
  {
    title: 'GPU-scale processing',
    copy: 'Multimodal field logs processed at training throughput.',
  },
  {
    title: 'OpenUSD-shaped worlds',
    copy: 'Reusable scene structure, not a pile of unlabeled clips.',
  },
]

export default function DocsPage() {
  const [claim, setClaim] = useState(0)
  const [task, setTask] = useState(0)
  const [layer, setLayer] = useState(2)

  return (
    <div className="info">
      <nav className="info-nav" aria-label="Docs sections">
        <a href="#claims">Claims</a>
        <a href="#tasks">Tasks</a>
        <a href="#pyramid">Pyramid</a>
        <a href="#groot">GR00T</a>
      </nav>

      <header className="info__hero">
        <p>02 — NVIDIA program</p>
        <h1>Built for the stack that trains physical AI.</h1>
        <p className="info__lead">
          Harvest pipelines sit next to NVIDIA simulation and accelerated-compute workflows — so field captures
          move into Isaac-class training loops without a custom glue layer every time.
        </p>
      </header>

      <section className="nvidia-banner">
        <p>2026 is the “ChatGPT moment” for physical AI.</p>
        <span>Billions of robots. Hundreds of millions of AVs. Huge robotic factories. Demand talk — Harvest is the supply side.</span>
        <a href="https://www.nvidia.com/en-us/startups/" target="_blank" rel="noreferrer">
          NVIDIA for Startups ↗
        </a>
      </section>

      <section id="claims" className="panel">
        <p className="info-kicker">What NVIDIA is claiming</p>
        <TamBars active={claim} onSelect={setClaim} />
        <div className="claim-grid">
          {claims.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={claim === index ? 'claim is-on' : 'claim'}
              onClick={() => setClaim(index)}
            >
              <span>{item.title}</span>
              <strong>{item.figure}</strong>
            </button>
          ))}
        </div>
        <p className="claim-copy">{claims[claim].copy}</p>
        <p className="scale-note">
          $40T / $50T is TAM language. $10B now and ~$100B in a decade is NVIDIA’s own physical-AI line — still
          small against ~$300B total, but it is named.
        </p>
      </section>

      <section id="tasks" className="task-layout">
        <div>
          <p className="info-kicker">Tasks they collect</p>
          <div className="task-list">
            {tasks.map((item, index) => (
              <button
                key={item.title}
                type="button"
                className={task === index ? 'is-on' : ''}
                onClick={() => setTask(index)}
              >
                {item.title}
              </button>
            ))}
          </div>
          <p>{tasks[task].copy}</p>
        </div>
        <div className="video-slot">
          <video
            src="/videoplayback.mp4"
            autoPlay
            muted
            loop
            playsInline
            onLoadedMetadata={lockPlayback}
            onPlay={lockPlayback}
            aria-label="Unitree G1 pick-and-place with NVIDIA Isaac GR00T"
          />
          <p>Unitree G1 · NVIDIA Isaac GR00T. Looped at 1.15×. Mute on so the page does not shout.</p>
        </div>
      </section>

      <section id="pyramid" className="panel pyramid-panel">
        <p className="info-kicker">Data pyramid they use</p>
        <div className="pyramid-layout">
          <div className="pyramid" role="tablist" aria-label="Data pyramid layers">
            {[2, 1, 0].map((index) => {
              const item = pyramid[index]
              return (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  aria-selected={layer === index}
                  className={`pyramid__band pyramid__band--${index} ${layer === index ? 'is-on' : ''}`}
                  onClick={() => setLayer(index)}
                >
                  <b>{item.index}</b>
                  <strong>{item.short}</strong>
                </button>
              )
            })}
          </div>
          <div className="pyramid-detail" aria-live="polite">
            <span>{pyramid[layer].tag}</span>
            <h3>{pyramid[layer].title}</h3>
            <p>{pyramid[layer].copy}</p>
          </div>
        </div>
      </section>

      <section id="groot" className="groot">
        <div className="copy-block">
          <p className="info-kicker">What the program actually is</p>
          <h2>GR00T is the open humanoid foundation line.</h2>
          <p>
            Now through GR00T 1.7, Apache 2.0, commercially usable. Pretrained on a mix of human ego video, real
            robot teleop, and huge sim data.
          </p>
          <p>
            Latest public mix: about <strong>32K hours</strong> real/human + <strong>8K hours</strong> sim, plus extra
            ego video in 1.7. Real teleop is still the scarce peak.
          </p>
        </div>
        <MixRing />
      </section>

      <section className="stack-grid">
        {stack.map((item) => (
          <article key={item.title}>
            <strong>{item.title}</strong>
            <p>{item.copy}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
