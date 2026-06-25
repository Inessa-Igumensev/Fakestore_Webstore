import api, { getImageUrl } from "../api";
import { useState, useEffect } from "react";
import type { ProductProp } from "./AddProduct";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const CategoryMapping: Record<
  string,
  { apiName: string; displayName: string }
> = {
  notebooks: { apiName: "Notebook", displayName: "Notitzbücher" },
  geschenkpapier: { apiName: "Wrapping Paper", displayName: "Geschenkpapier" },
  grußkarten: { apiName: "Card", displayName: "Grußkarten" },
  prints: { apiName: "Print", displayName: "Prints" },
};

export default function Products() {
  const [products, setProducts] = useState<ProductProp[]>([]);
  const [headline, setHeadline] = useState<string>("Alles ansehen");

  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        let url = "/products.php";

        if (category) {
          const matchedCategory = CategoryMapping[category.toLocaleLowerCase()];
          const apiName = matchedCategory ? matchedCategory.apiName : category;
          const displayName = matchedCategory
            ? matchedCategory.displayName
            : category;

          setHeadline(displayName);
          url = `/products.php?category=${encodeURIComponent(apiName)}`;
        } else {
          setHeadline("Alles ansehen");
        }

        const response = await api.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error("Fehler beim Laden der Productsdaten", error);
      }
    };

    fetchAllProducts();
  }, [category]);

  return (
    <div className="products">
      <div className="product-headline">
        <h1>{headline}</h1>
      </div>
      <div className="all-product-wrapper">
        {products.map((product) => (
          <Link to={`/products/detail/${product.product_id}`} className="product-link">
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
          </Link>
        ))}
      </div>
    </div>
  );
}
