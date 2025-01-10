import { FormEvent, useState } from 'react'
import { createPost } from '../api/posts.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../contexts/AuthContext.tsx'
import { jwtDecode } from 'jwt-decode'

export function CreatePost() {
  const [title, setTitle] = useState('')
  const [token, ] = useAuth()

  const [contents, setContents] = useState('')

  const queryClient = useQueryClient()


  const createPostsMutation = useMutation({
    mutationFn: () => createPost(token, { title, contents }),
    onSuccess: ()=>queryClient.invalidateQueries({queryKey:['posts']}),
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    createPostsMutation.mutate()
  }
  if (!token) return <div> Login to create posts!</div>
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='create-title'>Title: </label>
        <input
          type='text'
          name='create-title'
          id='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <textarea
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      <br />
      <input
        type='submit'
        value={createPostsMutation.isPending ? 'Creating...' : 'Create'}
        disabled={!title || createPostsMutation.isPending}
      />
      {createPostsMutation.isSuccess ? (
        <>
          <br />
          Post created successfully!
        </>
      ) : null}
    </form>
  )
}
