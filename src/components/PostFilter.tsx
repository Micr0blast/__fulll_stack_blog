import PropTypes from 'prop-types'

export function PostFilter({ field, value, onChange }: {field:string, value:string, onChange: (value:string)=> void}) {
  return (
    <div>
      <label htmlFor={`filter-${field}`}>Filter by: {field}</label>
      <input
        type='text'
        id={`filter-${field}`}
        name={`filter-${field}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

PostFilter.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
