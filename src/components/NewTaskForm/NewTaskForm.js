import React, { Component } from 'react'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  state = {
    newTaskText: '',
    min: '',
    sec: '',
  }
  onChangeText = (e) => {
    this.setState({
      newTaskText: e.target.value,
    })
  }

  onChangeMin = (e) => {
    const { value: minutes } = e.target
    if (minutes < 0 || isNaN(minutes)) {
      this.setState(({ min }) => {
        min
      })
    } else {
      this.setState(() => {
        return {
          min: Number(minutes),
        }
      })
    }
  }

  onChangeSec = (e) => {
    const { value: seconds } = e.target
    if (seconds < 0 || isNaN(seconds)) {
      this.setState(({ sec }) => {
        sec
      })
    } else {
      this.setState(() => {
        return {
          sec: Number(seconds) > 59 ? 59 : Number(seconds),
        }
      })
    }
  }

  onFocusHandler = () => {
    this.setState(({ min, sec }) => {
      return {
        min: min ? min : '',
        sec: sec ? sec : '',
      }
    })
  }

  onSubmit = (e) => {
    const { newTaskText, min, sec } = this.state
    const { createNewTask } = this.props
    if (e.key === 'Enter') {
      if (!newTaskText) {
        this.setState({
          newTaskText: '',
          min: '',
          sec: '',
        })
      } else {
        createNewTask(newTaskText, min, sec)
        this.setState({
          newTaskText: '',
          min: '',
          sec: '',
        })
      }
    }
  }

  render() {
    const { onChangeText, onChangeMin, onChangeSec, onSubmit, onFocusHandler } = this
    const { newTaskText, min, sec } = this.state
    return (
      <form className="new-todo-form">
        <input
          className="new-todo"
          onChange={onChangeText}
          onKeyPress={onSubmit}
          value={newTaskText}
          placeholder="Task"
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          onFocus={onFocusHandler}
          onChange={onChangeMin}
          onKeyPress={onSubmit}
          value={min}
          placeholder="Min"
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          onFocus={onFocusHandler}
          onChange={onChangeSec}
          onKeyPress={onSubmit}
          value={sec}
          placeholder="Sec"
          autoFocus
        />
      </form>
    )
  }
}
