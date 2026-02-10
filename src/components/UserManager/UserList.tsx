import { useMemo, memo } from "react";
import { User } from "./UserManager";
interface UserListProps {
  users: User[];
}

const UserList = ({ users }: UserListProps) => {
  const list = useMemo(() => {
    return users.map((user) => (
      <div key={user.id}>
        <p>Nom : {user.name}</p>
        <p>Email : {user.email}</p>
        <p>Nom d'utilisateur : {user.username}</p>
      </div>
    ));
  }, [users]);

  return <div>{list}</div>;
};

export default memo(UserList);
