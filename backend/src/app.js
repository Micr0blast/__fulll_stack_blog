import express from 'express'
import { postsRoutes } from './routes/posts.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import { userRoutes } from './routes/routes.js'

const app = express()
app.use(cors())
app.use(bodyParser.json())

postsRoutes(app)
userRoutes(app)
app.get('/', (req, res) => {
  res.send('Hello from Express')
})
export { app }
