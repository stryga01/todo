import React from 'react'
import './Footer.css'
import PropTypes from 'prop-types'

import Filters from '../Filters/Filters'

const Footer = ({ currentFilter, tasks, onToggleFilters, setCurrentFilter, deleteAllDoneTasks }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{tasks.filter((task) => !task.done).length} items left</span>
      <Filters
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
        onToggleFilters={(filterName) => onToggleFilters(filterName)}
      />
      <button className="clear-completed" onClick={deleteAllDoneTasks}>
        Clear completed
      </button>
    </footer>
  )
}
Footer.defaultProps = {
  currentFilter: 'all',
  tasks: [],
  onToggleFilters: () => {},
  onClearCompleted: () => {},
}

Footer.propTypes = {
  currentFilter: PropTypes.string,
  tasks: PropTypes.array,
  onToggleFilters: PropTypes.func,
  onClearCompleted: PropTypes.func,
}

export default Footer
