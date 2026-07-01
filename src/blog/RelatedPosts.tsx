import type { Post } from '../content/posts'
import { relatedPosts } from '../content/posts'
import PostCard from './PostCard'

export default function RelatedPosts({ post }: { post: Post }) {
  const related = relatedPosts(post, 3)
  if (!related.length) return null
  return (
    <section className="related" aria-labelledby="rel-title">
      <h2 id="rel-title" className="related-title">Artículos relacionados</h2>
      <div className="post-grid">
        {related.map((p) => (
          <PostCard key={p.slug} post={p} headingTag="h3" />
        ))}
      </div>
    </section>
  )
}
