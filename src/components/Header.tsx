import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/marketplace', label: 'Marketplace', end: false },
  { to: '/data', label: 'Data', end: false },
  { to: '/docs', label: 'Docs', end: false },
  { to: '/about', label: 'About', end: false },
] as const

function getHeroAnchor() {
  const hero = document.querySelector('#home.hero')
  if (!hero) return null

  const rect = hero.getBoundingClientRect()
  return {
    top: rect.top + rect.height / 2,
    left: rect.left + rect.width / 2,
  }
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(false)
  const [searchAnchor, setSearchAnchor] = useState<{ top: number; left: number } | null>(null)

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia('(min-width: 961px)').matches) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  useEffect(() => {
    if (!search) {
      document.documentElement.classList.remove('search-open')
      setSearchAnchor(null)
      return
    }

    const syncAnchor = () => setSearchAnchor(getHeroAnchor())

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSearch(false)
    }

    document.documentElement.classList.add('search-open')
    syncAnchor()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', syncAnchor)
    window.addEventListener('scroll', syncAnchor, { passive: true })
    return () => {
      document.documentElement.classList.remove('search-open')
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', syncAnchor)
      window.removeEventListener('scroll', syncAnchor)
    }
  }, [search])

  const searchStyle: CSSProperties | undefined = searchAnchor
    ? { top: searchAnchor.top, left: searchAnchor.left }
    : undefined

  return (
    <header
      className={`header${search ? ' header--search-open' : ''}${open ? ' header--menu-open' : ''}`}
    >
      <div className="header__bar">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <img className="brand__mark" src="/logo.png" alt="" />
          <span>
            HARVEST
            <small>fictional company</small>
          </span>
        </NavLink>

        <button
          className={open ? 'burger is-open' : 'burger'}
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <i />
          <i />
          <i />
        </button>

        {open ? (
          <button
            className="nav-scrim"
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
        ) : null}

        <nav id="site-nav" className={open ? 'nav is-open' : 'nav'} aria-label="Main">
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
        </nav>

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
      </div>

      {search ? (
        <div className="search-layer" role="presentation" onClick={() => setSearch(false)}>
          <form
            className={searchAnchor ? 'search-box search-box--hero' : 'search-box'}
            style={searchStyle}
            role="search"
            aria-label="Site search"
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault()
              setSearch(false)
            }}
          >
            <svg className="search-box__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
              <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input autoFocus type="search" name="q" placeholder="Search Harvest" />
            <button type="button" className="search-box__close" onClick={() => setSearch(false)}>
              Close
            </button>
          </form>
        </div>
      ) : null}
    </header>
  )
}
