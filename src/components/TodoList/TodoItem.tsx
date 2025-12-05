import { useState } from "react";
import styles from "./TodoItem.module.css";

export default function TodoItem({
  todo,
  onDeleteTodo,
  onToggled,
  todoList,
  setTodoList,
}) {
  const todoId = todo.id;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<string>("");

  function handleEdit() {
    setTodoList(
      todoList.map((todo) =>
        todo.id == todoId ? { ...todo, text: isEdit } : todo,
      ),
    );
    setIsEdit("");
    setIsEditing((v) => !v);
  }

  return (
    <div className={styles.todoItem}>
      {isEditing ? (
        <div className={styles.editContainer}>
          <input
            className={styles.editInput}
            type="text"
            value={isEdit}
            onChange={(e) => setIsEdit(e.target.value)}
            placeholder="Nouvelle valeur?"
          />
          <button
            onClick={handleEdit}
            className={`${styles.button} ${styles.buttonValidate}`}
          >
            Valider
          </button>
          <button
            className={`${styles.button} ${styles.buttonCancel}`}
            onClick={() => setIsEditing((v) => !v)}
          >
            Annuler
          </button>
        </div>
      ) : (
        <div className={styles.viewContainer}>
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggled(todoId)}
          />
          <p
            onClick={() => setIsEditing((v) => !v)}
            className={`${styles.todoText} ${
              todo.completed ? styles.todoTextCompleted : ""
            }`}
          >
            {todo.text}
          </p>
          <button
            className={`${styles.button} ${styles.buttonEdit}`}
            onClick={() => setIsEditing((v) => !v)}
          >
            Editer
          </button>
          <button
            className={`${styles.button} ${styles.buttonDelete}`}
            onClick={() => onDeleteTodo(todoId)}
          >
            Supprimer{" "}
          </button>
        </div>
      )}
    </div>
  );
}
