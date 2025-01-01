import {
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../services/posts.js'

export function postsRoutes(app) {
  app.get('/api/v1/posts', async (req, res) => {
    const { sortBy, orderBy, author, tags } = req.query
    const options = { sortBy, orderBy }

    try {
      if (sortBy && orderBy) {
        return res
          .status(400)
          .json({ error: 'query by author or tag, not both' })
      } else if (author) {
        return res.json(await listPostsByAuthor(author, options))
      } else if (tags) {
        return res.json(await listPostsByTag(tags, options))
      } else {
        return res.json(await listAllPosts())
      }
    } catch (err) {
      console.error(`error listinng posts`, err)
      return res.status(500).end()
    }
  })
  app.get('/api/v1/posts/:id', async (req, res) => {
    const { id } = req.params
    try {
      const post = await getPostById(id)
      if (post === null) return res.status(404).end()
      return res.json(post)
    } catch (err) {
      console.error(`error fetching post`, err)
      return res.status(500).end()
    }
  })
  app.post('/api/v1/posts', async (req, res) => {
    try {
      const post = await createPost(req.body)
      return res.json(post)
    } catch (err) {
      console.error(`error creating post`, err)
      return res.status(500).end()
    }
  })
  app.patch('/api/v1/posts/:id', async (req, res) => {
    try {
      const postId = req.params.id
      const post = await updatePost(postId, req.body)
      return res.json(post)
    } catch (err) {
      console.error(`error updating post`, err)
      return res.status(500).end()
    }
  })
  app.delete('/api/v1/posts/:id', async (req, res) => {
    try {
      const postId = req.params.id
      const post = await deletePost(postId)
      if (post.deletedCount === 0) return res.status(404)
      return res.status(204).json(post)
    } catch (err) {
      console.error(`error deleting post`, err)
      return res.status(500).end()
    }
  })
}
