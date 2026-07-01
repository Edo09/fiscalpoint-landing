// Per-route <head> builder + sitemap + RSS, all derived from a single source of
// truth (src/data.ts and src/content/posts). Rendered into static HTML at
// prerender time so crawlers and social bots read complete metadata without JS.

import { FAQS, EMAIL } from './data'
import {
  getPublished,
  getPost,
  getByCategory,
  getCategoryName,
  getCategories,
  type Post,
} from './content/posts'

export const SITE_URL = 'https://www.fiscalpoint.com.do'
export const SITE_NAME = 'FiscalPoint'
export const TELEPHONE = '+1-849-401-1017'
const LOGO = `${SITE_URL}/icon-512.png`
const OG_DEFAULT = `${SITE_URL}/og-image.png`

const ORG_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`
const WEBAPP_ID = `${SITE_URL}/#webapp`

const HOME_TITLE = 'Facturación Electrónica e-CF y DGII en RD | FiscalPoint'
const HOME_DESC =
  'Certifícate ante la DGII y emite e-CF desde la nube. Sistema de facturación electrónica para empresas, PyMEs y contadores en República Dominicana. Plataforma web o integración API.'
const DESCRIPTION =
  'FiscalPoint te certifica ante la DGII y te da una plataforma en la nube para emitir, recibir y consultar comprobantes fiscales electrónicos (e-CF). Facturación electrónica para PyMEs, contadores y empresas en República Dominicana.'

type JsonLdNode = Record<string, unknown>

/* ------------------------------------------------------------------ helpers */

function esc(s: unknown): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function jsonLdScript(obj: JsonLdNode): string {
  const json = JSON.stringify(obj).replace(/</g, '\\u003c')
  return `  <script type="application/ld+json">${json}</script>`
}

interface PageOpts {
  title: string
  description: string
  canonical: string
  ogType?: 'website' | 'article'
  image?: string
  imageAlt?: string
  preloadImage?: string
  articleMeta?: { published?: string; modified?: string; author?: string; section?: string }
  jsonld?: JsonLdNode[]
}

/** Full per-page head: title, meta, canonical, hreflang, OG, Twitter, JSON-LD. */
function page(o: PageOpts): string {
  const img = o.image || OG_DEFAULT
  const lines: string[] = [
    `  <title>${esc(o.title)}</title>`,
    `  <meta name="description" content="${esc(o.description)}" />`,
    `  <link rel="canonical" href="${esc(o.canonical)}" />`,
    `  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />`,
    `  <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />`,
    `  <meta name="author" content="FiscalPoint" />`,
    `  <meta name="geo.region" content="DO" />`,
    `  <meta name="geo.placename" content="República Dominicana" />`,
    `  <meta http-equiv="content-language" content="es-DO" />`,
    `  <link rel="alternate" hreflang="es-do" href="${esc(o.canonical)}" />`,
    `  <link rel="alternate" hreflang="x-default" href="${esc(o.canonical)}" />`,
    `  <meta property="og:type" content="${o.ogType || 'website'}" />`,
    `  <meta property="og:site_name" content="FiscalPoint" />`,
    `  <meta property="og:locale" content="es_DO" />`,
    `  <meta property="og:title" content="${esc(o.title)}" />`,
    `  <meta property="og:description" content="${esc(o.description)}" />`,
    `  <meta property="og:url" content="${esc(o.canonical)}" />`,
    `  <meta property="og:image" content="${esc(img)}" />`,
    `  <meta property="og:image:alt" content="${esc(o.imageAlt || o.title)}" />`,
    `  <meta name="twitter:card" content="summary_large_image" />`,
    `  <meta name="twitter:title" content="${esc(o.title)}" />`,
    `  <meta name="twitter:description" content="${esc(o.description)}" />`,
    `  <meta name="twitter:image" content="${esc(img)}" />`,
  ]
  if (o.articleMeta) {
    const a = o.articleMeta
    if (a.published) lines.push(`  <meta property="article:published_time" content="${esc(a.published)}" />`)
    if (a.modified) lines.push(`  <meta property="article:modified_time" content="${esc(a.modified)}" />`)
    if (a.author) lines.push(`  <meta property="article:author" content="${esc(a.author)}" />`)
    if (a.section) lines.push(`  <meta property="article:section" content="${esc(a.section)}" />`)
  }
  if (o.preloadImage) {
    const type = o.preloadImage.endsWith('.webp') ? ' type="image/webp"' : ''
    lines.push(`  <link rel="preload" as="image" href="${esc(o.preloadImage)}"${type} fetchpriority="high" />`)
  }
  for (const node of o.jsonld || []) lines.push(jsonLdScript(node))
  return lines.join('\n')
}

