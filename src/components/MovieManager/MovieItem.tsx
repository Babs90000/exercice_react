import { Movie } from "./MovieManager";
import { memo } from "react";

interface MovieItemProps {
  movie: Movie;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const MovieItem = memo(
  ({ movie, onToggle, onDelete }: MovieItemProps) => {
    console.log(`MovieItem ${movie.id} render`);
    return (
      <div>
        <h3>{movie.title}</h3>
        <p>{movie.ranking}</p>
        {movie.watched ? <p>vu</p> : <p> À voir</p>}
        <input
          type="checkbox"
          checked={movie.watched}
          onChange={() => onToggle(movie.id)}
        />
        <p onClick={() => onDelete(movie.id)}>supprimer</p>
      </div>
    );
  },
);
