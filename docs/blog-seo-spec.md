# FiscalPoint Blog — Frontend Specification (SEO-first)

This document explains how the `/blog` section should be built. The blog is a
**content-marketing / SEO channel**, not just a place to publish text. Its purpose
is to rank on Google for the queries FiscalPoint's customers search in Spanish
(e.g. *"cómo emitir e-CF"*, *"certificación DGII paso a paso"*, *"e-CF vs NCF"*,
*"facturación electrónica obligatoria RD"*). **Every decision below exists to make
the blog crawlable and rankable.** If a choice hurts SEO, it's the wrong choice.

---

## 1. The non-negotiable requirement: static pre-rendering (SSG)

Blog pages **must be pre-rendered to static HTML at build time.** They may **not**
be rendered only on the client.

**Why:** the current site is a client-rendered React (Vite) app. A client-rendered
route ships an empty `<div id="root">` and fills it with JavaScript *after* load.
Search-engine crawlers and social-preview bots frequently index that empty shell —
so a client-only blog post has no title, no text, and no meta tags at crawl time,
and it will not rank or generate link previews. That defeats the entire purpose.

**What "done" looks like:** running the production build produces one real `.html`
file per post, each already containing the post's `<title>`, meta description,
Open Graph tags, structured data, and full article text.

**How:** use static pre-rendering on top of the existing React + Vite app. In order
of preference:

1. **React Router v7 framework mode** (recommended) — built-in `prerender()`.
2. **vite-react-ssg** — lighter SSG layer over react-router.
3. **Vike** — most flexible; per-page SSG/SSR/SPA.

The SEO requirements in this spec are identical no matter which tool is chosen.
Code examples assume React Router v7.

---

## 2. Routes & content source

| Route          | Type        | Description                                   |
| -------------- | ----------- | --------------------------------------------- |
| `/blog`        | Prerendered | Listing / index of all published posts        |
| `/blog/:slug`  | Prerendered | One page per post (one static HTML file each)  |

- **Content lives in `src/posts/*.md`** (Markdown + YAML frontmatter). One file per
  post. **The filename equals the slug** (`que-es-un-ecf.md` → `/blog/que-es-un-ecf`).
- At build, read the posts directory, filter out drafts, and generate both the
  listing data and the prerender URL list.

```ts
// react-router.config.ts
export default {
  async prerender() {
    const posts = await getAllPosts();               // read src/posts/*.md
    const published = posts.filter((p) => !p.draft);
    return ["/", "/blog", ...published.map((p) => `/blog/${p.slug}`)];
  },
} satisfies Config;
```

---

## 3. Content format (frontmatter)

Each post file starts with YAML frontmatter that drives all metadata. See the
sample post (`que-es-un-ecf.md`) for a complete example. Fields:

| Field         | Purpose                                                       |
| ------------- | ------------------------------------------------------------- |
| `title`       | `<h1>`, `<title>`, OG title, JSON-LD headline                 |
| `description` | Meta description, OG description (keep ≤ ~155 chars)          |
| `slug`        | URL segment and prerender path (matches filename)             |
| `date`        | Published date → `datePublished`                              |
| `updated`     | Last-modified date → `dateModified`                           |
| `author`      | Byline and JSON-LD author                                     |
| `category`    | Grouping / breadcrumb                                         |
| `tags`        | Related-posts and filtering                                   |
| `cover`       | Card image + OG/Twitter image                                 |
| `coverAlt`    | Alt text for the cover image                                  |
| `canonical`   | `<link rel="canonical">` and JSON-LD `@id`                    |
| `readingTime` | UI badge                                                      |
| `draft`       | If `true`, exclude from build and sitemap                     |

**Rule:** metadata is authored **once** in frontmatter; all SEO tags below are
derived from it. Never hardcode per-post metadata in components.

---

## 4. SEO requirements (per page)

### 4.1 Title & meta description
- Every post has a **unique** `<title>` and meta description from frontmatter.
- Format: `` `${title} | FiscalPoint` ``.
- The listing page has its own title/description too (not duplicated from a post).

### 4.2 Canonical URL
- Every page emits `<link rel="canonical" href="{canonical}">` with the absolute
  `https://www.fiscalpoint.com.do/...` URL. Prevents duplicate-content issues.

### 4.3 Open Graph + Twitter Card (per post)
Mirror what the homepage already does, but per post, with the post's cover image:

