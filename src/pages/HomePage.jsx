import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import GameInfo from "../components/GameInfo.jsx";
import Filter from "../components/Filter.jsx";
import { fetchGames } from "../service/gameAPI.js";
import "../css/HomePage.css";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allGames, setAllGames] = useState([]);
  const [visibleGames, setVisibleGames] = useState([]);
  const [filter, setFilter] = useState({ Platform: "", SubPlatform: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  //what does observerRef do? and what does useRef do?
  const observerRef = useRef();

  useEffect(() => {
    loadGames(currentPage);
  }, []);

  const loadGames = async (page) => {
    const { games: newGames, hasNextPage } = await fetchGames(page);
    const combined = [...allGames, ...newGames];
    setAllGames(combined);
    setHasMore(hasNextPage);
    setCurrentPage(page + 1);
    filterAndSearch(combined, searchQuery, filter.Platform, filter.SubPlatform);
  };

  const filterAndSearch = (gamesList, searchText, platform, subPlatform) => {
    const filtered = gamesList.filter((game) => {
      const matchSearch = game.name.toLowerCase().startsWith(searchText.toLowerCase());

      const matchPlatform = (() => {
        if (!platform) return true;
        const platformNames = game.platforms?.map(p => p.name) || [];

        if (platform === "Xbox" || platform === "PlayStation") {
          if (!subPlatform) {
            return platformNames.some(name => name.toLowerCase().startsWith(platform.toLowerCase()));
          } else {
            return platformNames.includes(subPlatform);
          }
        }

        return platformNames.includes(platform);
      })();

      return matchSearch && matchPlatform;
    });

    setVisibleGames(filtered);
  };

  useEffect(() => {
    filterAndSearch(allGames, searchQuery, filter.Platform, filter.SubPlatform);
  }, [searchQuery, filter, allGames]);

  //what is useCallBack and why do I need it?
  const observer = useCallback((node) => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadGames(currentPage);
      }
    });
    if (node) observerRef.current.observe(node);
  }, [currentPage, hasMore, allGames]);

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
