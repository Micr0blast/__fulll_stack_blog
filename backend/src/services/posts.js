import { Post } from '../db/models/post.js'
import { UserAuth } from '../db/models/userauth.js'

export async function createPost({ title, author, contents, tags }) {
  const post = new Post({ title, author, contents, tags })
  return await post.save()
}

export async function deletePost(postId) {
  return await Post.deleteOne({ _id: postId })
}

export async function updatePost(postId, { title, author, contents, tags }) {
  const authorObj = await UserAuth.findOne({ username: author })
  return await Post.findOneAndUpdate(
    { _id: postId },
    { $set: { title, author: authorObj._id, contents, tags } },
    { new: true },
  )
}

export async function getPostById(postId) {
  return await Post.findById(postId)
}

async function listPosts(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  return await Post.find(query).sort({ [sortBy]: sortOrder })
}

export async function listAllPosts(options) {
  return await listPosts({}, options)
}

export async function listPostsByAuthor(author, options) {
  const authorObject = await UserAuth.findOne({ username: author })

  return await listPosts({ author: authorObject._id }, options)
}

export async function listPostsByTag(tags, options) {
  return await listPosts({ tags }, options)
}
