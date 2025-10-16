import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 px-6 shadow">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-lg">
          Knowledge Hub
        </Link>
        <nav className="space-x-4">
          <Link
            to="/"
            className="hover:underline"
            activeProps={{ className: 'underline font-semibold' }}
          >
            Home
          </Link>
          <Link
            to="/articles"
            className="hover:underline"
            activeProps={{ className: 'underline font-semibold' }}
          >
            Articles
          </Link>
        </nav>
      </div>
    </header>
  )
}

