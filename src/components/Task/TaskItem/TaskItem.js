import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import './TaskItem.css'
import Timer from '../../Timer/Timer'

export default class TaskItem extends React.Component {
  state = {
    editing: false,
  }

  onPressEnter = (e) => {
    const { task, onDeleted } = this.props
    if (e.key === 'Enter') {
      if (!task.content) onDeleted(task.id)
      this.setState(({ editing }) => {
        return {
          editing: !editing,
        }
      })
    }
  }

  onChangeEditing = (e) => {
    const { onEditingTask, task } = this.props
    onEditingTask(task.id, e.target.value)
  }

  onToggleEditing = () => {
    const { task, onDeleted } = this.props
    if (!task.content) onDeleted(task.id)
    this.setState(({ editing }) => {
      return {
        editing: !editing,
      }
    })
  }

  onToggleDoneHandler = () => {
    const { onToggleDone } = this.props
    onToggleDone()
  }

  onDeletedHandler = () => {
    const { onDeleted, task } = this.props
    const { id } = task
    onDeleted(id)
  }

  render() {
    const { content, done, updated, creationDate, updatedDate } = this.props.task
    const { onChangeEditing, onPressEnter, onToggleDoneHandler, onDeletedHandler, onToggleEditing } = this
    const { editing } = this.state

    return (
      <li className={editing ? 'editing' : done ? 'completed' : undefined}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onToggleDoneHandler} checked={done} />
          <label>
            <span className="title" onClick={onToggleDoneHandler}>
              {content}
            </span>
            <Timer task={this.props.task} editing={this.state.editing} setTime={this.props.setTime} />
            <span className="description">
              {updated ? 'updated ' : 'created '}
              {updated ? formatDistanceToNow(updatedDate) : formatDistanceToNow(creationDate)} ago
            </span>
          </label>
          <button className="icon icon-edit" onClick={onToggleEditing} />
          <button className="icon icon-destroy" onClick={onDeletedHandler} />
        </div>
        {editing ? (
          <input
            type="text"
            className="edit"
            onChange={onChangeEditing}
            onKeyPress={onPressEnter}
            value={content}
            onBlur={onToggleEditing}
            autoFocus
          />
        ) : null}
      </li>
    )
  }
}
TaskItem.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
  onEditingTask: () => {},
  task: {},
}
TaskItem.propTypes = {
  task: PropTypes.object,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onEditingTask: PropTypes.func,
}
