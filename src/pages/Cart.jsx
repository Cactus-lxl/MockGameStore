import {Link} from "react-router-dom";
import {useCartContext} from "../context/CartContext.jsx";
import CartItem from "../components/CartItem.jsx";

function Cart(){
  const {cartItem} = useCartContext();

  if(cartItem){
    return(
      <div>
        <Link to={"/home"}>Game Hub</Link>

        <div className={"cart-gird"}>
          {cartItem.map((game) => (
            <CartItem key={game.id} game={game} />
          ))}
        </div>

        <Link to={"/checkoutpage"}>Check Out</Link>
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