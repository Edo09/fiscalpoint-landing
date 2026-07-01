import { useParams, Link } from 'react-router-dom'
import Shell from '../components/Shell'
import Head from './Head'
import Breadcrumbs from './Breadcrumbs'
import PostCard from './PostCard'
import NotFound from '../pages/NotFound'
import { getByCategory, getCategoryName } from '../content/posts'

export default function CategoryPage() {
  const { cat = '' } = useParams()
  const name = getCategoryName(cat)
  const posts = getByCategory(cat)
  if (!name) return <NotFound />

  return (
    <Shell>
      <Head
        title={`${name} · Blog | FiscalPoint`}
        description={`Artículos sobre ${name.toLowerCase()} en el blog de FiscalPoint: facturación electrónica e-CF y cumplimiento DGII en República Dominicana.`}
      />
      <section className="container blog-wrap">
        <Breadcrumbs items={[{ name: 'Inicio', to: '/' }, { name: 'Blog', to: '/blog' }, { name }]} />
        <header className="blog-head">
          <span className="eyebrow">Categoría</span>
          <h1 className="blog-h1">{name}</h1>
          <p className="blog-lead">Artículos de la categoría {name} en el blog de FiscalPoint.</p>
        </header>
        <div className="post-grid">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
        <p style={{ marginTop: 28 }}>
          <Link className="back-link" to="/blog">← Volver al blog</Link>
        </p>
      </section>
    </Shell>
  )
}
