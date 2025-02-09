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

  function isEmpty(val){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}

function handleAddTodos(newTodo) {
  if (newTodo.trim() === "/help" || newTodo.trim() === "/h") {
      alert("/keybinds /synthax");
      setTodoValue('');
      return;
  }
  if (newTodo.trim() === "/keybinds" || newTodo.trim() === "/k") {
    alert("Enter -> Press new \nCtrl + E -> Edit first item \nCtrl + D -> Delete first item");
    setTodoValue('');
    return;
  }
  if (newTodo.trim() === "/synthax" || newTodo.trim() === "/s") {
    alert("Your todo... [1-4]");
    setTodoValue('');
    return;
  }

  if (!newTodo.trim()) return; // Don't add empty todos

  const match = newTodo.match(/\[(\d+)\]$/);  // Extract priority using regex
  let priority = match ? parseInt(match[1], 10) : 0;
  let task = match ? newTodo.replace(/\s*\[\d+\]$/, "").trim() : newTodo.trim();

  if (isNaN(priority) || priority < 0 || priority > 4) priority = 0;

  const newTodoItem = { task, priority };
  const newTodoList = [...todos, newTodoItem];

  persistData(newTodoList);
  setTodos(newTodoList);
} 

  function handleDeleteTodo(index) {
    if (todos.length === 0) return;
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleEditTodo(index) {
    const { task, priority } = todos[index];
    const formattedTask = priority > 0 ? `${task} [${priority}]` : task;

    setTodoValue(formattedTask);
    handleDeleteTodo(index);

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
      <TodoInput todos={todos} todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos} inputRef={inputRef} handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} />
      <TodoList handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos} />
    </>
  )
}

export default App