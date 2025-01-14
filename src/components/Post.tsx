import PropTypes from 'prop-types'
import { PostData } from '../types'
import { User } from './User.tsx'
import { Link } from 'react-router-dom'

function makeSlug(title: string): string {
  const re = '/[a-zA-Z0-9 ]/g'
  let slug = title.replace(re,'')
  slug = slug.replace(" ", '-')
  slug = slug.toLowerCase()
  return slug
}

export function Post(data: PostData) {
  
  return (
    <article>
      {data.fullPost ?(
        <h3>{data.title}</h3>
      ): (
        <Link to={`/posts/${data._id}/${makeSlug(data.title)}`}>
          <h3>{data.title}</h3>
        </Link>
      )}

      {data.fullPost && (
        <div>{data.contents}</div>
      )}

      <em>
        {data.fullPost && (<br />)}
        Written by <strong><User userId={data.author}/></strong>
      </em>
      
    </article>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  fullPost: PropTypes.bool
}
