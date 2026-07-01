import { POSTS, type GeneratedPost } from './posts.generated'

export type Post = GeneratedPost

/** Published posts (drafts excluded), newest first. */
export function getPublished(): Post[] {
  return POSTS.filter((p) => !p.draft)
}

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug && !p.draft)
}

export interface Category {
  name: string
  slug: string
  count: number
}

export function getCategories(): Category[] {
  const map = new Map<string, Category>()
  for (const p of getPublished()) {
    const c = map.get(p.categorySlug) || { name: p.category, slug: p.categorySlug, count: 0 }
    c.count++
    map.set(p.categorySlug, c)
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}

export function getByCategory(catSlug: string): Post[] {
  return getPublished().filter((p) => p.categorySlug === catSlug)
}

export function getCategoryName(catSlug: string): string | undefined {
  return getPublished().find((p) => p.categorySlug === catSlug)?.category
}

/** Related posts by shared category (weight 2) + shared tags (weight 1). */
export function relatedPosts(post: Post, n = 3): Post[] {
  const scored = getPublished()
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      let score = p.category === post.category ? 2 : 0
      score += p.tags.filter((t) => post.tags.includes(t)).length
      return { p, score }
    })
    .sort((a, b) => b.score - a.score || (a.p.date < b.p.date ? 1 : -1))
  return scored.slice(0, n).map((s) => s.p)
}
