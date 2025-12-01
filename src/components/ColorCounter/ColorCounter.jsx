export default function ColorCounter({
  onIncrementClick,
  onDecrementClick,
  onResetClick,
  count,
  color,
}) {
  return (
    <div>
      <p className={color}>{count}</p>
      <button onClick={onIncrementClick}>+</button>
      <button onClick={onDecrementClick}>-</button>
      <button onClick={onResetClick}>Réintialiser</button>
    </div>
  );
}
