"use server";

import { MovieProp } from "@/components/MovieCard";

export async function fetchMovies(): Promise<MovieProp[]> {
  const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '48cdfd658fmsh5eaf69f5f14797bp17ba54jsndf41e084a797',
      'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
    }
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error('Error fetching data');
  }

  const data = await response.json();
  return data;
}