import { Link } from "react-router-dom";
import placeHolderPic from "../assets/Placeholder.png";
import Sidebar from "./Sidebar";

const collections = [
  { slug: "notebooks", title: "Notebooks", img: placeHolderPic },
  { slug: "geschenkpapier", title: "Geschenkpapier", img: placeHolderPic },
  { slug: "grußkarten", title: "Grußkarten", img: placeHolderPic },
  { slug: "prints", title: "Prints", img: placeHolderPic },
];

export default function Start() {
  return (
    <div className="start-grid">
      <Sidebar />

      <h2 className="our-collection">Unsere Kollektionen</h2>
      {collections.map((item) => (
        <Link
          key={item.slug}
          to={`/products/${item.slug}`}
          className="collection-card"
        >
          <img src={item.img} alt="" />
          <div className="card-info">
            <h3>{item.title}</h3>
            <span className="alle-ansehen">Alle ansehen</span>
          </div>
        </Link>
      ))}
      <h2 className="whats-new">Was gibt es Neues?</h2>

      <Link to="/blog" className="to-the-blog">
        <img src={placeHolderPic} alt="" />
        <div className="storys-guides">
          <h4>Geschichten & Guides</h4>
          <p>Blog lesen</p>
        </div>
      </Link>

      <Link to="/shop" className="to-the-shop">
        <img src={placeHolderPic} alt="" />
        <div className="limit-edition">
          <h4>Limitierte Auflage</h4>
          <p>Einkaufen</p>
        </div>
      </Link>
    </div>
  );
}
