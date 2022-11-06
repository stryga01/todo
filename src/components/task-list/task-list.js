import React from 'react'

import './task-list.css'
import TaskItem from '../task-item/task-item.js'

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
