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
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded border border-gray-300 bg-gray-800 text-gray-200 w-full max-w-md"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 rounded border border-gray-300 bg-gray-800 text-gray-200 w-full max-w-md"
        >
          <option value="">No sorting</option>
          <option value="title">Sort by title</option>
          <option value="rating">Sort by rating</option>
          <option value="year">Sort by year</option>
        </select>
      </div>

      {sortedData.length === 0 ? (
        <p className="text-white">Movies not found.</p>
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