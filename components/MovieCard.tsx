import Image from "next/image";
import { useState } from "react";

export interface MovieProp {
  rank: number;
  title: string;
  description: string;
  image: string;
  genre: string[];
  rating: string;
  year: number;
  imdbid: string;
}

interface Prop {
  movie: MovieProp;
  index: number;
}

function MovieCard({ movie, index }: Prop) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="max-w-sm rounded relative w-full">
      <div className="relative w-full h-[37vh]">
        <Image
          src={movie.image}
          alt={movie.title}
          fill
          className="rounded-xl object-cover"
        />
      </div>
      <div className="py-4 flex flex-col gap-3">
        <h2 className="font-bold text-white text-xl line-clamp-1 w-full">
          {movie.title}
        </h2>
        <p className={`text-white text-sm ${isExpanded ? '' : 'line-clamp-2'}`}>
          {movie.description}
        </p>
        {movie.description.length > 100 && (
          <button
            onClick={toggleDescription}
            className="text-blue-500 text-sm underline"
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        )}
        <div className="flex gap-4 items-center">
          <p className="text-base text-white font-bold">Year: {movie.year}</p>
          <p className="text-base font-bold text-[#FFAD49]">Rating: {movie.rating}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {movie.genre.map((genre) => (
            <span
              key={genre}
              className="py-1 px-2 bg-[#161921] rounded-sm text-white text-sm font-bold"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;