import { useState, useEffect, useRef } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState('');
  const inputRef = useRef(null);

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }));
  }

  function handleAddTodos(newTodo) {
    if (!newTodo.trim()) return; // Disable empty todos to be added
    const newTodoList = [...todos, newTodo];
    persistData(newTodoList);
    setTodos(newTodoList);
}

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleEditTodo(index) {
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }

  useEffect(() => {
    if (!localStorage) {
      return
    }

    let localTodos = localStorage.getItem('todos')
    if (!localTodos) {
      return
    }

    console.log(localTodos)
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)

  }, [])

  return (
    <>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos} inputRef={inputRef} />
      <TodoList handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos} />
    </>
  )
}

export default App