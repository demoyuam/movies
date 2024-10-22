"use server";

import { MovieProp } from "@/components/MovieCard";

export async function fetchMovies(): Promise<MovieProp[]> {
  const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'ВАШ_RAPIDAPI_KEY',
      'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
    }
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error('Ошибка при получении данных');
  }

  const data = await response.json();
  return data;
}