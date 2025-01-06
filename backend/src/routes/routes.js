import {
  getAllAuthors,
  getAllReaders,
  createUser,
  listAllUsers,
} from '../services/users.js'

export function userRoutes(app) {
  /** only get and create routes for now */

  app.get('/api/v1/users', async (req, res) => {
    const { sortBy, sortOrder, isAuthor } = req.query
    const options = { sortBy, sortOrder }
    try {
      if (isAuthor) {
        const authors = await getAllAuthors(options)
        if (authors.length > 0) {
          return res.json(authors)
        } else {
          return res.status(204).end()
        }
      } else if (!isAuthor) {
        return res.json(await getAllReaders(options))
      } else {
        return res.json(await listAllUsers(options))
      }
    } catch (err) {
      console.error(`error listing users`, err)
      return res.status(500).end()
    }
  })
  app.post('/api/v1/users', async (req, res) => {
    try {
      const user = await createUser(req.body)
      return res.json(user)
    } catch (err) {
      console.error(`error creating user`, err)
      return res.status(500).end()
    }
  })
}
