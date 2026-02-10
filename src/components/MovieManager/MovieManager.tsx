import { useState } from "react";
import { MovieItem } from "./MovieItem";
import { useCallback } from "react";
import { useMemo } from "react";
import { MovieStats } from "./MovieStats";

export interface Movie {
  id: number;
  title: string;
  ranking: number;
  watched: boolean;
}

type MovieCallback = (id: number) => void;

export default function MovieManager() {
  const [entry, setEntry] = useState<number>(0);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [formData, setFormData] = useState<Omit<Movie, "id">>({
    title: "",
    ranking: 0,
    watched: false,
  });

  const add = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMovie: Movie = { id: entry + 1, ...formData };
    setMovies([...movies, newMovie]);
    setEntry(entry + 1);
    setFormData({
      title: "",
      ranking: 0,
      watched: false,
    });
  };

  const remove: MovieCallback = useCallback(
    (movieId) => {
      setMovies(movies.filter((movie) => movie.id !== movieId));
    },
    [movies],
  );

  const changeWatched: MovieCallback = useCallback(
    (movieId) => {
      setMovies(
        movies.map((movie) =>
          movie.id == movieId ? { ...movie, watched: !movie.watched } : movie,
        ),
      );
    },
    [movies],
  );

  const movieWatched = useMemo(() => {
    return movies.filter((movie) => movie.watched).length;
  }, [movies]);
  const moviesAverage = useMemo(() => {
    return (
      movies.reduce((acc, movie) => acc + movie.ranking, 0) / movies.length
    );
  }, [movies]);

  const totalMovie = useMemo(() => {
    return movies.length;
  }, [movies]);

  const moviesList = movies.map((movie) => (
    <MovieItem
      key={movie.id}
      movie={movie}
      onDelete={remove}
      onToggle={changeWatched}
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
