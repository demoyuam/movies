"use client";

import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { fetchAnime } from "../app/action";
import AnimeCard, { AnimeProp } from "./AnimeCard";
import Image from "next/image";

let page = 2;

function LoadMore() {
  const { ref, inView } = useInView();
  const [data, setData] = useState<AnimeProp[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (inView) {
      setIsLoading(true);
      const delay = 500;

      const timeoutId = setTimeout(() => {
        fetchAnime(page).then((res) => {
          setData((prevData) => [...prevData, ...res]);
          page++;
          setIsLoading(false);
        });
      }, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [inView]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data.map((anime, index) => (
          <AnimeCard key={`${anime.id}-${index}`} anime={anime} index={index} />
        ))}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          {isLoading && (
            <Image
              src="./spinner.svg"
              alt="spinner"
              width={56}
              height={56}
              className="object-contain"
            />
          )}
        </div>
      </section>
    </>
  );
}

export default LoadMore;