```tsx
// React Router v7 `meta` export (per post route)
export const meta = ({ data }) => [
  { title: `${data.title} | FiscalPoint` },
  { name: "description", content: data.description },
  { tagName: "link", rel: "canonical", href: data.canonical },
  { property: "og:type", content: "article" },
  { property: "og:title", content: data.title },
  { property: "og:description", content: data.description },
  { property: "og:url", content: data.canonical },
  { property: "og:image", content: `https://www.fiscalpoint.com.do${data.cover}` },
  { property: "og:locale", content: "es_DO" },
  { property: "og:site_name", content: "FiscalPoint" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: data.title },
  { name: "twitter:description", content: data.description },
  { name: "twitter:image", content: `https://www.fiscalpoint.com.do${data.cover}` },
];
```

### 4.4 Structured data (JSON-LD)
- **Each post** includes a `BlogPosting` script, injected into the prerendered HTML:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{title}",
  "description": "{description}",
  "image": "https://www.fiscalpoint.com.do{cover}",
  "datePublished": "{date}",
  "dateModified": "{updated}",
  "author": { "@type": "Person", "name": "{author}" },
  "publisher": {
    "@type": "Organization",
    "name": "FiscalPoint",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.fiscalpoint.com.do/assets/fp-icon-160.png"
    }
  },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "{canonical}" },
  "inLanguage": "es-DO"
}
```

- Add a `BreadcrumbList` (Inicio → Blog → Post) on post pages.
- The listing page can use `Blog` / `CollectionPage`.

### 4.5 Semantic HTML & headings
- Exactly **one `<h1>` per page** (the post title). Subsections use `<h2>`/`<h3>`
  in logical order — no skipping levels.
- Wrap the post body in `<article>`; use `<time dateTime="{date}">` for dates.
- The Markdown renderer must output real heading tags (not styled `<div>`s).

### 4.6 Sitemap & robots
- Generate `sitemap.xml` at build time including **every** published blog URL
  (plus `lastmod` from `updated`). Include the homepage.
- Reference it in `robots.txt`: `Sitemap: https://www.fiscalpoint.com.do/sitemap.xml`.
- Submit the sitemap in Google Search Console so posts are discovered quickly.

### 4.7 URLs
- Slugs are **lowercase, hyphenated, keyword-rich, in Spanish**
  (`certificacion-dgii-paso-a-paso`, not `post-1` or `Post_One`).
- No trailing slashes inconsistency, no query strings.
- **Slugs are permanent.** If a slug must change, add a 301 redirect from the old URL.

### 4.8 Images
- Cover and in-body images are compressed and served at sensible dimensions.
- Every image has descriptive `alt` text (Spanish).
- Set explicit `width`/`height` to avoid layout shift (CLS).
- Lazy-load below-the-fold images (`loading="lazy"`); the cover/LCP image should
  **not** be lazy-loaded.

### 4.9 Internal linking
- Every post links to relevant landing-page sections (e.g. `#planes`, `#requisitos`,
  the WhatsApp CTA) and to 2–3 related posts.
- The listing page links to each post; the site header should expose a "Blog" link
  so the section is reachable and gets internal link equity.

### 4.10 Language
- `<html lang="es">` on blog pages. All content and metadata in Spanish (es-DO).

### 4.11 Performance (Core Web Vitals)
- Core Web Vitals are a ranking signal. Pre-rendered HTML already helps.
- Keep client JS minimal, optimize fonts (preload, `font-display: swap`), and
  optimize the LCP image. Aim for green CWV / Lighthouse SEO 100.

---

## 5. Consistency with the existing site
- Reuse the current header, footer, brand color (`#2a6fdb`), and typography so the
  blog feels native — not a bolted-on section.
- Follow the homepage's existing OG image conventions (1200×630).

---

## 6. Optional enhancements (nice to have)
- RSS/Atom feed at `/blog/rss.xml`.
- Related-posts block driven by `tags`/`category`.
- Visible breadcrumbs UI that matches the `BreadcrumbList` JSON-LD.
- "Última actualización" shown when `updated` differs from `date`.

---

## 7. Deployment
- The build outputs static files → deploy to the same host as `fiscalpoint.com.do`
  (Vercel, or cPanel/shared hosting). Ensure `/blog` and `/blog/:slug` resolve to
  the prerendered `.html` files (configure rewrites/routing as needed for the host).

---

## Per-post SEO checklist
Before a post is considered done, confirm it renders (in the **prerendered HTML**,
not just in the browser):

- [ ] Unique `<title>` and meta description
- [ ] Absolute `<link rel="canonical">`
- [ ] Open Graph + Twitter tags with a valid cover image
- [ ] `BlogPosting` JSON-LD (+ `BreadcrumbList`)
- [ ] Single `<h1>`, logical `<h2>`/`<h3>` structure
- [ ] URL is in the generated `sitemap.xml`
- [ ] Lowercase, hyphenated, Spanish, keyword-rich slug
- [ ] All images have alt text and dimensions; LCP image not lazy-loaded
- [ ] Internal links to product sections and related posts
- [ ] `<html lang="es">`
