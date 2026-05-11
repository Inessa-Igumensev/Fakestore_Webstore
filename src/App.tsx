import "./App.css";
import { Routes, Route } from "react-router-dom";
import Start from "./Components/Start";
import SearchProducts from "./Components/SearchProducts";
import Login from "./Components/Login";
import Info from "./Components/Info";
import { ShippingInfo } from "./Components/ShippingInfo";
import { Navbar } from "./Navbar";
import { Logo } from "./Components/Logo";
import { Subscribe } from "./Components/Subscribe";
import { Contact } from "./Components/Contact";
import Sidebar from "./Sidebar";

function App() {
  return (
    <div className="container">
      <div className="header">
        <ShippingInfo />
        <Logo />
        <Navbar />
      </div>
      <div className="footer">
        <Subscribe />
        <Contact />
        <Sidebar />
      </div>
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
