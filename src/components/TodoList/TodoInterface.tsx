interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export type FilterType = "all" | "active" | "completed";

import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoListItem from "./TodoListItem";
import TodoFilter from "./TodoFilter";
import styles from "./TodoInterface.module.css";

export default function TodoInterface() {
  const [valeur, setValeur] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [todoList, setTodoList] = useState<Todo[]>(() => {
    const data = localStorage.getItem("todoList");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  function handleAddTodo() {
    const todo = {
      id: todoList.length + 1,
      text: valeur,
      completed: false,
    };
    setTodoList([...todoList, todo]);
    setValeur("");
  }

  // function handleUpdateTodo() {}

  function handleDeleteTodo(todoId: number): void {
    const newTodoList = todoList.filter((todo) => todo.id !== todoId);
    setTodoList(newTodoList);
  }

  /* function handleToggled(todoId) {
    let newTodo = todoList.find((todo) => todo.id === todoId);
    if (newTodo == undefined) return;
    newTodo = {
      id: newTodo.id,
      text: newTodo.text,
      completed: !newTodo.completed,
    };
    const todoListIntermediaire = todoList.filter((todo) => todo.id !== todoId);
    setTodoList([...todoListIntermediaire, newTodo]);
  } */

  function handleToggled(todoId: number): void {
    setTodoList(
      todoList.map((todo) =>
        todo.id == todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function getFilteredTodos(): Todo[] {
    if (filter === "active") return todoList.filter((t) => !t.completed);
    if (filter === "completed") return todoList.filter((t) => t.completed);
    return todoList;
  }

  console.log(todoList.filter((t) => !t.completed));
  console.log(todoList.filter((t) => t.completed));
  const filteredTodos: Todo[] = getFilteredTodos();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ma Todo List</h1>
      <TodoFilter onFilter={setFilter} currentFilter={filter} />
      <TodoForm
        valeur={valeur}
        onAddTodo={handleAddTodo}
        setValeur={setValeur}
      />
      <TodoListItem
        todoList={filteredTodos}
        setTodoList={setTodoList}
        onDeleteTodo={handleDeleteTodo}
        onToggled={handleToggled}
      />
    </div>
  );
}
