import { FaMagnifyingGlass } from "react-icons/fa6";
import { PiShoppingCartBold } from "react-icons/pi";
import { LuCircleUserRound } from "react-icons/lu";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/search">
        <button className="searchProductsBtn">
          <span className=" iconSearch">
            {<FaMagnifyingGlass />}
            <span>Suchen...</span>
          </span>
        </button>
      </Link>
      <div className="nav-middle">
        <Link to="/">Start</Link>
        <div className="productDropdown">
          <Link to="/products">Shop</Link>
          <div className="dropdown-content">
            <a href="#">Grußkarten</a>
            <a href="#">Notebooks</a>
            <a href="#">Geschenkpapier</a>
            <a href="#">Prints</a>
            <a href="#">Limitierte Auflagen</a>
          </div>
        </div>
        <Link to="/info">Info</Link>
        <Link to="/about">Blog</Link>
        <Link to="/contact">Kontakt</Link>
      </div>
      <div className="nav-user-cart">
        <Link to="/user">
          <span className="iconUser"> {<LuCircleUserRound />}</span>
        </Link>
        <Link to="/login">
          <button className="loginButton">Anmelden</button>
        </Link>
        <Link to="/cart">
          <span className="iconCart">{<PiShoppingCartBold />}</span>
        </Link>
      </div>
    </div>
  );
};
