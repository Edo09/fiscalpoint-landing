import { Link } from 'react-router-dom'
import Shell from '../components/Shell'
import Head from './Head'
import Breadcrumbs from './Breadcrumbs'
import PostCard from './PostCard'
import { getPublished, getCategories } from '../content/posts'

export default function BlogIndex() {
  const posts = getPublished()
  const cats = getCategories()
  return (
    <Shell>
      <Head
        title="Blog de facturación electrónica e-CF y DGII | FiscalPoint"
        description="Guías y respuestas sobre facturación electrónica, e-CF, certificación DGII y cumplimiento fiscal para empresas en República Dominicana."
      />
      <section className="container blog-wrap">
        <Breadcrumbs items={[{ name: 'Inicio', to: '/' }, { name: 'Blog' }]} />
        <header className="blog-head">
          <span className="eyebrow">Blog</span>
          <h1 className="blog-h1">Facturación electrónica e-CF, DGII y gestión</h1>
          <p className="blog-lead">
            Guías prácticas para emitir e-CF, certificarte ante la DGII y digitalizar la facturación
            de tu empresa en República Dominicana.
          </p>
        </header>

        {cats.length > 0 && (
          <nav className="cat-chips" aria-label="Categorías del blog">
            <span className="cat-chip is-active">Todos</span>
            {cats.map((c) => (
              <Link key={c.slug} className="cat-chip" to={`/blog/categoria/${c.slug}`}>
                {c.name} <span className="cat-count">{c.count}</span>
              </Link>
            ))}
          </nav>
        )}

        <div className="post-grid">
          {posts.map((p, i) => (
            <PostCard key={p.slug} post={p} eager={i === 0} />
          ))}
        </div>
      </section>
    </Shell>
  )
}
