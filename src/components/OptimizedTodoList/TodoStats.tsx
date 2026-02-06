interface TodoStatsProps {
  total: number;
  completed: number;
  active: number;
}

export default function TodoStats({
  completed,
  active,
  total,
}: TodoStatsProps) {
  return (
    <>
      <p>Nombre de tâches : {total}</p>
      <p>Tâches complétés : {completed}</p>
      <p>Tâches en cours : {active}</p>
    </>
  );
}
