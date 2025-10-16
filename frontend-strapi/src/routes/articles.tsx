import { createFileRoute, Link } from '@tanstack/react-router'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'

export const Route = createFileRoute('/articles')({
  loader: async () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:1338'
    const res = await fetch(
      `${apiUrl}/api/articles?populate[image]=true&populate[category]=true`
    )
    if (!res.ok) throw new Error(`Strapi API returned ${res.status}`)
    const json = await res.json()
    return { articles: json.data || [] }
  },
  component: ArticlesPage,
})

function ArticlesPage() {
  const { articles } = Route.useLoaderData()
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:1338'

  if (!articles?.length) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
        Inga artiklar hittades.
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-center text-gray-900 mb-16">
          Alla artiklar
        </h1>
        <div className="flex flex-col gap-20">
          {articles.map((article: any, index: number) => {
            const title = article.title
            const content = article.content
            const category = article.category?.name
            const imageUrl = article.image?.url
              ? `${apiUrl}${article.image.url}`
              : null

            const isReversed = index % 2 === 1

            return (
              <article
                key={article.id}
                className={`flex flex-col md:flex-row ${
                  isReversed ? 'md:flex-row-reverse' : ''
                } items-center gap-8 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300`}
              >
                {imageUrl && (
                  <div className="w-full md:w-1/2">
                    <img
                      src={imageUrl}
                      alt={title}
                      className="w-full h-80 object-cover rounded-t-2xl md:rounded-none md:rounded-l-2xl"
                    />
                  </div>
                )}
                <div className="p-8 md:w-1/2">
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">
                    <Link
                      to="/articles/$slug"
                      params={{ slug: article.slug }}
                      className="hover:underline"
                    >
                      {title}
                    </Link>
                  </h2>
                  {category && (
                    <p className="text-cyan-600 font-medium mb-4">
                      {category}
                    </p>
                  )}
                  {content ? (
                    <div className="prose max-w-none text-gray-700">
                      <BlocksRenderer content={content} />
                    </div>
                  ) : (
                    <p className="text-gray-400">Inget innehåll hittades.</p>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}













