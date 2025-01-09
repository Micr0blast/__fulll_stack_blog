import { FormEvent, useState } from 'react'
import { createPost } from '../api/posts.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PostData } from '../types.ts'

export function CreatePost() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [contents, setContents] = useState('')

  const queryClient = useQueryClient()

  const createPostsMutation = useMutation({
    mutationFn: () => createPost({ title, author, contents }),
    onSuccess: ()=>queryClient.invalidateQueries({queryKey:['posts']}),
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    createPostsMutation.mutate()
  }

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
      <div>
        <label htmlFor='create-author'>Author: </label>
        <input
          type='text'
          name='create-author'
          id='create-author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
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
