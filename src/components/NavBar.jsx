import {Link} from "react-router-dom";

function NavBar(){
  return (
    <nav className={"navbar"}>
      <div className={"navbar-brand"}>
        <Link to={"/Home"}>Game HUB</Link>
      </div>

      <div className={"navbar-links"}>
        <Link to={"/cart"}>Cart</Link>
        <Link to={"/Home"}>Home</Link>
      </div>
    </nav>
  )
}

export default NavBar
