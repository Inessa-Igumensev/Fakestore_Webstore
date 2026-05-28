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
import Sidebar from "./Sidebar";
import BlogOverview from "./Components/Blog";
import BlogPostDetails from "./Components/BlogPostDetails";

function App() {
  return (
    <div className="container">
      <div className="header">
        <ShippingInfo />
        <Logo />
        <Navbar />
      </div>
      <Sidebar />

      <main>
        <Routes>
          <Route path="/search" element={<SearchProducts />} />
          <Route path="/" element={<Start />} />
          <Route path="/info" element={<Info />} />
          <Route path="/blog" element={<BlogOverview />} />
          <Route path="/blog/:id" element={<BlogPostDetails/>} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <div className="footer">
        <Subscribe />
        <Contact />
        <div className="copyright">© 2035 Beispiel</div>
      </div>
    </div>
  );
}

export default App;
