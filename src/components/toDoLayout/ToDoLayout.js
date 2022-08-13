import React, { useState, useRef, useEffect } from "react";
import ToDoList from "../ToDoList/ToDoList";
import { v4 as uuidv4 } from "uuid";

function ToDoLayout() {
  const TODOS_KEY = "todoApp.todos";
  const todoRef = useRef();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(TODOS_KEY));
    if (storedTodos.length !== 0) setTodos(storedTodos);
  }, []);

  const handleAddToDo = () => {
    const value = todoRef.current.value;
    if (value === "") return;
    setTodos((prev) => {
      return [...prev, { id: uuidv4(), name: value, completed: false }];
    });
    todoRef.current.value = null;
  };

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }

  function handleComplete() {
    const newTodos = todos.filter((todo) => todo.completed === false);
    setTodos(newTodos);
  }

  return (
    <>
      <h1>ToDo List</h1>
      <ToDoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoRef} type="text"></input>
      <button onClick={handleAddToDo}>Add to do</button>
      <button onClick={handleComplete}>Clear complete</button>
      <div>
        {todos.filter((todo) => todo.completed === false).length} left to do
      </div>
    </>
  );
}

export default ToDoLayout;
