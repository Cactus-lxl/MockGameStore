function CartItem({game}){

  return(
    <div>
      <img src={game.background_image} alt={game.name}/>
      <h3>{game.name}</h3>
      <h3>Price: ${game.price}</h3>
    </div>
  )
}

export default CartItem