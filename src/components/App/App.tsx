import { useState } from 'react';
import css from './App.module.css';

import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar.tsx';
import MovieGrid from '../MovieGrid/MovieGrid.tsx';
import Loader from '../Loader/Loader.tsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.tsx';
import MovieModal from '../MovieModal/MovieModal.tsx';
import { fetchMovies } from '../../services/movieService.ts';
import type { Movie } from '../../types/movie.ts';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearchAction = async (formData: FormData) => {
    const query = formData.get("query") as string;
    const trimmedQuery = query ? query.trim() : "";

    if (!trimmedQuery) {
      return; 
    }

    setMovies([]);
    setError(false);
    setLoading(true);

    try {
      const results = await fetchMovies(trimmedQuery);

      if (!results || results.length === 0) {
        toast('No movies found for your request.');
      } else {
        setMovies(results);
      }
    } catch (err) {
      console.error(err);
      setError(true);
      toast.error('There was an error while fetching movies.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.container}>
      <Toaster position="top-right" />
      <SearchBar action={handleSearchAction} />
      <main>
        {loading && <Loader />}
        {error && <ErrorMessage />}
        {!loading && !error && <MovieGrid movies={movies} onSelect={handleSelect} />}
      </main>
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}
