import UserList from "./UserList";
import { useState } from "react";

export default function UserDetails() {
  const [userSelected, setUserSelected] = useState(null);

  function handleUserSelected(user) {
    console.log("Cliqué sur:", user);
    setUserSelected(user);
  }

  const users = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 22 },
    { id: 4, name: "Diana", age: 28 },
  ];

  return (
    <>
      <UserList users={users} onUserSelected={handleUserSelected} />
      {userSelected && (
        <div className="detail">
          <h2>DÉTAILS ICI</h2>
          <p>{userSelected?.name}</p>
          <p>{userSelected?.age}</p>
          <p>{userSelected?.id}</p>
        </div>
      )}
    </>
  );
}
