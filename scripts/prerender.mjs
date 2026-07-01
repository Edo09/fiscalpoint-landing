// Prerenders every route to its own static .html file (crawlable, hydrated by
// the client) and writes the generated sitemap.xml + blog RSS feed.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const dist = join(root, 'dist')

const entry = pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href
const { renderPage, getRoutes, buildSitemapXml, buildRssXml } = await import(entry)

const templateRaw = readFileSync(join(dist, 'index.html'), 'utf-8')
if (!templateRaw.includes('<div id="root"></div>')) {
  throw new Error('prerender: could not find <div id="root"></div> in dist/index.html')
}
// Drop the dev fallback <title>; each route injects its own.
const template = templateRaw.replace(/\s*<title>[\s\S]*?<\/title>/, '')

function outPath(route) {
  if (route === '/') return join(dist, 'index.html')
  return join(dist, route.replace(/^\//, ''), 'index.html')
}

const routes = getRoutes()
for (const route of routes) {
  const { html, head } = renderPage(route)
  const out = template
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace('</head>', `${head}\n  </head>`)
  const file = outPath(route)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, out)
}

// SEO feeds
writeFileSync(join(dist, 'sitemap.xml'), buildSitemapXml())
mkdirSync(join(dist, 'blog'), { recursive: true })
writeFileSync(join(dist, 'blog', 'rss.xml'), buildRssXml())

console.log(`✓ prerendered ${routes.length} route(s) + sitemap.xml + blog/rss.xml`)
