import Collapsible from "./Collapsible";
import Symbol from "./Icon";
import api, { getImageUrl } from "../api";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import type { ProductProp } from "./AddProduct";

export default function ProductDetails() {
  const { product_id } = useParams<{ product_id: string }>();
  const [product, setProduct] = useState<ProductProp | null>(null);
  const navigate = useNavigate();

  const nextId = Number(product_id) + 1;
  const prevId = Number(product_id) - 1;

  useEffect(() => {
    const fetchProductByID = async () => {
      try {
        const response = await api.get(`/products.php?id=${product_id}`);
        setProduct(
          Array.isArray(response.data) ? response.data[0] : response.data,
        );
      } catch (error) {
        console.error("Fehler beim Laden der Productsdaten", error);
      }
    };

    if (product_id) {
      fetchProductByID();
    }
  }, [product_id]);

  if (!product) {
    return <div className="product-details">Lädt...</div>;
  }

  const apiCategory = product.category ? product.category.toLowerCase() : "";
  let routeParam = "shop";
  let displayName = product.category;

  if (apiCategory.includes("paper") || apiCategory.includes("geschenk")) {
    routeParam = "geschenkpapier";
    displayName = "Geschenkpapier";
  } else if (apiCategory.includes("note") || apiCategory.includes("buch")) {
    routeParam = "notebooks";
    displayName = "Notizbücher";
  } else if (apiCategory.includes("card") || apiCategory.includes("karte")) {
    routeParam = "grußkarten";
    displayName = "Grußkarten";
  } else if (apiCategory.includes("print")) {
    routeParam = "prints";
    displayName = "Prints";
  }

  return (
    <div className="product-details">
      <div className="product-route">
        <div className="product-routing">
          <Link to="/">Start</Link>
          <Link to={`/products/${routeParam}`}>{displayName}</Link>
          <span>{product.label}</span>{" "}
        </div>
        <div className="product-back-more">
          <button onClick={() => navigate(`/products/detail/${prevId}`)}>
            &lt; Zurück
          </button>
          <button onClick={() => navigate(`/products/detail/${nextId}`)}>
            Weiter &gt;
          </button>
        </div>
      </div>
      <div className="product-information">
        <div className="product-meta-dates">
          <div className="product-img">
            <img
              src={getImageUrl(product.image)}
              alt={product.label}
              className="one-product-image"
            />
          </div>
          <div className="product-specification">
            <p>
              Ich bin eine Produktbeschreibung. Bewerbe hier dein Produkt und
              gewinne die Aufmerksamkeit deiner Kunden. Beschreibe es klar und
              deutlich in deinen eigenen Worten. Verwende einzigartige Keywords.
            </p>
          </div>
        </div>
        <div className="product-buy-container">
          <div className="product-name">
            <h1>{product.label}</h1>
          </div>
          <div className="product-number">
            Artikelnummer: 00{product.product_id}
          </div>
          <div className="one-product-price">{product.price} €</div>

          <div className="product-qty-input">
            <p> Anzahl*</p>
            <div className="qty-btn-group">
              <button className="qty-count qty-count--minus" type="button">
                <Symbol name="minus" />
              </button>
              <input
                className="product-qty"
                type="number"
                min="0"
                max={product.stock}
                value="1"
              />
              <button className="qty-count qty-count--add" type="button">
                <Symbol name="plus" />
              </button>
            </div>
          </div>

          <button className="put-in-cart-Btn">In den Warenkorb</button>
          <div className="product-collapsible-container">
            <Collapsible label="Produktinfo" className="product-page-collapsible">{product.description}</Collapsible>
            <hr />

            <Collapsible label="Rückgaberecht" className="product-page-collapsible">
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum.
              </p>
            </Collapsible>
            <hr />

            <Collapsible label="Versandinformationen" className="product-page-collapsible">
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam.
              </p>
            </Collapsible>
          </div>
          <div className="social-media-container-svg">
            <Symbol name="facebook" className="icons-SVG" />
            <Symbol name="pinterest" className="icons-SVG" />
            <Symbol name="whatsapp" className="icons-SVG" />
            <Symbol name="twitter" className="icons-SVG" />
          </div>
        </div>
      </div>
    </div>
  );
}
