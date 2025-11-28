import React, { useCallback } from "react";
import type { Todo } from "../App";
import styles from "./TodoItem.module.css";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleTodo,
  deleteTodo,
}) => {
  const handleToggle = useCallback(() => {
    toggleTodo(todo.id);
  }, [todo.id, toggleTodo]);

  const handleDelete = useCallback(() => {
    deleteTodo(todo.id);
  }, [todo.id, deleteTodo]);

  return (
    <li className={styles.todoItem}>
      <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
      <span className={todo.completed ? styles.completed : ""}>
        {todo.name}
      </span>
      <button className={styles.deleteButton} onClick={handleDelete}>
        ×
      </button>
    </li>
  );
};

export default TodoItem;
