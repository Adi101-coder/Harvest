import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AboutPage from './pages/AboutPage'
import DataPage from './pages/DataPage'
import DocsPage from './pages/DocsPage'
import HomePage from './pages/HomePage'
import MarketplacePage from './pages/MarketplacePage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="marketplace" element={<MarketplacePage />} />
        <Route path="data" element={<DataPage />} />
        <Route path="docs" element={<DocsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