/* -------------------------------------------------- homepage structured data */

function organization(): JsonLdNode {
  return {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: { '@type': 'ImageObject', url: LOGO, width: 512, height: 512 },
    image: OG_DEFAULT,
    description: DESCRIPTION,
    slogan: 'Factura electrónica sin dolores de cabeza.',
    email: EMAIL,
    telephone: TELEPHONE,
    knowsLanguage: ['es', 'es-DO'],
    address: { '@type': 'PostalAddress', addressCountry: 'DO' },
    areaServed: { '@type': 'Country', name: 'República Dominicana' },
    contactPoint: [
      { '@type': 'ContactPoint', telephone: TELEPHONE, email: EMAIL, contactType: 'sales', areaServed: 'DO', availableLanguage: ['Spanish'] },
      { '@type': 'ContactPoint', telephone: TELEPHONE, contactType: 'customer support', areaServed: 'DO', availableLanguage: ['Spanish'] },
    ],
  }
}

function website(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    description: DESCRIPTION,
    inLanguage: 'es-DO',
    publisher: { '@id': ORG_ID },
  }
}

function softwareApplication(): JsonLdNode {
  return {
    '@type': 'SoftwareApplication',
    '@id': WEBAPP_ID,
    name: 'FiscalPoint Web App',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, Cloud',
    url: `${SITE_URL}/`,
    inLanguage: 'es-DO',
    description:
      'Sistema de facturación electrónica e-CF en la nube con cumplimiento DGII: factura, recibe comprobantes, gestiona clientes, productos y gastos, y consulta reportes.',
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'República Dominicana' },
    offers: { '@type': 'Offer', priceCurrency: 'DOP', price: '1500', availability: 'https://schema.org/InStock' },
  }
}

function faqPage(): JsonLdNode {
  return {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    inLanguage: 'es-DO',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

function homeGraph(): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@graph': [organization(), website(), softwareApplication(), faqPage()],
  }
}

/* ------------------------------------------------------- blog structured data */

function breadcrumbLd(items: { name: string; url: string }[]): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  }
}

function blogPostingLd(post: Post): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: `${SITE_URL}${post.cover}`,
    datePublished: post.date,
    dateModified: post.updated,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/assets/fp-icon-160.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': post.canonical },
    articleSection: post.category,
    keywords: post.tags.join(', '),
    inLanguage: 'es-DO',
  }
}

function collectionLd(name: string, url: string, posts: Post[]): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    url,
    inLanguage: 'es-DO',
    isPartOf: { '@id': WEBSITE_ID },
    hasPart: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: p.canonical,
      datePublished: p.date,
    })),
  }
}

/* ------------------------------------------------------------- head per route */

