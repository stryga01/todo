import React from 'react'

import './task-filter.css'

const TaskFilter = (props) => {
  const { all, active, completed } = props.filters
  const { onToggleFilters } = props
  return (
    <ul className="filters">
      <li>
        <button className={all ? 'selected' : undefined} onClick={() => onToggleFilters('all')}>
          All
        </button>
      </li>
      <li>
        <button className={active ? 'selected' : undefined} onClick={() => onToggleFilters('active')}>
          Active
        </button>
      </li>
      <li>
        <button className={completed ? 'selected' : undefined} onClick={() => onToggleFilters('completed')}>
          Completed
        </button>
      </li>
    </ul>
  )
}

export default TaskFilter
