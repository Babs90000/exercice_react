import { Children } from "react";

export default function UserCard({ user, onUserSelected }) {
  return (
    <div onClick={() => onUserSelected(user)}>
      <p>{user.name}</p>
    </div>
  );
}
