import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import './TaskItem.css'

export default class TaskItem extends React.Component {
  state = {
    editing: false,
    sec: undefined,
    min: undefined,
  }
  componentDidMount() {
    this.setState({
      sec: this.props.task.sec,
      min: this.props.task.min,
    })
  }

  componentWillUnmount() {
    const { timerId, min, sec } = this.state
    const { id } = this.props.task
    this.props.setTime(id, min, sec)
    clearInterval(timerId)
  }

  setSec = () => {
    const { sec, min } = this.state
    this.setState(() => {
      return {
        sec: sec ? sec - 1 : min ? 59 : 0,
        min: sec ? min : min ? min - 1 : min,
      }
    })
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

  onPlayHandler = () => {
    const { timerId, min, sec } = this.state
    const { done } = this.props.task
    if (done || !min & !sec) return
    if (!timerId) {
      const id = setInterval(this.setSec, 1000)
      this.setState({
        timerId: id,
      })
    }
  }

  onStopHandler = () => {
    const { timerId } = this.state
    if (timerId) {
      clearInterval(timerId)
      this.setState({
        timerId: 0,
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
    this.onStopHandler()
    onToggleDone()
  }

  onDeletedHandler = () => {
    const { onDeleted, task } = this.props
    const { id } = task
    this.onStopHandler()
    onDeleted(id)
  }

  render() {
    const { content, done, updated, creationDate, updatedDate } = this.props.task
    const { onChangeEditing, onPressEnter, onPlayHandler, onToggleDoneHandler, onDeletedHandler, onToggleEditing } =
      this
    const { editing, sec, min } = this.state

    return (
      <li className={editing ? 'editing' : done ? 'completed' : undefined}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onToggleDoneHandler} checked={done} />
          <label>
            <span className="title" onClick={onToggleDoneHandler}>
              {content}
            </span>
            <span className="description">
              <button
                className={`icon icon-play ${done ? 'disabled' : undefined}`}
                onClick={() => onPlayHandler(this.props.task)}
              />
              <button className={`icon icon-pause ${done ? 'disabled' : undefined}`} onClick={this.onStopHandler} />
              <span className="todo-timer">
                {min}:{sec}
              </span>
            </span>
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
