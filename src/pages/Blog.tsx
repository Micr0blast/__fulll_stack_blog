import { PostFilter } from '../components/PostFilter.tsx'
import { CreatePost } from '../components/CreatePost.tsx'
import { PostSorting } from '../components/PostSorting.tsx'
import { PostList } from '../components/PostList.tsx'
import { getPosts } from '../api/posts.ts'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState, FC } from 'react'
import { PostData } from '../types.ts'
import { Header } from '../components/Header.tsx'


import dotenv from 'dotenv'
dotenv.config()

export const Blog: FC = () => {
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  useEffect(() => {
    document.title = `Full Stack React Blog`
  },[])

  const postsQuery = useQuery({
    queryKey: ['posts', { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  })

  const posts: PostData[] = postsQuery.data ?? []

  return (
    <div style={{ padding: 8 }}>
      <Header/>
      <br/>
      <hr/>
      <br/>
      <CreatePost />
      <br />
      <hr />
      <PostFilter
        field='author'
        value={author}
        onChange={(value) => setAuthor(value)}
      />
      <br />
      <PostSorting
        fields={['createdAt', 'updatedAt']}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <hr />
      <PostList posts={posts} />
    </div>
  )
}
