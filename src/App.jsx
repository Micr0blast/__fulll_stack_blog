import './App.css'
import { PostFilter } from './components/PostFilter.jsx'
import { CreatePost } from './components/CreatePost.jsx'
import { PostSorting } from './components/PostSorting.jsx'

export function App() {
  return (
    <div style={{ padding: 8 }}>
      <CreatePost />
      <br />
      <hr />
      Filter by:
      <PostFilter field='author' />
      <br />
      <PostSorting fields={['createdAt', 'updatedAt']} />
      <hr />
    </div>
  )
}
