import { Link } from 'react-router-dom'

export interface Crumb {
  name: string
  to?: string
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Ruta de navegación">
      <ol>
        {items.map((it, i) => (
          <li key={i}>
            {it.to ? (
              <Link to={it.to}>{it.name}</Link>
            ) : (
              <span aria-current="page">{it.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
