interface MovieStatsProps {
  totalMovie: number;
  averageRating: number;
  watchedCount: number;
}

export const MovieStats = ({
  totalMovie,
  averageRating,
  watchedCount,
}: MovieStatsProps) => {
  return (
    <div>
      <p>Nombre total de film : {totalMovie}</p>
      <p>Note moyenne : {totalMovie > 0 && averageRating} </p>
      <p>Nombre vu {watchedCount}</p>
    </div>
  );
};
