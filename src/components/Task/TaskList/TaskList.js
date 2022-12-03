import React from 'react'
import './TaskList.css'
import PropTypes from 'prop-types'

import TaskItem from '../TaskItem/TaskItem'

const TaskList = (props) => {
  const { tasks, onDeleted, onToggleDone, onEditingTask, startTimer, setTime } = props

  const taskList = tasks.map((task) => {
    return (
      <TaskItem
        task={task}
        setTime={setTime}
        key={task.id}
        onEditingTask={(id, text) => onEditingTask(id, text)}
        onDeleted={() => onDeleted(task.id)}
        onToggleDone={() => onToggleDone(task.id)}
        startTimer={startTimer}
      />
    )
  })
  return <ul className="todo-list">{taskList}</ul>
}
TaskList.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
  onEditingTask: () => {},
  task: {},
}

TaskList.propTypes = {
  task: PropTypes.object,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onEditingTask: PropTypes.func,
}
export default TaskList
