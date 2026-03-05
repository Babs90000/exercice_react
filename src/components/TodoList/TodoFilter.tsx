import { FilterType } from "./TodoInterface";
import styles from "./TodoFilter.module.css";

interface TodoFilterProps {
  onFilter: (statut: FilterType) => void;
  currentFilter: FilterType;
}

export default function TodoFilter({
  onFilter,
  currentFilter,
}: TodoFilterProps) {
  return (
    <div className={styles.filterContainer}>
      <button
        className={`${styles.filterButton} ${currentFilter === "all" ? styles.filterButtonActive : ""}`}
        onClick={() => onFilter("all")}
      >
        Tous
      </button>
      <button
        className={`${styles.filterButton} ${currentFilter === "active" ? styles.filterButtonActive : ""}`}
        onClick={() => onFilter("active")}
      >
        Actives
      </button>
      <button
        className={`${styles.filterButton} ${currentFilter === "completed" ? styles.filterButtonActive : ""}`}
        onClick={() => onFilter("completed")}
      >
        Complétées
      </button>
    </div>
  );
}
