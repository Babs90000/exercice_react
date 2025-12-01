import { useState } from "react";

export default function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [valeur, setValeur] = useState("");

  const handleChange = (element) => {
    setValeur(element.target.value);
  };

  const handleSubmit = (element) => {
    element.preventDefault();
    // let arrayCopy = todoList.slice();
    // arrayCopy.push(valeur);
    // setTodoList(arrayCopy);
    setTodoList([...todoList, valeur]);
    setValeur("");
  };

  return (
    <>
      <h1 style={{ marginBottom: "10px" }}>Todo List </h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="task"></label>
        <input
          id="task"
          type="text"
          onChange={handleChange}
          placeholder="Veuillez saisir une tâche"
          value={valeur}
        />
        <input type="submit" value="Soumettre" />
      </form>
      <ul>
        {todoList.map((value, key) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
    </>
  );
}
