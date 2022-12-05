import React, { useState } from 'react'
import './NewTaskForm.css'

const NewTaskForm = (props) => {
  const [newTaskText, setNewTaskText] = useState('')
  const [sec, setSec] = useState(0)
  const [min, setMin] = useState(0)

  const onChangeMin = (e) => {
    const { value: minutes } = e.target
    if (minutes < 0 || isNaN(minutes)) {
      setMin((min) => min)
    } else {
      setMin(Number(minutes))
    }
  }
  const onChangeSec = (e) => {
    const { value: seconds } = e.target
    if (seconds < 0 || isNaN(seconds)) {
      setSec((sec) => sec)
    } else {
      setSec(Number(seconds) > 59 ? 59 : Number(seconds))
    }
  }

  const onBlurHandler = () => {
    setMin((min) => (min ? min : 0))
    setSec((sec) => (sec ? sec : 0))
  }

  const onSubmit = (e) => {
    const { addTask } = props
    if (e.key === 'Enter') {
      if (!newTaskText) {
        setNewTaskText('')
        setMin(0)
        setSec(0)
      } else {
        addTask(newTaskText, min, sec)
        setNewTaskText('')
        setMin(0)
        setSec(0)
      }
    }
  }

  return (
    <form className="new-todo-form">
      <input
        className="new-todo"
        onChange={(e) => setNewTaskText(e.target.value)}
        onKeyPress={onSubmit}
        value={newTaskText}
        placeholder="Task"
        autoFocus
      />
      <input
        className="new-todo-form__timer"
        onChange={onChangeMin}
        onBlur={onBlurHandler}
        onKeyPress={onSubmit}
        value={min ? min : ''}
        placeholder="Min"
        autoFocus
      />
      <input
        className="new-todo-form__timer"
        onBlur={onBlurHandler}
        onChange={onChangeSec}
        onKeyPress={onSubmit}
        value={sec ? sec : ''}
        placeholder="Sec"
        autoFocus
      />
    </form>
  )
}
export default NewTaskForm
