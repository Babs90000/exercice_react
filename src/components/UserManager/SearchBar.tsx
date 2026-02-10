import { Callback } from "./UserManager";

interface SearchBarProps {
  onSearch: Callback;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    <div>
      <input type="text" onChange={(e) => onSearch(e.target.value)} />
    </div>
  );
};

export default SearchBar;
