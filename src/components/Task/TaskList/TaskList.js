import React from 'react'
import './TaskList.css'
import PropTypes from 'prop-types'

import TaskItem from '../TaskItem/TaskItem'

const TaskList = (props) => {
  const { tasks, onToggleDone, onEditingTask, deleteTask, addTask, setTime } = props

  const taskList = tasks.map((task) => {
    return (
      <TaskItem
        key={task.id}
        task={task}
        setTime={setTime}
        onToggleDone={onToggleDone}
        onEditingTask={onEditingTask}
        deleteTask={deleteTask}
        addTask={addTask}
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
