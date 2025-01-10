import PropTypes from 'prop-types'
import { PostData } from '../types'
import { User } from './User.tsx'

export function Post(data: PostData) {
  return (
    <article>
      <h3>{data.title}</h3>
      <div>{data.contents}</div>
      {data.author && (
        <em>
          <br />
          Written by <strong><User userId={data.author}/></strong>
        </em>
      )}
    </article>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
}
