import { useState, useRef, useEffect } from "react";

export default function TodoInput(props) {
    const { todos, todoValue, setTodoValue, handleAddTodos, inputRef, handleEditTodo, handleDeleteTodo } = props;
    const [placeholder, setPlaceholder] = useState("Enter todo...");
    const errorMessage = "Cannot set an empty todo :p!";
    const defaultMessage = "Enter todo..."

    useEffect(() => {
        if (inputRef?.current) {
            inputRef.current.focus();
        }
    }, [todoValue]); // Gives the focus only when the value changes

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.ctrlKey && e.key.toLowerCase() === "e") {
                handleEditTodo(0); // Edit the first todo item
            }
            if (e.ctrlKey && e.key.toLowerCase() === "d") {
                handleDeleteTodo(0); // Delete the first todo item
            }
        };

        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleEditTodo, handleDeleteTodo]);

    return (
        <header>
            <input
                ref={inputRef}
                value={todoValue}
                onChange={(e) => setTodoValue(e.target.value)}
                placeholder={placeholder}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        if (!todoValue.trim()) {
                            setPlaceholder(errorMessage);
                            return;
                        }
                        handleAddTodos(todoValue);
                        setTodoValue('');
                        setPlaceholder(defaultMessage);
                    }
                }}
            />
            <button onClick={() => {
                if (!todoValue.trim()) {
                    setPlaceholder(errorMessage);
                    return;
                }
                handleAddTodos(todoValue);
                setTodoValue('');
                setPlaceholder(defaultMessage);
            }}>Add</button>
        </header>
    );
}
