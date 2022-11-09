import React from 'react'

import './TaskList.css'
import TaskItem from '../TaskItem/TaskItem'

const TaskList = (props) => {
  const { tasks, onDeleted, onToggleDone, onEditingTask } = props

  const taskList = tasks.map((task) => {
    return (
      <TaskItem
        task={task}
        key={task.id}
        onEditingTask={(id, text) => onEditingTask(id, text)}
        onDeleted={() => onDeleted(task.id)}
        onToggleDone={() => onToggleDone(task.id)}
      />
    )
  })
  return <ul className="todo-list">{taskList}</ul>
}
export default TaskList
