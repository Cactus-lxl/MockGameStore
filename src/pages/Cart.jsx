import {Link} from "react-router-dom";

function Cart(){
  return(
    <dev className={"Cart"}>
      <Link to={"/Home"}>Game Hub</Link>

      <h2>Nothing in cart</h2>
      <p>Start adding Games to Your Shoping Cart</p>
    </dev>
  )
}

export default Cart