import styles from "./TodoForm.module.css";
export default function TodoForm({ valeur, setValeur, onAddTodo }) {
  return (
    <form
      className={styles.formContainer}
      onSubmit={(e) => {
        e.preventDefault();
        onAddTodo();
      }}
    >
      <input
        className={styles.input}
        type="text"
        value={valeur}
        onChange={(e) => setValeur(e.target.value)}
        placeholder="Ajouter une tâche..."
      />
      <button className={styles.input} type="submit">
        Ajouter
      </button>
    </form>
  );
}
