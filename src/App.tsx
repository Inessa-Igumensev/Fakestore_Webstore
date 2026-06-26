import "./App.css";
import { Routes, Route } from "react-router-dom";
import Start from "./Components/Body/Start";
import Info from "./Components/Body/Info";
import { ShippingInfo } from "./Components/Header/ShippingInfo";
import { Navbar } from "./Navbar";
import { Logo } from "./Components/Header/Logo";
import { Subscribe } from "./Components/Footer/Subscribe";
import { Contact } from "./Components/Footer/Contact";
import BlogOverview from "./Components/Body/Blog";
import BlogPostDetails from "./Components/Body/BlogPostDetails";
import Products from "./Components/Products/Products";
import User from "./Components/User/Userdata";
import Admin from "./Components/User/Admin";
import ProductDetails from "./Components/Products/ProductDetails";


function App() {
  return (
    <div className="container">
      <div className="header">
        <ShippingInfo />
        <Logo />
        <Navbar />
      </div>
      <div className="body-main">
        <main>
          <Routes>
            <Route path="/user" element={<User />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:category" element={<Products />} />
            <Route path="/products/detail/:product_id" element={<ProductDetails />} />
            <Route path="/" element={<Start />} />
            <Route path="/info" element={<Info />} />
            <Route path="/blog" element={<BlogOverview />} />
            <Route path="/blog/:id" element={<BlogPostDetails />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>

      <div className="footer">
        <Subscribe />
        <div id="kontakt">
          <Contact />
        </div>
        <div className="copyright">© 2035 Beispiel</div>
      </div>
    </div>
  );
}

export default App;
