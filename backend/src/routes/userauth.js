import {
  createUserAuth,
  getUserInfoById,
  loginUser,
} from '../services/userauth.js'

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
      res.status(400).json({
        error: `failure to create the user, does the user already exist?`,
      })
    }
  })

  app.post('/api/v1/user/login', async (req, res) => {
    try {
      const token = await loginUser(req.body)
      return res.status(200).send({ token })
    } catch (err) {
      console.error(
        'login failed, did you enter the correct username/password?',
        err,
      )
      res.status(400).json({
        error: 'login failed, did you enter the correct username/password?',
      })
    }
  })

  /** TODO change signup to email based sign in and pull apart login and authorisation and user profile info fetching */
  app.get('/api/v1/users/:id', async (req, res) => {
    const userId = req.params.id
    try {
      const userInfo = await getUserInfoById(userId)
      return res.status(200).send(userInfo)
    } catch (err) {
      res.status(404).end()
    }
  })
}
