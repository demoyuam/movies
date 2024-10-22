import { fetchMovies } from "./action";
import MovieList from "../components/MovieList";

async function Home() {
  const data = await fetchMovies();

  
  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <h2 className="text-3xl text-white font-bold">Explore Movies</h2>

      <MovieList initialData={data} />
    </main>
  );
}

export default Home;
