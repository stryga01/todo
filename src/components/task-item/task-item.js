import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import './task-item.css'

export default class TaskItem extends React.Component {
  constructor() {
    super()
    this.state = {
      editing: false,
    }

    this.onToggleEditing = () => {
      const { task, onDeleted } = this.props
      if (!task.content) onDeleted(task.id)
      this.setState(({ editing }) => {
        return {
          editing: !editing,
        }
      })
    }
    this.onPressEnter = (e) => {
      const { task, onDeleted } = this.props
      if (!task.content) onDeleted(task.id)
      if (e.key === 'Enter') {
        this.setState(({ editing }) => {
          return {
            editing: !editing,
          }
        })
      }
    }

    this.onChangeEditing = (e) => {
      const { onEditingTask, task } = this.props
      onEditingTask(task.id, e.target.value)
    }
  }

  render() {
    const { onDeleted, onToggleDone, task } = this.props
    const { content, done, updated, creationDate, updatedDate } = task
    const { editing } = this.state

    return (
      <li className={editing ? 'editing' : done ? 'completed' : undefined}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onToggleDone} defaultChecked={done} />
          <label>
            <span className="description">{content}</span>
            <span className="created">
              {updated ? 'updated ' : 'created '}
              {updated ? formatDistanceToNow(updatedDate) : formatDistanceToNow(creationDate)} ago
            </span>
          </label>
          <button className="icon icon-edit" onClick={this.onToggleEditing}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {editing ? (
          <input
            type="text"
            className="edit"
            onChange={this.onChangeEditing}
            onKeyPress={this.onPressEnter}
            value={content}
            onBlur={this.onToggleEditing}
            autoFocus
          />
        ) : null}
      </li>
    )
  }
}
