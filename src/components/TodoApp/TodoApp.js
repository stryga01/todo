import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'

import './TodoApp.css'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Footer from '../Footer/Footer'
import TaskList from '../Task/TaskList/TaskList'

export default class TodoApp extends Component {
  state = {
    tasks: [],
    currentFilter: 'all',
    currentTaskTimer: null,
  }

  onEditingTask = (id, text) => {
    this.setState(({ tasks }) => {
      const idx = this.getIndexInArray(tasks, id)
      return {
        tasks: [
          ...tasks.slice(0, idx),
          { ...tasks[idx], content: text, updatedDate: new Date(), updated: true },
          ...tasks.slice(idx + 1),
        ],
      }
    })
  }

  onToggleFilters = (filterName) => {
    this.setState(() => {
      return {
        currentFilter: filterName,
      }
    })
  }

  getIndexInArray = (arr, id) => {
    return arr.findIndex((el) => el.id === id)
  }

  createTask = (content, min, sec) => {
    return {
      content,
      done: false,
      id: uuidv4(),
      creationDate: new Date(),
      updated: false,
      min: min ? min : 0,
      sec: sec ? sec : 0,
    }
  }

  addNewTask = (text, min, sec) => {
    this.setState(({ tasks }) => {
      return {
        tasks: [...tasks, this.createTask(text, min, sec)],
      }
    })
  }

  deleteTask = (id) => {
    this.setState(({ tasks }) => {
      const idx = this.getIndexInArray(tasks, id)
      return {
        tasks: [...tasks.slice(0, idx), ...tasks.slice(idx + 1)],
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ tasks }) => {
      const idx = this.getIndexInArray(tasks, id)
      const newTask = { ...tasks[idx], done: !tasks[idx].done }
      return {
        tasks: [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)],
      }
    })
  }

  setTime = (id, min, sec) => {
    this.setState(({ tasks }) => {
      const idx = this.getIndexInArray(tasks, id)
      if (tasks[idx]) {
        const newTask = { ...tasks[idx], min: min, sec: sec }
        return {
          tasks: [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)],
        }
      }
    })
  }

  deleteAllDoneTasks = () => {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.filter((task) => !task.done),
      }
    })
  }

  filteredTasks = () => {
    const { tasks, currentFilter } = this.state
    if (currentFilter === 'active') {
      return tasks.filter((task) => !task.done)
    } else if (currentFilter === 'completed') {
      return tasks.filter((task) => task.done)
    } else {
      return [...tasks]
    }
  }

  render() {
    const { tasks, currentFilter } = this.state
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm createNewTask={this.addNewTask} />
        </header>
        <section className="main">
          <TaskList
            setTime={this.setTime}
            tasks={this.filteredTasks()}
            onEditingTask={(id, text) => this.onEditingTask(id, text)}
            currentFilter={currentFilter}
            onDeleted={(id) => this.deleteTask(id)}
            onToggleDone={(id) => this.onToggleDone(id)}
          />
          <Footer
            tasks={tasks}
            currentFilter={currentFilter}
            onToggleFilters={(filterName) => this.onToggleFilters(filterName)}
            onClearCompleted={() => this.deleteAllDoneTasks()}
          />
        </section>
      </section>
    )
  }
}
