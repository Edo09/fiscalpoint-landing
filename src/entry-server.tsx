import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import { buildHead, buildSitemapXml, buildRssXml } from './seo'
import { getPublished, getCategories } from './content/posts'

/**
 * Server entry used at build time (vite build --ssr) to prerender each route to
 * static HTML. `renderPage` returns the app markup for a URL plus that route's
 * full <head> (title, meta, canonical, OG, JSON-LD). The client hydrates it.
 */
export function renderPage(url: string) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
  return { html, head: buildHead(url) }
}

/** Every path that must be prerendered to a static .html file. */
export function getRoutes(): string[] {
  return [
    '/',
    '/blog',
    ...getCategories().map((c) => `/blog/categoria/${c.slug}`),
    ...getPublished().map((p) => `/blog/${p.slug}`),
  ]
}

export { buildSitemapXml, buildRssXml }
