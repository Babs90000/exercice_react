import { useState } from "react";

interface Movie {
  id: number;
  title: string;
  ranking: number;
  watched: boolean;
}

export default function MovieManager() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const moviesList = movies.map((movie) => (
    <div key={movie.id}>
      <h3>{movie.title}</h3>
      <p>{movie.ranking}</p>
      {movie.watched == true ? (
        <>
          <p>vu</p>{" "}
          {/* <input type="checkbox" name="Visionné ?" onChange={changeStatut} /> */}
          <input
            type="checkbox"
            checked={movie.watched}
            onChange={() => changeWatched(movie.id)}
          />
        </>
      ) : (
        <>
          <p> À voir</p>
          <input
            type="checkbox"
            checked={movie.watched}
            onChange={() => changeWatched(movie.id)}
          />
        </>
      )}
      <p onClick={() => remove(movie.id)}>supprimer</p>
    </div>
  ));

  let newMovie: Movie = {
    id: movies.length + 1,
    title: "title",
    ranking: 0,
    watched: false,
  };

  function add(e) {
    e.preventDefault();
    setMovies([...movies, newMovie]);
  }

  function remove(movieId: number) {
    setMovies(movies.filter((movie) => movie.id !== movieId));
  }

  function changeWatched(movieId: number) {
    setMovies(
      movies.map((movie) =>
        movie.id == movieId ? { ...movie, watched: !movie.watched } : movie,
      ),
    );
  }

  const movieWatched = movies.filter((movie) => movie.watched == true).length;
  const moviesAverrage =
    movies.reduce((acc, movie) => acc + movie.ranking, 0) / movies.length;

  return (
    <>
      {moviesList}

      <p>Nombre total de film : {movies.length}</p>
      <p>Note moyenne : {movies.length > 0 && moviesAverrage} </p>
      <p>Nombre vu {movieWatched}</p>
      <form onSubmit={add}>
        <input
          type="text"
          placeholder="titre du film"
          onChange={(e) => (newMovie.title = e.target.value)}
        />
        <input
          type="number"
          placeholder="note entre 0 et 10"
          onChange={(e) => (newMovie.ranking = Number(e.target.value))}
        />
        <input
          type="checkbox"
          name="Visionné ?"
          onChange={() => (newMovie.watched = !newMovie.watched)}
        />
        <input type="submit" />
      </form>
    </>
  );
}
