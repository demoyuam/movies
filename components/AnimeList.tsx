"use client";

import React, { useState, useEffect } from "react";
import AnimeCard, { AnimeProp } from "@/components/AnimeCard";

interface AnimeListProps {
  initialData: AnimeProp[];
}

function AnimeList({ initialData }: AnimeListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [animeData, setAnimeData] = useState<AnimeProp[]>(initialData);

  const filteredData = animeData.filter((anime) =>
    anime.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = filteredData.sort((a, b) => {
    if (sortOption === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "score") {
      return parseFloat(b.score) - parseFloat(a.score);
    } else if (sortOption === "episodes") {
      return (b.episodes || 0) - (a.episodes || 0);
    }
    return 0;
  });

  return (
    <div className="flex flex-col gap-5">
      <input
        type="text"
        placeholder="Поиск по названию..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 rounded border border-gray-300 text-black"
      />

      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="p-2 rounded border border-gray-300 text-black"
      >
        <option value="">Без сортировки</option>
        <option value="name">Сортировать по названию</option>
        <option value="score">Сортировать по рейтингу</option>
        <option value="episodes">Сортировать по эпизодам</option>
      </select>

      {sortedData.length === 0 ? (
        <p className="text-white">Аниме не найдено.</p>
      ) : (
        <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {sortedData.map((anime, index) => (
            <AnimeCard key={anime.id} anime={anime} index={index} />
          ))}
        </section>
      )}
    </div>
  );
}

export default AnimeList;