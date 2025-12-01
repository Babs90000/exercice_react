import UserCard from "./UserCard";
export default function UserList({ users, onUserSelected }) {
  return (
    <ul>
      {users.map((user) => (
        <UserCard key={user.id} user={user} onUserSelected={onUserSelected} />
      ))}
    </ul>
  );
}
