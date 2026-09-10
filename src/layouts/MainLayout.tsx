import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { smoothScrollToId } from '../utils/scroll'

export default function MainLayout() {
  const location = useLocation()

  useEffect(() => {
    const id = location.hash.replace('#', '')
    if (id) {
      smoothScrollToId(id)
      return
    }
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  return (
    <>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
