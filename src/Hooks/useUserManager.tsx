import { useLocalStorage } from "./useLocalStorage";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface UserState {
  users: User[];
  searchTerm: string;
}

type UserAction =
  | { type: "SET_USERS"; payload: User[] }
  | { type: "DELETE_USER"; payload: number }
  | { type: "SEARCH_USER"; payload: string };

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case "SEARCH_USER":
      return {
        ...state,
        searchTerm: action.payload,
      };

    default:
      return state;
  }
};

const useUserManager = () => {
  const [savedUsers, setSavedUser] = useLocalStorage<UserState>("users", {
    users: [],
    searchTerm: "",
  });
};
