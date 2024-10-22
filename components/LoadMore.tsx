"use client";

import { useEffect, useState } from "react";
import { fetchMovies } from "../app/action";
import MovieCard, { MovieProp } from "./MovieCard";
import Image from "next/image";

function LoadMore() {
  const [data, setData] = useState<MovieProp[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMovies().then((res) => {
      setData(res);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full">
        <Image
          src="/spinner.svg"
          alt="Loading spinner"
          width={56}
          height={56}
          className="object-contain"
        />
      </div>
    );
  }

  return null;
}

export default LoadMore;