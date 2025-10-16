import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h1 className="text-5xl font-bold mb-4">Knowledge Hub</h1>
          <p className="text-lg text-cyan-100 mb-8">
            En enkel innehållssajt byggd med Strapi och TanStack Start.
          </p>
          <Link
            to="/articles"
            className="bg-white text-cyan-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-cyan-50 transition-colors"
          >
            Gå till artiklar
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-gray-200 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Knowledge Hub — byggd med Strapi & TanStack
      </footer>
    </div>
  )
}



