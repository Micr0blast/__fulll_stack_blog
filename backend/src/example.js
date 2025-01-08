import dotenv from 'dotenv'
dotenv.config()
import { initDatabase } from './db/init.js'
import { Post } from './db/models/post.js'
import { UserAuth } from './db/models/userauth.js'

await initDatabase()

const user = new UserAuth({
  username: 'stpl',
  password: 'chicken',
})

const createdUser = await user.save()
console.log(createdUser)

const post = new Post({
  title: 'Hello Mongoose!',
  author: createdUser._id,
  contents: 'This is an example Post using Mongoose',
  tags: ['examples', 'javascript', 'mongoose', 'mongodb'],
})

const createdPost = await post.save()
await Post.findByIdAndUpdate(createdPost._id, {
  $set: { contents: 'This is an example of an updated Post' },
})
const posts = await Post.find()

console.log(posts)
