import{Link} from "react-router-dom";
import "../css/GameInfo.css"

function GameInfo({game}){
  function addToCart(){
    alert("Clicked")
  }

  return(
    <div className={"Game"}>
      <div className={"Game-icon"}>
        <Link to={`/details`}>
          <img src={game.background_image} alt={game.name}/>
        </Link>
      </div>

      <div className={"Game-info"}>
        <Link to={`/details`}>
          <h3>{game.name}</h3>
        </Link>

        <button className={"cart-button"} onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default GameInfo