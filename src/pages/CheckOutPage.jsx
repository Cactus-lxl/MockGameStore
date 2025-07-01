import {Link} from "react-router-dom";
import {useCartContext} from "../context/CartContext.jsx";
import CartItem from "../components/CartItem.jsx";

function CheckOutPage() {
  const { cartItem, getTotalPrice } = useCartContext();

  return (
    <div>
      <Link to={"/cart"}>Back To Cart</Link>
      <h2>Checkout</h2>
      {cartItem.map(game => (
        <p key={game.id}>{game.name} — ${game.price}</p>
      ))}
      <h3>Total: ${getTotalPrice()}</h3>
    </div>
  );
}

export default CheckOutPage;
