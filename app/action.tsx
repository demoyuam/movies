"use server";

import { AnimeProp } from "@/components/AnimeCard";

const MAX_LIMIT = 8;

export async function fetchAnime(page: number): Promise<AnimeProp[]> {
  const response = await fetch(
    `https://shikimori.one/api/animes?page=${page}&limit=${MAX_LIMIT}&order=popularity`
  );

  const data = await response.json();

  return data;
}