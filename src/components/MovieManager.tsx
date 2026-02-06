import { useState } from "react";

interface Movie {
  id: number;
  title: string;
  ranking: number;
  watched: boolean;
}

export default function MovieManager() {
  const [entry, setEntry] = useState<number>(0);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [formData, setFormData] = useState<Omit<Movie, "id">>({
    title: "",
    ranking: 0,
    watched: false,
  });

  const moviesList = movies.map((movie) => (
    <div key={movie.id}>
      <h3>{movie.title}</h3>
      <p>{movie.ranking}</p>
      {movie.watched == true ? <p>vu</p> : <p> À voir</p>}
      <input
        type="checkbox"
        checked={movie.watched}
        onChange={() => changeWatched(movie.id)}
      />
      <p onClick={() => remove(movie.id)}>supprimer</p>
    </div>
  ));

  function add(e) {
    e.preventDefault();
    const newMovie: Movie = { id: entry + 1, ...formData };
    setMovies([...movies, newMovie]);
    setEntry(entry + 1);
    setFormData({
      title: "",
      ranking: 0,
      watched: false,
    });
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
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="note entre 0 et 10"
          value={formData.ranking}
          onChange={(e) =>
            setFormData({ ...formData, ranking: Number(e.target.value) })
          }
        />
        <input
          type="checkbox"
          name="Visionné ?"
          checked={formData.watched}
          onChange={(e) =>
            setFormData({ ...formData, watched: e.target.checked })
          }
        />
        <input type="submit" />
      </form>
    </>
  );
}
