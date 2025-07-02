import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import GameInfo from "../components/GameInfo";
import Filter from "../components/Filter";
import { fetchGames } from "../service/gameAPI";
import { Game, FilterState } from "@/types";
import "../css/HomePage.css";

function HomePage(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [visibleGames, setVisibleGames] = useState<Game[]>([]);
  const [filter, setFilter] = useState<FilterState>({ Platform: "", SubPlatform: "" });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadedPages = useRef<Set<number>>(new Set());

  // Initial load
  useEffect(() => {
    loadGames(1, true);
  }, []);

  const loadGames = async (page: number, reset: boolean = false): Promise<void> => {
    // Prevent loading the same page twice
    if (loadedPages.current.has(page) && !reset) return;
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      const { games: newGames, hasNextPage } = await fetchGames(page);
      
      if (reset) {
        loadedPages.current.clear();
        loadedPages.current.add(page);
        setAllGames(newGames);
        setCurrentPage(2);
      } else {
        loadedPages.current.add(page);
        setAllGames(prev => {
          // Remove duplicates by creating a Map with game.id as key
          const gamesMap = new Map<number, Game>();
          
          // Add existing games
          prev.forEach(game => gamesMap.set(game.id, game));
          
          // Add new games (will overwrite if duplicate ID exists)
          newGames.forEach(game => gamesMap.set(game.id, game));
          
          // Convert back to array
          return Array.from(gamesMap.values());
        });
        setCurrentPage(prev => prev + 1);
      }
      
      setHasMore(hasNextPage);
    } catch (error) {
      console.error("Error loading games:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSearch = useCallback((
    gamesList: Game[], 
    searchText: string, 
    platform: string, 
    subPlatform: string
  ): Game[] => {
    // Trim the search text to handle whitespace
    const trimmedSearch = searchText.trim();
    
    const filtered = gamesList.filter((game) => {
      // Search filter - if search is empty, show all; otherwise check if name starts with search
      const matchSearch = trimmedSearch === "" || 
        game.name.toLowerCase().startsWith(trimmedSearch.toLowerCase());

      // Platform filter
      const matchPlatform = (() => {
        if (!platform) return true;
        const platformNames = game.platforms?.map(p => p.name) || [];

        if (platform === "Xbox" || platform === "PlayStation") {
          if (!subPlatform) {
            return platformNames.some(name => 
              name.toLowerCase().startsWith(platform.toLowerCase())
            );
          } else {
            return platformNames.includes(subPlatform);
          }
        }

        return platformNames.includes(platform);
      })();

      // Both conditions must be true
      return matchSearch && matchPlatform;
    });

    return filtered;
  }, []);

  // Apply filters whenever games, search, or filter changes
  useEffect(() => {
    const filtered = filterAndSearch(allGames, searchQuery, filter.Platform, filter.SubPlatform);
    setVisibleGames(filtered);
  }, [searchQuery, filter, allGames, filterAndSearch]);

  // Intersection Observer callback for infinite scrolling
  const observer = useCallback((node: HTMLDivElement | null) => {
    if (isLoading) return;
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        // Only load more if there's no active search or we need more results
        if (searchQuery.trim() === "" || visibleGames.length < 10) {
          loadGames(currentPage);
        }
      }
    });
    
    if (node) observerRef.current.observe(node);
  }, [currentPage, hasMore, isLoading, visibleGames.length, searchQuery]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
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
        {visibleGames.length === 0 && searchQuery && (
          <div className="no-games">
            <h2>No games found</h2>
            <p>No games starting with "{searchQuery}" were found.</p>
          </div>
        )}
        {isLoading && (
          <div className="loading-more">
            <div className="spinner"></div>
            <p>Loading more games...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;