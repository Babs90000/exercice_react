import { useState } from "react";

export default function TodoItem({
  todo,
  onDeleteTodo,
  onToggled,
  todoList,
  setTodoList,
}) {
  const todoId = todo.id;
  const [isEditing, setIsEditing] = useState < boolean > false;
  const [isEdit, setIsEdit] = useState < string > "";

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
    <div style={{ display: "flex", flexDirection: "row" }}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={isEdit}
            onChange={(e) => setIsEdit(e.target.value)}
            placeholder="Nouvelle valeur?"
          />
          <button onClick={handleEdit}>Valider</button>
          <button onClick={() => setIsEditing((v) => !v)}>Annuler</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggled(todoId)}
          />
          <p
            onClick={() => setIsEditing((v) => !v)}
            style={todo.completed ? { textDecoration: "line-through" } : {}}
          >
            {todo.text}
          </p>
          <button onClick={() => setIsEditing((v) => !v)}>Editer</button>
          <button onClick={() => onDeleteTodo(todoId)}>Supprimer </button>
        </>
      )}
    </div>
  );
}
