import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import GameInfo from "../components/GameInfo.jsx";
import Filter from "../components/Filter.jsx";
import "../css/HomePage.css";
import { fetchGames } from "../service/gameAPI.js";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allGames, setAllGames] = useState([]);
  const [visibleGames, setVisibleGames] = useState([]);
  const [filter, setFilter] = useState({ Platform: "" });
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const observerRef = useRef();

  // Initial load
  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    const { games: newGames, nextPage } = await fetchGames(nextPageUrl || undefined);
    const combined = [...allGames, ...newGames];
    setAllGames(combined);
    setNextPageUrl(nextPage);
    filterAndSearch(combined, searchQuery, filter.Platform);
  };

  // Filter games that start with search input and match platform
  const filterAndSearch = (gamesList, searchText, platform) => {
    const filtered = gamesList.filter((game) => {
      const matchSearch = game.name.toLowerCase().startsWith(searchText.toLowerCase());
      const matchPlatform = !platform || game.platforms?.some(p => p.name === platform);
      return matchSearch && matchPlatform;
    });
    setVisibleGames(filtered);
  };

  // Update filtered list whenever user types or changes platform
  useEffect(() => {
    filterAndSearch(allGames, searchQuery, filter.Platform);
  }, [searchQuery, filter, allGames]);

  // Lazy load
  const observer = useCallback((node) => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && nextPageUrl) {
        loadGames();
      }
    });
    if (node) observerRef.current.observe(node);
  }, [nextPageUrl, allGames]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="home">
      <div className="navbar">
        <button className="user-profile">ICON</button>
        <Filter filter={filter} setFilter={setFilter} />
        <form onSubmit={handleSearch} className="search">
          <input
            type="text"
            placeholder="Search for Games"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </form>
        <Link to="/cart">Cart</Link>
      </div>

      <div className="games-grid">
        {visibleGames.map((game, index) => {
          const isLast = index === visibleGames.length - 1;
          return (
            <div ref={isLast ? observer : null} key={game.id}>
              <GameInfo game={game} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
