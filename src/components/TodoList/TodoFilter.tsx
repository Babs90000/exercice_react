interface TodoFilterProps {
  onFilter: (statut: FilterType) => void;
  currentFilter: FilterType;
}
import { FilterType } from "./TodoInterface";
import styles from "./TodoFilter.module.css";
export default function TodoFilter({
  onFilter,
  currentFilter,
}: TodoFilterProps) {
  return (
    <div className={styles.filterContainer}>
      <button
        className={`${styles.filterButton} ${styles.filterButtonAll} ${currentFilter === "all" ? styles.filterButtonActive : ""}`}
        onClick={() => onFilter("all")}
      >
        Tous
      </button>
      <button
        className={`${styles.filterButton} ${styles.filterButtonActive} ${currentFilter === "active" ? styles.filterButtonActive : ""}`}
        onClick={() => onFilter("active")}
      >
        Actives
      </button>
      <button
        className={`${styles.filterButton} ${styles.filterButtonCompleted} ${currentFilter === "completed" ? styles.filterButtonActive : ""}`}
        onClick={() => onFilter("completed")}
      >
        Completées
      </button>
    </div>
  );
}
