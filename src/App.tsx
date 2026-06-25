import "./App.css";
import { Routes, Route } from "react-router-dom";
import Start from "./Components/Start";
import SearchProducts from "./Components/SearchProducts";
import Info from "./Components/Info";
import { ShippingInfo } from "./Components/ShippingInfo";
import { Navbar } from "./Navbar";
import { Logo } from "./Components/Logo";
import { Subscribe } from "./Components/Subscribe";
import { Contact } from "./Components/Contact";
import BlogOverview from "./Components/Blog";
import BlogPostDetails from "./Components/BlogPostDetails";
import Products from "./Components/Products";
import User from "./Components/Userdata";
import Admin from "./Components/Admin";
import ProductDetails from "./Components/ProductDetails";


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
            <Route path="/search" element={<SearchProducts />} />
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
