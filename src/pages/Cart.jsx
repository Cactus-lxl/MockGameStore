import {Link} from "react-router-dom";
import {useCartContext} from "../context/CartContext.jsx";
import GameInfo from "../components/GameInfo.jsx";

function Cart(){
  const {cartItem} = useCartContext();

  if(cartItem){
    return(
      <div>
        <Link to={"/home"}>Game Hub</Link>

        <div className={"cart-grid"}>
          {cartItem.map((game) => (
            <GameInfo game = {game}/>
          ))}
        </div>

        <Link to={"/checkout"}>Check Out</Link>
      </div>
    )
  }

  return(
    <div className={"Cart"}>
      <Link to={"/home"}>Game Hub</Link>

      <h2>Nothing in cart</h2>
      <p>Start adding Games to Your Shoping Cart</p>
    </div>
  )
}

export default Cart