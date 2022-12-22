import React, { Component } from 'react'

export default class Timer extends Component {
  state = {
    sec: undefined,
    min: undefined,
  }
  componentDidMount() {
    this.setState({
      sec: this.props.task.sec,
      min: this.props.task.min,
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.task.done !== this.props.task.done || prevProps.editing !== this.props.editing) {
      this.onStopHandler()
    }
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

  render() {
    const { onPlayHandler, onStopHandler, state } = this
    const { done } = this.props.task
    const { min, sec } = state

    return (
      <span className="description">
        <button
          className={`icon icon-play ${done ? 'disabled' : undefined}`}
          onClick={() => onPlayHandler(this.props.task)}
        />
        <button className={`icon icon-pause ${done ? 'disabled' : undefined}`} onClick={onStopHandler} />
        <span className="todo-timer">
          {min}:{sec}
        </span>
      </span>
    )
  }
}
