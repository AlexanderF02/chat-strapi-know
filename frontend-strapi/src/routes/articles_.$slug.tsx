import { createFileRoute } from '@tanstack/react-router'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'

export const Route = createFileRoute('/articles_/$slug')({
  loader: async ({ params }) => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:1338'
    const res = await fetch(
      `${apiUrl}/api/articles?filters[slug][$eq]=${params.slug}&populate[category]=true&populate[image]=true`
    )
    if (!res.ok) throw new Error(`Strapi API returned ${res.status}`)
    const json = await res.json()
    const article = json.data?.[0]
    return { article }
  },
  component: ArticlePage,
})

function ArticlePage() {
  const { article } = Route.useLoaderData()
  if (!article) return <div>Artikeln hittades inte.</div>
  const title = article.title
  const content = article.content
  const category = article.category?.name
  const imageUrl = article.image?.url
    ? `${import.meta.env.VITE_API_URL || 'http://localhost:1338'}${article.image.url}`
    : null

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{title}</h1>
        {category && (
          <p className="text-cyan-600 font-medium mb-4">Kategori: {category}</p>
        )}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-80 object-cover rounded-2xl mb-8"
          />
        )}
        {content ? (
          <div className="prose max-w-none text-gray-700">
            <BlocksRenderer content={content} />
          </div>
        ) : (
          <p className="text-gray-400">Inget innehåll hittades.</p>
        )}
      </div>
    </div>
  )
}








