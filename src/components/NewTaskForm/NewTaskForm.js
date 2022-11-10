import React, { Component } from 'react'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  constructor() {
    super()
    this.state = { newTaskText: '' }

    this.onChangeInput = (e) => {
      this.setState({
        newTaskText: e.target.value,
      })
    }

    this.onSubmit = (e) => {
      if (e.key === 'Enter') {
        this.props.createNewTask(this.state.newTaskText)
        this.setState({
          newTaskText: '',
        })
      }
    }
  }

  render() {
    const { onChangeInput, onSubmit } = this
    const { newTaskText } = this.state
    return (
      <input
        className="new-todo"
        onChange={onChangeInput}
        onKeyPress={onSubmit}
        value={newTaskText}
        placeholder="What needs to be done?"
        autoFocus
      />
    )
  }
}
