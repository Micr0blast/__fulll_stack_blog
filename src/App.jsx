import './App.css'
import { PostFilter } from './components/PostFilter.jsx'
import { CreatePost } from './components/CreatePost.jsx'
import { PostSorting } from './components/PostSorting.jsx'
import { PostList } from './components/PostList.jsx'

export function App() {
  const samplePosts = [
    { title: 'One', author: 'Me', contents: 'Triachars is a rule' },
    { title: 'Two' },
    { title: 'Three', author: 'He', contents: 'Fear the old blood' },
  ]
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
      <PostList posts={samplePosts} />
    </div>
  )
}
