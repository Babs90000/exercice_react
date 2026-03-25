import { useState, useCallback, useMemo } from "react";
import SearchBar from "./SearchBar";
import UserList from "./UserList";
import { useFetch } from "./Hooks/useFetch";

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export type Callback = (value: string) => void;

const UserManager = () => {
  const {
    data: users,
    loading,
    refetch,
    error,
  } = useFetch<User[]>("https://jsonplaceholder.typicode.com/users");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = useCallback<Callback>((value) => {
    setSearchTerm(value);
  }, []);

  const usersFiltered = useMemo(() => {
    if (!users) {
      return [];
    }
    if (!searchTerm) {
      return users;
    }
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, users]);

  return (
    <div style={{ backgroundColor: "white" }}>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Chargement...</p>}
      {error && <p>Erreur : {error}</p>}
      <h1>
        Utilisateurs {usersFiltered?.length}/{users?.length}
      </h1>
      <UserList users={usersFiltered} />
      <button onClick={refetch}>Rafraîchir</button>
    </div>
  );
};

export default UserManager;
