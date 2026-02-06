interface SearchBarProps {
  onSearch: SearchCallback;
  searchTerm: string;
}

import { SearchCallback } from "./OptimizedTodoList";
export default function SearchBar({ onSearch, searchTerm }: SearchBarProps) {
  console.log(searchTerm);
  return (
    <>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
    </>
  );
}
