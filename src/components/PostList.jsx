import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { Post } from './Post.jsx'

export function PostList({ posts = [] }) {
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
