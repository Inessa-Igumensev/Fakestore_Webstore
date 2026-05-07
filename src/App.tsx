import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Start from "./Components/Start";
import SearchProducts from "./Components/SearchProducts";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { PiShoppingCartBold } from "react-icons/pi";
import { LuCircleUserRound } from "react-icons/lu";

function App() {
  return (
    <div className="wrapper">
      <ShippingInfo />
      <Navbar />
      <Routes>
        <Route path="/" element={<Start />} />
        {/*<Route path="/products" element={<Products />} />*/}
        {/* <Route path="/about" element={<About />} /> */}
        {/*<Route path="/contact" element={<Contact />} />*/}
        {/*<Route path="/cart" element={<Cart />} />*/}
        {/*<Route path="/blog" element={<Blog />} /> */}
        <Route path="/search" element={<SearchProducts />} />
        {/*<Route path="/login" element={<Login />} />*/}
      </Routes>
    </div>
  );
}

export default App;


const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/search">{<FaMagnifyingGlass />}Suchen...</Link>
      <Link to="/">Start</Link>
      <Link to="/products">Shop</Link>
      <Link to="/about">Info</Link>
      <Link to="/about">Blog</Link>
      <Link to="/contact">Kontakt</Link>
      <button className="loginButton">{<LuCircleUserRound />} Anmelden</button>
      <Link to="/cart">{<PiShoppingCartBold />}</Link>
    </div>
  );
};
/* courier new", courier-ps-w01, monospace */


const ShippingInfo = () => {
  return (
    <div className="shippingInfo">
      <h1>Kostenloser Versand weltweit für Bestellungen über 40€</h1>;
    </div>
  )
};
