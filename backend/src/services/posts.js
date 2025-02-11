import { Post } from '../db/models/post.js'
import { UserAuth } from '../db/models/userauth.js'

export async function createPost(userId, { title, contents, tags }) {
  const post = new Post({ title, author: userId, contents, tags })
  return await post.save()
}

export async function deletePost(userId, postId) {
  return await Post.deleteOne({ _id: postId, author: userId })
}

export async function updatePost(userId, postId, { title, contents, tags }) {
  return await Post.findOneAndUpdate(
    { _id: postId },
    { $set: { title, contents, tags } },
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
  const users = await UserAuth.findOne({ username: author })
  if (!users) return []
  return await listPosts({ author: users._id }, options)
}

export async function listPostsByTag(tags, options) {
  return await listPosts({ tags }, options)
}
