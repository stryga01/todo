import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import './TaskItem.css'

const TaskItem = (props) => {
  const [editing, setEditing] = useState(false)
  const [seconds, setSeconds] = useState(undefined)
  const [minutes, setMinutes] = useState(undefined)
  const [timerOn, setTimerOn] = useState(false)
  const [deadline, setDeadline] = useState(undefined)

  const { onToggleDone, deleteTask, setTime } = props
  const { content, done, updated, updatedDate, creationDate, id } = props.task

  useEffect(() => {
    setMinutes(props.task.min)
    setSeconds(props.task.sec)
  }, [])

  useEffect(() => {
    setTime(id, minutes, seconds)
  }, [minutes, seconds])

  useEffect(() => {
    if (timerOn) {
      const id = setInterval(tick, 500)
      return () => {
        clearInterval(id)
      }
    }
  }, [timerOn, editing, done])

  const tick = () => {
    const total = deadline - Date.now()
    const sec = Math.floor((total / 1000) % 60)
    const min = Math.floor((total / 1000 / 60) % 60)

    if ((sec < 0 && min < 0) || editing || done) {
      setTimerOn(false)
      return
    }

    setSeconds(sec)
    setMinutes(min)
  }

  const onPressEnter = (e) => {
    if (e.key === 'Enter') {
      if (!content) deleteTask(id)
      setEditing(false)
    }
  }

  const onToggleDoneHandler = () => {
    const { onToggleDone, task } = props
    onToggleDone(task.id)
  }

  const onChangeEditing = (e) => {
    const { onEditingTask, task } = props
    onEditingTask(task.id, e.target.value)
  }

  const onDeleteHandler = () => {
    setTimerOn(false)
    deleteTask(id)
  }

  const startTimer = () => {
    setTimerOn(true)
    setDeadline(Date.now() + seconds * 1000 + minutes * 1000 * 60)
  }

  return (
    <li className={editing ? 'editing' : done ? 'completed' : undefined}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onToggleDoneHandler} checked={done} />
        <label>
          <span className="title" onClick={onToggleDone}>
            {content}
          </span>
          <span className="description">
            <button className={`icon icon-play ${done ? 'disabled' : undefined}`} onClick={startTimer} />
            <button className={`icon icon-pause ${done ? 'disabled' : undefined} `} onClick={() => setTimerOn(false)} />
            <span className="todo-timer">
              {minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}
            </span>
          </span>
          <span className="description">
            {updated ? 'updated' : 'created '}
            {updated ? formatDistanceToNow(updatedDate) : formatDistanceToNow(creationDate)} ago
          </span>
        </label>
        <button className="icon icon-edit" onClick={() => setEditing(true)} />
        <button className="icon icon-destroy" onClick={onDeleteHandler} />
      </div>
      {editing ? (
        <input
          type="text"
          className="edit"
          onChange={onChangeEditing}
          onKeyPress={onPressEnter}
          value={content}
          onBlur={() => setEditing(false)}
          autoFocus
        />
      ) : null}
    </li>
  )
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
export default TaskItem
