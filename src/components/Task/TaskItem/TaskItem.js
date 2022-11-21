import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import './TaskItem.css'

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

  render() {
    const { onDeleted, onToggleDone, task } = this.props
    const { content, done, updated, creationDate, updatedDate } = task
    const { onChangeEditing, onPressEnter, onToggleEditing } = this
    const { editing } = this.state

    return (
      <li className={editing ? 'editing' : done ? 'completed' : undefined}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onToggleDone} checked={done} />
          <label>
            <span className="description" onClick={onToggleDone}>
              {content}
            </span>
            <span className="description">
              <button className="icon icon-play" />
              <button className="icon icon-pause" />
              12:25
            </span>
            <span className="created">
              {updated ? 'updated ' : 'created '}
              {updated ? formatDistanceToNow(updatedDate) : formatDistanceToNow(creationDate)} ago
            </span>
          </label>
          <button className="icon icon-edit" onClick={this.onToggleEditing} />
          <button className="icon icon-destroy" onClick={onDeleted} />
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
