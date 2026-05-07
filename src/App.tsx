import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Start from "./Components/Start";
import SearchProducts from "./Components/SearchProducts";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { PiShoppingCartBold } from "react-icons/pi";
import { LuCircleUserRound } from "react-icons/lu";
import Login from "./Components/Login";
import Info from "./Components/Info";

function App() {
  return (
    <div className="wrapper">
      <ShippingInfo />
      <Logo />
      <Navbar />
      <Routes>
        <Route path="/search" element={<SearchProducts />} />
        <Route path="/" element={<Start />} />

        {/*<Route path="/products" element={<Products />} />*/}
        <Route path="/info" element={<Info />} />
        {/*<Route path="/contact" element={<Contact />} />*/}
        {/*<Route path="/blog" element={<Blog />} /> */}
        <Route path="/login" element={<Login />} />
        {/*<Route path="/cart" element={<Cart />} />*/}
      </Routes>
    </div>
  );
}

export default App;

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/search">
        <button className="searchProductsBtn">
          {<FaMagnifyingGlass />}Suchen...
        </button>
      </Link>
      <Link to="/">Start</Link>
      <div className="productDropdown">
        <Link to="/products">Shop</Link>
      </div>
      <Link to="/info">Info</Link>
      <Link to="/about">Blog</Link>
      <Link to="/contact">Kontakt</Link>
      <Link to ="/user">{<LuCircleUserRound />} </Link>
      <Link to="/login">
        <button className="loginButton">
          Anmelden
        </button>
      </Link>
      <Link to="/cart">{<PiShoppingCartBold />}</Link>
    </div>
  );
};
/* courier new", courier-ps-w01, monospace */

const ShippingInfo = () => {
  return (
    <div className="shippingInfo">
      <h1>Kostenloser Versand weltweit für Bestellungen über 40€</h1>
    </div>
  );
};

const Logo = () => {
  return <div className="logoContainer"></div>;
};


