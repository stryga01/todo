import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import './TodoApp.css'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Footer from '../Footer/Footer'
import TaskList from '../Task/TaskList/TaskList'

const TodoApp = () => {
  const [tasks, setTasks] = useState([])
  const [currentFilter, setCurrentFilter] = useState('all')

  const setTime = (id, min, sec) => {
    const idx = getIndexInArray(tasks, id)
    if (tasks[idx]) {
      const newTask = { ...tasks[idx], min: min, sec: sec }
      setTasks([...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)])
    }
  }

  const getIndexInArray = (arr, id) => {
    return arr.findIndex((el) => el.id === id)
  }

  const onToggleDone = (id) => {
    const idx = getIndexInArray(tasks, id)
    const newTask = { ...tasks[idx], done: !tasks[idx].done }
    setTasks([...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)])
  }

  const onEditingTask = (id, text) => {
    const idx = getIndexInArray(tasks, id)
    setTasks([
      ...tasks.slice(0, idx),
      { ...tasks[idx], content: text, updatedDate: new Date(), updated: true },
      ...tasks.slice(idx + 1),
    ])
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const createTask = (content, min, sec) => {
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

  const addTask = (content, min, sec) => {
    setTasks([...tasks, createTask(content, min, sec)])
  }

  const filteredTasks = () => {
    if (currentFilter === 'active') {
      return tasks.filter((task) => !task.done)
    } else if (currentFilter === 'completed') {
      return tasks.filter((task) => task.done)
    } else {
      return [...tasks]
    }
  }

  const deleteAllDoneTasks = () => {
    setTasks(tasks.filter((task) => !task.done))
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addTask={addTask} />
      </header>
      <section className="main">
        <TaskList
          tasks={filteredTasks()}
          setTime={setTime}
          onToggleDone={onToggleDone}
          onEditingTask={onEditingTask}
          deleteTask={deleteTask}
          addTask={addTask}
        />
        <Footer
          tasks={tasks}
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
          deleteAllDoneTasks={deleteAllDoneTasks}
        />
      </section>
    </section>
  )
}

export default TodoApp
