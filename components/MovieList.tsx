"use client";

import React, { useState } from "react";
import MovieCard, { MovieProp } from "@/components/MovieCard";

interface MovieListProps {
  initialData: MovieProp[];
}

function MovieList({ initialData }: MovieListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  const filteredData = initialData.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = filteredData.sort((a, b) => {
    if (sortOption === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "rating") {
      return parseFloat(b.rating) - parseFloat(a.rating);
    } else if (sortOption === "year") {
      return b.year - a.year;
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
        <option value="title">Сортировать по названию</option>
        <option value="rating">Сортировать по рейтингу</option>
        <option value="year">Сортировать по году</option>
      </select>

      {sortedData.length === 0 ? (
        <p className="text-white">Фильмы не найдены.</p>
      ) : (
        <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {sortedData.map((movie, index) => (
            <MovieCard key={movie.imdbid} movie={movie} index={index} />
          ))}
        </section>
      )}
    </div>
  );
}

export default MovieList;