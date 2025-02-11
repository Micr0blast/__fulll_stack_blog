import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { Post } from './Post.tsx'
import { PostData } from '../types.ts'

export function PostList({posts= []} : {posts: PostData[]}) {
  // render a list of posts
  return (
    <div>
      {posts.map((post) => (
        <Fragment key={post._id}>
          <Post {...post} />
          <hr />
        </Fragment>
      ))}
    </div>
  )
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)).isRequired,
}
