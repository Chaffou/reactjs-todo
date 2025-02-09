import React from 'react';

export default function TodoCard(props) {
    const { children, handleDeleteTodo, index, handleEditTodo, priority } = props;

    return (
        <li 
            className="todoItem" 
            style={{ borderColor: getPriorityColor(priority) }}
        >
            {children}
            <div className="actionsContainer">
                <button onClick={() => handleEditTodo(index)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button onClick={() => handleDeleteTodo(index)}>
                    <i className="fa-regular fa-trash-can"></i>
                </button>
            </div>
        </li>
    );
}

// Function to get the correct priority color
function getPriorityColor(priority) {
    const priorityColors = {
        0: "#0073e6", // Blue
        1: "#4caf50", // Green
        2: "#ff9800", // Orange
        3: "#ff5722", // Red
        4: "#9c27b0", // Purple
    };
    return priorityColors[priority] || "#0073e6"; // Default to blue
}
