import PropTypes from 'prop-types'

export function PostFilter({ field }) {
  return (
    <div>
      <label htmlFor={`filter-${field}`}>Filter by: {field}</label>
      <input type='text' id={`filter-${field}`} name={`filter-${field}`} />
    </div>
  )
}

PostFilter.propTypes = {
  field: PropTypes.string.isRequired,
}
