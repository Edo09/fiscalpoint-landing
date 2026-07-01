import { useEffect } from 'react'

/**
 * Sets document.title + meta description on the client for in-app navigation UX.
 * Crawlers read the prerendered <head> (built by seo.ts) — this is only for SPA
 * route changes after hydration.
 */
export default function Head({ title, description }: { title: string; description?: string }) {
  useEffect(() => {
    if (title) document.title = title
    if (description) {
      let m = document.querySelector('meta[name="description"]')
      if (!m) {
        m = document.createElement('meta')
        m.setAttribute('name', 'description')
        document.head.appendChild(m)
      }
      m.setAttribute('content', description)
    }
  }, [title, description])
  return null
}
