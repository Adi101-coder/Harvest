import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/marketplace', label: 'Marketplace', end: false },
  { to: '/data', label: 'Data', end: false },
  { to: '/docs', label: 'Docs', end: false },
  { to: '/about', label: 'About', end: false },
] as const

export default function Header() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(false)

  return (
    <header className="header">
      <div className="header__bar">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <img className="brand__mark" src="/logo.png" alt="" />
          <span>
            HARVEST
            <small>fictional company</small>
          </span>
        </NavLink>

        <button
          className="burger"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <i />
          <i />
        </button>

        <nav className={open ? 'nav is-open' : 'nav'} aria-label="Main">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? 'nav__link is-active' : 'nav__link')}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <button
            className="search"
            type="button"
            aria-label="Search"
            onClick={() => {
              setOpen(false)
              setSearch(true)
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
              <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </nav>
      </div>

      {search ? (
        <div className="search-layer" onClick={() => setSearch(false)}>
          <form
            className="search-box"
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault()
              setSearch(false)
            }}
          >
            <input autoFocus placeholder="Search Harvest" />
            <button type="button" onClick={() => setSearch(false)}>
              Close
            </button>
          </form>
        </div>
      ) : null}
    </header>
  )
}
