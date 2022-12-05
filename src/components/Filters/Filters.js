import React from 'react'
import './Filters.css'
import PropTypes from 'prop-types'

const TaskFilter = (props) => {
  const { currentFilter, setCurrentFilter } = props
  const filterList = ['all', 'active', 'completed'].map((filter) => {
    return (
      <li key={filter}>
        <button className={filter === currentFilter ? 'selected' : undefined} onClick={() => setCurrentFilter(filter)}>
          {filter}
        </button>
      </li>
    )
  })
  return <ul className="filters">{filterList}</ul>
}

TaskFilter.defaultProps = {
  currentFilter: 'all',
  onToggleFilters: () => {},
}

TaskFilter.propTypes = {
  currentFilter: PropTypes.string,
  onToggleFilters: PropTypes.func,
}

export default TaskFilter
