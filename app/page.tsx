import { fetchAnime } from "./action";
import LoadMore from "../components/LoadMore";
import { useState, useEffect } from "react";

async function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [animeData, setAnimeData] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await fetchAnime(1);
      setAnimeData(data);
    }
    getData();
  }, []);

  const filteredData = animeData.filter((anime: any) =>
    anime.props.anime.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = filteredData.sort((a: any, b: any) => {
    if (sortOption === 'name') {
      return a.props.anime.name.localeCompare(b.props.anime.name);
    } else if (sortOption === 'score') {
      return parseFloat(b.props.anime.score) - parseFloat(a.props.anime.score);
    } else if (sortOption === 'episodes') {
      return b.props.anime.episodes - a.props.anime.episodes;
    }
    return 0;
  });

  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <h2 className="text-3xl text-white font-bold">Explore Anime</h2>

      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 rounded border border-gray-300 text-black"
      />

      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="p-2 rounded border border-gray-300 text-black"
      >
        <option value="">No sorting</option>
        <option value="name">Sort by Name</option>
        <option value="score">Sort by Rating</option>
        <option value="episodes">Sort by Episodes</option>
      </select>

      {sortedData.length === 0 ? (
        <p className="text-white">No anime found.</p>
      ) : (
        <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {sortedData}
        </section>
      )}
      <LoadMore />
    </main>
  );
}

export default Home;