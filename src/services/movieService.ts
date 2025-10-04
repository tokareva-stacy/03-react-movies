import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Movie } from '../types/movie.ts';

const BASE_URL = 'https://api.themoviedb.org/3';

const getAuthHeaders = () => {
  const token = import.meta.env.VITE_TMDB_TOKEN;
  if (!token) {
    throw new Error('VITE_TMDB_TOKEN is not defined');
  }
  return {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  };
};

interface SearchResponse {
  results: Movie[];
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  const url = `${BASE_URL}/search/movie`;
  const config = {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
    headers: getAuthHeaders(),
  };

  const response: AxiosResponse<SearchResponse> = await axios.get(url, config);
  return response.data.results;
}
