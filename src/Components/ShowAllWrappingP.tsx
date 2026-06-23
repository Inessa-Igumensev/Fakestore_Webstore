import api, { getImageUrl } from "../api";
import { useState, useEffect } from "react";
import type { ProductProp } from "./AddProduct";

export default function ShowAllWrappingP() {
  const [categories, setCategories] = useState<ProductProp[]>([]);

  const fetchAllProductsInCategory = async () => {
    try {
      const categoryName = "Wrapping Paper";

      const response = await api.get(
        `/products.php?category=${encodeURIComponent(categoryName)}`,
      );

      setCategories(response.data);
    } catch (error) {
      console.error("Fehler beim Laden der Productsdaten", error);
    }
  };

  useEffect(() => {
    fetchAllProductsInCategory();
  }, []);

  return (
    <div className="products">
      <div className="product-headline">
        <h1>Grußkarten</h1>
      </div>
      <div className="all-product-wrapper">
        {categories.map((category) => (
          <div key={category.product_id} className="product-container">
            <div className="all-product-image-container">
              <img
                src={getImageUrl(category.image)}
                alt={category.label}
                className="all-product-image"
              />
            </div>
            <div className="product-l-p">
              <div className="product-label">{category.label}</div>
              <div className="product-price">{category.price} €</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
