import api, { getImageUrl } from "../api";
import { useState, useEffect } from "react";
import type { ProductProp } from "./AddProduct";

export default function Products() {
  const [products, setProducts] = useState<ProductProp[]>([]);

  const fetchAllProducts = async () => {
    try {
      const response = await api.get("/products.php");

      setProducts(response.data);
    } catch (error) {
      console.error("Fehler beim Laden der Productsdaten", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="products">
      <div className="product-headline">
        <h1>Alles ansehen</h1>
      </div>
      <div className="all-product-wrapper">
        {products.map((product) => (
          <div key={product.product_id} className="product-container">
            <div className="all-product-image-container">
              <img
                src={getImageUrl(product.image)}
                alt={product.label}
                className="all-product-image"
              />
            </div>

            <div className="product-l-p">
              <div className="product-label">{product.label}</div>
              <div className="product-price">{product.price} €</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
