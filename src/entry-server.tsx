import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { buildJsonLdScript } from './seo'

/**
 * Server entry used at build time (vite build --ssr) to prerender the page to
 * static HTML. Returns the app markup plus the JSON-LD <script> to inject into
 * <head>. The client (main.tsx) hydrates this markup — no design or behavior
 * change, the HTML is just present in the source for crawlers and previews.
 */
export function render() {
  const html = renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  return { html, head: buildJsonLdScript() }
}
