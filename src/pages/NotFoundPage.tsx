import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="container">
      <h1 className="page-title">404 — Page not found</h1>
      <p className="page-lead">
        The page you&apos;re looking for doesn&apos;t exist or was moved.
      </p>
      <Link to="/" className="btn">
        Back to home
      </Link>
    </div>
  )
}
