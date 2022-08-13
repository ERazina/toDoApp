import React from "react";

export default function ToDo({ todo, toggleTodo }) {
  function handleToggleTodo() {
    toggleTodo(todo.id);
  }
  return (
    <label key={todo.id}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleTodo}
      ></input>
      {todo.name}
    </label>
  );
}
