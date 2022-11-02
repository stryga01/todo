import React from "react";
import "./task-list.css"
import TaskItem from "../task-item/task-item";

const TaskList = (props) => {
    const {tasks} = props
    const taskList = tasks.map((task) => {
       return < TaskItem task={task} key={task.id}/>
    })
    return(
        <ul className="todo-list">
            {taskList}
        </ul>
    )
}

export default TaskList;