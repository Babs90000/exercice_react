interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoListItem from "./TodoListItem";
import TodoList from "../TodoList";

export default function TodoInterface() {
  const [valeur, setValeur] = useState("");
  /* const [isToggled, setIsToggled] = useState<boolean>(false); */
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

  function handleDeleteTodo(todoId) {
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

  function handleToggled(todoId) {
    setTodoList(
      todoList.map((todo) =>
        todo.id == todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  console.log(todoList);

  return (
    <>
      <TodoForm
        valeur={valeur}
        onAddTodo={handleAddTodo}
        setValeur={setValeur}
      />
      <TodoListItem
        todoList={todoList}
        setTodoList={setTodoList}
        onDeleteTodo={handleDeleteTodo}
        onToggled={handleToggled}
      />
    </>
  );
}
