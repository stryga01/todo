import React from "react";
import "./task-item.css";

const TaskItem = (props) => {
    const {content, done, editing} = props.task
    return (
        <li className={editing ? "editing" : done ? "completed" : undefined}>
            <div className="view">
                <input className="toggle" type="checkbox"/>
                <label>
                    <span className="description">{content}</span>
                    <span className="created">created 17 seconds ago</span>
                </label>
                <button className="icon icon-edit" ></button>
                <button className="icon icon-destroy"></button>
            </div>
            {editing ? <input type="text" className="edit" defaultValue="Editing task"/> : null}
        </li>
    )
}
export default TaskItem;