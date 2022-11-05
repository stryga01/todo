import React from 'react'

import './footer.css'
import TaskFilter from '../task-filter/task-filter'

const Footer = ({ filters, doneCount, onToggleFilters, onClearCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{doneCount} items left</span>
      <TaskFilter filters={filters} onToggleFilters={(filterName) => onToggleFilters(filterName)} />
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
