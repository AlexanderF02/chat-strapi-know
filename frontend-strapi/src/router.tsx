import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'


export function getRouter() {
  return createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent: () => (
      <div className="p-8 text-center text-red-500">
        <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
        <p>Sorry, the page you’re looking for doesn’t exist.</p>
      </div>
    ),
  })
}


