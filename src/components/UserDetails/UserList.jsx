import UserCard from "./UserCard";
export default function UserList({ users, onUserSelected, filteredUsers }) {
  return (
    <ul>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onUserSelected={onUserSelected}
          highlight={filteredUsers.includes(user)}
        />
      ))}
    </ul>
  );
}
