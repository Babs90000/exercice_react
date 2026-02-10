import { useState, useEffect, useCallback, useMemo } from "react";
import SearchBar from "./SearchBar";
import UserList from "./UserList";

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export type Callback = (value: string) => void;

const UserManager = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [refetchTrigger, setRefetchTrigger] = useState<number>(0);

  useEffect(() => {
    const controller = new AbortController();
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal },
        );
        if (!response.ok) {
          throw new Error("Erreur http");
        }

        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    return () => {
      controller.abort();
    };
  }, [refetchTrigger]);

  const handleSearch = useCallback<Callback>((value) => {
    setSearchTerm(value);
  }, []);

  const usersFiltered = useMemo(() => {
    if (!searchTerm) {
      return users;
    }
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, users]);

  const handleRefreshTrigger = () => {
    console.log("Avant:", refetchTrigger); // 0
    setRefetchTrigger((prev) => {
      console.log("nouvelle valeur : ", prev + 1);
      return prev + 1;
    });
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Chargement...</p>}
      {error && <p>Erreur : {error}</p>}
      <h1>
        Utilisateurs {usersFiltered.length}/{users.length}
      </h1>
      <UserList users={usersFiltered} />
      <button onClick={handleRefreshTrigger}>Rafraîchir</button>
    </div>
  );
};

export default UserManager;
