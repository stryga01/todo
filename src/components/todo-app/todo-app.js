import React from "react";
import './todo-app.css'
import NewTaskForm from "../new-task-form/new-task-form";
import TaskList from "../task-list/task-list";
import Footer from "../footer/footer";


const tasks = [
    {content: 'Completed task', done: true, editing: false, id: 1},
    {content: 'Editing task', done: false, editing: true, id: 2},
    {content: 'Active task', done: false, editing: false, id: 3},
]

const TodoApp = () => {
    return (
        <section className="todoapp">
            <header className="header">
                <h1>todos</h1>
                <NewTaskForm />
            </header>
            <section className="main">
                <TaskList tasks={tasks} />
                < Footer />
            </section>
        </section>
    )
}

export default TodoApp;