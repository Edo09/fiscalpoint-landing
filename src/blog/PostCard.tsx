import { Link } from 'react-router-dom'
import type { Post } from '../content/posts'
import { formatDate } from './format'

interface Props {
  post: Post
  eager?: boolean
  headingTag?: 'h2' | 'h3'
}

export default function PostCard({ post, eager = false, headingTag = 'h2' }: Props) {
  const H = headingTag
  const fallback = post.cover.replace(/\.webp$/, '.png')
  return (
    <article className="post-card card-lift">
      <Link to={`/blog/${post.slug}`} className="post-card-media" tabIndex={-1} aria-hidden="true">
        <picture>
          <source srcSet={post.cover} type="image/webp" />
          <img
            src={fallback}
            alt={post.coverAlt}
            width={1200}
            height={630}
            loading={eager ? undefined : 'lazy'}
            decoding="async"
          />
        </picture>
      </Link>
      <div className="post-card-body">
        <Link className="post-card-cat" to={`/blog/categoria/${post.categorySlug}`}>
          {post.category}
        </Link>
        <H className="post-card-title">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </H>
        <p className="post-card-desc">{post.description}</p>
        <div className="post-card-meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} de lectura</span>
        </div>
      </div>
    </article>
  )
}
