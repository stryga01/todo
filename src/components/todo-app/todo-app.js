import React, { Component } from 'react'

import './todo-app.css'
import NewTaskForm from '../new-task-form/new-task-form'
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'

export default class TodoApp extends Component {
  constructor() {
    super()
    this.state = {
      id: 1,
      tasks: [],
      filters: {
        all: true,
        active: false,
        completed: false,
      },
    }
    this.filteredTasks = () => {
      const { tasks } = this.state
      const { active, completed } = this.state.filters
      if (active) {
        return tasks.filter((task) => !task.done)
      } else if (completed) {
        return tasks.filter((task) => task.done)
      } else {
        return [...tasks]
      }
    }

    this.onEditingTask = (id, text) => {
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

    this.onToggleFilters = (filterName) => {
      this.setState(() => {
        const newFilters = {
          all: false,
          active: false,
          completed: false,
        }
        newFilters[filterName] = true
        return {
          filters: newFilters,
        }
      })
    }
    this.getIndexInArray = (arr, id) => {
      return arr.findIndex((el) => el.id === id)
    }

    this.createTask = (content) => {
      return {
        content,
        done: false,
        id: this.state.id++,
        creationDate: new Date(),
        updated: false,
      }
    }

    this.addNewTask = (text) => {
      this.setState(({ tasks }) => {
        return {
          tasks: [...tasks, this.createTask(text)],
        }
      })
    }

    this.deleteTask = (id) => {
      this.setState(({ tasks }) => {
        const idx = this.getIndexInArray(tasks, id)
        return {
          tasks: [...tasks.slice(0, idx), ...tasks.slice(idx + 1)],
        }
      })
    }

    this.onToggleDone = (id) => {
      this.setState(({ tasks }) => {
        const idx = this.getIndexInArray(tasks, id)
        const newTask = { ...tasks[idx], done: !tasks[idx].done }
        return {
          tasks: [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)],
        }
      })
    }

    this.deleteAllDoneTasks = () => {
      this.setState(({ tasks }) => {
        return {
          tasks: tasks.filter((task) => !task.done),
        }
      })
    }

    this.getDoneCount = () => {
      return this.state.tasks.filter((task) => !task.done).length
    }
  }

  render() {
    const { tasks, filters } = this.state
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm createNewTask={(text) => this.addNewTask(text)} />
        </header>
        <section className="main">
          <TaskList
            tasks={this.filteredTasks()}
            onEditingTask={(id, text) => this.onEditingTask(id, text)}
            filters={filters}
            onDeleted={(id) => this.deleteTask(id)}
            onToggleDone={(id) => this.onToggleDone(id)}
          />
          <Footer
            tasks={tasks}
            doneCount={this.getDoneCount()}
            filters={filters}
            onToggleFilters={(filterName) => this.onToggleFilters(filterName)}
            onClearCompleted={() => this.deleteAllDoneTasks()}
          />
        </section>
      </section>
    )
  }
}
