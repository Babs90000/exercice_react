import { useCallback, useState } from "react";
import { MovieItem } from "./MovieItem";
import { useMemo } from "react";
import { MovieStats } from "./MovieStats";
import { useMovieManager } from "../../Hooks/useMovieManager";

type CallBack = (id: number) => void;
type Reset = () => void;

export interface Movie {
  id: number;
  title: string;
  ranking: number;
  watched: boolean;
}

export default function MovieManager() {
  const { state, dispatch } = useMovieManager();
  const [formData, setFormData] = useState<Omit<Movie, "id">>({
    title: "",
    ranking: 0,
    watched: false,
  });

  const add = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: "ADD_MOVIE",
      payload: { id: Number(Date.now()), ...formData },
    });
    setFormData({
      title: "",
      ranking: 0,
      watched: false,
    });
  };

  const handleToggle: CallBack = useCallback(
    (id) => dispatch({ type: "TOGGLE_WATCHED", payload: id }),
    [dispatch],
  );

  const handleDelete: CallBack = useCallback(
    (id: number) => dispatch({ type: "REMOVE_MOVIE", payload: id }),
    [dispatch],
  );

  const handleReset: Reset = () => dispatch({ type: "CLEAR_MOVIES" });

  const movieWatched = useMemo(() => {
    return state.movies.filter((movie) => movie.watched).length;
  }, [state.movies]);
  const moviesAverage = useMemo(() => {
    return (
      state.movies.reduce((acc, movie) => acc + movie.ranking, 0) /
      state.movies.length
    );
  }, [state.movies]);

  const totalMovie = useMemo(() => {
    return state.movies.length;
  }, [state.movies]);

  const moviesList = state.movies.map((movie) => (
    <MovieItem
      key={movie.id}
      movie={movie}
      onDelete={handleDelete}
      onToggle={handleToggle}
    />
  ));

  return (
    <>
      {moviesList}
      <MovieStats
        watchedCount={movieWatched}
        averageRating={moviesAverage}
        totalMovie={totalMovie}
      />
      <button onClick={handleReset}>Tout supprimer</button>
      <form onSubmit={add}>
        <input
          type="text"
          placeholder="titre du film"
          value={formData.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, title: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="note entre 0 et 10"
          value={formData.ranking}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, ranking: Number(e.target.value) })
          }
        />
        <input
          type="checkbox"
          name="Visionné ?"
          checked={formData.watched}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, watched: e.target.checked })
          }
        />
        <input type="submit" />
      </form>
    </>
  );
}
