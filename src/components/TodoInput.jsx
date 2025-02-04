import { useState, useRef, useEffect } from "react"

export default function TodoInput(props) {
    const { handleAddTodos, todoValue, setTodoValue, inputRef } = props
    const [placeholder, setPlaceholder] = useState("Enter todo...");

    useEffect(() => {
        if (inputRef?.current) {
            inputRef.current.focus();
        }
    }, [todoValue]); // Gives the focus only when the value changes


    return (
        <header>
            <input ref={inputRef} value={todoValue} onChange={(e) => {
                setTodoValue(e.target.value)
            }} placeholder={placeholder} />
            <button onClick={() => {
                if (!todoValue.trim()) {
                    setPlaceholder("Cannot set an empty todo :p!");
                    return;
                }
                handleAddTodos(todoValue)
                setTodoValue('')
                setPlaceholder("Enter todo...");
            }}>Add</button>
        </header>
    )
}