import React from 'react'

import './Filters.css'

const TaskFilter = (props) => {
  const { currentFilter, onToggleFilters } = props
  const filterList = ['all', 'active', 'completed'].map((filter) => {
    return (
      <li key={filter}>
        <button className={filter === currentFilter ? 'selected' : undefined} onClick={() => onToggleFilters(filter)}>
          {filter}
        </button>
      </li>
    )
  })
  return <ul className="filters">{filterList}</ul>
}

export default TaskFilter
