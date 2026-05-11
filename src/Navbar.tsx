import { FaMagnifyingGlass } from "react-icons/fa6";
import { PiShoppingCartBold } from "react-icons/pi";
import { LuCircleUserRound } from "react-icons/lu";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/search">
        <button className="searchProductsBtn">
          {<FaMagnifyingGlass />}Suchen...
        </button>
      </Link>
      <div className="nav-middle">
        <Link to="/">Start</Link>
        <div className="productDropdown">
          <Link to="/products">Shop</Link>
        </div>
        <Link to="/info">Info</Link>
        <Link to="/about">Blog</Link>
        <Link to="/contact">Kontakt</Link>
      </div>
      <div className="nav-user-cart">
        <Link to="/user">{<LuCircleUserRound />} </Link>
        <Link to="/login">
          <button className="loginButton">Anmelden</button>
        </Link>
        <Link to="/cart">{<PiShoppingCartBold />}</Link>
      </div>
    </div>
  );
};
