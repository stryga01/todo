import React from 'react'
import ReactDOM from 'react-dom/client'

import TodoApp from './components/todo-app/todo-app.js'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <TodoApp />
  </React.StrictMode>
)
