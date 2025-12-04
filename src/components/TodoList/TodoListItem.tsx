import TodoItem from "./TodoItem";
export default function TodoListItem({
  todoList,
  onDeleteTodo,
  onToggled,
  setTodoList,
  todoList,
}) {
  const todoItems = (
    <div>
      <ul style={{ listStyle: "none" }}>
        {todoList.map((todo) => (
          <li key={todo.id}>
            <TodoItem
              todo={todo}
              onDeleteTodo={onDeleteTodo}
              onToggled={onToggled}
              todoList={todoList}
              setTodoList={setTodoList}
            />
          </li>
        ))}
      </ul>
    </div>
  );

  return todoItems;
}
