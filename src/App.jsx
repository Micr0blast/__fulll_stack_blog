import './App.css'
import { Post } from './components/Post.jsx'

export function App() {
  const sample = {
    title: 'Hello React',
    contents: 'This is a blog post',
    author: 'MEEEEEE',
  }
  return Post(sample)
}
