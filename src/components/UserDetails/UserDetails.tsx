import UserList from "./UserList";
import { useState } from "react";

export default function UserDetails() {
  const [userSelected, setUserSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  let filteredUsers;
  searchTerm.length > 0
    ? (filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ))
    : (filteredUsers = []);

  return (
    <>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Rechercher un utilisateur"
      />
      <UserList
        users={users}
        onUserSelected={handleUserSelected}
        filteredUsers={filteredUsers}
      />
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
