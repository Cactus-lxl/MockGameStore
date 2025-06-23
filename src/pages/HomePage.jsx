import {useState, useEffect} from "react";
import {Link} from "react-router-dom";

//other com
import GameInfo from "../components/GameInfo.jsx";
import Filter from "../components/Filter.jsx";

import "../css/HomePage.css"

//api-func
import {fetchGames} from "../service/gameAPI.js";

function HomePage(){
  //searchQuery is a state and setSearchQuery is a function used to update the state
  const [searchQuery, setSearchQuery] = useState("");
  const [games, setGames] = useState([]);
  const [filter, setFilter] = useState({
    Platform: ""
  })

  useEffect(() => {
    fetchGames().then(setGames);
  }, []);

  const handleSearch = (e) =>{
    e.preventDefault();
  }

  //will re-render every time the state is updated
  //later creat a div that contains UserIcon, the form and a cart Link.
  return(
    <div className = "home">
      <div className={"navbar"}>
        <button className={"user-profile"}>ICON</button>
        <Filter filter={filter} setFilter={setFilter}/>
        <form onSubmit={handleSearch} className={"search"}>
          <input type="text"
                 placeholder="Search for Games"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className={"search-input"}/>
        </form>

        <Link to={"/cart"}>Cart</Link>
      </div>

      {/*line 49 is used to check the input with from user to "my data"*/}
      {/*line 50 is used to map my const to the GameInfo component*/}
      <div className={"games-grid"}>
        {games
          .filter((game) => {
            const matchSearch = game.name.toLowerCase().startsWith(searchQuery.toLowerCase());
            const matchPlatform = !filter.Platform || game.platforms?.some(p => p.name === filter.Platform);

            return matchSearch && matchPlatform;
          })

          .map((game) => (
            game.name.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
              <GameInfo game={game} key={game.id}/>
            )
        ))}
      </div>
    </div>
  )
}

export default HomePage