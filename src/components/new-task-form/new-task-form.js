import React, { Component } from 'react'
import './new-task-form.css'

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

    this.onBlur = () => {
      this.props.createNewTask(this.state.newTaskText)
      this.setState({
        newTaskText: '',
      })
    }
  }

  render() {
    return (
      <input
        className="new-todo"
        onChange={this.onChangeInput}
        onKeyPress={this.onSubmit}
        value={this.state.newTaskText}
        placeholder="What needs to be done?"
        autoFocus
      />
    )
  }
}
