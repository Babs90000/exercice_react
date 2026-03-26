import { useReducer, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

interface Movie {
  id: number;
  title: string;
  ranking: number;
  watched: boolean;
}

interface MovieState {
  movies: Movie[];
}

type MovieAction =
  | { type: "ADD_MOVIE"; payload: Movie }
  | { type: "REMOVE_MOVIE"; payload: number }
  | { type: "TOGGLE_WATCHED"; payload: number }
  | { type: "CLEAR_MOVIES" };

const movieReducer = (state: MovieState, action: MovieAction): MovieState => {
  switch (action.type) {
    case "ADD_MOVIE":
      return {
        ...state,
        movies: [...state.movies, action.payload],
      };
    case "REMOVE_MOVIE":
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.payload),
      };

    case "TOGGLE_WATCHED":
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.id === action.payload
            ? { ...movie, watched: !movie.watched }
            : movie,
        ),
      };

    case "CLEAR_MOVIES":
      return { ...state, movies: [] };

    default:
      return state;
  }
};

export const useMovieManager = () => {
  const [savedMovies, setSavedMovies] = useLocalStorage<MovieState>("movies", {
    movies: [],
  });
  const [state, dispatch] = useReducer(movieReducer, savedMovies);
  useEffect(() => setSavedMovies(state), [state]);

  return { state, dispatch };
};
