import React, { useState, useCallback } from "react";
import TodoItem from "./components/TodoItem";
import "./App.css";

export interface Todo {
  id: number;
  name: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [nextId, setNextId] = useState(1);

  const addTodo = useCallback(
    (name: string) => {
      const trimmedName = name.trim();
      if (!trimmedName) return;

      setTodoList((prev) => [
        ...prev,
        {
          id: nextId,
          name: trimmedName,
          completed: false,
        },
      ]);
      setNextId((prev) => prev + 1);
    },
    [nextId]
  );

  const toggleTodo = useCallback((id: number) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const todoName = formData.get("todo") as string;

      if (todoName?.trim()) {
        addTodo(todoName);
        event.currentTarget.reset();
      }
    },
    [addTodo]
  );

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="todo"
          placeholder="Enter a task"
          className="input"
          required
        />
        <button type="submit" className="button">
          Add
        </button>
      </form>
      <ul className="list">
        {todoList.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
