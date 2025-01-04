import PropTypes from 'prop-types'

interface PostSortingProps {
  /** Data-Fields which can be used for sorting */
  fields: string[],
  /** State Variable for sorting variable */
  value: string,
    /** SetterFn for sorting variable */
  onChange: (value:string) => void,
  /** State Variable for ordering variable */
  orderValue: string,
  /** SetterFn for ordering variable */
  onOrderChange: (value: string) => void
}

export function PostSorting({
  fields = [],
  value,
  onChange,
  orderValue,
  onOrderChange,
}: PostSortingProps) {
  return (
    <div>
      <label htmlFor='sortBy'>Sort by: </label>
      <select
        name='sortBy'
        id='sortBy'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {fields.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>
      {' / '}
      <label htmlFor='sortOrder'>Sort Order: </label>
      <select
        name='sortOrder'
        id='sortOrder'
        value={orderValue}
        onChange={(e) => onOrderChange(e.target.value)}
      >
        <option value={'ascending'}>ascending</option>
        <option value={'descending'}>descending</option>
      </select>
    </div>
  )
}

PostSorting.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  orderValue: PropTypes.string.isRequired,
  onOrderChange: PropTypes.func.isRequired,
}
