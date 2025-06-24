import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

// other com
import GameInfo from "../components/GameInfo.jsx";
import Filter from "../components/Filter.jsx";

// api
import { fetchGames } from "../service/gameAPI.js";

// css
import "../css/HomePage.css";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allGames, setAllGames] = useState([]);
  const [visibleGames, setVisibleGames] = useState([]);
  const [filter, setFilter] = useState({ Platform: "", SubPlatform: "" });
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
    filterAndSearch(combined, searchQuery, filter.Platform, filter.SubPlatform);
  };

  // Filter name must start with search query, and match platform
  const filterAndSearch = (gamesList, searchText, platform, subPlatform) => {
    const filtered = gamesList.filter((game) => {
      const matchSearch = game.name.toLowerCase().startsWith(searchText.toLowerCase());

      const matchPlatform = (() => {
        if (!platform) return true;

        const platformNames = game.platforms?.map(p => p.name) || [];

        if (platform === "Xbox" || platform ==="PlayStation") {
          if (!subPlatform) {
            // Show all game hosted by platform
            return platformNames.some(name => name.toLowerCase().startsWith("xbox"));
          } else {
            // Show only specific sub-platform
            return platformNames.includes(subPlatform);
          }
        }

        // Exact match for non-Xbox platforms
        return platformNames.includes(platform);
      })();

      return matchSearch && matchPlatform;
    });

    setVisibleGames(filtered);
  };

  // Update visible games when filters/search change
  useEffect(() => {
    filterAndSearch(allGames, searchQuery, filter.Platform, filter.SubPlatform);
  }, [searchQuery, filter, allGames]);

  // Infinite scroll using Intersection Observer
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
