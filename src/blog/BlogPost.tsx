import { useParams, Link } from 'react-router-dom'
import Shell from '../components/Shell'
import Head from './Head'
import Breadcrumbs from './Breadcrumbs'
import RelatedPosts from './RelatedPosts'
import NotFound from '../pages/NotFound'
import { getPost } from '../content/posts'
import { formatDate } from './format'
import { WHATSAPP_URL } from '../data'

export default function BlogPost() {
  const { slug = '' } = useParams()
  const post = getPost(slug)
  if (!post) return <NotFound />

  const fallback = post.cover.replace(/\.webp$/, '.png')
  const showUpdated = post.updated && post.updated !== post.date

  return (
    <Shell>
      <Head title={`${post.title} | FiscalPoint`} description={post.description} />
      <article className="post container">
        <Breadcrumbs
          items={[
            { name: 'Inicio', to: '/' },
            { name: 'Blog', to: '/blog' },
            { name: post.category, to: `/blog/categoria/${post.categorySlug}` },
            { name: post.title },
          ]}
        />
        <header className="post-header">
          <Link className="post-cat" to={`/blog/categoria/${post.categorySlug}`}>
            {post.category}
          </Link>
          <h1 className="post-title">{post.title}</h1>
          <p className="post-lead">{post.description}</p>
          <div className="post-byline">
            <span>{post.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime} de lectura</span>
          </div>
        </header>

        <picture>
          <source srcSet={post.cover} type="image/webp" />
          <img
            className="post-cover"
            src={fallback}
            alt={post.coverAlt}
            width={1200}
            height={630}
            decoding="async"
          />
        </picture>

        {showUpdated && (
          <p className="post-updated">
            Última actualización: <time dateTime={post.updated}>{formatDate(post.updated)}</time>
          </p>
        )}

        <div className="post-body" dangerouslySetInnerHTML={{ __html: post.html }} />

        <aside className="post-cta-band">
          <h2>¿Listo para emitir e-CF con la DGII?</h2>
          <p>Te acompañamos desde la certificación hasta tu primer comprobante en producción.</p>
          <div className="post-cta-actions">
            <a className="btn btn-primary" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Escríbenos por WhatsApp
            </a>
            <a className="btn btn-ghost" href="/#planes">Ver planes</a>
          </div>
        </aside>

        <RelatedPosts post={post} />
      </article>
    </Shell>
  )
}
