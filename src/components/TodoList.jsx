import React from 'react';
import TodoCard from './TodoCard';

export default function TodoList(props) {
    const { todos } = props;

    return (
        <ul className='main'>
            {todos.map((todo, todoIndex) => (
                <TodoCard 
                    {...props} 
                    key={todoIndex} 
                    index={todoIndex} 
                    priority={todo.priority}
                >
                    <p>{todo.task} <span style={{ color: getPriorityColor(todo.priority) }}> [P{todo.priority}] </span></p>
                </TodoCard>
            ))}
        </ul>
    );
}

function getPriorityColor(priority) {
    const priorityColors = {
        0: "#0073e6", // Blue
        1: "#4caf50", // Green
        2: "#ff9800", // Orange
        3: "#ff5722", // Red
        4: "#9c27b0", // Purple
    };
    return priorityColors[priority] || "#0073e6"; // Blue as default color
}
