import mongoose from 'mongoose'
import { describe, expect, test, beforeEach } from '@jest/globals'

import {
  createPost,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  updatePost,
  getPostById,
  deletePost,
} from '../services/posts.js'

import { Post } from '../db/models/post.js'

describe('creating posts', () => {
  test('creating post with all parameters should succeed', async () => {
    const post = {
      title: 'Test article; all params',
      author: 'Stefan Ploetz',
      contents: 'This post is stored inside a mongoDb using mongoose',
      tags: ['mongoose', 'mongodb'],
    }
    const createdPost = await createPost(post)
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
    const foundPost = await Post.findById(createdPost._id)
    expect(foundPost).toBeInstanceOf(Post)
    expect(foundPost.createdAt).toBeInstanceOf(Date)
    expect(foundPost.updatedAt).toBeInstanceOf(Date)
  })
  test('creating post without title should fail', async () => {
    const post = {
      author: 'STPL',
      contents: 'This post is stored inside a mongoDb using mongoose',
      tags: ['mongoose', 'mongodb'],
    }
    try {
      await createPost(post)
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.message).toContain('`title` is required')
    }
  })
  test('creating post with minmal parameters should succeed', async () => {
    const post = {
      title: 'Test title',
    }
    const createdPost = await createPost(post)
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
})

// setup state for data
const samplePosts = [
  { title: 'Reddit posts', author: 'Stpl', tags: ['Space', 'Star Wars'] },
  { title: 'Riddick is only a victim', author: 'Stpl', tags: ['Space'] },
  { title: ' Anakin did nothing worng', author: 'Palp', tags: ['Star Wars'] },
]

let createdSamplePosts = []
beforeEach(async () => {
  await Post.deleteMany({}) // deleta all posts in DB
  createdSamplePosts = []
  for (const post of samplePosts) {
    const createdPost = new Post(post)
    createdSamplePosts.push(await createdPost.save())
  }
})

describe('querying posts', () => {
  test('get all posts', async () => {
    const posts = await listAllPosts()
    expect(posts.length).toEqual(createdSamplePosts.length)
  })
  test('should return posts in descending order by creationDate', async () => {
    const posts = await listAllPosts()
    // copy posts and sort
    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => b.createdAt - a.createdAt, // descending order
    )
    expect(posts.map((post) => post.createdAt)).toEqual(
      sortedSamplePosts.map((createdPost) => createdPost.createdAt),
    )
    // check if equal
  })
  test('sort by updatedAt and ascending', async () => {
    const posts = await listAllPosts({
      sortBy: 'updatedAt',
      sortOrder: 'ascending',
    })
    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => a.updatedAt - b.updatedAt,
    )
    expect(posts.map((post) => post.updatedAt)).toEqual(
      sortedSamplePosts.map((sortedPost) => sortedPost.updatedAt),
    )
  })
  test('get all posts by author:stpl', async () => {
    const posts = await listPostsByAuthor('Stpl')
    expect(posts.length).toEqual(2)
  })
  test('get all posts by tag:Star Wars', async () => {
    const posts = await listPostsByTag('Star Wars')
    expect(posts.length).toEqual(2)
  })
})

describe('getting a post', () => {
  test('should return full post', async () => {
    const post = await getPostById(createdSamplePosts[0]._id)
    expect(post.toObject()).toEqual(createdSamplePosts[0].toObject())
  })
  test('should return null if Post does not exist', async () => {
    const post = await getPostById('000000000000000000000000')
    expect(post).toEqual(null)
  })
})

describe('updating a post', () => {
  test('should update given property', async () => {
    const postId = createdSamplePosts[0]._id
    await updatePost(postId, { author: 'Deoxys' })
    const updatedPost = await getPostById(postId)
    expect(updatedPost.author).toEqual('Deoxys')
  })
  test('should not update other properties', async () => {
    const postId = createdSamplePosts[0]._id
    await updatePost(postId, { author: 'Deoxys' })
    const updatedPost = await getPostById(postId)
    expect(updatedPost.author).toEqual('Deoxys')
    expect(updatedPost.title).toEqual('Reddit posts')
    expect(updatedPost.tags).toEqual(['Space', 'Star Wars'])
  })
  test('should update Timestamps', async () => {
    const postId = createdSamplePosts[0]._id
    await updatePost(postId, { author: 'Test author' })
    const updatedPost = await getPostById(postId)
    expect(updatedPost.updatedAt.getTime()).toBeGreaterThan(
      updatedPost.createdAt.getTime(),
    )
  })
  test('should return null if Id does not exist', async () => {
    const postId = '000000000000000000000000'
    const updatedPost = await updatePost(postId, { author: 'Testing author' })
    expect(updatedPost).toBe(null)
  })
})

describe('deleting a post', () => {
  test('should remove post from database', async () => {
    const postId = createdSamplePosts[0]._id
    const deletedPost = await deletePost(postId)
    expect(deletedPost.deletedCount).toBe(1)
    expect(await getPostById(postId)).toEqual(null)
  })
  test('should fail if postId does not exist', async () => {
    const postId = '000000000000000000000000'
    const deletedPost = await deletePost(postId)
    expect(deletedPost.deletedCount).toEqual(0)
  })
})
