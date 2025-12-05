import TodoItem from "./TodoItem";
import styles from "./TodoListItem.module.css";
export default function TodoListItem({
  todoList,
  onDeleteTodo,
  onToggled,
  setTodoList,
}) {
  const todoItems = (
    <ul className={styles.listContainer}>
      {todoList.map((todo) => (
        <li className={styles.listItem} key={todo.id}>
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
  );

  return todoItems;
}
