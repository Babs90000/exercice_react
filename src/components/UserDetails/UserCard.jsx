export default function UserCard({ user, onUserSelected, highlight }) {
  return (
    <div
      onClick={() => onUserSelected(user)}
      style={
        highlight
          ? { backgroundColor: "yellow", fontWeight: "bold" }
          : undefined
      }
    >
      <p>{user.name}</p>
    </div>
  );
}
