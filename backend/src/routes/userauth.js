import { createUserAuth } from '../services/userauth.js'

export function userAuthRoutes(app) {
  app.post('/api/v1/user/signup', async (req, res) => {
    try {
      const newUserAuth = await createUserAuth(req.body)
      return res.status(201).json({ username: newUserAuth.username })
    } catch (err) {
      // TODO add error handling
      console.log(
        `failure to create the user, does the user already exist?`,
        err,
      )
      res.status(400).end()
    }
  })
}
