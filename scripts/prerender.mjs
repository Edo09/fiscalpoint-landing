// Injects the server-rendered HTML and JSON-LD into dist/index.html after the
// SSR bundle has been built. Turns the CSR shell into a fully static,
// crawlable document that the client then hydrates.

import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const dist = join(root, 'dist')

const entry = pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href
const { render } = await import(entry)
const { html, head } = render()

const indexPath = join(dist, 'index.html')
const template = readFileSync(indexPath, 'utf-8')

if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: could not find <div id="root"></div> in dist/index.html')
}

const out = template
  .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
  .replace('</head>', `${head}\n  </head>`)

writeFileSync(indexPath, out)
console.log('✓ prerendered dist/index.html (static HTML + JSON-LD injected)')
