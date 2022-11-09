import React from 'react'

import './Footer.css'
import Filters from '../Filters/Filters'

const Footer = ({ currentFilter, tasks, onToggleFilters, onClearCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{tasks.filter((task) => !task.done).length} items left</span>
      <Filters currentFilter={currentFilter} onToggleFilters={(filterName) => onToggleFilters(filterName)} />
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