export function buildHead(url: string): string {
  const path = url.split('?')[0].replace(/\/$/, '') || '/'

  if (path === '/') {
    return page({
      title: HOME_TITLE,
      description: HOME_DESC,
      canonical: `${SITE_URL}/`,
      preloadImage: '/assets/fp-dashboard.webp',
      jsonld: [homeGraph()],
    })
  }

  if (path === '/blog') {
    const posts = getPublished()
    return page({
      title: 'Blog de facturación electrónica e-CF y DGII | FiscalPoint',
      description:
        'Guías y respuestas sobre facturación electrónica, e-CF, certificación DGII y cumplimiento fiscal para empresas en República Dominicana.',
      canonical: `${SITE_URL}/blog`,
      jsonld: [
        collectionLd('Blog de FiscalPoint', `${SITE_URL}/blog`, posts),
        breadcrumbLd([
          { name: 'Inicio', url: `${SITE_URL}/` },
          { name: 'Blog', url: `${SITE_URL}/blog` },
        ]),
      ],
    })
  }

  if (path.startsWith('/blog/categoria/')) {
    const slug = path.split('/').pop() || ''
    const name = getCategoryName(slug) || 'Categoría'
    const posts = getByCategory(slug)
    return page({
      title: `${name} · Blog | FiscalPoint`,
      description: `Artículos sobre ${name.toLowerCase()} en el blog de FiscalPoint: facturación electrónica e-CF y cumplimiento DGII en República Dominicana.`,
      canonical: `${SITE_URL}/blog/categoria/${slug}`,
      jsonld: [
        collectionLd(`${name} · Blog de FiscalPoint`, `${SITE_URL}/blog/categoria/${slug}`, posts),
        breadcrumbLd([
          { name: 'Inicio', url: `${SITE_URL}/` },
          { name: 'Blog', url: `${SITE_URL}/blog` },
          { name, url: `${SITE_URL}/blog/categoria/${slug}` },
        ]),
      ],
    })
  }

  if (path.startsWith('/blog/')) {
    const slug = path.split('/').pop() || ''
    const post = getPost(slug)
    if (post) {
      return page({
        title: `${post.title} | FiscalPoint`,
        description: post.description,
        canonical: post.canonical,
        ogType: 'article',
        image: `${SITE_URL}${post.cover}`,
        imageAlt: post.coverAlt,
        preloadImage: post.cover,
        articleMeta: {
          published: post.date,
          modified: post.updated,
          author: post.author,
          section: post.category,
        },
        jsonld: [
          blogPostingLd(post),
          breadcrumbLd([
            { name: 'Inicio', url: `${SITE_URL}/` },
            { name: 'Blog', url: `${SITE_URL}/blog` },
            { name: post.title, url: post.canonical },
          ]),
        ],
      })
    }
  }

  // Fallback (e.g. 404) — noindex.
  return [
    `  <title>Página no encontrada | FiscalPoint</title>`,
    `  <meta name="robots" content="noindex, follow" />`,
  ].join('\n')
}

/* --------------------------------------------------------------- sitemap/rss */

export function buildSitemapXml(): string {
  const today = new Date().toISOString().slice(0, 10)
  const posts = getPublished()
  const blogLastmod = posts.reduce((m, p) => (p.updated > m ? p.updated : m), '2026-01-01')

  const urls: { loc: string; lastmod: string; priority: string; changefreq: string }[] = [
    { loc: `${SITE_URL}/`, lastmod: today, priority: '1.0', changefreq: 'monthly' },
    { loc: `${SITE_URL}/blog`, lastmod: blogLastmod, priority: '0.8', changefreq: 'weekly' },
  ]
  for (const c of getCategories()) {
    const lastmod = getByCategory(c.slug).reduce((m, p) => (p.updated > m ? p.updated : m), '2026-01-01')
    urls.push({ loc: `${SITE_URL}/blog/categoria/${c.slug}`, lastmod, priority: '0.6', changefreq: 'weekly' })
  }
  for (const p of posts) {
    urls.push({ loc: p.canonical, lastmod: p.updated, priority: '0.7', changefreq: 'monthly' })
  }

  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
}

export function buildRssXml(): string {
  const posts = getPublished()
  const now = new Date().toUTCString()
  const items = posts
    .map(
      (p) =>
        `    <item>\n      <title>${esc(p.title)}</title>\n      <link>${p.canonical}</link>\n      <guid isPermaLink="true">${p.canonical}</guid>\n      <description>${esc(p.description)}</description>\n      <category>${esc(p.category)}</category>\n      <pubDate>${new Date(p.date).toUTCString()}</pubDate>\n    </item>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n  <channel>\n    <title>Blog de FiscalPoint — Facturación electrónica e-CF / DGII</title>\n    <link>${SITE_URL}/blog</link>\n    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />\n    <description>Guías sobre facturación electrónica, e-CF y certificación DGII en República Dominicana.</description>\n    <language>es-do</language>\n    <lastBuildDate>${now}</lastBuildDate>\n${items}\n  </channel>\n</rss>\n`
}
