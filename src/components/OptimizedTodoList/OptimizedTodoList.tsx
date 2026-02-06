interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type TodoCallback = (id: number) => void;
export type SearchCallback = (searchTerm: string) => void;

import { useState } from "react";
import SearchBar from "./SearchBar";
import TodoStats from "./TodoStats";
export default function OptimizedTodoList() {
  const [todoList, setTodoList] = useState<Todo[]>([
    { id: 1, text: "Apprendre React", completed: false },
    { id: 2, text: "Maîtriser TypeScript", completed: true },
    { id: 3, text: "Utiliser useMemo", completed: false },
  ]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [newTodo, setNewTodo] = useState<string>("");

  function handleAddTodo(e: React.FormEvent) {
    e.preventDefault();
    setTodoList([
      ...todoList,
      { id: todoList.length + 1, text: newTodo, completed: false },
    ]);
    setNewTodo("");
  }

  function handleDeleteTodo(todoId: number): void {
    const newTodoList = todoList.filter((todo) => todo.id !== todoId);
    setTodoList(newTodoList);
  }

  function handleToggleCompleted(todoId: number) {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id == todoId) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      }),
    );
  }

  const filteredTodos = todoList.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSearchTodo: SearchCallback = (term: string) => {
    setSearchTerm(term);
  };

  const completed: number = todoList.filter((todo) => todo.completed).length;
  let active: number = todoList.filter((todo) => !todo.completed).length;
  const total = todoList.length;

  /*   function countCompleted(): void {
    for (const todo of todoList) {
      if (todo.completed == true) {
        completed++;
      } else {
        active++;
      }
    }
  } */

  // countCompleted();

  console.log(filteredTodos);
  console.log(`total : ${total}`);
  console.log(`completed : ${completed}`);
  console.log(`active : ${active}`);

  return (
    <div>
      <h1>Liste Todo Optimisés </h1>
      <TodoStats completed={completed} active={active} total={total} />
      <SearchBar searchTerm={searchTerm} onSearch={handleSearchTodo} />

      <div>
        <input type="text" onChange={(e) => setNewTodo(e.target.value)} />
        <button onClick={handleAddTodo}>Ajouter</button>
      </div>
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleCompleted(todo.id)}
            />
            <p>{todo.text}</p>
            <button onClick={() => handleDeleteTodo(todo.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
