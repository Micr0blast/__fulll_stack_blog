import { initDatabase } from './db/init.js'
import { Post } from './db/models/post.js'

await initDatabase()
const post = new Post({
  title: 'Hello Mongoose!',
  author: 'Stefan Plötz',
  contents: 'This is an example Post using Mongoose',
  tags: ['examples', 'javascript', 'mongoose', 'mongodb'],
})

const createdPost = await post.save()
await Post.findByIdAndUpdate(createdPost._id, {
  $set: { contents: 'This is an example of an updated Post' },
})
const posts = await Post.find()
console.log(posts)
