import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList.jsx";
import { v4 as uuidv4 } from "uuid";

// import DatePicker from "react-date-picker";

const LOCAL_STORAGE_KEY = "todoApp.todos";

export default function App() {
  // in var todos all our todo
  const [todos, setTodos] = useState([]);

  const todoNameRef = useRef();
  //empty array never changes so this useEffect never re-call
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodo() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodo}>Clear Completed</button>
      <div>{todos.filter((todo) => !todo.complete).length} left to do</div>
    </>
  );
}
