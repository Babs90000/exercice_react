export default function NumberList() {
  const numbers = [1, 2, 3, 4, 5];
  return (
    <div>
      <ul>
        {numbers.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    </div>
  );
}
