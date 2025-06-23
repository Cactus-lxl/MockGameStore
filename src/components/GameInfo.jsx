import "../css/GameInfo.css"

function GameInfo({game}){
  function addToCart(){
    alert("Clicked")
  }

  return(
    <div className={"Game"}>
      <div className={"Game-icon"}>
        <img src={game.background_image} alt={game.name}/>
      </div>

      <div className={"Game-info"}>
        <h3>{game.name}</h3>

        <button className={"cart-button"} onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default GameInfo