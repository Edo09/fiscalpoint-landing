import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import BlogIndex from './blog/BlogIndex'
import BlogPost from './blog/BlogPost'
import CategoryPage from './blog/CategoryPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/blog/categoria/:cat" element={<CategoryPage />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
